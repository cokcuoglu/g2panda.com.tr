import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Hammer, AlertTriangle, Calculator } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import axios from 'axios';

interface RecipeItem {
    id: string;
    raw_material_id: string;
    raw_material_name: string;
    quantity: number;
    unit: string;
    unit_price: number;
    cost: number;
}

interface IntermediateProduct {
    id: string;
    name: string;
    unit: string;
    current_stock: number;
}

export default function IntermediateProducePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<IntermediateProduct | null>(null);
    const [recipeItems, setRecipeItems] = useState<RecipeItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [produceQuantity, setProduceQuantity] = useState<number | ''>(1);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const fetchData = async () => {
        setPageLoading(true);
        setErrorMsg(null);
        try {
            // Fetch material details
            const matRes = await axios.get('/api/inventory/raw-materials');
            const currentItem = matRes.data.data.find((m: any) => m.id === id);
            if (currentItem) {
                setProduct(currentItem);
            }

            // Fetch the existing recipe for this intermediate product
            const recipeRes = await axios.get(`/api/inventory/intermediate-recipes/${id}`);
            const fetchedRecipes = recipeRes.data.data || [];
            if (fetchedRecipes.length === 0) {
                setErrorMsg('Bu ara ürünün reçetesi tanımlanmamış. Lütfen önce reçete oluşturun.');
            }
            setRecipeItems(fetchedRecipes);
        } catch (error) {
            console.error('Error fetching data:', error);
            setErrorMsg('Bilgiler yüklenirken bir hata oluştu.');
        } finally {
            setPageLoading(false);
        }
    };

    const handleProduce = async () => {
        if (!produceQuantity || produceQuantity <= 0) {
            alert('Lütfen geçerli bir üretim miktarı girin.');
            return;
        }

        if (!confirm(`${produceQuantity} ${product?.unit} üretilecek. Onaylıyor musunuz?`)) {
            return;
        }

        setLoading(true);
        setErrorMsg(null);
        try {
            await axios.post('/api/inventory/produce', {
                intermediate_id: id,
                quantity_to_produce: Number(produceQuantity)
            });

            alert('Üretim işlemi başarıyla tamamlandı.');
            navigate('/inventory/intermediate-products');
        } catch (error: any) {
            console.error('Production error:', error);
            setErrorMsg(error.response?.data?.error || 'Üretim sırasında bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    // Calculate totals based on requested quantity
    const unitCost = recipeItems.reduce((sum, item) => sum + (Number(item.cost) || 0), 0);
    const totalCost = unitCost * (Number(produceQuantity) || 0);

    if (pageLoading) {
        return (
            <Layout title="Yükleniyor..." description="Lütfen bekleyin">
                <div className="flex justify-center py-12">Yükleniyor...</div>
            </Layout>
        );
    }

    return (
        <Layout
            title={`Ara Ürün Üretimi: ${product?.name || 'Bilinmiyor'}`}
            description="Reçeteye göre hammaddeleri stoktan düşerek ara ürün üretin"
            actions={
                <Button variant="outline" onClick={() => navigate('/inventory/intermediate-products')}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Geri Dön
                </Button>
            }
        >
            <div className="max-w-4xl mx-auto space-y-6">

                {errorMsg && (
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Hata</AlertTitle>
                        <AlertDescription>{errorMsg}</AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Produce Controls */}
                    <Card className="col-span-1 border-blue-100 shadow-md">
                        <CardHeader className="bg-blue-50/50 pb-4 border-b">
                            <CardTitle className="flex items-center gap-2 text-blue-800">
                                <Hammer className="h-5 w-5" />
                                Üretim Paneli
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div className="space-y-2">
                                <Label className="text-base text-slate-700">Mevcut Stok Miktarı</Label>
                                <div className="text-3xl font-bold text-slate-900">
                                    {product?.current_stock} <span className="text-xl font-normal text-slate-500">{product?.unit}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-base font-semibold">Üretilecek Miktar</Label>
                                <div className="flex items-center gap-3">
                                    <Input
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        value={produceQuantity}
                                        onChange={(e) => setProduceQuantity(e.target.value ? parseFloat(e.target.value) : '')}
                                        className="text-lg py-6 shadow-sm border-blue-200 focus-visible:ring-blue-500"
                                    />
                                    <span className="text-lg text-slate-600 font-medium">
                                        {product?.unit}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-2 pb-6 px-6">
                            <Button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6"
                                onClick={handleProduce}
                                disabled={loading || recipeItems.length === 0 || !produceQuantity}
                            >
                                {loading ? 'İşleniyor...' : 'Üretimi Tamamla'}
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Cost Preview */}
                    <Card className="col-span-1 md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calculator className="h-5 w-5" />
                                Maliyet & Sarfiyat Özeti
                            </CardTitle>
                            <CardDescription>
                                {produceQuantity || 0} {product?.unit} üretim için stoktan düşülecek miktarlar
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recipeItems.length === 0 ? (
                                <div className="text-center py-6 text-slate-500 bg-slate-50 rounded-lg">
                                    Reçete bulunamadı. Lütfen önce reçete tanımlayın.
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="grid gap-3">
                                        {recipeItems.map((item) => (
                                            <div key={item.raw_material_id} className="flex justify-between items-center p-3 bg-white border border-slate-100 shadow-sm rounded-lg">
                                                <div>
                                                    <p className="font-medium text-slate-800">{item.raw_material_name}</p>
                                                    <p className="text-xs text-slate-500">
                                                        Birim Reçete: {item.quantity} {item.unit}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-red-600">
                                                        - {(Number(item.quantity) * (Number(produceQuantity) || 0)).toFixed(2)} {item.unit}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 p-5 bg-slate-50 rounded-xl border space-y-3">
                                        <div className="flex justify-between items-center text-sm text-slate-600">
                                            <span>Birim Maliyet (1 {product?.unit}):</span>
                                            <span className="font-medium">₺{unitCost.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-t pt-3">
                                            <span className="font-semibold text-slate-800 text-lg">Toplam Üretim Maliyeti:</span>
                                            <span className="font-bold text-slate-900 text-xl">₺{totalCost.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-400 text-center mt-4">
                                        * Maliyetler stoktaki güncel ortalama birim fiyatlar üzerinden hesaplanır.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
