import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useAuth } from '@/context/AuthContext';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, TrendingDown, Pencil, Trash2 } from 'lucide-react';
import { ReceiptScanner } from '@/components/ReceiptScanner';
import { KpiCard } from '@/components/dashboard/KpiCard';

interface Transaction {
    id: string;
    amount: number;
    type: 'expense';
    expense_type: string;
    description: string;
    transaction_date: string;
    category_name?: string;
    category_color?: string;
    channel_name?: string;
    receipt_image?: string;
    is_tax_deductible: boolean;
    notes?: string;
    created_at: string;
    vat_rate?: number;
    vat_amount?: number;
}

export default function ExpensesPage() {
    // const { hasPermission } = useAuth();
    const [activeTab, setActiveTab] = useState("operational");
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [channels, setChannels] = useState<any[]>([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    // const [isLoading, setIsLoading] = useState(true); // Removed unused

    // Initial value: Current "YYYY-MM"
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        transaction_date: (() => {
            // CRITICAL: Use Turkey time (UTC+3) for default date
            const now = new Date();
            const turkeyTime = new Date(now.getTime() + (3 * 60 * 60 * 1000));
            return turkeyTime.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm format
        })(),
        category_id: '',
        channel_id: '',
        ocr_record_id: null as string | null,
        expense_type: activeTab,
        is_tax_deductible: true,
        deduction_reason: '',
        document_type: 'receipt',
        notes: '',
        vat_rate: '',
        vat_amount: ''
    });

    const fetchData = async () => {
        // setIsLoading(true);
        try {
            // Calculate start and end date for the selected month
            const [year, month] = selectedMonth.split('-').map(Number);
            const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
            const endDate = new Date(year, month, 0).toISOString().split('T')[0]; // Last day of month

            const txRes = await axios.get(`/api/transactions?type=expense&expense_type=${activeTab}&start_date=${startDate}&end_date=${endDate}&limit=100`);
            setTransactions(txRes.data.data);

            const [catRes, chanRes] = await Promise.all([
                axios.get('/api/categories'),
                axios.get('/api/channels')
            ]);

            const expenseCats = catRes.data.data.filter((c: any) => c.type === 'expense');
            setCategories(expenseCats);
            const paymentChans = chanRes.data.data.filter((c: any) => c.type === 'payment');
            setChannels(paymentChans);

            if (expenseCats.length > 0 && !formData.category_id) {
                // Find first category matching current expense type, fallback to first avail
                const defaultCat = expenseCats.find((c: any) => c.expense_type === activeTab);
                setFormData(prev => ({
                    ...prev,
                    category_id: defaultCat?.id || expenseCats.find((c: any) => !c.expense_type)?.id || expenseCats[0].id
                }));
            }
            if (paymentChans.length > 0 && !formData.channel_id) {
                setFormData(prev => ({ ...prev, channel_id: paymentChans[0].id }));
            }
        } catch (error) {
            console.error("Failed to load expense data", error);
        } finally {
            // setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        setFormData(prev => ({
            ...prev,
            expense_type: activeTab,
            is_tax_deductible: activeTab !== 'personal'
        }));
    }, [activeTab, selectedMonth]);

    const handleScanComplete = (data: any) => {
        setFormData(prev => {
            let isoDate = prev.transaction_date;
            if (data.date) {
                // Backend returns DD.MM.YYYY, convert to YYYY-MM-DD for input
                const parts = data.date.split('.');
                if (parts.length === 3) {
                    isoDate = `${parts[2]}-${parts[1]}-${parts[0]}T${data.details?.time?.slice(0, 5) || '12:00'}`;
                }
            }

            return {
                ...prev,
                amount: data.amount ? String(data.amount) : prev.amount,
                transaction_date: isoDate,
                description: data.description || prev.description,
                ocr_record_id: data.ocr_id,
                notes: data.raw_text || prev.notes,
                vat_rate: data.vat_rate ? String(data.vat_rate) : prev.vat_rate,
                vat_amount: data.vat_total ? String(data.vat_total) : prev.vat_amount
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Validation check for date mismatch
        const txDate = new Date(formData.transaction_date);
        const viewDate = new Date(selectedMonth + '-01');
        const isSameMonth = txDate.getMonth() === viewDate.getMonth() && txDate.getFullYear() === viewDate.getFullYear();

        if (!isSameMonth && !editingId) { // Only warn on new creation
            const confirmMsg = `Dikkat: Kayıt tarihi (${formData.transaction_date}) seçili dönemden (${selectedMonth}) farklı.\n\nKayıt eklenecek ancak bu listede görünmeyecek. Devam etmek istiyor musunuz?`;
            if (!confirm(confirmMsg)) {
                return;
            }
        }

        try {
            const payload = {
                ...formData,
                type: 'expense',
                expense_type: formData.expense_type || activeTab || 'operational', // Fallback to activeTab
                amount: Number(formData.amount)
            };

            if (editingId) {
                await axios.put(`/api/transactions/${editingId}`, payload);
            } else {
                await axios.post('/api/transactions', payload);
            }

            setFormData(prev => ({
                ...prev,
                amount: '',
                description: '',
                ocr_record_id: null,
                deduction_reason: '',
                notes: '',
                vat_rate: '',
                vat_amount: ''
            }));
            setEditingId(null);
            setIsSheetOpen(false);

            fetchData();
        } catch (error: any) {
            console.error("Expense Save Error:", error);
            const msg = error.response?.data?.error || error.message || "Kaydetme başarısız.";
            alert(`Hata (${error.response?.status || 'Ağ'}): ${msg}`);
        }
    };

    const handleEdit = (t: Transaction) => {
        setEditingId(t.id);
        const isoDate = new Date(t.transaction_date).toISOString().slice(0, 16);
        setFormData({
            amount: String(t.amount),
            description: t.description || '',
            transaction_date: isoDate,
            category_id: t.category_name ? categories.find(c => c.name === t.category_name)?.id : '', // Best effort map
            channel_id: t.channel_name ? channels.find(c => c.name === t.channel_name)?.id : '',
            ocr_record_id: null, // Don't re-link OCR on edit for now
            expense_type: t.expense_type,
            is_tax_deductible: t.is_tax_deductible,
            deduction_reason: '',
            document_type: 'receipt',
            notes: t.notes || '',
            vat_rate: t.vat_rate ? String(t.vat_rate) : '',
            vat_amount: t.vat_amount ? String(t.vat_amount) : ''
        });
        setIsSheetOpen(true);
    };

    const handleDelete = async (id: string, createdAt: string) => {
        // 24-hour check
        const created = new Date(createdAt);
        const now = new Date();
        const diffHours = (now.getTime() - created.getTime()) / (1000 * 60 * 60);

        if (diffHours > 24) {
            alert("24 saati geçmiş kayıtlar silinemez.");
            return;
        }

        if (!confirm("Bu kaydı silmek istediğinize emin misiniz?")) return;

        try {
            await axios.delete(`/api/transactions/${id}`);
            fetchData();
        } catch (error: any) {
            alert("Silme başarısız: " + (error.response?.data?.error || error.message));
        }
    };

    const totalExpense = transactions.reduce((sum, t) => sum + Number(t.amount), 0);

    return (
        <Layout
            title="Gider Yönetimi"
            description="İşletme giderlerinizi yönetin."
            actions={
                <div className="flex gap-2 items-center">
                    <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
                        <Label className="pl-2 text-xs font-semibold text-slate-500 uppercase tracking-widest hidden sm:block">Dönem</Label>
                        <Input
                            type="month"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="h-8 w-auto border-none bg-white shadow-sm font-medium text-slate-700"
                        />
                    </div>
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <Button className="bg-rose-600 hover:bg-rose-700 h-9" onClick={() => { setEditingId(null); setIsSheetOpen(true); }}>
                            <Plus className="mr-2 h-4 w-4" />
                            Yeni Gider
                        </Button>
                        <SheetContent className="overflow-y-auto w-full sm:max-w-md">
                            <SheetHeader className="mb-6">
                                <SheetTitle>{editingId ? "Gider Düzenle" : "Yeni Gider Kaydı"}</SheetTitle>
                            </SheetHeader>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <ReceiptScanner onScanComplete={handleScanComplete} className="mb-4" />
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-1">
                                            <Label className="text-xs">Genel Toplam (KDV Dahil)</Label>
                                            <Input type="number" placeholder="Tutar" value={formData.amount} onChange={e => {
                                                const newAmount = e.target.value;
                                                let newVatAmount = formData.vat_amount;
                                                // Auto-calc VAT if rate exists
                                                if (newAmount && formData.vat_rate) {
                                                    const rate = parseFloat(formData.vat_rate);
                                                    const amount = parseFloat(newAmount);
                                                    newVatAmount = (amount - (amount / (1 + rate / 100))).toFixed(2);
                                                }
                                                setFormData({ ...formData, amount: newAmount, vat_amount: newVatAmount });
                                            }} required />
                                            {formData.amount && formData.vat_amount && (
                                                <div className="text-[10px] text-slate-400 text-right">
                                                    Matrah: {(parseFloat(formData.amount) - parseFloat(formData.vat_amount)).toFixed(2)} ₺
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">KDV Oranı (%)</Label>
                                            <Select value={formData.vat_rate} onValueChange={val => {
                                                const rate = parseFloat(val);
                                                let newVatAmount = formData.vat_amount;
                                                if (formData.amount && !isNaN(rate)) {
                                                    const amount = parseFloat(formData.amount);
                                                    newVatAmount = (amount - (amount / (1 + rate / 100))).toFixed(2);
                                                }
                                                setFormData({ ...formData, vat_rate: val, vat_amount: newVatAmount });
                                            }}>
                                                <SelectTrigger><SelectValue placeholder="Seç" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="0">0%</SelectItem>
                                                    <SelectItem value="1">1%</SelectItem>
                                                    <SelectItem value="8">8%</SelectItem>
                                                    <SelectItem value="10">10%</SelectItem>
                                                    <SelectItem value="18">18%</SelectItem>
                                                    <SelectItem value="20">20%</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1">
                                        <div className="space-y-1">
                                            <Label className="text-xs">KDV Tutarı</Label>
                                            <Input type="number" placeholder="KDV" value={formData.vat_amount} onChange={e => setFormData({ ...formData, vat_amount: e.target.value })} />
                                        </div>
                                    </div>
                                    <Input type="datetime-local" value={formData.transaction_date} onChange={e => setFormData({ ...formData, transaction_date: e.target.value })} />
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium uppercase text-slate-500 tracking-wider">Gider Türü</label>
                                        <Select
                                            value={formData.expense_type}
                                            onValueChange={val => setFormData({ ...formData, expense_type: val })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="operational">Sürekli Gider (Malzeme/Stok)</SelectItem>
                                                <SelectItem value="fixed">Sabit Gider (Kira/Fatura)</SelectItem>
                                                <SelectItem value="personal">Özel Harcama</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium uppercase text-slate-500 tracking-wider">Kategori</label>
                                        <Select
                                            value={formData.category_id}
                                            onValueChange={val => setFormData({ ...formData, category_id: val })}
                                        >
                                            <SelectTrigger><SelectValue placeholder="Kategori Seç" /></SelectTrigger>
                                            <SelectContent>
                                                {categories
                                                    .filter(c => (!c.expense_type || c.expense_type === formData.expense_type) && !c.name?.startsWith('Sistem-')) // Hide system categories
                                                    .map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)
                                                }
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-medium uppercase text-slate-500 tracking-wider">Ödeme Hesabı</label>
                                        <Select value={formData.channel_id} onValueChange={val => setFormData({ ...formData, channel_id: val })}>
                                            <SelectTrigger><SelectValue placeholder="Hesap" /></SelectTrigger>
                                            <SelectContent>{channels.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label>Vergiden Düşülebilir</Label>
                                        <Switch checked={formData.is_tax_deductible} onCheckedChange={c => setFormData({ ...formData, is_tax_deductible: c })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Açıklama</Label>
                                        <Input
                                            placeholder="Kısa Açıklama (örn. Ofis Malzemeleri)"
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Detaylar (Fiş İçeriği)</Label>
                                        <Textarea
                                            placeholder="Fiş detayları veya notlar..."
                                            value={formData.notes || ''}
                                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                            className="min-h-[100px] font-mono text-xs"
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full bg-rose-600">Kaydet</Button>
                            </form>
                        </SheetContent>
                    </Sheet>
                </div>
            }
        >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="operational">Sürekli</TabsTrigger>
                    <TabsTrigger value="fixed">Sabit</TabsTrigger>
                    <TabsTrigger value="personal">Özel</TabsTrigger>
                </TabsList>

                {['operational', 'fixed', 'personal'].map(tab => (
                    <TabsContent key={tab} value={tab}>
                        <div className="grid grid-cols-1 mb-6">
                            <KpiCard
                                title={`${selectedMonth} Toplamı`}
                                value={totalExpense}
                                type="expense"
                                icon={TrendingDown}
                                description="Seçili dönem toplam gider"
                            />
                        </div>
                        <Card>
                            <CardHeader><CardTitle>Liste</CardTitle></CardHeader>
                            <CardContent>
                                <Table>
                                    <TableBody>
                                        {transactions.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={3} className="text-center py-12 text-slate-400">
                                                    Bu dönem için kayıt bulunamadı.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            transactions.map((t) => (
                                                <TableRow key={t.id}>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                                                            <span>{t.description || t.category_name}</span>
                                                            <span className="text-xs text-slate-400">{new Date(t.transaction_date).toLocaleString('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{t.category_name}</Badge>
                                                        {!t.is_tax_deductible && <span className="ml-2 text-xs text-amber-600">KKEG</span>}
                                                    </TableCell>
                                                    <TableCell className="text-right text-rose-600">
                                                        <div className="flex flex-col items-end">
                                                            <span>-{t.amount} ₺</span>
                                                            <div className="flex gap-2 mt-1">
                                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleEdit(t)}>
                                                                    <Pencil className="h-3 w-3 text-slate-400 hover:text-blue-600" />
                                                                </Button>
                                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleDelete(t.id, t.created_at)}>
                                                                    <Trash2 className={`h-3 w-3 ${((new Date().getTime() - new Date(t.created_at).getTime()) / 36e5) > 24 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:text-red-600'}`} />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </Layout>
    );
}
