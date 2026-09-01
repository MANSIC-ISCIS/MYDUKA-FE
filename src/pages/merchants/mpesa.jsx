import Sidebar from "../../components/sidebar";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../config";

function MpesaPayment() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentId, setPaymentId] = useState(null);
  const [status, setStatus] = useState("");
  const [receipt, setReceipt] = useState("");

  async function pay() {
    const res = await fetch(`${API_URL}/merchant/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        record_id:1,
        store_id: 1,
        phone_number: phone,
        amount,
      }),
    });

    const data = await res.json();

    setPaymentId(data.payment_id);
    setStatus(data.status);
  }

  useEffect(() => {
    if (!paymentId) return;

    const interval = setInterval(async () => {
      const res = await fetch(`${API_URL}/payments/${paymentId}`);
      const data = await res.json();

      setStatus(data.status);
      setReceipt(data.mpesa_receipt_number);

      if (data.status !== "Pending") {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [paymentId]);

  return (
    <div className="admin-dashboard">
        <Sidebar role="merchant" />

      <div className="merchant-header">
        <div>
          <h1>MPESA PAYMENT</h1>
          <p>Make and monitor your M-Pesa payments</p>
        </div>
      </div>

      <div className="merchant-content">
        <div className="payment-card">
          <h2>Make Payment</h2>
          <p className="card-description">
            Enter the customer's phone number and payment amount.
          </p>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="0712345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button className="pay-button" onClick={pay}>
            Pay with M-Pesa
          </button>
        </div>

        {status && (
          <div className="status-card">
            <h2>Payment Status</h2>

            <div className="status-box">
              <span>Status</span>
              <strong>{status}</strong>
            </div>

            {paymentId && (
              <div className="payment-info">
                <p>
                  <strong>Payment ID:</strong> {paymentId}
                </p>
              </div>
            )}

            {receipt && (
              <div className="receipt-box">
                <p>
                  <strong>M-Pesa Receipt:</strong>
                </p>
                <span>{receipt}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MpesaPayment;
