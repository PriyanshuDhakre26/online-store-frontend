import { useEffect, useState } from "react";
import { API_BASE, apiClient } from "../api/apiClient";
import { handleServiceError, retryRequest } from "../api/errorHandler";

function initials(name) {
  if (!name) return "?";
  return name.split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase();
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await retryRequest(() => apiClient.get(API_BASE.USERS));
        setUsers(res.data.users || []);
        setError(null);
      } catch (err) {
        const errorInfo = handleServiceError(err, "Users Service");
        setError(errorInfo.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="service-block">
      <div className="service-header">
        <h2>Users</h2>
        <div className="muted">{loading ? 'Loading…' : `${users.length} users`}</div>
      </div>

      {error && <div className="alert error">Error: {error}</div>}

      {!loading && users.length === 0 && !error && (
        <div className="empty">No users available</div>
      )}

      <div className="card-grid">
        {users.map(user => (
          <article className="card user-card" key={user.id}>
            <div className="avatar">{initials(user.name)}</div>
            <div className="card-body">
              <div className="card-title">{user.name || `User ${user.id}`}</div>
              <div className="card-sub">{user.email || '—'}</div>
              <div className="meta">ID: <span className="muted">{user.id}</span></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
