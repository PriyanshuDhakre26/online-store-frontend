import { useState } from "react";
import { API_BASE, apiClient } from "./api/apiClient";
import Users from "./components/Users";
import Orders from "./components/Orders";
import Notifications from "./components/Notifications";

export default function App() {
  const [healthStatus, setHealthStatus] = useState("");

  const testServices = async () => {
    setHealthStatus("Testing...");
    try {
      const results = {};
      
      try {
        const res = await apiClient.get(API_BASE.USERS);
        results.users = `✓ (${res.data.users?.length || 0} users)`;
      } catch (e) {
        results.users = `✗ ${e.message}`;
      }

      try {
        const res = await apiClient.get(API_BASE.ORDERS);
        results.orders = `✓ (${res.data.orders?.length || 0} orders)`;
      } catch (e) {
        results.orders = `✗ ${e.message}`;
      }

      try {
        const res = await apiClient.get(API_BASE.NOTIFY);
        results.notifications = `✓ (${res.data.notifications?.length || 0} notifications)`;
      } catch (e) {
        results.notifications = `✗ ${e.message}`;
      }

      setHealthStatus(
        `Users: ${results.users}\nOrders: ${results.orders}\nNotifications: ${results.notifications}`
      );
    } catch (error) {
      setHealthStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h1>Microservices Frontend</h1>

      <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "5px" }}>
        <button onClick={testServices} style={{ marginBottom: "10px" }}>
          🔍 Test Services
        </button>
        {healthStatus && (
          <pre style={{ fontSize: "12px", margin: "0", whiteSpace: "pre-wrap" }}>
            {healthStatus}
          </pre>
        )}
      </div>

      <Users />
      <Orders />
      <Notifications />
    </div>
  );
}
