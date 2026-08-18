import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import NotificationDetails from "./NotificationDetails";
import "./NotificationsPage.css";

const notificationComponents = [
  { id: "toast",                name: "Toast",                 description: "Success / error / warning / info pop-up messages.",  tag: "Feedback" },
  { id: "alert",                name: "Alert",                 description: "Inline alert banners with icon and dismiss button.",  tag: "Feedback" },
  { id: "banner",               name: "Banner",                description: "Full-width announcement banners with action.",        tag: "Feedback" },
  { id: "snackbar",             name: "Snackbar",              description: "Dark bottom notification with optional action.",      tag: "Feedback" },
  { id: "notificationCard",     name: "Notification Card",     description: "Rich notification item with avatar and timestamp.",  tag: "Card"     },
  { id: "notificationBadge",    name: "Notification Badge",    description: "Count or dot badge overlaid on any element.",        tag: "Badge"    },
  { id: "statusDot",            name: "Status Dot",            description: "Online / offline / busy presence indicator.",        tag: "Status"   },
  { id: "progressNotification", name: "Progress Notification", description: "Upload or task progress inside a notification.",     tag: "Progress" },
  { id: "confirmDialog",        name: "Confirm Dialog",        description: "Danger / warning confirmation modal.",               tag: "Dialog"   },
  { id: "inlineMessage",        name: "Inline Message",        description: "Compact inline status message with icon.",           tag: "Inline"   },
];

export default function NotificationsPage() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (id) => { setSelected(id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleBack   = ()    => { setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <MainLayout>
      {selected ? (
        <NotificationDetails
          selected={selected}
          onBack={handleBack}
          onNavigateHome={() => navigate("/")}
        />
      ) : (
        <section className="notif-showcase">
          <div className="breadcrumbs">
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Home</span>
            {" > "}
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Components</span>
            {" > "}
            <span className="active">Notifications</span>
          </div>
          <div className="showcase-header">
            <h2>Notification Components</h2>
            <p>10 notification patterns — toasts, alerts, banners, badges & more</p>
          </div>
          <div className="notif-grid">
            {notificationComponents.map((c) => (
              <div key={c.id} className="notif-card" onClick={() => handleSelect(c.id)}>
                <div className="notif-preview">
                  <div className="notif-tag-badge">{c.tag}</div>
                </div>
                <div className="notif-info">
                  <h3>{c.name}</h3>
                  <p>{c.description}</p>
                  <span className="view-details">View Details →</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </MainLayout>
  );
}
