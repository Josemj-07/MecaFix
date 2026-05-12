import { useEffect, useState, type FormEvent } from 'react';
import { inventoryApi } from '../api/inventoryApi';
import type { Category } from '../../../domain/models';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function CategoriesPage() {
  const [items, setItems] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: '', description: '' });

  const load = () => { inventoryApi.getCategories().then(r => setItems(r.data)); };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm({ name: '', description: '' }); setShowModal(true); };
  const openEdit = (c: Category) => { setEditing(c); setForm({ name: c.name, description: c.description || '' }); setShowModal(true); };
  const submit = async (e: FormEvent) => { e.preventDefault(); editing ? await inventoryApi.updateCategory(editing.id, form) : await inventoryApi.createCategory(form); setShowModal(false); load(); };
  const del = async (id: number) => { if(confirm('¿Eliminar?')){ await inventoryApi.deleteCategory(id); load(); } };

  return (
    <div>
      <div className="page-header"><div><h1 className="page-title">Categorías</h1></div><button className="btn btn-primary" onClick={openNew}><Plus size={18}/>Nueva</button></div>
      <div className="table-container"><table className="table"><thead><tr><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr></thead><tbody>
        {items.map(c=><tr key={c.id}><td style={{fontWeight:600,color:'var(--text-primary)'}}>{c.name}</td><td>{c.description||'—'}</td><td><div style={{display:'flex',gap:6}}><button className="btn btn-icon btn-ghost btn-sm" onClick={()=>openEdit(c)}><Edit2 size={15}/></button><button className="btn btn-icon btn-ghost btn-sm" style={{color:'var(--danger)'}} onClick={()=>del(c.id)}><Trash2 size={15}/></button></div></td></tr>)}
        {!items.length&&<tr><td colSpan={3} className="empty-state">Sin categorías</td></tr>}
      </tbody></table></div>
      {showModal&&<div className="modal-overlay" onClick={()=>setShowModal(false)}><div className="modal-content" onClick={e=>e.stopPropagation()}><div className="modal-header"><h2 className="modal-title">{editing?'Editar':'Nueva'} Categoría</h2><button className="modal-close" onClick={()=>setShowModal(false)}>✕</button></div>
        <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:16}}>
          <div className="form-group"><label className="form-label">Nombre</label><input className="form-input" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} required/></div>
          <div className="form-group"><label className="form-label">Descripción</label><textarea className="form-textarea" value={form.description} onChange={e=>setForm(p=>({...p,description:e.target.value}))}/></div>
          <div className="modal-actions"><button type="button" className="btn btn-ghost" onClick={()=>setShowModal(false)}>Cancelar</button><button type="submit" className="btn btn-primary">{editing?'Actualizar':'Crear'}</button></div>
        </form></div></div>}
    </div>
  );
}
