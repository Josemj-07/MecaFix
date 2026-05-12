import { useEffect, useState, type FormEvent } from 'react';
import { inventoryApi } from '../api/inventoryApi';
import type { Product, Category } from '../../../domain/models';
import { Plus, Edit2, Trash2, Search, AlertTriangle } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: '', code: '', description: '', categoryId: '', purchasePrice: '', salePrice: '', stock: '0', minStock: '5', unit: 'unidad' });

  const load = () => {
    inventoryApi.getProducts().then(r => setProducts(r.data));
    inventoryApi.getCategories().then(r => setCategories(r.data));
  };
  useEffect(() => { load(); }, []);

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase()));

  const openCreate = () => { setEditing(null); setForm({ name: '', code: '', description: '', categoryId: '', purchasePrice: '', salePrice: '', stock: '0', minStock: '5', unit: 'unidad' }); setShowModal(true); };
  const openEdit = (p: Product) => { setEditing(p); setForm({ name: p.name, code: p.code, description: p.description || '', categoryId: p.categoryId?.toString() || '', purchasePrice: p.purchasePrice?.toString() || '', salePrice: p.salePrice.toString(), stock: p.stock.toString(), minStock: p.minStock.toString(), unit: p.unit || 'unidad' }); setShowModal(true); };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = { name: form.name, code: form.code, description: form.description, categoryId: form.categoryId ? Number(form.categoryId) : undefined, purchasePrice: Number(form.purchasePrice) || 0, salePrice: Number(form.salePrice), stock: Number(form.stock), minStock: Number(form.minStock), unit: form.unit };
    if (editing) await inventoryApi.updateProduct(editing.id, data);
    else await inventoryApi.createProduct(data);
    setShowModal(false); load();
  };

  const handleDelete = async (id: number) => { if (confirm('¿Eliminar producto?')) { await inventoryApi.deleteProduct(id); load(); } };
  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [f]: e.target.value }));

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Productos</h1><p className="page-subtitle">{products.length} productos registrados</p></div>
        <button className="btn btn-primary" onClick={openCreate}><Plus size={18} /> Nuevo Producto</button>
      </div>
      <div className="filter-row">
        <div className="search-bar" style={{ flex: 1, maxWidth: 400 }}>
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input placeholder="Buscar productos..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="table-container">
        <table className="table">
          <thead><tr><th>Código</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>{p.code}</td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</td>
                <td>{p.categoryName || '—'}</td>
                <td>${p.salePrice?.toFixed(2)}</td>
                <td>{p.stock}</td>
                <td>{p.lowStock ? <span className="badge badge-warning"><AlertTriangle size={12} /> Bajo</span> : <span className="badge badge-success">OK</span>}</td>
                <td><div style={{ display: 'flex', gap: 6 }}>
                  <button className="btn btn-icon btn-ghost btn-sm" onClick={() => openEdit(p)}><Edit2 size={15} /></button>
                  <button className="btn btn-icon btn-ghost btn-sm" onClick={() => handleDelete(p.id)} style={{ color: 'var(--danger)' }}><Trash2 size={15} /></button>
                </div></td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={7} className="empty-state">No hay productos</td></tr>}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{editing ? 'Editar Producto' : 'Nuevo Producto'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group"><label className="form-label">Nombre</label><input className="form-input" value={form.name} onChange={set('name')} required /></div>
                <div className="form-group"><label className="form-label">Código</label><input className="form-input" value={form.code} onChange={set('code')} required disabled={!!editing} /></div>
              </div>
              <div className="form-group"><label className="form-label">Descripción</label><textarea className="form-textarea" value={form.description} onChange={set('description')} /></div>
              <div className="form-group"><label className="form-label">Categoría</label>
                <select className="form-select" value={form.categoryId} onChange={set('categoryId')}><option value="">Sin categoría</option>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group"><label className="form-label">Precio Compra</label><input className="form-input" type="number" step="0.01" value={form.purchasePrice} onChange={set('purchasePrice')} /></div>
                <div className="form-group"><label className="form-label">Precio Venta</label><input className="form-input" type="number" step="0.01" value={form.salePrice} onChange={set('salePrice')} required /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div className="form-group"><label className="form-label">Stock</label><input className="form-input" type="number" value={form.stock} onChange={set('stock')} /></div>
                <div className="form-group"><label className="form-label">Stock Mín.</label><input className="form-input" type="number" value={form.minStock} onChange={set('minStock')} /></div>
                <div className="form-group"><label className="form-label">Unidad</label><input className="form-input" value={form.unit} onChange={set('unit')} /></div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">{editing ? 'Actualizar' : 'Crear'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
