import { useEffect, useState, type FormEvent } from 'react';
import { inventoryApi } from '../api/inventoryApi';
import type { Category } from '../../../domain/models';
import { Plus, Eye } from 'lucide-react';

export default function CategoriesPage() {
  const [items, setItems] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: '', description: '' });

  const load = () => { inventoryApi.getCategories().then(r => setItems(r.data)).catch(() => setItems([])); };
  useEffect(() => { load(); }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    await inventoryApi.createCategory(form);
    setShowModal(false);
    setForm({ name: '', description: '' });
    load();
  };

  const viewCategory = async (id: string | number) => {
    try {
      const response = await inventoryApi.getCategory(id);
      setSelectedCategory(response.data);
      setShowViewModal(true);
    } catch (error) {
      console.error("Error fetching category", error);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Categorías</h1><p className="page-subtitle">{items.length} categorías</p></div>
        <button className="btn btn-primary" onClick={() => { setForm({ name: '', description: '' }); setShowModal(true); }}><Plus size={18} />Nueva</button>
      </div>
      <div className="table-container">
        <table className="table">
          <thead><tr><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr></thead>
          <tbody>
            {items.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</td>
                <td>{c.description || '—'}</td>
                <td>
                  <button className="btn btn-ghost" onClick={() => viewCategory(c.id)} title="Ver detalles">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {!items.length && <tr><td colSpan={3} className="empty-state">Sin categorías</td></tr>}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Nueva Categoría</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group"><label className="form-label">Nombre</label><input className="form-input" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required /></div>
              <div className="form-group"><label className="form-label">Descripción</label><textarea className="form-textarea" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} /></div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Crear</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showViewModal && selectedCategory && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Detalles de Categoría</h2>
              <button className="modal-close" onClick={() => setShowViewModal(false)}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
              <div className="form-group">
                <label className="form-label">ID</label>
                <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 8 }}>{selectedCategory.id}</div>
              </div>
              <div className="form-group">
                <label className="form-label">Nombre</label>
                <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 8, fontWeight: 500 }}>{selectedCategory.name}</div>
              </div>
              {selectedCategory.description && (
                <div className="form-group">
                  <label className="form-label">Descripción</label>
                  <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 8 }}>{selectedCategory.description}</div>
                </div>
              )}
              <div className="modal-actions" style={{ marginTop: 8 }}>
                <button type="button" className="btn btn-primary" onClick={() => setShowViewModal(false)}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
