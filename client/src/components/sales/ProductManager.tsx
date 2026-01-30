
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit2, Trash2, Settings2, Loader2, EyeOff } from "lucide-react";
import axios from 'axios';
import { cn } from '@/lib/utils';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

interface Product {
    id: string;
    name: string;
    price: number;
    color: string;
    category_id?: string;
    image_url?: string;
    is_active: boolean;
}

interface ProductManagerProps {
    onProductsChange: () => void;
}

const COLORS = [
    { name: 'Default', value: 'bg-white' },
    { name: 'Red', value: 'bg-red-50' },
    { name: 'Orange', value: 'bg-orange-50' },
    { name: 'Amber', value: 'bg-amber-50' },
    { name: 'Yellow', value: 'bg-yellow-50' },
    { name: 'Lime', value: 'bg-lime-50' },
    { name: 'Green', value: 'bg-green-50' },
    { name: 'Emerald', value: 'bg-emerald-50' },
    { name: 'Teal', value: 'bg-teal-50' },
    { name: 'Cyan', value: 'bg-cyan-50' },
    { name: 'Sky', value: 'bg-sky-50' },
    { name: 'Blue', value: 'bg-blue-50' },
    { name: 'Indigo', value: 'bg-indigo-50' },
    { name: 'Violet', value: 'bg-violet-50' },
    { name: 'Purple', value: 'bg-purple-50' },
    { name: 'Fuchsia', value: 'bg-fuchsia-50' },
    { name: 'Pink', value: 'bg-pink-50' },
    { name: 'Rose', value: 'bg-rose-50' },
    { name: 'Stone', value: 'bg-stone-50' },
];

