import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './features/auth/store/authStore';
import ProtectedRoute from './routes/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import ProductsPage from './features/inventory/pages/ProductsPage';
import CategoriesPage from './features/inventory/pages/CategoriesPage';
import InventoryPage from './features/inventory/pages/InventoryPage';
import CustomersPage from './features/customers/pages/CustomersPage';
import VehiclesPage from './features/vehicles/pages/VehiclesPage';
import ServicesPage from './features/services/pages/ServicesPage';
import OrdersPage from './features/orders/pages/OrdersPage';
import QuotesPage from './features/quotes/pages/QuotesPage';
import PaymentsPage from './features/payments/pages/PaymentsPage';
import MechanicsPage from './features/mechanics/pages/MechanicsPage';

export default function App() {
  const { loadFromStorage } = useAuthStore();
  useEffect(() => { loadFromStorage(); }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/customers" replace />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/quotes" element={<QuotesPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/mechanics" element={<MechanicsPage />} />
            
            {/* Only Owner can register new administrators */}
            <Route element={<ProtectedRoute allowedRoles={['OWNER']} />}>
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Route>
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
