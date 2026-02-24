import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Save,
    CheckCircle,
    AlertCircle,
    Trash2,
    User,
    Building2,
    Settings2,
    ShieldAlert,
    Loader2,
    Database,
    Utensils,
    QrCode,
    ExternalLink,
    LayoutGrid as LayoutIcon,
} from 'lucide-react';
import QRCode from 'react-qr-code';
import { cn } from '@/lib/utils';
import { Tag } from 'lucide-react';
import { CategoryManager } from '@/components/settings/CategoryManager';
import { ChannelManager } from '@/components/settings/ChannelManager';
import { MenuManager } from '@/components/menu/MenuManager';
import { CampaignManager } from '@/components/campaigns/CampaignManager';
import { TableLayoutDesigner } from '@/components/settings/TableLayoutDesigner';

interface UserSettings {
    full_name: string;
    email: string;
    role: string;
    business_name: string;
    business_logo_url?: string;
    business_type: string;
    currency: string;
    locale: string;
    auto_open_time: string;
    auto_close_time: string;
}

import { useParams, useNavigate } from 'react-router-dom';



export default function Settings() {
    const { user, logout, hasPermission } = useAuth();
    const { tab } = useParams<{ tab?: string }>();
    const navigate = useNavigate();

    // Default to 'profile' if no tab provided
    const activeTab = tab || 'profile';

    const handleTabChange = (val: string) => {
        navigate(`/settings/${val}`);
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const [formData, setFormData] = useState<UserSettings>({
        full_name: '',
        email: '',
        role: '',
        business_name: '',
        business_logo_url: '',
        business_type: '',
        currency: 'TRY',
        locale: 'tr-TR',
        auto_open_time: '',
        auto_close_time: ''
    });

    const [originalData, setOriginalData] = useState<UserSettings | null>(null);

    const fetchSettings = async () => {
        try {
            const response = await axios.get('/api/users/me');
            const data: UserSettings = response.data.data || {};

            const settings: UserSettings = {
                full_name: data.full_name || 'Kullanıcı',
                email: data.email || user?.email || '',
                role: data.role || user?.role || '',
                business_name: data.business_name || 'İşletmem',
                business_logo_url: data.business_logo_url || '',
                business_type: data.business_type || 'Perakende',
                currency: data.currency || 'TRY',
                locale: data.locale || 'tr-TR',
                auto_open_time: data.auto_open_time || '',
                auto_close_time: data.auto_close_time || ''
            };

            setFormData(settings);
            setOriginalData(settings);
        } catch (error) {
            console.error('Error fetching settings:', error);
            const fallbackSettings: UserSettings = {
                full_name: 'Kullanıcı',
                email: user?.email || '',
                role: user?.role || '',
                business_name: 'İşletmem',
                business_logo_url: '',
                business_type: 'Perakende',
                currency: 'TRY',
                locale: 'tr-TR',
                auto_open_time: '',
                auto_close_time: ''
            };
            setFormData(fallbackSettings);
            setOriginalData(fallbackSettings);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, [user]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setIsUploading(true);

        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const res = await axios.post('/api/upload', uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.data.success) {
                setFormData(prev => ({ ...prev, business_logo_url: res.data.data.url }));
                setMessage({ type: 'success', text: 'Logo yüklendi. Kaydetmeyi unutmayın.' });
            }
        } catch (error: any) {
            console.error('Upload failed:', error);
            setMessage({ type: 'error', text: 'Logo yüklenemedi.' });
        } finally {
            setIsUploading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!hasPermission('settings.write')) return;

        setIsSubmitting(true);
        setMessage(null);

        const previousData = { ...formData };

        try {
            setOriginalData(formData);
            await axios.put('/api/users/me', {
                full_name: formData.full_name.trim(),
                business_name: formData.business_name.trim(),
                business_logo_url: formData.business_logo_url,
                business_type: formData.business_type.trim(),
                currency: formData.currency,
                locale: formData.locale,
                auto_open_time: formData.auto_open_time || null,
                auto_close_time: formData.auto_close_time || null
            });

            setMessage({ type: 'success', text: 'Ayarlar başarıyla kaydedildi' });
            setTimeout(() => setMessage(null), 4000);
        } catch (error: any) {
            console.error('Error saving settings:', error);
            setFormData(previousData);
            setOriginalData(previousData);
            setMessage({
                type: 'error',
                text: error.response?.data?.error || 'Ayarlar kaydedilemedi'
            });
            setTimeout(() => setMessage(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isDirty = JSON.stringify(formData) !== JSON.stringify(originalData);

    return (
        <Layout title="Ayarlar" description="Profilinizi ve işletme tercihlerinizi yönetin">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Tabs defaultValue="profile" value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="flex flex-wrap w-full mb-8 max-w-5xl bg-slate-100/50 p-1 rounded-xl h-auto gap-1">
                        <TabsTrigger value="profile" className="flex-1 min-w-[120px] rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2 py-2">
                            <User className="h-4 w-4" />
                            Profil
                        </TabsTrigger>
                        <TabsTrigger value="business" className="flex-1 min-w-[120px] rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2 py-2">
                            <Building2 className="h-4 w-4" />
                            İşletme
                        </TabsTrigger>

                        {/* Menu Management Group */}
                        <div className="flex bg-slate-200/50 rounded-lg p-0.5 gap-0.5">
                            <TabsTrigger value="menu" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2 py-2 text-xs md:text-sm px-3">
                                <Utensils className="h-4 w-4" />
                                Menü/Ürün
                            </TabsTrigger>
                            <TabsTrigger value="campaigns" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2 py-2 text-xs md:text-sm px-3">
                                <Tag className="h-4 w-4" />
                                Kampanyalar
                            </TabsTrigger>
                            <TabsTrigger value="qr_menu" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2 py-2 text-xs md:text-sm px-3">
                                <QrCode className="h-4 w-4" />
                                Dijital Menü
                            </TabsTrigger>
                            <TabsTrigger value="tables" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2 py-2 text-xs md:text-sm px-3">
                                <LayoutIcon className="h-4 w-4" />
                                Masa Yerleşimi
                            </TabsTrigger>
                        </div>

                        <TabsTrigger value="data" className="flex-1 min-w-[150px] rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2 py-2">
                            <Database className="h-4 w-4" />
                            Satış, Ödeme Araçları
                        </TabsTrigger>
                        <TabsTrigger value="preferences" className="flex-1 min-w-[120px] rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2 py-2">
                            <Settings2 className="h-4 w-4" />
                            Tercihler
                        </TabsTrigger>
                        <TabsTrigger value="danger" className="flex-1 min-w-[120px] rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm gap-2 text-red-600 data-[state=active]:text-red-700 py-2">
                            <ShieldAlert className="h-4 w-4" />
                            Riskli Alan
                        </TabsTrigger>
                    </TabsList>

                    <form onSubmit={handleSave}>
                        {/* Profile Tab */}
                        <TabsContent value="profile" className="outline-none">
                            <Card className="border-none shadow-premium overflow-hidden">
                                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6 px-8">
                                    <CardTitle>Profil Bilgileri</CardTitle>
                                    <CardDescription>
                                        Kişisel detaylarınızı ve hesap bilgilerinizi görüntüleyin.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 p-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest" htmlFor="full_name">Ad Soyad</label>
                                        <Input
                                            id="full_name"
                                            value={formData.full_name}
                                            onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                                            placeholder="Adınız ve soyadınız"
                                            className="h-11 border-slate-200 focus:ring-primary/10 transition-all"
                                            disabled={!hasPermission('settings.write')}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest" htmlFor="email">
                                                E-posta (Salt-okunur)
                                            </label>
                                            <Input
                                                id="email"
                                                disabled
                                                value={formData.email}
                                                className="h-11 bg-slate-50 text-slate-500 border-slate-200"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest" htmlFor="role">
                                                Rol (Salt-okunur)
                                            </label>
                                            <Input
                                                id="role"
                                                disabled
                                                value={formData.role}
                                                className="h-11 capitalize bg-slate-50 text-slate-500 border-slate-200"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Business Tab */}
                        <TabsContent value="business" className="outline-none">
                            <Card className="border-none shadow-premium overflow-hidden">
                                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6 px-8">
                                    <CardTitle>İşletme Yapılandırması</CardTitle>
                                    <CardDescription>
                                        Şirket detaylarını ve çalışma ayarlarını yönetin.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 p-8">
                                    {/* Logo Upload Section */}
                                    <div className="flex items-start gap-6 pb-6 border-b border-slate-100">
                                        <div className="h-24 w-24 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                                            {formData.business_logo_url ? (
                                                <img src={formData.business_logo_url} alt="Business Logo" className="h-full w-full object-cover" />
                                            ) : (
                                                <Building2 className="h-10 w-10 text-slate-300" />
                                            )}
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-sm font-semibold text-slate-700">İşletme Logosu</label>
                                            <div className="flex items-center gap-3">
                                                <Button type="button" variant="outline" size="sm" className="relative overflow-hidden" disabled={isUploading || !hasPermission('settings.write')}>
                                                    <input
                                                        type="file"
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                        accept="image/*"
                                                        onChange={handleFileUpload}
                                                    />
                                                    {isUploading ? 'Yükleniyor...' : 'Logo Yükle'}
                                                </Button>
                                                {formData.business_logo_url && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => setFormData(prev => ({ ...prev, business_logo_url: '' }))}
                                                        disabled={!hasPermission('settings.write')}
                                                    >
                                                        Kaldır
                                                    </Button>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500">
                                                Önerilen boyut: 200x200px. Maksimum 5MB. (JPG, PNG)
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mt-6">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest" htmlFor="business_name">İşletme Adı</label>
                                        <Input
                                            id="business_name"
                                            value={formData.business_name}
                                            onChange={e => setFormData({ ...formData, business_name: e.target.value })}
                                            placeholder="İşletmenizin resmi adı"
                                            className="h-11 border-slate-200 focus:ring-primary/10 transition-all"
                                            disabled={!hasPermission('settings.write')}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest" htmlFor="business_type">İşletme Tipi</label>
                                            <Input
                                                id="business_type"
                                                value={formData.business_type}
                                                onChange={e => setFormData({ ...formData, business_type: e.target.value })}
                                                placeholder="Örn: Market, Kafe, Hizmet"
                                                className="h-11 border-slate-200 focus:ring-primary/10 transition-all"
                                                disabled={!hasPermission('settings.write')}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest" htmlFor="currency">Varsayılan Para Birimi</label>
                                            <select
                                                id="currency"
                                                className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all disabled:cursor-not-allowed disabled:opacity-50"
                                                value={formData.currency}
                                                onChange={e => setFormData({ ...formData, currency: e.target.value })}
                                                disabled={!hasPermission('settings.write')}
                                            >
                                                <option value="TRY">Türk Lirası (TRY)</option>
                                                <option value="USD">ABD Doları (USD)</option>
                                                <option value="EUR">Euro (EUR)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Auto Open / Close Time Section */}
                                    <div className="pt-6 mt-6 border-t border-slate-100">
                                        <div className="mb-4">
                                            <h4 className="text-sm font-bold text-slate-800">Otomatik İşletme Saatleri (Z-Raporu)</h4>
                                            <p className="text-xs text-slate-500 mt-1">
                                                Dükkanın otomatik olarak açılacağı ve kapanacağı (Z-Raporu oluşturulacağı) saatleri belirleyin. <br />
                                                <strong className="text-emerald-600">Önemli:</strong> Aynı saati (örn. 02:00 ve 02:00) girerseniz, dükkan belirlediğiniz saatte kapanıp anında Z-Raporunu alır ve 1 saniye sonra tekrar satışa hazır halde açılır. <br />İstemiyorsanız boş bırakabilirsiniz.
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest" htmlFor="auto_open_time">Sistemi Açılış Saati</label>
                                                <Input
                                                    id="auto_open_time"
                                                    type="time"
                                                    value={formData.auto_open_time}
                                                    onChange={e => setFormData({ ...formData, auto_open_time: e.target.value })}
                                                    className="h-11 border-slate-200 focus:ring-primary/10 transition-all font-mono"
                                                    disabled={!hasPermission('settings.write')}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest" htmlFor="auto_close_time">Otomatik Z-Raporu & Kapanış</label>
                                                <Input
                                                    id="auto_close_time"
                                                    type="time"
                                                    value={formData.auto_close_time}
                                                    onChange={e => setFormData({ ...formData, auto_close_time: e.target.value })}
                                                    className="h-11 border-slate-200 focus:ring-primary/10 transition-all font-mono"
                                                    disabled={!hasPermission('settings.write')}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Menu Tab */}
                        <TabsContent value="menu" className="outline-none">
                            <MenuManager />
                        </TabsContent>

                        {/* Campaigns Tab */}
                        <TabsContent value="campaigns" className="outline-none">
                            <CampaignManager />
                        </TabsContent>

                        {/* QR Menu Tab */}
                        <TabsContent value="qr_menu" className="outline-none">
                            <Card className="border-none shadow-premium overflow-hidden">
                                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6 px-8">
                                    <CardTitle>Dijital Menü & QR Kod</CardTitle>
                                    <CardDescription>
                                        Müşterilerinizin menüye şifresiz erişebilmesi için QR Kodu kullanın.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 space-y-8">
                                    {/* Main Menu QR */}
                                    <div className="flex flex-col items-center space-y-4">
                                        <p className="text-sm font-semibold text-slate-700">📋 Genel Menü QR (Masa Siparişi)</p>
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                            <QRCode
                                                value={`${import.meta.env.VITE_PUBLIC_DOMAIN || 'https://g2panda.com.tr'}/menu/${user?.id}`}
                                                size={180}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200">
                                            <code className="text-xs text-slate-700 font-mono">
                                                {`${import.meta.env.VITE_PUBLIC_DOMAIN || 'https://g2panda.com.tr'}/menu/${user?.id}`}
                                            </code>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={() => window.open(`${import.meta.env.VITE_PUBLIC_DOMAIN || 'https://g2panda.com.tr'}/menu/${user?.id}`, '_blank')}
                                            >
                                                <ExternalLink className="h-4 w-4 text-slate-400" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Takeaway QR */}
                                    <div className="flex flex-col items-center space-y-4 border-t border-slate-100 pt-8">
                                        <p className="text-sm font-semibold text-emerald-700">🛍️ Gel-Al QR (Paket Sipariş)</p>
                                        <div className="bg-white p-4 rounded-xl border-2 border-emerald-200 shadow-sm">
                                            <QRCode
                                                value={`${import.meta.env.VITE_PUBLIC_DOMAIN || 'https://g2panda.com.tr'}/menu/${user?.id}/takeaway`}
                                                size={180}
                                                fgColor="#059669"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                                            <code className="text-xs text-emerald-800 font-mono">
                                                {`${import.meta.env.VITE_PUBLIC_DOMAIN || 'https://g2panda.com.tr'}/menu/${user?.id}/takeaway`}
                                            </code>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={() => window.open(`${import.meta.env.VITE_PUBLIC_DOMAIN || 'https://g2panda.com.tr'}/menu/${user?.id}?type=takeaway`, '_blank')}
                                            >
                                                <ExternalLink className="h-4 w-4 text-emerald-500" />
                                            </Button>
                                        </div>
                                        <p className="text-xs text-emerald-600 text-center max-w-xs">
                                            Bu QR kodunu tarayan müşteriler sadece <strong>Gel-Al</strong> modunda sipariş verebilir.
                                            Masa seçimi gösterilmez.
                                        </p>
                                    </div>

                                    <Alert className="bg-emerald-50 border-emerald-100 max-w-lg">
                                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                                        <AlertDescription className="text-emerald-700 text-xs text-left">
                                            Bu QR kodu masalarınıza yapıştırabilir veya sosyal medyada paylaşabilirsiniz.
                                            Müşterileriniz sadece menüdekileri görür, herhangi bir yönetim işlemi yapamaz.
                                        </AlertDescription>
                                    </Alert>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Table Layout Tab */}
                        <TabsContent value="tables" className="outline-none">
                            <TableLayoutDesigner />
                        </TabsContent>

                        {/* Data Management Tab */}
                        <TabsContent value="data" className="outline-none space-y-6">
                            <CategoryManager />
                            <ChannelManager />
                        </TabsContent>

                        {/* Preferences Tab */}
                        <TabsContent value="preferences" className="outline-none">
                            <Card className="border-none shadow-premium overflow-hidden">
                                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6 px-8">
                                    <CardTitle>Tercihler</CardTitle>
                                    <CardDescription>
                                        Uygulama deneyiminizi kişiselleştirin.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 p-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest" htmlFor="locale">Dil ve Bölge</label>
                                        <select
                                            id="locale"
                                            className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all disabled:cursor-not-allowed disabled:opacity-50"
                                            value={formData.locale}
                                            onChange={e => setFormData({ ...formData, locale: e.target.value })}
                                            disabled={!hasPermission('settings.write')}
                                        >
                                            <option value="tr-TR">Türkçe (Türkiye)</option>
                                            <option value="en-US">English (United States)</option>
                                            <option value="en-GB">English (United Kingdom)</option>
                                        </select>
                                    </div>
                                    <div className="pt-6 border-t border-slate-50">
                                        <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                                            <p className="text-xs text-primary font-medium flex items-center gap-2">
                                                <AlertCircle className="h-4 w-4" />
                                                Yakında eklenecek özellikler: Tarih formatı, sayı formatı, zaman dilimi ve bildirim ayarları.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Danger Zone Tab */}
                        <TabsContent value="danger" className="outline-none">
                            <Card className="border-none shadow-premium overflow-hidden ring-1 ring-red-100">
                                <CardHeader className="bg-red-50/50 border-b border-red-100 pb-6 px-8">
                                    <CardTitle className="text-red-700 flex items-center gap-2">
                                        <ShieldAlert className="h-5 w-5" />
                                        Riskli Alan
                                    </CardTitle>
                                    <CardDescription className="text-red-600/70">
                                        Hesabınızı etkileyen geri alınamaz işlemler.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6 p-8">
                                    <div className="group flex items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl hover:border-red-200 transition-colors">
                                        <div className="space-y-1">
                                            <h4 className="text-base font-bold text-slate-800">Tüm Cihazlardan Çıkış Yap</h4>
                                            <p className="text-xs text-slate-500">
                                                Tüm aktif oturumlarınız sonlandırılır. Yeniden giriş yapmanız gerekecektir.
                                            </p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="font-bold border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                                            onClick={logout}
                                        >
                                            Her Yerden Çıkış Yap
                                        </Button>
                                    </div>

                                    <div className="flex items-center justify-between p-6 bg-slate-50/50 border border-slate-100 border-dashed rounded-2xl grayscale">
                                        <div className="space-y-1">
                                            <h4 className="text-base font-bold text-slate-400">Hesabı Sil</h4>
                                            <p className="text-xs text-slate-400 font-medium italic">
                                                Hesabınızı ve tüm verilerinizi kalıcı olarak silecek (Yakında).
                                            </p>
                                        </div>
                                        <Trash2 className="h-5 w-5 text-slate-300 mr-4" />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Save Button */}
                        {activeTab !== 'danger' && (
                            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-white shadow-premium rounded-2xl">
                                <div className="flex-1 w-full">
                                    {message && (
                                        <Alert className={cn(
                                            "p-3 rounded-xl border transition-all animate-in zoom-in",
                                            message.type === 'error' ? 'border-red-200 bg-red-50' : 'border-emerald-200 bg-emerald-50'
                                        )}>
                                            <div className="flex items-center gap-3">
                                                {message.type === 'success' ? (
                                                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                                                ) : (
                                                    <ShieldAlert className="h-5 w-5 text-red-600" />
                                                )}
                                                <AlertDescription className={cn(
                                                    "font-semibold text-sm",
                                                    message.type === 'error' ? 'text-red-700' : 'text-emerald-700'
                                                )}>
                                                    {message.text}
                                                </AlertDescription>
                                            </div>
                                        </Alert>
                                    )}
                                </div>
                                <div className="flex items-center gap-4">
                                    {!hasPermission('settings.write') && (
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic flex items-center gap-2">
                                            <ShieldAlert className="h-3 w-3" />
                                            Sadece Görüntüleme
                                        </p>
                                    )}
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || !hasPermission('settings.write') || !isDirty}
                                        className="min-w-[180px] h-11 font-bold shadow-md hover:shadow-lg transition-all active:scale-95 gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Kaydediliyor...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-4 w-4" />
                                                Değişiklikleri Kaydet
                                            </>
                                        )}
                                    </Button>
                                    {isDirty && !isSubmitting && (
                                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(37,99,235,0.5)]" title="Kaydedilmemiş değişiklikler var" />
                                    )}
                                </div>
                            </div>
                        )}
                    </form>
                </Tabs>
            </div>
        </Layout>
    );
}
