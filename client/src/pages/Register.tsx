import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Phone, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Register() {
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
                            <div className="h-36 w-36 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300 overflow-hidden p-3 bg-white">
                                <img src="/favicon.png" alt="G2Panda Logo" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                                Yeni Üyelik
                            </CardTitle>
                            <CardDescription className="text-slate-500 text-base">
                                G2Panda dünyasına katılmak için
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 text-center space-y-6">
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <p className="text-slate-700 mb-4 font-medium">
                                Yeni üyelik işlemleri için lütfen destek ekibimizle iletişime geçin.
                            </p>
                            <div className="flex items-center justify-center gap-3 text-blue-700 font-bold text-xl bg-white p-4 rounded-xl shadow-sm border border-blue-100 transform hover:scale-105 transition-all cursor-pointer" onClick={() => window.location.href = 'tel:05309022660'}>
                                <Phone className="h-6 w-6" />
                                <span>0530 902 26 60</span>
                            </div>
                        </div>

                        <Link to="/login">
                            <Button
                                className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-lg shadow-slate-500/25 transition-all duration-200 mt-4"
                            >
                                Giriş Ekranına Dön
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pb-8 border-t border-slate-100 pt-6">
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
