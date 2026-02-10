
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, XCircle, Clock, MapPin } from 'lucide-react';

export default function IncomingOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    // Finalize Dialog State
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [isFinalizeDialogOpen, setIsFinalizeDialogOpen] = useState(false);

    // Config State (Categories/Channels)
    const [incomeCategories, setIncomeCategories] = useState<any[]>([]);
    const [paymentChannels, setPaymentChannels] = useState<any[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
    const [selectedChannelId, setSelectedChannelId] = useState<string>('');

    // Poll for new orders every 30 seconds
    useEffect(() => {
        fetchOrders();
        fetchConfig();
        const interval = setInterval(fetchOrders, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get('/api/orders?limit=50');
            setOrders(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch orders", error);
            setLoading(false);
        }
    };

    const fetchConfig = async () => {
        try {
            const [catRes, chanRes] = await Promise.all([
                axios.get('/api/categories').catch(() => ({ data: { data: [] } })),
                axios.get('/api/channels').catch(() => ({ data: { data: [] } }))
            ]);

            const incomeCats = (catRes.data.data || []).filter((c: any) => c.type === 'income');
            setIncomeCategories(incomeCats);
            setPaymentChannels(chanRes.data.data || []);

            // Set defaults if available
            if (incomeCats.length > 0) {
                setSelectedCategoryId(incomeCats[0].id);
                if (incomeCats[0].default_channel_id) {
                    setSelectedChannelId(incomeCats[0].default_channel_id);
                }
            }
        } catch (error) {
            console.error("Failed to load config", error);
        }
    };

    const handleRejectOrder = async (orderId: string) => {
        if (!confirm("Bu siparişi reddetmek istediğinize emin misiniz?")) return;

        try {
            await axios.put(`/api/orders/${orderId}/status`, { status: 'rejected' });
            fetchOrders(); // Refresh
        } catch (error) {
            console.error("Failed to reject order", error);
            alert("İşlem başarısız.");
        }
    };

    const handleOpenFinalize = (order: any) => {
        setSelectedOrder(order);
        setIsFinalizeDialogOpen(true);
        // Reset selections to default if needed, or keep last used?
        // Let's keep existing state or reset if empty.
        if (!selectedCategoryId && incomeCategories.length > 0) {
            setSelectedCategoryId(incomeCategories[0].id);
        }
    };

    const handleFinalizeOrder = async () => {
        if (!selectedOrder || !selectedCategoryId || !selectedChannelId) return;

        setIsProcessing(true);
        try {
            await axios.post(`/api/orders/${selectedOrder.id}/finalize`, {
                category_id: selectedCategoryId,
                channel_id: selectedChannelId
            });
            setIsFinalizeDialogOpen(false);
            fetchOrders(); // Refresh list
        } catch (error: any) {
            console.error("Failed to finalize order", error);
            alert(error.response?.data?.error || "Satış işlemi başarısız.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) {
        return (
            <Layout title="Gelen Siparişler" description="QR Menü Sipariş Yönetimi">
                <div className="flex justify-center p-10">
                    <Loader2 className="animate-spin text-slate-400" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Gelen Siparişler" description="QR Menü Sipariş Yönetimi">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {orders.length === 0 ? (
                    <div className="col-span-full text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-500">
                        Henüz sipariş yok.
                    </div>
                ) : (
                    orders.map((order) => (
                        <Card key={order.id} className={order.status === 'pending' ? 'border-l-4 border-l-yellow-400' : ''}>
                            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                                <CardTitle className="text-sm font-medium text-slate-500">
                                    {order.order_number}
                                </CardTitle>
                                {order.status === 'pending' && <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Bekliyor</Badge>}
                                {order.status === 'completed' && <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Tamamlandı</Badge>}
                                {order.status === 'rejected' && <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Reddedildi</Badge>}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold mb-1">{Number(order.total_amount).toLocaleString('tr-TR')} ₺</div>
                                <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">
                                    <Clock size={12} />
                                    {new Date(order.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                    <span className="mx-1">•</span>
                                    {order.table_number || "Masa Bilgisi Yok"}
                                </p>

                                {/* Customer Info */}
                                {(order.customer_name || order.customer_phone) && (
                                    <div className="mb-4 text-sm bg-blue-50 p-2 rounded border border-blue-100 text-blue-900">
                                        {order.customer_name && <div className="font-bold">{order.customer_name}</div>}
                                        {order.customer_phone && <div>{order.customer_phone}</div>}

                                        {/* Formatted Address */}
                                        {(order.customer_address || order.customer_city) && (
                                            <div className="text-xs mt-1 text-blue-800 border-t border-blue-200 pt-1">
                                                <MapPin className="inline-block w-3 h-3 mr-1 mb-0.5" />
                                                {order.customer_neighborhood && <span className="font-semibold">{order.customer_neighborhood} Mah. </span>}
                                                {order.customer_address}
                                                {(order.customer_district || order.customer_city) && (
                                                    <div className="font-semibold mt-0.5">
                                                        {order.customer_district && `${order.customer_district} / `}
                                                        {order.customer_city}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="space-y-1 mb-4 bg-slate-50 p-2 rounded-lg text-sm">
                                    {order.items.map((item: any, idx: number) => (
                                        <div key={idx} className="flex justify-between">
                                            <span>{item.quantity}x {item.name}</span>
                                            <span className="text-slate-500">{Number(item.price).toLocaleString()} ₺</span>
                                        </div>
                                    ))}
                                </div>

                                {order.note && (
                                    <div className="text-xs text-amber-700 bg-amber-50 p-2 rounded mb-4">
                                        Note: {order.note}
                                    </div>
                                )}

                                {order.status === 'pending' && (
                                    <div className="flex gap-2">
                                        <Button
                                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                                            size="sm"
                                            onClick={() => handleOpenFinalize(order)}
                                        >
                                            <CheckCircle className="mr-1 h-4 w-4" /> Onayla
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                                            size="sm"
                                            onClick={() => handleRejectOrder(order.id)}
                                        >
                                            <XCircle className="mr-1 h-4 w-4" /> Reddet
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Finalize Dialog */}
            <Dialog open={isFinalizeDialogOpen} onOpenChange={setIsFinalizeDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Siparişi Onayla ve Satışa Çevir</DialogTitle>
                        <DialogDescription>
                            Siparişi satış olarak kaydetmek için kategori ve ödeme yöntemi seçin.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>Kategori</Label>
                            <Select
                                value={selectedCategoryId}
                                onValueChange={(val) => {
                                    setSelectedCategoryId(val);
                                    const cat = incomeCategories.find((c: any) => c.id === val);
                                    if (cat && cat.default_channel_id) {
                                        setSelectedChannelId(cat.default_channel_id);
                                    }
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Kategori seçiniz" />
                                </SelectTrigger>
                                <SelectContent>
                                    {incomeCategories.map((cat) => (
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
                            <Label>Ödeme Yöntemi</Label>
                            <Select
                                value={selectedChannelId}
                                onValueChange={setSelectedChannelId}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Ödeme yöntemi seçiniz" />
                                </SelectTrigger>
                                <SelectContent>
                                    {paymentChannels.filter(chan => {
                                        if (!selectedCategoryId) return true;
                                        const cat = incomeCategories.find((c: any) => c.id === selectedCategoryId);
                                        if (cat && cat.form_channel_ids && cat.form_channel_ids.length > 0) {
                                            return cat.form_channel_ids.includes(chan.id);
                                        }
                                        return true;
                                    }).map((chan) => (
                                        <SelectItem key={chan.id} value={chan.id}>
                                            {chan.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsFinalizeDialogOpen(false)}>İptal</Button>
                        <Button onClick={handleFinalizeOrder} disabled={isProcessing} className="bg-emerald-600 hover:bg-emerald-700">
                            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Satışı Onayla
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Layout>
    );
}
