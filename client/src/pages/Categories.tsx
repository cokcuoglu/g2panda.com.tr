import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus, Pencil, Trash2, ShieldAlert, Tag, Check, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
    id: string;
    name: string;
    type: 'income' | 'expense';
    expense_type?: 'operational' | 'fixed' | 'personal' | null;
    color: string;
    is_active: boolean;
    is_default: boolean;
}

const DEFAULT_COLORS = [
    '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981',
    '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef',
    '#f43f5e', '#64748b'
];

export default function Categories() {
    const { hasPermission } = useAuth();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<string>("expense");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        color: '#64748b',
        type: 'expense' as 'income' | 'expense',
        expense_type: null as 'operational' | 'fixed' | 'personal' | null,
        is_active: true
    });

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/categories');
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            // Mock data for MVP demonstration
            setCategories([
                { id: '1', name: 'Satış Geliri', type: 'income', color: '#10b981', is_active: true, is_default: true },
                { id: '2', name: 'Hizmet Geliri', type: 'income', color: '#3b82f6', is_active: true, is_default: false },
                { id: '3', name: 'Kira İşleri', type: 'expense', color: '#ef4444', is_active: true, is_default: true },
                { id: '4', name: 'Faturalar', type: 'expense', color: '#f59e0b', is_active: true, is_default: true },
                { id: '5', name: 'Personel Gideri', type: 'expense', color: '#6366f1', is_active: true, is_default: false },
                { id: '6', name: 'Stok Alımı', type: 'expense', color: '#8b5cf6', is_active: false, is_default: false },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasPermission('categories.read')) {
            fetchCategories();
        }
    }, [hasPermission]);

    const handleOpenModal = (category?: Category) => {
        if (category) {
            setEditingCategory(category);
            setFormData({
                name: category.name,
                color: category.color,
                type: category.type,
                expense_type: category.expense_type || null,
                is_active: category.is_active
            });
        } else {
            setEditingCategory(null);
            setFormData({
                name: '',
                color: '#64748b',
                type: activeTab as 'income' | 'expense',
                expense_type: null,
                is_active: true
            });
        }
        setIsModalOpen(true);
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSave = async () => {
        if (!formData.name.trim()) return;

        setIsSubmitting(true);
        try {
            const payload = { ...formData, name: formData.name.trim() };
            if (editingCategory) {
                await axios.put(`/api/categories/${editingCategory.id}`, payload);
            } else {
                await axios.post('/api/categories', payload);
            }
            await fetchCategories();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving category:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string, isDefault: boolean) => {
        if (isDefault || isSubmitting) return;
        if (!confirm("Bu kategoriyi silmek istediğinizden emin misiniz?")) return;

        setIsSubmitting(true);
        try {
            await axios.delete(`/api/categories/${id}`);
            await fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleToggleStatus = async (category: Category) => {
        const originalStatus = category.is_active;
        setCategories(prev => prev.map(c => c.id === category.id ? { ...c, is_active: !c.is_active } : c));

        try {
            await axios.put(`/api/categories/${category.id}`, { ...category, is_active: !category.is_active });
        } catch (error) {
            console.error('Error toggling status:', error);
            setCategories(prev => prev.map(c => c.id === category.id ? { ...c, is_active: originalStatus } : c));
        }
    }

    if (!hasPermission('categories.read')) {
        return (
            <Layout title="Gelir/Gider Kategorileri" description="İşlem kategorilerini yönetin">
                <Card className="border-none shadow-premium bg-red-50/50 backdrop-blur-sm">
                    <CardContent className="flex flex-col items-center justify-center p-16 text-center text-red-800">
                        <div className="p-4 bg-red-100 rounded-full mb-6">
                            <ShieldAlert className="h-12 w-12 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold">Erişim Engellendi</h3>
                        <p className="text-sm mt-3 text-red-600/80">Kategorileri görüntülemek için yetkiniz bulunmuyor.</p>
                    </CardContent>
                </Card>
            </Layout>
        );
    }

    const filteredCategories = categories.filter(c => c.type === activeTab);

    return (
        <Layout
            title="Gelir/Gider Kategorileri"
            description="Gelir ve giderlerinizi sınıflandırmak için kategorileri kullanın"
            actions={
                hasPermission('categories.write') && (
                    <Button
                        onClick={() => handleOpenModal()}
                        className="gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
                    >
                        <Plus className="h-4 w-4" />
                        Yeni Kategori Ekle
                    </Button>
                )
            }
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Tabs defaultValue="expense" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8 max-w-[400px] bg-slate-100/50 p-1 rounded-xl">
                        <TabsTrigger value="expense" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Gider Kategorileri</TabsTrigger>
                        <TabsTrigger value="income" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Gelir Kategorileri</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="mt-0 outline-none">
                        <Card className="border-none shadow-premium overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "p-2 rounded-lg",
                                        activeTab === 'expense' ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                                    )}>
                                        <Tag className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg capitalize">
                                            {activeTab === 'expense' ? 'Gider' : 'Gelir'} Listesi
                                        </CardTitle>
                                        <CardDescription>
                                            {activeTab === 'expense' ? 'Harcamalarınızı' : 'Kazançlarınızı'} nasıl sınıflandırdığınızı belirleyin
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader className="bg-slate-50/50">
                                            <TableRow className="hover:bg-transparent border-none">
                                                <TableHead className="w-[80px] font-bold text-slate-500 py-4 pl-6 h-auto">Renk</TableHead>
                                                <TableHead className="font-bold text-slate-500 py-4 h-auto">Kategori Adı</TableHead>
                                                <TableHead className="font-bold text-slate-500 py-4 h-auto">Durum</TableHead>
                                                <TableHead className="text-right font-bold text-slate-500 py-4 pr-6 h-auto">İşlemler</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredCategories.length === 0 && !loading ? (
                                                <TableRow>
                                                    <TableCell colSpan={4} className="text-center py-16 text-slate-400 italic">
                                                        Kategori bulunamadı.
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                filteredCategories.map((category) => (
                                                    <TableRow key={category.id} className={cn(
                                                        "border-slate-50 hover:bg-slate-50/50 transition-colors",
                                                        !category.is_active && "opacity-60 grayscale-[0.5]"
                                                    )}>
                                                        <TableCell className="py-4 pl-6">
                                                            <div
                                                                className="w-8 h-8 rounded-xl border shadow-sm transition-transform hover:scale-110"
                                                                style={{ backgroundColor: category.color }}
                                                            />
                                                        </TableCell>
                                                        <TableCell className="py-4 font-semibold text-slate-700">
                                                            {category.name}
                                                            {category.is_default && (
                                                                <Badge variant="secondary" className="ml-2 text-[9px] h-4 uppercase tracking-tighter bg-slate-100 text-slate-500 border-none">Sistem</Badge>
                                                            )}
                                                            {category.expense_type && (
                                                                <Badge variant="outline" className="ml-2 text-[9px] h-4 uppercase tracking-tighter text-blue-600 border-blue-100 bg-blue-50">
                                                                    {category.expense_type === 'operational' ? 'Sürekli' :
                                                                        category.expense_type === 'fixed' ? 'Sabit' : 'Özel'}
                                                                </Badge>
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="py-4">
                                                            {hasPermission('categories.write') ? (
                                                                <div className="flex items-center space-x-2">
                                                                    <Switch
                                                                        checked={category.is_active}
                                                                        onCheckedChange={() => handleToggleStatus(category)}
                                                                        className="data-[state=checked]:bg-primary"
                                                                    />
                                                                    <span className={cn(
                                                                        "text-xs font-bold uppercase tracking-wider",
                                                                        category.is_active ? "text-emerald-600" : "text-slate-400"
                                                                    )}>
                                                                        {category.is_active ? 'Aktif' : 'Pasif'}
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <Badge variant={category.is_active ? 'default' : 'outline'} className="rounded-lg">
                                                                    {category.is_active ? 'Aktif' : 'Pasif'}
                                                                </Badge>
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="py-4 pr-6 text-right">
                                                            <div className="flex items-center justify-end gap-1">
                                                                {hasPermission('categories.write') && (
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                                        onClick={() => handleOpenModal(category)}
                                                                    >
                                                                        <Pencil className="h-4 w-4" />
                                                                    </Button>
                                                                )}

                                                                {hasPermission('categories.delete') && (
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-8 w-8 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                                                                        disabled={category.is_default}
                                                                        onClick={() => handleDelete(category.id, category.is_default)}
                                                                        title={category.is_default ? "Sistem kategorileri silinemez" : "Kategoriyi sil"}
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Create/Edit Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-md border-none shadow-2xl rounded-2xl p-0 overflow-hidden">
                    <DialogHeader className="p-6 bg-slate-50/80 border-b border-slate-100">
                        <DialogTitle className="text-xl font-bold flex items-center gap-2">
                            <div className="p-1.5 bg-primary/10 rounded-lg">
                                <Tag className="h-5 w-5 text-primary" />
                            </div>
                            {editingCategory ? 'Kategoriyi Düzenle' : 'Yeni Kategori'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingCategory ? 'Mevcut kategori bilgilerini güncelleyin.' : 'İşlemlerinizi sınıflandırmak için yeni bir kategori oluşturun.'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Kategori Adı</label>
                            <Input
                                placeholder="Örn: Market Giderleri"
                                value={formData.name}
                                className="h-11 border-slate-200 focus:ring-primary/10 transition-all font-medium"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        {formData.type === 'expense' && (
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Gider Türü</label>
                                <Select
                                    value={formData.expense_type || ''}
                                    onValueChange={(val) => setFormData({ ...formData, expense_type: val as any })}
                                >
                                    <SelectTrigger className="h-11">
                                        <SelectValue placeholder="Gider Türü Seçin (İsteğe Bağlı)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="operational">Sürekli Gider (Malzeme/Stok)</SelectItem>
                                        <SelectItem value="fixed">Sabit Gider (Kira/Fatura)</SelectItem>
                                        <SelectItem value="personal">Özel Harcama</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-[10px] text-slate-400">Bu kategoriyi belirli bir gider türüne kısıtlar.</p>
                            </div>
                        )}

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Palette className="h-3 w-3" />
                                Renk Belirleyin
                            </label>
                            <div className="grid grid-cols-6 gap-3">
                                {DEFAULT_COLORS.map(color => (
                                    <button
                                        key={color}
                                        type="button"
                                        className={cn(
                                            "aspect-square rounded-xl border-2 transition-all flex items-center justify-center group relative overflow-hidden",
                                            formData.color === color ? 'border-primary ring-4 ring-primary/10' : 'border-transparent hover:scale-110 shadow-sm'
                                        )}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setFormData({ ...formData, color })}
                                    >
                                        {formData.color === color && (
                                            <Check className="h-4 w-4 text-white drop-shadow-md animate-in zoom-in duration-300" />
                                        )}
                                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="space-y-0.5">
                                <label className="text-sm font-bold text-slate-700">Aktif Durum</label>
                                <p className="text-xs text-slate-500">Kategori işlemlerde seçilebilir olur</p>
                            </div>
                            <Switch
                                checked={formData.is_active}
                                onCheckedChange={(checked: boolean) => setFormData({ ...formData, is_active: checked })}
                                className="data-[state=checked]:bg-emerald-500"
                            />
                        </div>
                    </div>

                    <DialogFooter className="p-6 bg-slate-50/30 border-t border-slate-100 flex-col sm:flex-row gap-2">
                        <Button
                            variant="ghost"
                            onClick={() => setIsModalOpen(false)}
                            className="w-full sm:w-auto font-semibold text-slate-500 hover:bg-slate-100"
                        >
                            Vazgeç
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={!formData.name || isSubmitting}
                            className="w-full sm:w-auto min-w-[120px] font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
                        >
                            {isSubmitting ? 'Kaydediliyor...' : (editingCategory ? 'Değişiklikleri Kaydet' : 'Kategori Oluştur')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Layout >
    );
}
