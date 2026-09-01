import React, { useState } from "react";
import UnpaidButton from "../../components/un_paid_button";
import Sidebar from "../../components/sidebar";

function Payment() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      description: "Fruit Supply Payment",
      amount: 15000,
      paid: true,
    },
    {
      id: 2,
      description: "Milk Supply Payment",
      amount: 500,
      paid: false,
    },
    {
      id: 3,
      description: "Vegetable Supply Payment",
      amount: 2000,
      paid: true,
    },
    {
      id: 4,
      description: "Grain Supply Payment",
      amount: 3000,
      paid: false,
    },
    {
      id: 5,
      description: "Meat Supply Payment",
      amount: 8000,
      paid: true,
    }
  ]);

  const togglePaymentStatus = (id) => {
    setPayments((currentPayments) =>
      currentPayments.map((payment) =>
        payment.id === id
          ? { ...payment, paid: !payment.paid }
          : payment
      )
    );
  };

  return (
    <div className="admin-dashboard">
      <Sidebar role="merchant" />

      <div className="pay">
       <h1>Payments</h1>  
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.description}</td>

              <td>
                KSh {payment.amount.toLocaleString()}
              </td>

              <td>
                {payment.paid ? (
                  <span>Paid</span>
                ) : (
                  <UnpaidButton />
                )}
              </td>

              <td>
                <button
                  type="button"
                  onClick={() => togglePaymentStatus(payment.id)}
                >
                  {payment.paid ? "Mark Unpaid" : "Mark Paid"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payment;
