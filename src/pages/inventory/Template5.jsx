import { useState } from "react";

const navItems = [
  { icon: "⊞", label: "Dashboard" },
  { icon: "📦", label: "Products" },
  { icon: "🏭", label: "Warehouses" },
  { icon: "🔄", label: "Movements" },
  { icon: "🤝", label: "Vendors" },
  { icon: "📈", label: "Reports" },
  { icon: "🛡️", label: "Compliance" },
];

const recentActivity = [
  {
    action: "Stock Added",
    item: 'MacBook Pro 16"',
    qty: "+50 units",
    time: "2m ago",
    color: "#22c55e",
  },
  {
    action: "Low Stock Alert",
    item: "iPhone 15 Plus",
    qty: "8 remaining",
    time: "15m ago",
    color: "#f59e0b",
  },
  {
    action: "Order Shipped",
    item: "AirPods Max",
    qty: "12 units",
    time: "1h ago",
    color: "#3b82f6",
  },
  {
    action: "Out of Stock",
    item: "Apple Vision Pro",
    qty: "0 units",
    time: "2h ago",
    color: "#ef4444",
  },
  {
    action: "Stock Added",
    item: "iPad Pro M4",
    qty: "+30 units",
    time: "3h ago",
    color: "#22c55e",
  },
  {
    action: "Transfer Done",
    item: "Mac Studio",
    qty: "5 units",
    time: "5h ago",
    color: "#8b5cf6",
  },
];

const topProducts = [
  { name: 'MacBook Pro 16"', sales: 284, stock: 42, pct: 84 },
  { name: "iPhone 15 Pro", sales: 512, stock: 8, pct: 95 },
  { name: "iPad Pro M4", sales: 198, stock: 67, pct: 62 },
  { name: "Apple Watch S9", sales: 341, stock: 23, pct: 78 },
];

const warehouses = [
  { name: "NYC Warehouse", capacity: 78, items: 4200, status: "Optimal" },
  { name: "LA Fulfillment", capacity: 91, items: 6100, status: "Near Full" },
  { name: "Chicago Hub", capacity: 45, items: 2800, status: "Available" },
];

