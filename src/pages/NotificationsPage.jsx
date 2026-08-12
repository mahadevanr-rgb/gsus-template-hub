import { useState } from "react";
import NotificationDetails from "./NotificationDetails";
import "./ButtonsPage.css";

const notificationComponents = [
  { id: "toast",                name: "Toast",                 description: "Success / error / warning / info pop-up messages",  tag: "Feedback" },
  { id: "alert",                name: "Alert",                 description: "Inline alert banners with icon and dismiss",         tag: "Feedback" },
  { id: "banner",               name: "Banner",                description: "Full-width announcement banners",                    tag: "Feedback" },
  { id: "snackbar",             name: "Snackbar",              description: "Dark bottom notification with optional action",      tag: "Feedback" },
  { id: "notificationCard",     name: "Notification Card",     description: "Rich notification item with avatar and time",        tag: "Card"     },
  { id: "notificationBadge",    name: "Notification Badge",    description: "Count / dot badge overlaid on any element",          tag: "Badge"    },
  { id: "statusDot",            name: "Status Dot",            description: "Online / offline / busy presence indicator",         tag: "Status"   },
  { id: "progressNotification", name: "Progress Notification", description: "Upload / task progress inside a notification",       tag: "Progress" },
  { id: "confirmDialog",        name: "Confirm Dialog",        description: "Danger / warning confirmation modal",                tag: "Dialog"   },
  { id: "inlineMessage",        name: "Inline Message",        description: "Compact inline status message with icon",            tag: "Inline"   },
];

export default function NotificationsPage() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => { setSelected(id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleBack   = ()    => { setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" }); };

  if (selected) return <NotificationDetails selected={selected} onBack={handleBack} />;

  return (
    <div className="buttons-page">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem", background: "linear-gradient(135deg,#fff 0%,#f5f7fa 100%)", minHeight: "100vh" }}>
        <div style={{ marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#1f2937", marginBottom: "0.5rem" }}>Notification Components</h1>
          <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>10 notification patterns — toasts, alerts, banners, badges & more. Click any card to explore.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.5rem" }}>
          {notificationComponents.map(c => (
            <div key={c.id} onClick={() => handleSelect(c.id)}
              style={{ background: "#fff", borderRadius: "12px", padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderLeft: "4px solid #f59e0b", cursor: "pointer", transition: "all 0.3s ease" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(245,158,11,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
            >
              <span style={{ display: "inline-block", padding: "0.25rem 0.75rem", background: "rgba(245,158,11,0.1)", color: "#d97706", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 600, marginBottom: "1rem" }}>{c.tag}</span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1f2937", marginBottom: "0.5rem" }}>{c.name}</h3>
              <p style={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: 1.5 }}>{c.description}</p>
              <div style={{ marginTop: "1.5rem", color: "#d97706", fontWeight: 600, fontSize: "0.9rem" }}>View Details →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
