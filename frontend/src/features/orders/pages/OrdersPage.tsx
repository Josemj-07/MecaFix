import { useEffect, useState } from 'react';
import { ordersApi } from '../../shared/api';
import type { ServiceOrder } from '../../../domain/models';
import { Plus, Eye, Play, CheckCircle, XCircle } from 'lucide-react';

const statusBadge: Record<string, { class: string; label: string }> = {
  PENDING: { class: 'badge-warning', label: 'Pendiente' },
  IN_PROGRESS: { class: 'badge-info', label: 'En Progreso' },
  COMPLETED: { class: 'badge-success', label: 'Completada' },
  CANCELLED: { class: 'badge-danger', label: 'Cancelada' },
};

export default function OrdersPage() {
  const [items, setItems] = useState<ServiceOrder[]>([]);
  const load = () => { ordersApi.getAll().then(r => setItems(r.data)); };
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string | number, status: string) => { await ordersApi.updateStatus(id, status); load(); };

  return (
    <div>
      <div className="page-header"><div><h1 className="page-title">Órdenes de Servicio</h1><p className="page-subtitle">{items.length} órdenes</p></div></div>
      <div className="table-container"><table className="table"><thead><tr><th>#</th><th>Cliente</th><th>Vehículo</th><th>Mecánico</th><th>Estado</th><th>Total</th><th>Fecha</th><th>Acciones</th></tr></thead><tbody>
        {items.map(o=><tr key={o.id}>
          <td style={{fontWeight:700,color:'var(--accent)'}}>#{o.id}</td>
          <td style={{fontWeight:600,color:'var(--text-primary)'}}>{o.customerName}</td>
          <td>{o.vehicleInfo}</td><td>{o.mechanicName||'Sin asignar'}</td>
          <td><span className={`badge ${statusBadge[o.status]?.class}`}>{statusBadge[o.status]?.label}</span></td>
          <td style={{fontWeight:600}}>${o.totalCost?.toFixed(2)}</td>
          <td>{new Date(o.createdAt).toLocaleDateString()}</td>
          <td><div style={{display:'flex',gap:4}}>
            {o.status==='PENDING'&&<button className="btn btn-sm btn-ghost" onClick={()=>updateStatus(o.id,'IN_PROGRESS')} title="Iniciar"><Play size={14}/></button>}
            {o.status==='IN_PROGRESS'&&<button className="btn btn-sm btn-success" onClick={()=>updateStatus(o.id,'COMPLETED')} title="Completar"><CheckCircle size={14}/></button>}
            {/* {o.status!=='COMPLETED'&&o.status!=='CANCELLED'&&<button className="btn btn-sm btn-ghost" style={{color:'var(--danger)'}} onClick={()=>updateStatus(o.id,'CANCELLED')} title="Cancelar"><XCircle size={14}/></button>} */}
          </div></td>
        </tr>)}
        {!items.length&&<tr><td colSpan={8} className="empty-state">Sin órdenes</td></tr>}
      </tbody></table></div>
    </div>
  );
}
