import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Modo Demo: Iniciar sesión automáticamente sin consultar el backend
    login(
      { id: 1, firstName: 'Demo', lastName: 'Admin', email: email || 'admin@mecafix.com', role: 'ADMIN' }, 
      'mock-demo-token-123'
    );
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-card fade-in">
        <div className="auth-brand">
          <div className="auth-brand-icon">MF</div>
          <h1>MecaFix</h1>
          <p>Sistema de Gestión de Taller</p>
        </div>
        {error && <div className="auth-error">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Correo electrónico</label>
            <input className="form-input" type="email" placeholder="Cualquier correo..." value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input className="form-input" type="password" placeholder="Cualquier contraseña..." value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
            <LogIn size={18} /> Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
