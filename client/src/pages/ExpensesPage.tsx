import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useAuth } from '@/context/AuthContext';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, TrendingDown } from 'lucide-react';
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
}

export default function ExpensesPage() {
    // const { hasPermission } = useAuth();
    const [activeTab, setActiveTab] = useState("operational");
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [channels, setChannels] = useState<any[]>([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
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
        document_type: 'receipt'
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
        setFormData(prev => ({
            ...prev,
            amount: data.amount ? String(data.amount) : prev.amount,
            transaction_date: data.date || prev.transaction_date,
            description: data.description || prev.description,
            ocr_record_id: data.ocr_id
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Validation check for date mismatch
        const txDate = new Date(formData.transaction_date);
        const viewDate = new Date(selectedMonth + '-01');
        const isSameMonth = txDate.getMonth() === viewDate.getMonth() && txDate.getFullYear() === viewDate.getFullYear();

        if (!isSameMonth) {
            const confirmMsg = `Dikkat: Kayıt tarihi (${formData.transaction_date}) seçili dönemden (${selectedMonth}) farklı.\n\nKayıt eklenecek ancak bu listede görünmeyecek. Devam etmek istiyor musunuz?`;
            if (!confirm(confirmMsg)) {
                return;
            }
        }

        try {
            await axios.post('/api/transactions', {
                ...formData,
                type: 'expense',
                expense_type: formData.expense_type || activeTab || 'operational', // Fallback to activeTab
                amount: Number(formData.amount)
            });

            setFormData(prev => ({
                ...prev,
                amount: '',
                description: '',
                ocr_record_id: null,
                deduction_reason: ''
            }));
            setIsSheetOpen(false);

            // If saved successfully, maybe we should switch view to that month?
            // For now, just refresh. If user confirmed, they know.
            fetchData();
        } catch (error: any) {
            console.error("Expense Save Error:", error);
            const msg = error.response?.data?.error || error.message || "Kaydetme başarısız.";
            alert(`Hata (${error.response?.status || 'Ağ'}): ${msg}`);
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
                        <SheetTrigger asChild>
                            <Button className="bg-rose-600 hover:bg-rose-700 h-9">
                                <Plus className="mr-2 h-4 w-4" />
                                Yeni Gider
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="overflow-y-auto w-full sm:max-w-md">
                            <SheetHeader className="mb-6">
                                <SheetTitle>Yeni Gider Kaydı</SheetTitle>
                            </SheetHeader>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <ReceiptScanner onScanComplete={handleScanComplete} className="mb-4" />
                                <div className="space-y-4">
                                    <Input type="number" placeholder="Tutar" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} required />
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
                                                    .filter(c => !c.expense_type || c.expense_type === formData.expense_type) // Show unclassified or matching
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
                                    <Input placeholder="Açıklama" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
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
                                                    <TableCell className="text-right text-rose-600">-{t.amount} ₺</TableCell>
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
