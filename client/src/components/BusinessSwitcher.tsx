import { ChevronsUpDown, Building2, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useBusiness } from "@/context/BusinessContext"
import { useState } from "react"

export function BusinessSwitcher({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const { businesses, activeBusiness, switchBusiness } = useBusiness()
    const [open, setOpen] = useState(false)

    // Example placeholder for creating a new business dialog in future
    const handleCreateBusiness = () => {
        alert("Create Business feature coming soon!");
    }

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a business"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <Building2 className="mr-2 h-4 w-4" />
                    {activeBusiness?.name || "Select Business"}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
                <DropdownMenuLabel>My Businesses</DropdownMenuLabel>
                <DropdownMenuGroup>
                    {businesses.map((business) => (
                        <DropdownMenuItem
                            key={business.id}
                            onSelect={() => {
                                switchBusiness(business.id)
                                setOpen(false)
                            }}
                            className="text-sm"
                        >
                            <div className="flex flex-col">
                                <span className="font-medium">{business.name}</span>
                                {business.id === activeBusiness?.id && (
                                    <span className="text-xs text-green-600">Active</span>
                                )}
                            </div>
                            {business.id === activeBusiness?.id && (
                                <CheckIcon className="ml-auto h-4 w-4" />
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleCreateBusiness}>
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Business
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}
