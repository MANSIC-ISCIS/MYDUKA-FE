import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import AdminDashboard from ".././storeadmin/clerk";
import { useNavigate } from "react-router-dom";

const data = [
  { product: "Store_1", review: 7 },
  { product: "Store_2", review: 5 },
  { product: "Store_3", review: 6 },
  { product: "Store_4", review: 7 },
  { product: "Store_5", review: 6 },
  { product: "Store_6", review: 8 }
];

function Chart() {
  const navigate = useNavigate();

  return (
    <div>
    <div>
      <h2>Reviews Of Stores</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="review" fill=" #24743b"/>
        </BarChart>
      </ResponsiveContainer>
    </div>

    <button
       className="admindash"
       onClick={() =>
         navigate("/clerk/dashboard")}
    >
      Back to dashboard
    </button>
    </div>
  );
}

export default Chart;