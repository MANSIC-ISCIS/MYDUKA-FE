import { useLocation, useNavigate } from "react-router-dom";

function Sidebar({ role }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = {
    merchant: [
      { label: "Dashboard", path: "/merchant/dashboard", icon: "⌂" },
      { label: "Stores", path: "/stores", icon: "▣" },
      { label: "Administrators", path: "/merchant/admin", icon: "♙" },
      { label: "Payments", path: "/merchant/payments", icon: "₵" },
    ],

    admin: [
      { label: "Dashboard", path: "/admin", icon: "⌂" },
      { label: "Clerks", path: "/register-clerk", icon: "♙" },
      {
        label: "Supply Requests",
        path: "/admin/supply-requests",
        icon: "▣",
      },
      { label: "Bar Chart", path: "/bar-chart", icon: "▥" },
      { label: "Pie Chart", path: "/pie-chart", icon: "◉" },
    ],

    clerk: [
      { label: "Dashboard", path: "/clerk", icon: "⌂" },
      { label: "Inventory", path: "/clerk/inventory", icon: "▣" },
      { label: "Record Inventory", path: "/clerk/records", icon: "+" },
      { label: "Supply Request", path: "/clerk/supplyreq", icon: "↗" },
      { label: "Reports", path: "/graph-report", icon: "▥" },
    ],
  };

  const items = menus[role] || [];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">
        <span>My</span>Duka
      </div>

      <div className="sidebar-role">
        {role === "admin" ? "STORE ADMIN" : role.toUpperCase()}
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => {
          const active =
            location.pathname === item.path ||
            (item.path !== "/merchant" &&
              item.path !== "/admin" &&
              item.path !== "/clerk" &&
              location.pathname.startsWith(item.path));

          return (
            <button
              key={item.path}
              className={active ? "sidebar-link active" : "sidebar-link"}
              onClick={() => navigate(item.path)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <button className="sidebar-logout" onClick={logout}>
        <span>↪</span>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
