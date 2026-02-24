import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Trash2, Plus, Edit2, Loader2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
    id: string;
    name: string;
    type: 'income' | 'expense';
    color: string | null;
    is_default?: boolean;
    default_channel_id?: string | null;
    form_channel_ids?: string[];
    service_commission_rate?: number;
    courier_service_rate?: number;
}
const COLORS = [
    '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#10b981',
    '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef',
    '#f43f5e', '#64748b', '#71717a'
];

export const CategoryManager = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const [formData, setFormData] = useState<{
        name: string;
        type: 'income' | 'expense';
        color: string | null;
        is_default: boolean;
        default_channel_id: string | null;
        form_channel_ids: string[];
        service_commission_rate: number;
        courier_service_rate: number;
    }>({
        name: '',
        type: 'expense',
        color: COLORS[0],
        is_default: false,
        default_channel_id: null,
        form_channel_ids: [],
        service_commission_rate: 0,
        courier_service_rate: 0
    });

    const [channels, setChannels] = useState<any[]>([]);

    const fetchChannels = async () => {
        try {
            const res = await axios.get('/api/channels');
            // Allow ALL channels to be selected as default
            if (res.data && Array.isArray(res.data.data)) {
                setChannels(res.data.data);
            } else {
                setChannels([]);
            }
        } catch (e) {
            console.error("Failed to load channels", e);
            setChannels([]);
        }
    };

    useEffect(() => {
        fetchChannels();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories');
            console.log('Categories response:', response.data);
            setCategories(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleOpenDialog = async (category?: Category) => {
        // Refresh channels list when opening dialog
        await fetchChannels();

        if (category) {
            setEditingCategory(category);
            setFormData({
                name: category.name,
                type: category.type,
                color: category.color || COLORS[0],
                is_default: !!category.is_default,
                default_channel_id: category.default_channel_id || null,
                form_channel_ids: category.form_channel_ids || [],
                service_commission_rate: category.service_commission_rate || 0,
                courier_service_rate: category.courier_service_rate || 0
            });
        } else {
            setEditingCategory(null);
            setFormData({
                name: '',
                type: 'expense',
                color: COLORS[0],
                is_default: false,
                default_channel_id: null,
                form_channel_ids: [],
                service_commission_rate: 0,
                courier_service_rate: 0
            });
        }
        setIsDialogOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name) return;

        setIsSaving(true);
        try {
            if (editingCategory) {
                await axios.put(`/api/categories/${editingCategory.id}`, formData);
            } else {
                await axios.post('/api/categories', formData);
            }
            fetchCategories();
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Error saving category:', error);
            alert('Kategori kaydedilemedi.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) return;
        try {
            await axios.delete(`/api/categories/${id}`);
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Kategori silinemedi.');
        }
    };

    return (
        <Card className="border-none shadow-premium">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle>Gelir/Gider Kategorileri</CardTitle>
                    <CardDescription>Gelir ve gider kategorilerinizi düzenleyin.</CardDescription>
                </div>
                <Button onClick={() => handleOpenDialog()} className="h-9">
                    <Plus className="mr-2 h-4 w-4" /> Yeni Kategori
                </Button>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin text-slate-400" /></div>
                ) : (
                    <div className="space-y-8">
                        {/* Income Categories */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
                                <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                                    <ArrowUpRight className="h-4 w-4" />
                                </div>
                                <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider">Gelir Kategorileri</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {categories.filter(c => c.type === 'income').length > 0 ? (
                                    categories.filter(c => c.type === 'income').map((cat) => (
                                        <div key={cat.id} className="flex items-center justify-between p-3 border border-emerald-100/50 rounded-lg bg-emerald-50/10 hover:bg-emerald-50/30 transition-all group">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-black/5 shadow-sm"
                                                    style={{ backgroundColor: cat.color || '#e2e8f0' }}
                                                >
                                                    <span className="text-xs font-bold text-white opacity-90">{cat.name.substring(0, 1)}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-sm text-slate-700">{cat.name}</span>
                                                        {cat.is_default && (
                                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                                                                Varsayılan
                                                            </span>
                                                        )}
                                                    </div>
                                                    {(cat.form_channel_ids?.length || 0) > 0 && (
                                                        <span className="text-[10px] text-slate-400 font-medium">
                                                            {cat.form_channel_ids?.length} Ödeme Aracı Bağlı
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50" onClick={() => handleOpenDialog(cat)}>
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(cat.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full p-6 text-center border border-dashed border-emerald-200 rounded-xl bg-emerald-50/30 text-emerald-600/60 text-sm">
                                        Henüz gelir kategorisi bulunmuyor.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Expense Categories */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 pb-2 border-b border-rose-100">
                                <div className="p-1.5 bg-rose-50 rounded-lg text-rose-600">
                                    <ArrowDownRight className="h-4 w-4" />
                                </div>
                                <h3 className="text-sm font-bold text-rose-800 uppercase tracking-wider">Gider Kategorileri</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {categories.filter(c => c.type === 'expense' && !c.name?.startsWith('Sistem-')).length > 0 ? (
                                    categories.filter(c => c.type === 'expense' && !c.name?.startsWith('Sistem-')).map((cat) => (
                                        <div key={cat.id} className="flex items-center justify-between p-3 border border-rose-100/50 rounded-lg bg-rose-50/10 hover:bg-rose-50/30 transition-all group">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-black/5 shadow-sm"
                                                    style={{ backgroundColor: cat.color || '#e2e8f0' }}
                                                >
                                                    <span className="text-xs font-bold text-white opacity-90">{cat.name.substring(0, 1)}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-sm text-slate-700">{cat.name}</span>
                                                        {cat.is_default && (
                                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200">
                                                                Varsayılan
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-[10px] text-slate-400 font-medium">Gider Kalemi</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50" onClick={() => handleOpenDialog(cat)}>
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(cat.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full p-6 text-center border border-dashed border-rose-200 rounded-xl bg-rose-50/30 text-rose-600/60 text-sm">
                                        Henüz gider kategorisi bulunmuyor.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingCategory ? 'Kategoriyi Düzenle' : 'Yeni Kategori Ekle'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Kategori Adı</Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Örn: Market Alışverişi"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Tip</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <div
                                        onClick={() => setFormData({ ...formData, type: 'expense' })}
                                        className={cn(
                                            "cursor-pointer p-3 rounded-lg border text-center text-sm font-medium transition-all",
                                            formData.type === 'expense'
                                                ? "bg-rose-50 border-rose-200 text-rose-700 ring-2 ring-rose-500/20"
                                                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                        )}
                                    >
                                        Gider
                                    </div>
                                    <div
                                        onClick={() => setFormData({ ...formData, type: 'income' })}
                                        className={cn(
                                            "cursor-pointer p-3 rounded-lg border text-center text-sm font-medium transition-all",
                                            formData.type === 'income'
                                                ? "bg-emerald-50 border-emerald-200 text-emerald-700 ring-2 ring-emerald-500/20"
                                                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                        )}
                                    >
                                        Gelir
                                    </div>
                                </div>
                            </div>

                            {formData.type === 'income' && (
                                <div className="space-y-4 rounded-xl border p-4 bg-slate-50/50">
                                    <div className="space-y-2">
                                        <Label className="text-base font-medium">Ödeme Araçları</Label>
                                        <p className="text-[12px] text-slate-500">
                                            Bu kategoride kullanılacak ödeme araçlarını seçin.
                                        </p>
                                        <div className="grid grid-cols-2 gap-3 pt-2">
                                            {(channels || []).map(c => {
                                                const isSelected = formData.form_channel_ids.includes(c.id);
                                                const isDefault = formData.default_channel_id === c.id;

                                                return (
                                                    <div
                                                        key={c.id}
                                                        onClick={() => {
                                                            let newIds = [...formData.form_channel_ids];
                                                            if (isSelected) {
                                                                newIds = newIds.filter(id => id !== c.id);
                                                                // If unchecking default, clear default
                                                                if (isDefault) {
                                                                    setFormData(prev => ({ ...prev, form_channel_ids: newIds, default_channel_id: null }));
                                                                } else {
                                                                    setFormData(prev => ({ ...prev, form_channel_ids: newIds }));
                                                                }
                                                            } else {
                                                                newIds.push(c.id);
                                                                // If this is first one selected, make it default automatically? Optional.
                                                                setFormData(prev => ({ ...prev, form_channel_ids: newIds }));
                                                            }
                                                        }}
                                                        className={cn(
                                                            "flex items-center space-x-3 space-y-0 rounded-md border p-3 cursor-pointer transition-all hover:bg-slate-100",
                                                            isSelected ? "border-emerald-500 bg-emerald-50" : "border-slate-200"
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "h-4 w-4 rounded border flex items-center justify-center transition-colors",
                                                            isSelected ? "bg-emerald-500 border-emerald-500" : "border-slate-300"
                                                        )}>
                                                            {isSelected && <ArrowUpRight className="h-3 w-3 text-white" />}
                                                        </div>
                                                        <span className="text-sm font-medium leading-none">
                                                            {c.name}
                                                        </span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {formData.form_channel_ids.length > 0 && (
                                        <div className="space-y-2 pt-2 border-t border-slate-200">
                                            <Label>Varsayılan (Otomatik Seçilecek)</Label>
                                            <select
                                                className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                value={formData.default_channel_id || ''}
                                                onChange={(e) => setFormData({ ...formData, default_channel_id: e.target.value || null })}
                                            >
                                                <option value="">Otomatik Seçim Yok</option>
                                                {(channels || [])
                                                    .filter(c => formData.form_channel_ids.includes(c.id))
                                                    .map(c => (
                                                        <option key={c.id} value={c.id}>{c.name}</option>
                                                    ))}
                                            </select>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                                        <div className="space-y-2">
                                            <Label>Hizmet Komisyon (%)</Label>
                                            <div className="relative">
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    step="0.1"
                                                    value={formData.service_commission_rate}
                                                    onChange={(e) => setFormData({ ...formData, service_commission_rate: parseFloat(e.target.value) || 0 })}
                                                    className="pr-8"
                                                />
                                                <span className="absolute right-3 top-2.5 text-slate-400 text-sm">%</span>
                                            </div>
                                            <p className="text-[10px] text-slate-500">Satıştan düşülecek hizmet komisyonu.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Kurye Hizmet (%)</Label>
                                            <div className="relative">
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    step="0.1"
                                                    value={formData.courier_service_rate}
                                                    onChange={(e) => setFormData({ ...formData, courier_service_rate: parseFloat(e.target.value) || 0 })}
                                                    className="pr-8"
                                                />
                                                <span className="absolute right-3 top-2.5 text-slate-400 text-sm">%</span>
                                            </div>
                                            <p className="text-[10px] text-slate-500">Satıştan düşülecek kurye ücreti.</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label>Renk Etiketi</Label>
                                <div className="flex flex-wrap gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                                    {COLORS.map((c) => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, color: c })}
                                            className={cn(
                                                "w-6 h-6 rounded-full border border-black/5 hover:scale-110 transition-transform",
                                                formData.color === c ? "ring-2 ring-offset-2 ring-slate-900 scale-110 shadow-sm" : ""
                                            )}
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 border rounded-lg bg-slate-50 border-slate-200">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-medium text-slate-700">Varsayılan Kategori Yap</Label>
                                    <p className="text-xs text-slate-500">
                                        Satış gibi işlemlerde öncelikli olarak seçili gelir.
                                    </p>
                                </div>
                                <div
                                    className={cn(
                                        "w-11 h-6 rounded-full transition-colors cursor-pointer relative",
                                        formData.is_default ? "bg-emerald-500" : "bg-slate-300"
                                    )}
                                    onClick={() => setFormData({ ...formData, is_default: !formData.is_default })}
                                >
                                    <div
                                        className={cn(
                                            "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm",
                                            formData.is_default ? "translate-x-5.5 left-0.5" : "translate-x-0.5 left-0"
                                        )}
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button type="submit" disabled={isSaving}>
                                    {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card >
    );
};
