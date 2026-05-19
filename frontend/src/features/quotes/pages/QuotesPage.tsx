import { useEffect, useState, Fragment, type FormEvent } from 'react';
import { quotesApi, customersApi, vehiclesApi, servicesApi, mechanicsApi, ordersApi } from '../../shared/api';
import { inventoryApi } from '../../inventory/api/inventoryApi';
import type { Quote, Customer, Vehicle, Service, Product } from '../../../domain/models';
import { Plus, ArrowRight, PlusCircle, Eye, ChevronDown, ChevronUp, X } from 'lucide-react';

interface PendingItem {
  type: 'SERVICE' | 'PRODUCT';
  itemId: string;
  itemName: string;
  price: number;
  quantity: number;
}

export default function QuotesPage() {
  const [items, setItems] = useState<Quote[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | number | null>(null);
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const [quoteDetail, setQuoteDetail] = useState<any>(null);
  const [createForm, setCreateForm] = useState({ customerId: '', vehicleId: '' });
  const [itemForm, setItemForm] = useState({ type: 'SERVICE', itemId: '', quantity: '1' });
  const [customerVehicles, setCustomerVehicles] = useState<Vehicle[]>([]);
  // Items pendientes para agregar al crear la cotización
  const [pendingItems, setPendingItems] = useState<PendingItem[]>([]);
  const [addItemType, setAddItemType] = useState<'SERVICE' | 'PRODUCT'>('SERVICE');
  const [addItemId, setAddItemId] = useState('');
  const [addItemQty, setAddItemQty] = useState('1');

  // Aprobación y asignación de mecánicos
  const [mechanics, setMechanics] = useState<any[]>([]);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [approveQuoteId, setApproveQuoteId] = useState<string | number | null>(null);
  const [approveServices, setApproveServices] = useState<any[]>([]);
  const [assignedMechanics, setAssignedMechanics] = useState<Record<string, string>>({}); // serviceName -> mechanicId

  const load = () => { quotesApi.getAll().then(r => setItems(r.data)); };
  useEffect(() => {
    load();
    customersApi.getAll().then(r => setCustomers(r.data)).catch(() => {});
    servicesApi.getAll().then(r => setServices(r.data)).catch(() => {});
    inventoryApi.getProducts().then(r => setProducts(r.data)).catch(() => {});
    mechanicsApi.getAll().then(r => setMechanics(r.data)).catch(() => {});
  }, []);

  const openCreate = () => {
    setCreateForm({ customerId: '', vehicleId: '' });
    setCustomerVehicles([]);
    setPendingItems([]);
    setAddItemType('SERVICE');
    setAddItemId('');
    setAddItemQty('1');
    setShowCreateModal(true);
  };

  const onCustomerChange = async (customerId: string) => {
    setCreateForm(p => ({ ...p, customerId, vehicleId: '' }));
    if (customerId) {
      try {
        const res = await vehiclesApi.getByCustomer(customerId);
        setCustomerVehicles(res.data);
      } catch { setCustomerVehicles([]); }
    } else {
      setCustomerVehicles([]);
    }
  };

  const addPendingItem = () => {
    if (!addItemId) return;
    let name = '';
    let price = 0;
    if (addItemType === 'SERVICE') {
      const s = services.find(s => String(s.id) === addItemId);
      if (!s) return;
      name = s.name;
      price = s.laborPrice;
    } else {
      const p = products.find(p => String(p.id) === addItemId);
      if (!p) return;
      name = p.name;
      price = p.salePrice;
    }
    setPendingItems(prev => [...prev, {
      type: addItemType, itemId: addItemId, itemName: name, price, quantity: Number(addItemQty) || 1
    }]);
    setAddItemId('');
    setAddItemQty('1');
  };

  const removePendingItem = (index: number) => {
    setPendingItems(prev => prev.filter((_, i) => i !== index));
  };

  const pendingTotal = pendingItems.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await quotesApi.create({
        customerId: createForm.customerId,
        vehicleId: createForm.vehicleId,
        items: pendingItems.map(it => ({ 
          type: it.type, 
          itemId: it.itemId, 
          quantity: it.quantity,
          name: it.itemName,
          price: it.price
        }))
      });
      setShowCreateModal(false);
      load();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al crear cotización');
    }
  };

  const openAddItem = (quoteId: string | number) => {
    setSelectedQuoteId(quoteId);
    setItemForm({ type: 'SERVICE', itemId: '', quantity: '1' });
    setShowItemModal(true);
  };

  const handleAddItem = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedQuoteId || !itemForm.itemId) return;

    let itemName = '';
    let itemPrice = 0;
    if (itemForm.type === 'SERVICE') {
      const serv = services.find(s => String(s.id) === String(itemForm.itemId));
      itemName = serv ? serv.name : '';
      itemPrice = serv ? serv.laborPrice : 0;
    } else {
      const prod = products.find(p => String(p.id) === String(itemForm.itemId));
      itemName = prod ? prod.name : '';
      itemPrice = prod ? prod.salePrice : 0;
    }

    try {
      await quotesApi.addItem(
        selectedQuoteId,
        itemForm.type,
        itemForm.itemId,
        Number(itemForm.quantity),
        itemName,
        itemPrice
      );
      setShowItemModal(false);
      setItemForm({ type: 'SERVICE', itemId: '', quantity: '1' });
      load();
      if (expandedId === selectedQuoteId) loadDetail(selectedQuoteId);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al agregar item');
    }
  };

  const convert = async (id: string | number, total: number) => {
    if (!total || total === 0) {
      alert("No puedes aprobar una cotización vacía. Por favor, agrega servicios o productos primero.");
      return;
    }
    
    try {
      // 1. Obtener detalles de la cotización para ver sus servicios
      const res = await quotesApi.getById(id);
      const quoteDetails = res.data;
      
      // Filtrar servicios
      const quoteServices = (quoteDetails.items || []).filter((item: any) => item.type === 'SERVICE');
      
      setApproveQuoteId(id);
      setApproveServices(quoteServices);
      
      // Inicializar asignación con el primer mecánico si existe
      const initialAssignments: Record<string, string> = {};
      quoteServices.forEach((s: any) => {
        const defaultMech = mechanics[0];
        if (defaultMech) {
          initialAssignments[s.name || s.serviceName] = String(defaultMech.id);
        }
      });
      setAssignedMechanics(initialAssignments);
      setShowApproveModal(true);
    } catch (err) {
      console.error('Error al preparar la aprobación:', err);
      alert('Error al preparar la aprobación de la cotización.');
    }
  };

  const handleConfirmApproval = async () => {
    if (!approveQuoteId) return;

    // Validar asignaciones de mecánicos
    for (const s of approveServices) {
      const nameKey = s.name || s.serviceName;
      if (!assignedMechanics[nameKey]) {
        alert(`Por favor asigna un mecánico para el servicio: ${nameKey}`);
        return;
      }
    }

    try {
      // 1. Aprobar la cotización en el backend
      await quotesApi.approve(approveQuoteId);

      // 2. Crear la orden de servicio con las tareas y mecánicos asignados
      const tasksPayload = approveServices.map((s: any) => {
        const nameKey = s.name || s.serviceName;
        // Buscar el ID del servicio real por nombre
        const serviceObj = services.find((serv: any) => serv.name === nameKey);
        return {
          serviceId: serviceObj ? serviceObj.id : null,
          mechanicId: assignedMechanics[nameKey]
        };
      }).filter((t: any) => t.serviceId !== null);

      await ordersApi.create({
        quoteId: approveQuoteId,
        tasks: tasksPayload,
        serviceNames: approveServices.map(s => s.name || s.serviceName)
      });

      setShowApproveModal(false);
      alert('Cotización aprobada y Orden de Servicio creada exitosamente.');
      load();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al aprobar y crear orden de servicio');
    }
  };

  const rejectQuote = async (id: string | number) => {
    if (confirm('¿Rechazar esta cotización? Esta acción no se puede deshacer.')) {
      try { await quotesApi.reject(id); load(); } catch (err: any) {
        alert(err.response?.data?.message || 'Error al rechazar cotización');
      }
    }
  };

  const toggleDetail = async (id: string | number) => {
    if (expandedId === id) { setExpandedId(null); setQuoteDetail(null); }
    else { setExpandedId(id); await loadDetail(id); }
  };

  const loadDetail = async (id: string | number) => {
    try { const res = await quotesApi.getById(id); setQuoteDetail(res.data); }
    catch { setQuoteDetail(null); }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Cotizaciones</h1>
          <p className="page-subtitle">{items.length} cotizaciones</p>
        </div>
        <button className="btn btn-primary" onClick={openCreate}><Plus size={18} /> Nueva Cotización</button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead><tr><th></th><th>#</th><th>Cliente</th><th>Vehículo</th><th>Total Est.</th><th>Estado</th><th>Fecha</th><th>Acciones</th></tr></thead>
          <tbody>
            {items.map(q => (
              <Fragment key={q.id}>
                <tr>
                  <td style={{ width: 40, cursor: 'pointer' }} onClick={() => toggleDetail(q.id)}>
                    {expandedId === q.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--accent)' }}>#{q.id}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{q.customerName}</td>
                  <td>{q.vehicleInfo || '—'}</td>
                  <td style={{ fontWeight: 600 }}>${q.totalEstimated?.toFixed(2) || '0.00'}</td>
                  <td>
                    {q.status === 'APPROVED' ? <span className="badge badge-success">Aprobada</span>
                      : q.status === 'REJECTED' ? <span className="badge badge-danger">Rechazada</span>
                      : <span className="badge badge-warning">Pendiente</span>}
                  </td>
                  <td>{q.createdAt ? new Date(q.createdAt).toLocaleDateString() : '—'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {q.status === 'PENDING' && (
                        <>
                          <button className="btn btn-sm btn-ghost" onClick={() => openAddItem(q.id)} title="Agregar item"><PlusCircle size={14} /></button>
                          <button className="btn btn-sm btn-primary" onClick={() => convert(q.id, q.totalEstimated)} title={q.totalEstimated === 0 ? "Agrega items primero" : "Aprobar"} disabled={!q.totalEstimated || q.totalEstimated === 0} style={{ opacity: (!q.totalEstimated || q.totalEstimated === 0) ? 0.5 : 1, cursor: (!q.totalEstimated || q.totalEstimated === 0) ? 'not-allowed' : 'pointer' }}><ArrowRight size={14} /> Aprobar</button>
                          <button className="btn btn-sm btn-ghost" style={{ color: 'var(--danger)' }} onClick={() => rejectQuote(q.id)} title="Rechazar"><X size={14} /> Rechazar</button>
                        </>
                      )}
                      <button className="btn btn-sm btn-ghost" onClick={() => toggleDetail(q.id)} title="Ver detalle"><Eye size={14} /></button>
                    </div>
                  </td>
                </tr>
                {expandedId === q.id && (
                  <tr key={`${q.id}-detail`}>
                    <td colSpan={8} style={{ padding: 0, background: 'var(--bg-secondary)' }}>
                      <div style={{ padding: '16px 24px' }}>
                        {quoteDetail?.items && quoteDetail.items.length > 0 ? (
                          <table className="table" style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
                            <thead><tr><th>Tipo</th><th>Item</th><th>Cantidad</th><th>Precio Unit.</th><th>Subtotal</th></tr></thead>
                            <tbody>
                              {quoteDetail.items.map((item: any, i: number) => (
                                <tr key={i}>
                                  <td><span className="badge badge-primary">{item.type || 'SERVICE'}</span></td>
                                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.serviceName || item.productName || item.itemName || '—'}</td>
                                  <td>{item.quantity}</td>
                                  <td>${Number(item.unitPrice || 0).toFixed(2)}</td>
                                  <td style={{ fontWeight: 600 }}>${Number(item.subtotal || item.totalPrice || 0).toFixed(2)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <div style={{ color: 'var(--text-muted)', padding: 12 }}>Sin items — agrega servicios o productos a esta cotización</div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
            {!items.length && <tr><td colSpan={8} className="empty-state">Sin cotizaciones</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Modal Crear Cotización — ahora con items */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 620 }}>
            <div className="modal-header">
              <h2 className="modal-title">Nueva Cotización</h2>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Cliente y Vehículo */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Cliente</label>
                  <select className="form-select" value={createForm.customerId} onChange={e => onCustomerChange(e.target.value)} required>
                    <option value="">Seleccionar cliente</option>
                    {customers.map(c => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Vehículo</label>
                  <select className="form-select" value={createForm.vehicleId} onChange={e => setCreateForm(p => ({ ...p, vehicleId: e.target.value }))} required>
                    <option value="">Seleccionar vehículo</option>
                    {customerVehicles.map((v: any) => <option key={v.id} value={v.id}>{v.plate} — {v.brand} {v.model}</option>)}
                  </select>
                </div>
              </div>

              {/* Sección agregar items */}
              <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 16 }}>
                <label className="form-label" style={{ marginBottom: 12, display: 'block', fontSize: '0.95rem' }}>🔧 Trabajos a Realizar</label>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 70px auto', gap: 8, alignItems: 'end' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Tipo</label>
                    <select className="form-select" value={addItemType} onChange={e => { setAddItemType(e.target.value as any); setAddItemId(''); }}>
                      <option value="SERVICE">Servicio</option>
                      <option value="PRODUCT">Producto</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>{addItemType === 'SERVICE' ? 'Servicio' : 'Producto'}</label>
                    <select className="form-select" value={addItemId} onChange={e => setAddItemId(e.target.value)}>
                      <option value="">Seleccionar...</option>
                      {addItemType === 'SERVICE'
                        ? services.map(s => <option key={s.id} value={s.id}>{s.name} — ${s.laborPrice}</option>)
                        : products.map(p => <option key={p.id} value={p.id}>{p.name} — ${p.salePrice}</option>)
                      }
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Cant.</label>
                    <input className="form-input" type="number" min="1" value={addItemQty} onChange={e => setAddItemQty(e.target.value)} />
                  </div>
                  <button type="button" className="btn btn-primary btn-sm" onClick={addPendingItem} style={{ height: 38 }}>
                    <Plus size={14} />
                  </button>
                </div>

                {/* Lista de items agregados */}
                {pendingItems.length > 0 && (
                  <div style={{ marginTop: 12 }}>
                    <table className="table" style={{ fontSize: '0.85rem' }}>
                      <thead><tr><th>Tipo</th><th>Descripción</th><th>Cant.</th><th>Precio</th><th>Subtotal</th><th></th></tr></thead>
                      <tbody>
                        {pendingItems.map((it, i) => (
                          <tr key={i}>
                            <td><span className={`badge ${it.type === 'SERVICE' ? 'badge-primary' : 'badge-warning'}`}>{it.type === 'SERVICE' ? 'Servicio' : 'Producto'}</span></td>
                            <td style={{ fontWeight: 600 }}>{it.itemName}</td>
                            <td>{it.quantity}</td>
                            <td>${it.price.toFixed(2)}</td>
                            <td style={{ fontWeight: 600 }}>${(it.price * it.quantity).toFixed(2)}</td>
                            <td><button type="button" className="btn btn-icon btn-ghost btn-sm" style={{ color: 'var(--danger)' }} onClick={() => removePendingItem(i)}><X size={14} /></button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ textAlign: 'right', fontWeight: 700, color: 'var(--accent)', marginTop: 8, fontSize: '1.05rem' }}>
                      Total Estimado: ${pendingTotal.toFixed(2)}
                    </div>
                  </div>
                )}
                {pendingItems.length === 0 && (
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 12, textAlign: 'center' }}>
                    Agrega los servicios o productos que el cliente necesita
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowCreateModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Crear Cotización</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Agregar Item a cotización existente */}
      {showItemModal && (
        <div className="modal-overlay" onClick={() => setShowItemModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Agregar Item a Cotización #{selectedQuoteId}</h2>
              <button className="modal-close" onClick={() => setShowItemModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Tipo</label>
                <select className="form-select" value={itemForm.type} onChange={e => setItemForm(p => ({ ...p, type: e.target.value, itemId: '' }))}>
                  <option value="SERVICE">Servicio</option>
                  <option value="PRODUCT">Producto</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{itemForm.type === 'SERVICE' ? 'Servicio' : 'Producto'}</label>
                {itemForm.type === 'SERVICE' ? (
                  <select className="form-select" value={itemForm.itemId} onChange={e => setItemForm(p => ({ ...p, itemId: e.target.value }))} required>
                    <option value="">Seleccionar servicio</option>
                    {services.map(s => <option key={s.id} value={s.id}>{s.name} — ${s.laborPrice}</option>)}
                  </select>
                ) : (
                  <select className="form-select" value={itemForm.itemId} onChange={e => setItemForm(p => ({ ...p, itemId: e.target.value }))} required>
                    <option value="">Seleccionar producto</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name} — ${p.salePrice}</option>)}
                  </select>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Cantidad</label>
                <input className="form-input" type="number" min="1" value={itemForm.quantity} onChange={e => setItemForm(p => ({ ...p, quantity: e.target.value }))} required />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowItemModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Agregar Item</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Aprobación y Asignación de Mecánicos */}
      {showApproveModal && approveQuoteId && (
        <div className="modal-overlay" onClick={() => setShowApproveModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div className="modal-header">
              <h2 className="modal-title">Aprobar Cotización #{approveQuoteId}</h2>
              <button className="modal-close" onClick={() => setShowApproveModal(false)}>✕</button>
            </div>
            
            <div style={{ marginTop: 12, marginBottom: 16 }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Esta cotización se convertirá en una **Orden de Servicio** activa. Por favor, asigna un mecánico para cada servicio:
              </p>
            </div>

            {approveServices.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {approveServices.map((s, i) => {
                  const nameKey = s.name || s.serviceName;
                  return (
                    <div key={i} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 16, background: 'var(--bg-secondary)' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>{nameKey}</div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.75rem' }}>Asignar Mecánico</label>
                        <select 
                          className="form-select"
                          value={assignedMechanics[nameKey] || ''}
                          onChange={e => setAssignedMechanics(prev => ({ ...prev, [nameKey]: e.target.value }))}
                          required
                        >
                          <option value="">Seleccione un mecánico...</option>
                          {mechanics.map(m => (
                            <option key={m.id} value={m.id}>
                              {m.firstName} {m.lastName} ({m.specialty || 'General'})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ padding: '24px 16px', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)' }}>
                Esta cotización no contiene servicios de mano de obra (solo repuestos). Se creará la orden directamente sin tareas iniciales.
              </div>
            )}

            <div className="modal-actions" style={{ marginTop: 24 }}>
              <button type="button" className="btn btn-ghost" onClick={() => setShowApproveModal(false)}>Cancelar</button>
              <button type="button" className="btn btn-primary" onClick={handleConfirmApproval}>
                Aprobar y Crear Orden
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
