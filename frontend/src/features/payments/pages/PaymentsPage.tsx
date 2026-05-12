import { useEffect, useState } from 'react';
import { paymentsApi } from '../../shared/api';
import type { Payment } from '../../../domain/models';

export default function PaymentsPage() {
  const [items, setItems] = useState<Payment[]>([]);
  useEffect(() => { paymentsApi.getAll().then(r => setItems(r.data)); }, []);

  return (
    <div>
      <div className="page-header"><div><h1 className="page-title">Pagos</h1><p className="page-subtitle">{items.length} transacciones</p></div></div>
      <div className="table-container"><table className="table"><thead><tr><th>ID</th><th>Orden #</th><th>Monto</th><th>Método</th><th>Referencia</th><th>Fecha</th></tr></thead><tbody>
        {items.map(p=><tr key={p.id}>
          <td>{p.id}</td><td style={{fontWeight:700,color:'var(--accent)'}}>#{p.serviceOrderId}</td>
          <td style={{fontWeight:700,color:'var(--success)'}}>${p.amount?.toFixed(2)}</td>
          <td><span className="badge badge-primary">{p.method}</span></td>
          <td>{p.reference||'—'}</td><td>{new Date(p.paidAt).toLocaleDateString()}</td>
        </tr>)}
        {!items.length&&<tr><td colSpan={6} className="empty-state">Sin pagos</td></tr>}
      </tbody></table></div>
    </div>
  );
}
