
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingCart, Receipt, Save } from "lucide-react";
import { cn } from "@/lib/utils";


interface OrderItem {
    id: string; // Product ID
    name: string;
    price: number;
    quantity: number;
    discount_percent?: number;
}

interface OrderSummaryProps {
    items: OrderItem[];
    onUpdateQuantity: (id: string, delta: number) => void;
    onRemove: (id: string) => void;
    onConfirm: () => void;
    onSave?: () => void; // Support partial updates for table orders
    isProcessing: boolean;
    finalAmount?: number;
}

export function OrderSummary({ items, onUpdateQuantity, onRemove, onConfirm, onSave, isProcessing, finalAmount }: OrderSummaryProps) {
    const subtotal = items.reduce((sum, item) => {
        const price = item.price;
        const discount = item.discount_percent ? (price * item.discount_percent / 100) : 0;
        return sum + ((price - discount) * item.quantity);
    }, 0);
    const totalAmount = finalAmount !== undefined ? finalAmount : subtotal;
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="flex flex-col h-full bg-white border-l border-slate-200 shadow-xl shadow-slate-200/50">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3 mb-1">
                    <Receipt className="h-6 w-6 text-slate-400" />
                    <h2 className="text-xl font-bold text-slate-800">Sipariş Detayı</h2>
                </div>
            </div>

            {/* Order Items */}
            <ScrollArea className="flex-1 p-6">
                {items.length === 0 ? (
                    <div className="h-40 flex flex-col items-center justify-center text-slate-400 space-y-3 opacity-60">
                        <ShoppingCart className="h-12 w-12 stroke-1" />
                        <p className="text-sm">Henüz ürün eklenmemiş</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="group flex flex-col gap-2 animate-in slide-in-from-left-2 duration-300">
                                <div className="flex justify-between items-start">
                                    <span className="font-semibold text-slate-800 text-sm">{item.name}</span>
                                    <div className="flex flex-col items-end">
                                        <span className={cn("font-semibold text-sm", item.discount_percent ? "text-emerald-600" : "text-slate-900")}>
                                            {((item.price * (1 - (item.discount_percent || 0) / 100)) * item.quantity).toLocaleString('tr-TR')} TL
                                        </span>
                                        {item.discount_percent && item.discount_percent > 0 && (
                                            <span className="text-[10px] text-slate-400 line-through">
                                                {(item.price * item.quantity).toLocaleString('tr-TR')} TL
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, -1)}
                                            className="h-7 w-7 flex items-center justify-center rounded-md bg-white text-slate-600 shadow-sm hover:text-rose-600 hover:shadow transition-all disabled:opacity-50"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </button>
                                        <span className="text-sm font-bold w-4 text-center tabular-nums">{item.quantity}</span>
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, 1)}
                                            className="h-7 w-7 flex items-center justify-center rounded-md bg-white text-slate-600 shadow-sm hover:text-emerald-600 hover:shadow transition-all"
                                        >
                                            <Plus className="h-3 w-3" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => onRemove(item.id)}
                                        className="text-slate-400 hover:text-rose-600 transition-colors p-2"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                                <Separator className="mt-2" />
                            </div>
                        ))}
                    </div>
                )}
            </ScrollArea>

            {/* Footer Summary & Action */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-500">
                        <span>Ürün Sayısı</span>
                        <span>{totalItems}</span>
                    </div>
                    {finalAmount !== undefined && finalAmount < subtotal && (
                        <div className="flex justify-between text-xs text-slate-400 line-through">
                            <span>Ara Toplam</span>
                            <span>{subtotal.toLocaleString('tr-TR')} TL</span>
                        </div>
                    )}
                    <div className="flex justify-between items-baseline pt-2">
                        <span className="text-lg font-bold text-slate-800">Toplam</span>
                        <div className="text-right">
                            <span className="text-3xl font-bold text-emerald-600 tracking-tight">
                                {totalAmount.toLocaleString('tr-TR')}
                            </span>
                            <span className="text-sm font-medium text-slate-400 ml-1">TL</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                    {onSave && (
                        <Button
                            variant="outline"
                            className="w-full h-12 text-md font-semibold border-slate-300 hover:bg-slate-100"
                            disabled={items.length === 0 || isProcessing}
                            onClick={onSave}
                        >
                            <Save className="mr-2 h-4 w-4" />
                            Adisyonu Güncelle
                        </Button>
                    )}

                    <Button
                        className="w-full h-14 text-lg font-semibold bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20 active:scale-[0.98] transition-all"
                        disabled={items.length === 0 || isProcessing}
                        onClick={onConfirm}
                    >
                        {isProcessing ? (
                            "İşleniyor..."
                        ) : (
                            <>
                                <Receipt className="mr-2 h-5 w-5" />
                                Siparişi Tamamla & Kapat
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
