import React, { useState } from "react";
import ErrorMessage from "../../components/errorMessage";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";

function SupplyReq() {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [requests, setRequests] = useState([
    { id: 1,  product: "Rice",
      quantity: 50, status: "Pending",
    },
    { id: 2, product: "Milk",
      quantity: 20,
      status: "Approved",
    },
  ]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!product || !quantity) {
      setError("Please fill in all fields.");
      return;
    }

    const newRequest = { id: Date.now(),
      product, quantity,
      status: "Pending",};

    setRequests([newRequest, ...requests]);
    setProduct("");
    setQuantity("");
    setError("");
  }

  function getStatusStyle(status) {
    switch (status) {case "Approved":
        return { background: "#DCFCE7",
          color: "#166534",};

      case "Declined":
        return {background: "#FEE2E2",
          color: "#991B1B", };

      default:
        return { background: "#FEF3C7",
          color: "#92400E",};
    }}

  return (
    <div className="admin-dashboard">

            {/* SIDEBAR */}

            <aside className="admin-sidebar">

                <div className="admin-logo">

                    <Sidebar role="clerk" />
                    
                    <span>My</span>Duka
                </div>

            </aside>
      <div className="supply">
      <h1>Supply Requests</h1>
      <p>Request additional stock from the store admin.</p>
      </div>

      <ErrorMessage message={error} />

      <form onSubmit={handleSubmit} className="form-product">
        <div style={{ marginBottom: "16px" }}>
          <label>Product</label>
          <input type="text" value={product}
            onChange={(e) => setProduct(e.target.value)}
            style={{ width: "100%", padding: "10px" }}/>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Quantity</label>
          <input type="number" value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ width: "100%", padding: "10px" }}/>
        </div>
        <button onClick={() => navigate("/clerk")}
            style={{ background: "#6B7280",
            color: "white", border: "none",
            padding: "10px 16px", borderRadius: "8px",
            cursor: "pointer", marginRight: "12px",}} >
            Back to Dashboard</button>

         <button type="submit"
          style={{ background: "#1cb51c",
            color: "white", border: "none",
            padding: "12px 20px", borderRadius: "8px",
            cursor: "pointer", }} >
          Send Request </button>
      </form>

      <div style={{ marginTop: "40px" }} className="req">
        <h2>Previous Requests</h2>

        {requests.map((request) => (
          <div key={request.id}
            style={{ border: "1px solid #E5E7EB",
              borderRadius: "10px", padding: "16px",
              marginBottom: "14px", display: "flex",
              justifyContent: "space-between",
              alignItems: "center",}} >
            <div>
              <h3>{request.product}</h3>
              <p>Quantity: {request.quantity}</p>
            </div>

            <button onClick={() => {
              setRequests(requests.filter((r) => r.id !== request.id));
            }} style={{ background: "#DC2626",
              color: "white", border: "none",
              padding: "10px 16px", borderRadius: "8px",
              cursor: "pointer",}} >
              Delete</button>

            <span
              style={{
                ...getStatusStyle(request.status),
                padding: "8px 12px",
                borderRadius: "20px",
                fontWeight: "bold",
              }} >
              {request.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );}

export default SupplyReq;