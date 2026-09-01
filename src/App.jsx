import { Routes, Route } from "react-router-dom";

import Home from "./pages/auth/home";
import Login from "./pages/auth/login";
import RegisterMerchant from "./pages/auth/regMerchant";
import SalesChart from "./pages/charts/barchart";
import ProductPieChart from "./pages/charts/piechart";
import { StrictMode } from "react";
import MerchantDashboard from "./pages/merchants/merchantdashboard";
import MerchantAdmin from "./pages/merchants/admin";
import MerchantStores from "./pages/merchants/stores";
import MerchantPayment from "./pages/merchants/payment";
import ClerkDashboard from "./pages/clerks/clerkdashboard";
import Records from "./pages/clerks/records";
import SupplyReq from "./pages/clerks/supplyreq";
import Inventory from "./pages/clerks/inventory";
import EditRecord from "./pages/clerks/editrecord";
import AdminDashboard from "./pages/storeadmin/clerk";
import SupplyRequests from "./pages/storeadmin/supply_req";
import Chart from "./pages/charts/barchart2";
import MpesaPayment from "./pages/merchants/mpesa";


function App() {

    return (
  
        <Routes>

            {/* PUBLIC */}

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/auth/login"
                element={<Login />}
            />

            <Route
                path="/register-merchant"
                element={<RegisterMerchant />}
            />

            <Route
                path="/bar-chart"
                element={<SalesChart />}
            />

            <Route
                path="/pie-chart"
                element={<ProductPieChart />}
            />
            <Route
                path="/graph-report"
                element={<Chart/>}
            />    

            <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
            <Route path="/merchant/admin" element={<MerchantAdmin />} />
            <Route path="/stores" element={<MerchantStores />} />
            <Route path="/merchant/payments" element={<MerchantPayment />} />
            <Route path="/merchant/mpesa" element={<MpesaPayment />} />
      
               {/* Clerk Dashboard */}
            
            <Route path="/clerk/dashboard" element={<ClerkDashboard />} />

               {/* Clerk Pages */}
            <Route path="/clerk/records" element={<Records />} />
            <Route path="/clerk/supplyreq" element={<SupplyReq />} />
            <Route path="/clerk/inventory" element={<Inventory />} />

               {/* Edit Record */}
            <Route path="/clerk/edit/:recordId" element={<EditRecord />} />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/clerks" element={<AdminDashboard />} />
            <Route path="/admin/supply-requests" element={<SupplyRequests />} />
            <Route path="/admin/payments" element={<AdminDashboard />} />
            <Route path="/admin/reports" element={<AdminDashboard />} />
      

        </Routes>
        
    );
}

export default App;