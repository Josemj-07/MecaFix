import { useState, useEffect, type FormEvent } from 'react';
import { paymentsApi, ordersApi } from '../../shared/api';
import { CreditCard, Search, CheckCircle, AlertCircle, TrendingUp, DollarSign, Activity } from 'lucide-react';

interface PaymentResult {
  id: string;
  serviceOrderId: string;
  amountReceived?: number;
  amountToPay?: number;
  changeAmount?: number;
  amount?: number; // fallback
  paymentMethod?: string;
  method?: string; // fallback
  status?: string;
  date?: string;
  createdDate?: string; // fallback
  fullyPaid?: boolean;
  customerName?: string;
}

interface UnpaidOrder {
  id: string;
  customerName: string;
  vehicleInfo: string;
  totalCost: number;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentResult[]>([]);
  const [unpaidOrders, setUnpaidOrders] = useState<UnpaidOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  
  const [registerForm, setRegisterForm] = useState({ 
    serviceOrderId: '', 
    amount: '', 
    method: 'CASH' 
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [methodFilter, setMethodFilter] = useState('ALL');

  const [foundPayment, setFoundPayment] = useState<PaymentResult | null>(null);
  const [searchId, setSearchId] = useState('');
  const [searchError, setSearchError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch all data
  const loadData = async () => {
    setLoading(true);
    try {
      // Load all payments
      const payRes = await paymentsApi.getAll();
      setPayments(payRes.data || []);

      // Load all service orders to filter unpaid finalized/delivered ones
      const orderRes = await ordersApi.getAll();
      const orders = orderRes.data || [];
      
      const paidIds = (payRes.data || []).map((p: any) => String(p.serviceOrderId));
      const unpaid = orders
        .filter((o: any) => (o.status === 'FINALIZED' || o.status === 'DELIVERED') && !paidIds.includes(String(o.id)))
        .map((o: any) => ({
          id: o.id,
          customerName: o.customerName || 'Desconocido',
          vehicleInfo: o.vehicleInfo || 'Sin vehículo',
          totalCost: o.totalCost || 0
        }));
      setUnpaidOrders(unpaid);
    } catch (err) {
      console.error('Error loading payments page data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (!registerForm.serviceOrderId) {
      alert('Por favor selecciona una orden de servicio válida');
      return;
    }
    try {
      const res = await paymentsApi.register({
        serviceOrderId: registerForm.serviceOrderId,
        amount: Number(registerForm.amount),
        method: registerForm.method,
      });
      const newPayment = res.data as PaymentResult;
      setShowRegisterModal(false);
      setSuccessMsg(`Pago registrado exitosamente. ID: #${newPayment.id}`);
      setTimeout(() => setSuccessMsg(''), 5000);
      setRegisterForm({ serviceOrderId: '', amount: '', method: 'CASH' });
      loadData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al registrar el pago');
    }
  };

  const handleSearch = async () => {
    if (!searchId.trim()) return;
    setSearchError('');
    setFoundPayment(null);
    try {
      const res = await paymentsApi.getById(searchId);
      setFoundPayment(res.data as any);
    } catch {
      setSearchError('Pago no encontrado');
    }
  };

  const handleValidate = async (id: string) => {
    try {
      await paymentsApi.validate(id);
      setSuccessMsg(`Pago #${id.substring(0, 8)}... validado exitosamente`);
      setTimeout(() => setSuccessMsg(''), 5000);
      if (foundPayment && foundPayment.id === id) {
        setFoundPayment({ ...foundPayment, status: 'VALIDATED' });
      }
      loadData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al validar el pago');
    }
  };

  // When user selects a service order, automatically fill the amount
  const handleOrderSelect = (orderId: string) => {
    const selected = unpaidOrders.find(o => o.id === orderId);
    setRegisterForm(p => ({
      ...p,
      serviceOrderId: orderId,
      amount: selected ? String(selected.totalCost) : ''
    }));
  };

  // Filtered Payments List
  const filteredPayments = payments.filter(p => {
    const matchesSearch = 
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.customerName && p.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.serviceOrderId.toLowerCase().includes(searchTerm.toLowerCase());

    const statusVal = p.status || 'PENDING';
    const matchesStatus = 
      statusFilter === 'ALL' || 
      (statusFilter === 'PENDING' && statusVal !== 'VALIDATED') ||
      (statusFilter === 'VALIDATED' && statusVal === 'VALIDATED');

    const methodVal = p.paymentMethod || p.method || 'CASH';
    const matchesMethod = methodFilter === 'ALL' || methodFilter === methodVal;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  // Dynamic statistics
  const totalAmountCollected = payments
    .filter(p => p.status === 'VALIDATED')
    .reduce((sum, p) => sum + (p.amountReceived || p.amount || 0), 0);

  const pendingValidationCount = payments.filter(p => p.status !== 'VALIDATED').length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Historial de Pagos</h1>
          <p className="page-subtitle">Registro y validación de comprobantes de pago</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowRegisterModal(true)}>
          <CreditCard size={18} /> Registrar Pago
        </button>
      </div>

      {successMsg && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: 'var(--radius-md)', color: 'var(--success)', backgroundColor: 'var(--success-bg)', fontWeight: 500, marginBottom: 20 }}>
          <CheckCircle size={18} /> {successMsg}
        </div>
      )}

      {/* Stats Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div className="card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ background: 'var(--success-bg)', color: 'var(--success)', borderRadius: '50%', padding: 12 }}>
            <DollarSign size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              ${totalAmountCollected.toFixed(2)}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Monto Recaudado</div>
          </div>
        </div>

        <div className="card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ background: 'var(--warning-bg)', color: 'var(--warning)', borderRadius: '50%', padding: 12 }}>
            <Activity size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {pendingValidationCount}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pendientes por Validar</div>
          </div>
        </div>

        <div className="card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ background: 'var(--primary-bg)', color: 'var(--accent)', borderRadius: '50%', padding: 12 }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {payments.length}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Transacciones</div>
          </div>
        </div>
      </div>

      {/* Buscar Pago por ID Exacto */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header"><h3 className="card-title">Buscar Pago Exacto por ID</h3></div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: 1, maxWidth: 300 }}>
            <label className="form-label">ID del Pago</label>
            <input className="form-input" placeholder="Ingrese el ID del pago..." value={searchId}
              onChange={e => setSearchId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()} />
          </div>
          <button className="btn btn-primary" onClick={handleSearch} style={{ height: 42 }}>
            <Search size={16} /> Buscar
          </button>
        </div>
        {searchError && <div style={{ color: 'var(--danger)', marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}><AlertCircle size={16} />{searchError}</div>}
        {foundPayment && (
          <div style={{ marginTop: 16, padding: 20, background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>ID Pago</span><div style={{ fontWeight: 700, color: 'var(--accent)', fontSize: '1.1rem' }}>#{foundPayment.id}</div></div>
              <div><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Orden</span><div style={{ fontWeight: 600 }}>#{foundPayment.serviceOrderId}</div></div>
              <div><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Monto Pagado</span><div style={{ fontWeight: 700, color: 'var(--success)', fontSize: '1.1rem' }}>${Number(foundPayment.amountReceived || foundPayment.amount || 0).toFixed(2)}</div></div>
              <div><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Monto de la Orden</span><div style={{ fontWeight: 600, fontSize: '1rem' }}>${Number(foundPayment.amountToPay || 0).toFixed(2)}</div></div>
              <div><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Vuelto / Cambio</span><div style={{ fontWeight: 600, color: 'var(--info)' }}>${Number(foundPayment.changeAmount || 0).toFixed(2)}</div></div>
              <div><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Método</span><div><span className="badge badge-primary">{foundPayment.paymentMethod || foundPayment.method || 'CASH'}</span></div></div>
              <div><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Fecha</span><div>{new Date(foundPayment.date || foundPayment.createdDate || Date.now()).toLocaleString()}</div></div>
              <div><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Estado de Deuda</span><div><span className={`badge ${foundPayment.fullyPaid ? 'badge-success' : 'badge-danger'}`}>{foundPayment.fullyPaid ? 'Pagado Completamente' : 'Saldo Pendiente'}</span></div></div>
              <div><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Cliente</span><div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{foundPayment.customerName || 'N/A'}</div></div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gridColumn: 'span 3' }}>
                {foundPayment.status !== 'VALIDATED' && (
                  <button className="btn btn-success btn-sm" onClick={() => handleValidate(foundPayment.id)}>
                    <CheckCircle size={14} /> Validar Comprobante de Pago
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filters and List */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Registro Histórico</h3>
        </div>

        {/* Filters Row */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: 1, minWidth: 250 }}>
            <input className="form-input" placeholder="Buscar por Cliente o ID..." 
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="form-group" style={{ width: 180 }}>
            <select className="form-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="ALL">Todos los Estados</option>
              <option value="PENDING">Pendientes</option>
              <option value="VALIDATED">Validados</option>
            </select>
          </div>
          <div className="form-group" style={{ width: 180 }}>
            <select className="form-select" value={methodFilter} onChange={e => setMethodFilter(e.target.value)}>
              <option value="ALL">Todos los Métodos</option>
              <option value="CASH">Efectivo</option>
              <option value="TRANSFER">Transferencia</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Cargando pagos...</div>
        ) : filteredPayments.length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID Pago</th>
                  <th>Cliente</th>
                  <th>Orden</th>
                  <th>Monto</th>
                  <th>Método</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map(p => {
                  const statusVal = p.status || 'PENDING';
                  return (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 700, color: 'var(--accent)', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                        #{p.id.substring(0, 8)}...
                      </td>
                      <td style={{ fontWeight: 600 }}>{p.customerName || 'N/A'}</td>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                        #{p.serviceOrderId.substring(0, 8)}...
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--success)' }}>
                        ${Number(p.amountReceived || p.amount || 0).toFixed(2)}
                      </td>
                      <td>
                        <span className="badge badge-primary">{p.paymentMethod || p.method}</span>
                      </td>
                      <td>
                        <span className={`badge ${statusVal === 'VALIDATED' ? 'badge-success' : 'badge-warning'}`}>
                          {statusVal === 'VALIDATED' ? 'Validado' : 'Pendiente'}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {new Date(p.date || p.createdDate || Date.now()).toLocaleDateString()}
                      </td>
                      <td>
                        {statusVal !== 'VALIDATED' && (
                          <button className="btn btn-sm btn-success" onClick={() => handleValidate(p.id)}>
                            <CheckCircle size={14} /> Validar
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div style={{ fontSize: '3rem', marginBottom: 16, opacity: 0.3 }}>💳</div>
            <div className="empty-state-text">No se encontraron transacciones registradas</div>
          </div>
        )}
      </div>

      {/* Modal Registrar Pago */}
      {showRegisterModal && (
        <div className="modal-overlay" onClick={() => setShowRegisterModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Registrar Pago</h2>
              <button className="modal-close" onClick={() => setShowRegisterModal(false)}>✕</button>
            </div>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              
              <div className="form-group">
                <label className="form-label">Orden de Servicio Finalizada</label>
                <select 
                  className="form-select" 
                  value={registerForm.serviceOrderId} 
                  onChange={e => handleOrderSelect(e.target.value)}
                  required
                >
                  <option value="">-- Seleccione una orden por pagar --</option>
                  {unpaidOrders.map(o => (
                    <option key={o.id} value={o.id}>
                      Orden #{o.id.substring(0, 8)}... - {o.customerName} (${o.totalCost.toFixed(2)})
                    </option>
                  ))}
                </select>
                {unpaidOrders.length === 0 && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    No hay órdenes finalizadas pendientes de pago.
                  </p>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Monto (Auto-calculado)</label>
                  <input 
                    className="form-input" 
                    type="number" 
                    value={registerForm.amount} 
                    disabled 
                    required 
                    placeholder="0.00" 
                    style={{ opacity: 0.7, fontWeight: 'bold' }}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Método de Pago</label>
                  <select 
                    className="form-select" 
                    value={registerForm.method} 
                    onChange={e => setRegisterForm(p => ({ ...p, method: e.target.value }))}
                  >
                    <option value="CASH">Efectivo</option>
                    <option value="TRANSFER">Transferencia</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowRegisterModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={unpaidOrders.length === 0}>
                  Registrar Pago
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
