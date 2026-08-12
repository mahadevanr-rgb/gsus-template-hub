import { useState } from "react";

const railItems = [
  { icon: "⊞", label: "Dashboard" },
  { icon: "📦", label: "Inventory" },
  { icon: "🔄", label: "Transfers" },
  { icon: "🚚", label: "Suppliers" },
  { icon: "📋", label: "Orders" },
  { icon: "📊", label: "Analytics" },
];
const bottomRail = [
  { icon: "🔔", label: "Alerts" },
  { icon: "⚙️", label: "Settings" },
];

const metrics = [
  {
    label: "Total Value",
    value: "$2.4M",
    sub: "+14% this month",
    icon: "💎",
    grad: "linear-gradient(135deg,#6366f1,#8b5cf6)",
  },
  {
    label: "Items Tracked",
    value: "18,294",
    sub: "across 4 warehouses",
    icon: "📦",
    grad: "linear-gradient(135deg,#0ea5e9,#6366f1)",
  },
  {
    label: "Fulfillment",
    value: "98.2%",
    sub: "on-time rate",
    icon: "🚀",
    grad: "linear-gradient(135deg,#10b981,#0ea5e9)",
  },
  {
    label: "Alerts",
    value: "7",
    sub: "need attention",
    icon: "⚡",
    grad: "linear-gradient(135deg,#f59e0b,#ef4444)",
  },
];

const rows = [
  {
    name: "RTX 4090 GPU",
    cat: "Components",
    stock: 23,
    val: "$27,600",
    trend: "+4",
    up: true,
  },
  {
    name: "32GB DDR5 RAM",
    cat: "Memory",
    stock: 180,
    val: "$14,400",
    trend: "+12",
    up: true,
  },
  {
    name: "2TB NVMe SSD",
    cat: "Storage",
    stock: 6,
    val: "$1,800",
    trend: "-8",
    up: false,
  },
  {
    name: "Intel Core i9-14900",
    cat: "Processors",
    stock: 41,
    val: "$49,200",
    trend: "+2",
    up: true,
  },
  {
    name: "ASUS ROG Motherboard",
    cat: "Boards",
    stock: 0,
    val: "$0",
    trend: "-15",
    up: false,
  },
  {
    name: "850W PSU Gold",
    cat: "Power",
    stock: 67,
    val: "$10,050",
    trend: "+6",
    up: true,
  },
];

