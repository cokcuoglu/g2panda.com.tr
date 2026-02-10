import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Trash2, Plus, Edit2, Loader2, Store, CreditCard, Banknote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface Channel {
    id: string;
    name: string;
    type: 'sales' | 'payment';
    description: string | null;
    commission_rate: string | null;
}

export const ChannelManager = () => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingChannel, setEditingChannel] = useState<Channel | null>(null);

    const [formData, setFormData] = useState<{
        name: string;
        type: 'sales' | 'payment';
        description: string;
        commission_rate: string;
    }>({
        name: '',
        type: 'payment',
        description: '',
        commission_rate: ''
    });

    const fetchChannels = async () => {
        try {
            const response = await axios.get('/api/channels');
            setChannels(response.data.data);
        } catch (error) {
            console.error('Error fetching channels:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchChannels();
    }, []);

    const handleOpenDialog = (channel?: Channel) => {
        if (channel) {
            setEditingChannel(channel);
            setFormData({
                name: channel.name,
                type: channel.type,
                description: channel.description || '',
                commission_rate: channel.commission_rate || ''
            });
        } else {
            setEditingChannel(null);
            setFormData({
                name: '',
                type: 'payment',
                description: '',
                commission_rate: ''
            });
        }
        setIsDialogOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name) return;

        setIsSaving(true);
        try {
            if (editingChannel) {
                await axios.put(`/api/channels/${editingChannel.id}`, formData);
            } else {
                await axios.post('/api/channels', formData);
            }
            fetchChannels();
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Error saving channel:', error);
            alert('Hesap kaydedilemedi.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu hesabı/kanalı silmek istediğinize emin misiniz?')) return;
        try {
            await axios.delete(`/api/channels/${id}`);
            fetchChannels();
        } catch (error) {
            console.error('Error deleting channel:', error);
            alert('Hesap silinemedi.');
        }
    };

    const getIcon = (type: string, name: string) => {
        if (type === 'sales') return <Store className="h-5 w-5 text-indigo-500" />;
        if (name.toLowerCase().includes('nakit')) return <Banknote className="h-5 w-5 text-emerald-500" />;
        return <CreditCard className="h-5 w-5 text-violet-500" />;
    };

    return (
        <Card className="border-none shadow-premium mt-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle>Hesaplar ve Ödeme Araçları</CardTitle>
                    <CardDescription>Ödeme yöntemleri ve satış platformlarını yönetin.</CardDescription>
                </div>
                <Button onClick={() => handleOpenDialog()} className="h-9">
                    <Plus className="mr-2 h-4 w-4" /> Yeni Hesap
                </Button>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin text-slate-400" /></div>
                ) : (
                    <div className="space-y-8">
                        {/* Payment Accounts */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 pb-2 border-b border-violet-100">
                                <div className="p-1.5 bg-violet-50 rounded-lg text-violet-600">
                                    <Banknote className="h-4 w-4" />
                                </div>
                                <h3 className="text-sm font-bold text-violet-800 uppercase tracking-wider">Ödeme Hesapları (Kasa/Banka)</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {channels.filter(c => c.type === 'payment').length > 0 ? (
                                    channels.filter(c => c.type === 'payment').map((ch) => (
                                        <div key={ch.id} className="flex items-center justify-between p-4 border border-violet-100/50 rounded-xl bg-violet-50/10 hover:bg-violet-50/30 transition-all group">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-white rounded-lg border border-violet-100 shadow-sm">
                                                    {getIcon(ch.type, ch.name)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-800">{ch.name}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-violet-100 text-violet-600 border border-violet-200">
                                                            Ödeme Hesabı
                                                        </span>
                                                        {ch.commission_rate && parseFloat(ch.commission_rate) > 0 && (
                                                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 border border-orange-200">
                                                                %{ch.commission_rate} Komisyon
                                                            </span>
                                                        )}
                                                        {ch.description && <span className="text-xs text-slate-400 truncate max-w-[150px]">{ch.description}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-violet-600 hover:bg-violet-50" onClick={() => handleOpenDialog(ch)}>
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(ch.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full p-6 text-center border border-dashed border-violet-200 rounded-xl bg-violet-50/30 text-violet-600/60 text-sm">
                                        Henüz ödeme hesabı bulunmuyor.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sales Channels */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 pb-2 border-b border-indigo-100">
                                <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                                    <Store className="h-4 w-4" />
                                </div>
                                <h3 className="text-sm font-bold text-indigo-800 uppercase tracking-wider">Satış Kanalları (Platformlar)</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {channels.filter(c => c.type === 'sales').length > 0 ? (
                                    channels.filter(c => c.type === 'sales').map((ch) => (
                                        <div key={ch.id} className="flex items-center justify-between p-4 border border-indigo-100/50 rounded-xl bg-indigo-50/10 hover:bg-indigo-50/30 transition-all group">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-white rounded-lg border border-indigo-100 shadow-sm">
                                                    {getIcon(ch.type, ch.name)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-800">{ch.name}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600 border border-indigo-200">
                                                            Satış Kanalı
                                                        </span>
                                                        {ch.commission_rate && parseFloat(ch.commission_rate) > 0 && (
                                                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 border border-orange-200">
                                                                %{ch.commission_rate} Komisyon
                                                            </span>
                                                        )}
                                                        {ch.description && <span className="text-xs text-slate-400 truncate max-w-[150px]">{ch.description}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50" onClick={() => handleOpenDialog(ch)}>
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(ch.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full p-6 text-center border border-dashed border-indigo-200 rounded-xl bg-indigo-50/30 text-indigo-600/60 text-sm">
                                        Henüz satış kanalı bulunmuyor.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingChannel ? 'Hesabı Düzenle' : 'Yeni Hesap Ekle'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSave} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Hesap Adı</Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Örn: Kasa Nakit, Garanti Bankası"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Hesap Tipi</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <div
                                        onClick={() => setFormData({ ...formData, type: 'payment' })}
                                        className={cn(
                                            "cursor-pointer p-3 rounded-lg border text-center text-sm font-medium transition-all",
                                            formData.type === 'payment'
                                                ? "bg-violet-50 border-violet-200 text-violet-700 ring-2 ring-violet-500/20"
                                                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                        )}
                                    >
                                        Ödeme Hesabı (Kasa/Banka)
                                    </div>
                                    <div
                                        onClick={() => setFormData({ ...formData, type: 'sales' })}
                                        className={cn(
                                            "cursor-pointer p-3 rounded-lg border text-center text-sm font-medium transition-all",
                                            formData.type === 'sales'
                                                ? "bg-indigo-50 border-indigo-200 text-indigo-700 ring-2 ring-indigo-500/20"
                                                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                        )}
                                    >
                                        Satış Kanalı (Platform)
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Komisyon Oranı (%)</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.commission_rate}
                                    onChange={(e) => setFormData({ ...formData, commission_rate: e.target.value })}
                                    placeholder="0.00"
                                />
                                <p className="text-[10px] text-slate-400">Bu ödeme aracı/kanalı kullanıldığında kesilecek komisyon.</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Açıklama (Opsiyonel)</Label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="IBAN veya ek bilgiler..."
                                />
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
        </Card>
    );
};
