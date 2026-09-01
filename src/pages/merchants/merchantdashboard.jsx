import React from "react";
import { Outlet, Link } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { useNavigate } from "react-router-dom";

function MerchantDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        
          <Sidebar role="merchant" />
                    
            <span>My</span>Duka
       
          <p className="role">
                    MERCHANT
          </p>

      </aside>
 
      {/*MAIN CONTENT */}

      <main className="admin-main">

        <h1 className="merchant-dashboard">Merchant Dashboard</h1>

          <p className="welcome">Welcome to MyDuka, Merchant!</p>

        <div>

          <h2 className="overview">Overview</h2>

           <p className="manage">Manage your stores, administrators and payments.</p>
           
        </div>

        <div className="merchant-cards"> 

          <div className="merchant-card"> 

            <h3>Stores</h3> 

            <p>Manage your business stores.</p> 

            <button 
              onClick={() =>
                navigate("/stores")}>
                  🏪 Store

            </button>

          </div> 
          
          <div className="merchant-card"> 

            <h3>Administrators</h3> 

            <p>Manage store administrators.</p> 

            <button 
              onClick={() =>
                navigate("/merchant/admin")}>
                  👥 Administration

            </button>
            
          </div> 
          
          <div className="merchant-card">

            <h3>Payments</h3> 

            <p>View and manage payments.</p> 

            <button 
              onClick={() =>
                navigate("/merchant/payments")}>
                  💰 Payments

            </button>
            
          </div> 
          
          <div className="merchant-card"> 

            <h3>Reports</h3> 

            <p>View inventory and business reports.</p> 

            <button 
              onClick={() =>
                navigate("/graph-report")}>
                  📊 Report

            </button>
            
          </div> 

        </div>

      </main>
      
    </div>
  );
}

export default MerchantDashboard;