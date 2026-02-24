import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import axios from 'axios';

interface RawMaterial {
    id: string;
    name: string;
    unit: string;
    critical_stock_level: number;
    min_stock_level: number;
    current_stock: number;
    is_active: boolean;
}

export default function RawMaterialsPage() {
    const [materials, setMaterials] = useState<RawMaterial[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState<RawMaterial | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        unit: 'adet',
        critical_stock_level: 0,
        min_stock_level: 0
    });

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const response = await axios.get('/api/inventory/raw-materials');
            const pureRawMaterials = response.data.data.filter((m: any) => m.is_intermediate !== true);
            setMaterials(pureRawMaterials);
        } catch (error) {
            alert('Hammaddeler yüklenemedi');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingMaterial) {
                await axios.put(`/api/inventory/raw-materials/${editingMaterial.id}`, formData);
                alert('Hammadde güncellendi');
            } else {
                await axios.post('/api/inventory/raw-materials', formData);
                alert('Hammadde eklendi');
            }

            setDialogOpen(false);
            resetForm();
            fetchMaterials();
        } catch (error) {
            alert('İşlem başarısız');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu hammaddeyi silmek istediğinizden emin misiniz?')) return;

        try {
            await axios.delete(`/api/inventory/raw-materials/${id}`);
            alert('Hammadde silindi');
            fetchMaterials();
        } catch (error) {
            alert('Silme işlemi başarısız');
        }
    };

    const openEditDialog = (material: RawMaterial) => {
        setEditingMaterial(material);
        setFormData({
            name: material.name,
            unit: material.unit,
            critical_stock_level: material.critical_stock_level,
            min_stock_level: material.min_stock_level
        });
        setDialogOpen(true);
    };

    const resetForm = () => {
        setEditingMaterial(null);
        setFormData({
            name: '',
            unit: 'adet',
            critical_stock_level: 0,
            min_stock_level: 0
        });
    };

    const getStockStatus = (material: RawMaterial) => {
        if (material.current_stock < material.critical_stock_level) {
            return { color: 'text-red-600 bg-red-50', label: 'Kritik' };
        }
        if (material.current_stock < material.min_stock_level) {
            return { color: 'text-yellow-600 bg-yellow-50', label: 'Düşük' };
        }
        return { color: 'text-green-600 bg-green-50', label: 'Normal' };
    };

    if (loading) {
        return (
            <Layout title="Hammaddeler" description="Yükleniyor...">
                <div className="flex items-center justify-center h-64">Yükleniyor...</div>
            </Layout>
        );
    }

    return (
        <Layout
            title="Hammaddeler"
            description="Stok yönetimi için hammadde tanımları"
            actions={
                <Button onClick={() => { resetForm(); setDialogOpen(true); }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Hammadde
                </Button>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {materials.map((material) => {
                    const status = getStockStatus(material);
                    return (
                        <Card key={material.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg">{material.name}</CardTitle>
                                        <CardDescription className="mt-1">
                                            Birim: {material.unit}
                                        </CardDescription>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                        {status.label}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <p className="text-slate-500">Mevcut Stok</p>
                                        <p className="font-semibold text-lg">{material.current_stock}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500">Kritik Seviye</p>
                                        <p className="font-semibold">{material.critical_stock_level}</p>
                                    </div>
                                </div>

                                {material.current_stock < material.critical_stock_level && (
                                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-2 rounded">
                                        <AlertTriangle className="h-4 w-4" />
                                        <span>Stok kritik seviyede!</span>
                                    </div>
                                )}

                                <div className="flex gap-2 pt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => openEditDialog(material)}
                                    >
                                        <Edit2 className="h-3 w-3 mr-1" />
                                        Düzenle
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600 hover:bg-red-50"
                                        onClick={() => handleDelete(material.id)}
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingMaterial ? 'Hammadde Düzenle' : 'Yeni Hammadde'}
                        </DialogTitle>
                        <DialogDescription>
                            Hammadde bilgilerini girin
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Hammadde Adı</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="unit">Birim</Label>
                            <Select
                                value={formData.unit}
                                onValueChange={(value) => setFormData({ ...formData, unit: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="adet">Adet</SelectItem>
                                    <SelectItem value="kilo">Kilo</SelectItem>
                                    <SelectItem value="gram">Gram</SelectItem>
                                    <SelectItem value="litre">Litre</SelectItem>
                                    <SelectItem value="ml">ML</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="critical">Kritik Stok Seviyesi</Label>
                            <Input
                                id="critical"
                                type="number"
                                step="0.01"
                                value={formData.critical_stock_level}
                                onChange={(e) => setFormData({ ...formData, critical_stock_level: parseFloat(e.target.value) })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="min">Minimum Stok Seviyesi</Label>
                            <Input
                                id="min"
                                type="number"
                                step="0.01"
                                value={formData.min_stock_level}
                                onChange={(e) => setFormData({ ...formData, min_stock_level: parseFloat(e.target.value) })}
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                İptal
                            </Button>
                            <Button type="submit">
                                {editingMaterial ? 'Güncelle' : 'Ekle'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Layout>
    );
}
