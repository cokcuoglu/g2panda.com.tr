import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from '@/components/ui/badge';
import {
    ShieldAlert,
    ChevronLeft,
    ChevronRight,
    Search,
    History,
    Calendar,
    Filter,
    User,
    Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuditLog {
    id: string;
    action: string;
    entity_type: string;
    entity_id: string;
    performed_by: string;
    created_at: string;
    details?: string;
}

export default function AuditLogs() {
    const { hasPermission } = useAuth();
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(false);

    // Filters
    const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [actionFilter, setActionFilter] = useState('all');

    // Pagination
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/audit-logs', {
                params: {
                    start_date: startDate,
                    end_date: endDate,
                    action: actionFilter !== 'all' ? actionFilter : undefined,
                    page,
                    limit: 50
                }
            });

            const data = response.data.data || [];
            if (page === 1) {
                setLogs(data);
            } else {
                setLogs(prev => [...prev, ...data]);
            }

            if (data.length < 50) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }

        } catch (error) {
            console.error('Error fetching audit logs:', error);
            // Mock data for demo
            setLogs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasPermission('audit.read')) {
            fetchLogs();
        }
    }, [page, hasPermission]);

    const handleFilterSubmit = () => {
        setPage(1);
        fetchLogs();
    };

    if (!hasPermission('audit.read')) {
        return (
            <Layout title="Denetim Kayıtları" description="Aktivite Geçmişi">
                <Card className="border-none shadow-premium bg-red-50/50 backdrop-blur-sm">
                    <CardContent className="flex flex-col items-center justify-center p-16 text-center text-red-800">
                        <div className="p-4 bg-red-100 rounded-full mb-6">
                            <ShieldAlert className="h-12 w-12 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold">Erişim Engellendi</h3>
                        <p className="text-sm mt-3 text-red-600/80 max-w-md">Denetim kayıtlarını görüntülemek için gerekli yetkiye sahip değilsiniz. Lütfen yönetici ile iletişime geçin.</p>
                    </CardContent>
                </Card>
            </Layout>
        );
    }

    const getActionBadge = (action: string) => {
        const variants: Record<string, string> = {
            'transaction.create': 'bg-green-50 text-green-700 border-green-100',
            'transaction.update': 'bg-blue-50 text-blue-700 border-blue-100',
            'transaction.delete': 'bg-red-50 text-red-700 border-red-100',
            'settings.update': 'bg-purple-50 text-purple-700 border-purple-100',
            'report.export': 'bg-amber-50 text-amber-700 border-amber-100',
            'auth.login': 'bg-indigo-50 text-indigo-700 border-indigo-100',
        };

        const labels: Record<string, string> = {
            'transaction.create': 'İşlem Oluşturma',
            'transaction.update': 'İşlem Güncelleme',
            'transaction.delete': 'İşlem Silme',
            'settings.update': 'Ayarlar Güncelleme',
            'report.export': 'Rapor Dışa Aktarma',
            'auth.login': 'Giriş Yapıldı',
        };

        return (
            <Badge variant="outline" className={cn("font-medium px-2.5 py-0.5 whitespace-nowrap", variants[action] || 'bg-slate-50 text-slate-700 border-slate-100')}>
                {labels[action] || action}
            </Badge>
        );
    };

    return (
        <Layout
            title="Denetim Kayıtları"
            description="Tüm sistem aktivitelerini ve değişiklikleri takip edin"
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="border-none shadow-premium overflow-hidden">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-primary" />
                            <CardTitle className="text-base font-bold">Filtreleme</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
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
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
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
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                    <Activity className="h-3 w-3" />
                                    İşlem Tipi
                                </label>
                                <Select value={actionFilter} onValueChange={setActionFilter}>
                                    <SelectTrigger className="h-10 border-slate-200">
                                        <SelectValue placeholder="İşlem Seçin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tüm İşlemler</SelectItem>
                                        <SelectItem value="transaction.create">İşlem Oluşturma</SelectItem>
                                        <SelectItem value="transaction.update">İşlem Güncelleme</SelectItem>
                                        <SelectItem value="transaction.delete">İşlem Silme</SelectItem>
                                        <SelectItem value="settings.update">Ayarlar Güncelleme</SelectItem>
                                        <SelectItem value="report.export">Rapor Dışa Aktarma</SelectItem>
                                        <SelectItem value="auth.login">Giriş</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button
                                onClick={handleFilterSubmit}
                                disabled={loading}
                                className="h-10 gap-2 shadow-sm hover:shadow-md transition-all active:scale-95"
                            >
                                <Search className="h-4 w-4" />
                                {loading ? 'Yükleniyor...' : 'Kayıtları Filtrele'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-premium overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <History className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Aktivite Geçmişi</CardTitle>
                                <CardDescription>Sistem üzerindeki tüm hareketlerin detaylı dökümü</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-slate-50/50">
                                    <TableRow className="hover:bg-transparent border-none">
                                        <TableHead className="font-bold text-slate-500 py-4 pl-6 h-auto">Tarih & Saat</TableHead>
                                        <TableHead className="font-bold text-slate-500 py-4 h-auto">Kullanıcı</TableHead>
                                        <TableHead className="font-bold text-slate-500 py-4 h-auto">İşlem</TableHead>
                                        <TableHead className="font-bold text-slate-500 py-4 h-auto">Varlık</TableHead>
                                        <TableHead className="font-bold text-slate-500 py-4 pr-6 h-auto text-right">Varlık ID</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {logs.length === 0 && !loading ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-16 text-slate-400 italic">
                                                Seçilen kriterlere uygun kayıt bulunamadı.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        logs.map((log) => (
                                            <TableRow key={log.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                                                <TableCell className="py-4 pl-6 font-medium text-slate-600 whitespace-nowrap">
                                                    {new Date(log.created_at).toLocaleString('tr-TR', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 border border-white shadow-sm">
                                                            <User className="h-3 w-3" />
                                                        </div>
                                                        <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">
                                                            {log.performed_by.split('@')[0]}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    {getActionBadge(log.action)}
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    <span className="text-sm font-medium text-slate-500 capitalize px-2 py-0.5 bg-slate-100 rounded-md">
                                                        {log.entity_type === 'transaction' ? 'İşlem' : (log.entity_type === 'business' ? 'İşletme' : log.entity_type)}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="py-4 pr-6 text-right font-mono text-[10px] text-slate-400">
                                                    {log.entity_id}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex items-center justify-between p-6 border-t border-slate-50 bg-slate-50/30">
                            <span className="text-sm text-slate-500 font-medium">
                                Sayfa <span className="text-slate-900 font-bold">{page}</span>
                            </span>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-9 px-4 border-slate-200 font-semibold"
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1 || loading}
                                >
                                    <ChevronLeft className="h-4 w-4 mr-2" /> Geri
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-9 px-4 border-slate-200 font-semibold"
                                    onClick={() => setPage(p => p + 1)}
                                    disabled={!hasMore || loading}
                                >
                                    İleri <ChevronRight className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
