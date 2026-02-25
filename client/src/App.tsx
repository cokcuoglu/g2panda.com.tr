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
const TodaySalesPage = lazy(() => import('@/pages/TodaySalesPage'));

const Users = lazy(() => import('@/pages/Users'));
const IncomePage = lazy(() => import('@/pages/IncomePage'));
const ExpensesPage = lazy(() => import('@/pages/ExpensesPage'));
const AllTransactionsPage = lazy(() => import('@/pages/AllTransactionsPage'));
const CategoryReportPage = lazy(() => import('@/components/reports/CategoryReportPage'));
const PublicMenuPage = lazy(() => import('@/pages/PublicMenuPage'));
const IncomingOrdersPage = lazy(() => import('@/pages/IncomingOrdersPage'));
const CustomersPage = lazy(() => import('@/pages/CustomersPage'));
const TableOrdersPage = lazy(() => import('@/pages/TableOrdersPage'));
// Inventory Management Pages
const RawMaterialsPage = lazy(() => import('@/pages/inventory/RawMaterialsPage'));
const IntermediateProductsPage = lazy(() => import('@/pages/inventory/IntermediateProductsPage'));
const IntermediateRecipePage = lazy(() => import('@/pages/inventory/IntermediateRecipePage'));
const IntermediateProducePage = lazy(() => import('@/pages/inventory/IntermediateProducePage'));
const StockEntriesPage = lazy(() => import('@/pages/inventory/StockEntriesPage'));
const StockStatusPage = lazy(() => import('@/pages/inventory/StockStatusPage'));
// Campaigns are handled via Settings tab now

const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-slate-50/50">
    <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
  </div>
);

import { BusinessProvider } from '@/context/BusinessContext';
import { GlobalOrderMonitor } from '@/components/GlobalOrderMonitor';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BusinessProvider>
          <GlobalOrderMonitor />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Public Menu Route - No Auth Required */}
              <Route path="/menu/:userId" element={<PublicMenuPage />} />
              {/* Gel-Al (Takeaway) QR Route - forces takeaway mode */}
              <Route path="/menu/:userId/takeaway" element={<PublicMenuPage />} />
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
                path="/today-sales"
                element={
                  <ProtectedRoute>
                    <TodaySalesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <IncomingOrdersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tables"
                element={
                  <ProtectedRoute>
                    <TableOrdersPage />
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
              <Route
                path="/customers"
                element={
                  <ProtectedRoute>
                    <CustomersPage />
                  </ProtectedRoute>
                }
              />
              {/* Inventory Management Routes */}
              <Route
                path="/inventory/raw-materials"
                element={
                  <ProtectedRoute>
                    <RawMaterialsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/inventory/intermediate-products"
                element={
                  <ProtectedRoute>
                    <IntermediateProductsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/inventory/intermediate-recipes/:id"
                element={
                  <ProtectedRoute>
                    <IntermediateRecipePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/inventory/produce/:id"
                element={
                  <ProtectedRoute>
                    <IntermediateProducePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/inventory/stock-entries"
                element={
                  <ProtectedRoute>
                    <StockEntriesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/inventory/stock-status"
                element={
                  <ProtectedRoute>
                    <StockStatusPage />
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
