import { useState, useEffect } from 'react';
import { Plus, Calendar, Edit2, Trash2 } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';

interface RawMaterial {
    id: string;
    name: string;
    unit: string;
    is_intermediate?: boolean;
}

interface StockEntry {
    id: string;
    material_name: string;
    unit: string;
    quantity: number;
    remaining_quantity: number;
    unit_price?: number;
    expiration_date?: string;
    entry_date: string;
    notes?: string;
}

export default function StockEntriesPage() {
    const [materials, setMaterials] = useState<RawMaterial[]>([]);
    const [entries, setEntries] = useState<StockEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingEntry, setEditingEntry] = useState<StockEntry | null>(null);

    const [formData, setFormData] = useState({
        raw_material_id: '',
        quantity: 0,
        unit_price: 0,
        expiration_date: '',
        notes: ''
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                await Promise.all([fetchMaterials(), fetchEntries()]);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const fetchMaterials = async () => {
        try {
            const response = await axios.get('/api/inventory/raw-materials');
            console.log('Materials loaded:', response.data);
            setMaterials(response.data.data);
        } catch (error) {
            console.error('Error fetching materials:', error);
            alert('Hammaddeler yüklenemedi');
            throw error;
        }
    };

    const fetchEntries = async () => {
        try {
            const response = await axios.get('/api/inventory/stock-entries');
            console.log('Entries loaded:', response.data);
            setEntries(response.data.data);
        } catch (error) {
            console.error('Error fetching entries:', error);
            alert('Stok girişleri yüklenemedi');
            throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.raw_material_id || formData.quantity <= 0) {
            alert('Lütfen tüm zorunlu alanları doldurun');
            return;
        }

        try {
            if (editingEntry) {
                await axios.put(`/api/inventory/stock-entries/${editingEntry.id}`, {
                    quantity: formData.quantity,
                    unit_price: formData.unit_price || null,
                    expiration_date: formData.expiration_date || null,
                    notes: formData.notes || null
                });
                alert('Stok girişi güncellendi');
            } else {
                await axios.post('/api/inventory/stock-entries', {
                    ...formData,
                    expiration_date: formData.expiration_date || null
                });
                alert('Stok girişi eklendi');
            }

            setDialogOpen(false);
            resetForm();
            fetchEntries();
        } catch (error) {
            alert('İşlem başarısız');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu stok girişini silmek istediğinizden emin misiniz?')) return;

        try {
            await axios.delete(`/api/inventory/stock-entries/${id}`);
            alert('Stok girişi silindi');
            fetchEntries();
        } catch (error: any) {
            const errorMsg = error.response?.data?.error || 'Silme işlemi başarısız';
            alert(errorMsg);
        }
    };

    const openEditDialog = (entry: StockEntry) => {
        setEditingEntry(entry);
        setFormData({
            raw_material_id: entry.id, // Will be disabled in edit mode
            quantity: entry.quantity,
            unit_price: entry.unit_price || 0,
            expiration_date: entry.expiration_date ? entry.expiration_date.split('T')[0] : '',
            notes: entry.notes || ''
        });
        setDialogOpen(true);
    };

    const resetForm = () => {
        setEditingEntry(null);
        setFormData({
            raw_material_id: '',
            quantity: 0,
            unit_price: 0,
            expiration_date: '',
            notes: ''
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('tr-TR');
    };

    const isExpiringSoon = (expirationDate?: string) => {
        if (!expirationDate) return false;
        const daysUntilExpiration = Math.ceil(
            (new Date(expirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysUntilExpiration <= 7 && daysUntilExpiration >= 0;
    };

    if (loading) {
        return (
            <Layout title="Stok Girişleri" description="Yükleniyor...">
                <div className="flex items-center justify-center h-64">Yükleniyor...</div>
            </Layout>
        );
    }

    return (
        <Layout
            title="Stok Girişleri"
            description="Yeni stok ekleyin ve geçmişi görüntüleyin"
            actions={
                <Button onClick={() => { resetForm(); setDialogOpen(true); }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Stok Girişi
                </Button>
            }
        >
            <Card>
                <CardHeader>
                    <CardTitle>Stok Giriş Geçmişi</CardTitle>
                    <CardDescription>Son eklenen stok girişleri</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {entries.length === 0 ? (
                            <p className="text-center text-slate-500 py-8">Henüz stok girişi yok</p>
                        ) : (
                            entries.map((entry) => (
                                <div
                                    key={entry.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-semibold text-slate-900">{entry.material_name}</h3>
                                            <span className="text-sm text-slate-500">
                                                {entry.quantity} {entry.unit}
                                            </span>
                                            {entry.remaining_quantity < entry.quantity && (
                                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                                    Kalan: {entry.remaining_quantity}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                                            <span>Giriş: {formatDate(entry.entry_date)}</span>
                                            {entry.expiration_date && (
                                                <span className={`flex items-center gap-1 ${isExpiringSoon(entry.expiration_date) ? 'text-orange-600 font-medium' : ''}`}>
                                                    <Calendar className="h-3 w-3" />
                                                    SKT: {formatDate(entry.expiration_date)}
                                                </span>
                                            )}
                                            {entry.unit_price != null && entry.unit_price > 0 && (
                                                <span>Birim Fiyat: ₺{entry.unit_price.toFixed(2)}</span>
                                            )}
                                        </div>
                                        {entry.notes && (
                                            <p className="text-sm text-slate-600 mt-1">{entry.notes}</p>
                                        )}
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => openEditDialog(entry)}
                                        >
                                            <Edit2 className="h-3 w-3 mr-1" />
                                            Düzenle
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-red-600 hover:bg-red-50"
                                            onClick={() => handleDelete(entry.id)}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingEntry ? 'Stok Girişini Düzenle' : 'Yeni Stok Girişi'}</DialogTitle>
                        <DialogDescription>
                            {editingEntry ? 'Stok giriş bilgilerini güncelleyin' : 'Stok giriş bilgilerini girin'}
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="material">Hammadde</Label>
                            {editingEntry ? (
                                <Input
                                    value={editingEntry.material_name}
                                    disabled
                                    className="bg-slate-100"
                                />
                            ) : (
                                <Select
                                    value={formData.raw_material_id}
                                    onValueChange={(value) => setFormData({ ...formData, raw_material_id: value })}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Hammadde seçin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {materials
                                            .filter(m => !m.is_intermediate)
                                            .map((material) => (
                                                <SelectItem key={material.id} value={material.id}>
                                                    {material.name} ({material.unit})
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="quantity">Miktar</Label>
                            <Input
                                id="quantity"
                                type="number"
                                step="0.01"
                                value={formData.quantity}
                                onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) || 0 })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="unit_price">Birim Fiyat (Opsiyonel)</Label>
                            <Input
                                id="unit_price"
                                type="number"
                                step="0.01"
                                value={formData.unit_price}
                                onChange={(e) => setFormData({ ...formData, unit_price: parseFloat(e.target.value) || 0 })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="expiration">Son Kullanma Tarihi (Opsiyonel)</Label>
                            <Input
                                id="expiration"
                                type="date"
                                value={formData.expiration_date}
                                onChange={(e) => setFormData({ ...formData, expiration_date: e.target.value })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="notes">Notlar (Opsiyonel)</Label>
                            <Textarea
                                id="notes"
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                rows={3}
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                İptal
                            </Button>
                            <Button type="submit">
                                {editingEntry ? 'Güncelle' : 'Ekle'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Layout>
    );
}
