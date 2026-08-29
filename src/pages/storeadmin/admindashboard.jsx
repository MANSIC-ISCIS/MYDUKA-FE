import React, { useMemo, useState } from "react";
import Sidebar from "../../components/sidebar";
import SearchBar from "../../components/searchbar";

const inventoryData = [
  {
    name: "Product A",
    quantity: 205,
  },
  {
    name: "Product B",
    quantity: 120,
  },
  {
    name: "Product C",
    quantity: 80,
  },
  {
    name: "Product D",
    quantity: 150,
  },
];

const clerkActivity = [45, 52, 38, 61, 49, 58, 33];

function StatIcon({ type }) {
  const props = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (type === "products") {
    return (
      <svg {...props}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.27 6.96 8.73 5.05 8.73-5.05" />
        <path d="M12 22V12" />
      </svg>
    );
  }

  if (type === "money") {
    return (
      <svg {...props}>
        <path d="M12 1v22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    );
  }

  if (type === "pending") {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M10.3 3.2 2.5 17a2 2 0 0 0 1.74 3h15.52a2 2 0 0 0 1.74-3L13.7 3.2a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function StatCard({ title, value, type }) {
  return (
    <article className="stat-card">
      <div>
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
      </div>

      <div className={`stat-icon ${type}`}>
        <StatIcon type={type} />
      </div>
    </article>
  );
}

function InventoryChart({ data }) {
  const maxQuantity = Math.max(
    ...data.map((item) => item.quantity),
    1
  );

  return (
    <section className="chart-card">
      <h2>Inventory Levels by Product</h2>

      <div className="inventory-chart">
        <div className="chart-y-axis">
          <span>200</span>
          <span>150</span>
          <span>100</span>
          <span>50</span>
          <span>0</span>
        </div>

        <div className="bar-chart">
          <div className="grid-lines">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="bars">
            {data.map((item) => {
              const height =
                (item.quantity / maxQuantity) * 100;

              return (
                <div className="bar-group" key={item.name}>
                  <div
                    className="bar"
                    style={{ height: `${height}%` }}
                    title={`${item.name}: ${item.quantity} units`}
                  />

                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ActivityChart() {
  const width = 650;
  const height = 240;
  const padding = 22;
  const maxValue = 80;

  const points = clerkActivity.map((value, index) => {
    const x =
      padding +
      (index * (width - padding * 2)) /
        (clerkActivity.length - 1);

    const y =
      height -
      padding -
      (value / maxValue) * (height - padding * 2);

    return { x, y };
  });

  const polyline = points
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  return (
    <section className="chart-card">
      <h2>Clerk Entry Activity (This Week)</h2>

      <div className="activity-chart">
        <div className="activity-y-axis">
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>

        <div className="activity-area">
          <div className="activity-grid">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            className="activity-svg"
          >
            <polyline
              points={polyline}
              fill="none"
              stroke="#3182ed"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="5"
                fill="#ffffff"
                stroke="#3182ed"
                strokeWidth="3"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="week-labels">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </section>
  );
}

export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [activeItem, setActiveItem] = useState("Overview");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return inventoryData;
    }

    return inventoryData.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <div className="dashboard">
      <Sidebar
        activeItem={activeItem}
        onNavigate={setActiveItem}
        adminName="James Osei"
        storeName="Downtown Store"
      />

      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="mobile-title">
            Store Management
          </div>

          <div className="header-search">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search products, suppliers..."
            />
          </div>

          <div className="header-actions">
            <button
              type="button"
              className="notification-button"
              aria-label="Notifications"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>

            <div className="header-avatar">J</div>
          </div>
        </header>

        {/* Content */}
        <div className="dashboard-content">
          <div className="page-heading">
            <h1>Admin Overview</h1>
            <p>
              Downtown Store — Weekly performance snapshot
            </p>
          </div>

          {/* Statistics */}
          <div className="stats-grid">
            <StatCard
              title="TOTAL PRODUCTS"
              value="4"
              type="products"
            />

            <StatCard
              title="STOCK VALUE"
              value="KSh 14,024.00"
              type="money"
            />

            <StatCard
              title="PENDING REQUESTS"
              value="1"
              type="pending"
            />

            <StatCard
              title="UNPAID SUPPLIERS"
              value="2"
              type="warning"
            />
          </div>

          {/* Charts */}
          <div className="charts-grid">
            <InventoryChart data={filteredProducts} />
            <ActivityChart />
          </div>

          {/* Search results */}
          {search && (
            <section className="search-results">
              <h2>
                Search results for{" "}
                <strong>"{search}"</strong>
              </h2>

              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    className="search-result"
                    key={product.name}
                  >
                    <span>{product.name}</span>
                    <strong>
                      {product.quantity} units
                    </strong>
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </section>
          )}
        </div>
      </main>

      <style>{`
        .dashboard {
          min-height: 100vh;
          display: flex;
          background: #f2f5f9;
          color: #12203a;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .dashboard-main {
          flex: 1;
          min-width: 0;
          min-height: 100vh;
        }

        .dashboard-header {
          height: 72px;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 0 30px;
          background: #ffffff;
          border-bottom: 1px solid #e3e8ef;
        }

        .header-search {
          width: min(430px, 100%);
          margin-left: auto;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .notification-button {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e0e6ee;
          border-radius: 50%;
          background: #ffffff;
          color: #566780;
          cursor: pointer;
        }

        .notification-button:hover {
          background: #f5f7fa;
        }

        .header-avatar {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #00b982;
          color: #ffffff;
          font-weight: 700;
        }

        .mobile-title {
          display: none;
          font-size: 18px;
          font-weight: 700;
        }

        .dashboard-content {
          max-width: 1500px;
          margin: 0 auto;
          padding: 38px 34px 50px;
        }

        .page-heading {
          margin-bottom: 30px;
        }

        .page-heading h1 {
          margin: 0;
          color: #10203b;
          font-size: 29px;
          font-weight: 700;
          letter-spacing: -0.7px;
        }

        .page-heading p {
          margin: 8px 0 0;
          color: #8a9bb4;
          font-size: 15px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          min-height: 174px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 28px;
          background: #ffffff;
          border: 1px solid #e5eaf0;
          border-radius: 20px;
          box-shadow: 0 2px 5px rgba(25,45,75,0.06);
        }

        .stat-title {
          color: #647995;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1.3px;
        }

        .stat-value {
          margin-top: 20px;
          color: #10203b;
          font-size: 29px;
          font-weight: 700;
          letter-spacing: -0.8px;
        }

        .stat-icon {
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .stat-icon.products {
          background: #edf4ff;
          color: #1769ed;
        }

        .stat-icon.money {
          background: #eafbf4;
          color: #00a876;
        }

        .stat-icon.pending {
          background: #fff8e7;
          color: #ed9200;
        }

        .stat-icon.warning {
          background: #fff0f3;
          color: #ed3f5c;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
          gap: 20px;
        }

        .chart-card {
          min-height: 390px;
          padding: 30px 28px 22px;
          background: #ffffff;
          border: 1px solid #e5eaf0;
          border-radius: 20px;
          box-shadow: 0 2px 5px rgba(25,45,75,0.06);
        }

        .chart-card h2 {
          margin: 0 0 25px;
          color: #10203b;
          font-size: 17px;
          font-weight: 700;
        }

        .inventory-chart {
          height: 285px;
          display: flex;
          gap: 15px;
        }

        .chart-y-axis {
          width: 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-bottom: 30px;
          color: #8ca0bb;
          font-size: 12px;
          text-align: right;
        }

        .bar-chart {
          position: relative;
          flex: 1;
          min-width: 0;
        }

        .grid-lines {
          position: absolute;
          inset: 0 0 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .grid-lines span {
          width: 100%;
          border-top: 1px dashed #e3eaf2;
        }

        .bars {
          position: absolute;
          inset: 0 0 30px;
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          gap: 20px;
        }

        .bar-group {
          height: 100%;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-direction: column;
        }

        .bar {
          width: min(52px, 70%);
          min-height: 8px;
          border-radius: 6px 6px 2px 2px;
          background: #f03c5d;
          transition: opacity 0.2s;
        }

        .bar:hover {
          opacity: 0.75;
        }

        .bar-group span {
          margin-top: 8px;
          color: #8a9bb4;
          font-size: 11px;
          white-space: nowrap;
        }

        .activity-chart {
          height: 255px;
          display: flex;
          gap: 10px;
        }

        .activity-y-axis {
          width: 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-bottom: 5px;
          color: #8ca0bb;
          font-size: 12px;
          text-align: right;
        }

        .activity-area {
          position: relative;
          flex: 1;
          min-width: 0;
        }

        .activity-grid {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .activity-grid span {
          border-top: 1px dashed #e3eaf2;
        }

        .activity-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .week-labels {
          display: flex;
          justify-content: space-between;
          margin-left: 38px;
          color: #8a9bb4;
          font-size: 11px;
        }

        .search-results {
          margin-top: 20px;
          padding: 22px;
          background: #ffffff;
          border: 1px solid #e5eaf0;
          border-radius: 16px;
        }

        .search-results h2 {
          margin: 0 0 15px;
          color: #53647e;
          font-size: 14px;
          font-weight: 400;
        }

        .search-results h2 strong {
          color: #10203b;
        }

        .search-result {
          display: flex;
          justify-content: space-between;
          padding: 13px 15px;
          margin-bottom: 8px;
          background: #f6f8fb;
          border-radius: 9px;
          color: #263957;
          font-size: 14px;
        }

        .search-result strong {
          color: #00a876;
        }

        .search-results p {
          color: #8a9bb4;
        }

        @media (max-width: 1200px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .charts-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 900px) {
          .dashboard-header {
            padding: 0 20px;
          }

          .dashboard-content {
            padding: 30px 22px 40px;
          }
        }

        @media (max-width: 700px) {
          .dashboard {
            flex-direction: column;
          }

          .dashboard-header {
            min-height: 70px;
            height: auto;
            flex-wrap: wrap;
            padding: 12px 16px;
          }

          .mobile-title {
            display: block;
          }

          .header-search {
            order: 3;
            width: 100%;
            margin-left: 0;
          }

          .header-actions {
            margin-left: auto;
          }

          .dashboard-content {
            padding: 25px 16px 35px;
          }

          .page-heading h1 {
            font-size: 25px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .chart-card {
            padding: 22px 17px;
          }
        }
      `}</style>
    </div>
  );
}
