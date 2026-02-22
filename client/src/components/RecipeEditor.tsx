import { useState, useEffect } from 'react';
import { Plus, Trash2, DollarSign } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';

interface RawMaterial {
    id: string;
    name: string;
    unit: string;
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

interface RecipeEditorProps {
    productId: string;
    productName: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function RecipeEditor({ productId, productName, open, onOpenChange }: RecipeEditorProps) {
    const [materials, setMaterials] = useState<RawMaterial[]>([]);
    const [recipeItems, setRecipeItems] = useState<RecipeItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        if (open) {
            fetchMaterials();
            fetchRecipe();
        }
    }, [open, productId]);

    const fetchMaterials = async () => {
        try {
            const response = await axios.get('/api/inventory/raw-materials');
            setMaterials(response.data.data);
        } catch (error) {
            console.error('Error fetching materials:', error);
        }
    };

    const fetchRecipe = async () => {
        try {
            const response = await axios.get(`/api/inventory/recipes/${productId}`);
            setRecipeItems(response.data.data || []);
        } catch (error) {
            console.error('Error fetching recipe:', error);
            setRecipeItems([]);
        }
    };

    const addIngredient = () => {
        if (!selectedMaterial || quantity <= 0) {
            alert('Lütfen hammadde ve miktar seçin');
            return;
        }

        const material = materials.find(m => m.id === selectedMaterial);
        if (!material) return;

        // Check if already exists
        if (recipeItems.some(item => item.raw_material_id === selectedMaterial)) {
            alert('Bu hammadde zaten reçetede var');
            return;
        }

        setRecipeItems([...recipeItems, {
            raw_material_id: selectedMaterial,
            raw_material_name: material.name,
            quantity,
            unit: material.unit,
            unit_price: 0,
            cost: 0
        }]);

        setSelectedMaterial('');
        setQuantity(0);
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
            await axios.post('/api/inventory/recipes', {
                product_id: productId,
                recipes: recipeItems.map(item => ({
                    raw_material_id: item.raw_material_id,
                    quantity: item.quantity
                }))
            });

            alert('Reçete kaydedildi');
            onOpenChange(false);
        } catch (error) {
            console.error('Error saving recipe:', error);
            alert('Reçete kaydedilemedi');
        } finally {
            setLoading(false);
        }
    };

    const totalCost = recipeItems.reduce((sum, item) => sum + (item.cost || 0), 0);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Ürün Reçetesi: {productName}</DialogTitle>
                    <DialogDescription>
                        Bu ürünü yapmak için gereken hammaddeleri ve miktarları tanımlayın
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Add Ingredient Form */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-3 gap-3">
                                <div className="col-span-2">
                                    <Label>Hammadde</Label>
                                    <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Hammadde seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {materials
                                                .filter(m => !recipeItems.some(item => item.raw_material_id === m.id))
                                                .map(material => (
                                                    <SelectItem key={material.id} value={material.id}>
                                                        {material.name} ({material.unit})
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Miktar</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="number"
                                            step="0.01"
                                            value={quantity || ''}
                                            onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
                                            placeholder="0"
                                        />
                                        <Button onClick={addIngredient} size="icon">
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recipe Items List */}
                    <div className="space-y-2">
                        <Label className="text-base font-semibold">Reçete İçeriği</Label>
                        {recipeItems.length === 0 ? (
                            <p className="text-center text-slate-500 py-8">Henüz hammadde eklenmedi</p>
                        ) : (
                            <div className="space-y-2">
                                {recipeItems.map((item) => (
                                    <div
                                        key={item.raw_material_id}
                                        className="flex items-center justify-between p-3 border rounded-lg"
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium">{item.raw_material_name}</p>
                                            <p className="text-sm text-slate-500">
                                                {item.unit_price && item.unit_price > 0
                                                    ? `Ort. Fiyat: ₺${item.unit_price.toFixed(2)}/${item.unit}`
                                                    : 'Fiyat bilgisi yok'}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Input
                                                type="number"
                                                step="0.01"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.raw_material_id, parseFloat(e.target.value) || 0)}
                                                className="w-24"
                                            />
                                            <span className="text-sm text-slate-500 w-12">{item.unit}</span>
                                            {item.cost != null && item.cost > 0 && (
                                                <span className="text-sm font-medium w-20 text-right">
                                                    ₺{item.cost.toFixed(2)}
                                                </span>
                                            )}
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => removeIngredient(item.raw_material_id)}
                                                className="text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Total Cost */}
                    {totalCost > 0 && (
                        <Card className="bg-slate-50">
                            <CardContent className="pt-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="h-5 w-5 text-slate-600" />
                                        <span className="font-semibold">Tahmini Maliyet</span>
                                    </div>
                                    <span className="text-lg font-bold">₺{totalCost.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">
                                    * Ortalama hammadde fiyatlarına göre hesaplanmıştır
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                        İptal
                    </Button>
                    <Button onClick={handleSave} disabled={loading || recipeItems.length === 0}>
                        {loading ? 'Kaydediliyor...' : 'Kaydet'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
