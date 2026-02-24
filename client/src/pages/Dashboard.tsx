import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useBusiness } from '@/context/BusinessContext';
import { Badge } from '@/components/ui/badge';
import {
    TrendingUp,
    TrendingDown,
    Utensils,
    ExternalLink,
    Package,
    Table as TableIcon,
    AlertCircle,
    Store,
    Clock,
    Zap,
    Power
} from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';

interface StatItem {
    name: string;
    total_quantity: number;
    total_revenue: number;
}

interface PerformanceData {
    topTables: StatItem[];
    leastTables: StatItem[];
}

interface ProductPerformanceData {
    topSelling: StatItem[];
    leastSelling: StatItem[];
}

interface LiveStats {
    activeTables: number;
    pendingOrders: number;
}

interface BusinessStatus {
    is_open: boolean;
    last_opened_at: string | null;
    last_closed_at: string | null;
}

export default function Dashboard() {
    const { user } = useAuth();
    const { setIsOpen: setGlobalIsOpen } = useBusiness();
    const [performance, setPerformance] = useState<PerformanceData>({ topTables: [], leastTables: [] });
    const [productPerformance, setProductPerformance] = useState<ProductPerformanceData>({ topSelling: [], leastSelling: [] });
    const [liveStats, setLiveStats] = useState<LiveStats>({ activeTables: 0, pendingOrders: 0 });
    const [status, setStatus] = useState<BusinessStatus>({ is_open: true, last_opened_at: null, last_closed_at: null });
    const [loading, setLoading] = useState(true);
    const [toggleLoading, setToggleLoading] = useState(false);

    const fetchAllStats = async () => {
        try {
            const [perfRes, prodRes, liveRes, statusRes] = await Promise.all([
                axios.get('/api/inventory/stats/performance'),
                axios.get('/api/inventory/stats/product-performance'),
                axios.get('/api/inventory/stats/live'),
                axios.get('/api/business-status')
            ]);
            setPerformance(perfRes.data.data);
            setProductPerformance(prodRes.data.data);
            setLiveStats(liveRes.data.data);
            setStatus(statusRes.data.data);
            setGlobalIsOpen(statusRes.data.data.is_open);
        } catch (error) {
            console.error('İstatistikleri getirme hatası:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllStats();

        const interval = setInterval(async () => {
            try {
                const [liveRes, statusRes] = await Promise.all([
                    axios.get('/api/inventory/stats/live'),
                    axios.get('/api/business-status')
                ]);
                setLiveStats(liveRes.data.data);
                if (statusRes.data.success) {
                    setStatus(statusRes.data.data);
                    setGlobalIsOpen(statusRes.data.data.is_open);
                }
            } catch (error) {
                console.error('Anlık veri güncelleme hatası:', error);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleToggleStatus = async () => {
        if (toggleLoading) return;
        setToggleLoading(true);
        try {
            const res = await axios.post('/api/business-status/toggle');
            if (res.data.success) {
                setStatus(res.data.data);
                setGlobalIsOpen(res.data.data.is_open);
            }
        } catch (error) {
            console.error('Durum değiştirme hatası:', error);
        } finally {
            setToggleLoading(false);
        }
    };

    const StatCard = ({
        title,
        items,
        icon: Icon,
        type = 'success',
        label,
        valueLabel = 'Satış'
    }: {
        title: string;
        items: StatItem[];
        icon: any;
        type?: 'success' | 'danger' | 'info';
        label: string;
        valueLabel?: string;
    }) => {
        const colors = {
            success: "text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-950",
            danger: "text-rose-600 bg-rose-50 border-rose-100 dark:bg-rose-950/30 dark:border-rose-950",
            info: "text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-950/30 dark:border-blue-950"
        };

        const iconColors = {
            success: "text-emerald-500",
            danger: "text-rose-500",
            info: "text-blue-500"
        };

        const maxVal = items.length > 0 ? Math.max(...items.map(i => i.total_revenue)) : 1;

        return (
            <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-0">
                    <div className="p-6 border-b border-slate-50 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                                <div className={`p-2 rounded-lg ${colors[type].split(' ')[1]}`}>
                                    <Icon className={`h-5 w-5 ${iconColors[type]}`} />
                                </div>
                                <h3 className="font-bold text-slate-800 dark:text-slate-100 uppercase tracking-tight text-sm">
                                    {title}
                                </h3>
                            </div>
                            <Badge variant="outline" className={`font-semibold border ${colors[type]}`}>
                                {label}
                            </Badge>
                        </div>
                    </div>

                    <div className="p-4 space-y-3">
                        {loading ? (
                            Array(5).fill(0).map((_, i) => (
                                <div key={i} className="h-14 w-full bg-slate-50 dark:bg-slate-900/50 animate-pulse rounded-xl" />
                            ))
                        ) : items.length === 0 ? (
                            <div className="py-12 flex flex-col items-center justify-center text-slate-400 gap-2">
                                <AlertCircle className="h-8 w-8 opacity-20" />
                                <p className="text-sm font-medium">Veri bulunamadı</p>
                            </div>
                        ) : (
                            items.map((item, index) => (
                                <div key={index} className="group relative">
                                    <div className="flex items-center justify-between relative z-10 px-3 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-black text-slate-300 dark:text-slate-700 w-4 italic">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate max-w-[140px]">
                                                    {item.name}
                                                </p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                                        {item.total_quantity} {valueLabel}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-slate-900 dark:text-slate-50">
                                                {Number(item.total_revenue).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 })}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={`absolute bottom-0 left-0 h-0.5 rounded-full transition-all duration-1000 ${type === 'danger' ? 'bg-rose-500/10' : 'bg-emerald-500/10'}`}
                                        style={{ width: `${(Number(item.total_revenue) / maxVal) * 100}%` }}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    };

    const qrUrl = `${import.meta.env.VITE_PUBLIC_DOMAIN || 'https://g2panda.com.tr'}/menu/${user?.id}/takeaway`;

    return (
        <Layout
            title="İşletme Özeti"
            description="Performans verileri ve canlı dükkan yönetimi"
        >
            <style>
                {`
                @keyframes pulse-glow {
                    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
                    70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                }
                .glow-active {
                    animation: pulse-glow 2s infinite;
                }
                .toggle-btn {
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .toggle-btn:active {
                    transform: scale(0.95);
                }
                .shutter-bg {
                    background: repeating-linear-gradient(
                        180deg,
                        #1e293b,
                        #1e293b 8px,
                        #0f172a 8px,
                        #0f172a 10px
                    );
                    box-shadow: inset 0 -10px 20px rgba(0,0,0,0.5);
                }
                .graffiti-text {
                    font-family: 'Permanent Marker', cursive, sans-serif;
                    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(3px 3px 0px rgba(0,0,0,0.8)) drop-shadow(0 0 10px rgba(239, 68, 68, 0.3));
                    transform: rotate(-5deg);
                }
                `}
            </style>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Left Column: Status, Live Sync and QR */}
                <div className="xl:col-span-1 space-y-6">
                    {/* Store Status Card */}
                    <Card className={`border-none shadow-lg transition-all duration-500 ${status.is_open ? 'bg-emerald-600' : 'bg-slate-700'}`}>
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Store className="h-5 w-5 text-white/80" />
                                        <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Dükkan Durumu</span>
                                    </div>
                                    <div className={`h-2 w-2 rounded-full ${status.is_open ? 'bg-emerald-300 animate-ping' : 'bg-slate-400 opacity-50'}`} />
                                </div>

                                <div className="py-4 flex flex-col items-center gap-4">
                                    <div className={`relative p-6 rounded-full transition-all duration-700 ${status.is_open ? 'bg-emerald-500 ' : 'bg-slate-600'}`}>
                                        <button
                                            onClick={handleToggleStatus}
                                            disabled={toggleLoading}
                                            className={`toggle-btn relative z-10 p-5 rounded-full bg-white shadow-xl flex items-center justify-center transition-all ${status.is_open ? 'text-emerald-600 glow-active' : 'text-slate-400'}`}
                                        >
                                            {toggleLoading ? (
                                                <div className="h-8 w-8 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin" />
                                            ) : (
                                                <Power className="h-8 w-8" />
                                            )}
                                        </button>
                                        {status.is_open && (
                                            <div className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse opacity-20" />
                                        )}
                                    </div>

                                    <div className="text-center">
                                        <h2 className="text-2xl font-black text-white italic tracking-tight">
                                            {status.is_open ? 'DÜKKAN AÇIK' : 'DÜKKAN KAPALI'}
                                        </h2>
                                        <div className="flex items-center justify-center gap-1.5 mt-1 text-white/60 text-[10px] font-bold uppercase">
                                            <Clock className="h-3 w-3" />
                                            {status.is_open ? (
                                                <span>Açılış: {status.last_opened_at ? new Date(status.last_opened_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) : '--:--'}</span>
                                            ) : (
                                                <span>Kapanış: {status.last_closed_at ? new Date(status.last_closed_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) : '--:--'}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Live Stats Box (Replacing Aktif Mod) */}
                    <Card className="border-none shadow-sm bg-blue-600 text-white overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <Zap className="h-24 w-24" />
                        </div>
                        <CardContent className="p-6 relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-500 rounded-lg">
                                    <Utensils className="h-4 w-4" />
                                </div>
                                <span className="text-xs font-bold text-blue-100 uppercase tracking-widest leading-none">Canlı Takip</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                                    <p className="text-[10px] font-bold text-blue-200 uppercase mb-1">Aktif Masa</p>
                                    <p className="text-2xl font-black italic leading-none">{liveStats.activeTables}</p>
                                </div>
                                <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                                    <p className="text-[10px] font-bold text-blue-200 uppercase mb-1">Bekleyen</p>
                                    <p className="text-2xl font-black italic leading-none">{liveStats.pendingOrders}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* QR Card */}
                    <Card className="border-none shadow-sm bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="p-3 bg-white rounded-2xl mb-4 shadow-xl">
                                    {user?.id ? (
                                        <QRCode
                                            size={120}
                                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                            value={qrUrl}
                                            viewBox={`0 0 256 256`}
                                        />
                                    ) : (
                                        <div className="h-[120px] w-[120px] bg-slate-200 animate-pulse rounded-lg" />
                                    )}
                                </div>
                                <h4 className="font-bold text-lg mb-1">Dijital Menü</h4>
                                <p className="text-slate-400 text-xs mb-6 px-4 leading-tight">
                                    Müşterileriniz bu QR kodu okutarak hızlıca sipariş verebilir.
                                </p>
                                <a
                                    href={qrUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                                >
                                    Menüyü Gör <ExternalLink className="h-4 w-4" />
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Columns: Stats Grid with Shutter Overlay */}
                <div className="xl:col-span-3 relative group overflow-hidden rounded-xl">

                    {/* The Shutter (Kepenk) */}
                    {!status.is_open && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center shutter-bg transition-transform duration-[1500ms] ease-in-out group-hover:-translate-y-[90%] md:group-hover:-translate-y-[95%]">
                            {/* Shutter bottom handle/bar */}
                            <div className="absolute bottom-0 left-0 right-0 h-4 bg-slate-900 border-t-2 border-slate-700 shadow-xl" />
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-2 rounded-full bg-slate-800" />

                            {/* Graffiti Text */}
                            <div className="relative z-10 flex flex-col items-center select-none pointer-events-none">
                                <span className="graffiti-text text-6xl md:text-8xl font-black uppercase tracking-widest">
                                    KAPALI
                                </span>
                                <span className="text-white/20 text-xs font-bold uppercase tracking-widest mt-4 opacity-0 group-hover:opacity-100 transition-opacity delay-300">
                                    İstatistikleri Görmek İçin Kaydır
                                </span>
                            </div>

                            {/* Dust/Grime Overlay */}
                            <div className="absolute inset-0 bg-black/20 pointer-events-none Mix-blend-overlay" />
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-0">
                        <StatCard
                            title="En Çok Satanlar"
                            items={productPerformance.topSelling}
                            icon={TrendingUp}
                            type="success"
                            label="Top 5 Ürün"
                            valueLabel="Adet"
                        />
                        <StatCard
                            title="En Az Satanlar"
                            items={productPerformance.leastSelling}
                            icon={TrendingDown}
                            type="danger"
                            label="Kritik 5 Ürün"
                            valueLabel="Adet"
                        />
                        <StatCard
                            title="Gözde Masalar"
                            items={performance.topTables}
                            icon={TableIcon}
                            type="info"
                            label="Top 5 Masa"
                            valueLabel="İşlem"
                        />
                        <StatCard
                            title="Sessiz Masalar"
                            items={performance.leastTables}
                            icon={Package}
                            type="danger"
                            label="Düşük 5 Masa"
                            valueLabel="İşlem"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