export default function Template4() {
  const [active, setActive] = useState("Dashboard");
  const [hovered, setHovered] = useState(null);
  const [hovRow, setHovRow] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Inter',sans-serif",
        background:
          "linear-gradient(135deg,#0a0a1a 0%,#0d1117 50%,#0a0f1e 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "80px",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle,rgba(99,102,241,0.15),transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          right: "200px",
          width: "350px",
          height: "350px",
          background:
            "radial-gradient(circle,rgba(16,185,129,0.1),transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      {/* ── Icon Rail ── */}
      <aside
        style={{
          width: "68px",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px 0",
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <img
          src="../src/assets/images/logo.png"
          width="75px"
          height="75px"
          alt="logo"
        />

        {/* Top nav */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            width: "100%",
            alignItems: "center",
          }}
        >
          {railItems.map((item) => {
            const isActive = active === item.label;
            return (
              <div
                key={item.label}
                style={{ position: "relative", width: "100%" }}
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <button
                  onClick={() => setActive(item.label)}
                  style={{
                    width: "100%",
                    padding: "12px 0",
                    background: isActive ? "rgba(99,102,241,0.2)" : "none",
                    border: "none",
                    borderLeft: isActive
                      ? "3px solid #6366f1"
                      : "3px solid transparent",
                    cursor: "pointer",
                    fontSize: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = "none";
                  }}
                >
                  {item.icon}
                </button>
                {/* Tooltip */}
                {hovered === item.label && (
                  <div
                    style={{
                      position: "absolute",
                      left: "72px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(15,15,30,0.95)",
                      color: "#f1f5f9",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      zIndex: 100,
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      pointerEvents: "none",
                    }}
                  >
                    {item.label}
                    <div
                      style={{
                        position: "absolute",
                        left: "-5px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "8px",
                        height: "8px",
                        background: "rgba(15,15,30,0.95)",
                        borderLeft: "1px solid rgba(255,255,255,0.1)",
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                        rotate: "45deg",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom nav */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            width: "100%",
            alignItems: "center",
          }}
        >
          {bottomRail.map((item) => (
            <button
              key={item.label}
              style={{
                width: "100%",
                padding: "12px 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                color: "#64748b",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              {item.icon}
            </button>
          ))}
          {/* Avatar */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#6366f1,#10b981)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 800,
              fontSize: "12px",
              marginTop: "8px",
              cursor: "pointer",
              border: "2px solid rgba(255,255,255,0.1)",
            }}
          >
            TK
          </div>
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
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            padding: "0 28px",
            height: "58px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "13px", color: "#475569" }}>
              Warehouse
            </span>
            <span style={{ color: "#334155" }}>›</span>
            <span
              style={{ fontSize: "13px", fontWeight: 700, color: "#f1f5f9" }}
            >
              {active}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ position: "relative" }}>
              <input
                placeholder="Quick search..."
                style={{
                  padding: "8px 16px 8px 36px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  fontSize: "13px",
                  outline: "none",
                  color: "#f1f5f9",
                  width: "200px",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(99,102,241,0.6)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                }
              />
              <span
                style={{
                  position: "absolute",
                  left: "12px",
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
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                padding: "8px 12px",
                cursor: "pointer",
                fontSize: "15px",
                position: "relative",
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
                  width: "14px",
                  height: "14px",
                  fontSize: "9px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                7
              </span>
            </button>
            <button
              style={{
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                color: "#fff",
                border: "none",
                padding: "8px 18px",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(99,102,241,0.35)",
              }}
            >
              + Add Item
            </button>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          <div style={{ marginBottom: "20px" }}>
            <h1
              style={{
                margin: "0 0 4px",
                fontSize: "20px",
                fontWeight: 800,
                color: "#f1f5f9",
              }}
            >
              Inventory Control
            </h1>
            <p style={{ margin: 0, fontSize: "13px", color: "#475569" }}>
              Real-time stock monitoring across all warehouses
            </p>
          </div>

          {/* Metric Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "14px",
              marginBottom: "20px",
            }}
          >
            {metrics.map((m) => (
              <div
                key={m.label}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  padding: "18px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    width: "80px",
                    height: "80px",
                    background: m.grad,
                    borderRadius: "50%",
                    opacity: 0.15,
                  }}
                />
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    background: m.grad,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    marginBottom: "12px",
                  }}
                >
                  {m.icon}
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: 900,
                    color: "#f1f5f9",
                    marginBottom: "4px",
                  }}
                >
                  {m.value}
                </div>
                <div style={{ fontSize: "11px", color: "#475569" }}>
                  {m.label}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    marginTop: "2px",
                  }}
                >
                  {m.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Stock Table — Glass style */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(20px)",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.07)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{ fontWeight: 700, fontSize: "14px", color: "#f1f5f9" }}
              >
                Live Stock Feed
              </span>
              <div style={{ display: "flex", gap: "6px" }}>
                {["Export", "Filter", "Columns"].map((b) => (
                  <button
                    key={b}
                    style={{
                      padding: "5px 12px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "#94a3b8",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
            {/* Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2.5fr 1fr 0.8fr 1fr 0.8fr",
                padding: "10px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {["Product", "Category", "Stock", "Value", "Trend"].map((h) => (
                <span
                  key={h}
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#475569",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
            {/* Rows */}
            {rows.map((r, i) => (
              <div
                key={i}
                onMouseEnter={() => setHovRow(i)}
                onMouseLeave={() => setHovRow(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2.5fr 1fr 0.8fr 1fr 0.8fr",
                  padding: "14px 20px",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  background:
                    hovRow === i ? "rgba(99,102,241,0.07)" : "transparent",
                  transition: "background 0.15s",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#e2e8f0",
                  }}
                >
                  {r.name}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    background: "rgba(255,255,255,0.06)",
                    padding: "3px 10px",
                    borderRadius: "999px",
                    width: "fit-content",
                  }}
                >
                  {r.cat}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color:
                      r.stock === 0
                        ? "#ef4444"
                        : r.stock < 10
                          ? "#f59e0b"
                          : "#10b981",
                  }}
                >
                  {r.stock}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#e2e8f0",
                  }}
                >
                  {r.val}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: r.up ? "#10b981" : "#ef4444",
                    background: r.up
                      ? "rgba(16,185,129,0.1)"
                      : "rgba(239,68,68,0.1)",
                    padding: "3px 10px",
                    borderRadius: "999px",
                    width: "fit-content",
                  }}
                >
                  {r.up ? "▲" : "▼"} {r.trend}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
