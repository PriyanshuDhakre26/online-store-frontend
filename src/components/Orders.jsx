import { useEffect, useState } from "react";
import { API_BASE, apiClient } from "../api/apiClient";
import { handleServiceError, retryRequest } from "../api/errorHandler";

function formatCurrency(v){
  if (v == null) return '—';
  return `$${Number(v).toFixed(2)}`;
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await retryRequest(() => apiClient.get(API_BASE.ORDERS));
        setOrders(res.data.orders || []);
        setError(null);
      } catch (err) {
        const errorInfo = handleServiceError(err, "Orders Service");
        setError(errorInfo.message);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <section className="service-block">
      <div className="service-header">
        <h2>Orders</h2>
        <div className="muted">{loading ? 'Loading…' : `${orders.length} orders`}</div>
      </div>

      {error && <div className="alert error">Error: {error}</div>}

      {!loading && orders.length === 0 && !error && (
        <div className="empty">No orders available</div>
      )}

      <div className="card-grid">
        {orders.map(o => (
          <article className="card order-card" key={o.id}>
            <div className="card-body">
              <div className="card-title">{o.product || 'Order'}</div>
              <div className="card-sub">Qty: {o.quantity || 1} • {formatCurrency(o.amount)}</div>
              <div className="meta">Order ID: <span className="muted">{o.id}</span></div>
            </div>
            <div className="card-right">
              <div className="badge">{o.status || 'new'}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
