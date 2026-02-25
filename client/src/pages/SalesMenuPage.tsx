import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { cn } from '@/lib/utils';
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/sales/ProductCard';
import { OrderSummary } from '@/components/sales/OrderSummary';
import { useAuth } from '@/context/AuthContext';
import { useBusiness } from '@/context/BusinessContext';
import { AlertCircle, Loader2, Tag } from 'lucide-react';

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
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

interface Product {
    id: string;
    name: string;
    price: number;
    color: string;
    category?: string;
    image_url?: string;
    is_active: boolean;
    sort_order?: number;
    menu_category_id: string;
}

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export default function SalesMenuPage() {
    const [searchParams] = useSearchParams();
    const tableId = searchParams.get('tableId');
    const orderId = searchParams.get('orderId');

    const { hasPermission } = useAuth();
    const { isOpen } = useBusiness();
    const [cart, setCart] = useState<OrderItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    // Config state
    const [incomeCategories, setIncomeCategories] = useState<any[]>([]);
    const [defaultCategoryId, setDefaultCategoryId] = useState<string>('');
    // const [defaultChannelId, setDefaultChannelId] = useState<string>('');
    const [isLoadingConfig, setIsLoadingConfig] = useState(true);

    // Dialog State
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

    const [categories, setCategories] = useState<any[]>([]);
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [selectedMenuCategoryId, setSelectedMenuCategoryId] = useState<string>('all');

    const [paymentChannels, setPaymentChannels] = useState<any[]>([]);
    const [selectedChannelId, setSelectedChannelId] = useState<string>('');

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [finalAmount, setFinalAmount] = useState<number | undefined>(undefined);
    const [selectedCampaign, setSelectedCampaign] = useState<any | null>(null);

    const fetchProducts = async () => {
        setIsLoadingProducts(true);
        try {
            const [prodRes, catRes, campRes] = await Promise.all([
                axios.get('/api/products').catch(() => ({ data: { data: [] } })),
                axios.get('/api/menu-categories').catch(() => ({ data: { data: [] } })),
                axios.get('/api/campaigns').catch(() => ({ data: { data: [] } }))
            ]);
            setProducts(Array.isArray(prodRes?.data?.data) ? prodRes.data.data : []);
            setCategories(Array.isArray(catRes?.data?.data) ? catRes.data.data : []);

            // Only active campaigns
            const activeCamps = Array.isArray(campRes?.data?.data)
                ? campRes.data.data.filter((c: any) => c.is_active)
                : [];
            setCampaigns(activeCamps);

        } catch (error) {
            console.error("Failed to load products/categories", error);
            setProducts([]);
            setCategories([]);
        } finally {
            setIsLoadingProducts(false);
        }
    };

    // Helper to get all category IDs including children recursively
    const getAllCategoryIds = (catId: string, allCats: any[]): string[] => {
        const ids = [catId];
        const children = allCats.filter(c => c.parent_id === catId);
        children.forEach(child => {
            ids.push(...getAllCategoryIds(child.id, allCats));
        });
        return ids;
    };

    // Filter active products
    const activeProducts = products.filter(p => {
        if (!p.is_active) return false;
        if (selectedMenuCategoryId !== 'all') {
            if (selectedMenuCategoryId === 'uncategorized') {
                return !p.menu_category_id;
            }
            if (selectedMenuCategoryId === 'campaigns') return true; // Handled separately in render

            const findNode = (nodes: any[], id: string): any => {
                for (const node of nodes) {
                    if (node.id === id) return node;
                    if (node.children) {
                        const found = findNode(node.children, id);
                        if (found) return found;
                    }
                }
                return null;
            };

            const collectIds = (node: any): string[] => {
                let ids = [node.id];
                if (node.children) {
                    node.children.forEach((c: any) => ids.push(...collectIds(c)));
                }
                return ids;
            };

            const selectedNode = findNode(categories, selectedMenuCategoryId);
            if (selectedNode) {
                const allowedIds = collectIds(selectedNode);
                return allowedIds.includes(p.menu_category_id);
            }
            // Fallback if not found in tree (shouldn't happen)
            return p.menu_category_id === selectedMenuCategoryId;
        }
        return true;
    });

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const [catRes, chanRes] = await Promise.all([
                    axios.get('/api/categories').catch(() => ({ data: { data: [] } })), // accounting categories
                    axios.get('/api/channels').catch(() => ({ data: { data: [] } }))
                ]);

                const catData = Array.isArray(catRes?.data?.data) ? catRes.data.data : [];
                const chanData = Array.isArray(chanRes?.data?.data) ? chanRes.data.data : [];

                const incomeCats = catData.filter((c: any) => c.type === 'income');
                setIncomeCategories(incomeCats);

                // Filter payment channels - USER REQUEST: Show ALL channels
                // const pChans = chanRes.data.data.filter((c: any) => c.type === 'payment');
                setPaymentChannels(chanData);

                const firstIncome = incomeCats.find((c: any) =>
                    ['Dükkan', 'Mağaza', 'Genel Satış', 'Mağaza Satışı'].includes(c.name)
                ) || incomeCats.find((c: any) => c.is_default) || incomeCats[0];

                if (firstIncome) {
                    setDefaultCategoryId(firstIncome.id);
                    setSelectedCategoryId(firstIncome.id);

                    if (firstIncome.default_channel_id) {
                        setSelectedChannelId(firstIncome.default_channel_id);
                    } else {
                        // "Değilse hiç birşey çıkmamalı" -> Clear selection if no specific default
                        setSelectedChannelId('');
                    }
                }

            } catch (error) {
                console.error("Failed to load sales config", error);
            } finally {
                setIsLoadingConfig(false);
            }
        };
        fetchConfig();
        fetchProducts();
    }, []);

    const handleProductClick = (product: Product) => {
        setSelectedCampaign(null);
        setFinalAmount(undefined);
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { id: product.id, name: product.name, price: Number(product.price), quantity: 1 }];
        });
    };

    const handleCampaignClick = (campaign: any) => {
        setSelectedCampaign(campaign);
        const items = campaign.products.map((p: any) => ({
            id: p.product_id,
            name: p.name,
            price: Number(p.price),
            quantity: p.quantity
        }));
        setCart(items);

        const subtotal = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
        let total = subtotal;
        if (campaign.discount_type === 'amount') {
            total = Math.max(0, subtotal - Number(campaign.discount_amount));
        } else {
            total = subtotal * (1 - Number(campaign.discount_amount) / 100);
        }
        setFinalAmount(Number(total.toFixed(2)));
    };

    const handleUpdateQuantity = (id: string, delta: number) => {
        setSelectedCampaign(null); // Reset campaign if manual change
        setFinalAmount(undefined);
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const handleRemoveItem = (id: string) => {
        setSelectedCampaign(null); // Reset campaign if manual change
        setFinalAmount(undefined);
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const handleInitiateOrder = () => {
        if (!isOpen) {
            alert("İşletme şu anda kapalı. Finansal işlem yapılamaz.");
            return;
        }
        if (cart.length === 0) return;
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // If a campaign is selected, we keep the finalAmount that was set by handleCampaignClick.
        // If not, we set it to the base total.
        if (!selectedCampaign) {
            setFinalAmount(total);
        }

        setIsConfirmDialogOpen(true);
    };




    useEffect(() => {

        // If orderId is provided, fetch the existing order data
        if (orderId) {
            const fetchOrder = async () => {
                try {
                    const res = await axios.get(`/api/orders/${orderId}`);
                    if (res.data.data) {
                        const order = res.data.data;
                        if (Array.isArray(order.items)) {
                            setCart(order.items);
                        }
                    }
                } catch (err) {
                    console.error('Failed to fetch order:', err);
                }
            };
            fetchOrder();
        }
    }, [orderId]);

    // Finalize Order
    const handleFinalizeOrder = async () => {
        if (!selectedCategoryId) return;

        setIsProcessing(true);
        try {
            const actualAmount = finalAmount !== undefined ? finalAmount : cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const baseTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const discountAmount = Math.max(0, baseTotal - actualAmount);

            // Generate summary description
            const summary = cart.map(item => `${item.name} x${item.quantity}`).join(', ');

            const payload = {
                type: 'income',
                amount: actualAmount,
                base_amount: baseTotal,
                discount_amount: discountAmount,
                description: selectedCampaign ? `Kampanya: ${selectedCampaign.name}` : `Adisyon: ${summary}`,
                category_id: selectedCategoryId,
                channel_id: selectedChannelId,
                transaction_date: new Date().toISOString(),
                campaign_id: selectedCampaign?.id || null,
                campaign_code: selectedCampaign?.unique_code || null,
                table_id: tableId || null,
                order_id: orderId || null,
                items: cart.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    unit_price: item.price,
                    total_price: item.price * item.quantity,
                    is_stock: true // Assume all sales items are stock related for now, or let backend decide
                }))
            };

            await axios.post('/api/transactions', payload);

            // If it's a table order, we might want to close the order in the 'orders' table too
            // or mark it as paid. The backend transaction logic usually handles this if integrated.
            // For now, let's at least ensure table status is updated if not already done.
            if (tableId) {
                await axios.patch(`/api/tables/${tableId}`, { status: 'available' });
            }

            setCart([]); // Clear cart on success
            setFinalAmount(undefined); // Reset final amount
            setSelectedCampaign(null); // Clear selected campaign
            setIsConfirmDialogOpen(false); // Close dialog

            // Removed fetchDailyTotal and fetchDailySales calls

        } catch (error: any) {
            console.error("Sale failed", error);
            const errorMessage = error.response?.data?.error || "Sipariş başarısız. Lütfen tekrar deneyin.";
            alert(`Satış başarısız: ${errorMessage}`);
        } finally {
            setIsProcessing(false);
        }
    };

    if (!hasPermission('transactions.write')) {
        return (
            <Layout title="Satış Menüsü" description="POS Terminali" fullWidth>
                <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                    <AlertCircle className="h-12 w-12 mb-4 text-slate-300" />
                    <h2 className="text-xl font-semibold">Erişim Reddedildi</h2>
                    <p>Satış yapma yetkiniz bulunmamaktadır.</p>
                </div>
            </Layout>
        );
    }

    if (isLoadingConfig) {
        return (
            <Layout title="Satış Menüsü" fullWidth>
                <div className="p-8 text-center text-slate-500">POS Başlatılıyor...</div>
            </Layout>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50/50">
            <Layout
                title="Satış Menüsü"
                description="POS Terminali"
                className="h-screen overflow-hidden w-full"
                fullWidth={true}
                actions={
                    <div className="flex bg-slate-100 p-1 rounded-lg overflow-x-auto max-w-[200px] md:max-w-none">
                        <Button
                            variant={selectedMenuCategoryId === 'all' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setSelectedMenuCategoryId('all')}
                            className="text-xs h-7 whitespace-nowrap"
                        >
                            Tümü
                        </Button>
                        {campaigns.length > 0 && (
                            <Button
                                variant={selectedMenuCategoryId === 'campaigns' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setSelectedMenuCategoryId('campaigns')}
                                className={cn(
                                    "text-xs h-7 whitespace-nowrap",
                                    selectedMenuCategoryId === 'campaigns' ? "bg-orange-600 hover:bg-orange-700" : ""
                                )}
                            >
                                <Tag className="h-3 w-3 mr-1" />
                                Kampanyalar
                            </Button>
                        )}
                        {categories.map((cat: any) => (
                            <Button
                                key={cat.id}
                                variant={selectedMenuCategoryId === cat.id ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setSelectedMenuCategoryId(cat.id)}
                                className="text-xs h-7 whitespace-nowrap"
                            >
                                {cat.name}
                            </Button>
                        ))}
                        {products.some(p => !p.menu_category_id && p.is_active) && (
                            <Button
                                variant={selectedMenuCategoryId === 'uncategorized' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setSelectedMenuCategoryId('uncategorized')}
                                className="text-xs h-7 whitespace-nowrap"
                            >
                                Diğer
                            </Button>
                        )}
                    </div>
                }
            >
                <div className="flex flex-1 gap-6 h-full pb-6 pl-1 pr-1 overflow-hidden relative">
                    {/* Left: Product Grid */}
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-24 lg:pb-0">

                        {(!defaultCategoryId || paymentChannels.length === 0) && (
                            <div className="mb-6 p-4 text-center text-rose-500 bg-rose-50 rounded-lg border border-rose-100">
                                <AlertCircle className="h-6 w-6 mx-auto mb-2" />
                                <p className="font-semibold">Sistem Yapılandırması Eksik</p>
                                <p className="text-xs">Lütfen önce bir Gelir Kategorisi ve Ödeme Hesabı oluşturun.</p>
                            </div>
                        )}

                        {/* Product Rendering Logic */}
                        {(() => {
                            // Helper to find node in tree
                            const findNode = (nodes: any[], id: string): any => {
                                for (const node of nodes) {
                                    if (node.id === id) return node;
                                    if (node.children) {
                                        const found = findNode(node.children, id);
                                        if (found) return found;
                                    }
                                }
                                return null;
                            };

                            // Helper to collect all IDs from a node (for sub-group filtering)
                            const collectIds = (node: any): string[] => {
                                let ids = [node.id];
                                if (node.children) {
                                    node.children.forEach((c: any) => ids.push(...collectIds(c)));
                                }
                                return ids;
                            };

                            const selectedNode = selectedMenuCategoryId !== 'all' ? findNode(categories, selectedMenuCategoryId) : null;
                            const hasSubCategories = selectedNode && selectedNode.children && selectedNode.children.length > 0;

                            if (isLoadingProducts) {
                                return (
                                    <div className="flex items-center justify-center py-20 opacity-50">
                                        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                                    </div>
                                );
                            }

                            if (selectedMenuCategoryId === 'campaigns') {
                                return (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-20">
                                        {campaigns.map(campaign => {
                                            const baseTotal = (campaign.products || []).reduce((acc: number, p: any) => acc + (Number(p.price || 0) * p.quantity), 0);
                                            const finalPrice = campaign.discount_type === 'amount'
                                                ? Math.max(0, baseTotal - Number(campaign.discount_amount))
                                                : baseTotal * (1 - Number(campaign.discount_amount) / 100);

                                            return (
                                                <ProductCard
                                                    key={campaign.id}
                                                    name={campaign.name}
                                                    price={finalPrice}
                                                    originalPrice={baseTotal}
                                                    color="orange"
                                                    image_url={campaign.image_url}
                                                    onClick={() => handleCampaignClick(campaign)}
                                                />
                                            );
                                        })}
                                    </div>
                                );
                            }

                            if (activeProducts.length === 0) {
                                return (
                                    <div className="flex flex-col items-center justify-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 mx-4">
                                        <p>Aktif ürün bulunamadı.</p>
                                        <p className="text-sm mt-1">Ürün eklemek için "Ürün Yönetimi"ne tıklayın.</p>
                                    </div>
                                );
                            }

                            // If All selected or leaf node (no children), show flat grid
                            if (!hasSubCategories) {
                                return (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-20">
                                        {activeProducts.map(product => (
                                            <ProductCard
                                                key={product.id}
                                                name={product.name}
                                                price={Number(product.price)}
                                                color={product.color}
                                                image_url={product.image_url}
                                                onClick={() => handleProductClick(product)}
                                            />
                                        ))}
                                    </div>
                                );
                            }

                            // Grouped View for Categories with Children
                            return (
                                <div className="space-y-8 pb-20">
                                    {/* 1. Direct Products (Orphans in the parent category) */}
                                    {(() => {
                                        const directProducts = activeProducts.filter(p => p.menu_category_id === selectedNode.id);
                                        if (directProducts.length === 0) return null;
                                        return (
                                            <div>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <div className="h-px flex-1 bg-slate-200"></div>
                                                    <h3 className="font-semibold text-lg text-slate-500">{selectedNode.name}</h3>
                                                    <div className="h-px flex-1 bg-slate-200"></div>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                                    {directProducts.map(product => (
                                                        <ProductCard
                                                            key={product.id}
                                                            name={product.name}
                                                            price={Number(product.price)}
                                                            color={product.color}
                                                            image_url={product.image_url}
                                                            onClick={() => handleProductClick(product)}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    {/* 2. Sub-Category Groups */}
                                    {selectedNode.children.map((subCat: any) => {
                                        // Get all product IDs belonging to this sub-category (or its descendants)
                                        const allowedIds = collectIds(subCat);
                                        const subProducts = activeProducts.filter(p => allowedIds.includes(p.menu_category_id));

                                        if (subProducts.length === 0) return null;

                                        return (
                                            <div key={subCat.id}>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <h3 className="font-bold text-xl text-slate-800">{subCat.name}</h3>
                                                    <div className="h-px flex-1 bg-slate-200"></div>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                                    {subProducts.map(product => (
                                                        <ProductCard
                                                            key={product.id}
                                                            name={product.name}
                                                            price={Number(product.price)}
                                                            color={product.color}
                                                            image_url={product.image_url}
                                                            onClick={() => handleProductClick(product)}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })()}


                    </div>

                    {/* Right: Order Summary. Hidden on mobile, shown on lg screens. */}
                    <div className="hidden lg:block w-[400px] flex-shrink-0 h-full pb-6">
                        <OrderSummary
                            items={cart}
                            onUpdateQuantity={handleUpdateQuantity}
                            onRemove={handleRemoveItem}
                            onConfirm={handleInitiateOrder}
                            isProcessing={isProcessing}
                            finalAmount={finalAmount}
                        />
                    </div>

                    {/* Mobile Cart Button (FAB) */}
                    <div className="lg:hidden fixed bottom-4 right-4 left-4 z-50">
                        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                            <SheetTrigger asChild>
                                <Button className="w-full h-14 shadow-xl bg-slate-900 text-white flex justify-between px-6 items-center rounded-xl">
                                    <div className="flex gap-2 items-center">
                                        <div className="bg-white/20 px-2 py-0.5 rounded text-sm font-bold">
                                            {cart.reduce((acc, item) => acc + item.quantity, 0)}
                                        </div>
                                        <span>Sepeti Görüntüle</span>
                                    </div>
                                    <span className="font-bold text-lg">
                                        ₺{(finalAmount !== undefined ? finalAmount : cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)).toLocaleString('tr-TR')}
                                    </span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-xl">
                                <SheetHeader className="p-4 border-b">
                                    <SheetTitle>Sipariş Özeti</SheetTitle>
                                </SheetHeader>
                                <div className="h-full pb-20">
                                    <OrderSummary
                                        items={cart}
                                        onUpdateQuantity={handleUpdateQuantity}
                                        onRemove={handleRemoveItem}
                                        onConfirm={() => {
                                            setIsCartOpen(false);
                                            handleInitiateOrder();
                                        }}
                                        isProcessing={isProcessing}
                                        finalAmount={finalAmount}
                                    />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

                <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Satışı Tamamla</DialogTitle>
                            <DialogDescription>
                                Bu işlem için gelir kategorisini seçin.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">
                                    Kategori
                                </Label>
                                <div className="col-span-3">
                                    <Select
                                        value={selectedCategoryId}
                                        onValueChange={(val) => {
                                            setSelectedCategoryId(val);
                                            // Auto-select channel if category has default
                                            const cat = incomeCategories.find((c: any) => c.id === val);
                                            if (cat && cat.default_channel_id) {
                                                setSelectedChannelId(cat.default_channel_id);
                                            } else {
                                                setSelectedChannelId('');
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
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right">
                                    Tahsil Edilecek
                                </Label>
                                <div className="col-span-3">
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₺</div>
                                        <input
                                            type="number"
                                            id="amount"
                                            className="w-full pl-7 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-lg"
                                            value={finalAmount}
                                            onChange={(e) => setFinalAmount(Number(e.target.value))}
                                        />
                                    </div>
                                    {(() => {
                                        const originalTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                                        const displayAmount = finalAmount !== undefined ? finalAmount : originalTotal;
                                        if (displayAmount < originalTotal) {
                                            const discount = originalTotal - displayAmount;
                                            return (
                                                <div className="mt-2 flex items-center gap-2">
                                                    <span className="text-sm text-slate-400 line-through">
                                                        ₺{originalTotal.toLocaleString('tr-TR')}
                                                    </span>
                                                    <span className="text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">
                                                        ₺{discount.toLocaleString('tr-TR')} indirim
                                                    </span>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })()}
                                </div>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="channel" className="text-right">
                                    Ödeme Yöntemi
                                </Label>
                                <div className="col-span-3">
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
                                                // If category restricts channels, only show those. 
                                                // If no channels mapped, show ALL (fallback behavior)
                                                if (cat && cat.form_channel_ids && cat.form_channel_ids.length > 0) {
                                                    return cat.form_channel_ids.includes(chan.id);
                                                }
                                                return true;
                                            }).map((chan) => (
                                                <SelectItem key={chan.id} value={chan.id}>
                                                    <div className="flex items-center gap-2">
                                                        {chan.name}
                                                        {chan.description && <span className="text-xs text-slate-400">({chan.description})</span>}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>İptal</Button>
                            <Button onClick={handleFinalizeOrder} disabled={isProcessing || !selectedChannelId}>
                                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Satışı Onayla
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </Layout>
        </div>
    );
}
