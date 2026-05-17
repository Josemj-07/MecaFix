import { useEffect, useState } from 'react';
import { quotesApi } from '../../shared/api';
import type { Quote } from '../../../domain/models';
import { ArrowRight, Trash2 } from 'lucide-react';

export default function QuotesPage() {
  const [items, setItems] = useState<Quote[]>([]);
  const load = () => { quotesApi.getAll().then(r => setItems(r.data)); };
  useEffect(() => { load(); }, []);

  const convert = async (id: string | number) => { if(confirm('¿Convertir a orden?')){ await quotesApi.convert(id); load(); } };
  const del = async (id: string | number) => { if(confirm('¿Rechazar cotización?')){ await quotesApi.delete(id); load(); } };

  return (
    <div>
      <div className="page-header"><div><h1 className="page-title">Cotizaciones</h1></div></div>
      <div className="table-container"><table className="table"><thead><tr><th>#</th><th>Cliente</th><th>Vehículo</th><th>Total Est.</th><th>Estado</th><th>Fecha</th><th>Acciones</th></tr></thead><tbody>
        {items.map(q=><tr key={q.id}>
          <td style={{fontWeight:700,color:'var(--accent)'}}>#{q.id}</td>
          <td style={{fontWeight:600,color:'var(--text-primary)'}}>{q.customerName}</td>
          <td>{q.vehicleInfo}</td>
          <td style={{fontWeight:600}}>${q.totalEstimated?.toFixed(2)}</td>
          <td>{q.convertedToOrder?<span className="badge badge-success">Convertida</span>:<span className="badge badge-warning">Pendiente</span>}</td>
          <td>{new Date(q.createdAt).toLocaleDateString()}</td>
          <td><div style={{display:'flex',gap:4}}>
            {!q.convertedToOrder&&<button className="btn btn-sm btn-primary" onClick={()=>convert(q.id)}><ArrowRight size={14}/> Convertir</button>}
            <button className="btn btn-icon btn-ghost btn-sm" style={{color:'var(--danger)'}} onClick={()=>del(q.id)}><Trash2 size={14}/></button>
          </div></td>
        </tr>)}
        {!items.length&&<tr><td colSpan={7} className="empty-state">Sin cotizaciones</td></tr>}
      </tbody></table></div>
    </div>
  );
}
