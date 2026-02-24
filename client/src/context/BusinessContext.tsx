import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

interface Business {
    id: string;
    name: string;
    type?: string;
    is_open?: boolean;
}

interface BusinessContextType {
    businesses: Business[];
    activeBusiness: Business | null;
    isOpen: boolean;
    isLoading: boolean;
    switchBusiness: (businessId: string) => Promise<void>;
    fetchBusinesses: () => Promise<void>;
    hasPendingOrders: boolean;
    hasServiceRequests: boolean;
    refreshOrderState: () => Promise<void>;
    setIsOpen: (open: boolean) => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [activeBusiness, setActiveBusiness] = useState<Business | null>(null);
    const [isOpen, setIsOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false); // Do not block initial load

    const fetchBusinesses = async () => {
        if (!isAuthenticated || authLoading) return;

        setIsLoading(true);
        try {
            const response = await axios.get('/api/businesses');
            const businessList = response.data.data || [];
            setBusinesses(businessList);

            // Set active business logic
            if (businessList.length > 0) {
                const storedBusinessId = localStorage.getItem('active_business_id');
                const found = businessList.find((b: Business) => b.id === storedBusinessId);

                if (found) {
                    setActiveBusiness(found);
                    setIsOpen(found.is_open ?? true);
                } else {
                    setActiveBusiness(businessList[0]);
                    setIsOpen(businessList[0].is_open ?? true);
                    localStorage.setItem('active_business_id', businessList[0].id);
                }
            } else {
                setActiveBusiness(null);
            }
        } catch (error) {
            console.error('Error fetching businesses:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const switchBusiness = async (businessId: string) => {
        try {
            const target = businesses.find(b => b.id === businessId);
            if (!target) return;

            setActiveBusiness(target);
            setIsOpen(target.is_open ?? true);
            localStorage.setItem('active_business_id', target.id);

            await axios.post('/api/businesses/switch', { business_id: businessId });
            window.location.reload();

        } catch (error) {
            console.error('Error switching business:', error);
            alert('Failed to switch business');
        }
    };

    useEffect(() => {
        if (isAuthenticated && !authLoading) {
            fetchBusinesses();
        }
    }, [isAuthenticated, authLoading]);

    // Global Monitoring (Orders + Business Status)
    const [hasPendingOrders, setHasPendingOrders] = useState(false);
    const [hasServiceRequests, setHasServiceRequests] = useState(false);

    const refreshOrderState = async () => {
        if (!isAuthenticated || authLoading) return;
        try {
            // Also fetch business status to keep isOpen reactive across tabs
            const [tablesRes, statusRes] = await Promise.all([
                axios.get('/api/tables'),
                axios.get('/api/business-status')
            ]);

            if (statusRes.data.success) {
                setIsOpen(statusRes.data.data.is_open);
            }

            const activeTables = tablesRes.data.data.filter((t: any) => t.status === 'active');
            const foundServiceRequest = tablesRes.data.data.some((t: any) => t.service_request);
            setHasServiceRequests(foundServiceRequest);

            let foundPending = false;
            await Promise.all(activeTables.map(async (table: any) => {
                try {
                    const orderRes = await axios.get(`/api/table-orders/${table.id}`);
                    if (orderRes.data.data) {
                        const order = orderRes.data.data;
                        if (order.status === 'pending' && order.order_type !== 'merchant') {
                            foundPending = true;
                        }
                    }
                } catch (e) { /* ignore */ }
            }));

            setHasPendingOrders(foundPending);
        } catch (err) {
            console.error("Order/Status Check Error:", err);
        }
    };

    useEffect(() => {
        if (!isAuthenticated || authLoading) return;

        refreshOrderState(); // Initial check
        const interval = setInterval(refreshOrderState, 5000); // 5s Interval
        return () => clearInterval(interval);
    }, [isAuthenticated, authLoading]);


    return (
        <BusinessContext.Provider value={{
            businesses,
            activeBusiness,
            isOpen,
            isLoading,
            switchBusiness,
            fetchBusinesses,
            hasPendingOrders,
            hasServiceRequests,
            refreshOrderState,
            setIsOpen
        }}>
            {children}
        </BusinessContext.Provider>
    );
};

export const useBusiness = () => {
    const context = useContext(BusinessContext);
    if (context === undefined) {
        throw new Error('useBusiness must be used within a BusinessProvider');
    }
    return context;
};