export function ProductManager({ onProductsChange }: ProductManagerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Edit Mode State
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<{
        name: string;
        price: string;
        color: string;
        image_url: string;
        is_active: boolean;
        file: File | null;
    }>({
        name: '',
        price: '',
        color: 'bg-white',
        image_url: '',
        is_active: true,
        file: null
    });
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('/api/products');
            setProducts(res.data.data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchProducts();
        }
    }, [isOpen]);

    const resetForm = () => {
        setEditingProduct(null);
        setFormData({ name: '', price: '', color: 'bg-white', image_url: '', is_active: true, file: null });
        setFilePreview(null);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price.toString(),
            color: product.color || 'bg-white',
            image_url: product.image_url || '',
            is_active: product.is_active,
            file: null
        });
        setFilePreview(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData({ ...formData, file });
            setFilePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price); // Backend expects number but FormData sends string, backend generic handler converts?
        // Wait, backend: const { price } = req.body.
        // If coming from FormData, price is string.
        // My backend code: `const { ... } = req.body; ... VALUES ($1...)`.
        // Postgres driver usually handles string->numeric if matches type.
        // But better to be safe?
        // Actually, backend lines: `price: parseFloat(formData.price)` was previously used in Frontend payload construction.
        // In FormData, it's string. Backend logic uses `req.body.price`.
        // `VALUES (..., $3, ...)` -> $3 = price.
        // If standard pg, it auto-casts string "10.5" to numeric.
        // So passing string is fine.

        data.append('color', formData.color);
        data.append('is_active', String(formData.is_active));

        if (formData.file) {
            data.append('image', formData.file);
        } else if (formData.image_url) {
            // Keep existing URL if no new file selected ?
            // Backend logic: let image_url = req.body.image_url; if (req.file) image_url = ...;
            // So if we send image_url string via FormData, it persists.
            data.append('image_url', formData.image_url);
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

            await fetchProducts();
            onProductsChange(); // Notify parent to refresh
            resetForm();
        } catch (error) {
            console.error("Failed to save product", error);
            alert("Failed to save product");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent edit triggers
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            await axios.delete(`/api/products/${id}`);
            await fetchProducts();
            onProductsChange();
        } catch (error) {
            console.error("Failed to delete", error);
            alert("Failed to delete product");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-white hover:bg-slate-50 border-slate-200 text-slate-600">
                    <Settings2 className="h-4 w-4" />
                    Manage Products
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl h-[90vh] md:h-[700px] flex flex-col p-0 gap-0 overflow-hidden">
                <DialogHeader className="p-6 pb-2 border-b border-slate-100 bg-slate-50/50">
                    <DialogTitle>Product Management</DialogTitle>
                    <DialogDescription>Add or edit products for your sales menu.</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                    {/* Left: Product List */}
                    <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col bg-slate-50/30">
                        <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                {products.length} Products
                            </span>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={resetForm}
                                className={cn("h-7 text-xs", !editingProduct ? "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary" : "")}
                            >
                                <Plus className="h-3 w-3 mr-1" /> New
                            </Button>
                        </div>
                        <ScrollArea className="flex-1 p-3">
                            <div className="space-y-2">
                                {isLoading ? (
                                    <div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin text-slate-300" /></div>
                                ) : products.map(product => (
                                    <div
                                        key={product.id}
                                        onClick={() => handleEdit(product)}
                                        className={cn(
                                            "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm",
                                            editingProduct?.id === product.id
                                                ? "bg-primary/5 border-primary/30 ring-1 ring-primary/20"
                                                : "bg-white border-slate-200 hover:border-slate-300",
                                            !product.is_active && "opacity-50 grayscale"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            {product.image_url ? (
                                                <img src={product.image_url} alt="" className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                                            ) : (
                                                <div className={cn("w-3 h-8 rounded-full", product.color)} />
                                            )}
                                            <div>
                                                <p className="font-medium text-sm text-slate-800 line-clamp-1">{product.name}</p>
                                                <p className="text-xs font-bold text-slate-500">{product.price} TL</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {!product.is_active && <EyeOff className="h-3 w-3 text-slate-400" />}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 text-slate-400 hover:text-red-600 hover:bg-red-50 -mr-1"
                                                onClick={(e) => handleDelete(product.id, e)}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Right: Form */}
                    <div className="w-full md:w-1/2 p-6 flex flex-col overflow-y-auto bg-white">
                        <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
                            {editingProduct ? <Edit2 className="h-4 w-4 text-primary" /> : <Plus className="h-4 w-4 text-emerald-600" />}
                            {editingProduct ? "Edit Product" : "New Product"}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <Label htmlFor="is_active" className="cursor-pointer">
                                    <span className="font-medium text-slate-700 block">Status</span>
                                    <span className="text-xs text-slate-500">{formData.is_active ? 'Active (Visible)' : 'Passive (Hidden)'}</span>
                                </Label>
                                <Switch
                                    id="is_active"
                                    checked={formData.is_active}
                                    onCheckedChange={checked => setFormData({ ...formData, is_active: checked })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Latte"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">Price (TL)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="0.00"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">Product Image</Label>
                                <div className="flex flex-col gap-3">
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="cursor-pointer file:cursor-pointer"
                                    />

                                    {(filePreview || formData.image_url) && (
                                        <div className="relative w-full h-32 rounded-lg border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center group">
                                            <img
                                                src={filePreview || formData.image_url}
                                                alt="Preview"
                                                className="h-full w-full object-contain"
                                                onError={(e) => (e.currentTarget.style.display = 'none')}
                                            />
                                        </div>
                                    )}
                                    {formData.image_url && (
                                        <p className="text-xs text-slate-400 font-mono break-all bg-slate-50 p-2 rounded border border-slate-100">
                                            Path: {formData.image_url}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Color Tag</Label>
                                <div className="grid grid-cols-5 gap-2">
                                    {COLORS.map(c => (
                                        <button
                                            key={c.value}
                                            type="button"
                                            className={cn(
                                                "h-6 w-full rounded-md border transition-all",
                                                c.value,
                                                formData.color === c.value ? "ring-2 ring-slate-900 border-transparent scale-110 shadow-sm" : "border-slate-200 hover:scale-105"
                                            )}
                                            title={c.name}
                                            onClick={() => setFormData({ ...formData, color: c.value })}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 mt-auto">
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                    {editingProduct ? "Save Changes" : "Create Product"}
                                </Button>
                                {editingProduct && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="w-full mt-2 text-slate-500"
                                        onClick={resetForm}
                                    >
                                        Cancel Edit
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
