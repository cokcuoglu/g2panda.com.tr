import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ChevronRight, ChevronDown, Plus, Edit2, Trash2, Folder, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

interface Category {
    id: string;
    name: string;
    level: number;
    sort_order: number;
    is_active: boolean;
    children: Category[];
}

interface CategoryTreeProps {
    onSelectCategory: (category: Category) => void;
    selectedCategoryId: string | null;
}

export const CategoryTree = ({ onSelectCategory, selectedCategoryId }: CategoryTreeProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [parentForNew, setParentForNew] = useState<Category | null>(null);
    const [formData, setFormData] = useState({ name: '', sort_order: 0 });

    const fetchCategories = async () => {
        try {
            const res = await axios.get('/api/menu-categories');
            if (res.data.success) {
                // Recursive sort function
                const sortCats = (cats: Category[]): Category[] => {
                    return cats.sort((a, b) => {
                        if (a.sort_order !== b.sort_order) {
                            return a.sort_order - b.sort_order;
                        }
                        return a.name.localeCompare(b.name);
                    }).map(cat => ({
                        ...cat,
                        children: cat.children ? sortCats(cat.children) : []
                    }));
                };
                setCategories(sortCats(res.data.data));
            }
        } catch (error) {
            console.error('Error fetching menu:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const toggleExpand = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleAdd = (parent: Category | null, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (parent && parent.level >= 5) {
            alert('Maksimum kategori derinliğine (5) ulaşıldı.');
            return;
        }
        setEditingCategory(null);
        setParentForNew(parent);
        setFormData({ name: '', sort_order: 0 });
        setIsDialogOpen(true);
    };

    const handleEdit = (category: Category, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingCategory(category);
        setFormData({ name: category.name, sort_order: category.sort_order });
        setIsDialogOpen(true);
    };

    const handleDelete = async (category: Category, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm(`${category.name} kategorisini silmek istediğinizden emin misiniz?`)) return;

        try {
            await axios.delete(`/api/menu-categories/${category.id}`);
            fetchCategories();
            if (selectedCategoryId === category.id) {
                // If deleted category was selected, deselect it? 
                // Parent component handles selection state, maybe we should callback?
                // For now, let's just refresh tree.
            }
        } catch (error: any) {
            alert(error.response?.data?.error || 'Silinemedi');
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await axios.put(`/api/menu-categories/${editingCategory.id}`, {
                    name: formData.name,
                    sort_order: formData.sort_order
                });
            } else {
                await axios.post('/api/menu-categories', {
                    name: formData.name,
                    parent_id: parentForNew ? parentForNew.id : null,
                    sort_order: formData.sort_order
                });

                // If adding to a collapsed parent, auto-expand it
                if (parentForNew) {
                    setExpanded(prev => ({ ...prev, [parentForNew.id]: true }));
                }
            }
            fetchCategories();
            setIsDialogOpen(false);
        } catch (error: any) {
            if (!error.response) {
                alert('Sunucuya ulaşılamıyor. Lütfen backend servisini kontrol edin.');
            } else {
                alert(error.response?.data?.error || 'Kaydedilemedi');
            }
        }
    };

    const renderNode = (category: Category) => {
        const isExpanded = expanded[category.id];
        const hasChildren = category.children && category.children.length > 0;
        const isSelected = selectedCategoryId === category.id;

        return (
            <div key={category.id} className="select-none">
                <div
                    className={cn(
                        "flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors group",
                        isSelected ? "bg-primary/10 text-primary" : "hover:bg-slate-100 text-slate-700"
                    )}
                    onClick={() => onSelectCategory(category)}
                    style={{ paddingLeft: `${(category.level - 1) * 12 + 8}px` }}
                >
                    <div
                        className={cn("p-1 rounded-md hover:bg-slate-200/50", hasChildren ? "visible" : "invisible")}
                        onClick={(e) => toggleExpand(category.id, e)}
                    >
                        {isExpanded ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
                    </div>

                    {hasChildren && isExpanded ? (
                        <FolderOpen className={cn("h-4 w-4", isSelected ? "text-primary" : "text-amber-400")} />
                    ) : (
                        <Folder className={cn("h-4 w-4", isSelected ? "text-primary" : "text-amber-400")} />
                    )}

                    <span className="flex-1 text-sm font-medium truncate">{category.name}</span>

                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {category.level < 5 && (
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => handleAdd(category, e)} title="Alt Kategori Ekle">
                                <Plus className="h-3 w-3" />
                            </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => handleEdit(category, e)}>
                            <Edit2 className="h-3 w-3" />
                        </Button>
                        {!hasChildren && (
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={(e) => handleDelete(category, e)}>
                                <Trash2 className="h-3 w-3" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Children */}
                {isExpanded && hasChildren && (
                    <div className="border-l border-slate-100 ml-[15px]">
                        {category.children.map(renderNode)}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="font-semibold text-slate-700">Kategoriler</h3>
                <Button size="sm" variant="outline" className="h-8 gap-1" onClick={(e) => handleAdd(null, e)}>
                    <Plus className="h-3 w-3" /> Yeni Ekle
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-1">
                {categories.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-sm">
                        Henüz kategori yok. <br />"Yeni Ekle" ile başlayın.
                    </div>
                ) : (
                    categories.map(renderNode)
                )}
            </div>

            {/* Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingCategory ? 'Kategoriyi Düzenle' : (parentForNew ? `"${parentForNew.name}" Altına Ekle` : 'Yeni Ana Kategori')}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSave} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Kategori Adı</Label>
                            <Input
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Örn: İçecekler"
                                autoFocus
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Sıralama (Opsiyonel)</Label>
                            <Input
                                type="number"
                                value={formData.sort_order}
                                onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Kaydet</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
