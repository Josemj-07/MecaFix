import { useEffect, useState, type FormEvent } from 'react';
import { customersApi } from '../../shared/api';
import type { Customer } from '../../../domain/models';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

export default function CustomersPage() {
  const [items, setItems] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', dni: '' });

  const load = () => { customersApi.getAll().then(r => setItems(r.data)); };
  useEffect(() => { load(); }, []);
  const filtered = items.filter(c => `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()));

  const openNew = () => { setEditing(null); setForm({ firstName: '', lastName: '', email: '', phone: '', dni: '' }); setShowModal(true); };
  const openEdit = (c: Customer) => { setEditing(c); setForm({ firstName: c.firstName, lastName: c.lastName, email: c.email || '', phone: c.phone || '', dni: c.dni || '' }); setShowModal(true); };
  const submit = async (e: FormEvent) => { e.preventDefault(); editing ? await customersApi.update(editing.id, form) : await customersApi.create(form); setShowModal(false); load(); };
  const del = async (id: string | number) => { 
    // if(confirm('¿Eliminar?')){ await customersApi.delete(id); load(); } 
    alert('La eliminación de clientes no está habilitada en esta versión.');
  };
  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [f]: e.target.value }));

  return (
    <div>
      <div className="page-header"><div><h1 className="page-title">Clientes</h1><p className="page-subtitle">{items.length} clientes</p></div><button className="btn btn-primary" onClick={openNew}><Plus size={18}/>Nuevo Cliente</button></div>
      <div className="filter-row"><div className="search-bar" style={{flex:1,maxWidth:400}}><Search size={18} style={{color:'var(--text-muted)'}}/><input placeholder="Buscar..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
      <div className="table-container"><table className="table"><thead><tr><th>Nombre</th><th>DNI</th><th>Email</th><th>Teléfono</th><th>Acciones</th></tr></thead><tbody>
        {filtered.map(c=><tr key={c.id}><td style={{fontWeight:600,color:'var(--text-primary)'}}>{c.firstName} {c.lastName}</td><td>{c.dni||'—'}</td><td>{c.email||'—'}</td><td>{c.phone||'—'}</td>
          <td><div style={{display:'flex',gap:6}}><button className="btn btn-icon btn-ghost btn-sm" onClick={()=>openEdit(c)}><Edit2 size={15}/></button><button className="btn btn-icon btn-ghost btn-sm" style={{color:'var(--danger)'}} onClick={()=>del(c.id)}><Trash2 size={15}/></button></div></td></tr>)}
        {!filtered.length&&<tr><td colSpan={5} className="empty-state">Sin clientes</td></tr>}
      </tbody></table></div>
      {showModal&&<div className="modal-overlay" onClick={()=>setShowModal(false)}><div className="modal-content" onClick={e=>e.stopPropagation()}><div className="modal-header"><h2 className="modal-title">{editing?'Editar':'Nuevo'} Cliente</h2><button className="modal-close" onClick={()=>setShowModal(false)}>✕</button></div>
        <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:16}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}><div className="form-group"><label className="form-label">Nombre</label><input className="form-input" value={form.firstName} onChange={set('firstName')} required/></div><div className="form-group"><label className="form-label">Apellido</label><input className="form-input" value={form.lastName} onChange={set('lastName')} required/></div></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}><div className="form-group"><label className="form-label">DNI</label><input className="form-input" value={form.dni} onChange={set('dni')}/></div><div className="form-group"><label className="form-label">Teléfono</label><input className="form-input" value={form.phone} onChange={set('phone')}/></div></div>
          <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={form.email} onChange={set('email')}/></div>
          <div className="modal-actions"><button type="button" className="btn btn-ghost" onClick={()=>setShowModal(false)}>Cancelar</button><button type="submit" className="btn btn-primary">{editing?'Actualizar':'Crear'}</button></div>
        </form></div></div>}
    </div>
  );
}
