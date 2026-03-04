import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    CheckCircle2,
    MessageCircle,
    ChevronRight,
    Search,
    Clock,
    User,
    Calendar,
    Share2
} from 'lucide-react';

export default function BlogDetail() {
    useEffect(() => {
        window.scrollTo(0, 0);
        // Meta Tags Update
        document.title = "Restoran Yönetim Sistemleri: İşletmenizi Büyütmenin 5 Yolu | G2Panda";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", "Restoran yönetim sistemleri ile operasyonel hızı artırın, maliyetleri düşürün. QR menü ve AI destekli gider takibi ile dijital restoran yönetimine G2Panda ile hemen geçin.");
        }
    }, []);

    const handleWhatsApp = () => {
        window.open('https://wa.me/905309022660?text=Merhaba,%20Blog%20yazınızı%20okudum,%20G2Panda%20hakkında%20bilgi%20almak%20istiyorum.', '_blank');
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary/20 selection:text-primary">
            {/* Simple Navbar for Blog */}
            <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4">
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logo-saas.png" alt="G2Panda Logo" className="h-10 md:h-12 object-contain mix-blend-multiply" />
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors hidden sm:block">Giriş Yap</Link>
                        <Button onClick={handleWhatsApp} size="sm" className="rounded-full bg-[#25D366] hover:bg-[#20bd5a] border-0 gap-2">
                            <MessageCircle className="w-4 h-4 fill-current" />
                            <span className="hidden sm:inline">WhatsApp Destek</span>
                            <span className="sm:hidden">Destek</span>
                        </Button>
                    </div>
                </div>
            </nav>

            <main className="pt-28 pb-20">
                <article className="container mx-auto px-4 md:px-6 max-w-4xl">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                        <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-slate-900 font-medium">Blog</span>
                    </nav>

                    {/* Article Header */}
                    <header className="mb-12">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                            Restoran Yönetim Sistemleri Dosyası: İşletmenizi Dijital Çağa Nasıl Hazırlarsınız?
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 border-y border-slate-200 py-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                                    <User className="w-4 h-4 text-slate-500" />
                                </div>
                                <span className="font-semibold text-slate-900">G2Panda Editör</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>3 Mart 2026</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>12 dk okuma</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Search className="w-4 h-4" />
                                <span>#RestoranYönetimi</span>
                            </div>
                        </div>
                    </header>

                    {/* Main Content */}
                    <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-extrabold prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-strong:text-slate-900">
                        <p className="text-xl font-medium text-slate-700 leading-relaxed mb-8">
                            Günümüzün hızla değişen gastronomi dünyasında, sadece lezzetli yemekler sunmak artık yeterli değil. Misafirlerin beklentileri dijitalleşirken, işletme sahipleri için artan maliyetler ve personel yönetimi gibi zorluklar daha görünür hale geliyor. İşte tam bu noktada <strong>restoran yönetim sistemleri</strong>, bir lüksten ziyade sürdürülebilir bir işletme yapısı için zorunluluk haline dönüşüyor.
                        </p>

                        <h2 className="text-2xl md:text-3xl mt-12 mb-6">Restoran Yönetiminde Yeni Dönem: Neden Dijitalleşmeliyiz?</h2>
                        <p>
                            Geleneksel yöntemlerle bir restoranı yönetmek; kağıt adisyonlar, manuel stok takibi ve kopuk bir iletişim ağı demektir. Bu durum sadece hata payını artırmakla kalmaz, aynı zamanda ciddi bir zaman ve gelir kaybına yol açar. <strong>Dijital restoran yönetimi</strong>, tüm bu süreçleri tek bir merkezden, hatasız ve anlık olarak izlemenize olanak tanır.
                        </p>
                        <p>
                            Müşterinin kapıdan girdiği andan, hesabın ödenip masanın kapandığı ana kadar geçen her saniye veriye dönüşür. Bu veri, size hangi masanın ne kadar süre işgal edildiğini, hangi yemeğin daha çok kâr bıraktığını ve en yoğun saatlerinizde personelinizi nasıl konumlandırmayın gerektiğini söyler.
                        </p>

                        <h2 className="text-2xl md:text-3xl mt-12 mb-6">Modern Bir Restoran Otomasyon Programı Neleri Kapsamalıdır?</h2>
                        <p>
                            İyi bir <strong>restoran otomasyon programı</strong>, sadece bir kasa yazılımı değildir. İşletmenin tüm organlarını birbirine bağlayan bir sinir sistemi gibi çalışmalıdır.
                        </p>

                        <h3 className="text-xl md:text-2xl mt-8 mb-4">1. Bulut Tabanlı Altyapı</h3>
                        <p>
                            Eski nesil, terminale bağlı sistemler artık geride kaldı. Bulut tabanlı sistemler sayesinde işletmenizin başında olmasanız bile akıllı telefonunuzdan tüm satışları, iptalleri ve stok durumunu canlı olarak takip edebilirsiniz.
                        </p>

                        <h3 className="text-xl md:text-2xl mt-8 mb-4">2. QR Menü ve Sipariş Entegrasyonu</h3>
                        <p>
                            Modern <strong>QR menü ve sipariş sistemi</strong>, personelin üzerindeki sipariş alma yükünü %40'a kadar azaltabilir. Müşterinin kendi telefonundan menüyü inceleyip siparişini vermesi, hem hata payını sıfıra indirir hem de mutfağın işleyişini hızlandırır.
                        </p>

                        <h3 className="text-xl md:text-2xl mt-8 mb-4">3. Stok ve Hammadde Takibi</h3>
                        <p>
                            Mutfakta nelerin tükendiğini bilmemek, "yok" satmanıza veya fazla stok nedeniyle ürünlerin bozulmasına neden olur. Otomasyon sistemleri, satılan her ürünün içeriğindeki malzemeyi stoktan otomatik olarak düşerek sizi uyarır.
                        </p>

                        <div className="my-12 p-8 bg-primary/5 border border-primary/20 rounded-[32px] relative overflow-hidden">
                            <div className="relative z-10 text-center">
                                <p className="text-lg font-bold text-primary mb-4">Ücretsiz Denemeye Hemen Başlayın</p>
                                <h4 className="text-2xl font-extrabold text-slate-900 mb-6">Sınırlı sayıda üyeye ömür boyu ücretsiz kullanım hakkı!</h4>
                                <Button onClick={handleWhatsApp} size="lg" className="rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white border-0 gap-2">
                                    <MessageCircle className="w-5 h-5 fill-current" />
                                    WhatsApp ile Demo Al
                                </Button>
                            </div>
                        </div>

                        <h2 className="text-2xl md:text-3xl mt-12 mb-6">Restoran Yönetim Sistemleri Kullanmanın 5 Kritik Avantajı</h2>
                        <p>
                            İşletmenize doğru bir sistem dahil ettiğinde elde edeceğiniz kazanımlar sadece "kolaylık" ile sınırlı değildir. Doğrudan kârlılığa yansıyan 5 temel avantajı şöyle sıralayabiliriz:
                        </p>

                        <div className="space-y-8 my-8">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h4 className="text-lg font-bold text-slate-900 mb-2">A. Operasyonel Hız ve Verimlilik Artışı</h4>
                                <p className="text-base text-slate-600">Garsonların mutfak ile kasa arasında mekik dokumasına son verin. Siparişler doğrudan mutfak ekranlarına düşer, hazırlanan ürünler garsonun cebine bildirim olarak gider.</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h4 className="text-lg font-bold text-slate-900 mb-2">B. Müşteri Deneyiminde Kusursuzluk</h4>
                                <p className="text-base text-slate-600">Kimse hesap beklemekten veya yanlış gelen bir siparişten hoşlanmaz. Dijital restoran yönetimi araçları, müşterinin masadan kalkmadan ödeme talep etmesine veya ek ürünleri saniyeler içinde sepetine eklemesine imkan tanır.</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h4 className="text-lg font-bold text-slate-900 mb-2">C. Doğru Finansal Analiz ve Raporlama</h4>
                                <p className="text-base text-slate-600">Ay sonunda "Nereye gitti bu paralar?" sorusunu sormaktan kurtulun. Günlük ciro, personel performansı, en çok satan ürün analizleri ve kâr-zarar tabloları tek tuşla önünüze gelir.</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h4 className="text-lg font-bold text-slate-900 mb-2">D. Maliyet Kontrolü ve Kayıp-Kaçak Önleme</h4>
                                <p className="text-base text-slate-600">Adisyonların sistem üzerinden zorunlu kılınması ve stokların sıkı takibi sayesinde kayıp-kaçak oranları %15'lere kadar düşürülebilir.</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h4 className="text-lg font-bold text-slate-900 mb-2">E. Yapay Zeka Destekli Gider Yönetimi</h4>
                                <p className="text-base text-slate-600">Fiş ve faturalarınızı tarayarak giderlerinizi otomatik olarak kaydedin.</p>
                            </div>
                        </div>

                        <h2 className="text-2xl md:text-3xl mt-12 mb-6">Restoran Sahiplerinin Teknolojide Yaptığı Sık Hatalar</h2>
                        <ul className="space-y-4">
                            <li><strong>Aşırı Karmaşık Sistemler:</strong> Kullanılması için mühendislik diploması gerektiren yazılımlar personeli yavaşlatır. Sade olanı seçin.</li>
                            <li><strong>Donanım Bağımlılığı:</strong> Sizi belirli marka bilgisayarlara mahkum eden sistemlerden kaçının.</li>
                            <li><strong>Destek Alınamayan Yazılımlar:</strong> Bir sorun anında muhatap bulamadığınız bir sistem, en yoğun cuma akşamınızda sizi yarı yolda bırakabilir.</li>
                        </ul>

                        <h2 className="text-2xl md:text-3xl mt-12 mb-6">Sonuç: Geleceğin Restoranı Bugün Sizin Elinizde</h2>
                        <p>
                            Restoran sektöründe rekabet her geçen gün zorlaşıyor. Misafirler artık sadece yemek değil, hız, kolaylık ve şeffaflık bekliyor. Bu beklentileri karşılamanın ve aynı zamanda işletme kârlılığını korumanın tek yolu, doğru <strong>restoran yönetim sistemleri</strong> ile çalışmaktır.
                        </p>

                        <div className="my-16 p-10 bg-slate-900 text-white rounded-[40px] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
                            <div className="relative z-10">
                                <h3 className="text-3xl font-extrabold mb-6 text-white">G2Panda ile Tanışın: Hepsi Bir Arada Çözüm</h3>
                                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                    Türkiye'nin en yenilikçi dijital restoran asistanı G2Panda, kurulum gerektirmeyen bulut altyapısı ve yapay zeka desteğiyle işletmenizi dijitalleştirir.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                        <span>5 Dakikada Hızlı Kurulum</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                        <span>Yapay Zeka Fiş Okuma</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                        <span>QR Sipariş & Ödeme</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                        <span>Donanım Maliyeti Yok</span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button onClick={handleWhatsApp} size="lg" className="h-14 px-8 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white border-0 gap-2">
                                        <MessageCircle className="w-5 h-5 fill-current" />
                                        Hemen Ücretsiz Dene
                                    </Button>
                                    <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} variant="outline" size="lg" className="h-14 px-8 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20">
                                        Başa Dön
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-2xl md:text-3xl mt-12 mb-8">Sık Sorulan Sorular (FAQ)</h2>
                        <div className="space-y-6 mb-12">
                            <div className="border-b border-slate-200 pb-6">
                                <h5 className="font-bold text-slate-900 mb-2">Restoran yönetim sistemi kullanmak pahalı mıdır?</h5>
                                <p className="text-slate-600 text-base">Geleneksel sistemlerin aksine bulut tabanlı yeni nesil sistemler, ek donanım yatırımı gerektirmez ve sunduğu verimlilik artışıyla kendini aylar içinde amorti eder.</p>
                            </div>
                            <div className="border-b border-slate-200 pb-6">
                                <h5 className="font-bold text-slate-900 mb-2">İnternet kesilirse siparişler aksar mı?</h5>
                                <p className="text-slate-600 text-base">G2Panda hibrit çalışabilir veya mobil verilerle (4G/5G) kesintisiz hizmet vermeye devam eder.</p>
                            </div>
                            <div className="border-b border-slate-200 pb-6">
                                <h5 className="font-bold text-slate-900 mb-2">Küçük bir işletmeyim, bu teknoloji benim için lüks mü?</h5>
                                <p className="text-slate-600 text-base">Tam tersi! Küçük işletmelerin büyümesi için maliyetlerini kuruşu kuruşuna bilmesi gerekir. G2Panda ölçeklenebilir yapısıyla her işletmeye uyum sağlar.</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Share */}
                    <footer className="mt-20 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-slate-500 text-sm italic">
                            Bu yazı G2Panda SEO ekibi tarafından hazırlanmıştır. İç link: <Link to="/" className="text-primary hover:underline font-semibold">QR sipariş sistemi</Link> hakkında detaylı bilgi için ana sayfamızı inceleyin.
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-slate-700">Paylaş:</span>
                            <div className="flex gap-2">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
                                    <Share2 className="w-4 h-4 text-slate-600" />
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center cursor-pointer hover:bg-[#20bd5a] transition-colors" onClick={handleWhatsApp}>
                                    <MessageCircle className="w-4 h-4 fill-current" />
                                </div>
                            </div>
                        </div>
                    </footer>
                </article>
            </main>

            {/* Back to Home Fixed Button */}
            <Link to="/" className="fixed bottom-10 left-10 z-50 flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-2xl border border-slate-100 text-slate-700 font-bold hover:text-primary transition-all hover:scale-105 active:scale-95">
                <ArrowLeft className="w-4 h-4" />
                Ana Sayfa
            </Link>
        </div>
    );
}
