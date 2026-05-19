import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/store/authStore';
import {
  Package, FolderOpen, ArrowLeftRight,
  Users, Car, Wrench, ClipboardList, FileText,
  CreditCard, Contact, LogOut, Settings, UserPlus,
} from 'lucide-react';

const adminLinks = [
  { to: '/products', icon: Package, label: 'Productos' },
  { to: '/categories', icon: FolderOpen, label: 'Categorías' },
  { to: '/inventory', icon: ArrowLeftRight, label: 'Inventario' },
  { to: '/customers', icon: Users, label: 'Clientes' },
  { to: '/vehicles', icon: Car, label: 'Vehículos' },
  { to: '/services', icon: Wrench, label: 'Servicios' },
  { to: '/orders', icon: ClipboardList, label: 'Órdenes' },
  { to: '/quotes', icon: FileText, label: 'Cotizaciones' },
  { to: '/payments', icon: CreditCard, label: 'Pagos' },
  { to: '/mechanics', icon: Contact, label: 'Mecánicos' },
  { to: '/register', icon: UserPlus, label: 'Agregar Admin' },
];

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  let links = adminLinks;
  if (user?.role === 'MECHANIC') {
    links = adminLinks.filter(l => ['/products', '/orders', '/vehicles', '/services', '/customers'].includes(l.to));
  } else if (user?.role !== 'OWNER') {
    links = adminLinks.filter(l => l.to !== '/register');
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">MF</div>
        <span className="sidebar-brand-text">MecaFix</span>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section">Principal</div>
        {links.slice(0, 3).map(link => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
            <link.icon size={18} /> {link.label}
          </NavLink>
        ))}

        <div className="sidebar-section">Gestión</div>
        {links.slice(3).map(link => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
            <link.icon size={18} /> {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-link" onClick={handleLogout} style={{ width: '100%' }}>
          <LogOut size={18} /> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
