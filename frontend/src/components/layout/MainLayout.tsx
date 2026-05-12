import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/products': 'Productos',
  '/categories': 'Categorías',
  '/inventory': 'Movimientos de Inventario',
  '/customers': 'Clientes',
  '/vehicles': 'Vehículos',
  '/services': 'Servicios',
  '/orders': 'Órdenes de Servicio',
  '/quotes': 'Cotizaciones',
  '/payments': 'Pagos',
  '/reports': 'Reportes',
};

export default function MainLayout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'MecaFix';

  return (
    <div>
      <Sidebar />
      <TopBar title={title} />
      <main className="main-content">
        <div className="page-content slide-up">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
