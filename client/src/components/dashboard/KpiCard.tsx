
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface KpiCardProps {
    title: string;
    value: number;
    type: 'income' | 'expense' | 'net';
    icon: LucideIcon;
    trend?: number; // Optional trend percentage for future use
    description?: string;
}

export function KpiCard({ title, value, type, icon: Icon, description }: KpiCardProps) {
    const isPositive = value >= 0;

    // Color Logic
    let valueColor = 'text-slate-900';
    let iconColor = 'text-slate-500';
    let iconBg = 'bg-slate-50';

    if (type === 'income') {
        valueColor = 'text-emerald-600';
        iconColor = 'text-emerald-600';
        iconBg = 'bg-emerald-50';
    } else if (type === 'expense') {
        valueColor = 'text-rose-600';
        iconColor = 'text-rose-600';
        iconBg = 'bg-rose-50';
    } else if (type === 'net') {
        valueColor = isPositive ? 'text-emerald-600' : 'text-rose-600';
        iconColor = isPositive ? 'text-emerald-600' : 'text-rose-600';
        iconBg = isPositive ? 'bg-emerald-50' : 'bg-rose-50';
    }

    return (
        <Card className="border-none shadow-sm bg-white overflow-hidden relative group hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                    {title}
                </CardTitle>
                <div className={cn("p-2 rounded-full transition-colors", iconBg)}>
                    <Icon className={cn("h-4 w-4", iconColor)} />
                </div>
            </CardHeader>
            <CardContent>
                <div className={cn("text-3xl font-bold tracking-tight mb-1", valueColor)}>
                    {type === 'net' ? (value < 0 ? '-' : '+') : (type === 'income' ? '+' : '-')}
                    {Math.abs(value).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                    <span className="text-lg font-medium text-slate-400 ml-1">TL</span>
                </div>
                {description && (
                    <p className="text-xs text-slate-500 mt-1">
                        {description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
