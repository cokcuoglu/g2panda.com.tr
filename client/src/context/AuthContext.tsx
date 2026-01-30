import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

interface User {
    id?: string;
    role: 'owner' | 'accountant' | 'staff';
    email?: string;
    full_name?: string;
    business_name?: string;
    business_logo_url?: string;
    permissions?: string[];
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    isLoading: boolean;
    hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Simple JWT decode without external library
    const parseJwt = (token: string): any => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    };

    const fetchUserPermissions = async () => {
        try {
            // Fetch full user profile including permissions
            const response = await axios.get('/api/users/me');
            const userData = response.data.data;

            // Merge with existing user data or create new
            setUser(prev => ({
                ...prev,
                role: userData.role || prev?.role || 'owner',
                email: userData.email || prev?.email,
                full_name: userData.full_name || prev?.full_name,
                business_name: userData.business_name || prev?.business_name,
                business_logo_url: userData.business_logo_url || prev?.business_logo_url,
                permissions: userData.permissions || []
            }));
        } catch (error) {
            console.error("Failed to fetch user permissions", error);
            // Fallback: Assign permissions based on role if backend fails (MVP safety)
            setUser(prev => {
                if (!prev) return null;
                const role = (prev.role || 'owner').toLowerCase();

                const rolePermissions: Record<string, string[]> = {
                    owner: ['transactions.read', 'transactions.write', 'reports.read', 'reports.export', 'settings.read', 'settings.write'],
                    accountant: ['transactions.read', 'transactions.write', 'reports.read', 'reports.export'],
                    staff: ['transactions.read', 'transactions.write']
                };
                return {
                    ...prev,
                    permissions: rolePermissions[role] || []
                };
            });
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setToken(storedToken);
                axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

                const decoded = parseJwt(storedToken);
                // Initial optimistic set from token
                setUser({ id: decoded?.id, role: decoded?.role || 'owner', email: decoded?.email, permissions: [] });

                // Fetch authoritative permissions
                await fetchUserPermissions();
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    // Axios interceptor to handle 401s globally
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    logout();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    const login = async (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

        const decoded = parseJwt(newToken);
        setUser({ id: decoded?.id, role: decoded?.role || 'owner', email: decoded?.email, permissions: [] });
        await fetchUserPermissions();
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    const hasPermission = (permission: string): boolean => {
        if (!user || !user.permissions) return false;
        // Owners and Superadmins implicitly have all permissions
        if (user.role && (user.role.toLowerCase() === 'owner' || user.role.toLowerCase() === 'superadmin')) return true;
        return user.permissions.includes(permission);
    };

    return (
        <AuthContext.Provider value={{
            token,
            user,
            isAuthenticated: !!token,
            login,
            logout,
            isLoading,
            hasPermission
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
