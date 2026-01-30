import { useState } from 'react'
import { Sidebar } from "@/components/Sidebar"
import { BusinessSwitcher } from "@/components/BusinessSwitcher"
import { useBusiness } from "@/context/BusinessContext"
import { useAuth } from "@/context/AuthContext"
import { Menu } from 'lucide-react'
import { cn } from "@/lib/utils"

interface LayoutProps {
    children: React.ReactNode
    title: string
    description?: string
    actions?: React.ReactNode
    className?: string
    fullWidth?: boolean
}

export function Layout({ children, title, description, actions, className, fullWidth = false }: LayoutProps) {
    const { isLoading: authLoading } = useAuth();
    const { isLoading: businessLoading } = useBusiness();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (authLoading || businessLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-slate-500 animate-pulse">Loading workspace...</p>
            </div>
        )
    }

    return (
        <div className={cn("flex min-h-screen bg-slate-50 font-sans", className)}>
            <Sidebar
                className="shrink-0"
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <main className="flex-1 overflow-y-auto w-full md:w-auto">
                <div className={cn(
                    "mx-auto space-y-8 p-4 md:p-8",
                    fullWidth ? "max-w-full h-full p-0 md:p-0 space-y-0 flex flex-col" : "max-w-6xl"
                )}>

                    <header className={cn(
                        "flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white shadow-sm border",
                        fullWidth ? "p-4 border-b rounded-none" : "p-4 md:p-6 rounded-lg"
                    )}>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="md:hidden p-1 -ml-1 text-slate-500 hover:bg-slate-100 rounded"
                                >
                                    <Menu className="h-6 w-6" />
                                </button>
                                <h1 className="text-xl md:text-2xl font-bold text-slate-800">{title}</h1>
                                <div className="hidden md:block">
                                    <BusinessSwitcher />
                                </div>
                            </div>
                            <div className="md:hidden mb-2">
                                <BusinessSwitcher />
                            </div>
                            {description && <p className="text-slate-500 text-sm hidden md:block">{description}</p>}
                        </div>
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                            {actions}
                        </div>
                    </header>

                    <div className={cn("space-y-6", fullWidth && "flex-1 overflow-hidden space-y-0 p-4")}>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}
