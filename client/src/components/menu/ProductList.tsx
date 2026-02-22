import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Search, ImageIcon, MoreHorizontal, ChefHat } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { RecipeEditor } from '@/components/RecipeEditor';

interface Product {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
    is_active: boolean;
    sort_order: number;
    menu_category_id: string;
    description?: string;
    takeaway_discount_percent?: number;
}

interface ProductListProps {
    selectedCategoryId: string | null;
}

export const ProductList = ({ selectedCategoryId }: ProductListProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');

    // Dialog State
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Recipe Editor State
    const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);
    const [recipeProduct, setRecipeProduct] = useState<{ id: string; name: string } | null>(null);

    const [formData, setFormData] = useState<any>({
        name: '',
        price: '',
        is_active: true,
        sort_order: 0,
        description: '',
        takeaway_discount_percent: '',
        takeaway_price: '',
        image_file: null as File | null
    });

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            // Fetch all products, filter client side for MVP or backend filter?
            // Existing endpoint returns ALL products for user.
            // Better to filter by category_id ON BACKEND if list is huge, but for MVP client filter is ok.
            // Wait, products table has menu_category_id now.
            // Let's rely on standard GET /api/products and filter locally for now to avoid changing GET endpoint logic too much
            // unless we want to add query param support.

            const res = await axios.get('/api/products');
            let allProducts = res.data.data;

            if (selectedCategoryId) {
                allProducts = allProducts.filter((p: Product) => p.menu_category_id === selectedCategoryId);
                allProducts.sort((a: Product, b: Product) => {
                    const orderA = a.sort_order ?? 0;
                    const orderB = b.sort_order ?? 0;
                    if (orderA !== orderB) {
                        return orderA - orderB;
                    }
                    return a.name.localeCompare(b.name);
                });
            } else {
                // Should we show all? Or none?
                // Let's show none if no category selected to keep UI clean, or "Uncategorized" logic?
                // Requirement says "Product List on right". If no category selected, maybe show empty state "Select a category".
                allProducts = [];
            }
            setProducts(allProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedCategoryId) {
            fetchProducts();
        } else {
            setProducts([]);
        }
    }, [selectedCategoryId]);

    const handleAdd = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            price: '',
            is_active: true,
            sort_order: 0,
            description: '',
            takeaway_discount_percent: '',
            takeaway_price: '',
            image_file: null
        });
        setIsDialogOpen(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            is_active: product.is_active,
            sort_order: product.sort_order || 0,
            description: product.description || '',
            takeaway_discount_percent: product.takeaway_discount_percent || '',
            takeaway_price: product.takeaway_discount_percent
                ? (product.price * (1 - product.takeaway_discount_percent / 100)).toFixed(2)
                : product.price,
            image_file: null
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
        try {
            await axios.delete(`/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error(error);
            alert('Silinemedi');
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedCategoryId) return alert('Kategori seçili değil!');

        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('menu_category_id', selectedCategoryId);
        data.append('is_active', String(formData.is_active));
        data.append('sort_order', String(formData.sort_order));
        data.append('description', formData.description);
        data.append('takeaway_discount_percent', formData.takeaway_discount_percent || '0');

        if (formData.image_file) {
            data.append('image', formData.image_file);
        }

        try {
            if (editingProduct) {
                await axios.put(`/api/products/${editingProduct.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post('/api/products', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            fetchProducts();
            setIsDialogOpen(false);
        } catch (error: any) {
            console.error(error);
            alert(error.response?.data?.error || 'Kaydedilemedi');
        }
    };

    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    if (!selectedCategoryId) {
        return (
            <div className="h-full flex items-center justify-center text-slate-400">
                <div className="text-center">
                    <Search className="h-12 w-12 mx-auto mb-2 opacity-20" />
                    <p>Ürünleri görmek için soldan bir kategori seçin.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/50">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Ürün ara..."
                        className="pl-9 h-10 bg-white"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <Button onClick={handleAdd} className="gap-2">
                    <Plus className="h-4 w-4" /> Yeni Ürün
                </Button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4">
                {isLoading ? (
                    <div className="text-center p-8 text-slate-400">Yükleniyor...</div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center p-12 border-2 border-dashed border-slate-100 rounded-xl">
                        <p className="text-slate-500 font-medium">Bu kategoride ürün yok.</p>
                        <Button variant="link" onClick={handleAdd}>Hemen ekle</Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-3">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="group flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all bg-white">
                                {/* Image / Placeholder */}
                                <div className="h-12 w-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                                    {product.image_url ? (
                                        <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <ImageIcon className="h-5 w-5 text-slate-300" />
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h4 className={cn("font-medium truncate", !product.is_active && "text-slate-400 line-through")}>
                                        {product.name}
                                    </h4>
                                    <p className="text-sm text-slate-500">
                                        {Number(product.price).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <span className={cn(
                                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                        product.is_active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
                                    )}>
                                        {product.is_active ? 'Aktif' : 'Pasif'}
                                    </span>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleEdit(product)}>
                                                <Edit2 className="mr-2 h-4 w-4" /> Düzenle
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => {
                                                setRecipeProduct({ id: product.id, name: product.name });
                                                setRecipeDialogOpen(true);
                                            }}>
                                                <ChefHat className="mr-2 h-4 w-4" /> Reçete
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600 focus:text-red-700 focus:bg-red-50" onClick={() => handleDelete(product.id)}>
                                                <Trash2 className="mr-2 h-4 w-4" /> Sil
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Product Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSave} className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Ürün Adı</Label>
                                <Input
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Örn: Cheeseburger"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Sıra No</Label>
                                <Input
                                    type="number"
                                    value={formData.sort_order}
                                    onChange={e => setFormData({ ...formData, sort_order: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Fiyat (TL)</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Al/Götür Satış Fiyatı (TL)</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.takeaway_price}
                                    onChange={e => {
                                        const tPrice = parseFloat(e.target.value) || 0;
                                        const mPrice = parseFloat(formData.price) || 0;
                                        let percent = 0;
                                        if (mPrice > 0) {
                                            percent = Math.max(0, ((mPrice - tPrice) / mPrice) * 100);
                                        }
                                        setFormData({
                                            ...formData,
                                            takeaway_price: e.target.value,
                                            takeaway_discount_percent: percent.toFixed(2)
                                        });
                                    }}
                                    placeholder="İndirimli fiyat"
                                />
                                <div className="flex justify-between items-center mt-1">
                                    <p className="text-[10px] text-slate-500">Paket indirimli fiyat</p>
                                    {formData.takeaway_discount_percent > 0 && (
                                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded">
                                            İndirim: %{formData.takeaway_discount_percent}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Görsel (İsteğe Bağlı)</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={e => {
                                    if (e.target.files?.[0]) {
                                        setFormData({ ...formData, image_file: e.target.files[0] })
                                    }
                                }}
                            />
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50">
                            <div className="space-y-0.5">
                                <Label className="text-base">Aktif Durum</Label>
                                <p className="text-xs text-slate-500">Ürün menüde görünsün mu?</p>
                            </div>
                            <Switch
                                checked={formData.is_active}
                                onCheckedChange={c => setFormData({ ...formData, is_active: c })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Açıklama</Label>
                            <Textarea
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Ürün açıklaması..."
                            />
                        </div>

                        <DialogFooter>
                            <Button type="submit">Kaydet</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Recipe Editor Dialog */}
            {recipeProduct && (
                <RecipeEditor
                    productId={recipeProduct.id}
                    productName={recipeProduct.name}
                    open={recipeDialogOpen}
                    onOpenChange={setRecipeDialogOpen}
                />
            )}
        </div>
    );
};
