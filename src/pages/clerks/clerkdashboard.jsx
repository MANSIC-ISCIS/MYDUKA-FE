import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import Sidebar from "../../components/sidebar";

function ClerkDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    received: 0, stock: 0,
    spoilt: 0, unpaid: 0, });

  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const [statsRes, recordsRes] = await Promise.all([
          fetch(`${API_URL}/clerk/dashboard`),
          fetch(`${API_URL}/records`), ]);

        const [statsData, recordsData] = await Promise.all([
          statsRes.json(),
          recordsRes.json(), ]);

        if (!statsRes.ok || !recordsRes.ok) {
          throw new Error("Unable to load dashboard.");}

        if (active) {setStats(statsData);
          setRecords(recordsData);
          setError("");
        }
      } catch (loadError) {
        if (active) setError(loadError.message);
      }};

    load();
    const id = setInterval(load, 30000);

    return () => {active = false;
      clearInterval(id);};
  }, []);

  return(
    <div className="admin-dashboard">
      <Sidebar role="clerk" />

      <main style={page}>
        <section style={hero}>
          <div>
           <p style={{ margin: 0 }}>CLERK WORKSPACE</p>
           <h1 style={{ margin: "6px 0" }}>Inventory overview</h1>
           <small>Live totals from all clerk record changes</small>
          </div>

         <button style={primary} onClick={() => navigate("/clerk/records")}>
         + Add record</button>
        </section>

      {error && <p role="alert">{error}</p>}

       <section style={summary}>
      {[
        ["Received", stats.received],
        ["In stock", stats.stock],
        ["Spoilt", stats.spoilt],
        ["Unpaid", stats.unpaid],
       ].map(([label, value]) => (
        <div key={label} style={stat}>
          <small>{label}</small>
          <strong>{value}</strong>
        </div>
      ))}
    </section>

    <section style={quick}>
      <button style={primary} onClick={() => navigate("/clerk/records")}>
        Record inventory</button>

      <button onClick={() => navigate("/clerk/inventory")}>
        View inventory</button>

      <button onClick={() => navigate("/clerk/supplyreq")}>
        Request supply </button>
    </section>

    <section>
      <div style={sectionTitle}>
        <h2>Latest records</h2>

        <button onClick={() => navigate("/clerk/inventory")}>
          See all</button>
      </div>

      {records.slice(0, 4).map((record) => (
        <div key={record.record_id} style={row}>
          <div>
            <b>{record.product_name}</b>
            <span>
              {" "}
              · {record.supplier_name} · {record.store_name}
            </span>
          </div>

          <div>
            {record.items_in_stock} in stock

            <button onClick={() => navigate(`/clerk/edit/${record.record_id}`)}>
              Edit</button>
          </div>
        </div>
      ))}

      {records.length === 0 && <p>No records available.</p>}
    </section>
  </main>
  </div>
  );

}

const page = { maxWidth: 950, margin: "0 auto",
  padding: "24px 20px",};

const hero = {display: "flex", justifyContent: "space-between",
  alignItems: "center", padding: "20px",
  borderRadius: 14,background: "#f0ffef",};

const summary = { display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: 10,margin: "14px 0" };

const stat = { padding: "14px",
  border: "1px solid #E5E7EB",
  borderRadius: 10, display: "grid",
  gap: 4,};

const quick = {display: "flex",
  flexWrap: "wrap",gap: 10,
  margin: "14px 0 24px",};

const sectionTitle = {display: "flex",
  justifyContent: "space-between",
  alignItems: "center",};

const row = {display: "flex",
  justifyContent: "space-between",
  gap: 12,padding: "13px 0",
  borderBottom: "1px solid #E5E7EB",};

const primary = { background: "#24b51c",
  color: "white", border: 0,
  borderRadius: 8, padding: "10px 14px",};

export default ClerkDashboard;