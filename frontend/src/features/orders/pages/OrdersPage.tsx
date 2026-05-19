import { useEffect, useState, Fragment } from 'react';
import { ordersApi, paymentsApi } from '../../shared/api';
import type { ServiceOrder } from '../../../domain/models';
import { Play, CheckCircle, Eye, ChevronDown, ChevronUp, CreditCard, ArrowRight, Wrench, Clock, Truck } from 'lucide-react';

const statusBadge: Record<string, { class: string; label: string; icon?: any }> = {
  CREATED: { class: 'badge-warning', label: 'Creada' },
  IN_PROGRESS: { class: 'badge-info', label: 'En Progreso' },
  FINALIZED: { class: 'badge-success', label: 'Finalizada' },
  DELIVERED: { class: 'badge-primary', label: 'Entregada' },
  CANCELED: { class: 'badge-danger', label: 'Cancelada' },
};

const taskStatusBadge = (status: string) => {
  switch (status) {
    case 'PENDING': return <span className="badge badge-warning">Pendiente</span>;
    case 'IN_PROGRESS': return <span className="badge badge-info">En Progreso</span>;
    case 'FINISHED': return <span className="badge badge-success">Finalizada</span>;
    default: return <span className="badge badge-primary">{status}</span>;
  }
};

interface OrderDetail {
  id: string;
  quoteId: string;
  orderStatus: string;
  creationDate: string;
  tasks?: Array<{ id: string; serviceName: string; status: string; mechanicName?: string }>;
}

