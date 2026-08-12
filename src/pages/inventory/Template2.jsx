import { useState } from "react";

const navItems = [
  { icon: "⊞", label: "Overview"   },
  { icon: "📦", label: "Inventory", badge: "5" },
  { icon: "🔄", label: "Transfers"  },
  { icon: "🚚", label: "Suppliers"  },
  { icon: "📋", label: "Purchase Orders", badge: "2" },
  { icon: "📊", label: "Analytics"  },
  { icon: "👥", label: "Team"       },
  { icon: "⚙️", label: "Settings"   },
];

const stats = [
  { label: "SKUs Tracked",   value: "4,291", icon: "🏷️", trend: "+24 today",  color: "#818cf8" },
  { label: "Warehouses",     value: "6",     icon: "🏭", trend: "2 countries", color: "#34d399" },
  { label: "Pending Orders", value: "18",    icon: "⏳", trend: "3 urgent",    color: "#fb923c" },
  { label: "Monthly Revenue",value: "$128K", icon: "📈", trend: "+22% MoM",    color: "#f472b6" },
];

const items = [
  { name: "Wireless Keyboard",  warehouse: "NYC-01", qty: 340, reorder: 50,  value: "$12,580", alert: false },
  { name: "USB-C Hub 7-in-1",   warehouse: "LA-02",  qty: 12,  reorder: 30,  value: "$1,440",  alert: true  },
  { name: "27\" 4K Monitor",    warehouse: "NYC-01", qty: 89,  reorder: 20,  value: "$71,200", alert: false },
  { name: "Mechanical Keyboard",warehouse: "CHI-03", qty: 7,   reorder: 25,  value: "$1,050",  alert: true  },
  { name: "Webcam 4K Pro",      warehouse: "LA-02",  qty: 156, reorder: 40,  value: "$23,400", alert: false },
];

