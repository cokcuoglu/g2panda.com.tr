import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, Mail, Loader2 } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password
            });

            if (response.data.success && response.data.data.token) {
                // Assuming login implementation handles fetching user or we need to pass it
                // Based on previous AuthContext file, login only takes token. 
                // Wait, I saw login(token) in AuthContext. Let me check AuthContext again.
                login(response.data.data.token);
                navigate('/');
            } else {
                setError('Geçersiz e-posta veya şifre.');
            }
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.response?.data?.error || 'Giriş yapılamadı. Sunucu hatası.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/5 rounded-full blur-3xl" />

            <div className="w-full max-w-md px-4 z-10">
                <div className="mb-8 text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-36 h-36 rounded-2xl shadow-lg mb-4 overflow-hidden p-3">
                        <img src="/favicon.png" alt="G2Panda Logo" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">G2Panda</h1>
                    <p className="text-slate-500">İşletmenizi yönetmeye hemen başlayın</p>
                </div>

                <Card className="border-none shadow-premium bg-white/80 backdrop-blur-sm">
                    <CardHeader className="space-y-1 pb-4 text-center">
                        <CardTitle className="text-xl font-semibold">Hoş Geldiniz</CardTitle>
                        <CardDescription>Hesabınıza erişmek için bilgilerinizi girin</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700" htmlFor="email">E-posta</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="ornek@esnaf.com"
                                        className="pl-10 h-11 border-slate-200 focus:border-primary focus:ring-primary/10"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-slate-700" htmlFor="password">Şifre</label>
                                    <a href="#" className="text-xs text-primary hover:underline">Şifremi Unuttum</a>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        className="pl-10 h-11 border-slate-200 focus:border-primary focus:ring-primary/10"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <Alert variant="destructive" className="py-2">
                                    <AlertDescription className="text-xs">
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-11 text-base font-semibold transition-all hover:shadow-lg active:scale-[0.98]"
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                ) : 'Giriş Yap'}
                            </Button>

                            <div className="pt-2 text-center">
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <p className="mt-8 text-center text-sm text-slate-500">
                    Hesabınız yok mu? <Link to="/register" className="font-medium text-primary hover:underline">Kaydolun</Link>
                </p>
            </div>
        </div>
    );
}
