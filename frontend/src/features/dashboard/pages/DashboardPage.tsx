import { useEffect, useState } from 'react';
import { reportsApi } from '../../shared/api';
import type { DashboardData } from '../../../domain/models';
import { Package, AlertTriangle, Users, Car, ClipboardList, Clock, CheckCircle, DollarSign, Wrench } from 'lucide-react';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    reportsApi.getDashboard()
      .then(res => setData(res.data))
      .catch(() => {
        // Modo Demo: Mock data fallback
        setData({
          totalProducts: 124,
          lowStockProducts: 12,
          totalCustomers: 85,
          totalVehicles: 92,
          pendingOrders: 8,
          inProgressOrders: 14,
          completedOrders: 345,
          totalRevenue: 15400.50,
          totalServices: 45
        });
      });
  }, []);

  if (!data) return <div className="empty-state"><div className="empty-state-text">Cargando dashboard...</div></div>;

  const stats = [
    { label: 'Total Productos', value: data.totalProducts, icon: Package, color: 'var(--accent)', bg: 'var(--accent-subtle)' },
    { label: 'Stock Bajo', value: data.lowStockProducts, icon: AlertTriangle, color: 'var(--warning)', bg: 'var(--warning-bg)' },
    { label: 'Clientes', value: data.totalCustomers, icon: Users, color: 'var(--info)', bg: 'var(--info-bg)' },
    { label: 'Vehículos', value: data.totalVehicles, icon: Car, color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
    { label: 'Órdenes Pendientes', value: data.pendingOrders, icon: Clock, color: 'var(--warning)', bg: 'var(--warning-bg)' },
    { label: 'En Progreso', value: data.inProgressOrders, icon: ClipboardList, color: 'var(--accent)', bg: 'var(--accent-subtle)' },
    { label: 'Completadas', value: data.completedOrders, icon: CheckCircle, color: 'var(--success)', bg: 'var(--success-bg)' },
    { label: 'Ingresos Totales', value: `$${Number(data.totalRevenue).toLocaleString()}`, icon: DollarSign, color: 'var(--success)', bg: 'var(--success-bg)' },
    { label: 'Servicios', value: data.totalServices, icon: Wrench, color: '#f472b6', bg: 'rgba(244,114,182,0.1)' },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Resumen general del taller</p>
        </div>
      </div>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-card-icon" style={{ background: s.bg, color: s.color }}><s.icon size={22} /></div>
            <div className="stat-card-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-card-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
