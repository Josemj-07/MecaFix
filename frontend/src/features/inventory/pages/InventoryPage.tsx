import { useEffect, useState, type FormEvent } from 'react';
import { inventoryApi } from '../api/inventoryApi';
import type { Product } from '../../../domain/models';
import { ArrowUpCircle, ArrowDownCircle, Search } from 'lucide-react';

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ quantity: '', operation: 'INCREASE' });

  const load = () => { inventoryApi.getProducts().then(r => setProducts(r.data)).catch(() => setProducts([])); };
  useEffect(() => { load(); }, []);

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.code?.toLowerCase().includes(search.toLowerCase())
  );

  const openAdjust = (p: Product, op: string) => {
    setSelectedProduct(p);
    setForm({ quantity: '', operation: op });
    setShowModal(true);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    try {
      await inventoryApi.updateProductStock(selectedProduct.id, Number(form.quantity), form.operation);
      setShowModal(false);
      load();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al ajustar stock');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Inventario</h1>
          <p className="page-subtitle">Gestión de stock de productos</p>
        </div>
      </div>

      <div className="filter-row">
        <div className="search-bar" style={{ flex: 1, maxWidth: 400 }}>
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input placeholder="Buscar producto..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr><th>Código</th><th>Producto</th><th>Stock Actual</th><th>Stock Mín.</th><th>Estado</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>{p.code}</td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</td>
                <td style={{ fontWeight: 700, fontSize: '1.05rem' }}>{p.stock} {p.unit || 'und'}</td>
                <td>{p.minStock || '—'}</td>
                <td>
                  {p.stock <= (p.minStock || 0)
                    ? <span className="badge badge-danger">⚠ Crítico</span>
                    : p.stock <= (p.minStock || 0) * 1.5
                      ? <span className="badge badge-warning">Bajo</span>
                      : <span className="badge badge-success">OK</span>
                  }
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-sm btn-success" onClick={() => openAdjust(p, 'INCREASE')} title="Entrada de stock">
                      <ArrowUpCircle size={14} /> Entrada
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => openAdjust(p, 'DECREASE')} title="Salida de stock">
                      <ArrowDownCircle size={14} /> Salida
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length && <tr><td colSpan={6} className="empty-state">Sin productos en inventario</td></tr>}
          </tbody>
        </table>
      </div>

      {showModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {form.operation === 'INCREASE' ? '📦 Entrada de Stock' : '📤 Salida de Stock'}
              </h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', marginBottom: 16 }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedProduct.name}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Stock actual: <strong style={{ color: 'var(--accent)' }}>{selectedProduct.stock}</strong> {selectedProduct.unit || 'und'}
              </div>
            </div>
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Cantidad</label>
                <input className="form-input" type="number" min="1" value={form.quantity}
                  onChange={e => setForm(p => ({ ...p, quantity: e.target.value }))} required
                  placeholder={form.operation === 'INCREASE' ? 'Unidades a ingresar' : 'Unidades a retirar'} />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className={`btn ${form.operation === 'INCREASE' ? 'btn-success' : 'btn-danger'}`}>
                  {form.operation === 'INCREASE' ? 'Registrar Entrada' : 'Registrar Salida'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
