import { useState } from "react";
import { API_BASE, apiClient } from "../api/apiClient";
import { handleServiceError } from "../api/errorHandler";

export default function Notifications() {
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(1);
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendNotification = async () => {
    if (!message.trim()) {
      setError("Message cannot be empty");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await apiClient.post(API_BASE.NOTIFY, {
        message,
        userId: parseInt(userId),
        type: "general"
      });
      setResponse(res.data.message || 'Sent');
      setMessage("");
    } catch (err) {
      const errorInfo = handleServiceError(err, "Notifications Service");
      setError(errorInfo.message);
      setResponse("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="service-block notify-block">
      <div className="service-header">
        <h2>Notifications</h2>
        <div className="muted">Send a quick message to a user</div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="form-row">
            <label className="sr-only">User ID</label>
            <input
              className="input"
              value={userId}
              onChange={e => setUserId(e.target.value)}
              type="number"
              placeholder="User ID"
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <label className="sr-only">Message</label>
            <textarea
              className="textarea"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Write your message…"
              disabled={loading}
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button className="btn" onClick={sendNotification} disabled={loading}>
              {loading ? 'Sending…' : 'Send Notification'}
            </button>
            {error && <div className="alert error">{error}</div>}
            {response && <div className="alert success">📨 {response}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
