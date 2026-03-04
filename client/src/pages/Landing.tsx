import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    QrCode,
    Smartphone,
    CreditCard,
    CheckCircle2,
    BarChart3,
    Package,
    Receipt,
    PieChart,
    Tags,
    Store,
    ArrowRight,
    Menu,
    X,
    MessageCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Refs for scroll spy in the story section
    const stepRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Calculate active step for sticky scroll
            const viewportHeight = window.innerHeight;
            const triggerOffset = viewportHeight * 0.5; // Trigger at middle of screen

            stepRefs.forEach((ref, index) => {
                if (ref.current) {
                    const rect = ref.current.getBoundingClientRect();
                    // If the element's top passes the middle of the screen
                    if (rect.top <= triggerOffset && rect.bottom >= triggerOffset) {
                        setActiveStep(index);
                    }
                }
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // If user is already authenticated, maybe we want to redirect to dashboard?
    // Left optional, but good practice. For now, let them see landing or click "Panele Git".

    const features = [
        { icon: <BarChart3 className="w-6 h-6 text-emerald-500" />, title: "Satış & POS Yönetimi", desc: "Tüm satış kanallarınızı tek ekrandan yönetin." },
        { icon: <Package className="w-6 h-6 text-blue-500" />, title: "Stok & Hammadde", desc: "Ürün reçeteleri ile otomatik stok düşün." },
        { icon: <Receipt className="w-6 h-6 text-emerald-500" />, title: "Gider Yönetimi", desc: "Fiş tarama AI ile giderlerinizi otomatik girin." },
        { icon: <PieChart className="w-6 h-6 text-blue-500" />, title: "Finansal Raporlar", desc: "Kâr-zarar durumunuzu anlık olarak izleyin." },
        { icon: <Tags className="w-6 h-6 text-emerald-500" />, title: "Kampanya Yönetimi", desc: "Müşterilerinize özel menü kampanyaları oluşturun." },
        { icon: <Store className="w-6 h-6 text-blue-500" />, title: "Online Sipariş", desc: "Paket servis ve Gel-Al süreçlerinizi dijitalleştirin." },
    ];

    const steps = [
        {
            title: "Müşteri QR'ı Okutur",
            text: "Masaya yerleştirdiğiniz QR kod ile müşteri kendi siparişini oluşturur.",
            icon: <QrCode className="w-8 h-8 text-primary" />,
            imageStyle: "scale-100 rotate-0" // We'll use CSS transforms instead of multiple images for the mockup feel if needed, but the mockup is one image.
        },
        {
            title: "Sipariş Anında Panelinize Düşer",
            text: "Sipariş masa ekranına anlık olarak yansır.",
            icon: <Smartphone className="w-8 h-8 text-primary" />,
            imageStyle: "scale-105 -rotate-1"
        },
        {
            title: "Müşteri Hesap İster",
            text: "Hesap talebi panelinizde uyarı olarak görünür.",
            icon: <Receipt className="w-8 h-8 text-primary" />,
            imageStyle: "scale-105 rotate-1"
        },
        {
            title: "Ödeme ve Masa Kapatma",
            text: "Ödeme yöntemi seçilir, masa kapanır, gelir kaydedilir.",
            icon: <CreditCard className="w-8 h-8 text-primary" />,
            imageStyle: "scale-100 rotate-0"
        }
    ];

    const scrollToSection = (id: string) => {
        setMobileMenuOpen(false);
        const el = document.getElementById(id);
        if (el) {
            const offset = 80; // navbar height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleWhatsApp = () => {
        window.open('https://wa.me/905309022660?text=Merhaba,%20G2Panda%20için%20demo%20talep%20ediyorum.', '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#EEF2F7] font-sans selection:bg-primary/20 selection:text-primary">
            {/* Navbar */}
            <nav className={cn(
                "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
                isScrolled ? "bg-white/90 backdrop-blur-md border-slate-200 shadow-sm py-3" : "bg-transparent border-transparent py-5"
            )}>
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src="/logo-saas.png" alt="G2Panda Logo" className="h-12 md:h-16 lg:h-20 object-contain transition-all duration-500 hover:scale-110" />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Özellikler</button>
                        <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Nasıl Çalışır?</button>
                        <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Fiyatlandırma</button>
                        <Link to="/blog" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Blog</Link>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated ? (
                            <Button onClick={() => navigate('/dashboard')} className="rounded-full px-6 shadow-sm">
                                Panele Git
                            </Button>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                                    Giriş Yap
                                </Link>
                                <Button onClick={handleWhatsApp} className="rounded-full px-6 shadow-sm shadow-primary/20 bg-[#25D366] hover:bg-[#20bd5a] text-white gap-2 border-0">
                                    <MessageCircle className="w-4 h-4 fill-current" />
                                    Demo İste
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-slate-700 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={cn(
                    "md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg transition-all duration-300 overflow-hidden",
                    mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}>
                    <div className="flex flex-col p-4 space-y-4">
                        <button onClick={() => scrollToSection('features')} className="text-left text-sm font-medium text-slate-700 py-2">Özellikler</button>
                        <button onClick={() => scrollToSection('how-it-works')} className="text-left text-sm font-medium text-slate-700 py-2">Nasıl Çalışır?</button>
                        <button onClick={() => scrollToSection('pricing')} className="text-left text-sm font-medium text-slate-700 py-2">Fiyatlandırma</button>
                        <Link to="/blog" className="text-left text-sm font-medium text-slate-700 py-2">Blog</Link>
                        <div className="h-px bg-slate-100 my-2" />
                        {isAuthenticated ? (
                            <Button onClick={() => navigate('/dashboard')} className="w-full rounded-full">Panele Git</Button>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-medium text-center text-slate-700 py-2">Giriş Yap</Link>
                                <Button onClick={handleWhatsApp} className="w-full rounded-full bg-[#25D366] hover:bg-[#20bd5a] border-0 gap-2">
                                    <MessageCircle className="w-4 h-4 fill-current" /> Demo İste
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-48 pb-20 md:pt-56 lg:pt-64 md:pb-32 overflow-hidden relative">
                {/* Decorative background blobs */}
                <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="max-w-4xl">
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.05] tracking-tighter mb-8">
                                Restoranınızı <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Dijitalleştirin.</span>
                            </h1>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 mb-8 leading-tight">
                                Yapay Zeka Destekli <br /> Yeni Nesil Restoran Yönetimi.
                            </h2>
                            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
                                Müşterileriniz QR ile anında sipariş versin, hesap istesin.<br className="hidden md:block" />
                                Siz de fişlerinizi <span className="font-semibold text-primary">Yapay Zeka OCR</span> modülümüze okutarak saniyeler içinde giderlerinizi kaydedin!
                            </p>
                            <div className="flex items-center gap-3 text-sm font-bold text-slate-700 mb-10 bg-white/60 w-fit px-6 py-3 rounded-full border border-slate-200/60 shadow-sm backdrop-blur-sm">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                Kurulum 5 dakika. Ek donanım gerekmez.
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <Button onClick={handleWhatsApp} size="lg" className="h-16 px-10 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5 bg-[#25D366] hover:bg-[#20bd5a] text-white border-0 gap-3">
                                    <MessageCircle className="w-6 h-6 fill-current" />
                                    WhatsApp ile Demo Al
                                </Button>
                                <Button onClick={() => scrollToSection('how-it-works')} variant="outline" size="lg" className="h-16 px-10 text-lg rounded-full border-slate-300 hover:bg-slate-50 transition-all">
                                    Nasıl Çalışır?
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </div>

                        <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
                            {/* Browser Mockup Frame */}
                            <div className="relative rounded-[32px] bg-white border border-slate-200/60 shadow-2xl overflow-hidden transform transition-transform hover:scale-[1.02] duration-500">
                                <div className="bg-slate-100/80 border-b border-slate-200/60 px-6 py-4 flex items-center gap-2">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                    </div>
                                    <div className="flex-1" />
                                </div>
                                <img
                                    src="/dashboard-mockup.png"
                                    alt="G2Panda Dashboard"
                                    className="w-full h-auto block object-cover"
                                    style={{ aspectRatio: '16/9' }}
                                />
                            </div>

                            {/* Floating Stats Badge */}
                            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 animate-bounce" style={{ animationDuration: '3s' }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <BarChart3 className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Günlük Ciro</p>
                                        <p className="text-xl font-black text-slate-900">₺18.450 <span className="text-sm text-emerald-500">+12%</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scroll Story Section */}
            <section id="how-it-works" className="py-32 bg-white relative">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">NASIL ÇALIŞIR?</h2>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Mükemmel Müşteri Deneyimi</h3>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 relative">
                        {/* Left Column: Scrolling Text */}
                        <div className="space-y-48 pb-48 pt-12">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    ref={stepRefs[index]}
                                    className={cn(
                                        "transition-all duration-500 transform",
                                        activeStep === index ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-4"
                                    )}
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                        {step.icon}
                                    </div>
                                    <h4 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{step.title}</h4>
                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        {step.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Right Column: Sticky Mockup */}
                        <div className="hidden lg:block">
                            <div className="sticky top-1/3 w-full rounded-[24px] bg-slate-50 border border-slate-200/50 shadow-2xl overflow-hidden aspect-square flex items-center justify-center p-8 transition-all duration-700 ease-in-out">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

                                {/* Mock UI Elements based on active step */}
                                <div className={cn(
                                    "relative w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 transition-all duration-700",
                                    steps[activeStep].imageStyle
                                )}>
                                    {/* Mobile Header Mock */}
                                    <div className="bg-slate-900 text-white p-4 pt-6 text-center shadow-md relative z-10">
                                        <p className="text-xs font-medium opacity-80 mb-1">Masa 4</p>
                                        <h5 className="font-bold text-lg">Hoş Geldiniz</h5>
                                    </div>

                                    <div className="px-5 py-6 space-y-4 bg-slate-50 min-h-[400px]">
                                        {activeStep === 0 && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                <div className="flex gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                                                    <div className="w-16 h-16 bg-slate-100 rounded-xl" />
                                                    <div className="flex-1 py-1">
                                                        <div className="h-4 w-3/4 bg-slate-200 rounded mb-2" />
                                                        <div className="h-3 w-1/4 bg-emerald-100 rounded" />
                                                    </div>
                                                </div>
                                                <div className="flex gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                                                    <div className="w-16 h-16 bg-slate-100 rounded-xl" />
                                                    <div className="flex-1 py-1">
                                                        <div className="h-4 w-2/3 bg-slate-200 rounded mb-2" />
                                                        <div className="h-3 w-1/3 bg-emerald-100 rounded" />
                                                    </div>
                                                </div>
                                                <Button className="w-full rounded-xl h-12 mt-4 text-base shadow-lg shadow-primary/20">
                                                    Siparişi Onayla
                                                </Button>
                                            </div>
                                        )}
                                        {activeStep === 1 && (
                                            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center justify-center h-[350px] text-center">
                                                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                                                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                                                </div>
                                                <h6 className="font-bold text-xl text-slate-800">Sipariş Alındı</h6>
                                                <p className="text-sm text-slate-500">Siparişiniz mutfağa iletildi. Hazırlanıyor.</p>
                                            </div>
                                        )}
                                        {activeStep === 2 && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-500 pt-10">
                                                <Button variant="outline" className="w-full h-16 rounded-2xl border-2 border-red-200 hover:bg-red-50 hover:border-red-300 text-red-600 font-semibold gap-3 text-lg">
                                                    <Receipt className="w-6 h-6" />
                                                    Hesap İste
                                                </Button>
                                                <Button variant="outline" className="w-full h-16 rounded-2xl border-2 border-amber-200 hover:bg-amber-50 hover:border-amber-300 text-amber-600 font-semibold gap-3 text-lg">
                                                    <Menu className="w-6 h-6" />
                                                    Garson Çağır
                                                </Button>
                                            </div>
                                        )}
                                        {activeStep === 3 && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-500 pt-4">
                                                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 text-center mb-6">
                                                    <p className="text-sm text-slate-500 font-medium mb-1">Ödenecek Tutar</p>
                                                    <p className="text-3xl font-extrabold text-slate-900">₺450,00</p>
                                                </div>
                                                <Button className="w-full rounded-xl h-12 bg-slate-900 hover:bg-slate-800 text-white gap-2">
                                                    <CreditCard className="w-4 h-4" /> Kart ile Öde
                                                </Button>
                                                <Button variant="outline" className="w-full rounded-xl h-12 gap-2 border-slate-200">
                                                    Kasa'da Öde
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Features Grid */}
            < section id="features" className="py-24 bg-slate-50 relative border-y border-slate-200/50" >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Restaurant Yönetiminde Tam Kontrol</h2>
                        <p className="text-lg text-slate-600">
                            Küçük bir kafe veya büyük bir restoran zinciri olun, tüm operasyonunuzu tek bir platformdan yönetin.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <div key={i} className="bg-white p-6 md:p-8 rounded-[24px] border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/5 transition-all">
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h4>
                                <p className="text-slate-600 leading-relaxed font-medium">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Pricing Section */}
            < section id="pricing" className="py-24 bg-white relative" >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Fiyatlandırma</h2>
                        <p className="text-lg text-slate-600">
                            Karmaşık paketler yok, gizli ücretler yok.
                        </p>
                    </div>

                    <div className="max-w-lg mx-auto bg-gradient-to-b from-white to-slate-50 rounded-[32px] p-8 shadow-xl border border-primary/20 relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-emerald-400" />

                        <div className="text-center space-y-4 mb-8">
                            <h3 className="text-2xl font-bold text-slate-900">Erken Erişim Kampanyası</h3>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-5xl font-extrabold text-slate-900">Ücretsiz</span>
                            </div>
                            <p className="font-semibold text-primary text-lg px-4 py-2 bg-primary/10 rounded-full inline-block mt-2">
                                Ömür Boyu Kullanım Hakkı!
                            </p>
                        </div>

                        <ul className="space-y-4 mb-8">
                            {[
                                "Tüm restoran yönetim modülleri",
                                "QR menü ve masadan sipariş",
                                "Sınırsız kullanıcı ve cihaz",
                                "Yapay zeka destekli gider girişi",
                                "7/24 Öncelikli destek"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <span className="text-slate-700 font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-8">
                            <p className="text-sm font-semibold text-amber-800 text-center">
                                ⚠️ Sınırlı sayıda üyeye ücretsiz ömür boyu kullanım hakkı. Demo talebi için acele edin!
                            </p>
                        </div>

                        <Button onClick={handleWhatsApp} size="lg" className="w-full h-14 text-base rounded-full shadow-lg shadow-[#25D366]/20 bg-[#25D366] hover:bg-[#20bd5a] text-white border-0 gap-2">
                            <MessageCircle className="w-5 h-5 fill-current" />
                            Hemen Demo İste
                        </Button>
                    </div>
                </div>
            </section >

            {/* Trust Section */}
            < section className="py-20 bg-white" >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto text-center border border-slate-100 rounded-[32px] p-8 md:p-12 shadow-2xl shadow-slate-200/50 bg-gradient-to-br from-white to-slate-50/50">
                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                            {[
                                "5 dakikada kurulum",
                                "Ek donanım gerekmez",
                                "Tablet / PC / Mobil uyumlu",
                                "Bulut tabanlı güvenli"
                            ].map((text, i) => (
                                <div key={i} className="flex flex-col items-center justify-center px-4 pt-4 sm:pt-0">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 focus flex items-center justify-center mb-3">
                                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 text-center">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section >

            {/* CTA Section */}
            < section className="py-24 bg-slate-900 text-white relative overflow-hidden" >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[120px] opacity-20" />

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
                        Restoranınızı Dijitalleştirmeye Hazır mısınız?
                    </h2>
                    <p className="text-xl text-slate-300 mb-10">
                        Hemen bugün G2Panda'yı deneyin ve işletmenizin hızına hız katın.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button onClick={handleWhatsApp} size="lg" className="h-14 px-8 text-base rounded-full shadow-lg shadow-[#25D366]/20 bg-[#25D366] hover:bg-[#20bd5a] text-white border-0 gap-2 w-full sm:w-auto">
                            <MessageCircle className="w-5 h-5 fill-current" />
                            WhatsApp ile Demo Al
                        </Button>
                        <Button onClick={() => navigate('/register')} variant="outline" size="lg" className="h-14 px-8 text-base rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 w-full sm:w-auto">
                            Hemen Başla
                        </Button>
                    </div>
                </div>
            </section >

            {/* Blog Section */}
            < section id="blog" className="py-24 bg-white border-t border-slate-100" >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
                        <div className="max-w-2xl">
                            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">BLOG</h2>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                                Restoran İşletmeciliği Hakkında <br /> İpuçları ve Rehberler
                            </h3>
                        </div>
                        <Link to="/blog" className="group flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                            Tüm Yazıları Gör
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Featured Post Card */}
                        <Link to="/blog" className="md:col-span-2 group">
                            <div className="relative rounded-[32px] overflow-hidden aspect-[16/9] md:aspect-[21/9] mb-6 shadow-2xl">
                                <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-all duration-500 z-10" />
                                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 z-20 bg-gradient-to-t from-slate-900/90 to-transparent">
                                    <div className="flex items-center gap-3 text-white/80 text-sm font-medium mb-4">
                                        <span className="px-3 py-1 bg-primary rounded-full text-white text-xs font-bold uppercase tracking-wider">Rehber</span>
                                        <span>3 Mart 2026</span>
                                        <span>•</span>
                                        <span>12 dk okuma</span>
                                    </div>
                                    <h4 className="text-2xl md:text-4xl font-extrabold text-white mb-4 group-hover:underline decoration-primary underline-offset-8">
                                        Restoran Yönetim Sistemleri Dosyası: İşletmenizi Dijital Çağa Nasıl Hazırlarsınız?
                                    </h4>
                                    <p className="text-slate-200 text-lg hidden md:block max-w-2xl font-medium">
                                        Günümüzün hızla değişen gastronomi dünyasında, dijitalleşme bir lüks değil zorunluluktur. İşletmenizi büyütmenin 5 kritik yolunu keşfedin.
                                    </p>
                                </div>
                                <div className="w-full h-full bg-slate-800 animate-pulse flex items-center justify-center text-white/10 italic text-4xl font-bold">
                                    Restoran Yönetimi 🐼
                                </div>
                            </div>
                        </Link>

                        {/* Secondary Card Placeholder/Mini */}
                        <div className="space-y-8">
                            <div className="bg-slate-50 p-6 rounded-[24px] border border-slate-200 relative overflow-hidden group hover:border-primary/30 transition-all">
                                <div className="relative z-10">
                                    <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block italic">Yakında</span>
                                    <h5 className="font-extrabold text-slate-900 mb-2 leading-tight">Yapay Zeka ile Mutfak Giderlerini Optimize Etme</h5>
                                    <p className="text-sm text-slate-500 font-medium">G2Panda'nın yeni nesil fiş tarama asistanı mutfaktaki kayıpları nasıl önler?</p>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-[24px] border border-slate-200 relative overflow-hidden group hover:border-primary/30 transition-all">
                                <div className="relative z-10">
                                    <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block italic">Yakında</span>
                                    <h5 className="font-extrabold text-slate-900 mb-2 leading-tight">Daha Hızlı Masa Devir Hızı İçin 10 Strateji</h5>
                                    <p className="text-sm text-slate-500 font-medium">Yoğun saatlerde müşteri sirkülasyonunu %20 artırmanın yolları.</p>
                                </div>
                            </div>
                            <div className="bg-primary/5 p-6 rounded-[24px] border border-primary/20 flex flex-col items-center text-center">
                                <h5 className="font-bold text-slate-900 mb-3 text-sm italic">Blog bültenimize katılın, ipuçlarını kaçırmayın!</h5>
                                <Button size="sm" className="w-full rounded-full bg-white text-slate-900 border border-slate-200 hover:bg-slate-50">Abone Ol</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Footer */}
            < footer className="bg-slate-950 text-slate-400 py-12 border-t border-white/10" >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <img src="/logo-saas.png" alt="G2Panda Logo" className="h-[80px] md:h-[120px] object-contain hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex gap-6 text-sm font-medium">
                            <a href="#" className="hover:text-white transition-colors">KVKK Aydınlatma Metni</a>
                            <a href="#" className="hover:text-white transition-colors">İletişim</a>
                        </div>
                        <div className="flex gap-4">
                            {/* Social Placeholders */}
                            <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors" />
                            <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors" />
                            <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors" />
                        </div>
                    </div>
                    <div className="text-center mt-12 text-sm opacity-60">
                        &copy; {new Date().getFullYear()} G2Panda Bilişim. Tüm hakları saklıdır.
                    </div>
                </div>
            </footer >

            {/* Floating Animated Mascot */}
            < div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[100] animate-bounce hover:animate-none" style={{ animationDuration: '4s' }
            }>
                <div className="relative cursor-pointer group" onClick={handleWhatsApp}>
                    <div className="absolute -inset-4 bg-emerald-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Chat Bubble Tooltip */}
                    <div className="absolute bottom-full right-1/2 translate-x-12 sm:translate-x-4 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-white text-slate-800 text-sm font-bold py-3 px-5 rounded-2xl rounded-br-none shadow-xl border border-slate-100 whitespace-nowrap">
                            Size nasıl yardımcı olabilirim? 🐼
                        </div>
                    </div>

                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border-[3px] border-emerald-50 overflow-hidden transform group-hover:scale-110 transition-transform duration-300">
                        {/* We use object-cover object-left to crop just the panda face from the logo text */}
                        <img
                            src="/logo-saas.png"
                            alt="G2Panda Floating Mascot"
                            className="w-full h-full object-cover object-left p-1"
                        />
                    </div>
                </div>
            </div >
        </div >
    );
}
