
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Loader2, Store } from 'lucide-react';
import { cn } from '@/lib/utils';


export default function PublicMenuPage() {
    const { userId } = useParams();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

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
    }, [userId]);

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

    const currentCategory = data.categories.find((c: any) => c.id === selectedCategory);

    return (
        <div className="min-h-screen bg-white md:bg-slate-50">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-white shadow-sm border-b border-slate-100">
                <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-center">
                    <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                        {data.business_name}
                    </h1>
                </div>

                {/* Categories - Scrollable */}
                <div className="max-w-md mx-auto overflow-x-auto pb-1 no-scrollbar">
                    <div className="flex px-4 gap-2 pb-3">
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
            <div className="max-w-md mx-auto pt-4 px-4 pb-20">
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

                                        {/* Top Level Header if needed, but handled by parent usually. 
                                            Actually main header is already shown at top of content.
                                         */}
                                        {level === 0 && <h2 className="text-xl font-bold text-slate-800 px-1 mb-4">{category.name}</h2>}

                                        {/* Products Grid */}
                                        {hasProducts && (
                                            <div className="grid gap-4">
                                                {category.products.map((product: any) => (
                                                    <div
                                                        key={product.id}
                                                        className="flex bg-white rounded-2xl p-3 shadow-sm border border-slate-100 overflow-hidden"
                                                    >
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
                                                            product.color && (
                                                                <div
                                                                    className={cn("h-24 w-24 flex-shrink-0 rounded-xl mr-4 bg-slate-100")}
                                                                    style={{ backgroundColor: product.color !== 'bg-white' ? undefined : '#f1f5f9' }}
                                                                >
                                                                    <div className={cn("w-full h-full opacity-50", product.color)}></div>
                                                                </div>
                                                            )
                                                        )}

                                                        <div className="flex flex-col flex-1 min-w-0 justify-between py-1">
                                                            <div>
                                                                <h3 className="font-bold text-slate-900 line-clamp-2">{product.name}</h3>
                                                                {product.description && (
                                                                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.description}</p>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center justify-between mt-2">
                                                                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-sm">
                                                                    {Number(product.price).toLocaleString('tr-TR')} ₺
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
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

            {/* Footer Brand */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 py-3 text-center z-10">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Powered by GG Esnaf
                </p>
            </div>
        </div>
    );
}
