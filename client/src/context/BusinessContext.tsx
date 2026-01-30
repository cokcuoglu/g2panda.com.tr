import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

interface Business {
    id: string;
    name: string;
    type?: string;
}

interface BusinessContextType {
    businesses: Business[];
    activeBusiness: Business | null;
    isLoading: boolean;
    switchBusiness: (businessId: string) => Promise<void>;
    fetchBusinesses: () => Promise<void>;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = useAuth();
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [activeBusiness, setActiveBusiness] = useState<Business | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Do not block initial load

    const fetchBusinesses = async () => {
        if (!isAuthenticated) return;

        setIsLoading(true);
        try {
            const response = await axios.get('/api/businesses');
            const businessList = response.data.data || [];
            setBusinesses(businessList);

            // Set active business logic
            if (businessList.length > 0) {
                // If we have a stored active business ID, try to find it
                const storedBusinessId = localStorage.getItem('active_business_id');
                const found = businessList.find((b: Business) => b.id === storedBusinessId);

                if (found) {
                    setActiveBusiness(found);
                } else {
                    // Default to first
                    setActiveBusiness(businessList[0]);
                    localStorage.setItem('active_business_id', businessList[0].id);
                }
            } else {
                setActiveBusiness(null);
            }
        } catch (error) {
            console.error('Error fetching businesses:', error);
            // Mock data for MVP if backend is empty/failing during dev
            if (businesses.length === 0) {
                // Optionally set dummy data or leave empty
            }
        } finally {
            setIsLoading(false);
        }
    };

    const switchBusiness = async (businessId: string) => {
        try {
            const target = businesses.find(b => b.id === businessId);
            if (!target) return;

            // Optimistic UI update
            setActiveBusiness(target);
            localStorage.setItem('active_business_id', target.id);

            // Notify backend to switch session context (if needed)
            await axios.post('/api/businesses/switch', { business_id: businessId });

            // Reload page to refresh all data with new context
            // This is a simple way to ensure all active queries (Dashboard, Settings, etc) strictly obey the new context
            window.location.reload();

        } catch (error) {
            console.error('Error switching business:', error);
            alert('Failed to switch business');
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchBusinesses();
        }
    }, [isAuthenticated]);

    return (
        <BusinessContext.Provider value={{
            businesses,
            activeBusiness,
            isLoading,
            switchBusiness,
            fetchBusinesses
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