export default function Template2() {
  const [active, setActive] = useState("Overview");

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Inter',sans-serif",
        background: "#0f172a",
      }}
    >
      {/* Dark Sidebar */}
      <aside
        style={{
          width: "248px",
          background: "#1e293b",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          borderRight: "1px solid #334155",
        }}
      >
        {/* Logo */}
        <div style={{ padding: "20px", borderBottom: "1px solid #334155" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="../src/assets/images/logo.png"
              width="75px"
              height="75px"
              alt="logo"
            />
            <div>
              <div
                style={{ fontWeight: 800, fontSize: "15px", color: "#f1f5f9" }}
              >
                NexStock
              </div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>
                Enterprise Suite
              </div>
            </div>
          </div>
        </div>

        {/* Workspace Switcher */}
        <div
          style={{ padding: "12px 16px", borderBottom: "1px solid #334155" }}
        >
          <button
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "8px",
              padding: "8px 12px",
              cursor: "pointer",
              color: "#94a3b8",
              fontSize: "13px",
            }}
          >
            <span>🏢</span>
            <span style={{ flex: 1, textAlign: "left", fontWeight: 600 }}>
              Acme Corp
            </span>
            <span>⌄</span>
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 12px",
                borderRadius: "8px",
                border: "none",
                background:
                  active === item.label ? "rgba(129,140,248,0.15)" : "none",
                color: active === item.label ? "#818cf8" : "#94a3b8",
                fontWeight: active === item.label ? 700 : 400,
                fontSize: "13px",
                cursor: "pointer",
                marginBottom: "2px",
                transition: "all 0.15s",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                if (active !== item.label)
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                if (active !== item.label)
                  e.currentTarget.style.background = "none";
              }}
            >
              <span
                style={{ fontSize: "15px", width: "18px", textAlign: "center" }}
              >
                {item.icon}
              </span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span
                  style={{
                    background: "#ef4444",
                    color: "#fff",
                    borderRadius: "999px",
                    fontSize: "10px",
                    fontWeight: 700,
                    padding: "1px 6px",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid #334155" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg,#818cf8,#34d399)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: "12px",
              }}
            >
              AK
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{ fontSize: "13px", fontWeight: 600, color: "#f1f5f9" }}
              >
                Alex Kim
              </div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>
                alex@acme.com
              </div>
            </div>
            <span style={{ color: "#64748b", fontSize: "14px" }}>↗</span>
          </div>
        </div>
      </aside>

      {/* Main */}
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
            background: "#1e293b",
            borderBottom: "1px solid #334155",
            padding: "0 28px",
            height: "58px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "#64748b",
            }}
          >
            <span>NexStock</span>
            <span>/</span>
            <span style={{ color: "#f1f5f9", fontWeight: 600 }}>{active}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ position: "relative" }}>
              <input
                placeholder="Search inventory..."
                style={{
                  padding: "7px 14px 7px 34px",
                  background: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  fontSize: "13px",
                  outline: "none",
                  color: "#f1f5f9",
                  width: "200px",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "13px",
                }}
              >
                🔍
              </span>
            </div>
            <button
              style={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "8px",
                padding: "7px 12px",
                cursor: "pointer",
                fontSize: "15px",
                color: "#94a3b8",
              }}
            >
              🔔
            </button>
            <button
              style={{
                background: "linear-gradient(135deg,#818cf8,#34d399)",
                color: "#fff",
                border: "none",
                padding: "7px 16px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              + New Item
            </button>
          </div>
        </header>

        {/* Content */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "28px",
            background: "#0f172a",
          }}
        >
          <div style={{ marginBottom: "24px" }}>
            <h1
              style={{
                margin: "0 0 4px",
                fontSize: "22px",
                fontWeight: 800,
                color: "#f1f5f9",
              }}
            >
              Good morning, Alex 👋
            </h1>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
              Here's what's happening with your inventory today.
            </p>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "#1e293b",
                  borderRadius: "14px",
                  padding: "20px",
                  border: "1px solid #334155",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "14px",
                  }}
                >
                  <span style={{ fontSize: "22px" }}>{s.icon}</span>
                  <span
                    style={{
                      fontSize: "11px",
                      color: s.color,
                      fontWeight: 600,
                      background: `${s.color}18`,
                      padding: "3px 8px",
                      borderRadius: "999px",
                    }}
                  >
                    {s.trend}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 900,
                    color: "#f1f5f9",
                    marginBottom: "4px",
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div
            style={{
              background: "#1e293b",
              borderRadius: "14px",
              border: "1px solid #334155",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "18px 20px",
                borderBottom: "1px solid #334155",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{ fontWeight: 700, fontSize: "15px", color: "#f1f5f9" }}
              >
                Inventory Overview
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  style={{
                    padding: "6px 14px",
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#94a3b8",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Filter
                </button>
                <button
                  style={{
                    padding: "6px 14px",
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#94a3b8",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Export
                </button>
              </div>
            </div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "13px",
              }}
            >
              <thead>
                <tr style={{ background: "#0f172a" }}>
                  {[
                    "Item Name",
                    "Warehouse",
                    "Qty",
                    "Reorder Point",
                    "Value",
                    "Alert",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#64748b",
                        fontSize: "12px",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr
                    key={i}
                    style={{ borderTop: "1px solid #334155" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.03)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <td
                      style={{
                        padding: "14px 16px",
                        fontWeight: 600,
                        color: "#f1f5f9",
                      }}
                    >
                      {item.name}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          background: "#0f172a",
                          color: "#94a3b8",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontFamily: "monospace",
                        }}
                      >
                        {item.warehouse}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "14px 16px",
                        fontWeight: 700,
                        color: item.qty < item.reorder ? "#fb923c" : "#34d399",
                      }}
                    >
                      {item.qty}
                    </td>
                    <td style={{ padding: "14px 16px", color: "#64748b" }}>
                      {item.reorder}
                    </td>
                    <td
                      style={{
                        padding: "14px 16px",
                        fontWeight: 700,
                        color: "#f1f5f9",
                      }}
                    >
                      {item.value}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      {item.alert ? (
                        <span
                          style={{
                            background: "#7f1d1d",
                            color: "#fca5a5",
                            padding: "3px 10px",
                            borderRadius: "999px",
                            fontSize: "11px",
                            fontWeight: 700,
                          }}
                        >
                          ⚠ Reorder
                        </span>
                      ) : (
                        <span
                          style={{
                            background: "#14532d",
                            color: "#86efac",
                            padding: "3px 10px",
                            borderRadius: "999px",
                            fontSize: "11px",
                            fontWeight: 700,
                          }}
                        >
                          ✓ OK
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
