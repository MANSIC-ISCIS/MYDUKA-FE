import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

import { useNavigate } from "react-router-dom";

const data = [
  { name: "Sugar", value: 85 },
  { name: "Milk", value: 70 },
  { name: "Bread", value: 80 },
  { name: "Eggs", value: 50 },
  { name: "Cheese", value: 30 },
  { name: "Fruits", value: 90 },
  { name: "Vegetables", value: 60 },
  { name: "Meat", value: 40 },
  { name: "Pastries", value: 20 },
  { name: "Beverages", value: 75 }

];
// colors for the pie chart segments
const colors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff6b6b",
  "#4ecdc4",
  "#45b7d1"
];

function ProductPieChart() {
  const navigate = useNavigate();

  return (
    <div>
    <div>
      <h2>Product Sales Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
        {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        label
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
    </ResponsiveContainer>
    </div>

    <button
       className="admindash"
       onClick={() =>
         navigate("/admin")}
    >
      Back to dashboard
    </button>
    </div>
  );
}

export default ProductPieChart;