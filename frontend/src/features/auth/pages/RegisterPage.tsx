import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';
import { UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'ADMINISTRATOR' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      await authApi.register(form);
      // Auto-login after register
      const loginRes = await authApi.login(form.email, form.password);
      login(
        {
          id: Number(loginRes.data.id) || 1,
          firstName: loginRes.data.firstName || form.firstName,
          lastName: loginRes.data.lastName || form.lastName,
          email: loginRes.data.email || form.email,
          role: (loginRes.data.role as any) || form.role
        },
        loginRes.data.token
      );
      navigate('/customers');
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Error al registrarse. Puede que el email ya exista.');
    } finally { setLoading(false); }
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(p => ({ ...p, [field]: e.target.value }));

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <div className="auth-brand">
          <div className="auth-brand-icon">MF</div>
          <h1>MecaFix</h1>
          <p>Crear una cuenta nueva</p>
        </div>
        {error && <div className="auth-error">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
              <option value="OWNER">Propietario</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
            <UserPlus size={18} /> {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>
        <div className="auth-footer">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></div>
      </div>
    </div>
  );
}
