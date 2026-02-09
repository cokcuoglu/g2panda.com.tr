import { useAuth } from '@/context/AuthContext';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Receipt,
    FileText,
    Settings,
    LogOut,
    Tag,
    Users,
    ShoppingCart,
    TrendingUp,
    TrendingDown,
    Utensils,
    QrCode
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ className, isOpen, onClose }: SidebarProps) {
    const { user, logout } = useAuth();
    const location = useLocation();
    const role = (user?.role || 'staff').toLowerCase();

    const menuItems = useMemo(() => [
        { title: 'Özet', icon: LayoutDashboard, href: '/', roles: ['owner', 'accountant', 'staff'] },
        { title: 'Satış Menüsü', icon: ShoppingCart, href: '/sales', roles: ['owner', 'staff'] },
        { title: 'Gelen Siparişler', icon: Receipt, href: '/orders', roles: ['owner', 'staff'] },
        { title: 'Müşteriler', icon: Users, href: '/customers', roles: ['owner', 'staff'] },
        { title: 'Giderler', icon: TrendingDown, href: '/expenses', roles: ['owner', 'accountant'] },
        {
            title: 'Raporlar',
            icon: FileText,
            href: '#', // Parent item, no direct link
            roles: ['owner', 'accountant'],
            children: [
                { title: 'Tüm İşlemler', href: '/transactions', icon: Receipt },
                { title: 'Gelir Raporu', href: '/reports/income-category', icon: TrendingUp },
                { title: 'Gider Raporu', href: '/reports/expense-category', icon: TrendingDown },
                { title: 'Genel Raporlar', href: '/reports', icon: FileText },
            ]
        },


        {
            title: 'Ayarlar',
            icon: Settings,
            href: '#',
            roles: ['owner', 'accountant'],
            children: [
                {
                    title: 'Profil',
                    href: '/settings/profile',
                    icon: Users,
                    roles: ['owner'],
                    children: [
                        { title: 'Riskli Alan', href: '/settings/danger', icon: Tag }, // Using Tag/Shield placeholder if needed
                        { title: 'Tercihler', href: '/settings/preferences', icon: Settings }
                    ]
                },
                { title: 'İşletme', href: '/settings/business', icon: TrendingUp, roles: ['owner'] },
                {
                    title: 'Menü Yönetimi',
                    icon: Utensils,
                    href: '#',
                    roles: ['owner', 'staff'],
                    children: [
                        { title: 'Menü/Ürün', href: '/settings/menu', icon: ShoppingCart },
                        { title: 'Dijital Menü', href: '/settings/qr_menu', icon: QrCode }
                    ]
                },
                // Removed Menü Ürünler from nere
                { title: 'Satış, Ödeme Araçları', href: '/settings/data', icon: Receipt, roles: ['owner'] },
                { title: 'Gelir/Gider Kategorileri', href: '/categories', icon: Tag, roles: ['owner', 'accountant'] },

            ]
        },
    ], []);

    // Filter items based on role, including checking children
    const filteredItems = menuItems.reduce((acc: any[], item) => {
        if (item.roles.includes(role)) {
            if (item.children) {
                const visibleChildren = item.children.filter((child: any) =>
                    !child.roles || child.roles.includes(role)
                );
                if (visibleChildren.length > 0) {
                    acc.push({ ...item, children: visibleChildren });
                }
            } else {
                acc.push(item);
            }
        }
        return acc;
    }, []);

    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
        'Raporlar': true,
        'Ayarlar': true
    });

    const toggleMenu = (title: string) => {
        setOpenMenus(prev => ({ ...prev, [title]: !prev[title] }));
    };

    // Recursive helper to render menu items
    const renderMenuItem = (item: any, depth = 0) => {
        const Icon = item.icon;
        const hasChildren = item.children && item.children.length > 0;

        // Check if self or any child (deep) is active
        const isChildActiveInGroup = hasChildren && item.children.some((child: any) => {
            const checkActive = (c: any): boolean => {
                if (location.pathname === c.href) return true;
                if (c.children) return c.children.some(checkActive);
                return false;
            };
            return checkActive(child);
        });

        const isActive = item.href === '/'
            ? location.pathname === '/'
            : (item.href !== '#' && location.pathname.startsWith(item.href));

        if (hasChildren) {
            const isOpen = openMenus[item.title];
            const paddingLeft = depth * 12 + 12;

            return (
                <div key={item.title} className="space-y-1">
                    <button
                        onClick={() => toggleMenu(item.title)}
                        className={cn(
                            "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-slate-700 hover:bg-slate-50",
                            (isChildActiveInGroup || isActive) && "bg-slate-50 font-medium",
                            depth > 0 && "text-sm"
                        )}
                        style={{ paddingLeft: `${paddingLeft}px` }}
                    >
                        <div className="flex items-center gap-3">
                            <Icon className={cn("h-5 w-5 text-slate-400 group-hover:text-slate-600", (isChildActiveInGroup || isActive) && "text-primary")} />
                            <span>{item.title}</span>
                        </div>
                        <div className={cn("transition-transform duration-200", isOpen && "rotate-180")}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </button>

                    <div className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out space-y-1",
                        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}>
                        {item.children.map((child: any) => renderMenuItem(child, depth + 1))}
                    </div>
                </div>
            );
        }

        const paddingLeft = depth * 12 + 12;

        return (
            <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                    isActive
                        ? "bg-primary/5 text-primary font-semibold shadow-[0_1px_2px_rgba(37,99,235,0.05)]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                    depth > 0 && "text-sm py-2"
                )}
                style={{ paddingLeft: `${paddingLeft}px` }}
            >
                {isActive && (
                    <div className="absolute left-0 w-1 h-5 bg-primary rounded-r-full" />
                )}
                <Icon className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-600",
                    depth > 0 && "h-4 w-4"
                )} />
                <span>{item.title}</span>
            </Link>
        );
    };

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            <aside className={cn(
                "fixed top-0 left-0 bottom-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out md:static md:translate-x-0 flex flex-col h-screen",
                isOpen ? "translate-x-0" : "-translate-x-full",
                className
            )}>
                {/* Brand Logo */}
                <div className="p-6 border-b border-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="h-20 w-20 rounded-lg flex items-center justify-center overflow-hidden">
                            <img
                                src={user?.business_logo_url || "/favicon.png"}
                                alt="Logo"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-800 truncate" title={user?.business_name || 'G2Panda'}>
                            {user?.business_name || 'G2Panda'}
                        </span>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                    {filteredItems.map((item) => renderMenuItem(item))}
                </nav>

                {/* User Info & Logout */}
                < div className="p-4 border-t border-slate-100 bg-slate-50/30" >
                    <div className="flex items-center gap-3 px-3 py-2 mb-3">
                        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600 border border-white shadow-sm overflow-hidden">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-semibold text-slate-800 truncate" title={user?.email}>
                                {user?.email?.split('@')[0]}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">{role}</span>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={logout}
                        className="w-full justify-start text-slate-500 hover:text-red-600 hover:bg-red-50 gap-3 px-3 h-10 rounded-lg"
                    >
                        <LogOut className="h-5 w-5" />
                        <span>Çıkış Yap</span>
                    </Button>
                </div >
            </aside >
        </>
    );
}
