import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Users as UsersIcon, ShieldAlert, UserCog, Mail, ShieldCheck, Plus, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { CheckedState } from "@radix-ui/react-checkbox"

interface User {
    id: string;
    full_name: string;
    email: string;
    role: 'OWNER' | 'ADMIN' | 'ACCOUNTANT' | 'STAFF';
    is_active: boolean;
    created_at: string;
    permissions?: string[];
}

const PERMISSION_OPTIONS = [
    { id: 'transactions.income.write', label: 'Gelir Girişi (Ekle/Düzenle)' },
    { id: 'transactions.expense.write', label: 'Gider Girişi (Ekle/Düzenle)' },
    { id: 'reports.export', label: 'Veri Dışa Aktar (Excel/PDF)' },
    { id: 'dashboard.read', label: 'Finansal Takip (Görüntüleme)' },
];

export default function Users() {
    const { hasPermission, user: currentUser } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        permissions: [] as string[]
    });

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/users');
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasPermission('users.read')) {
            fetchUsers();
        }
    }, [hasPermission]);

    const handleToggleStatus = async (userToToggle: User) => {
        if (userToToggle.id === (currentUser as any)?.id) return;

        const originalStatus = userToToggle.is_active;
        setUsers(prev => prev.map(u => u.id === userToToggle.id ? { ...u, is_active: !u.is_active } : u));

        try {
            await axios.put(`/api/users/${userToToggle.id}`, { is_active: !userToToggle.is_active });
        } catch (error) {
            console.error('Error toggling user status:', error);
            setUsers(prev => prev.map(u => u.id === userToToggle.id ? { ...u, is_active: originalStatus } : u));
        }
    };

    const handlePermissionChange = (permId: string, checked: CheckedState) => {
        setFormData(prev => {
            const current = new Set(prev.permissions);
            if (checked === true) current.add(permId);
            else current.delete(permId);
            return { ...prev, permissions: Array.from(current) };
        });
    };

    const openAddUser = () => {
        setEditingUser(null);
        setFormData({ full_name: '', email: '', password: '', permissions: [] });
        setIsDialogOpen(true);
    };

    const openEditUser = (user: User) => {
        setEditingUser(user);
        setFormData({
            full_name: user.full_name,
            email: user.email,
            password: '', // Password not editable directly here usually, but keeping simple
            permissions: user.permissions || []
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingUser) {
                // Update existing user permissions
                await axios.put(`/api/users/${editingUser.id}`, {
                    permissions: formData.permissions
                });
            } else {
                // Create new user
                await axios.post('/api/users', formData);
            }
            setIsDialogOpen(false);
            fetchUsers();
        } catch (error: any) {
            console.error('Failed to save user', error);
            const errorMessage = error.response?.data?.error || 'İşlem başarısız oldu. Lütfen bilgileri kontrol edin.';
            alert(errorMessage);
        }
    };

    if (!hasPermission('users.read')) {
        return (
            <Layout title="Kullanıcı Yönetimi" description="İşletme çalışanlarını yönetin">
                <Card className="border-none shadow-premium bg-red-50/50 backdrop-blur-sm">
                    <CardContent className="flex flex-col items-center justify-center p-16 text-center text-red-800">
                        <div className="p-4 bg-red-100 rounded-full mb-6">
                            <ShieldAlert className="h-12 w-12 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold">Erişim Engellendi</h3>
                        <p className="text-sm mt-3 text-red-600/80">Kullanıcı listesini görüntülemek için yönetici yetkisine sahip olmanız gerekmektedir.</p>
                    </CardContent>
                </Card>
            </Layout>
        );
    }

    const getRoleBadge = (role: string) => {
        const variants: Record<string, string> = {
            'OWNER': 'bg-indigo-50 text-indigo-700 border-indigo-100',
            'ADMIN': 'bg-blue-50 text-blue-700 border-blue-100',
            'ACCOUNTANT': 'bg-emerald-50 text-emerald-700 border-emerald-100',
            'STAFF': 'bg-slate-50 text-slate-700 border-slate-100',
        };

        const labels: Record<string, string> = {
            'OWNER': 'İşletme Sahibi',
            'ADMIN': 'Yönetici',
            'ACCOUNTANT': 'Muhasebeci',
            'STAFF': 'Personel',
        };

        return (
            <Badge variant="outline" className={cn("font-bold px-2.5 py-0.5", variants[role] || 'bg-slate-50 text-slate-700 border-slate-100')}>
                {labels[role] || role}
            </Badge>
        );
    };

    return (
        <Layout
            title="Kullanıcı Yönetimi"
            description="İşletmenize kayıtlı olan tüm kullanıcıları ve yetkilerini yönetin"
            actions={
                hasPermission('users.write') && (
                    <Button onClick={openAddUser} className="bg-slate-900 text-white hover:bg-slate-800">
                        <Plus className="h-4 w-4 mr-2" />
                        Yeni Kullanıcı Ekle
                    </Button>
                )
            }
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="border-none shadow-premium overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <UsersIcon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Kullanıcı Listesi</CardTitle>
                                <CardDescription>İşletme erişimi olan personellerin dökümü</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-slate-50/50">
                                    <TableRow className="hover:bg-transparent border-none">
                                        <TableHead className="font-bold text-slate-500 py-4 pl-6 h-auto">Kullanıcı</TableHead>
                                        <TableHead className="font-bold text-slate-500 py-4 h-auto">Rol</TableHead>
                                        <TableHead className="font-bold text-slate-500 py-4 h-auto">Durum</TableHead>
                                        <TableHead className="font-bold text-slate-500 py-4 h-auto text-right">Kayıt Tarihi</TableHead>
                                        <TableHead className="font-bold text-slate-500 py-4 pr-6 h-auto text-right">İşlemler</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.length === 0 && !loading ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-16 text-slate-400 italic">
                                                Kullanıcı bulunamadı.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        users.map((userItem) => (
                                            <TableRow key={userItem.id} className={cn(
                                                "border-slate-50 hover:bg-slate-50/50 transition-colors",
                                                !userItem.is_active && "opacity-60"
                                            )}>
                                                <TableCell className="py-4 pl-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                                                            <div className="text-xs font-bold text-slate-500 uppercase">
                                                                {userItem.full_name.split(' ').map((n: string) => n[0]).join('')}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-slate-700">{userItem.full_name}</span>
                                                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                                                <Mail className="h-3 w-3" />
                                                                {userItem.email}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    {getRoleBadge(userItem.role)}
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className={cn(
                                                            "h-1.5 w-1.5 rounded-full",
                                                            userItem.is_active ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-300"
                                                        )} />
                                                        <span className={cn(
                                                            "text-xs font-bold uppercase tracking-wider",
                                                            userItem.is_active ? "text-emerald-600" : "text-slate-400"
                                                        )}>
                                                            {userItem.is_active ? 'Aktif' : 'Pasif'}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="py-4 text-right text-xs text-slate-500 font-medium">
                                                    {new Date(userItem.created_at).toLocaleDateString('tr-TR')}
                                                </TableCell>
                                                <TableCell className="py-4 pr-6 text-right">
                                                    {hasPermission('users.write') && userItem.id !== (currentUser as any)?.id ? (
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="h-7 text-xs"
                                                                onClick={() => openEditUser(userItem)}
                                                            >
                                                                <Pencil className="h-3 w-3 mr-1" />
                                                                Yetkiler
                                                            </Button>
                                                            <div className="flex items-center gap-2 border-l pl-2 ml-2">
                                                                <Switch
                                                                    checked={userItem.is_active}
                                                                    onCheckedChange={() => handleToggleStatus(userItem)}
                                                                    className="data-[state=checked]:bg-emerald-500 h-4 w-7"
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        userItem.id === (currentUser as any)?.id ? (
                                                            <Badge variant="outline" className="text-[10px] uppercase font-bold text-primary border-primary/20 bg-primary/5">Siz</Badge>
                                                        ) : (
                                                            <ShieldCheck className="h-4 w-4 text-slate-300 ml-auto" />
                                                        )
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Info Card */}
                <Card className="border-none bg-primary/5 shadow-sm">
                    <CardContent className="p-6 flex items-start gap-4">
                        <UserCog className="h-5 w-5 text-primary mt-1" />
                        <div>
                            <h4 className="text-sm font-bold text-primary mb-1">Kullanıcı Yönetimi Hakkında</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Yeni kullanıcı ekleyerek personellerinizin de sistemi kullanmasını sağlayabilirsiniz.
                                "Yetkiler" butonunu kullanarak her personelin erişebileceği alanları (Gelir, Gider, Rapor vb.) özelleştirebilirsiniz.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingUser ? 'Kullanıcı Yetkilerini Düzenle' : 'Yeni Kullanıcı Ekle'}</DialogTitle>
                        <DialogDescription>
                            {editingUser
                                ? `${editingUser.full_name} için erişim yetkilerini belirleyin.`
                                : 'Personelin giriş yapabilmesi için bilgilerini girin.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                        {!editingUser && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="full_name">Ad Soyad</Label>
                                    <Input
                                        id="full_name"
                                        required
                                        value={formData.full_name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                                        placeholder="Örn: Ahmet Yılmaz"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">E-posta Adresi</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        placeholder="ornek@sirket.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Giriş Şifresi</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                        placeholder="******"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-3">
                            <Label className="text-base font-semibold">Erişim Yetkileri</Label>
                            <div className="grid gap-3 pt-2">
                                {PERMISSION_OPTIONS.map((perm) => (
                                    <div key={perm.id} className="flex items-center space-x-3 border p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                        <Checkbox
                                            id={perm.id}
                                            checked={formData.permissions.includes(perm.id)}
                                            onCheckedChange={(checked: boolean | string) => handlePermissionChange(perm.id, checked as CheckedState)}
                                        />
                                        <label
                                            htmlFor={perm.id}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                                        >
                                            {perm.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>İptal</Button>
                            <Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800">
                                {editingUser ? 'Yetkileri Kaydet' : 'Kullanıcıyı Oluştur'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Layout>
    );
}