export default function Template5() {
  const [active, setActive] = useState("Dashboard");

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Inter',sans-serif",
        background: "#f0f4ff",
        overflow: "hidden",
      }}
    >
      {/* ── Gradient Sidebar ── */}
      <aside
        style={{
          width: "230px",
          flexShrink: 0,
          background:
            "linear-gradient(180deg,#1e1b4b 0%,#312e81 40%,#4c1d95 100%)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "4px 0 24px rgba(49,46,129,0.3)",
        }}
      >
        {/* Logo */}
        <div style={{ padding: "22px 20px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="../src/assets/images/logo.png"
              width="75px"
              height="75px"
              alt="logo"
            />
            <div>
              <div style={{ fontWeight: 800, fontSize: "15px", color: "#fff" }}>
                DepotOS
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.45)",
                  fontWeight: 500,
                }}
              >
                Warehouse Suite
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: "0 14px 14px" }}>
          <div style={{ position: "relative" }}>
            <input
              placeholder="Search..."
              style={{
                width: "100%",
                padding: "8px 12px 8px 32px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "10px",
                fontSize: "12px",
                color: "#fff",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "12px",
                opacity: 0.6,
              }}
            >
              🔍
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "0 10px", overflowY: "auto" }}>
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "0 10px",
              marginBottom: "6px",
            }}
          >
            Navigation
          </div>
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
                  borderRadius: "12px",
                  border: "none",
                  background: isActive ? "rgba(255,255,255,0.15)" : "none",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                  fontWeight: isActive ? 700 : 400,
                  fontSize: "13px",
                  cursor: "pointer",
                  marginBottom: "2px",
                  transition: "all 0.2s",
                  textAlign: "left",
                  backdropFilter: isActive ? "blur(10px)" : "none",
                  boxShadow: isActive
                    ? "inset 0 0 0 1px rgba(255,255,255,0.15)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "none";
                }}
              >
                <span style={{ fontSize: "15px" }}>{item.icon}</span>
                <span style={{ flex: 1 }}>{item.label}</span>
                {isActive && (
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#a5b4fc",
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Upgrade Banner */}
        <div
          style={{
            margin: "12px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "14px",
            padding: "14px",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "4px",
            }}
          >
            Upgrade to Pro
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "10px",
            }}
          >
            Unlock advanced analytics & AI forecasting
          </div>
          <button
            style={{
              width: "100%",
              padding: "7px",
              background: "linear-gradient(135deg,#818cf8,#c084fc)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            Upgrade Now
          </button>
        </div>

        {/* User */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#818cf8,#c084fc)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 800,
              fontSize: "12px",
              flexShrink: 0,
            }}
          >
            SR
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>
              Sam Rivera
            </div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>
              Operations Manager
            </div>
          </div>
          <span
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            ↗
          </span>
        </div>
      </aside>

      {/* ── Main ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Appbar */}
        <header
          style={{
            background: "#fff",
            borderBottom: "1px solid #e5e7eb",
            padding: "0 28px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "17px",
                fontWeight: 800,
                color: "#111827",
              }}
            >
              {active}
            </h2>
            <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af" }}>
              Monday, 23 Dec 2024 · All warehouses
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              style={{
                padding: "8px 16px",
                background: "#f3f4f6",
                border: "none",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#374151",
                cursor: "pointer",
              }}
            >
              📤 Export
            </button>
            <button
              style={{
                position: "relative",
                background: "#f3f4f6",
                border: "none",
                borderRadius: "10px",
                padding: "8px 12px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              🔔
              <span
                style={{
                  position: "absolute",
                  top: "-3px",
                  right: "-3px",
                  background: "#ef4444",
                  color: "#fff",
                  borderRadius: "999px",
                  width: "15px",
                  height: "15px",
                  fontSize: "9px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                6
              </span>
            </button>
            <button
              style={{
                background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                color: "#fff",
                border: "none",
                padding: "8px 18px",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              + New Entry
            </button>
          </div>
        </header>

        {/* ── Bento Grid Body ── */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "auto auto 1fr",
            gap: "16px",
          }}
        >
          {/* Stat 1 */}
          <div
            style={{
              background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
              borderRadius: "18px",
              padding: "20px",
              color: "#fff",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                opacity: 0.7,
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              TOTAL INVENTORY VALUE
            </div>
            <div
              style={{ fontSize: "32px", fontWeight: 900, marginBottom: "4px" }}
            >
              $3.8M
            </div>
            <div style={{ fontSize: "12px", opacity: 0.7 }}>
              ↑ 18.4% from last quarter
            </div>
          </div>

          {/* Stat 2 */}
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "20px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#9ca3af",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              ACTIVE SKUs
            </div>
            <div
              style={{
                fontSize: "32px",
                fontWeight: 900,
                color: "#111827",
                marginBottom: "4px",
              }}
            >
              24,891
            </div>
            <div
              style={{ fontSize: "12px", color: "#22c55e", fontWeight: 600 }}
            >
              ↑ 342 added this week
            </div>
          </div>

          {/* Stat 3 */}
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "20px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#9ca3af",
                marginBottom: "8px",
                fontWeight: 600,
              }}
            >
              PENDING REORDERS
            </div>
            <div
              style={{
                fontSize: "32px",
                fontWeight: 900,
                color: "#111827",
                marginBottom: "4px",
              }}
            >
              47
            </div>
            <div
              style={{ fontSize: "12px", color: "#ef4444", fontWeight: 600 }}
            >
              ⚠ 12 urgent
            </div>
          </div>

          {/* Top Products — spans 2 cols */}
          <div
            style={{
              gridColumn: "span 2",
              background: "#fff",
              borderRadius: "18px",
              padding: "20px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: "14px",
                color: "#111827",
                marginBottom: "16px",
              }}
            >
              Top Moving Products
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {topProducts.map((p, i) => (
                <div key={i}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#111827",
                      }}
                    >
                      {p.name}
                    </span>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>
                        {p.sales} sold
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: p.stock < 15 ? "#ef4444" : "#374151",
                        }}
                      >
                        {p.stock} left
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      height: "6px",
                      background: "#f3f4f6",
                      borderRadius: "999px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${p.pct}%`,
                        background:
                          p.pct > 85
                            ? "linear-gradient(90deg,#ef4444,#f97316)"
                            : "linear-gradient(90deg,#4f46e5,#7c3aed)",
                        borderRadius: "999px",
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Warehouses */}
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "20px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: "14px",
                color: "#111827",
                marginBottom: "16px",
              }}
            >
              Warehouse Status
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {warehouses.map((w, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px",
                    background: "#f9fafb",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#111827",
                      }}
                    >
                      {w.name}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color:
                          w.capacity > 85
                            ? "#ef4444"
                            : w.capacity > 70
                              ? "#f59e0b"
                              : "#22c55e",
                        background:
                          w.capacity > 85
                            ? "#fef2f2"
                            : w.capacity > 70
                              ? "#fffbeb"
                              : "#f0fdf4",
                        padding: "2px 8px",
                        borderRadius: "999px",
                      }}
                    >
                      {w.status}
                    </span>
                  </div>
                  <div
                    style={{
                      height: "5px",
                      background: "#e5e7eb",
                      borderRadius: "999px",
                      overflow: "hidden",
                      marginBottom: "4px",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${w.capacity}%`,
                        background:
                          w.capacity > 85
                            ? "#ef4444"
                            : w.capacity > 70
                              ? "#f59e0b"
                              : "#22c55e",
                        borderRadius: "999px",
                      }}
                    />
                  </div>
                  <div style={{ fontSize: "11px", color: "#9ca3af" }}>
                    {w.capacity}% capacity · {w.items.toLocaleString()} items
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed — spans full width */}
          <div
            style={{
              gridColumn: "span 3",
              background: "#fff",
              borderRadius: "18px",
              padding: "20px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: "14px",
                color: "#111827",
                marginBottom: "14px",
              }}
            >
              Recent Activity
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "10px",
              }}
            >
              {recentActivity.map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    background: "#f9fafb",
                    borderRadius: "12px",
                    borderLeft: `3px solid ${a.color}`,
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: a.color,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#111827",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {a.item}
                    </div>
                    <div style={{ fontSize: "11px", color: "#6b7280" }}>
                      {a.action} · {a.qty}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#9ca3af",
                      flexShrink: 0,
                    }}
                  >
                    {a.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
