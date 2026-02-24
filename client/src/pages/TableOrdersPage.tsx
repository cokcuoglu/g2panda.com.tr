import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Utensils,
    RefreshCw,
    Clock,
    Users,
    Circle,
    Loader2,
    LayoutGrid
} from 'lucide-react';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { TableDetailSheet } from '@/components/sales/TableDetailSheet';

interface Table {
    id: string;
    unique_code: string;
    name: string;
    type: string;
    capacity: number;
    status: 'available' | 'active';
    area: string;
    service_request?: string | null;
}

interface TableOrderInfo {
    table_id: string;
    order_id?: string;
    total_amount?: number;
    duration_minutes?: number;
    item_count?: number;
    status?: 'pending' | 'confirmed' | 'completed' | 'rejected';
    updated_at?: string;
    order_type?: string;
}

export default function TableOrdersPage() {
    const [tables, setTables] = useState<Table[]>([]);
    const [tableOrders, setTableOrders] = useState<Record<string, TableOrderInfo>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTable, setSelectedTable] = useState<Table | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const tablesRes = await axios.get('/api/tables');
            setTables(tablesRes.data.data);

            const activeTableIds = tablesRes.data.data
                .filter((t: Table) => t.status === 'active')
                .map((t: Table) => t.id);

            const ordersMap: Record<string, TableOrderInfo> = {};

            await Promise.all(activeTableIds.map(async (tableId: string) => {
                try {
                    const orderRes = await axios.get(`/api/table-orders/${tableId}`);
                    if (orderRes.data.data) {
                        const order = orderRes.data.data;
                        ordersMap[tableId] = {
                            table_id: tableId,
                            order_id: order.id,
                            total_amount: order.total_amount,
                            item_count: Array.isArray(order.items) ? order.items.length : 0,
                            duration_minutes: Math.floor((Date.now() - new Date(order.created_at).getTime()) / 60000),
                            status: order.status,
                            updated_at: order.updated_at,
                            order_type: order.order_type
                        };
                    }
                } catch (err) {
                    console.error(`Failed to fetch order for table ${tableId}`, err);
                }
            }));

            setTableOrders(ordersMap);
        } catch (err) {
            console.error('Failed to fetch table orders data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Audio logic moved to GlobalOrderMonitor

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000); // Keep polling for UI updates
        return () => clearInterval(interval);
    }, []);

    const handleTableClick = (table: Table) => {
        setSelectedTable(table);
        setIsSheetOpen(true);
    };

    return (
        <Layout title="Masa Siparişleri" description="Masalarınızın durumunu ve açık siparişleri takip edin">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 rounded-full text-xs font-semibold text-neutral-600">
                            <Circle className="h-3 w-3 fill-neutral-300 stroke-neutral-400" />
                            Boş: {tables.filter(t => t.status === 'available').length}
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 rounded-full text-xs font-semibold text-emerald-600">
                            <Circle className="h-3 w-3 fill-emerald-500 stroke-emerald-600" />
                            Dolu: {tables.filter(t => t.status === 'active').length}
                        </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={fetchData} className="gap-2">
                        <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
                        Yenile
                    </Button>
                </div>

                {isLoading && tables.length === 0 ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
                    </div>
                ) : tables.length === 0 ? (
                    <Card className="border-dashed border-2 bg-slate-50/50">
                        <CardContent className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                            <LayoutGrid className="h-12 w-12 text-slate-300" />
                            <div>
                                <p className="text-slate-500 font-medium">Henüz hiç masa eklenmemiş.</p>
                                <p className="text-xs text-slate-400">Ayarlar &gt; Masa Yerleşimi kısmından masalarınızı oluşturabilirsiniz.</p>
                            </div>
                            <Button onClick={() => navigate('/settings/tables')} variant="outline" size="sm">
                                Masaları Düzenle
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {tables.map(table => {
                            const order = tableOrders[table.id];
                            const isActive = table.status === 'active';

                            return (
                                <Card
                                    key={table.id}
                                    className={cn(
                                        "cursor-pointer transition-all hover:scale-[1.02] active:scale-95 group relative overflow-hidden",
                                        isActive
                                            ? "border-emerald-200 shadow-emerald-100/50"
                                            : "border-slate-200 hover:border-primary/30"
                                    )}
                                    onClick={() => handleTableClick(table)}
                                >
                                    {isActive && (
                                        <div className="absolute top-0 right-0 p-1 z-10">
                                            {/* Blinking for pending QR orders, solid for confirmed/merchant */}
                                            {order?.status === 'pending' && (!order.order_type || order.order_type !== 'merchant') ? (
                                                <>
                                                    <div className="h-3 w-3 rounded-full bg-orange-500 animate-ping absolute" />
                                                    <div className="h-3 w-3 rounded-full bg-orange-500 relative" />
                                                </>
                                            ) : (
                                                <div className="h-3 w-3 rounded-full bg-emerald-500 relative" />
                                            )}
                                        </div>
                                    )}
                                    {table.service_request && (isActive || table.service_request !== 'Hesap İstiyor') && (
                                        <div className="absolute inset-x-0 bottom-0 z-20 bg-red-600 text-white text-[10px] font-bold py-1 text-center animate-pulse">
                                            {table.service_request}
                                        </div>
                                    )}
                                    <CardContent className="p-4 flex flex-col items-center text-center space-y-3 pb-8">
                                        <div className={cn(
                                            "h-14 w-14 rounded-2xl flex items-center justify-center shadow-inner transition-colors",
                                            isActive ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-primary/5 group-hover:text-primary/70"
                                        )}>
                                            <Utensils className="h-6 w-6" />
                                        </div>

                                        <div className="space-y-0.5">
                                            <h3 className="font-bold text-slate-800 text-sm">{table.name}</h3>
                                            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                                                <Users className="h-3 w-3" />
                                                {table.capacity} Kişilik
                                            </div>
                                        </div>

                                        {isActive && order ? (
                                            <div className="w-full pt-3 mt-1 border-t border-emerald-50 space-y-2">
                                                <div className="flex justify-between items-center text-[10px] font-bold text-emerald-600">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {order.duration_minutes} dk
                                                    </span>
                                                    <span>{order.total_amount?.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-emerald-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '60%' }} />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full pt-3 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-[10px] font-bold text-primary px-3 py-1 bg-primary/5 rounded-full uppercase tracking-widest">
                                                    Aç
                                                </span>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}

                <TableDetailSheet
                    table={selectedTable}
                    open={isSheetOpen}
                    onOpenChange={setIsSheetOpen}
                    onOrderUpdated={fetchData}
                />
            </div>
        </Layout>
    );
}
