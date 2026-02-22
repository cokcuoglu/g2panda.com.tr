import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface ProductStats {
    name: string;
    total_quantity: number;
    total_revenue: number;
}



export default function Dashboard() {
    const [topSelling, setTopSelling] = useState<ProductStats[]>([]);
    const [leastSelling, setLeastSelling] = useState<ProductStats[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await axios.get('/api/inventory/stats/product-performance');
            setTopSelling(response.data.data.topSelling);
            setLeastSelling(response.data.data.leastSelling);
        } catch (error) {
            console.error('İstatistik yükleme hatası:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout
            title="Özet"
            description="İşletme genel durum özeti"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Selling Products Card */}
                <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-green-600" />
                                En Çok Satan Ürünler
                            </h3>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Top 5</span>
                        </div>
                        <div className="space-y-4">
                            {loading ? (
                                <div className="text-center py-8 text-slate-400">Yükleniyor...</div>
                            ) : topSelling.length === 0 ? (
                                <div className="text-center py-8 text-slate-400">Henüz satış verisi yok</div>
                            ) : (
                                topSelling.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{item.name}</p>
                                                <p className="text-xs text-slate-500">{Number(item.total_revenue).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })} Ciro</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-slate-900 text-lg">{item.total_quantity}</div>
                                            <div className="text-xs text-slate-500">Adet Satıldı</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Least Selling Products Card */}
                <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                <TrendingDown className="h-5 w-5 text-red-600" />
                                En Az Satan Ürünler
                            </h3>
                            <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">Bottom 5</span>
                        </div>
                        <div className="space-y-4">
                            {loading ? (
                                <div className="text-center py-8 text-slate-400">Yükleniyor...</div>
                            ) : leastSelling.length === 0 ? (
                                <div className="text-center py-8 text-slate-400">Henüz satış verisi yok</div>
                            ) : (
                                leastSelling.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-sm font-bold">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{item.name}</p>
                                                <p className="text-xs text-slate-500">{Number(item.total_revenue).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })} Ciro</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-slate-900 text-lg">{item.total_quantity}</div>
                                            <div className="text-xs text-slate-500">Adet Satıldı</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout >
    );
}
