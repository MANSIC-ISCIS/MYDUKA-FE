import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import Sidebar from "../../components/sidebar";

function Inventory() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadInventory = async () => {
      try {
        const response = await fetch(`${API_URL}/records`);

        if (!response.ok) throw new Error("Unable to load inventory.");

        const data = await response.json();

        if (active) {
          setRecords(Array.isArray(data) ? data : []);
          setError("");
        }
      } catch (loadError) {
        if (active) setError(loadError.message);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadInventory();

    const intervalId = window.setInterval(loadInventory, 30000);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, []);

  if (loading) return <p>Loading inventory...</p>;

  return (
    <div className="admin-dashboard">
      <Sidebar role="clerk" />

      <div style={{ padding: "24px" }}>
      <button
        onClick={() => navigate("/clerk/dashboard")}
        style={backButtonStyle}
      >
        Back to Dashboard
      </button>

      <h1>Inventory</h1>
      <p>Live inventory records refresh automatically every 30 seconds.</p>

      {error && <p role="alert">{error}</p>}

      {!error && records.length === 0 ? (
        <p>No inventory records available.</p>
      ) : (
        records.map((record) => (
          <article key={record.record_id} style={cardStyle}>
            <div>
              <h2>{record.product_name || `Product #${record.product_id}`}</h2>
              <p>Product ID: {record.product_id}</p>
              <p>
                Supplier:{" "}
                {record.supplier_name || `Supplier #${record.supplier_id}`}
              </p>
              <p>Supplier ID: {record.supplier_id}</p>
              <p>
                Received: {record.items_received} · In stock:{" "}
                {record.items_in_stock} · Spoilt: {record.items_spoilt}
              </p>
              <p>
                Buying price: KSh {record.buying_price} · Selling price: KSh{" "}
                {record.selling_price}
              </p>
              <p>Payment status: {record.payment_status}</p>
              <small>
                Recorded:{" "}
                {record.created_at
                  ? new Date(record.created_at).toLocaleString()
                  : "Not available"}
              </small>
            </div>

            <button
              style={editButton}
              onClick={() => navigate(`/clerk/edit/${record.record_id}`)}
            >
              Edit
            </button>
          </article>
        ))
      )}
     </div>
    </div>
  );
}

const cardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid #E5E7EB",
  borderRadius: "10px",
  padding: "16px",
  marginBottom: "16px",
};

const backButtonStyle = {
  background: "#6B7280",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  marginBottom: "20px",
};

const editButton = {
  background: "#2563EB",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Inventory;