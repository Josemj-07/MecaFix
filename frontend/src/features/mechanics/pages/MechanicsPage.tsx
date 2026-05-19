import { useEffect, useState, type FormEvent } from 'react';
import { mechanicsApi } from '../../shared/api';
import { Plus, Search, Wrench, Mail, Phone, Eye } from 'lucide-react';

interface Mechanic {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
}

const SPECIALTIES = [
  { label: 'Motor', value: 'ENGINE' },
  { label: 'Frenos', value: 'BRAKES' },
  { label: 'Eléctrico', value: 'ELECTRICAL' },
  { label: 'Suspensión', value: 'SUSPENSION' },
  { label: 'General', value: 'GENERAL' },
];

const specialtyLabel = (value: string) => SPECIALTIES.find(s => s.value === value)?.label || value;

export default function MechanicsPage() {
  const [items, setItems] = useState<Mechanic[]>([]);
  const [search, setSearch] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', dni: '', specialty: '' });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      if (filterSpecialty) {
        const res = await mechanicsApi.getBySpecialty(filterSpecialty);
        setItems(res.data);
      } else {
        const res = await mechanicsApi.getAll();
        setItems(res.data);
      }
    } catch { setItems([]); }
  };

  useEffect(() => { load(); }, [filterSpecialty]);

  const filtered = items.filter(m =>
    `${m.firstName} ${m.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    m.email?.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setForm({ firstName: '', lastName: '', email: '', phone: '', dni: '', specialty: '' });
    setShowModal(true);
  };

  const viewMechanic = async (id: string) => {
    try {
      const res = await mechanicsApi.getById(id);
      const data = res.data;
      setSelectedMechanic({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.mobilePhone,
        specialty: data.specialty,
      });
      setShowViewModal(true);
    } catch (err) {
      console.error('Error fetching mechanic details', err);
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await mechanicsApi.create(form);
      setShowModal(false);
      load();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al registrar mecánico');
    } finally { setLoading(false); }
  };

  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [f]: e.target.value }));

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Mecánicos</h1>
          <p className="page-subtitle">{items.length} mecánicos registrados</p>
        </div>
        <button className="btn btn-primary" onClick={openNew}><Plus size={18} />Nuevo Mecánico</button>
      </div>

      <div className="filter-row">
        <div className="search-bar" style={{ flex: 1, maxWidth: 400 }}>
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input placeholder="Buscar mecánico..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="form-select" value={filterSpecialty} onChange={e => setFilterSpecialty(e.target.value)} style={{ width: 200 }}>
          <option value="">Todas las especialidades</option>
          {SPECIALTIES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Especialidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => (
              <tr key={m.id}>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 'var(--radius-md)',
                      background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0
                    }}>
                      {m.firstName?.[0]}{m.lastName?.[0]}
                    </div>
                    {m.firstName} {m.lastName}
                  </div>
                </td>
                <td><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={14} style={{ color: 'var(--text-muted)' }} />{m.email || '—'}</div></td>
                <td><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={14} style={{ color: 'var(--text-muted)' }} />{m.phone || '—'}</div></td>
                <td><span className="badge badge-primary"><Wrench size={12} /> {specialtyLabel(m.specialty)}</span></td>
                <td>
                  <button className="btn btn-icon btn-ghost btn-sm" onClick={() => viewMechanic(m.id)} title="Ver detalles">
                    <Eye size={15} />
                  </button>
                </td>
              </tr>
            ))}
            {!filtered.length && <tr><td colSpan={5} className="empty-state">Sin mecánicos registrados</td></tr>}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Nuevo Mecánico</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Nombre</label>
                  <input className="form-input" value={form.firstName} onChange={set('firstName')} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Apellido</label>
                  <input className="form-input" value={form.lastName} onChange={set('lastName')} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" value={form.email} onChange={set('email')} required />
              </div>
              <div className="form-group">
                <label className="form-label">Cédula / DNI</label>
                <input className="form-input" value={form.dni} onChange={set('dni')} required placeholder="Número de identificación" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Teléfono</label>
                  <input className="form-input" value={form.phone} onChange={set('phone')} />
                </div>
                <div className="form-group">
                  <label className="form-label">Especialidad</label>
                  <select className="form-select" value={form.specialty} onChange={set('specialty')} required>
                    <option value="">Seleccionar</option>
                    {SPECIALTIES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Registrando...' : 'Registrar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showViewModal && selectedMechanic && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Detalles del Mecánico</h2>
              <button className="modal-close" onClick={() => setShowViewModal(false)}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: '1rem', flexShrink: 0
                }}>
                  {selectedMechanic.firstName?.[0]}{selectedMechanic.lastName?.[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{selectedMechanic.firstName} {selectedMechanic.lastName}</div>
                  <span className="badge badge-primary" style={{ marginTop: 4 }}><Wrench size={12} /> {specialtyLabel(selectedMechanic.specialty)}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Mail size={14} style={{ color: 'var(--text-muted)' }} />{selectedMechanic.email || '—'}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Teléfono</label>
                  <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Phone size={14} style={{ color: 'var(--text-muted)' }} />{selectedMechanic.phone || '—'}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">ID</label>
                <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 8, fontSize: '0.85rem', fontFamily: 'monospace' }}>{selectedMechanic.id}</div>
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
