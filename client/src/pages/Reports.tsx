import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import {
    FileDown,
    FileSpreadsheet,
    BarChart3,
    Calendar,
    Filter,
    TrendingUp,
    TrendingDown,
    Wallet,
    Download,
    RefreshCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReportSummary {
    total_income: number;
    total_expense: number;
    net_profit: number;
    income_count: number;
    expense_count: number;
}

interface TrendData {
    report_date: string;
    daily_income: number;
    daily_expense: number;
    daily_net_profit: number;
}

export default function Reports() {
    const { hasPermission } = useAuth();
    const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [reportType, setReportType] = useState('all');
    const [loading, setLoading] = useState(false);

    const [summary, setSummary] = useState<ReportSummary | null>(null);
    const [trendData, setTrendData] = useState<TrendData[]>([]);

    const fetchReportData = async () => {
        setLoading(true);
        try {
            const summaryRes = await axios.get(`/api/reports/summary`, {
                params: { start_date: startDate, end_date: endDate, type: reportType }
            });
            setSummary(summaryRes.data.data);

            const trendRes = await axios.get('/api/dashboard/trend', {
                params: { days: 30 }
            });
            setTrendData(trendRes.data.data);

        } catch (error) {
            console.error('Error fetching report data:', error);
            console.error('Error fetching report data:', error);
            // setSummary(null); // Explicitly reset or keep null
            setSummary(null);
            setTrendData([]); // Reset trend data
            // Optional: Show error toast here
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReportData();
    }, []);

    const handleExport = async (format: 'pdf' | 'excel') => {
        try {
            const response = await axios.get(`/api/reports/export/${format}`, {
                params: { start_date: startDate, end_date: endDate, type: reportType },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `rapor_${startDate}_${endDate}.${format === 'excel' ? 'xlsx' : 'pdf'}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error(`Error exporting ${format}:`, error);
        }
    };

    const KPICard = ({ title, value, count, type }: { title: string, value: number, count?: number, type: 'income' | 'expense' | 'net' }) => {
        const isPositive = value >= 0;
        let icon = <Wallet className="h-5 w-5" />;
        let bgColor = "bg-blue-50";
        let iconColor = "text-blue-600";

        if (type === 'income') {
            icon = <TrendingUp className="h-5 w-5" />;
            bgColor = "bg-green-50";
            iconColor = "text-green-600";
        } else if (type === 'expense') {
            icon = <TrendingDown className="h-5 w-5" />;
            bgColor = "bg-red-50";
            iconColor = "text-red-600";
        } else if (type === 'net') {
            icon = <BarChart3 className="h-5 w-5" />;
            bgColor = isPositive ? "bg-emerald-50" : "bg-orange-50";
            iconColor = isPositive ? "text-emerald-600" : "text-orange-600";
        }

        return (
            <Card className="border-none shadow-premium transition-all duration-300 overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className={cn("p-2.5 rounded-xl transition-colors", bgColor, iconColor)}>
                            {icon}
                        </div>
                        {count !== undefined && (
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md">
                                {count} İşlem
                            </span>
                        )}
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</p>
                        <h3 className={cn(
                            "text-2xl font-bold tracking-tight",
                            type === 'income' ? 'text-green-600' : type === 'expense' ? 'text-red-600' : (isPositive ? 'text-emerald-600' : 'text-orange-600')
                        )}>
                            {value.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL
                        </h3>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <Layout
            title="Finansal Raporlar"
            description="Detaylı finansal raporlar oluşturun ve dışa aktarın"
            actions={
                <Button
                    variant="outline"
                    onClick={fetchReportData}
                    disabled={loading}
                    className="gap-2 border-slate-200"
                >
                    <RefreshCcw className={cn("h-4 w-4", loading && "animate-spin")} />
                    Verileri Güncelle
                </Button>
            }
        >
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Filters Section */}
                <Card className="border-none shadow-premium overflow-hidden">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-primary" />
                            <CardTitle className="text-base font-bold">Rapor Kriterleri</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Calendar className="h-3 w-3" />
                                    Başlangıç Tarihi
                                </label>
                                <Input
                                    type="date"
                                    value={startDate}
                                    className="h-10 border-slate-200"
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Calendar className="h-3 w-3" />
                                    Bitiş Tarihi
                                </label>
                                <Input
                                    type="date"
                                    value={endDate}
                                    className="h-10 border-slate-200"
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                    <Download className="h-3 w-3" />
                                    Rapor Tipi
                                </label>
                                <Select value={reportType} onValueChange={setReportType}>
                                    <SelectTrigger className="h-10 border-slate-200">
                                        <SelectValue placeholder="Tür seçin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tüm İşlemler</SelectItem>
                                        <SelectItem value="income">Sadece Gelirler</SelectItem>
                                        <SelectItem value="expense">Sadece Giderler</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button
                                onClick={fetchReportData}
                                disabled={loading}
                                className="h-10 font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
                            >
                                Görünümü Güncelle
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content Sections */}
                {summary && (
                    <div className="space-y-8">
                        {/* Summary Visualization */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <KPICard title="Toplam Gelir" value={summary.total_income} count={summary.income_count} type="income" />
                            <KPICard title="Toplam Gider" value={summary.total_expense} count={summary.expense_count} type="expense" />
                            <KPICard title="Net Sonuç" value={summary.net_profit} type="net" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <Card className="border-none shadow-premium lg:col-span-2 overflow-hidden">
                                <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <BarChart3 className="h-4 w-4 text-primary" />
                                        Gelişim Analizi
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="h-[350px] pt-6 px-2">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colInc" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colExp" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis
                                                dataKey="report_date"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 11 }}
                                                tickFormatter={(v) => {
                                                    const d = new Date(v);
                                                    return `${d.getDate()}/${d.getMonth() + 1}`;
                                                }}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 11 }}
                                                width={60}
                                                tickFormatter={(v) => `${v / 1000}k`}
                                            />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                                labelFormatter={(v) => new Date(v).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}
                                            />
                                            <Legend iconType="circle" />
                                            <Area type="monotone" dataKey="daily_income" name="Gelir" stroke="#22c55e" fillOpacity={1} fill="url(#colInc)" strokeWidth={3} />
                                            <Area type="monotone" dataKey="daily_expense" name="Gider" stroke="#ef4444" fillOpacity={1} fill="url(#colExp)" strokeWidth={3} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-premium overflow-hidden">
                                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                                    <div className="flex items-center gap-2">
                                        <FileDown className="h-4 w-4 text-primary" />
                                        <CardTitle className="text-base font-bold">Dışa Aktarma</CardTitle>
                                    </div>
                                    <CardDescription>Raporlarınızı farklı formatlarda indirin</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-8 space-y-4">
                                    <Button
                                        variant="outline"
                                        className="w-full h-14 justify-start gap-4 border-slate-200 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 transition-all group"
                                        onClick={() => handleExport('excel')}
                                        disabled={!hasPermission('reports.export')}
                                    >
                                        <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                            <FileSpreadsheet className="h-5 w-5" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-sm">Excel Raporu</p>
                                            <p className="text-[10px] opacity-70 uppercase tracking-tighter">.xlsx Formatı</p>
                                        </div>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="w-full h-14 justify-start gap-4 border-slate-200 hover:border-red-200 hover:bg-red-50 hover:text-red-700 transition-all group"
                                        onClick={() => handleExport('pdf')}
                                        disabled={!hasPermission('reports.export')}
                                    >
                                        <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-600 group-hover:text-white transition-colors">
                                            <FileDown className="h-5 w-5" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-sm">PDF Raporu</p>
                                            <p className="text-[10px] opacity-70 uppercase tracking-tighter">.pdf Formatı</p>
                                        </div>
                                    </Button>

                                    {!hasPermission('reports.export') && (
                                        <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                                            <p className="text-xs text-slate-500 text-center italic font-medium">
                                                Rapor dışa aktarmak için yönetici yetkisi gereklidir.
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
