import { useState, type FormEvent } from 'react';
import { authApi } from '../api/authApi';
import { UserPlus, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'ADMINISTRATOR' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await authApi.register(form);
      setSuccess('¡Usuario registrado con éxito en el sistema!');
      setForm({ firstName: '', lastName: '', email: '', password: '', role: 'ADMINISTRATOR' });
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Error al registrar el usuario.');
    } finally {
      setLoading(false);
    }
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(p => ({ ...p, [field]: e.target.value }));

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 0' }}>
      <div className="page-header" style={{ marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Agregar Administrador</h1>
          <p className="page-subtitle">Registra nuevos miembros del equipo y asigna sus roles.</p>
        </div>
      </div>

      <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {error && <div className="auth-error" style={{ marginBottom: 0 }}>{error}</div>}
        {success && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: 8, color: 'var(--success)', backgroundColor: 'var(--success-bg)', fontWeight: 500 }}>
            <CheckCircle2 size={18} /> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input className="form-input" placeholder="Juan" value={form.firstName} onChange={set('firstName')} required />
            </div>
            <div className="form-group">
              <label className="form-label">Apellido</label>
              <input className="form-input" placeholder="Pérez" value={form.lastName} onChange={set('lastName')} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="correo@ejemplo.com" value={form.email} onChange={set('email')} required />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input className="form-input" type="password" placeholder="Mínimo 6 caracteres" value={form.password} onChange={set('password')} required minLength={6} />
          </div>
          <div className="form-group">
            <label className="form-label">Rol</label>
            <select className="form-select" value={form.role} onChange={set('role')}>
              <option value="ADMINISTRATOR">Administrador</option>
              <option value="OWNER">Propietario (General)</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: 12, padding: '12px' }}>
            <UserPlus size={18} /> {loading ? 'Registrando...' : 'Registrar Miembro'}
          </button>
        </form>
      </div>
    </div>
  );
}
