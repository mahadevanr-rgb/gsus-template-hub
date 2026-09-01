import { useState } from "react";
import {
  LayoutGrid,
  Package,
  RotateCw,
  Truck,
  ClipboardList,
  BarChart3,
  Settings,
  Database,
  Search,
  Bell,
  Tag,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

const navItems = [
  { icon: LayoutGrid, label: "Overview" },
  { icon: Package, label: "Products" },
  { icon: RotateCw, label: "Stock Move" },
  { icon: Truck, label: "Suppliers" },
  { icon: ClipboardList, label: "Orders" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

const stockItems = [
  {
    name: "Sony WH-1000XM5",
    category: "Audio",
    qty: 142,
    status: "Healthy",
    location: "Shelf A-12",
    lastUpdated: "2h ago",
    price: "$349",
  },
  {
    name: 'Samsung 65" QLED',
    category: "Displays",
    qty: 18,
    status: "Low",
    location: "Shelf B-03",
    lastUpdated: "5h ago",
    price: "$1,299",
  },
  {
    name: "Logitech MX Master",
    category: "Peripherals",
    qty: 0,
    status: "Empty",
    location: "Shelf C-07",
    lastUpdated: "1d ago",
    price: "$99",
  },
  {
    name: 'iPad Pro 12.9"',
    category: "Tablets",
    qty: 56,
    status: "Healthy",
    location: "Shelf A-04",
    lastUpdated: "30m ago",
    price: "$1,099",
  },
  {
    name: "DJI Mini 4 Pro",
    category: "Drones",
    qty: 9,
    status: "Low",
    location: "Shelf D-01",
    lastUpdated: "3h ago",
    price: "$759",
  },
  {
    name: "GoPro Hero 12",
    category: "Cameras",
    qty: 34,
    status: "Healthy",
    location: "Shelf B-09",
    lastUpdated: "1h ago",
    price: "$399",
  },
  {
    name: "Bose SoundLink Max",
    category: "Audio",
    qty: 0,
    status: "Empty",
    location: "Shelf A-15",
    lastUpdated: "2d ago",
    price: "$329",
  },
  {
    name: "Apple Pencil Pro",
    category: "Accessories",
    qty: 88,
    status: "Healthy",
    location: "Shelf C-02",
    lastUpdated: "45m ago",
    price: "$129",
  },
];

const statusConfig = {
  Healthy: { color: "#16a34a", bg: "#dcfce7", dot: "#22c55e" },
  Low: { color: "#d97706", bg: "#fef9c3", dot: "#eab308" },
  Empty: { color: "#dc2626", bg: "#fee2e2", dot: "#ef4444" },
};

export default function Template3() {
  const [active, setActive] = useState("Overview");
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#eef2f7",
        fontFamily: "'Inter',sans-serif",
        padding: "12px",
        gap: "12px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* ── Floating Sidebar ── */}
      <aside
        style={{
          width: "220px",
          background: "#fff",
          borderRadius: "24px",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          overflow: "hidden",
        }}
      >
        {/* Logo */}
        <div style={{ padding: "20px 18px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="../src/assets/images/logo.png"
              width="75px"
              height="75px"
              alt="logo"
            />
            <div>
              <div
                style={{ fontWeight: 800, fontSize: "14px", color: "#111827" }}
              >
                VaultIQ
              </div>
              <div
                style={{ fontSize: "10px", color: "#9ca3af", fontWeight: 500 }}
              >
                Smart Inventory
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "4px 10px", overflowY: "auto" }}>
          {navItems.map((item) => {
            const isActive = active === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActive(item.label)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  borderRadius: "14px",
                  border: "none",
                  background: isActive
                    ? "linear-gradient(135deg,#f97316,#ec4899)"
                    : "none",
                  color: isActive ? "#fff" : "#6b7280",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "13px",
                  cursor: "pointer",
                  marginBottom: "2px",
                  transition: "all 0.2s",
                  textAlign: "left",
                  boxShadow: isActive
                    ? "0 4px 12px rgba(249,115,22,0.3)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = "#f9fafb";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "none";
                }}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div
          style={{
            padding: "12px 14px",
            margin: "0 8px 8px",
            background: "#f9fafb",
            borderRadius: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg,#f97316,#ec4899)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: "12px",
                flexShrink: 0,
              }}
            >
              MR
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{ fontSize: "12px", fontWeight: 700, color: "#111827" }}
              >
                Maya Ross
              </div>
              <div style={{ fontSize: "10px", color: "#9ca3af" }}>
                Warehouse Lead
              </div>
            </div>
            <span
              style={{ fontSize: "14px", cursor: "pointer", color: "#9ca3af" }}
            >
              ⋯
            </span>
          </div>
        </div>
      </aside>

      {/* ── Right Column ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          minWidth: 0,
        }}
      >
        {/* ── Floating Pill Appbar ── */}
        <header
          style={{
            background: "#fff",
            borderRadius: "50px",
            padding: "0 20px",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          }}
        >
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
            }}
          >
            <span style={{ color: "#9ca3af" }}>VaultIQ</span>
            <span style={{ color: "#d1d5db" }}>›</span>
            <span style={{ fontWeight: 700, color: "#111827" }}>{active}</span>
          </div>

          {/* Center Search */}
          <div style={{ position: "relative" }}>
            <input
              placeholder="Search stock..."
              style={{
                padding: "7px 16px 7px 36px",
                background: "#f3f4f6",
                border: "none",
                borderRadius: "999px",
                fontSize: "13px",
                outline: "none",
                width: "220px",
                color: "#374151",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "13px",
                color: "#9ca3af",
              }}
            >
              <Search size={16} color="#9ca3af" />
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              style={{
                background: "#f3f4f6",
                border: "none",
                borderRadius: "999px",
                padding: "8px 14px",
                cursor: "pointer",
                fontSize: "14px",
                color: "#6b7280",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Bell size={16} />{" "}
              <span
                style={{
                  background: "#ef4444",
                  color: "#fff",
                  borderRadius: "999px",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "1px 5px",
                }}
              >
                4
              </span>
            </button>
            <button
              style={{
                background: "linear-gradient(135deg,#f97316,#ec4899)",
                color: "#fff",
                border: "none",
                padding: "8px 20px",
                borderRadius: "999px",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(249,115,22,0.3)",
              }}
            >
              + Add Stock
            </button>
          </div>
        </header>

        {/* ── Body ── */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Mini Stats Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "12px",
            }}
          >
            {[
              {
                label: "Total SKUs",
                value: "3,841",
                icon: Tag,
                color: "#f97316",
              },
              {
                label: "Healthy Items",
                value: "3,204",
                icon: CheckCircle2,
                color: "#22c55e",
              },
              {
                label: "Low Stock",
                value: "512",
                icon: AlertTriangle,
                color: "#eab308",
              },
              {
                label: "Out of Stock",
                value: "125",
                icon: XCircle,
                color: "#ef4444",
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  padding: "16px 18px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: `${s.color}15`,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    flexShrink: 0,
                  }}
                >
                  <s.icon size={20} color={s.color} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "#111827",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#9ca3af",
                      fontWeight: 500,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Stock List (no cards, clean rows) ── */}
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              flex: 1,
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            {/* List Header */}
            <div
              style={{
                padding: "16px 22px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #f3f4f6",
              }}
            >
              <div>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: "15px",
                    color: "#111827",
                  }}
                >
                  Stock List
                </span>
                <span
                  style={{
                    marginLeft: "8px",
                    fontSize: "12px",
                    color: "#9ca3af",
                    background: "#f3f4f6",
                    padding: "2px 8px",
                    borderRadius: "999px",
                  }}
                >
                  {stockItems.length} items
                </span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {["All", "Healthy", "Low", "Empty"].map((f) => (
                  <button
                    key={f}
                    style={{
                      padding: "5px 14px",
                      background: f === "All" ? "#111827" : "#f3f4f6",
                      color: f === "All" ? "#fff" : "#6b7280",
                      border: "none",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Column Headers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1.2fr 0.8fr 1fr 1fr 0.8fr",
                padding: "10px 22px",
                background: "#fafafa",
                borderBottom: "1px solid #f3f4f6",
              }}
            >
              {[
                "Product Name",
                "Category",
                "Qty",
                "Location",
                "Last Updated",
                "Status",
              ].map((h) => (
                <span
                  key={h}
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            <div
              style={{ overflowY: "auto", maxHeight: "calc(100vh - 340px)" }}
            >
              {stockItems.map((item, i) => {
                const s = statusConfig[item.status];
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1.2fr 0.8fr 1fr 1fr 0.8fr",
                      padding: "14px 22px",
                      borderBottom: "1px solid #f9fafb",
                      background: hoveredRow === i ? "#fafafa" : "#fff",
                      transition: "background 0.15s",
                      cursor: "pointer",
                      alignItems: "center",
                    }}
                  >
                    {/* Name */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: s.dot,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#111827",
                        }}
                      >
                        {item.name}
                      </span>
                    </div>
                    {/* Category */}
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        background: "#f3f4f6",
                        padding: "3px 10px",
                        borderRadius: "999px",
                        width: "fit-content",
                      }}
                    >
                      {item.category}
                    </span>
                    {/* Qty */}
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 800,
                        color:
                          item.qty === 0
                            ? "#ef4444"
                            : item.qty < 20
                              ? "#d97706"
                              : "#111827",
                      }}
                    >
                      {item.qty}
                    </span>
                    {/* Location */}
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        fontFamily: "monospace",
                      }}
                    >
                      {item.location}
                    </span>
                    {/* Last Updated */}
                    <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                      {item.lastUpdated}
                    </span>
                    {/* Status */}
                    <span
                      style={{
                        background: s.bg,
                        color: s.color,
                        padding: "4px 12px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: 700,
                        width: "fit-content",
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
