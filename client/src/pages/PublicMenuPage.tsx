
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Trash2, Loader2, Store, CheckCircle2, Receipt, Utensils, ShoppingBag } from 'lucide-react';
import { CITIES } from '@/data/tr_cities';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    discountPercent?: number;
    originalPrice?: number; // For campaigns or special items where 'price' is the final/discounted price
}

export default function PublicMenuPage() {
    const { userId } = useParams();
    const [searchParams] = useSearchParams();
    const tableId = searchParams.get('tableId');
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [cart, setCart] = useState<OrderItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
    const [existingOrder, setExistingOrder] = useState<any>(null);
    const [requestingBill, setRequestingBill] = useState(false);
    const [hasRequestedBill, setHasRequestedBill] = useState(false);


    // Order Form State
    const [tableNumber, setTableNumber] = useState('');
    const [orderNote, setOrderNote] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [customerCity, setCustomerCity] = useState('');
    const [customerDistrict, setCustomerDistrict] = useState('');
    const [customerNeighborhood, setCustomerNeighborhood] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/public/menu/${userId}`);
                setData(res.data.data);
                if (res.data.data.categories.length > 0) {
                    setSelectedCategory(res.data.data.categories[0].id);
                }
            } catch (err) {
                console.error("Failed to load menu", err);
                setError('Menü yüklenirken bir hata oluştu veya işletme bulunamadı.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        let pollInterval: any;

        if (tableId) {
            setOrderType('dine-in');

            // Check local storage for bill request state (valid for 30 minutes)
            const billReqTime = localStorage.getItem(`bill_req_${tableId}`);
            if (billReqTime && Date.now() - parseInt(billReqTime) < 30 * 60 * 1000) {
                setHasRequestedBill(true);
            } else if (billReqTime) {
                localStorage.removeItem(`bill_req_${tableId}`);
            }

            // Fetch existing order for table initial & polling
            const fetchTableOrder = async () => {
                try {
                    const res = await axios.get(`/api/orders/public/table/${tableId}`);
                    // Always set existing order, even if null (to clear if closed)
                    if (!res.data.data) {
                        setHasRequestedBill(false);
                        localStorage.removeItem(`bill_req_${tableId}`);
                    }
                    setExistingOrder(res.data.data);
                } catch (err) {
                    console.error("Failed to fetch table order", err);
                }
            };

            fetchTableOrder();
            // Poll every 5 seconds
            pollInterval = setInterval(fetchTableOrder, 5000);
        }

        return () => {
            if (pollInterval) clearInterval(pollInterval);
        };
    }, [userId, tableId]);

    const addToCart = (product: any) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            if (product.products) {
                // It's a campaign
                const originalPrice = product.products.reduce((acc: number, p: any) => acc + (p.price * p.quantity), 0);
                const discountedPrice = product.discount_type === 'amount'
                    ? Math.max(0, originalPrice - product.discount_amount)
                    : originalPrice * (1 - product.discount_amount / 100);

                return [...prev, {
                    id: product.id,
                    name: product.name,
                    price: Number(discountedPrice),
                    originalPrice: Number(originalPrice),
                    quantity: 1,
                    discountPercent: 0 // Campaign price is already discounted
                }];
            }

            return [...prev, {
                id: product.id,
                name: product.name,
                price: Number(product.price),
                quantity: 1,
                discountPercent: product.takeaway_discount_percent || 0
            }];
        });
    };

    const updateQuantity = (id: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, quantity: Math.max(0, item.quantity + delta) };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const getItemPrice = (item: OrderItem) => {
        const hasDiscount = item.discountPercent && item.discountPercent > 0;
        // Apply discount if it's takeaway OR we are ordering for a table (QR Menu)
        if (hasDiscount && (orderType === 'takeaway' || tableId)) {
            return item.price * (1 - item.discountPercent! / 100);
        }
        return item.price;
    };

    const cartTotal = cart.reduce((acc, item) => acc + (getItemPrice(item) * item.quantity), 0);
    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const handleSubmitOrder = async () => {
        if (cart.length === 0) return;
        setIsSubmitting(true);
        try {
            await axios.post(`/api/orders/public/${userId}`, {
                items: cart,
                table_number: tableNumber,
                note: orderNote,
                customer_name: customerName,
                customer_phone: customerPhone,
                customer_address: customerAddress,
                customer_city: customerCity,
                customer_district: customerDistrict,
                customer_neighborhood: customerNeighborhood,
                order_type: orderType,
                table_id: tableId,
                table_code: tableNumber // If manual entry, this is used. If tableId exists, backend uses tableId.
            });
            setCart([]);
            setOrderComplete(true);
            setIsCartOpen(false);
        } catch (err) {
            console.error("Order failed", err);
            alert("Sipariş verilemedi. Lütfen tekrar deneyin.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRequestBill = async () => {
        if (!tableId) return;
        setRequestingBill(true);
        try {
            await axios.post(`/api/public/menu/table/${tableId}/service-request`, { type: 'bill' });
            setHasRequestedBill(true);
            localStorage.setItem(`bill_req_${tableId}`, Date.now().toString());
            setIsCartOpen(false); // Close cart sheet if open
        } catch (err) {
            console.error(err);
            alert('İstek iletilemedi.');
        } finally {
            setRequestingBill(false);
        }
    };


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
                <Loader2 className="h-10 w-10 animate-spin text-emerald-600 mb-4" />
                <p className="text-slate-500 font-medium animate-pulse">Menü yükleniyor...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 text-center">
                <Store className="h-16 w-16 text-slate-300 mb-4" />
                <h1 className="text-xl font-bold text-slate-800 mb-2">Ops!</h1>
                <p className="text-slate-600">{error || "Menüye şu an ulaşılamıyor."}</p>
            </div>
        );
    }

    if (hasRequestedBill) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-50 p-6 text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <Receipt className="h-10 w-10 text-emerald-600 animate-pulse" />
                </div>
                <h1 className="text-2xl font-bold text-emerald-900 mb-2">Hesabınız Hazırlanıyor</h1>
                <p className="text-emerald-700 mb-8">Hesap isteğiniz işletmeye iletildi. Lütfen bekleyiniz, kısa süre içinde ilgilenilecektir.</p>
            </div>
        );
    }

    if (orderComplete) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-50 p-6 text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                </div>
                <h1 className="text-2xl font-bold text-emerald-900 mb-2">Siparişiniz Alındı!</h1>
                <p className="text-emerald-700 mb-8">Siparişiniz işletmeye iletildi. Teşekkür ederiz.</p>
                <Button
                    onClick={() => {
                        setOrderComplete(false);
                        // Refresh existing order data
                        if (tableId) {
                            axios.get(`/api/orders/public/table/${tableId}`)
                                .then(res => {
                                    if (res.data.data) setExistingOrder(res.data.data);
                                });
                        }
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                    Menüye Dön
                </Button>
            </div>
        );
    }

    const currentCategory = selectedCategory === 'campaigns'
        ? { name: 'Kampanyalar', products: data.campaigns || [] }
        : data.categories.find((c: any) => c.id === selectedCategory);

    return (
        <div className="min-h-screen bg-white md:bg-slate-50 pb-24">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-white shadow-sm border-b border-slate-100">
                <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between relative">
                    <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                        {data.business_name}
                    </h1>
                    {tableId && (
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm" className={cn(
                                    "gap-2 border-slate-200 transition-colors",
                                    existingOrder ? "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100" : "text-slate-400"
                                )}>
                                    <Receipt className="h-4 w-4" />
                                    Hesabı Gör
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl p-0 flex flex-col">
                                <SheetHeader className="p-6 border-b bg-slate-50">
                                    <SheetTitle className="text-left flex items-center gap-2">
                                        <Receipt className="h-5 w-5 text-emerald-600" />
                                        Masa Hesabı
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex-1 overflow-y-auto p-6">
                                    {existingOrder && existingOrder.items && existingOrder.items.length > 0 ? (
                                        <div className="space-y-4">
                                            {existingOrder.items.map((item: any, idx: number) => {
                                                const itemTotal = item.price * item.quantity;
                                                const hasDiscount = item.discount_percent > 0 || item.campaign_price;
                                                // Calculate approximate discounted value if needed, or rely on stored totals.
                                                // Ideally we calculate per item for display.
                                                let discountedTotal = itemTotal;
                                                if (item.discount_percent) {
                                                    discountedTotal = itemTotal * (1 - item.discount_percent / 100);
                                                } else if (item.campaign_price) {
                                                    discountedTotal = item.campaign_price * item.quantity;
                                                }

                                                return (
                                                    <div key={`hist-${idx}`} className="flex justify-between items-start py-2 border-b border-slate-100 last:border-0">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-slate-900 text-sm bg-slate-100 px-2 py-0.5 rounded-md">{item.quantity}x</span>
                                                                <div className="flex flex-col">
                                                                    <span className="text-slate-700 font-medium">{item.name}</span>
                                                                    {hasDiscount && (
                                                                        <span className="text-[10px] text-emerald-600 font-bold">
                                                                            %{item.discount_percent} İndirimli
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            {hasDiscount ? (
                                                                <div className="flex flex-col items-end">
                                                                    <span className="font-bold text-emerald-600">
                                                                        {discountedTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                                                                    </span>
                                                                    <span className="text-xs text-slate-400 line-through">
                                                                        {itemTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <span className="font-bold text-slate-900">
                                                                    {itemTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                                            <Receipt className="h-16 w-16 opacity-20" />
                                            <p>Henüz verilmiş siparişiniz bulunmuyor.</p>
                                        </div>
                                    )}
                                </div>
                                {existingOrder && (
                                    <div className="p-6 bg-slate-900 text-white mt-auto">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-slate-400">Ara Toplam</span>
                                            <span className="font-medium">{existingOrder.base_amount?.toLocaleString('tr-TR')} ₺</span>
                                        </div>
                                        {existingOrder.discount_amount > 0 && (
                                            <div className="flex justify-between items-center mb-4 text-emerald-400">
                                                <span>İndirim</span>
                                                <span>-{existingOrder.discount_amount?.toLocaleString('tr-TR')} ₺</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                                            <span className="text-lg font-bold">Genel Toplam</span>
                                            <span className="text-2xl font-bold text-emerald-400">{existingOrder.total_amount?.toLocaleString('tr-TR')} ₺</span>
                                        </div>
                                        <div className="mt-6">
                                            <Button
                                                onClick={handleRequestBill}
                                                disabled={requestingBill}
                                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-12 text-lg shadow-lg shadow-emerald-900/20"
                                            >
                                                {requestingBill ? <Loader2 className="animate-spin mr-2" /> : <Receipt className="mr-2 h-5 w-5" />}
                                                Hesabı Öde
                                            </Button>
                                            <p className="text-xs text-slate-500 text-center mt-2">
                                                Garsona hesap isteği gönderilir.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </SheetContent>
                        </Sheet>
                    )}
                </div>

                {/* Categories - Scrollable */}
                <div className="max-w-md mx-auto overflow-x-auto pb-1 no-scrollbar">
                    <div className="flex px-4 gap-2 pb-3">
                        {data.campaigns && data.campaigns.length > 0 && (
                            <button
                                onClick={() => setSelectedCategory('campaigns')}
                                className={cn(
                                    "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all",
                                    selectedCategory === 'campaigns'
                                        ? "bg-orange-600 text-white shadow-md transform scale-105"
                                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                                )}
                            >
                                <span className="flex items-center gap-1">
                                    <ShoppingCart className="h-3 w-3" />
                                    Kampanyalar
                                </span>
                            </button>
                        )}
                        {data.categories.map((cat: any) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={cn(
                                    "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all",
                                    selectedCategory === cat.id
                                        ? "bg-slate-900 text-white shadow-md transform scale-105"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                )}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-md mx-auto pt-4 px-4">
                {currentCategory ? (
                    <div className="space-y-8">
                        {/* Recursive Category Renderer */}
                        {(() => {
                            const renderCategory = (category: any, level = 0) => {
                                const hasProducts = category.products && category.products.length > 0;
                                const hasChildren = category.children && category.children.length > 0;

                                if (!hasProducts && !hasChildren) return null;

                                return (
                                    <div key={category.id} className={cn(level > 0 && "mt-6")}>
                                        {/* Subcategory Header */}
                                        {level > 0 && (
                                            <h3 className={cn(
                                                "font-bold text-slate-800 mb-3",
                                                level === 1 ? "text-lg border-b pb-2 border-slate-100" : "text-base pl-2 border-l-4 border-emerald-500"
                                            )}>
                                                {category.name}
                                            </h3>
                                        )}

                                        {level === 0 && <h2 className="text-xl font-bold text-slate-800 px-1 mb-4">{category.name}</h2>}

                                        {/* Products Grid */}
                                        {hasProducts && (
                                            <div className="grid gap-4">
                                                {category.products.map((product: any) => {
                                                    const cartItem = cart.find(c => c.id === product.id);
                                                    const quantity = cartItem?.quantity || 0;

                                                    const isCampaign = selectedCategory === 'campaigns';
                                                    const hasDiscount = !isCampaign && (product.takeaway_discount_percent || 0) > 0;

                                                    const originalPrice = isCampaign
                                                        ? product.products.reduce((acc: number, p: any) => acc + (p.price * p.quantity), 0)
                                                        : Number(product.price);

                                                    const discountedPrice = isCampaign
                                                        ? (product.discount_type === 'amount'
                                                            ? Math.max(0, originalPrice - product.discount_amount)
                                                            : originalPrice * (1 - product.discount_amount / 100))
                                                        : (hasDiscount
                                                            ? originalPrice * (1 - product.takeaway_discount_percent / 100)
                                                            : originalPrice);

                                                    return (
                                                        <div
                                                            key={product.id}
                                                            className={cn(
                                                                "flex bg-white rounded-2xl p-3 shadow-sm border border-slate-100 overflow-hidden relative",
                                                                isCampaign && "border-orange-100 bg-orange-50/20"
                                                            )}
                                                        >
                                                            {/* Discount Badge */}
                                                            {hasDiscount && (
                                                                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-10">
                                                                    %{product.takeaway_discount_percent} İNDİRİM
                                                                </div>
                                                            )}
                                                            {isCampaign && (
                                                                <div className="absolute top-2 right-2 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10 uppercase">
                                                                    KAMPANYA
                                                                </div>
                                                            )}

                                                            {/* Image */}
                                                            {product.image_url ? (
                                                                <div className="h-24 w-24 flex-shrink-0 rounded-xl bg-slate-100 overflow-hidden mr-4">
                                                                    <img
                                                                        src={product.image_url}
                                                                        alt={product.name}
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className={cn("h-24 w-24 flex-shrink-0 rounded-xl mr-4 bg-slate-100 flex items-center justify-center")}
                                                                    style={{ backgroundColor: (product.color && product.color !== 'bg-white') ? undefined : '#f1f5f9' }}
                                                                >
                                                                    {isCampaign ? (
                                                                        <ShoppingCart className="h-8 w-8 text-orange-200" />
                                                                    ) : (
                                                                        product.color ? <div className={cn("w-full h-full opacity-50 rounded-xl", product.color)}></div> : null
                                                                    )}
                                                                </div>
                                                            )}

                                                            <div className="flex flex-col flex-1 min-w-0 justify-between py-1">
                                                                <div>
                                                                    <h3 className="font-bold text-slate-900 line-clamp-2">{product.name}</h3>
                                                                    {isCampaign ? (
                                                                        <p className="text-[10px] text-orange-600 font-bold uppercase mt-1">
                                                                            Set İçeriği: {product.products.map((p: any) => `${p.name} x${p.quantity}`).join(', ')}
                                                                        </p>
                                                                    ) : product.description && (
                                                                        <p className="text-sm text-slate-600 mt-1 line-clamp-3 leading-snug">{product.description}</p>
                                                                    )}
                                                                </div>
                                                                <div className="flex items-center justify-between mt-2">
                                                                    {/* Price Display */}
                                                                    <div className="flex flex-col">
                                                                        {(hasDiscount || isCampaign) ? (
                                                                            <>
                                                                                <span className={cn("font-bold text-emerald-600", isCampaign && "text-orange-600")}>
                                                                                    {discountedPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                                                                                </span>
                                                                                <span className="text-xs text-slate-400 line-through">
                                                                                    {originalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                                                                                </span>
                                                                            </>
                                                                        ) : (
                                                                            <span className="font-bold text-emerald-600">
                                                                                {originalPrice.toLocaleString('tr-TR')} ₺
                                                                            </span>
                                                                        )}
                                                                    </div>

                                                                    {/* Add Button */}
                                                                    {isCampaign ? (
                                                                        quantity > 0 ? (
                                                                            <div className="flex items-center gap-3 bg-orange-100 rounded-lg px-2 py-1">
                                                                                <button
                                                                                    onClick={() => updateQuantity(product.id, -1)}
                                                                                    className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm text-orange-600 active:scale-95 transition-transform"
                                                                                >
                                                                                    <Minus size={14} />
                                                                                </button>
                                                                                <span className="font-bold text-orange-900 w-4 text-center">{quantity}</span>
                                                                                <button
                                                                                    onClick={() => updateQuantity(product.id, 1)}
                                                                                    className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm text-orange-600 active:scale-95 transition-transform"
                                                                                >
                                                                                    <Plus size={14} />
                                                                                </button>
                                                                            </div>
                                                                        ) : (
                                                                            <button
                                                                                onClick={() => addToCart(product)}
                                                                                className="w-8 h-8 flex items-center justify-center bg-orange-600 text-white rounded-lg shadow-md active:scale-95 transition-transform"
                                                                            >
                                                                                <Plus size={18} />
                                                                            </button>
                                                                        )
                                                                    ) : quantity > 0 ? (
                                                                        <div className="flex items-center gap-3 bg-slate-100 rounded-lg px-2 py-1">
                                                                            <button
                                                                                onClick={() => updateQuantity(product.id, -1)}
                                                                                className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 active:scale-95 transition-transform"
                                                                            >
                                                                                <Minus size={14} />
                                                                            </button>
                                                                            <span className="font-bold text-slate-900 w-4 text-center">{quantity}</span>
                                                                            <button
                                                                                onClick={() => updateQuantity(product.id, 1)}
                                                                                className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm text-emerald-600 active:scale-95 transition-transform"
                                                                            >
                                                                                <Plus size={14} />
                                                                            </button>
                                                                        </div>
                                                                    ) : (
                                                                        <button
                                                                            onClick={() => addToCart(product)}
                                                                            className="w-8 h-8 flex items-center justify-center bg-slate-900 text-white rounded-lg shadow-md active:scale-95 transition-transform"
                                                                        >
                                                                            <Plus size={18} />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* Children */}
                                        {hasChildren && (
                                            <div className={cn(level === 0 ? "mt-4" : "ml-2")}>
                                                {category.children.map((child: any) => renderCategory(child, level + 1))}
                                            </div>
                                        )}
                                    </div>
                                );
                            };

                            const content = renderCategory(currentCategory);
                            return content || (
                                <div className="text-center py-10 text-slate-400">
                                    <p>Bu kategoride ürün bulunmuyor.</p>
                                </div>
                            );
                        })()}
                    </div>
                ) : (
                    <div className="text-center py-10 text-slate-400">
                        <p>Kategori seçiniz.</p>
                    </div>
                )}
            </div>

            {/* Floating Cart Button */}
            {cart.length > 0 && (
                <div className="fixed bottom-6 left-4 right-4 z-50 max-w-md mx-auto">
                    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                        <SheetTrigger asChild>
                            <Button className="w-full h-14 shadow-xl bg-slate-900 hover:bg-slate-800 text-white flex justify-between px-6 items-center rounded-2xl transition-all active:scale-95">
                                <div className="flex gap-3 items-center">
                                    <div className="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold">
                                        {cartItemCount}
                                    </div>
                                    <span className="font-medium">Sepeti Görüntüle</span>
                                </div>
                                <span className="font-bold text-lg">
                                    {cartTotal.toLocaleString('tr-TR')} ₺
                                </span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0 flex flex-col">
                            <SheetHeader className="p-6 border-b">
                                <SheetTitle className="text-left flex items-center gap-2">
                                    <ShoppingCart className="h-5 w-5" />
                                    Sipariş Sepeti
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {existingOrder && existingOrder.items && existingOrder.items.length > 0 && (
                                    <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                        <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                            Mevcut Siparişiniz
                                        </h4>
                                        <div className="space-y-3">
                                            {existingOrder.items.map((item: any, idx: number) => {
                                                const originalTotal = item.price * item.quantity;
                                                let finalTotal = originalTotal;
                                                let hasDiscount = false;

                                                if (item.campaign_price) {
                                                    finalTotal = item.campaign_price * item.quantity;
                                                    hasDiscount = true;
                                                } else if (item.discount_percent > 0) {
                                                    finalTotal = originalTotal * (1 - item.discount_percent / 100);
                                                    hasDiscount = true;
                                                }

                                                return (
                                                    <div key={`existing-${idx}`} className="flex justify-between items-center text-sm">
                                                        <span className="text-slate-600">
                                                            <span className="font-bold text-slate-800">{item.quantity}x</span> {item.name}
                                                        </span>
                                                        <div className="flex flex-col items-end">
                                                            {hasDiscount ? (
                                                                <>
                                                                    <span className="font-medium text-emerald-600">
                                                                        {finalTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                                                                    </span>
                                                                    <span className="text-xs text-slate-400 line-through">
                                                                        {originalTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <span className="font-medium text-slate-500">
                                                                    {originalTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            <div className="pt-3 border-t border-slate-200 flex justify-between items-center font-bold text-slate-800">
                                                <span>Ara Toplam</span>
                                                <span>{existingOrder.total_amount?.toLocaleString('tr-TR')} ₺</span>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleRequestBill}
                                                disabled={requestingBill}
                                                className="w-full mt-3 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                                            >
                                                {requestingBill ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Receipt className="mr-2 h-4 w-4" />}
                                                Hesabı Öde
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Order Type Selector */}
                                <div className="mb-4">
                                    <Label className="mb-2 block">Sipariş Tipi</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => setOrderType('dine-in')}
                                            className={cn(
                                                "px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
                                                orderType === 'dine-in'
                                                    ? "bg-slate-900 text-white shadow-md"
                                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                            )}
                                        >
                                            <Utensils className="h-4 w-4" />
                                            Masada Ye
                                        </button>
                                        <button
                                            onClick={() => setOrderType('takeaway')}
                                            className={cn(
                                                "px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2",
                                                orderType === 'takeaway'
                                                    ? "bg-emerald-600 text-white shadow-md"
                                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                            )}
                                        >
                                            <ShoppingBag className="h-4 w-4" />
                                            Al/Götür
                                        </button>
                                    </div>
                                    {tableId && (
                                        <p className="text-xs text-blue-600 mt-2 font-medium">
                                            📋 Bu sipariş bulunduğunuz masaya servis edilecektir.
                                        </p>
                                    )}
                                    {orderType === 'takeaway' && cart.some(item => item.discountPercent && item.discountPercent > 0) && (
                                        <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center gap-1">
                                            <CheckCircle2 className="h-3 w-3" /> Al/Götür indirimi uygulandı!
                                        </p>
                                    )}
                                </div>

                                {cart.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-900">{item.name}</h4>
                                            <div className="flex items-center gap-2">
                                                {(() => {
                                                    const finalPrice = getItemPrice(item);
                                                    const basePrice = item.originalPrice || item.price;
                                                    const hasDiscount = basePrice > finalPrice;

                                                    return hasDiscount ? (
                                                        <>
                                                            <p className="text-emerald-600 font-medium">
                                                                {finalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                                                            </p>
                                                            <span className="text-xs text-slate-400 line-through">
                                                                {basePrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <p className="text-emerald-600 font-medium">
                                                            {finalPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                                                        </p>
                                                    );
                                                })()}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 active:scale-95"
                                            >
                                                {item.quantity === 1 ? <Trash2 size={16} className="text-red-500" /> : <Minus size={16} />}
                                            </button>
                                            <span className="font-bold text-slate-900 w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-emerald-600 active:scale-95"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-6 space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="table">Masa No</Label>
                                        {tableId ? (
                                            <div className="bg-slate-100 border border-slate-200 text-slate-500 px-3 py-2 rounded-md text-sm font-medium">
                                                Masa QR Kodu ile Tanımlandı
                                            </div>
                                        ) : (
                                            <Input
                                                id="table"
                                                placeholder="Örn: Masa 5"
                                                value={tableNumber}
                                                onChange={(e) => setTableNumber(e.target.value)}
                                            />
                                        )}
                                    </div>

                                    {/* Müşteri Bilgileri */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Ad Soyad (İsteğe Bağlı)</Label>
                                        <Input
                                            id="name"
                                            placeholder="Adınız Soyadınız"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Telefon Numarası (İsteğe Bağlı)</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="5301234567"
                                            value={customerPhone}
                                            onChange={(e) => {
                                                // Allow only digits, max 10 chars
                                                const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                                                setCustomerPhone(val);
                                            }}
                                        />
                                    </div>

                                    {/* Adres Alanları */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="city">İl</Label>
                                            <Select value={customerCity} onValueChange={(val) => {
                                                setCustomerCity(val);
                                                setCustomerDistrict(''); // Reset district when city changes
                                            }}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seçiniz" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {CITIES.map(city => (
                                                        <SelectItem key={city.name} value={city.name}>{city.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="district">İlçe</Label>
                                            <Select value={customerDistrict} onValueChange={setCustomerDistrict} disabled={!customerCity}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Seçiniz" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {customerCity && CITIES.find(c => c.name === customerCity)?.districts.map(dist => (
                                                        <SelectItem key={dist} value={dist}>{dist}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="neighborhood">Mahalle</Label>
                                        <Input
                                            id="neighborhood"
                                            placeholder="Mahalle adı..."
                                            value={customerNeighborhood}
                                            onChange={(e) => setCustomerNeighborhood(e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address">Adres Detayı (Sokak, No, Daire)</Label>
                                        <Textarea
                                            id="address"
                                            placeholder="Sokak, kapı no, daire no, tarif..."
                                            value={customerAddress}
                                            onChange={(e) => setCustomerAddress(e.target.value)}
                                            className="min-h-[60px]"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="note">Sipariş Notu</Label>
                                        <Textarea
                                            id="note"
                                            placeholder="Varsa özel istekleriniz..."
                                            value={orderNote}
                                            onChange={(e) => setOrderNote(e.target.value)}
                                            className="min-h-[60px]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t bg-slate-50">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-slate-500 font-medium">Toplam Tutar</span>
                                    <span className="text-2xl font-bold text-slate-900">{cartTotal.toLocaleString('tr-TR')} ₺</span>
                                </div>
                                <Button
                                    className="w-full h-12 text-lg font-bold bg-emerald-600 hover:bg-emerald-700"
                                    onClick={handleSubmitOrder}
                                    disabled={isSubmitting || cart.length === 0}
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : null}
                                    Sipariş'i Onayla
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            )}

            {/* Footer Brand */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 py-3 text-center z-10 hidden md:block">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Powered by GG Esnaf
                </p>
            </div>
        </div>
    );
}
