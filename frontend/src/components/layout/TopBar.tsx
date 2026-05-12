import { useAuthStore } from '../../features/auth/store/authStore';
import { Bell } from 'lucide-react';

interface Props { title: string; }

export default function TopBar({ title }: Props) {
  const { user } = useAuthStore();
  const initials = user ? (user.firstName[0] + user.lastName[0]).toUpperCase() : '??';

  return (
    <header className="topbar">
      <h1 className="topbar-title">{title}</h1>
      <div className="topbar-actions">
        <button className="btn btn-icon btn-ghost"><Bell size={18} /></button>
        <div className="topbar-user">
          <div className="topbar-avatar">{initials}</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{user?.firstName} {user?.lastName}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
