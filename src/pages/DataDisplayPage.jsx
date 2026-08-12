import { useState } from "react";
import DataDisplayDetails from "./DataDisplayDetails";
import "./ButtonsPage.css";

const dataDisplayComponents = [
  { id: "dataTable",   name: "Data Table",          description: "Responsive striped table with hover states",          tag: "Table"    },
  { id: "dataCard",    name: "Data Card",            description: "Metric card with value, trend and icon",             tag: "Card"     },
  { id: "skeleton",    name: "Skeleton",             description: "Shimmer placeholder while content loads",            tag: "Loader"   },
  { id: "spinner",     name: "Loaders & Spinners",   description: "Spinner, dots, pulse ring and bar loader",           tag: "Loader"   },
  { id: "progressBar", name: "Progress Bar",         description: "Animated progress bar with label and size variants", tag: "Progress" },
  { id: "emptyState",  name: "Empty State",          description: "Friendly empty state with icon and CTA",             tag: "State"    },
  { id: "tag",         name: "Tag / Chip",           description: "Soft or solid colored label chips",                  tag: "Label"    },
  { id: "avatarGroup", name: "Avatar Group",         description: "Stacked avatars with overflow count",                tag: "Avatar"   },
  { id: "timeline",    name: "Timeline",             description: "Vertical timeline for activity and events",          tag: "Feed"     },
  { id: "misc",        name: "Misc Utilities",       description: "Keyboard badge, divider and tooltip",                tag: "Utility"  },
];

export default function DataDisplayPage() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => { setSelected(id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleBack   = ()    => { setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" }); };

  if (selected) return <DataDisplayDetails selected={selected} onBack={handleBack} />;

  return (
    <div className="buttons-page">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem", background: "linear-gradient(135deg,#fff 0%,#f5f7fa 100%)", minHeight: "100vh" }}>
        <div style={{ marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#1f2937", marginBottom: "0.5rem" }}>Data Display Components</h1>
          <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>10 data display patterns — tables, cards, loaders, skeletons & more. Click any card to explore.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.5rem" }}>
          {dataDisplayComponents.map(c => (
            <div key={c.id} onClick={() => handleSelect(c.id)}
              style={{ background: "#fff", borderRadius: "12px", padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderLeft: "4px solid #22c55e", cursor: "pointer", transition: "all 0.3s ease" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(34,197,94,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
            >
              <span style={{ display: "inline-block", padding: "0.25rem 0.75rem", background: "rgba(34,197,94,0.1)", color: "#16a34a", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 600, marginBottom: "1rem" }}>{c.tag}</span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1f2937", marginBottom: "0.5rem" }}>{c.name}</h3>
              <p style={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: 1.5 }}>{c.description}</p>
              <div style={{ marginTop: "1.5rem", color: "#16a34a", fontWeight: 600, fontSize: "0.9rem" }}>View Details →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
