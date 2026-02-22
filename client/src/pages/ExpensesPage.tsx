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
                vat_amount: data.vat_total ? String(data.vat_total) : prev.vat_amount,
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
                                        {/* STEP 1: RECEIPT & ITEMS */}
                                        {step === 1 && (
                                            <div className="space-y-6">
                                                <ReceiptScanner onScanComplete={handleScanComplete} className="mb-4" />

                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <Label className="text-sm font-bold text-slate-700">Fiş Kalemleri</Label>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-7 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                                                            onClick={() => {
                                                                setFormData({
                                                                    ...formData,
                                                                    items: [...formData.items, { name: '', quantity: 1, unit: 'adet', unit_price: 0, total_price: 0, vat_rate: 20, is_tax_deductible: true }]
                                                                });
                                                            }}
                                                        >
                                                            + Kalem Ekle
                                                        </Button>
                                                    </div>

                                                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                                                        {formData.items.length === 0 ? (
                                                            <div className="text-center py-8 border-2 border-dashed border-slate-100 rounded-lg text-slate-400 text-xs">
                                                                Henüz kalem eklenmemiş. <br />Fiş tarayarak veya manuel ekleyebilirsiniz.
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-col gap-2">
                                                                {formData.items.map((item, idx) => (
                                                                    <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-md space-y-2">
                                                                        {/* Row 1: Name and Delete */}
                                                                        <div className="flex gap-2 items-center">
                                                                            <Input
                                                                                className="h-8 text-xs bg-white flex-1"
                                                                                placeholder="Ürün Adı"
                                                                                value={item.name}
                                                                                onChange={e => {
                                                                                    const newItems = [...formData.items];
                                                                                    newItems[idx].name = e.target.value;
                                                                                    setFormData({ ...formData, items: newItems });
                                                                                }}
                                                                            />
                                                                            <Button
                                                                                type="button"
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="h-7 w-7 text-slate-300 hover:text-red-500"
                                                                                onClick={() => {
                                                                                    const newItems = formData.items.filter((_, i) => i !== idx);
                                                                                    const totalSum = newItems.reduce((acc, i) => acc + i.total_price, 0);
                                                                                    const totalVat = newItems.reduce((acc, i) => {
                                                                                        const r = i.vat_rate || 0;
                                                                                        return acc + (i.total_price - (i.total_price / (1 + r / 100)));
                                                                                    }, 0);
                                                                                    setFormData({ ...formData, items: newItems, amount: String(totalSum.toFixed(2)), vat_amount: String(totalVat.toFixed(2)) });
                                                                                }}
                                                                            >
                                                                                <Trash2 className="h-3 w-3" />
                                                                            </Button>
                                                                        </div>
                                                                        {/* Row 2: Quantity, Unit, Price, VAT */}
                                                                        <div className="grid grid-cols-12 gap-2">
                                                                            <div className="col-span-3">
                                                                                <Input
                                                                                    type="number"
                                                                                    className="h-8 text-xs text-right bg-white"
                                                                                    placeholder="Miktar"
                                                                                    value={item.quantity || ''}
                                                                                    onChange={e => {
                                                                                        const newItems = [...formData.items];
                                                                                        newItems[idx].quantity = Number(e.target.value);
                                                                                        setFormData({ ...formData, items: newItems });
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <div className="col-span-3">
                                                                                <select
                                                                                    className="w-full h-8 text-[11px] border border-slate-200 rounded px-1 bg-white"
                                                                                    value={item.unit || 'adet'}
                                                                                    onChange={e => {
                                                                                        const newItems = [...formData.items];
                                                                                        newItems[idx].unit = e.target.value;
                                                                                        setFormData({ ...formData, items: newItems });
                                                                                    }}
                                                                                >
                                                                                    <option value="adet">Adet</option>
                                                                                    <option value="kg">Kilo</option>
                                                                                    <option value="lt">Litre</option>
                                                                                    <option value="m">Metre</option>
                                                                                </select>
                                                                            </div>
                                                                            <div className="col-span-4">
                                                                                <Input
                                                                                    type="number"
                                                                                    className="h-8 text-xs text-right bg-white"
                                                                                    placeholder="Fiyat"
                                                                                    value={item.total_price}
                                                                                    onChange={e => {
                                                                                        const newValue = Number(e.target.value);
                                                                                        const newItems = [...formData.items];
                                                                                        newItems[idx].total_price = newValue;
                                                                                        // Recalc totals
                                                                                        const totalSum = newItems.reduce((acc, i) => acc + i.total_price, 0);
                                                                                        const totalVat = newItems.reduce((acc, i) => {
                                                                                            const r = i.vat_rate || 0;
                                                                                            return acc + (i.total_price - (i.total_price / (1 + r / 100)));
                                                                                        }, 0);
                                                                                        setFormData({ ...formData, items: newItems, amount: String(totalSum.toFixed(2)), vat_amount: String(totalVat.toFixed(2)) });
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            <div className="col-span-2">
                                                                                <select
                                                                                    className="w-full h-8 text-[11px] border border-slate-200 rounded px-1 bg-white"
                                                                                    value={item.vat_rate || ''}
                                                                                    onChange={e => {
                                                                                        const rate = Number(e.target.value);
                                                                                        const newItems = [...formData.items];
                                                                                        newItems[idx].vat_rate = rate;
                                                                                        const totalVat = newItems.reduce((acc, i) => {
                                                                                            const r = i.vat_rate || 0;
                                                                                            return acc + (i.total_price - (i.total_price / (1 + r / 100)));
                                                                                        }, 0);
                                                                                        setFormData({ ...formData, items: newItems, vat_amount: String(totalVat.toFixed(2)) });
                                                                                    }}
                                                                                >
                                                                                    <option value="0">%0</option>
                                                                                    <option value="1">%1</option>
                                                                                    <option value="10">%10</option>
                                                                                    <option value="20">%20</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Summary & Globals Step 1 */}
                                                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 space-y-4">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Genel Toplam</Label>
                                                                <div className="text-lg font-bold text-slate-800">{formData.amount || '0.00'} ₺</div>
                                                            </div>
                                                            <div className="space-y-1 text-right">
                                                                <Label className="text-xs">Toplam KDV</Label>
                                                                <div className="text-sm font-medium text-slate-600">{formData.vat_amount || '0.00'} ₺</div>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Fiş Tarihi</Label>
                                                                <Input type="datetime-local" className="h-8 text-xs bg-white" value={formData.transaction_date} onChange={e => setFormData({ ...formData, transaction_date: e.target.value })} />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Fiş No</Label>
                                                                <Input className="h-8 text-xs bg-white" placeholder="Fiş No" value={formData.invoice_number} onChange={e => setFormData({ ...formData, invoice_number: e.target.value })} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 2: CLASSIFICATION & STOCK */}
                                        {step === 2 && (
                                            <div className="space-y-6">
                                                <div className="space-y-4 p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                                                    <h3 className="text-sm font-semibold text-slate-700 mb-2">Sınıflandırma</h3>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-medium uppercase text-slate-500 tracking-wider">Kategori</label>
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
                                                        <label className="text-xs font-medium uppercase text-slate-500 tracking-wider">Ödeme Hesabı</label>
                                                        <Select value={formData.channel_id} onValueChange={val => setFormData({ ...formData, channel_id: val })}>
                                                            <SelectTrigger><SelectValue placeholder="Hesap" /></SelectTrigger>
                                                            <SelectContent>{channels.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <h3 className="text-sm font-semibold text-slate-700 mb-2">Stok & Vergi Ayarları</h3>
                                                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                                                        {formData.items.map((item, idx) => (
                                                            <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
                                                                <div>
                                                                    <div className="font-medium text-sm text-slate-700">{item.name || 'İsimsiz Kalem'}</div>
                                                                    <div className="text-xs text-slate-400">{item.total_price} ₺</div>
                                                                </div>
                                                                <div className="flex items-center gap-4">
                                                                    <div className="flex items-center gap-2">
                                                                        <Label className="text-[10px] uppercase text-slate-500">Stok?</Label>
                                                                        <Switch
                                                                            checked={item.is_stock}
                                                                            className="scale-75"
                                                                            onCheckedChange={(c) => {
                                                                                const newItems = [...formData.items];
                                                                                newItems[idx].is_stock = c;
                                                                                setFormData({ ...formData, items: newItems });
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Label className="text-[10px] uppercase text-slate-500">Vergi Düş?</Label>
                                                                        <Switch
                                                                            checked={item.is_tax_deductible !== false}
                                                                            className="scale-75"
                                                                            onCheckedChange={(c) => {
                                                                                const newItems = [...formData.items];
                                                                                newItems[idx].is_tax_deductible = c;
                                                                                setFormData({ ...formData, items: newItems });
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                                                        <Label className="text-sm">Tüm Fiş Vergiden Düşülebilir</Label>
                                                        <Switch checked={formData.is_tax_deductible} onCheckedChange={c => setFormData({ ...formData, is_tax_deductible: c })} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* STEP 3: CONFIRMATION */}
                                        {step === 3 && (
                                            <div className="space-y-6">
                                                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg text-center">
                                                    <div className="text-emerald-600 font-bold text-xl mb-1">{formData.amount} ₺</div>
                                                    <div className="text-emerald-500 text-xs uppercase tracking-wide">Toplam Tutar</div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                                        <div className="text-slate-500">Kategori</div>
                                                        <div className="font-medium text-right">{categories.find(c => c.id === formData.category_id)?.name || '-'}</div>

                                                        <div className="text-slate-500">Ödeme</div>
                                                        <div className="font-medium text-right">{channels.find(c => c.id === formData.channel_id)?.name || '-'}</div>

                                                        <div className="text-slate-500">Tarih</div>
                                                        <div className="font-medium text-right">{new Date(formData.transaction_date).toLocaleString('tr-TR')}</div>

                                                        <div className="text-slate-500">Kalem Sayısı</div>
                                                        <div className="font-medium text-right">{formData.items.length}</div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>Notlar</Label>
                                                        <Textarea
                                                            placeholder="Eklemek istediğiniz notlar..."
                                                            value={formData.notes || ''}
                                                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                                            className="font-mono text-xs bg-slate-50"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* NAVIGATION */}
                                        <div className="flex justify-between pt-4 border-t border-slate-100">
                                            {step > 1 ? (
                                                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                                                    Geri
                                                </Button>
                                            ) : (
                                                <div></div> // Spacer
                                            )}

                                            {step < 3 ? (
                                                <Button type="button" className="bg-slate-800" onClick={() => setStep(step + 1)}>
                                                    Devam Et
                                                </Button>
                                            ) : (
                                                <Button type="submit" className="bg-rose-600 w-32">
                                                    Kaydet
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
