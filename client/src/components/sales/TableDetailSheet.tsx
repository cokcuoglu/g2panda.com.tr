
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ProductCard } from '@/components/sales/ProductCard';
import { OrderSummary } from '@/components/sales/OrderSummary';
import { Loader2, Search, Tag, QrCode, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import QRCode from "react-qr-code";
import { useAuth } from '@/context/AuthContext';
import { useBusiness } from '@/context/BusinessContext';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Product {
    id: string;
    name: string;
    price: number;
    color: string;
    image_url?: string;
    is_active: boolean;
    menu_category_id: string;
    takeaway_discount_percent?: number;
}

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    discount_percent?: number;
}

interface TableDetailSheetProps {
    table: { id: string, name: string, service_request?: string | null } | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onOrderUpdated?: () => void;
}

export function TableDetailSheet({ table, open, onOpenChange, onOrderUpdated }: TableDetailSheetProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState<OrderItem[]>([]);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [orderStatus, setOrderStatus] = useState<'pending' | 'confirmed' | 'completed' | 'rejected' | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { user } = useAuth();

    // QR Code Dialog State
    const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);

    // Payment Dialog State
    const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
    const [paymentCategoryId, setPaymentCategoryId] = useState<string>('');
    const [paymentChannelId, setPaymentChannelId] = useState<string>('');
    const [paymentChannels, setPaymentChannels] = useState<any[]>([]);
    const [finalAmount, setFinalAmount] = useState<string>('');

    useEffect(() => {
        if (open && table) {
            fetchData();
        } else {
            setCart([]);
            setOrderId(null);
            setOrderStatus(null);
        }
    }, [open, table]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [prodRes, catRes, orderRes, incCatRes, chanRes] = await Promise.all([
                axios.get('/api/products'),
                axios.get('/api/menu-categories'),
                axios.get(`/api/table-orders/${table?.id}`),
                axios.get('/api/categories?type=income'),
                axios.get('/api/channels')
            ]);

            setProducts(prodRes.data.data || []);
            setCategories(catRes.data.data || []);
            setPaymentChannels(chanRes.data.data || []);

            const incomeCats = incCatRes.data.data || [];
            // Find "Dükkan" or default
            const defaultCat = incomeCats.find((c: any) => c.name === 'Dükkan') || incomeCats[0];
            if (defaultCat) {
                setPaymentCategoryId(defaultCat.id);
                if (defaultCat.default_channel_id) {
                    setPaymentChannelId(defaultCat.default_channel_id);
                }
            }

            if (orderRes.data.data) {
                const order = orderRes.data.data;
                setOrderId(order.id);
                setOrderStatus(order.status);
                setCart(Array.isArray(order.items) ? order.items : []);
            } else {
                setOrderId(null);
                setOrderStatus(null);
                setCart([]);
            }
        } catch (err) {
            console.error('Failed to fetch table data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleProductClick = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, {
                id: product.id,
                name: product.name,
                price: Number(product.price),
                quantity: 1,
                discount_percent: product.takeaway_discount_percent || 0
            }];
        });
    };

    const handleUpdateQuantity = (id: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const handleRemoveItem = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const handleSaveAdisyon = async () => {
        if (!table) return;
        setIsSaving(true);
        try {
            let currentOrderId = orderId;

            if (!currentOrderId) {
                const res = await axios.post('/api/table-orders', { tableId: table.id });
                currentOrderId = res.data.data.id;
                setOrderId(currentOrderId);
            }

            const total = cart.reduce((sum, item) => {
                const price = item.price;
                const discount = item.discount_percent ? (price * item.discount_percent / 100) : 0;
                return sum + ((price - discount) * item.quantity);
            }, 0);

            await axios.put(`/api/table-orders/${currentOrderId}`, {
                items: cart,
                total_amount: total
            });

            onOrderUpdated?.();
        } catch (err) {
            console.error('Failed to save adisyon:', err);
            alert('Adisyon kaydedilemedi.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleFinalize = async () => {
        if (!table || !orderId) return;
        const total = cart.reduce((sum, item) => {
            const price = item.price;
            const discount = item.discount_percent ? (price * item.discount_percent / 100) : 0;
            return sum + ((price - discount) * item.quantity);
        }, 0);
        setFinalAmount(total.toString());
        setIsPaymentDialogOpen(true);
    };

    const { refreshOrderState } = useBusiness();

    const handleDismissServiceRequest = async () => {
        if (!table) return;
        try {
            await axios.patch(`/api/tables/${table.id}/service-request`, { type: 'none' });
            refreshOrderState();
            onOrderUpdated?.();
        } catch (err) {
            console.error('Failed to dismiss service request:', err);
        }
    };

    const handleConfirmPayment = async () => {
        if (!orderId || !paymentCategoryId || !paymentChannelId) return;
        setIsSaving(true);
        try {
            // Clear any service request before finalizing
            if (table) {
                await axios.patch(`/api/tables/${table.id}/service-request`, { type: 'none' }).catch(() => { });
            }

            await axios.post(`/api/orders/${orderId}/finalize`, {
                category_id: paymentCategoryId,
                channel_id: paymentChannelId,
                final_amount: parseFloat(finalAmount)
            });
            setIsPaymentDialogOpen(false);
            refreshOrderState();
            onOrderUpdated?.();
            onOpenChange(false); // Close sheet
        } catch (err: any) {
            console.error('Payment failed:', err);
            alert(err.response?.data?.error || 'Ödeme alınamadı.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleConfirmOrder = async () => {
        if (!orderId) return;
        setIsSaving(true);
        try {
            await axios.put(`/api/orders/${orderId}/status`, { status: "confirmed" });
            setOrderStatus('confirmed');
            onOrderUpdated?.(); // Notify parent to update list
        } catch (err: any) {
            console.error('Confirm failed:', err);
            alert(err.response?.data?.error || 'Sipariş onaylanamadı.');
        } finally {
            setIsSaving(false);
        }
    };

    const filteredProducts = products.filter(p => {
        const matchesCategory = selectedCategoryId === 'all' || p.menu_category_id === selectedCategoryId;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch && p.is_active;
    });

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:max-w-[1000px] p-0 flex flex-col">
                <SheetHeader className="p-6 border-b bg-slate-50">
                    {table?.service_request && (
                        <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-2">
                            <span className="text-sm font-bold text-red-700 animate-pulse">🔔 {table.service_request}</span>
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs border-red-300 text-red-600 hover:bg-red-100"
                                onClick={handleDismissServiceRequest}
                            >
                                Kapat
                            </Button>
                        </div>
                    )}
                    <SheetTitle className="flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold text-slate-900">{table?.name}</span>
                            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Adisyon Yönetimi</span>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsQRDialogOpen(true)}>
                            <QrCode className="h-4 w-4" />
                            QR Menü
                        </Button>
                        {orderStatus === 'pending' && (
                            <Button size="sm" className="gap-2 bg-orange-500 hover:bg-orange-600 text-white animate-pulse" onClick={handleConfirmOrder} disabled={isSaving}>
                                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                                Siparişi Onayla
                            </Button>
                        )}
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 flex overflow-hidden">
                    <div className="flex-1 flex flex-col border-r bg-slate-50/30 overflow-hidden">
                        <div className="p-4 space-y-4 border-b bg-white">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Ürün ara..."
                                    className="pl-9 bg-slate-50 border-slate-200"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                <Button
                                    variant={selectedCategoryId === 'all' ? 'default' : 'ghost'}
                                    size="sm"
                                    className="h-8 text-xs whitespace-nowrap"
                                    onClick={() => setSelectedCategoryId('all')}
                                >
                                    Tümü
                                </Button>
                                {categories.map(cat => (
                                    <Button
                                        key={cat.id}
                                        variant={selectedCategoryId === cat.id ? 'default' : 'ghost'}
                                        size="sm"
                                        className="h-8 text-xs whitespace-nowrap"
                                        onClick={() => setSelectedCategoryId(cat.id)}
                                    >
                                        {cat.name}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            {isLoading ? (
                                <div className="h-full flex items-center justify-center">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
                                </div>
                            ) : filteredProducts.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                                    <Tag className="h-12 w-12 mb-2 opacity-20" />
                                    <p>Ürün bulunamadı.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {filteredProducts.map(product => {
                                        const discount = product.takeaway_discount_percent || 0;
                                        const hasDiscount = discount > 0;
                                        const finalPrice = hasDiscount ? product.price * (1 - discount / 100) : product.price;

                                        return (
                                            <ProductCard
                                                key={product.id}
                                                name={product.name}
                                                price={finalPrice}
                                                originalPrice={hasDiscount ? product.price : undefined}
                                                color={product.color}
                                                image_url={product.image_url}
                                                onClick={() => handleProductClick(product)}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-[380px] flex flex-col bg-white">
                        <OrderSummary
                            items={cart}
                            onUpdateQuantity={handleUpdateQuantity}
                            onRemove={handleRemoveItem}
                            onConfirm={handleFinalize}
                            onSave={handleSaveAdisyon}
                            isProcessing={isSaving}
                        />
                    </div>
                </div>
            </SheetContent>

            <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Masayı Kapat / Ödeme Al</DialogTitle>
                        <DialogDescription>
                            Ödeme yöntemini seçerek masayı kapatın.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="flex items-center justify-between bg-slate-100 p-3 rounded-lg">
                            <span className="font-semibold text-slate-700">Toplam Tutar</span>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="number"
                                    value={finalAmount}
                                    onChange={(e) => setFinalAmount(e.target.value)}
                                    className="w-32 text-right font-bold text-emerald-600 border-none bg-transparent shadow-none focus-visible:ring-0 text-xl p-0 h-auto"
                                />
                                <span className="text-xl font-bold text-emerald-600">TL</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Ödeme Yöntemi</Label>
                            <Select value={paymentChannelId} onValueChange={setPaymentChannelId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Ödeme yöntemi seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                    {paymentChannels.map(chan => (
                                        <SelectItem key={chan.id} value={chan.id}>{chan.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>İptal</Button>
                        <Button onClick={handleConfirmPayment} disabled={isSaving || !paymentChannelId} className="bg-emerald-600 hover:bg-emerald-700">
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Ödemeyi Onayla
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isQRDialogOpen} onOpenChange={setIsQRDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Masa QR Kodu</DialogTitle>
                        <DialogDescription>
                            Bu QR kodu tarayan müşteriler, doğrudan <strong>{table?.name}</strong> için sipariş verebilir.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center p-6 space-y-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            {table && user && (
                                <QRCode
                                    value={`https://g2panda.com.tr/menu/${user.id}?tableId=${table.id}`}
                                    size={200}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    viewBox={`0 0 256 256`}
                                />
                            )}
                        </div>
                        <p className="text-xs text-slate-500 text-center">
                            Müşterileriniz bu kodu telefonlarının kamerası ile okutarak menüye ulaşabilir.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="secondary" onClick={() => setIsQRDialogOpen(false)}>
                            Kapat
                        </Button>
                        <Button onClick={() => {
                            const url = `https://g2panda.com.tr/menu/${user?.id}?tableId=${table?.id}`;
                            window.open(url, '_blank');
                        }}>
                            Sayfaya Git
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Sheet>
    );
}
