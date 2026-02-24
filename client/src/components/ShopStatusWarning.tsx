import { AlertCircle, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ShopStatusWarning() {
    return (
        <div className="bg-rose-600 text-white px-4 py-3 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top duration-500">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                    <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="font-bold text-sm md:text-base leading-none mb-1">Dükkan Kapalı!</h3>
                    <p className="text-rose-100 text-[10px] md:text-xs font-medium">
                        Finansal işlem yapabilmek için lütfen dükkan durumunu "Açık" olarak güncelleyin.
                    </p>
                </div>
            </div>

            <Link
                to="/"
                className="flex items-center gap-2 px-4 py-1.5 bg-white text-rose-600 rounded-lg text-sm font-bold hover:bg-rose-50 transition-colors shadow-sm whitespace-nowrap"
            >
                <Store className="h-4 w-4" />
                Dükkanı Aç
            </Link>
        </div>
    );
}
