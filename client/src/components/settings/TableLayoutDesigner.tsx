import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Save,
    RotateCw,
    Trash2,
    Move,
    Loader2,
    CheckCircle,
    Square,
    Circle,
    RectangleHorizontal,
    Layout
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Table {
    id: string;
    unique_code: string;
    name: string;
    type: 'round' | 'square' | 'rectangle' | 'lshape';
    rotation: number;
    capacity: number;
    area: string;
    status: 'available' | 'active';
    pos_x: number;
    pos_y: number;
    isTemporary?: boolean;
}

export const TableLayoutDesigner = () => {
    const [tables, setTables] = useState<Table[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const fetchTables = async () => {
        try {
            const res = await axios.get('/api/tables');
            setTables(res.data.data);
        } catch (err) {
            console.error('Fetch tables failed:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTables();
    }, []);

    const addTable = (type: Table['type']) => {
        const newTable: Table = {
            id: `temp-${Date.now()}`,
            unique_code: 'NEW',
            name: `Masa ${tables.length + 1}`,
            type,
            rotation: 0,
            capacity: 2,
            area: 'Genel',
            status: 'available',
            pos_x: 50,
            pos_y: 50,
            isTemporary: true
        };
        setTables([...tables, newTable]);
        setSelectedTableId(newTable.id);
    };

    const handleDrag = (e: React.MouseEvent, id: string) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();

        // Calculate relative position (0-100 range)
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        // Clamp values
        const clampedX = Math.max(2, Math.min(95, x));
        const clampedY = Math.max(2, Math.min(95, y));

        setTables(prev => prev.map(t =>
            t.id === id ? { ...t, pos_x: clampedX, pos_y: clampedY } : t
        ));
    };

    const rotateTable = (id: string) => {
        setTables(prev => prev.map(t =>
            t.id === id ? { ...t, rotation: (t.rotation + 90) % 360 } : t
        ));
    };

    const removeTable = async (id: string) => {
        if (id.startsWith('temp-')) {
            setTables(prev => prev.filter(t => t.id !== id));
            setSelectedTableId(null);
            return;
        }

        if (!confirm('Bu masayı silmek istediğinize emin misiniz?')) return;

        try {
            await axios.delete(`/api/tables/${id}`);
            setTables(prev => prev.filter(t => t.id !== id));
            setSelectedTableId(null);
            setMessage({ type: 'success', text: 'Masa silindi.' });
        } catch (err) {
            setMessage({ type: 'error', text: 'Masa silinemedi.' });
        }
    };

    const saveLayout = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            for (const table of tables) {
                if (table.isTemporary) {
                    await axios.post('/api/tables', {
                        name: table.name,
                        type: table.type,
                        capacity: table.capacity,
                        area: table.area,
                        posX: table.pos_x,
                        posY: table.pos_y,
                        rotation: table.rotation
                    });
                } else {
                    await axios.patch(`/api/tables/${table.id}`, {
                        name: table.name,
                        posX: table.pos_x,
                        posY: table.pos_y,
                        rotation: table.rotation,
                        capacity: table.capacity
                    });
                }
            }
            await fetchTables();
            setMessage({ type: 'success', text: 'Tüm yerleşim ve değişiklikler kaydedildi.' });
        } catch (err: any) {
            console.error('Save layout failed:', err);
            const errorMsg = err.response?.data?.details || err.message || 'Kaydedilirken bir hata oluştu.';
            setMessage({ type: 'error', text: errorMsg });
        } finally {
            setIsSaving(false);
        }
    };

    const selectedTable = tables.find(t => t.id === selectedTableId);

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
            </div>
        );
    }

    return (
        <Card className="border-none shadow-premium overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6 px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Layout className="h-5 w-5 text-primary" />
                            Görsel Masa Yerleşimi
                        </CardTitle>
                        <CardDescription>
                            Masalarınızı ekleyin ve sürükleyerek restoran yerleşimini oluşturun.
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => addTable('square')} className="gap-2">
                            <Square className="h-4 w-4" /> Kare
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => addTable('round')} className="gap-2">
                            <Circle className="h-4 w-4" /> Yuvarlak
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => addTable('rectangle')} className="gap-2">
                            <RectangleHorizontal className="h-4 w-4" /> Dikdörtgen
                        </Button>
                        <Button size="sm" onClick={saveLayout} disabled={isSaving} className="gap-2 bg-primary ml-2 shadow-md">
                            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            Yerleşimi Kaydet
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col md:flex-row h-[700px]">
                {/* Canvas Area */}
                <div className="flex-1 bg-slate-100 relative overflow-hidden group border-r border-slate-100" ref={containerRef}>
                    {/* Grid Background */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}
                    />

                    {tables.map((table) => (
                        <div
                            key={table.id}
                            className={cn(
                                "absolute cursor-move select-none transition-shadow active:scale-95 flex items-center justify-center border-2 shadow-sm",
                                selectedTableId === table.id ? "border-primary ring-2 ring-primary/20 z-20 shadow-lg" : "border-slate-300 hover:border-slate-400 z-10",
                                table.type === 'round' ? "rounded-full" : "rounded-lg",
                                table.status === 'active' ? "bg-emerald-500 text-white" : "bg-white text-slate-700",
                                table.type === 'square' && "w-16 h-16",
                                table.type === 'round' && "w-16 h-16",
                                table.type === 'rectangle' && "w-24 h-16"
                            )}
                            style={{
                                left: `${table.pos_x}%`,
                                top: `${table.pos_y}%`,
                                transform: `translate(-50%, -50%) rotate(${table.rotation}deg)`
                            }}
                            onMouseDown={() => setSelectedTableId(table.id)}
                            onMouseMove={(e) => {
                                if (e.buttons === 1 && selectedTableId === table.id) {
                                    handleDrag(e, table.id);
                                }
                            }}
                        >
                            <span className="text-[10px] font-bold text-center px-1 leading-tight uppercase">
                                {table.name}
                            </span>
                        </div>
                    ))}

                    <div className="absolute bottom-4 right-4 text-[10px] font-medium text-slate-400 bg-white/80 backdrop-blur-sm px-2 py-1 rounded border border-slate-200">
                        {tables.length} Masa Yerleştirildi
                    </div>
                </div>

                {/* Properties Panel */}
                <div className="w-full md:w-80 bg-slate-50 border-l border-slate-100 p-6 space-y-6">
                    {selectedTable ? (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div>
                                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4">Masa Özellikleri</h3>
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-600">Masa Adı</label>
                                        <Input
                                            value={selectedTable.name}
                                            onChange={(e) => setTables(prev => prev.map(t => t.id === selectedTableId ? { ...t, name: e.target.value } : t))}
                                            className="h-9"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-600">Kapasite</label>
                                        <Input
                                            type="number"
                                            value={selectedTable.capacity}
                                            onChange={(e) => setTables(prev => prev.map(t => t.id === selectedTableId ? { ...t, capacity: parseInt(e.target.value) } : t))}
                                            className="h-9"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-slate-600">Kod (Otomatik)</label>
                                        <Input
                                            value={selectedTable.unique_code}
                                            disabled
                                            className="h-9 bg-slate-100 font-mono text-xs"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-200">
                                <h4 className="text-xs font-bold text-slate-500 mb-3">İŞLEMLER</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button variant="outline" size="sm" onClick={() => rotateTable(selectedTable.id)} className="gap-2">
                                        <RotateCw className="h-4 w-4" /> Döndür
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => removeTable(selectedTable.id)} className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                                        <Trash2 className="h-4 w-4" /> Sil
                                    </Button>
                                </div>
                            </div>

                            {selectedTable.isTemporary && (
                                <Alert className="bg-amber-50 border-amber-100 py-3">
                                    <AlertDescription className="text-amber-800 text-[11px] leading-snug">
                                        Bu masa henüz kaydedilmedi. Lütfen yerleşimi kaydedin.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-40">
                            <Move className="h-12 w-12 text-slate-300" />
                            <p className="text-sm font-medium text-slate-400">
                                Özellikleri düzenlemek için<br />bir masa seçin.
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
            {message && (
                <div className={cn(
                    "p-4 border-t flex items-center gap-3 transition-colors",
                    message.type === 'success' ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-700 border-red-100"
                )}>
                    {message.type === 'success' && <CheckCircle className="h-5 w-5" />}
                    <span className="text-sm font-semibold">{message.text}</span>
                    <Button variant="ghost" size="sm" className="ml-auto h-7 text-xs" onClick={() => setMessage(null)}>Kapat</Button>
                </div>
            )}
        </Card>
    );
};
