import { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Search, Plus, Pencil, Trash2, Loader2, Phone } from 'lucide-react';
import { CITIES } from '@/data/tr_cities';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function CustomersPage() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        neighborhood: '',
        notes: ''
    });

    useEffect(() => {
        fetchCustomers();
    }, [search]); // Debounce would be better for real app

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/customers`, {
                params: { search }
            });
            setCustomers(res.data.data);
        } catch (error) {
            console.error("Failed to fetch customers", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (customer?: any) => {
        if (customer) {
            setEditingId(customer.id);
            setFormData({
                name: customer.name,
                phone: customer.phone || '',
                address: customer.address || '',
                city: customer.city || '',
                district: customer.district || '',
                neighborhood: customer.neighborhood || '',
                notes: customer.notes || ''
            });
        } else {
            setEditingId(null);
            setFormData({ name: '', phone: '', address: '', city: '', district: '', neighborhood: '', notes: '' });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingId) {
                await axios.put(`/api/customers/${editingId}`, formData);
                alert("Müşteri güncellendi.");
            } else {
                await axios.post('/api/customers', formData);
                alert("Yeni müşteri eklendi.");
            }
            setIsDialogOpen(false);
            fetchCustomers();
        } catch (error: any) {
            console.error("Operation failed", error);
            alert(error.response?.data?.error || "İşlem başarısız.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu müşteriyi silmek istediğinize emin misiniz?")) return;
        try {
            await axios.delete(`/api/customers/${id}`);
            alert("Müşteri silindi.");
            fetchCustomers();
        } catch (error) {
            console.error("Delete failed", error);
            alert("Silme işlemi başarısız.");
        }
    };

    return (
        <Layout title="Müşteriler" description="Müşteri rehberi ve yönetimi">
            <div className="space-y-4">
                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="İsim veya telefon ara..."
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button onClick={() => handleOpenDialog()} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="mr-2 h-4 w-4" /> Yeni Müşteri
                    </Button>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead>Müşteri Adı</TableHead>
                                <TableHead>Telefon</TableHead>
                                <TableHead>Adres</TableHead>
                                <TableHead>Notlar</TableHead>
                                <TableHead className="text-right">İşlemler</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        <Loader2 className="mx-auto h-6 w-6 animate-spin text-slate-400" />
                                    </TableCell>
                                </TableRow>
                            ) : customers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                                        Kayıtlı müşteri bulunamadı.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                customers.map((customer) => (
                                    <TableRow key={customer.id} className="hover:bg-slate-50">
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                                                    {customer.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                {customer.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {customer.phone && (
                                                <div className="flex items-center gap-1 text-slate-600">
                                                    <Phone size={14} />
                                                    {customer.phone}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="max-w-[200px] truncate" title={`${customer.neighborhood ? customer.neighborhood + ' Mah. ' : ''}${customer.address} ${customer.district ? customer.district + '/' : ''}${customer.city}`}>
                                            {(customer.address || customer.city) && (
                                                <div className="flex flex-col text-xs text-slate-600">
                                                    <span className="truncate">
                                                        {customer.neighborhood && <span className="font-medium">{customer.neighborhood} Mah. </span>}
                                                        {customer.address}
                                                    </span>
                                                    {(customer.city || customer.district) && (
                                                        <span className="text-slate-400">
                                                            {customer.district && `${customer.district} / `}{customer.city}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="max-w-[150px] truncate text-slate-500">
                                            {customer.notes}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(customer)}>
                                                <Pencil className="h-4 w-4 text-slate-500" />
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => handleDelete(customer.id)}>
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingId ? 'Müşteriyi Düzenle' : 'Yeni Müşteri Ekle'}</DialogTitle>
                        <DialogDescription>
                            Müşteri bilgilerini aşağıdan yönetebilirsiniz.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="c-name">Ad Soyad *</Label>
                            <Input
                                id="c-name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="c-phone">Telefon Numarası</Label>
                            <Input
                                id="c-phone"
                                value={formData.phone}
                                onChange={(e) => {
                                    // Allow only digits, max 10 chars
                                    const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                                    setFormData({ ...formData, phone: val });
                                }}
                                placeholder="5301234567"
                            />
                        </div>
                        {/* Address Fields */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                                <Label htmlFor="c-city">İl</Label>
                                <Select
                                    value={formData.city}
                                    onValueChange={(val) => setFormData(prev => ({ ...prev, city: val, district: '' }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seçiniz" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CITIES.map(city => (
                                            <SelectItem key={city.name} value={city.name}>{city.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="c-district">İlçe</Label>
                                <Select
                                    value={formData.district}
                                    onValueChange={(val) => setFormData(prev => ({ ...prev, district: val }))}
                                    disabled={!formData.city}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seçiniz" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {formData.city && CITIES.find(c => c.name === formData.city)?.districts.map(dist => (
                                            <SelectItem key={dist} value={dist}>{dist}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="c-neighborhood">Mahalle</Label>
                            <Input
                                id="c-neighborhood"
                                value={formData.neighborhood}
                                onChange={(e) => setFormData(prev => ({ ...prev, neighborhood: e.target.value }))}
                                placeholder="Mahalle adı..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="c-address">Adres Detayı</Label>
                            <Textarea
                                id="c-address"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                placeholder="Sokak, kapı no, daire vb."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="c-notes">Notlar</Label>
                            <Textarea
                                id="c-notes"
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Müşteri hakkında özel notlar..."
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>İptal</Button>
                            <Button type="submit" disabled={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700">
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Kaydet
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Layout>
    );
}
