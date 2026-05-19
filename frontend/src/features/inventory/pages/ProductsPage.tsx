import { useEffect, useState, type FormEvent } from 'react';
import { inventoryApi } from '../api/inventoryApi';
import type { Product, Category } from '../../../domain/models';
import { Plus, Edit2, Search, DollarSign, Package, Eye } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewProduct, setViewProduct] = useState<any | null>(null);
  const [createForm, setCreateForm] = useState({ name: '', code: '', description: '', categoryId: '', purchasePrice: '', salePrice: '', stock: '0', minStock: '5', unit: 'unidad' });
  const [priceForm, setPriceForm] = useState({ purchasePrice: '', salePrice: '' });
  const [stockForm, setStockForm] = useState({ quantity: '', operation: 'INCREASE' });

  const load = () => {
    inventoryApi.getProducts().then(r => setProducts(r.data)).catch(() => setProducts([]));
    inventoryApi.getCategories().then(r => setCategories(r.data)).catch(() => setCategories([]));
  };
  useEffect(() => { load(); }, []);

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.code?.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => {
    setCreateForm({ name: '', code: '', description: '', categoryId: '', purchasePrice: '', salePrice: '', stock: '0', minStock: '5', unit: 'unidad' });
    setShowCreateModal(true);
  };

  const openPriceEdit = (p: Product) => {
    setSelectedProduct(p);
    setPriceForm({ purchasePrice: p.purchasePrice?.toString() || '', salePrice: p.salePrice?.toString() || '' });
    setShowPriceModal(true);
  };

  const openStockEdit = (p: Product) => {
    setSelectedProduct(p);
    setStockForm({ quantity: '', operation: 'INCREASE' });
    setShowStockModal(true);
  };

  const openViewProduct = async (id: string | number) => {
    try {
      const res = await inventoryApi.getProduct(id);
      setViewProduct(res.data);
      setShowViewModal(true);
    } catch (err) {
      console.error('Error fetching product details', err);
    }
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await inventoryApi.createProduct({
        name: createForm.name, code: createForm.code, description: createForm.description,
        categoryId: createForm.categoryId || undefined, purchasePrice: Number(createForm.purchasePrice) || 0,
        salePrice: Number(createForm.salePrice), stock: Number(createForm.stock), minStock: Number(createForm.minStock), unit: createForm.unit
      } as any);
      setShowCreateModal(false);
      load();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al crear el producto. Verifica que el código no esté duplicado.');
    }
  };

  const handlePriceUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    try {
      await inventoryApi.updateProductPrice(selectedProduct.id, Number(priceForm.purchasePrice), Number(priceForm.salePrice));
      setShowPriceModal(false);
      load();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al actualizar precios.');
    }
  };

  const handleStockUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    try {
      await inventoryApi.updateProductStock(selectedProduct.id, Number(stockForm.quantity), stockForm.operation);
      setShowStockModal(false);
      load();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al actualizar stock.');
    }
  };

  const setC = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setCreateForm(p => ({ ...p, [f]: e.target.value }));

  return (
    <div>
      <div className="page-header">
        <div><h1 className="page-title">Productos</h1><p className="page-subtitle">{products.length} productos registrados</p></div>
        <button className="btn btn-primary" onClick={openCreate}><Plus size={18} /> Nuevo Producto</button>
      </div>
      <div className="filter-row">
        <div className="search-bar" style={{ flex: 1, maxWidth: 400 }}>
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input placeholder="Buscar productos..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="table-container">
        <table className="table">
          <thead><tr><th>Código</th><th>Nombre</th><th>Categoría</th><th>Precio Compra</th><th>Precio Venta</th><th>Stock</th><th>Acciones</th></tr></thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td style={{ fontFamily: 'monospace', color: 'var(--accent)' }}>{p.code}</td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</td>
                <td>{p.categoryName || '—'}</td>
                <td>${p.purchasePrice?.toFixed(2) || '0.00'}</td>
                <td style={{ fontWeight: 600 }}>${p.salePrice?.toFixed(2)}</td>
                <td>
                  <span className={`badge ${p.stock <= (p.minStock || 5) ? 'badge-warning' : 'badge-success'}`}>
                    {p.stock} {p.unit || 'und'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-icon btn-ghost btn-sm" onClick={() => openViewProduct(p.id)} title="Ver detalles">
                      <Eye size={15} />
                    </button>
                    <button className="btn btn-icon btn-ghost btn-sm" onClick={() => openPriceEdit(p)} title="Editar precios">
                      <DollarSign size={15} />
                    </button>
                    <button className="btn btn-icon btn-ghost btn-sm" onClick={() => openStockEdit(p)} title="Ajustar stock">
                      <Package size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={7} className="empty-state">No hay productos</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Modal Crear Producto */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Nuevo Producto</h2>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group"><label className="form-label">Nombre</label><input className="form-input" value={createForm.name} onChange={setC('name')} required /></div>
                <div className="form-group"><label className="form-label">Código</label><input className="form-input" value={createForm.code} onChange={setC('code')} required /></div>
              </div>
              <div className="form-group"><label className="form-label">Descripción</label><textarea className="form-textarea" value={createForm.description} onChange={setC('description')} /></div>
              <div className="form-group"><label className="form-label">Categoría</label>
                <select className="form-select" value={createForm.categoryId} onChange={setC('categoryId')} required><option value="">Seleccione una categoría</option>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group"><label className="form-label">Precio Compra</label><input className="form-input" type="number" step="0.01" value={createForm.purchasePrice} onChange={setC('purchasePrice')} /></div>
                <div className="form-group"><label className="form-label">Precio Venta</label><input className="form-input" type="number" step="0.01" value={createForm.salePrice} onChange={setC('salePrice')} required /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div className="form-group"><label className="form-label">Stock</label><input className="form-input" type="number" value={createForm.stock} onChange={setC('stock')} /></div>
                <div className="form-group"><label className="form-label">Stock Mín.</label><input className="form-input" type="number" value={createForm.minStock} onChange={setC('minStock')} /></div>
                <div className="form-group"><label className="form-label">Unidad</label><input className="form-input" value={createForm.unit} onChange={setC('unit')} /></div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowCreateModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Crear</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Editar Precios */}
      {showPriceModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowPriceModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Editar Precios — {selectedProduct.name}</h2>
              <button className="modal-close" onClick={() => setShowPriceModal(false)}>✕</button>
            </div>
            <form onSubmit={handlePriceUpdate} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group"><label className="form-label">Precio Compra</label><input className="form-input" type="number" step="0.01" value={priceForm.purchasePrice} onChange={e => setPriceForm(p => ({ ...p, purchasePrice: e.target.value }))} required /></div>
                <div className="form-group"><label className="form-label">Precio Venta</label><input className="form-input" type="number" step="0.01" value={priceForm.salePrice} onChange={e => setPriceForm(p => ({ ...p, salePrice: e.target.value }))} required /></div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowPriceModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Actualizar Precios</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Ajustar Stock */}
      {showStockModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowStockModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Ajustar Stock — {selectedProduct.name}</h2>
              <button className="modal-close" onClick={() => setShowStockModal(false)}>✕</button>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>Stock actual: <strong style={{ color: 'var(--accent)' }}>{selectedProduct.stock}</strong></p>
            <form onSubmit={handleStockUpdate} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Operación</label>
                <select className="form-select" value={stockForm.operation} onChange={e => setStockForm(p => ({ ...p, operation: e.target.value }))}>
                  <option value="INCREASE">Entrada (+)</option>
                  <option value="DECREASE">Salida (−)</option>
                </select>
              </div>
              <div className="form-group"><label className="form-label">Cantidad</label><input className="form-input" type="number" min="1" value={stockForm.quantity} onChange={e => setStockForm(p => ({ ...p, quantity: e.target.value }))} required /></div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowStockModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Ajustar Stock</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Ver Detalles Producto */}
      {showViewModal && viewProduct && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Detalles del Producto</h2>
              <button className="modal-close" onClick={() => setShowViewModal(false)}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Nombre</label>
                  <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 8, fontWeight: 500 }}>{viewProduct.name}</div>
                </div>
                <div className="form-group">
                  <label className="form-label">Categoría</label>
                  <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 8 }}>{viewProduct.categoryName || '—'}</div>
                </div>
              </div>
              {viewProduct.description && (
                <div className="form-group">
                  <label className="form-label">Descripción</label>
                  <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 8 }}>{viewProduct.description}</div>
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Precio Compra</label>
                  <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 8, fontWeight: 600 }}>${Number(viewProduct.purchasePrice || 0).toFixed(2)}</div>
                </div>
                <div className="form-group">
                  <label className="form-label">Precio Venta</label>
                  <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 8, fontWeight: 600, color: 'var(--success)' }}>${Number(viewProduct.salePrice || 0).toFixed(2)}</div>
                </div>
                <div className="form-group">
                  <label className="form-label">Stock</label>
                  <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 8, fontWeight: 600 }}>{viewProduct.stock}</div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">ID</label>
                <div style={{ padding: '8px 12px', background: 'var(--bg-secondary)', borderRadius: 8, fontSize: '0.85rem', fontFamily: 'monospace' }}>{viewProduct.id}</div>
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
