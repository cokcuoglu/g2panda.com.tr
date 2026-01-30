
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface TrendData {
    report_date: string;
    daily_income: number;
    daily_expense: number;
    daily_net_profit: number;
}

interface TrendChartProps {
    data: TrendData[];
    className?: string;
}

export function TrendChart({ data, className }: TrendChartProps) {
    const [showNetProfit, setShowNetProfit] = useState(false);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg text-sm">
                    <p className="font-medium text-slate-700 mb-2">{new Date(label).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span className="text-slate-500 capitalize">{entry.name}:</span>
                            <span className={cn("font-semibold ml-auto",
                                entry.name === 'Income' ? 'text-emerald-600' :
                                    entry.name === 'Expense' ? 'text-rose-600' : 'text-slate-700'
                            )}>
                                {Number(entry.value).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} TL
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <Card className={cn("border-none shadow-sm bg-white", className)}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium text-slate-800">Financial Trends</CardTitle>
                <div className="flex items-center gap-2">
                    {/* Toggle could go here if needed, for simplified view just showing legend mostly works */}
                    <button
                        onClick={() => setShowNetProfit(!showNetProfit)}
                        className={cn(
                            "text-xs px-2 py-1 rounded transition-colors border",
                            showNetProfit ? "bg-slate-100 text-slate-900 border-slate-200" : "text-slate-500 border-transparent hover:bg-slate-50"
                        )}
                    >
                        {showNetProfit ? 'Hide Net Profit' : 'Show Net Profit'}
                    </button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis
                                dataKey="report_date"
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return `${date.getDate()}/${date.getMonth() + 1}`;
                                }}
                                tick={{ fontSize: 11, fill: '#64748b' }}
                                axisLine={false}
                                tickLine={false}
                                dy={10}
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: '#64748b' }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(value) => `${value}`}
                                dx={-10}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                            <Legend
                                verticalAlign="top"
                                height={36}
                                iconType="circle"
                                wrapperStyle={{ fontSize: '12px', color: '#64748b' }}
                            />

                            <Bar
                                dataKey="daily_income"
                                name="Income"
                                fill="#10b981"
                                radius={[4, 4, 0, 0]}
                                maxBarSize={40}
                            />
                            <Bar
                                dataKey="daily_expense"
                                name="Expense"
                                fill="#f43f5e"
                                radius={[4, 4, 0, 0]}
                                maxBarSize={40}
                            />
                            {showNetProfit && (
                                <Line
                                    type="monotone"
                                    dataKey="daily_net_profit"
                                    name="Net Profit"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            )}
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
