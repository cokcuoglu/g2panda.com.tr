import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Plus,
    Edit2,
    Trash2,
    Loader2,
    Ticket
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';

interface CampaignProduct {
    product_id: string;
    quantity: number;
    name?: string;
    price?: number;
}

interface Campaign {
    id: string;
    name: string;
    unique_code: string;
    description: string;
    discount_amount: number;
    discount_type: 'amount' | 'percent';
    is_active: boolean;
    image_url?: string;
    products: CampaignProduct[];
}

interface Product {
    id: string;
    name: string;
    price: number;
}

export const CampaignManager = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        unique_code: '',
        description: '',
        discount_amount: 0,
        discount_type: 'amount' as 'amount' | 'percent',
        is_active: true,
        image_url: '',
        file: null as File | null,
        selectedProducts: [] as CampaignProduct[]
    });
    const [filePreview, setFilePreview] = useState<string | null>(null);

    const fetchCampaigns = async () => {
        try {
            const res = await axios.get('/api/campaigns');
            setCampaigns(res.data.data);
        } catch (error) {
            console.error('Failed to fetch campaigns', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await axios.get('/api/products');
            setProducts(res.data.data);
        } catch (error) {
            console.error('Failed to fetch products', error);
        }
    };

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            await Promise.all([fetchCampaigns(), fetchProducts()]);
            setIsLoading(false);
        };
        init();
    }, []);

    const generateUniqueCode = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `CMP-${year}${month}${day}-${hours}${minutes}${seconds}`;
    };

    const handleOpenDialog = (campaign?: Campaign) => {
        if (campaign) {
            setEditingCampaign(campaign);
            setFormData({
                name: campaign.name,
                unique_code: campaign.unique_code,
                description: campaign.description || '',
                discount_amount: Number(campaign.discount_amount),
                discount_type: campaign.discount_type,
                is_active: campaign.is_active,
                image_url: campaign.image_url || '',
                file: null,
                selectedProducts: campaign.products || []
            });
            setFilePreview(null);
        } else {
            setEditingCampaign(null);
            setFormData({
                name: '',
                unique_code: generateUniqueCode(),
                description: '',
                discount_amount: 0,
                discount_type: 'amount',
                is_active: true,
                image_url: '',
                file: null,
                selectedProducts: []
            });
            setFilePreview(null);
        }
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        if (!formData.name || !formData.unique_code) return;
        setIsSaving(true);
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('unique_code', formData.unique_code);
            data.append('description', formData.description);
            data.append('discount_amount', String(formData.discount_amount));
            data.append('discount_type', formData.discount_type);
            data.append('is_active', String(formData.is_active));
            data.append('products', JSON.stringify(formData.selectedProducts));

            if (formData.file) {
                data.append('image', formData.file);
            } else if (formData.image_url) {
                data.append('image_url', formData.image_url);
            }

            if (editingCampaign) {
                await axios.put(`/api/campaigns/${editingCampaign.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post('/api/campaigns', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            await fetchCampaigns();
            setIsDialogOpen(false);
        } catch (error: any) {
            console.error('Failed to save campaign', error);
            alert(`Kampanya kaydedilemedi: ${error.response?.data?.error || error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu kampanyayı silmek istediğinize emin misiniz?')) return;
        try {
            await axios.delete(`/api/campaigns/${id}`);
            await fetchCampaigns();
        } catch (error) {
            console.error('Failed to delete campaign', error);
        }
    };

    const toggleProduct = (product: Product) => {
        setFormData(prev => {
            const exists = prev.selectedProducts.find(p => p.product_id === product.id);
            if (exists) {
                return {
                    ...prev,
                    selectedProducts: prev.selectedProducts.filter(p => p.product_id !== product.id)
                };
            } else {
                return {
                    ...prev,
                    selectedProducts: [...prev.selectedProducts, { product_id: product.id, quantity: 1, name: product.name, price: product.price }]
                };
            }
        });
    };

    const updateProductQuantity = (productId: string, quantity: number) => {
        setFormData(prev => ({
            ...prev,
            selectedProducts: prev.selectedProducts.map(p =>
                p.product_id === productId ? { ...p, quantity: Math.max(1, quantity) } : p
            )
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({ ...prev, file }));
            setFilePreview(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-orange-50 border border-orange-100 rounded-xl">
                    <div className="p-2 bg-white rounded-lg border border-orange-100 shadow-sm">
                        <Ticket className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-orange-900">Kampanya Yönetimi</h3>
                                <p className="text-sm text-orange-700/80">
                                    Ürün setleri oluşturun ve özel indirimler tanımlayın.
                                    Kampanyalar aktif olduğunda menülerde görünür.
                                </p>
                            </div>
                            <Button onClick={() => handleOpenDialog()} className="bg-orange-600 hover:bg-orange-700">
                                <Plus className="h-4 w-4 mr-2" />
                                Yeni Kampanya
                            </Button>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {campaigns.map(campaign => {
                            const baseTotal = (campaign.products || []).reduce((acc, p) => acc + ((p.price || 0) * p.quantity), 0);
                            const finalPrice = campaign.discount_type === 'amount'
                                ? Math.max(0, baseTotal - campaign.discount_amount)
                                : baseTotal * (1 - campaign.discount_amount / 100);

                            return (
                                <Card key={campaign.id} className="border-none shadow-premium group hover:ring-2 hover:ring-orange-100 transition-all">
                                    <CardHeader className="p-0 border-b border-slate-50">
                                        <div className="relative h-40 w-full mb-2 overflow-hidden rounded-t-xl bg-slate-100 flex items-center justify-center">
                                            {campaign.image_url ? (
                                                <img src={campaign.image_url} alt={campaign.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <Ticket className="h-12 w-12 text-slate-300" />
                                            )}
                                            <div className="absolute top-2 left-2">
                                                <Badge variant={campaign.is_active ? "default" : "secondary"} className={campaign.is_active ? "bg-emerald-500 hover:bg-emerald-600 shadow-sm" : "shadow-sm"}>
                                                    {campaign.is_active ? 'Aktif' : 'Pasif'}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="px-6 pb-3 space-y-1">
                                            <CardTitle className="text-xl flex justify-between items-center">
                                                {campaign.name}
                                                <div className="flex gap-1">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary" onClick={() => handleOpenDialog(campaign)}>
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500" onClick={() => handleDelete(campaign.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </CardTitle>
                                            <CardDescription className="font-mono text-[10px] uppercase tracking-wider text-orange-600 font-bold">
                                                Kod: {campaign.unique_code}
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-4 space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">İçerik</label>
                                            <div className="space-y-1">
                                                {(campaign.products || []).map(p => (
                                                    <div key={p.product_id} className="text-sm flex justify-between text-slate-600">
                                                        <span>{p.name} <span className="text-slate-400">x{p.quantity}</span></span>
                                                        <span className="font-medium">₺{((p.price || 0) * p.quantity).toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="pt-3 border-t border-dashed border-slate-100 flex justify-between items-end">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Kampanya Fiyatı</span>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-2xl font-black text-orange-600">₺{finalPrice.toFixed(2)}</span>
                                                    {baseTotal > finalPrice && (
                                                        <span className="text-sm text-slate-400 line-through">₺{baseTotal.toFixed(2)}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-right flex flex-col items-end">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">İndirim</span>
                                                <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50 font-bold">
                                                    {campaign.discount_type === 'amount' ? `₺${campaign.discount_amount}` : `%${campaign.discount_amount}`}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}

                        {campaigns.length === 0 && (
                            <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400 bg-white rounded-3xl border-2 border-dashed border-slate-100">
                                <Ticket className="h-12 w-12 mb-4 opacity-20" />
                                <p>Henüz kampanya oluşturulmamış.</p>
                                <Button variant="link" onClick={() => handleOpenDialog()} className="text-orange-600 font-bold">İlk kampanyayı oluştur</Button>
                            </div>
                        )}
                    </div>
                )}

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col p-0">
                        <DialogHeader className="p-6 pb-2">
                            <DialogTitle>{editingCampaign ? 'Kampanyayı Düzenle' : 'Yeni Kampanya Oluştur'}</DialogTitle>
                            <DialogDescription>
                                Kampanya setini ve indirim detaylarını belirleyin.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Kampanya Adı</label>
                                    <Input
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Örn: Eko Menü"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase flex items-center justify-between">
                                        Benzersiz Kod
                                        <Badge variant="outline" className="text-[9px] font-normal py-0 px-1 text-slate-400 border-slate-200">Otomatik</Badge>
                                    </label>
                                    <Input
                                        value={formData.unique_code}
                                        readOnly
                                        className="bg-slate-50 font-mono text-xs cursor-not-allowed"
                                        placeholder="Sistem tarafından oluşturulur"
                                    />
                                    <p className="text-[10px] text-slate-400 italic">Raporlama için sistem tarafından atanır.</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Açıklama</label>
                                <Input
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Kampanya hakkında kısa bilgi"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">İndirim Tipi</label>
                                    <Select value={formData.discount_type} onValueChange={(val: any) => setFormData({ ...formData, discount_type: val })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Tİp Seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="amount">Sabit Tutar (₺)</SelectItem>
                                            <SelectItem value="percent">Yüzde (%)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">İndirim Miktarı</label>
                                    <Input
                                        type="number"
                                        value={formData.discount_amount}
                                        onChange={e => setFormData({ ...formData, discount_amount: Number(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase italic">Kampanya Görseli</label>
                                <div className="flex flex-col gap-3">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="cursor-pointer"
                                    />
                                    {(filePreview || formData.image_url) && (
                                        <div className="relative w-full h-32 rounded-lg border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center">
                                            <img
                                                src={filePreview || formData.image_url}
                                                alt="Preview"
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold text-slate-500 uppercase">Ürün Seçimi</label>
                                <div className="border rounded-xl overflow-hidden flex flex-col h-[300px]">
                                    <div className="grid grid-cols-2 h-full">
                                        {/* Product List */}
                                        <div className="border-r flex flex-col overflow-hidden bg-slate-50/50">
                                            <div className="p-2 border-b">
                                                <Input placeholder="Ürün ara..." className="h-8 text-xs" />
                                            </div>
                                            <ScrollArea className="flex-1">
                                                <div className="p-2 space-y-1">
                                                    {products.map(product => (
                                                        <div
                                                            key={product.id}
                                                            className={cn(
                                                                "flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all",
                                                                formData.selectedProducts.some(p => p.product_id === product.id)
                                                                    ? "bg-orange-100 text-orange-900 border border-orange-200"
                                                                    : "hover:bg-white border border-transparent"
                                                            )}
                                                            onClick={() => toggleProduct(product)}
                                                        >
                                                            <span className="text-sm font-medium">{product.name}</span>
                                                            <span className="text-xs text-slate-400">₺{product.price}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </ScrollArea>
                                        </div>

                                        {/* Selected Items and Quantities */}
                                        <div className="flex flex-col overflow-hidden bg-white">
                                            <div className="p-3 border-b bg-slate-50">
                                                <h4 className="text-xs font-bold text-slate-500 uppercase">Seçilenler</h4>
                                            </div>
                                            <ScrollArea className="flex-1">
                                                <div className="p-2 space-y-2">
                                                    {formData.selectedProducts.length === 0 && (
                                                        <div className="h-full flex items-center justify-center p-8 text-center text-slate-400 text-xs italic">
                                                            Henüz ürün seçilmedi
                                                        </div>
                                                    )}
                                                    {formData.selectedProducts.map(p => (
                                                        <div key={p.product_id} className="p-2 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-xs font-bold truncate max-w-[150px]">{p.name}</span>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-5 w-5 text-red-400"
                                                                    onClick={() => toggleProduct({ id: p.product_id, name: p.name!, price: p.price! })}
                                                                >
                                                                    <Trash2 className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[10px] text-slate-400 font-bold uppercase">Adet:</span>
                                                                <Input
                                                                    type="number"
                                                                    className="h-7 w-20 text-xs"
                                                                    value={p.quantity}
                                                                    onChange={e => updateProductQuantity(p.product_id, Number(e.target.value))}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </ScrollArea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="is_active"
                                    checked={formData.is_active}
                                    onCheckedChange={(val: boolean) => setFormData({ ...formData, is_active: val })}
                                />
                                <label htmlFor="is_active" className="text-sm font-medium leading-none cursor-pointer">
                                    Bu kampanya şu an aktif olsun
                                </label>
                            </div>
                        </div>

                        <DialogFooter className="p-6 pt-2 border-t bg-slate-50/50">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSaving}>İptal</Button>
                            <Button
                                className="bg-orange-600 hover:bg-orange-700 font-bold"
                                onClick={handleSave}
                                disabled={isSaving || !formData.name || !formData.unique_code || formData.selectedProducts.length === 0}
                            >
                                {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                {editingCampaign ? 'Güncelle' : 'Oluştur'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
};
