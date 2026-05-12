import { useEffect, useState, type FormEvent } from 'react';
import { vehiclesApi, customersApi } from '../../shared/api';
import type { Vehicle, Customer } from '../../../domain/models';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function VehiclesPage() {
  const [items, setItems] = useState<Vehicle[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [form, setForm] = useState({ customerId: '', brand: '', model: '', year: '', plate: '', color: '', vin: '' });

  const load = () => { vehiclesApi.getAll().then(r => setItems(r.data)); customersApi.getAll().then(r => setCustomers(r.data)); };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm({ customerId: '', brand: '', model: '', year: '', plate: '', color: '', vin: '' }); setShowModal(true); };
  const openEdit = (v: Vehicle) => { setEditing(v); setForm({ customerId: v.customerId.toString(), brand: v.brand, model: v.model, year: v.year?.toString()||'', plate: v.plate, color: v.color||'', vin: v.vin||'' }); setShowModal(true); };
  const submit = async (e: FormEvent) => { e.preventDefault(); const d: Partial<Vehicle> = { ...form, customerId: Number(form.customerId), year: Number(form.year) || undefined }; editing ? await vehiclesApi.update(editing.id, d) : await vehiclesApi.create(d); setShowModal(false); load(); };
  const del = async (id: number) => { if(confirm('¿Eliminar?')){ await vehiclesApi.delete(id); load(); } };
  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => setForm(p => ({ ...p, [f]: e.target.value }));

  return (
    <div>
      <div className="page-header"><div><h1 className="page-title">Vehículos</h1></div><button className="btn btn-primary" onClick={openNew}><Plus size={18}/>Nuevo</button></div>
      <div className="table-container"><table className="table"><thead><tr><th>Placa</th><th>Marca</th><th>Modelo</th><th>Año</th><th>Cliente</th><th>Color</th><th>Acciones</th></tr></thead><tbody>
        {items.map(v=><tr key={v.id}><td style={{fontFamily:'monospace',color:'var(--accent)'}}>{v.plate}</td><td style={{fontWeight:600,color:'var(--text-primary)'}}>{v.brand}</td><td>{v.model}</td><td>{v.year||'—'}</td><td>{v.customerName}</td><td>{v.color||'—'}</td>
          <td><div style={{display:'flex',gap:6}}><button className="btn btn-icon btn-ghost btn-sm" onClick={()=>openEdit(v)}><Edit2 size={15}/></button><button className="btn btn-icon btn-ghost btn-sm" style={{color:'var(--danger)'}} onClick={()=>del(v.id)}><Trash2 size={15}/></button></div></td></tr>)}
        {!items.length&&<tr><td colSpan={7} className="empty-state">Sin vehículos</td></tr>}
      </tbody></table></div>
      {showModal&&<div className="modal-overlay" onClick={()=>setShowModal(false)}><div className="modal-content" onClick={e=>e.stopPropagation()}><div className="modal-header"><h2 className="modal-title">{editing?'Editar':'Nuevo'} Vehículo</h2><button className="modal-close" onClick={()=>setShowModal(false)}>✕</button></div>
        <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:16}}>
          <div className="form-group"><label className="form-label">Cliente</label><select className="form-select" value={form.customerId} onChange={set('customerId')} required><option value="">Seleccionar</option>{customers.map(c=><option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}</select></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}><div className="form-group"><label className="form-label">Marca</label><input className="form-input" value={form.brand} onChange={set('brand')} required/></div><div className="form-group"><label className="form-label">Modelo</label><input className="form-input" value={form.model} onChange={set('model')} required/></div></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}><div className="form-group"><label className="form-label">Placa</label><input className="form-input" value={form.plate} onChange={set('plate')} required/></div><div className="form-group"><label className="form-label">Año</label><input className="form-input" type="number" value={form.year} onChange={set('year')}/></div><div className="form-group"><label className="form-label">Color</label><input className="form-input" value={form.color} onChange={set('color')}/></div></div>
          <div className="modal-actions"><button type="button" className="btn btn-ghost" onClick={()=>setShowModal(false)}>Cancelar</button><button type="submit" className="btn btn-primary">{editing?'Actualizar':'Crear'}</button></div>
        </form></div></div>}
    </div>
  );
}
