import { useState, useEffect, useRef } from 'react';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, XCircle, Clock, MapPin, ChevronDown, ChevronUp, Archive } from 'lucide-react';

export default function IncomingOrdersPage() {
    const [todayOrders, setTodayOrders] = useState<any[]>([]);
    const [archivedOrders, setArchivedOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);

    // Pagination for archive
    const [archivePage, setArchivePage] = useState(1);
    const [archiveLimit, setArchiveLimit] = useState(10);
    const [archivePagination, setArchivePagination] = useState<any>(null);

    // Finalize Dialog State
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [isFinalizeDialogOpen, setIsFinalizeDialogOpen] = useState(false);

    // Config State (Categories/Channels)
    const [incomeCategories, setIncomeCategories] = useState<any[]>([]);
    const [paymentChannels, setPaymentChannels] = useState<any[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
    const [selectedChannelId, setSelectedChannelId] = useState<string>('');

    const prevOrderIdsRef = useRef<Set<string>>(new Set());

    // Poll for new orders every 10 seconds
    useEffect(() => {
        fetchTodayOrders();
        fetchConfig();
        const interval = setInterval(fetchTodayOrders, 10000);
        return () => clearInterval(interval);
    }, []);

    // Fetch archived orders when archive section is opened
    useEffect(() => {
        if (isArchiveOpen) {
            fetchArchivedOrders();
        }
    }, [isArchiveOpen, archivePage, archiveLimit]);

    // Audio logic is handled by GlobalOrderMonitor


    const fetchTodayOrders = async () => {
        try {
            const res = await axios.get('/api/orders?archived=false&limit=100');
            const newOrders = res.data.data;
            console.log("Incoming Orders Debug:", newOrders.map((o: any) => ({ id: o.id, type: o.order_type, status: o.status })));
            setTodayOrders(newOrders);
            setLoading(false);

            // Check for new pending orders
            const currentPendingIds = new Set<string>(
                newOrders
                    .filter((o: any) => o.status === 'pending' && o.order_type !== 'dine-in')
                    .map((o: any) => String(o.id))
            );

            // Compare with previous ref
            const prevIds = prevOrderIdsRef.current;
            let hasNewOrder = false;

            // If it's the very first load, we might not want to beep for everything existing,
            // but usually for "Incoming Orders" page, initial load might be relevant too?
            // Let's only beep if we have a previous state (to avoid noise on refresh), 
            // OR if the user expects to be alerted immediately.
            // Safer: Only beep if previous state was populated (i.e. strictly new arrivals).
            if (prevIds.size > 0) {
                for (const id of currentPendingIds) {
                    if (!prevIds.has(id)) {
                        hasNewOrder = true;
                        break;
                    }
                }
            } else if (currentPendingIds.size > 0 && !loading) {
                // Initial load: don't beep, just populate ref
                // actually, if we refresh, we don't want to beep for old pending orders.
            }

            if (hasNewOrder) {
                // GlobalOrderMonitor will handle the sound based on pending count
            }

            // Update ref
            prevOrderIdsRef.current = currentPendingIds;

        } catch (error) {
            console.error("Failed to fetch today's orders", error);
            setLoading(false);
        }
    };

    const fetchArchivedOrders = async () => {
        try {
            const res = await axios.get(`/api/orders?archived=true&limit=${archiveLimit}&page=${archivePage}`);
            setArchivedOrders(res.data.data);
            setArchivePagination(res.data.pagination);
        } catch (error) {
            console.error("Failed to fetch archived orders", error);
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
            fetchTodayOrders(); // Refresh
        } catch (error) {
            console.error("Failed to reject order", error);
            alert("İşlem başarısız.");
        }
    };

    const handleOpenFinalize = (order: any) => {
        setSelectedOrder(order);
        setIsFinalizeDialogOpen(true);
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
            fetchTodayOrders(); // Refresh list
        } catch (error: any) {
            console.error("Failed to finalize order", error);
            alert(error.response?.data?.error || "Satış işlemi başarısız.");
        } finally {
            setIsProcessing(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
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
            {/* Active Orders Section */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Aktif Siparişler
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {(() => {
                        const activeOrders = todayOrders.filter(order =>
                            !['completed', 'rejected', 'cancelled'].includes(order.status) &&
                            order.order_type !== 'dine-in'
                        );

                        if (activeOrders.length === 0) {
                            return (
                                <div className="col-span-full text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-500">
                                    Henüz aktif sipariş yok.
                                </div>
                            );
                        }

                        return activeOrders.map((order) => (
                            <Card key={order.id} className={order.status === 'pending' ? 'border-l-4 border-l-yellow-400' : ''}>
                                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                                    <div className="flex items-center gap-2">
                                        <CardTitle className="text-sm font-medium text-slate-500">
                                            {order.order_number}
                                        </CardTitle>
                                        {order.order_type === 'takeaway' && (
                                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[10px] py-0 h-5 font-bold">Gel-Al</Badge>
                                        )}
                                    </div>
                                    <div className="flex gap-1">
                                        {order.status === 'pending' && <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Bekliyor</Badge>}
                                        {order.status === 'completed' && <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Tamamlandı</Badge>}
                                        {order.status === 'rejected' && <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Reddedildi</Badge>}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col mb-2">
                                        <div className="text-2xl font-bold">{Number(order.total_amount).toLocaleString('tr-TR')} ₺</div>
                                        {(order.order_type === 'takeaway' || Number(order.discount_amount) > 0) && Number(order.discount_amount) > 0 && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-slate-400 line-through">
                                                    {Number(order.base_amount).toLocaleString('tr-TR')} ₺
                                                </span>
                                                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                                                    %{(((Number(order.discount_amount) / Number(order.base_amount)) * 100)).toFixed(0)} indirim
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">
                                        <Clock size={12} />
                                        {formatTime(order.created_at)}
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

                                    <div className="space-y-2 mb-4 bg-slate-50 p-2.5 rounded-lg text-sm">
                                        {order.items.map((item: any, idx: number) => {
                                            const hasItemDiscount = order.order_type === 'takeaway' && item.discountPercent > 0;
                                            const discountedPrice = hasItemDiscount ? item.price * (1 - item.discountPercent / 100) : item.price;
                                            return (
                                                <div key={idx} className="flex justify-between items-start">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-slate-800">{item.quantity}x {item.name}</span>
                                                        {hasItemDiscount && (
                                                            <span className="text-[10px] text-emerald-600 font-bold uppercase">%{item.discountPercent} Gel-Al İndirimi</span>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className="font-bold text-slate-900">{Number(discountedPrice * item.quantity).toLocaleString('tr-TR')} ₺</span>
                                                        {hasItemDiscount && (
                                                            <span className="text-[11px] text-slate-400 line-through">{Number(item.price * item.quantity).toLocaleString('tr-TR')} ₺</span>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
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
                        ));
                    })()}
                </div>
            </div>

            {/* Archive Section */}
            <Collapsible open={isArchiveOpen} onOpenChange={setIsArchiveOpen}>
                <Card>
                    <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-slate-50 transition-colors">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Archive className="w-5 h-5 text-slate-600" />
                                    <CardTitle>Arşiv</CardTitle>
                                </div>
                                {isArchiveOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </div>
                        </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <CardContent>
                            {/* Pagination Controls */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-slate-600">Sayfa başına:</span>
                                    <Select value={archiveLimit.toString()} onValueChange={(val) => {
                                        setArchiveLimit(parseInt(val));
                                        setArchivePage(1);
                                    }}>
                                        <SelectTrigger className="w-20">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="50">50</SelectItem>
                                            <SelectItem value="100">100</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {archivePagination && (
                                    <div className="text-sm text-slate-600">
                                        Toplam {archivePagination.total} sipariş
                                    </div>
                                )}
                            </div>

                            {/* Archive Table */}
                            <div className="border rounded-lg overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Tarih</TableHead>
                                            <TableHead>Sipariş No</TableHead>
                                            <TableHead>Müşteri</TableHead>
                                            <TableHead>Tutar</TableHead>
                                            <TableHead>Durum</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {archivedOrders.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                                                    Arşivlenmiş sipariş yok.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            archivedOrders.map((order) => (
                                                <TableRow key={order.id}>
                                                    <TableCell className="font-medium">
                                                        {formatDate(order.created_at)}
                                                        <div className="text-xs text-slate-500">{formatTime(order.created_at)}</div>
                                                    </TableCell>
                                                    <TableCell>{order.order_number}
                                                        {order.order_type === 'takeaway' && (
                                                            <div className="text-[10px] text-emerald-600 font-bold uppercase">Gel-Al</div>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {order.customer_name || '-'}
                                                        {order.customer_phone && (
                                                            <div className="text-xs text-slate-500">{order.customer_phone}</div>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="font-semibold">
                                                        <div className="flex flex-col">
                                                            <span>{Number(order.total_amount).toLocaleString('tr-TR')} ₺</span>
                                                            {Number(order.discount_amount) > 0 && (
                                                                <span className="text-[10px] text-slate-400 line-through font-normal">
                                                                    {Number(order.base_amount).toLocaleString('tr-TR')} ₺
                                                                </span>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {order.status === 'completed' && <Badge className="bg-emerald-100 text-emerald-800">Tamamlandı</Badge>}
                                                        {order.status === 'rejected' && <Badge className="bg-red-100 text-red-800">Reddedildi</Badge>}
                                                        {order.status === 'cancelled' && <Badge className="bg-slate-100 text-slate-800">İptal</Badge>}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Pagination */}
                            {archivePagination && archivePagination.totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setArchivePage(p => Math.max(1, p - 1))}
                                        disabled={archivePage === 1}
                                    >
                                        Önceki
                                    </Button>
                                    <span className="text-sm text-slate-600">
                                        Sayfa {archivePage} / {archivePagination.totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setArchivePage(p => Math.min(archivePagination.totalPages, p + 1))}
                                        disabled={archivePage === archivePagination.totalPages}
                                    >
                                        Sonraki
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </CollapsibleContent>
                </Card>
            </Collapsible>

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
