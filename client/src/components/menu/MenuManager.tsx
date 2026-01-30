import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CategoryTree } from './CategoryTree';
import { ProductList } from './ProductList';
import { Utensils, AlertCircle } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    level: number;
    sort_order: number;
    is_active: boolean;
    children: Category[];
}

export const MenuManager = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    return (
        <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                <div className="p-2 bg-white rounded-lg border border-indigo-100 shadow-sm">
                    <Utensils className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-indigo-900">Menü ve Ürün Yönetimi</h3>
                    <p className="text-sm text-indigo-700/80">
                        İşletmenizin menü hiyerarşisini oluşturun ve ürünlerinizi yönetin.
                        Kategorileri sürükleyip bırakabilir (yakında), 5 seviyeye kadar alt kategori ekleyebilirsiniz.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 h-[600px]">
                {/* Left: Category Tree */}
                <div className="col-span-12 md:col-span-4 h-full">
                    <Card className="h-full border-none shadow-premium flex flex-col overflow-hidden">
                        <CardContent className="flex-1 p-4 overflow-hidden">
                            <CategoryTree
                                onSelectCategory={setSelectedCategory}
                                selectedCategoryId={selectedCategory?.id || null}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Product List */}
                <div className="col-span-12 md:col-span-8 h-full">
                    <Card className="h-full border-none shadow-premium flex flex-col overflow-hidden">
                        <CardContent className="flex-1 p-0 overflow-hidden bg-slate-50/50">
                            {selectedCategory ? (
                                <ProductList selectedCategoryId={selectedCategory.id} />
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
                                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                                        <Utensils className="h-8 w-8 text-slate-300" />
                                    </div>
                                    <h4 className="font-semibold text-slate-600 text-lg">Kategori Seçin</h4>
                                    <p className="max-w-xs mx-auto mt-2 text-sm">
                                        Ürünleri görüntülemek ve düzenlemek için sol menüden bir kategori seçin.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 px-2">
                <AlertCircle className="h-3 w-3" />
                <span>İpucu: Ürün eklemek için en alt seviye kategorileri kullanmanız önerilir, ancak zorunlu değildir.</span>
            </div>
        </div>
    );
};
