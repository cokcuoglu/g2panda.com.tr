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
    invoice_number?: string;
}

export default function ExpensesPage() {
    // const { hasPermission } = useAuth();
    const [activeTab, setActiveTab] = useState("operational");
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [channels, setChannels] = useState<any[]>([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [step, setStep] = useState(1);
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
        vat_amount: '',
        invoice_number: '',
        items: [] as any[]
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
                vat_amount: data.vat_total !== undefined ? String(Number(data.vat_total).toFixed(2)) : prev.vat_amount,
                invoice_number: data.details?.id || data.invoice_number || prev.invoice_number,
                items: (data.items || []).map((it: any) => ({ ...it, is_tax_deductible: true }))
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
                vat_amount: '',
                items: []
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
            vat_amount: t.vat_amount ? String(t.vat_amount) : '',
            invoice_number: t.invoice_number || '',
            items: [] // On edit, we don't load items for now unless API supports it
        });
        setIsSheetOpen(true);
    };

    const handleDelete = async (id: string, createdAt: string) => {
        const created = new Date(createdAt);
        const now = new Date();
        const diffHours = (now.getTime() - created.getTime()) / (3600000);

        if (diffHours > 24) {
            alert("24 saati geçmiş kayıtlar silinemez.");
            return;
        }

        if (!confirm("Bu kaydı silmek istediğinize emin misiniz?")) return;

        try {
            await axios.delete(`/api/transactions/${id}`);
            fetchData();
        } catch (err) {
            const error = err as any;
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
                        <Button className="bg-rose-600 hover:bg-rose-700 h-9" onClick={() => { setEditingId(null); setStep(1); setIsSheetOpen(true); }}>
                            <Plus className="mr-2 h-4 w-4" />
                            Yeni Gider
                        </Button>
                        <SheetContent className="overflow-y-auto w-full sm:max-w-xl">
                            <SheetHeader className="mb-6">
                                <SheetTitle>
                                    {editingId ? "Gider Düzenle" : (
                                        <div className="flex items-center gap-2">
                                            <span>Yeni Gider Kaydı</span>
                                        </div>
                                    )}
                                </SheetTitle>
                            </SheetHeader>

                            <Tabs defaultValue="operational" value={formData.expense_type} onValueChange={(val) => setFormData({ ...formData, expense_type: val })}>
                                {!editingId && (
                                    <TabsList className="grid w-full grid-cols-3 mb-6">
                                        <TabsTrigger value="operational">Sürekli</TabsTrigger>
                                        <TabsTrigger value="fixed">Sabit</TabsTrigger>
                                        <TabsTrigger value="personal">Özel</TabsTrigger>
                                    </TabsList>
                                )}

                                <TabsContent value="operational" className="mt-0">
                                    {!editingId && (
                                        <div className="flex gap-1 mb-6">
                                            <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-rose-600' : 'bg-slate-200'}`} />
                                            <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-rose-600' : 'bg-slate-200'}`} />
                                            <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-rose-600' : 'bg-slate-200'}`} />
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-6">

                                        {/* ── STEP 1: Fiş Bilgisi + Ham Veri ── */}
                                        {step === 1 && (
                                            <div className="space-y-4">
                                                <ReceiptScanner onScanComplete={handleScanComplete} className="mb-2" />

                                                {/* Totals */}
                                                <div className="grid grid-cols-2 gap-4 px-1">
                                                    <div className="space-y-1">
                                                        <Label className="text-xs text-slate-500">Genel Toplam (KDV Dahil)</Label>
                                                        <div className="relative">
                                                            <Input
                                                                type="text"
                                                                className="h-10 text-xl font-bold bg-white text-slate-800 pr-8 shadow-sm"
                                                                value={formData.amount}
                                                                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                                            />
                                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₺</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1 text-right">
                                                        <Label className="text-xs text-slate-500">Toplam KDV</Label>
                                                        <div className="relative">
                                                            <Input
                                                                type="text"
                                                                className="h-10 text-lg font-semibold bg-white text-slate-600 text-right pr-8 shadow-sm"
                                                                value={formData.vat_amount}
                                                                onChange={e => setFormData({ ...formData, vat_amount: e.target.value })}
                                                            />
                                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">₺</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Kurum / Açıklama */}
                                                <div className="space-y-1">
                                                    <Label className="text-xs">Kurum / Açıklama</Label>
                                                    <Input
                                                        className="h-9 text-sm bg-white"
                                                        placeholder="Kurum adı veya açıklama"
                                                        value={formData.description}
                                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                    />
                                                </div>

                                                {/* Date + Invoice No */}
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="space-y-1">
                                                        <Label className="text-xs">Fiş Tarihi</Label>
                                                        <Input type="datetime-local" className="h-9 text-xs bg-white" value={formData.transaction_date} onChange={e => setFormData({ ...formData, transaction_date: e.target.value })} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-xs">Fiş No</Label>
                                                        <Input className="h-9 text-xs bg-white" placeholder="Fiş No" value={formData.invoice_number} onChange={e => setFormData({ ...formData, invoice_number: e.target.value })} />
                                                    </div>
                                                </div>

                                                {/* Raw OCR Text */}
                                                <div className="space-y-2 pt-2 border-t border-slate-100">
                                                    <div className="flex items-center justify-between">
                                                        <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Okunan Fiş Detayı (Ham Veri)</Label>
                                                        <Badge variant="outline" className="text-[9px] h-4 bg-blue-50 text-blue-600 border-blue-100">AI Analiz</Badge>
                                                    </div>
                                                    <Textarea
                                                        placeholder="Fiş okunduğunda detaylar burada görünecek..."
                                                        value={formData.notes || ''}
                                                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                                        className="font-mono text-[11px] bg-slate-50 border-slate-200 min-h-[120px] resize-y leading-relaxed"
                                                    />
                                                    <p className="text-[10px] text-slate-400 italic">
                                                        * Yapay zeka tarafından okunan ham metin. Hataları buradan manuel düzeltebilirsiniz.
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* ── STEP 2: Fiş Kalemleri ── */}
                                        {step === 2 && (
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="h-5 px-1.5 text-[10px] bg-rose-50 text-rose-600 border-rose-100 uppercase font-bold tracking-tight">ADIM 2</Badge>
                                                        <h3 className="text-sm font-semibold text-slate-700">Fiş Kalemleri</h3>
                                                    </div>
                                                    {formData.items.length > 0 && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            className="text-[10px] h-6 text-rose-600 hover:text-rose-700 font-bold"
                                                            onClick={() => {
                                                                const total = formData.items.reduce((sum: number, item: any) => sum + Number(item.total_price || 0), 0).toFixed(2);
                                                                setFormData({ ...formData, amount: total });
                                                            }}
                                                        >
                                                            Toplamı Eşitle
                                                        </Button>
                                                    )}
                                                </div>

                                                {formData.items.length === 0 ? (
                                                    <div className="p-8 bg-slate-50 border border-dashed border-slate-200 rounded-lg text-center">
                                                        <p className="text-xs text-slate-400 italic">Bu fişte otomatik ürün detayı bulunamadı.</p>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            className="mt-4 text-[11px]"
                                                            onClick={() => setFormData({
                                                                ...formData,
                                                                items: [...formData.items, { name: '', total_price: '0', quantity: 1, vat_rate: 20, is_tax_deductible: true }]
                                                            })}
                                                        >
                                                            <Plus className="h-3 w-3 mr-1" /> Kalem Ekle
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                                                        {formData.items.map((item: any, idx: number) => (
                                                            <div key={idx} className="flex flex-col gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm border-l-4 border-l-rose-400">
                                                                {/* Row 1: Product Name */}
                                                                <div className="w-full">
                                                                    <Input
                                                                        className="h-10 text-[13px] w-full bg-slate-50/50 border-slate-200 focus:bg-white font-medium"
                                                                        placeholder="Ürün adı"
                                                                        value={item.name}
                                                                        onChange={e => {
                                                                            const newItems = [...formData.items];
                                                                            newItems[idx].name = e.target.value;
                                                                            setFormData({ ...formData, items: newItems });
                                                                        }}
                                                                    />
                                                                </div>

                                                                {/* Row 2: Price and Trash */}
                                                                <div className="flex items-center justify-between gap-3 bg-slate-50/30 p-2 rounded-lg border border-slate-100/50">
                                                                    <div className="flex items-center gap-2 flex-1">
                                                                        <Label className="text-[10px] text-slate-400 uppercase font-bold shrink-0">TUTAR</Label>
                                                                        <div className="relative flex-1 max-w-[200px]">
                                                                            <Input
                                                                                type="number"
                                                                                className="h-10 w-full text-[14px] text-right font-bold pr-8 border-slate-200 bg-white shadow-sm"
                                                                                value={item.total_price}
                                                                                onChange={e => {
                                                                                    const newItems = [...formData.items];
                                                                                    newItems[idx].total_price = e.target.value;
                                                                                    setFormData({ ...formData, items: newItems });
                                                                                }}
                                                                            />
                                                                            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[12px] text-slate-400 font-bold pointer-events-none">₺</span>
                                                                        </div>
                                                                    </div>
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-10 w-10 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg shrink-0"
                                                                        onClick={() => {
                                                                            const newItems = formData.items.filter((_: any, i: number) => i !== idx);
                                                                            setFormData({ ...formData, items: newItems });
                                                                        }}
                                                                    >
                                                                        <Trash2 className="h-5 w-5" />
                                                                    </Button>
                                                                </div>

                                                                {/* Row 3: Tax toggle + VAT rate */}
                                                                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                                                    <div className="flex items-center gap-2">
                                                                        <Switch
                                                                            id={`tax-${idx}`}
                                                                            className="scale-90"
                                                                            checked={item.is_tax_deductible !== false}
                                                                            onCheckedChange={(checked) => {
                                                                                const newItems = [...formData.items];
                                                                                newItems[idx].is_tax_deductible = checked;
                                                                                setFormData({ ...formData, items: newItems });
                                                                            }}
                                                                        />
                                                                        <Label htmlFor={`tax-${idx}`} className="text-[11px] text-slate-500 cursor-pointer select-none">Vergiye Tabii</Label>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Label className="text-[10px] text-slate-400 uppercase tracking-tighter font-semibold">KDV %</Label>
                                                                        <Input
                                                                            type="number"
                                                                            className="h-8 w-16 text-[12px] p-1 text-center bg-slate-50 border-slate-200 font-bold"
                                                                            value={item.vat_rate ?? 20}
                                                                            onChange={e => {
                                                                                const newItems = [...formData.items];
                                                                                newItems[idx].vat_rate = e.target.value;
                                                                                setFormData({ ...formData, items: newItems });
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="w-full mt-2 text-[11px] h-8 border border-dashed border-slate-200 text-slate-500"
                                                            onClick={() => setFormData({
                                                                ...formData,
                                                                items: [...formData.items, { name: '', total_price: '0', quantity: 1, vat_rate: 20, is_tax_deductible: true }]
                                                            })}
                                                        >
                                                            <Plus className="h-3 w-3 mr-1" /> Kalem Ekle
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* ── STEP 3: Sınıflandırma + Kaydet ── */}
                                        {step === 3 && (
                                            <div className="space-y-6">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge variant="outline" className="h-5 px-1.5 text-[10px] bg-rose-50 text-rose-600 border-rose-100 uppercase font-bold tracking-tight">ADIM 3</Badge>
                                                    <h3 className="text-sm font-semibold text-slate-700">Sınıflandırma</h3>
                                                </div>

                                                <div className="space-y-4 p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                                                    <div className="space-y-2">
                                                        <Label className="text-xs font-medium uppercase text-slate-500 tracking-wider">Kategori</Label>
                                                        <Select
                                                            value={formData.category_id}
                                                            onValueChange={val => setFormData({ ...formData, category_id: val })}
                                                        >
                                                            <SelectTrigger><SelectValue placeholder="Kategori Seç" /></SelectTrigger>
                                                            <SelectContent>
                                                                {categories
                                                                    .filter(c => (!c.expense_type || c.expense_type === 'operational') && !c.name?.startsWith('Sistem-'))
                                                                    .map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-xs font-medium uppercase text-slate-500 tracking-wider">Ödeme Hesabı</Label>
                                                        <Select value={formData.channel_id} onValueChange={val => setFormData({ ...formData, channel_id: val })}>
                                                            <SelectTrigger><SelectValue placeholder="Hesap" /></SelectTrigger>
                                                            <SelectContent>{channels.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>

                                                {/* Vergi Ayarları */}
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                                                        <Label className="text-sm">Tüm Fiş Vergiden Düşülebilir</Label>
                                                        <Switch checked={formData.is_tax_deductible} onCheckedChange={c => setFormData({ ...formData, is_tax_deductible: c })} />
                                                    </div>
                                                </div>

                                                {/* Özet */}
                                                <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm border border-slate-100">
                                                    <div className="flex justify-between text-slate-500">
                                                        <span>Toplam Tutar</span>
                                                        <span className="font-bold text-slate-800">{formData.amount} ₺</span>
                                                    </div>
                                                    <div className="flex justify-between text-slate-500">
                                                        <span>Kalem Sayısı</span>
                                                        <span className="font-medium">{formData.items.length}</span>
                                                    </div>
                                                    <div className="flex justify-between text-slate-500">
                                                        <span>Tarih</span>
                                                        <span className="font-medium">{formData.transaction_date ? new Date(formData.transaction_date).toLocaleString('tr-TR') : '-'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* ── NAVIGATION ── */}
                                        <div className="flex gap-3 pt-4 border-t border-slate-100">
                                            {step > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="flex-1 h-11 font-semibold"
                                                    onClick={() => setStep(step - 1)}
                                                >
                                                    Geri
                                                </Button>
                                            )}

                                            {step < 3 ? (
                                                <Button
                                                    type="button"
                                                    className="flex-[2] h-11 bg-rose-600 hover:bg-rose-700 font-bold"
                                                    onClick={() => setStep(step + 1)}
                                                >
                                                    Devam Et
                                                </Button>
                                            ) : (
                                                <Button
                                                    type="submit"
                                                    className="flex-[2] h-11 bg-rose-600 hover:bg-rose-700 font-bold"
                                                >
                                                    {editingId ? 'Güncelle' : 'Kaydet'}
                                                </Button>
                                            )}
                                        </div>
                                    </form>
                                </TabsContent>



                                <TabsContent value="fixed" className="mt-0 space-y-4">
                                    <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Tutar</Label>
                                                <Input
                                                    type="number"
                                                    value={formData.amount}
                                                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                                    placeholder="0.00"
                                                    className="font-bold text-lg"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Açıklama</Label>
                                                <Input
                                                    value={formData.description}
                                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                    placeholder="Kira ödemesi, Fatura vb."
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>Kategori</Label>
                                                    <Select
                                                        value={formData.category_id}
                                                        onValueChange={val => setFormData({ ...formData, category_id: val })}
                                                        required
                                                    >
                                                        <SelectTrigger><SelectValue placeholder="Seçiniz" /></SelectTrigger>
                                                        <SelectContent>
                                                            {categories
                                                                .filter(c => (!c.expense_type || c.expense_type === 'fixed') && !c.name?.startsWith('Sistem-'))
                                                                .map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)
                                                            }
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Ödeme Hesabı</Label>
                                                    <Select value={formData.channel_id} onValueChange={val => setFormData({ ...formData, channel_id: val })} required>
                                                        <SelectTrigger><SelectValue placeholder="Seçiniz" /></SelectTrigger>
                                                        <SelectContent>{channels.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>Tarih</Label>
                                                    <Input type="datetime-local" value={formData.transaction_date} onChange={e => setFormData({ ...formData, transaction_date: e.target.value })} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Fatura No (Opsiyonel)</Label>
                                                    <Input value={formData.invoice_number} onChange={e => setFormData({ ...formData, invoice_number: e.target.value })} />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Notlar</Label>
                                                <Textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
                                            </div>

                                            <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700">
                                                Sabit Gider Kaydet
                                            </Button>
                                        </div>
                                    </form>
                                </TabsContent>

                                <TabsContent value="personal" className="mt-0 space-y-4">
                                    <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Tutar</Label>
                                                <Input
                                                    type="number"
                                                    value={formData.amount}
                                                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                                    placeholder="0.00"
                                                    className="font-bold text-lg"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Açıklama</Label>
                                                <Input
                                                    value={formData.description}
                                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                    placeholder="Özel harcama detayı"
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>Kategori</Label>
                                                    <Select
                                                        value={formData.category_id}
                                                        onValueChange={val => setFormData({ ...formData, category_id: val })}
                                                        required
                                                    >
                                                        <SelectTrigger><SelectValue placeholder="Seçiniz" /></SelectTrigger>
                                                        <SelectContent>
                                                            {categories
                                                                .filter(c => (!c.expense_type || c.expense_type === 'personal') && !c.name?.startsWith('Sistem-'))
                                                                .map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)
                                                            }
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Ödeme Hesabı</Label>
                                                    <Select value={formData.channel_id} onValueChange={val => setFormData({ ...formData, channel_id: val })} required>
                                                        <SelectTrigger><SelectValue placeholder="Seçiniz" /></SelectTrigger>
                                                        <SelectContent>{channels.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Tarih</Label>
                                                <Input type="datetime-local" value={formData.transaction_date} onChange={e => setFormData({ ...formData, transaction_date: e.target.value })} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Notlar</Label>
                                                <Textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
                                            </div>

                                            <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700">
                                                Özel Gider Kaydet
                                            </Button>
                                        </div>
                                    </form>
                                </TabsContent>
                            </Tabs>
                        </SheetContent>
                    </Sheet>
                </ div>

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
