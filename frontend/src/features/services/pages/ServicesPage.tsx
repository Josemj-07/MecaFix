import { useEffect, useState, type FormEvent } from 'react';
import { servicesApi } from '../../shared/api';
import type { Service } from '../../../domain/models';
import { Plus, Edit2, Eye } from 'lucide-react';

export default function ServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewService, setViewService] = useState<any | null>(null);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState({ name: '', description: '', laborPrice: '' });

  const load = () => { servicesApi.getAll().then(r => setItems(r.data)); };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm({ name: '', description: '', laborPrice: '' }); setShowModal(true); };
  const openEdit = (s: Service) => { setEditing(s); setForm({ name: s.name, description: s.description||'', laborPrice: s.laborPrice?.toString()||'' }); setShowModal(true); };
  const openView = async (id: string | number) => {
    try {
      const res = await servicesApi.getById(id);
      setViewService(res.data);
      setShowViewModal(true);
    } catch (err) {
      console.error('Error fetching service details', err);
    }
  };
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const d: Partial<Service> = { name: form.name, description: form.description, laborPrice: Number(form.laborPrice) };
    try {
      if (editing) {
        await servicesApi.update(editing.id, d);
      } else {
        await servicesApi.create(d);
      }
      setShowModal(false);
      load();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al guardar el servicio.');
    }
  };

  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setForm(p => ({ ...p, [f]: e.target.value }));

  return (
    <div>
      <div className="page-header"><div><h1 className="page-title">Servicios</h1></div><button className="btn btn-primary" onClick={openNew}><Plus size={18}/>Nuevo</button></div>
      <div className="table-container"><table className="table"><thead><tr><th>Nombre</th><th>Descripción</th><th>Precio (Mano Obra)</th><th>Acciones</th></tr></thead><tbody>
        {items.map(s=><tr key={s.id}><td style={{fontWeight:600,color:'var(--text-primary)'}}>{s.name}</td><td>{s.description||'—'}</td><td>${s.laborPrice?.toFixed(2)}</td>
          <td><div style={{display:'flex',gap:6}}>
            <button className="btn btn-icon btn-ghost btn-sm" onClick={()=>openView(s.id)} title="Ver detalles"><Eye size={15}/></button>
            <button className="btn btn-icon btn-ghost btn-sm" onClick={()=>openEdit(s)} title="Editar"><Edit2 size={15}/></button>
          </div></td></tr>)}
        {!items.length&&<tr><td colSpan={4} className="empty-state">Sin servicios</td></tr>}
      </tbody></table></div>
      {showModal&&<div className="modal-overlay" onClick={()=>setShowModal(false)}><div className="modal-content" onClick={e=>e.stopPropagation()}><div className="modal-header"><h2 className="modal-title">{editing?'Editar':'Nuevo'} Servicio</h2><button className="modal-close" onClick={()=>setShowModal(false)}>✕</button></div>
        <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:16}}>
          <div className="form-group"><label className="form-label">Nombre</label><input className="form-input" value={form.name} onChange={set('name')} required disabled={!!editing} /></div>
          <div className="form-group"><label className="form-label">Descripción</label><textarea className="form-textarea" value={form.description} onChange={set('description')}/></div>
          <div className="form-group"><label className="form-label">Precio Mano de Obra</label><input className="form-input" type="number" step="0.01" value={form.laborPrice} onChange={set('laborPrice')} required/></div>
          <div className="modal-actions"><button type="button" className="btn btn-ghost" onClick={()=>setShowModal(false)}>Cancelar</button><button type="submit" className="btn btn-primary">{editing?'Actualizar':'Crear'}</button></div>
        </form></div></div>}
      {showViewModal && viewService && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Detalles del Servicio</h2>
              <button className="modal-close" onClick={() => setShowViewModal(false)}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
              <div className="form-group">
                <label className="form-label">Nombre</label>
                <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 8, fontWeight: 500 }}>{viewService.name}</div>
              </div>
              {viewService.description && (
                <div className="form-group">
                  <label className="form-label">Descripción</label>
                  <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 8 }}>{viewService.description}</div>
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Precio Mano de Obra</label>
                <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 8, fontWeight: 600, color: 'var(--success)' }}>${Number(viewService.laborPrice || 0).toFixed(2)}</div>
              </div>
              <div className="form-group">
                <label className="form-label">ID</label>
                <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 8, fontSize: '0.85rem', fontFamily: 'monospace' }}>{viewService.id}</div>
              </div>
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
