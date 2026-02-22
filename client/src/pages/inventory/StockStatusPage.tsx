import { useState, useEffect } from 'react';
import { Package, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';

interface StockSummary {
    id: string;
    name: string;
    unit: string;
    critical_stock_level: number;
    min_stock_level: number;
    current_stock: number;
    total_used: number;
    stock_status: 'critical' | 'low' | 'normal';
}



export default function StockStatusPage() {
    const [stockData, setStockData] = useState<StockSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStockSummary();
    }, []);

    const fetchStockSummary = async () => {
        try {
            const response = await axios.get('/api/inventory/stock-entries/summary');
            setStockData(response.data.data);
        } catch (error) {
            console.error('Veri yükleme hatası:', error);
            // alert('Stok durumu yüklenemedi'); // Silent fail for better UX
        } finally {
            setLoading(false);
        }
    };

    const criticalItems = stockData.filter(item => item.stock_status === 'critical');
    const lowItems = stockData.filter(item => item.stock_status === 'low');
    const normalItems = stockData.filter(item => item.stock_status === 'normal');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'critical':
                return 'border-red-200 bg-red-50';
            case 'low':
                return 'border-yellow-200 bg-yellow-50';
            default:
                return 'border-green-200 bg-green-50';
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'critical':
                return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Kritik</span>;
            case 'low':
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Düşük</span>;
            default:
                return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Normal</span>;
        }
    };

    const StockCard = ({ item }: { item: StockSummary }) => (
        <Card className={`${getStatusColor(item.stock_status)} border-2`}>
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg">
                            <Package className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            <CardDescription className="text-xs mt-1">
                                Birim: {item.unit}
                            </CardDescription>
                        </div>
                    </div>
                    {getStatusBadge(item.stock_status)}
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-slate-50 p-2 rounded">
                        <p className="text-xs text-slate-600 mb-1">Mevcut</p>
                        <p className="text-2xl font-bold text-slate-900">{item.current_stock}</p>
                    </div>
                    <div className="bg-slate-50 p-2 rounded">
                        <p className="text-xs text-slate-600 mb-1">Kullanılan</p>
                        <p className="text-2xl font-bold text-blue-600">{item.total_used}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-600 mb-1">Kritik</p>
                        <p className="text-lg font-semibold text-red-600">{item.critical_stock_level}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-600 mb-1">Minimum</p>
                        <p className="text-lg font-semibold text-yellow-600">{item.min_stock_level}</p>
                    </div>
                </div>

                {item.stock_status === 'critical' && (
                    <div className="mt-3 flex items-center gap-2 text-red-700 text-sm bg-red-100 p-2 rounded">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Acil stok girişi gerekli!</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );

    if (loading) {
        return (
            <Layout title="Stok Durumu" description="Yükleniyor...">
                <div className="flex items-center justify-center h-64">Yükleniyor...</div>
            </Layout>
        );
    }

    return (
        <Layout
            title="Stok Durumu"
            description="Tüm hammaddelerin anlık stok durumu"
        >
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-slate-600">Kritik Seviye</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-3xl font-bold text-red-600">{criticalItems.length}</div>
                            <div className="p-3 bg-red-100 rounded-full">
                                <TrendingDown className="h-6 w-6 text-red-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-slate-600">Düşük Seviye</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-3xl font-bold text-yellow-600">{lowItems.length}</div>
                            <div className="p-3 bg-yellow-100 rounded-full">
                                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-slate-600">Normal Seviye</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-3xl font-bold text-green-600">{normalItems.length}</div>
                            <div className="p-3 bg-green-100 rounded-full">
                                <TrendingUp className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Stock Items by Status */}
            <Tabs defaultValue="all" className="w-full">
                <TabsList>
                    <TabsTrigger value="all">Tümü ({stockData.length})</TabsTrigger>
                    <TabsTrigger value="critical">Kritik ({criticalItems.length})</TabsTrigger>
                    <TabsTrigger value="low">Düşük ({lowItems.length})</TabsTrigger>
                    <TabsTrigger value="normal">Normal ({normalItems.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stockData.map((item) => (
                            <StockCard key={item.id} item={item} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="critical" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {criticalItems.length === 0 ? (
                            <p className="col-span-full text-center text-slate-500 py-8">Kritik seviyede stok yok</p>
                        ) : (
                            criticalItems.map((item) => (
                                <StockCard key={item.id} item={item} />
                            ))
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="low" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {lowItems.length === 0 ? (
                            <p className="col-span-full text-center text-slate-500 py-8">Düşük seviyede stok yok</p>
                        ) : (
                            lowItems.map((item) => (
                                <StockCard key={item.id} item={item} />
                            ))
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="normal" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {normalItems.length === 0 ? (
                            <p className="col-span-full text-center text-slate-500 py-8">Normal seviyede stok yok</p>
                        ) : (
                            normalItems.map((item) => (
                                <StockCard key={item.id} item={item} />
                            ))
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </Layout >
    );
}
