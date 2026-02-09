import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, User, Building2, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from 'axios';

export default function Register() {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        business_name: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth(); // We'll manually login by setting token after register
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await axios.post('/api/auth/register', formData);
            const { token } = response.data.data;

            // Auto login
            login(token);
            navigate('/');
        } catch (err: any) {
            console.error('Registration failed:', err);
            setError(err.response?.data?.error || 'Kayıt işlemi başarısız. Lütfen bilgilerinizi kontrol edin.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 -z-10" />

            <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
                <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-xl">
                    <CardHeader className="space-y-4 pb-2 text-center">
                        <div className="flex justify-center">
                            <div className="h-36 w-36 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300 overflow-hidden p-3">
                                <img src="/favicon.png" alt="G2Panda Logo" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                                G2Panda'a Katılın
                            </CardTitle>
                            <CardDescription className="text-slate-500 text-base">
                                İşletmenizi yönetmeye hemen başlayın
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <Alert variant="destructive" className="bg-red-50 text-red-900 border-red-200 animate-in slide-in-from-top-2">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription className="font-medium text-xs">
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <div className="space-y-4">
                                <div className="space-y-2 group">
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                        <Input
                                            id="full_name"
                                            placeholder="Ad Soyad"
                                            type="text"
                                            required
                                            value={formData.full_name}
                                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                            className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                        <Input
                                            id="business_name"
                                            placeholder="İşletme Adı (Opsiyonel)"
                                            type="text"
                                            value={formData.business_name}
                                            onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                                            className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                        <Input
                                            id="email"
                                            placeholder="E-posta Adresi"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 group">
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                        <Input
                                            id="password"
                                            placeholder="Şifre Oluşturun"
                                            type="password"
                                            required
                                            minLength={6}
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 transition-all duration-200"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button
                                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98]"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Hesap Oluşturuluyor...
                                    </>
                                ) : (
                                    <>
                                        Ücretsiz Kaydol
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pb-8 border-t border-slate-100 pt-6">
                        <div className="text-center text-sm text-slate-500">
                            Zaten hesabınız var mı?{' '}
                            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all">
                                Giriş Yapın
                            </Link>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 bg-slate-50 py-2 px-4 rounded-full border border-slate-100">
                            <ShieldCheck className="h-3 w-3 text-emerald-500" />
                            <span>Verileriniz 256-bit SSL ile korunmaktadır</span>
                        </div>
                    </CardFooter>
                </Card>
                <div className="mt-8 text-center space-y-2">
                    <p className="text-xs text-slate-400">
                        &copy; {new Date().getFullYear()} G2Panda. Tüm hakları saklıdır.
                    </p>
                </div>
            </div>
        </div>
    );
}
