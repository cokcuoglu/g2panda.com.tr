
import { cn } from "@/lib/utils";

interface ProductCardProps {
    name: string;
    price: number;
    originalPrice?: number;
    color?: string;
    image_url?: string;
    onClick: () => void;
}

export function ProductCard({ name, price, originalPrice, color, image_url, onClick }: ProductCardProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "group relative flex flex-col justify-between p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all active:scale-[0.98] overflow-hidden text-left h-32 w-full",
                !image_url && (color || "bg-white")
            )}
        >
            {image_url && (
                <div className="absolute inset-0 z-0">
                    <img src={image_url} alt="" className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
            )}

            <div className="relative z-10 w-full h-full flex flex-col justify-between">
                <span className={cn(
                    "font-medium line-clamp-2 text-sm",
                    image_url ? "text-white drop-shadow-sm font-semibold" : "text-slate-800"
                )}>
                    {name}
                </span>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className={cn(
                        "font-bold py-0.5 px-2 rounded-md text-xs backdrop-blur-sm shadow-sm",
                        image_url
                            ? "bg-white/20 text-white border border-white/20"
                            : "bg-white text-slate-900 border border-slate-100"
                    )}>
                        {price.toLocaleString('tr-TR')} TL
                    </span>
                    {originalPrice && originalPrice > price && (
                        <span className={cn(
                            "text-[10px] line-through opacity-70",
                            image_url ? "text-white" : "text-slate-400"
                        )}>
                            {originalPrice.toLocaleString('tr-TR')} TL
                        </span>
                    )}
                </div>
            </div>
        </button>
    );
}
