import { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { TrendChart } from '@/components/dashboard/TrendChart';

interface Transaction {
    id: string;
    amount: number;
    type: 'income' | 'expense';
    description: string;
    transaction_date: string;
    category_name?: string;
    category_color?: string;
    channel_name?: string;
}

interface TrendData {
    report_date: string;
    daily_income: number;
    daily_expense: number;
    daily_net_profit: number;
}

export default function AllTransactionsPage() {
    const { hasPermission } = useAuth();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [trendData, setTrendData] = useState<TrendData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [txRes, trendRes] = await Promise.all([
                axios.get('/api/transactions?limit=50'),
                axios.get('/api/dashboard/trend?days=14')
            ]);

            setTransactions(txRes.data.data);
            setTrendData(trendRes.data.data);
        } catch (error) {
            console.error("Failed to load data", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (hasPermission('transactions.read')) {
            fetchData();
        }
    }, [hasPermission]);

    return (
        <Layout
            title="Tüm İşlemler"
            description="Tüm gelir ve gider hareketlerinizi buradan görüntüleyin."
        >
            <div className="space-y-6">
                {/* Trend Chart */}
                <div>
                    <TrendChart data={trendData} className="shadow-sm border-slate-100" />
                </div>

                {/* Transactions List */}
                <Card className="border-slate-100 shadow-sm">
                    <CardHeader>
                        <CardTitle>İşlem Hareketleri</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableBody>
                                {transactions.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center py-12 text-slate-400">
                                            {isLoading ? 'Yükleniyor...' : 'Henüz işlem kaydı bulunmuyor.'}
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
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant="secondary"
                                                        className={cn(
                                                            "text-[10px] uppercase font-bold tracking-wider",
                                                            t.type === 'income' ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                                                        )}
                                                    >
                                                        {t.type === 'income' ? 'Gelir' : 'Gider'}
                                                    </Badge>
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
                                                </div>
                                            </TableCell>
                                            <TableCell className={cn("text-right pr-6 font-semibold", t.type === 'income' ? 'text-emerald-600' : 'text-slate-900')}>
                                                {t.type === 'income' ? '+' : '-'}{Number(t.amount).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
