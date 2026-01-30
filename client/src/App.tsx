import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Loader2 } from 'lucide-react';

const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const SalesMenuPage = lazy(() => import('@/pages/SalesMenuPage'));
const Settings = lazy(() => import('@/pages/Settings'));
const Reports = lazy(() => import('@/pages/Reports'));
const Categories = lazy(() => import('@/pages/Categories'));
const Users = lazy(() => import('@/pages/Users'));
const IncomePage = lazy(() => import('@/pages/IncomePage'));
const ExpensesPage = lazy(() => import('@/pages/ExpensesPage'));
const AllTransactionsPage = lazy(() => import('@/pages/AllTransactionsPage'));
const CategoryReportPage = lazy(() => import('@/components/reports/CategoryReportPage'));
const PublicMenuPage = lazy(() => import('@/pages/PublicMenuPage'));

const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-slate-50/50">
    <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
  </div>
);

import { BusinessProvider } from '@/context/BusinessContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BusinessProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Public Menu Route - No Auth Required */}
              <Route path="/menu/:userId" element={<PublicMenuPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/transactions"
                element={
                  <ProtectedRoute>
                    <AllTransactionsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sales"
                element={
                  <ProtectedRoute>
                    <SalesMenuPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings/:tab?"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <Reports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/income-category"
                element={
                  <ProtectedRoute>
                    <CategoryReportPage type="income" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/expense-category"
                element={
                  <ProtectedRoute>
                    <CategoryReportPage type="expense" />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/categories"
                element={
                  <ProtectedRoute>
                    <Categories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/income"
                element={
                  <ProtectedRoute>
                    <IncomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/expenses"
                element={
                  <ProtectedRoute>
                    <ExpensesPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BusinessProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
