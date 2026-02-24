import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Trash2, DollarSign, ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import axios from 'axios';

interface RawMaterial {
    id: string;
    name: string;
    unit: string;
    is_intermediate: boolean;
}

interface RecipeItem {
    id?: string;
    raw_material_id: string;
    raw_material_name?: string;
    quantity: number;
    unit?: string;
    unit_price?: number;
    cost?: number;
}

export default function IntermediateRecipePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [materials, setMaterials] = useState<RawMaterial[]>([]);
    const [recipeItems, setRecipeItems] = useState<RecipeItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [quantity, setQuantity] = useState<number | ''>('');
    const [intermediateName, setIntermediateName] = useState('Yükleniyor...');

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const fetchData = async () => {
        setPageLoading(true);
        try {
            // Fetch all materials (including other intermediate products to allow nested recipes!)
            const matRes = await axios.get('/api/inventory/raw-materials');
            const allMaterials = matRes.data.data;

            // Find the current intermediate product to display its name
            const currentItem = allMaterials.find((m: any) => m.id === id);
            if (currentItem) {
                setIntermediateName(currentItem.name);
            }

            // Filter out the current item itself so it can't be added to its own recipe
            setMaterials(allMaterials.filter((m: any) => m.id !== id));

            // Fetch the existing recipe for this intermediate product
            const recipeRes = await axios.get(`/api/inventory/intermediate-recipes/${id}`);
            setRecipeItems(recipeRes.data.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Veriler yüklenirken bir hata oluştu.');
        } finally {
            setPageLoading(false);
        }
    };

    const addIngredient = () => {
        if (!selectedMaterial || Number(quantity) <= 0) {
            alert('Lütfen hammadde ve miktar seçin');
            return;
        }

        const material = materials.find(m => m.id === selectedMaterial);
        if (!material) return;

        if (recipeItems.some(item => item.raw_material_id === selectedMaterial)) {
            alert('Bu hammadde zaten reçetede var');
            return;
        }

        setRecipeItems([...recipeItems, {
            raw_material_id: selectedMaterial,
            raw_material_name: material.name,
            quantity: Number(quantity),
            unit: material.unit,
            unit_price: 0,
            cost: 0
        }]);

        setSelectedMaterial('');
        setQuantity('');
    };

    const removeIngredient = (materialId: string) => {
        setRecipeItems(recipeItems.filter(item => item.raw_material_id !== materialId));
    };

    const updateQuantity = (materialId: string, newQuantity: number) => {
        setRecipeItems(recipeItems.map(item =>
            item.raw_material_id === materialId
                ? { ...item, quantity: newQuantity, cost: (item.unit_price || 0) * newQuantity }
                : item
        ));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await axios.post('/api/inventory/intermediate-recipes', {
                intermediate_id: id,
                recipes: recipeItems.map(item => ({
                    raw_material_id: item.raw_material_id,
                    quantity: Number(item.quantity)
                }))
            });

            alert('Reçete başarıyla kaydedildi');
            navigate('/inventory/intermediate-products');
        } catch (error) {
            console.error('Error saving recipe:', error);
            alert('Reçete kaydedilemedi');
        } finally {
            setLoading(false);
        }
    };

    const totalCost = recipeItems.reduce((sum, item) => sum + (Number(item.cost) || 0), 0);

    if (pageLoading) {
        return (
            <Layout title="Yükleniyor..." description="Lütfen bekleyin">
                <div className="flex justify-center py-12">Yükleniyor...</div>
            </Layout>
        );
    }

    return (
        <Layout
            title={`Ara Ürün Reçetesi: ${intermediateName}`}
            description="Bu ara ürünü üretmek için gerekli hammaddeleri tanımlayın"
            actions={
                <Button variant="outline" onClick={() => navigate('/inventory/intermediate-products')}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Listeye Dön
                </Button>
            }
        >
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Form area to add an ingredient */}
                <Card>
                    <CardHeader>
                        <CardTitle>Hammadde Ekle</CardTitle>
                        <CardDescription>Reçeteye yeni bir malzeme ekleyin</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row items-end gap-4">
                            <div className="flex-1 space-y-2 w-full">
                                <Label>Hammadde veya Ara Ürün</Label>
                                <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seçiniz..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {materials
                                            .filter(m => !recipeItems.some(item => item.raw_material_id === m.id))
                                            .map(material => (
                                                <SelectItem key={material.id} value={material.id}>
                                                    {material.is_intermediate ? '🔄 [Ara Ürün] ' : ''}{material.name} ({material.unit})
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-full md:w-32 space-y-2">
                                <Label>Miktar</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value ? parseFloat(e.target.value) : '')}
                                    placeholder="0.00"
                                />
                            </div>
                            <Button onClick={addIngredient} className="w-full md:w-auto">
                                <Plus className="h-4 w-4 mr-2" />
                                Ekle
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Recipe Layout */}
                <Card>
                    <CardHeader>
                        <CardTitle>Reçete İçeriği</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recipeItems.length === 0 ? (
                            <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border border-dashed">
                                Henüz içerik eklenmedi. Yukarıdaki formu kullanarak hammadde seçin.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {recipeItems.map((item) => (
                                    <div key={item.raw_material_id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg bg-white shadow-sm hover:border-blue-200 transition-colors gap-4">
                                        <div className="flex-1">
                                            <p className="font-semibold text-slate-800">{item.raw_material_name}</p>
                                            <p className="text-xs text-slate-500 mt-1">
                                                {item.unit_price && Number(item.unit_price) > 0
                                                    ? `Ortalama Fiyat: ₺${Number(item.unit_price).toFixed(2)} / ${item.unit}`
                                                    : 'Stokta fiyat bilgisi yok'}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Input
                                                type="number"
                                                step="0.01"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.raw_material_id, parseFloat(e.target.value) || 0)}
                                                className="w-24 border-blue-200 focus-visible:ring-blue-500"
                                            />
                                            <span className="text-sm font-medium text-slate-600 w-16 px-2 py-1 bg-slate-100 rounded text-center">
                                                {item.unit}
                                            </span>
                                            {item.cost != null && Number(item.cost) > 0 && (
                                                <span className="text-sm font-semibold w-24 text-right text-slate-700">
                                                    ₺{Number(item.cost).toFixed(2)}
                                                </span>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeIngredient(item.raw_material_id)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50 ml-2"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>

                    {totalCost > 0 && (
                        <div className="px-6 py-4 bg-slate-50 border-t flex items-center justify-end">
                            <div className="flex items-center gap-2 text-lg">
                                <DollarSign className="h-5 w-5 text-slate-500" />
                                <span className="font-medium text-slate-600">Tahmini Birim Maliyet:</span>
                                <span className="font-bold text-slate-900">₺{totalCost.toFixed(2)}</span>
                            </div>
                        </div>
                    )}

                    <CardFooter className="pt-6 border-t bg-slate-50 flex justify-end gap-3 rounded-b-xl">
                        <Button variant="outline" onClick={() => navigate('/inventory/intermediate-products')} disabled={loading}>
                            İptal
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={loading || recipeItems.length === 0}
                            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
                        >
                            {loading ? 'Kaydediliyor...' : 'Reçeteyi Kaydet'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </Layout>
    );
}
