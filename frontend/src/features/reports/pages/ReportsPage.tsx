import { useEffect, useState } from 'react';
import { reportsApi } from '../../shared/api';
import type { DashboardData } from '../../../domain/models';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'];

export default function ReportsPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  useEffect(() => { reportsApi.getDashboard().then(r => setData(r.data)); }, []);

  if (!data) return <div className="empty-state">Cargando...</div>;

  const orderChart = [
    { name: 'Pendientes', value: data.pendingOrders },
    { name: 'En Progreso', value: data.inProgressOrders },
    { name: 'Completadas', value: data.completedOrders },
  ];
  const summaryChart = [
    { name: 'Productos', value: data.totalProducts },
    { name: 'Clientes', value: data.totalCustomers },
    { name: 'Vehículos', value: data.totalVehicles },
    { name: 'Servicios', value: data.totalServices },
  ];

  return (
    <div>
      <div className="page-header"><div><h1 className="page-title">Reportes</h1><p className="page-subtitle">Estadísticas generales</p></div></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div className="card"><div className="card-header"><h3 className="card-title">Estado de Órdenes</h3></div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart><Pie data={orderChart} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({name,value})=>`${name}: ${value}`}>
              {orderChart.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}
            </Pie><Tooltip/></PieChart>
          </ResponsiveContainer>
        </div>
        <div className="card"><div className="card-header"><h3 className="card-title">Resumen General</h3></div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={summaryChart}><XAxis dataKey="name" tick={{fill:'var(--text-secondary)',fontSize:12}}/><YAxis tick={{fill:'var(--text-secondary)',fontSize:12}}/><Tooltip/><Bar dataKey="value" fill="var(--accent)" radius={[6,6,0,0]}/></BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card" style={{marginTop:24}}><div className="card-header"><h3 className="card-title">Ingresos Totales</h3></div>
        <div style={{fontSize:'2.5rem',fontWeight:800,color:'var(--success)'}}>${Number(data.totalRevenue).toLocaleString()}</div>
        <div style={{color:'var(--text-muted)',marginTop:4}}>Stock bajo: {data.lowStockProducts} productos requieren reabastecimiento</div>
      </div>
    </div>
  );
}
