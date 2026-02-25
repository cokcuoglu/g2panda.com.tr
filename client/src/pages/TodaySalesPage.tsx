import { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2, Calendar } from 'lucide-react';

export default function TodaySalesPage() {
    const [dailyTotal, setDailyTotal] = useState(0);
    const [dailySales, setDailySales] = useState<any[]>([]);
    const [isLoadingSales, setIsLoadingSales] = useState(true);

    const fetchDailyTotal = async () => {
        try {
            const localDate = new Date();
            const offset = localDate.getTimezoneOffset();
            const localISOTime = new Date(localDate.getTime() - (offset * 60 * 1000)).toISOString().split('T')[0];

            const res = await axios.get(`/api/transactions/daily-total?date=${localISOTime}`);
            setDailyTotal(res.data.total);
        } catch (error) {
            console.error("Failed to fetch daily total", error);
        }
    };

    const fetchDailySales = async () => {
        setIsLoadingSales(true);
        try {
            const localDate = new Date();
            const offset = localDate.getTimezoneOffset();
            const localISOTime = new Date(localDate.getTime() - (offset * 60 * 1000)).toISOString().split('T')[0];

            const res = await axios.get(`/api/transactions?type=income&date=${localISOTime}`);
            setDailySales(res.data.data || []);
        } catch (error) {
            console.error('Failed to fetch daily sales:', error);
            setDailySales([]);
        } finally {
            setIsLoadingSales(false);
        }
    };

    const handleDeleteOrder = async (transactionId: string, description: string) => {
        if (!confirm(`"${description}" işlemini kalıcı olarak silmek istediğinize emin misiniz?\n\nBu işlem geri alınamaz!`)) {
            return;
        }

        try {
            await axios.delete(`/api/transactions/${transactionId}`);
            fetchDailySales();
            fetchDailyTotal();
        } catch (error: any) {
            console.error('Failed to delete transaction:', error);
            alert(error.response?.data?.error || 'İşlem silinemedi.');
        }
    };

    useEffect(() => {
        fetchDailyTotal();
        fetchDailySales();
    }, []);

    return (
        <Layout title="Günün Satışları" description="Bugün gerçekleştirilen tüm satış işlemleri">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">Toplam Ciro (Bugün)</p>
                            <h3 className="text-3xl font-bold text-slate-800">₺{Number(dailyTotal).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</h3>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-emerald-600" />
                        </div>
                    </div>
                </div>

                {/* Sales List */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-lg text-slate-800">Tamamlanan İşlemler</h3>
                            <p className="text-sm text-slate-500 mt-1">Sondan başa doğru sıralanmıştır</p>
                        </div>
                    </div>

                    <div className="p-4">
                        {isLoadingSales ? (
                            <div className="flex items-center justify-center py-12 text-slate-400">
                                <Loader2 className="h-8 w-8 animate-spin mr-3 text-emerald-500" />
                                <span className="font-medium">Yükleniyor...</span>
                            </div>
                        ) : dailySales.length === 0 ? (
                            <div className="text-center py-16 text-slate-500 bg-slate-50/50 rounded-xl border border-dashed border-slate-300">
                                <Calendar className="h-10 w-10 mx-auto text-slate-300 mb-3" />
                                <p className="font-medium text-lg text-slate-600">Henüz tamamlanmış satış yok</p>
                                <p className="text-sm">Bugün yapılan satışlar burada listelenecektir.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {dailySales.map((transaction: any) => (
                                    <div
                                        key={transaction.id}
                                        className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-emerald-200 hover:shadow-md transition-all group"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="font-semibold text-slate-800 text-lg">#{transaction.description}</span>
                                                <span className="text-sm text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                                                    {new Date(transaction.transaction_date || transaction.created_at).toLocaleTimeString('tr-TR', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>
                                            <div className="mt-1 font-bold text-emerald-600 text-xl">
                                                ₺{Number(transaction.amount).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-slate-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => handleDeleteOrder(transaction.id, transaction.description)}
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
