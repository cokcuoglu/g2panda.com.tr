import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PieChart as PieIcon, BarChart as BarIcon, AlertCircle, ArrowUpDown, ArrowLeft } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface CategoryData {
    category_name: string;
    category_color?: string;
    total_amount: number;
    count: number;
    percentage: number;
}

interface CategoryReportPageProps {
    type: 'income' | 'expense';
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c', '#fa8c16', '#722ed1', '#eb2f96'];

const CategoryReportPage: React.FC<CategoryReportPageProps> = ({ type }) => {
    const [data, setData] = useState<CategoryData[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [viewType, setViewType] = useState<'pie' | 'bar'>('pie');

    // Date State
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

    // Format YYYY-MM-DD for input
    // Format YYYY-MM-DD for input
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const [startDate, setStartDate] = useState<string>(formatDate(firstDay));
    const [endDate, setEndDate] = useState<string>(formatDate(today));
    const [dateError, setDateError] = useState<string | null>(null);

    // Validation
    useEffect(() => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            setDateError('Geçersiz tarih formatı.');
            return;
        }

        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 31) {
            setDateError('Tarih aralığı 31 günü geçemez.');
        } else {
            setDateError(null);
        }
    }, [startDate, endDate]);

    const fetchData = async () => {
        if (dateError) return;

        setLoading(true);
        setError(null);
        try {
            // Use relative path - Vite proxy handles Dev, Nginx/Express handles Prod
            const response = await axios.get('/api/reports/categories', {
                params: {
                    start_date: startDate,
                    end_date: endDate,
                    type
                },
                withCredentials: true
            });

            if (response.data.success) {
                setData(response.data.data);
                setTotal(response.data.total);
            }
        } catch (err: any) {
            console.error(err);
            const status = err.response?.status ? `(${err.response.status}) ` : '';
            const msg = err.response?.data?.error || err.message || 'Veri çekilirken bir hata oluştu.';
            setError(`${status}${msg}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [type]); // Initial fetch only when type changes. User triggers update manually for dates? Or auto?
    // Let's make it manual "Update" button to avoid spamming while picking dates, per requirements ("Update" button mentioned).

    const handleUpdate = () => {
        fetchData();
    };

    const getChartData = () => {
        return data.map(item => ({
            name: item.category_name,
            value: item.total_amount,
            percentage: item.percentage
        }));
    };

    const title = type === 'income' ? 'Gelir Kategori Raporu' : 'Gider Kategori Raporu';
    const totalLabel = type === 'income' ? 'Toplam Gelir' : 'Toplam Gider';

    return (
        <Layout title={title}>
            <div className="space-y-6 animate-in fade-in duration-500 p-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <Button variant="outline" size="sm" onClick={() => window.history.back()} className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Geri Dön
                    </Button>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <Button
                            variant={viewType === 'pie' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewType('pie')}
                            className="rounded-md"
                        >
                            <PieIcon className="w-4 h-4 mr-2" /> Pasta
                        </Button>
                        <Button
                            variant={viewType === 'bar' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewType('bar')}
                            className="rounded-md"
                        >
                            <BarIcon className="w-4 h-4 mr-2" /> Çubuk
                        </Button>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border shadow-sm flex flex-col md:flex-row gap-4 items-end">
                    <div className="w-full md:w-auto">
                        <label className="text-sm font-medium mb-1 block">Başlangıç Tarihi</label>
                        <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className={dateError ? 'border-red-500' : ''}
                        />
                    </div>
                    <div className="w-full md:w-auto">
                        <label className="text-sm font-medium mb-1 block">Bitiş Tarihi</label>
                        <Input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className={dateError ? 'border-red-500' : ''}
                        />
                    </div>
                    <Button onClick={handleUpdate} disabled={loading || !!dateError} className="w-full md:w-auto">
                        {loading ? 'Yükleniyor...' : 'Güncelle'}
                    </Button>
                </div>

                {dateError && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Hata</AlertTitle>
                        <AlertDescription>{dateError}</AlertDescription>
                    </Alert>
                )}

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Hata</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Chart Section */}
                    <Card className="order-1">
                        <CardHeader>
                            <CardTitle>Grafiksel Dağılım</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[400px] flex items-center justify-center">
                            {data.length === 0 && !loading ? (
                                <div className="text-gray-500">Veri bulunamadı.</div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    {viewType === 'pie' ? (
                                        <PieChart>
                                            <Pie
                                                data={getChartData()}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={120}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {data.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.category_color || COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(Number(value))} />
                                            <Legend />
                                        </PieChart>
                                    ) : (
                                        <BarChart data={getChartData()} layout="vertical">
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="name" type="category" width={100} />
                                            <Tooltip formatter={(value) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(Number(value))} />
                                            <Legend />
                                            <Bar dataKey="value" name="Tutar" fill="#8884d8" radius={[0, 4, 4, 0]}>
                                                {data.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.category_color || COLORS[index % COLORS.length]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    )}
                                </ResponsiveContainer>
                            )}
                        </CardContent>
                    </Card>

                    {/* Table Section */}
                    <Card className="order-2">
                        <CardHeader>
                            <CardTitle className="flex justify-between">
                                <span>Detaylı Liste</span>
                                <span className="text-lg font-bold text-primary">
                                    {totalLabel}: {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(total)}
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Kategori</TableHead>
                                            <TableHead className="text-right">İşlem Sayısı</TableHead>
                                            <TableHead className="text-right flex items-center justify-end gap-1 cursor-pointer">
                                                Tutar <ArrowUpDown className="w-3 h-3" />
                                            </TableHead>
                                            <TableHead className="text-right">%</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center h-24 text-gray-500">Veri yok</TableCell>
                                            </TableRow>
                                        ) : (
                                            data.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="font-medium flex items-center gap-2">
                                                        <div
                                                            className="w-3 h-3 rounded-full"
                                                            style={{ backgroundColor: item.category_color || COLORS[index % COLORS.length] }}
                                                        />
                                                        {item.category_name}
                                                    </TableCell>
                                                    <TableCell className="text-right">{item.count}</TableCell>
                                                    <TableCell className="text-right font-semibold">
                                                        {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(item.total_amount)}
                                                    </TableCell>
                                                    <TableCell className="text-right">{item.percentage.toFixed(1)}%</TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default CategoryReportPage;