export default function OrdersPage() {
  const [items, setItems] = useState<ServiceOrder[]>([]);
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [showPayModal, setShowPayModal] = useState(false);
  const [payOrderId, setPayOrderId] = useState('');
  const [payForm, setPayForm] = useState({ amount: '', method: 'CASH' });
  const [payLoading, setPayLoading] = useState(false);
  const [paidOrderIds, setPaidOrderIds] = useState<string[]>([]);

  const load = () => {
    ordersApi.getAll().then(r => setItems(r.data));
    paymentsApi.getAll().then(r => {
      const ids = (r.data || []).map((p: any) => String(p.serviceOrderId));
      setPaidOrderIds(ids);
    }).catch(() => {});
  };
  useEffect(() => { load(); }, []);

  const filtered = filterStatus
    ? items.filter(o => o.status === filterStatus)
    : items;

  const advanceStatus = async (id: string | number) => {
    try {
      await ordersApi.advanceStatus(id);
      load();
      if (expandedId === id) loadDetail(id);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al avanzar el estado');
    }
  };

  const toggleDetail = async (id: string | number) => {
    if (expandedId === id) {
      setExpandedId(null);
      setOrderDetail(null);
    } else {
      setExpandedId(id);
      await loadDetail(id);
    }
  };

  const loadDetail = async (id: string | number) => {
    setLoadingDetail(true);
    try {
      const res = await ordersApi.getById(id);
      setOrderDetail(res.data as any);
    } catch { setOrderDetail(null); }
    finally { setLoadingDetail(false); }
  };

  const handleStartTask = async (orderId: string | number, taskId: string) => {
    try {
      await ordersApi.startTask(orderId, taskId);
      loadDetail(orderId);
      load();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al iniciar tarea');
    }
  };

  const handleCompleteTask = async (orderId: string | number, taskId: string) => {
    try {
      await ordersApi.completeTask(orderId, taskId);
      loadDetail(orderId);
      load();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al completar tarea');
    }
  };

  const openPayModal = (order: any) => {
    setPayOrderId(order.id as string);
    setPayForm({ amount: String(order.totalCost || 0), method: 'CASH' });
    setShowPayModal(true);
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setPayLoading(true);
    try {
      const res = await paymentsApi.register({
        serviceOrderId: payOrderId,
        amount: Number(payForm.amount),
        method: payForm.method,
      });
      setShowPayModal(false);
      alert(`Pago registrado exitosamente.\n\nID de Pago: ${res.data.id}\n(Copia este ID para consultarlo en la sección de Pagos)`);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al registrar el pago');
    } finally { setPayLoading(false); }
  };

  const shortId = (id: string) => id?.substring(0, 8) || '';

  const advanceButtonLabel = (status: string) => {
    switch (status) {
      case 'CREATED': return { label: 'Iniciar', icon: <Play size={14} /> };
      case 'IN_PROGRESS': return { label: 'Finalizar', icon: <CheckCircle size={14} /> };
      case 'FINALIZED': return { label: 'Entregar', icon: <Truck size={14} /> };
      default: return null;
    }
  };

  // Summary stats
  const stats = {
    total: items.length,
    created: items.filter(o => o.status === 'CREATED').length,
    inProgress: items.filter(o => o.status === 'IN_PROGRESS').length,
    finalized: items.filter(o => o.status === 'FINALIZED').length,
    delivered: items.filter(o => o.status === 'DELIVERED').length,
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Órdenes de Servicio</h1>
          <p className="page-subtitle">{items.length} órdenes</p>
        </div>
      </div>

      {/* Stats summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Creadas', value: stats.created, color: '#f59e0b', icon: <Clock size={18} /> },
          { label: 'En Progreso', value: stats.inProgress, color: '#3b82f6', icon: <Wrench size={18} /> },
          { label: 'Finalizadas', value: stats.finalized, color: '#10b981', icon: <CheckCircle size={18} /> },
          { label: 'Entregadas', value: stats.delivered, color: '#8b5cf6', icon: <Truck size={18} /> },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
            padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12
          }}>
            <div style={{ color: s.color, opacity: 0.8 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="filter-row" style={{ marginBottom: 16 }}>
        <select className="form-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ width: 200 }}>
          <option value="">Todos los estados</option>
          <option value="CREATED">Creada</option>
          <option value="IN_PROGRESS">En Progreso</option>
          <option value="FINALIZED">Finalizada</option>
          <option value="DELIVERED">Entregada</option>
          <option value="CANCELED">Cancelada</option>
        </select>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr><th></th><th>#</th><th>Cliente</th><th>Vehículo</th><th>Estado</th><th>Total</th><th>Fecha</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <Fragment key={o.id}>
                <tr>
                  <td style={{ width: 40, cursor: 'pointer' }} onClick={() => toggleDetail(o.id)}>
                    {expandedId === o.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--accent)', fontFamily: 'monospace', fontSize: '0.85rem' }}>#{shortId(String(o.id as any))}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{o.customerName}</td>
                  <td>{o.vehicleInfo}</td>
                  <td><span className={`badge ${statusBadge[o.status]?.class || 'badge-primary'}`}>{statusBadge[o.status]?.label || o.status}</span></td>
                  <td style={{ fontWeight: 600 }}>${o.totalCost?.toFixed(2) || '0.00'}</td>
                  <td>{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : '—'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {/* Advance status button */}
                      {advanceButtonLabel(o.status) && (
                        <button className="btn btn-sm btn-primary" onClick={() => advanceStatus(o.id)} title="Avanzar Estado">
                          {advanceButtonLabel(o.status)!.icon} {advanceButtonLabel(o.status)!.label}
                        </button>
                      )}
                      {/* Pay button for finalized/delivered orders */}
                      {(o.status === 'FINALIZED' || o.status === 'DELIVERED') && !paidOrderIds.includes(String(o.id as any)) && (
                        <button className="btn btn-sm btn-success" onClick={() => openPayModal(o)} title="Registrar Pago">
                          <CreditCard size={14} /> Pagar
                        </button>
                      )}
                      <button className="btn btn-sm btn-ghost" onClick={() => toggleDetail(o.id)} title="Ver detalle">
                        <Eye size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedId === o.id && (
                  <tr key={`${o.id}-detail`}>
                    <td colSpan={8} style={{ padding: 0, background: 'var(--bg-secondary)' }}>
                      <div style={{ padding: '16px 24px' }}>
                        {/* Order info */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
                          <div>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>ID Completo</span>
                            <div style={{ fontWeight: 600, fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-primary)' }}>{o.id}</div>
                          </div>
                          <div>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Cliente</span>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{o.customerName}</div>
                          </div>
                          <div>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Vehículo</span>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{o.vehicleInfo}</div>
                          </div>
                          <div>
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Total</span>
                            <div style={{ fontWeight: 700, color: 'var(--success)', fontSize: '1.1rem' }}>${o.totalCost?.toFixed(2) || '0.00'}</div>
                          </div>
                        </div>

                        {loadingDetail ? (
                          <div style={{ color: 'var(--text-muted)', padding: 12 }}>Cargando detalle...</div>
                        ) : orderDetail?.tasks && orderDetail.tasks.length > 0 ? (
                          <div>
                            <h4 style={{ marginBottom: 12, color: 'var(--text-primary)', fontWeight: 700 }}>Tareas de la Orden</h4>
                            <table className="table" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
                              <thead><tr><th>Servicio</th><th>Mecánico</th><th>Estado</th><th>Acciones</th></tr></thead>
                              <tbody>
                                {orderDetail.tasks.map(t => (
                                  <tr key={t.id}>
                                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.serviceName || '—'}</td>
                                    <td>{t.mechanicName || 'Sin asignar'}</td>
                                    <td>{taskStatusBadge(t.status)}</td>
                                    <td>
                                      <div style={{ display: 'flex', gap: 4 }}>
                                        {t.status === 'PENDING' && (
                                          <button className="btn btn-sm btn-primary" onClick={() => handleStartTask(o.id, t.id)}>
                                            <Play size={12} /> Iniciar
                                          </button>
                                        )}
                                        {t.status === 'IN_PROGRESS' && (
                                          <button className="btn btn-sm btn-success" onClick={() => handleCompleteTask(o.id, t.id)}>
                                            <CheckCircle size={12} /> Completar
                                          </button>
                                        )}
                                        {t.status === 'FINISHED' && (
                                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>✓ Finalizada</span>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div style={{ color: 'var(--text-muted)', padding: 12, background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                            {orderDetail ? 'Esta orden aún no tiene tareas asignadas' : 'No se pudo cargar el detalle'}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
            {!filtered.length && <tr><td colSpan={8} className="empty-state">Sin órdenes</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Pay Modal */}
      {showPayModal && (
        <div className="modal-overlay" onClick={() => setShowPayModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Registrar Pago</h2>
              <button className="modal-close" onClick={() => setShowPayModal(false)}>✕</button>
            </div>
            <form onSubmit={handlePay} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Orden de Servicio</label>
                <input className="form-input" value={`#${shortId(payOrderId)}`} disabled style={{ opacity: 0.7 }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Monto a Pagar</label>
                  <input className="form-input" type="number" step="0.01" min="0.01"
                    value={payForm.amount} disabled style={{ opacity: 0.7, fontWeight: 'bold' }}
                    required placeholder="0.00" />
                </div>
                <div className="form-group">
                  <label className="form-label">Método de Pago</label>
                  <select className="form-select" value={payForm.method} onChange={e => setPayForm(p => ({ ...p, method: e.target.value }))}>
                    <option value="CASH">Efectivo</option>
                    <option value="TRANSFER">Transferencia</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowPayModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={payLoading}>
                  {payLoading ? 'Procesando...' : 'Registrar Pago'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
