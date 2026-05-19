import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const pageTitles: Record<string, string> = {
  '/products': 'Productos',
  '/categories': 'Categorías',
  '/inventory': 'Inventario',
  '/customers': 'Clientes',
  '/vehicles': 'Vehículos',
  '/services': 'Servicios',
  '/orders': 'Órdenes de Servicio',
  '/quotes': 'Cotizaciones',
  '/payments': 'Pagos',
  '/mechanics': 'Mecánicos',
  '/register': 'Agregar Administrador',
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
