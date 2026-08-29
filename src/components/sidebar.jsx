import React from "react";

function Icon({ type }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (type) {
    case "overview":
      return (
        <svg {...props}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5.5 9.5V21h13V9.5" />
          <path d="M9.5 21v-6h5v6" />
        </svg>
      );

    case "requests":
      return (
        <svg {...props}>
          <path d="M22 2 11 13" />
          <path d="m22 2-7 20-4-9-9-4L22 2Z" />
        </svg>
      );

    case "payment":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 10h18" />
          <path d="M7 15h4" />
        </svg>
      );

    case "reports":
      return (
        <svg {...props}>
          <path d="M4 19V10" />
          <path d="M10 19V5" />
          <path d="M16 19v-8" />
          <path d="M22 19V8" />
        </svg>
      );

    case "clerks":
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );

    default:
      return null;
  }
}

const menuItems = [
  {
    label: "Overview",
    icon: "overview",
  },
  {
    label: "Supply Requests",
    icon: "requests",
  },
  {
    label: "Payment Status",
    icon: "payment",
  },
  {
    label: "Clerk Reports",
    icon: "reports",
  },
  {
    label: "Manage Clerks",
    icon: "clerks",
  },
];

export default function Sidebar({
  activeItem = "Overview",
  onNavigate,
  adminName = "James Osei",
  storeName = "Downtown Store",
}) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-brand">
        <div className="brand-icon">
          <svg
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 10v10h16V10" />
            <path d="M3 10l2-6h14l2 6" />
            <path d="M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
            <path d="M8 20v-5h8v5" />
          </svg>
        </div>

        <div>
          <div className="brand-name">StoreTrack</div>
          <div className="brand-subtitle">INVENTORY</div>
        </div>
      </div>

      {/* Admin */}
      <div className="admin-profile">
        <div className="admin-avatar">
          {adminName.charAt(0).toUpperCase()}
        </div>

        <div className="admin-details">
          <div className="admin-name">{adminName}</div>
          <div className="admin-role">Store Admin</div>
          <div className="admin-store">{storeName}</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-navigation">
        {menuItems.map((item) => {
          const active = activeItem === item.label;

          return (
            <button
              key={item.label}
              type="button"
              className={`nav-item ${active ? "active" : ""}`}
              onClick={() => onNavigate?.(item.label)}
            >
              <Icon type={item.icon} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="sidebar-footer">
        <button type="button" className="logout-button">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="m16 17 5-5-5-5" />
            <path d="M21 12H9" />
          </svg>

          <span>Logout</span>
        </button>
      </div>

      <style>{`
        .sidebar {
          width: 306px;
          min-width: 306px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #0d172c;
          color: #ffffff;
        }

        .sidebar-brand {
          height: 94px;
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 0 22px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .brand-icon {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #00bd83;
        }

        .brand-name {
          font-size: 20px;
          font-weight: 700;
        }

        .brand-subtitle {
          margin-top: 3px;
          color: #7486a5;
          font-size: 12px;
          letter-spacing: 1.5px;
        }

        .admin-profile {
          min-height: 106px;
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 18px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .admin-avatar {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #00bd83;
          font-size: 18px;
          font-weight: 700;
        }

        .admin-details {
          min-width: 0;
        }

        .admin-name {
          font-size: 15px;
          font-weight: 700;
        }

        .admin-role {
          margin-top: 3px;
          color: #9cadc9;
          font-size: 13px;
        }

        .admin-store {
          margin-top: 3px;
          color: #00d491;
          font-size: 13px;
        }

        .sidebar-navigation {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 16px;
        }

        .nav-item {
          width: 100%;
          min-height: 49px;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0 18px;
          border: none;
          border-radius: 14px;
          background: transparent;
          color: #a8b9d4;
          font-family: inherit;
          font-size: 15px;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .nav-item:hover {
          background: rgba(255,255,255,0.06);
          color: #ffffff;
        }

        .nav-item.active {
          background: #00a978;
          color: #ffffff;
        }

        .sidebar-footer {
          margin-top: auto;
          padding: 16px;
        }

        .logout-button {
          width: 100%;
          min-height: 45px;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 0 18px;
          border: none;
          border-radius: 12px;
          background: transparent;
          color: #9cadc9;
          font-family: inherit;
          font-size: 15px;
          cursor: pointer;
          text-align: left;
        }

        .logout-button:hover {
          background: rgba(255,255,255,0.06);
          color: #ffffff;
        }

        @media (max-width: 900px) {
          .sidebar {
            width: 240px;
            min-width: 240px;
          }
        }

        @media (max-width: 700px) {
          .sidebar {
            width: 100%;
            min-width: 0;
            min-height: auto;
          }

          .sidebar-navigation {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
          }

          .sidebar-footer {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
}