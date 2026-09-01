import ProductPieChart from "../charts/piechart";
import SalesChart from "../charts/barchart";
import Sidebar from "../../components/sidebar";
import Chart from "../charts/barchart2";

function GraphReport() {
  return (
    <div>
      <Sidebar />
      <h1>Graph Report</h1>
      <ProductPieChart />
      <SalesChart />
      <Chart />
    </div>
  );
}  

export default GraphReport;