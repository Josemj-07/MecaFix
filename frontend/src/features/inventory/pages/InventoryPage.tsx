import { useEffect, useState, type FormEvent } from 'react';
import { inventoryApi } from '../api/inventoryApi';
import type { InventoryMovement, Product } from '../../../domain/models';
import { Plus, ArrowUpCircle, ArrowDownCircle, Settings } from 'lucide-react';

export default function InventoryPage() {
  const [moves, setMoves] = useState<InventoryMovement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ productId: '', type: 'ENTRY', quantity: '', reason: '' });

  const load = () => { inventoryApi.getMovements().then(r => setMoves(r.data)); inventoryApi.getProducts().then(r => setProducts(r.data)); };
  useEffect(() => { load(); }, []);

  const submit = async (e: FormEvent) => { e.preventDefault(); await inventoryApi.createMovement({ productId: form.productId, type: form.type, quantity: Number(form.quantity), reason: form.reason }); setShowModal(false); load(); };
  const typeIcon = (t: string) => t === 'ENTRY' ? <ArrowUpCircle size={16} /> : t === 'EXIT' ? <ArrowDownCircle size={16} /> : <Settings size={16} />;
  const typeClass = (t: string) => t === 'ENTRY' ? 'badge-success' : t === 'EXIT' ? 'badge-danger' : 'badge-info';

  return (
    <div>
      <div className="page-header"><div><h1 className="page-title">Inventario</h1><p className="page-subtitle">Historial de movimientos</p></div>
        <button className="btn btn-primary" onClick={() => { setForm({ productId: '', type: 'ENTRY', quantity: '', reason: '' }); setShowModal(true); }}><Plus size={18}/> Registrar Movimiento</button>
      </div>
      <div className="table-container"><table className="table"><thead><tr><th>Fecha</th><th>Producto</th><th>Tipo</th><th>Cantidad</th><th>Stock Ant.</th><th>Stock Nuevo</th><th>Razón</th><th>Usuario</th></tr></thead><tbody>
        {moves.map(m => <tr key={m.id}>
          <td>{new Date(m.createdAt).toLocaleDateString()}</td><td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{m.productName}</td>
          <td><span className={`badge ${typeClass(m.type)}`}>{typeIcon(m.type)} {m.type}</span></td>
          <td>{m.quantity}</td><td>{m.previousStock}</td><td>{m.newStock}</td><td>{m.reason || '—'}</td><td>{m.userName || '—'}</td>
        </tr>)}
        {!moves.length && <tr><td colSpan={8} className="empty-state">Sin movimientos</td></tr>}
      </tbody></table></div>
      {showModal && <div className="modal-overlay" onClick={() => setShowModal(false)}><div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header"><h2 className="modal-title">Registrar Movimiento</h2><button className="modal-close" onClick={() => setShowModal(false)}>✕</button></div>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group"><label className="form-label">Producto</label><select className="form-select" value={form.productId} onChange={e => setForm(p => ({ ...p, productId: e.target.value }))} required><option value="">Seleccionar</option>{products.map(p => <option key={p.id} value={p.id}>{p.name} ({p.stock})</option>)}</select></div>
          <div className="form-group"><label className="form-label">Tipo</label><select className="form-select" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}><option value="ENTRY">Entrada</option><option value="EXIT">Salida</option><option value="ADJUSTMENT">Ajuste</option></select></div>
          <div className="form-group"><label className="form-label">Cantidad</label><input className="form-input" type="number" min="1" value={form.quantity} onChange={e => setForm(p => ({ ...p, quantity: e.target.value }))} required /></div>
          <div className="form-group"><label className="form-label">Razón</label><input className="form-input" value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} /></div>
          <div className="modal-actions"><button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancelar</button><button type="submit" className="btn btn-primary">Registrar</button></div>
        </form></div></div>}
    </div>
  );
}
