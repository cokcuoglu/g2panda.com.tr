import { useEffect, useState } from 'react';
import axios from 'axios';

import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Wallet, TrendingUp } from 'lucide-react';
import { KpiCard } from '@/components/dashboard/KpiCard';

interface Transaction {
    id: string;
    amount: number;
    type: 'income';
    description: string;
    transaction_date: string;
    category_name?: string;
    category_color?: string;
    channel_name?: string;
}

interface Category {
    id: string;
    name: string;
    type: 'income';
    color: string | null;
}

interface Channel {
    id: string;
    name: string;
    type: 'sales' | 'payment';
}

export default function IncomePage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [channels, setChannels] = useState<Channel[]>([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

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
    });

    const fetchData = async () => {
        try {
            // Fetch Income Transactions
            const txRes = await axios.get('/api/transactions?type=income&limit=50');
            setTransactions(txRes.data.data);

            // Fetch Dependencies
            const [catRes, chanRes] = await Promise.all([
                axios.get('/api/categories'),
                axios.get('/api/channels')
            ]);

            // Filter relevant items
            const incomeCats = catRes.data.data.filter((c: any) => c.type === 'income');
            setCategories(incomeCats);
            setChannels(chanRes.data.data);

            // Set defaults
            if (incomeCats.length > 0 && !formData.category_id) {
                setFormData(prev => ({ ...prev, category_id: incomeCats[0].id }));
            }
            if (chanRes.data.data.length > 0 && !formData.channel_id) {
                setFormData(prev => ({ ...prev, channel_id: chanRes.data.data[0].id }));
            }

        } catch (error) {
            console.error("Failed to load income data", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/transactions', {
                ...formData,
                type: 'income',
                amount: Number(formData.amount)
            });

            setFormData(prev => ({ ...prev, amount: '', description: '' }));
            setIsSheetOpen(false);
            fetchData();
        } catch (error) {
            console.error("Failed to save income", error);
            alert("Failed to save income record.");
        }
    };

    // Calculate Totals
    const totalIncome = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
    const thisMonthIncome = transactions
        .filter(t => new Date(t.transaction_date).getMonth() === new Date().getMonth())
        .reduce((sum, t) => sum + Number(t.amount), 0);

    return (
        <Layout
            title="Gelir Yönetimi"
            description="Tüm satış ve gelir kalemlerinizi buradan yönetin."
            actions={
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Yeni Gelir Ekle
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader className="mb-6">
                            <SheetTitle>Yeni Gelir Kaydı</SheetTitle>
                            <SheetDescription>Satış veya hizmet geliri ekleyin.</SheetDescription>
                        </SheetHeader>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium uppercase text-slate-500 tracking-wider">Tutar</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-slate-400 font-semibold">₺</span>
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            className="pl-8 text-lg font-semibold border-emerald-200 focus:ring-emerald-500"
                                            value={formData.amount}
                                            onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                            required
                                            min="0.01"
                                            step="0.01"
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium uppercase text-slate-500 tracking-wider">Tarih ve Saat</label>
                                    <Input
                                        type="datetime-local"
                                        value={formData.transaction_date}
                                        onChange={e => setFormData({ ...formData, transaction_date: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium uppercase text-slate-500 tracking-wider">Kategori</label>
                                    <Select
                                        value={formData.category_id}
                                        onValueChange={val => setFormData({ ...formData, category_id: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Kategori Seç" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(cat => (
                                                <SelectItem key={cat.id} value={cat.id}>
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="w-3 h-3 rounded-full border border-black/10"
                                                            style={{ backgroundColor: cat.color || '#e2e8f0' }}
                                                        />
                                                        {cat.name}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium uppercase text-slate-500 tracking-wider">Hesap / Kanal</label>
                                    <Select
                                        value={formData.channel_id}
                                        onValueChange={val => setFormData({ ...formData, channel_id: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Kanal Seç" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {channels.map(ch => (
                                                <SelectItem key={ch.id} value={ch.id}>
                                                    {ch.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-medium uppercase text-slate-500 tracking-wider">Açıklama (Opsiyonel)</label>
                                    <Input
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Örn: Günlük satış toplamı"
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">Kaydet</Button>
                        </form>
                    </SheetContent>
                </Sheet>
            }
        >
            {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <KpiCard
                    title="Toplam Gelir (Tümü)"
                    value={totalIncome}
                    type="income"
                    icon={Wallet}
                    description="Tüm zamanların toplamı"
                />
                <KpiCard
                    title="Bu Ay"
                    value={thisMonthIncome}
                    type="income"
                    icon={TrendingUp}
                    description="Bu ayki performans"
                />
            </div>

            {/* Transactions List */}
            <Card className="border-slate-100 shadow-sm">
                <CardHeader>
                    <CardTitle>Gelir Hareketleri</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableBody>
                            {transactions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-12 text-slate-400">
                                        Henüz gelir kaydı bulunmuyor.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                transactions.map((t) => (
                                    <TableRow key={t.id} className="hover:bg-slate-50/50">
                                        <TableCell className="pl-6">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-slate-700">{t.description || t.category_name}</span>
                                                <span className="text-xs text-slate-400">{new Date(t.transaction_date).toLocaleString('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className="font-normal"
                                                style={{
                                                    backgroundColor: t.category_color ? `${t.category_color}10` : undefined,
                                                    color: t.category_color || undefined,
                                                    borderColor: t.category_color ? `${t.category_color}40` : undefined
                                                }}
                                            >
                                                {t.category_name}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right pr-6 font-semibold text-emerald-600">
                                            +{Number(t.amount).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Layout>
    );
}
