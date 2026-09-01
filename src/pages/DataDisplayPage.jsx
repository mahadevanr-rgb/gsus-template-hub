import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import DataDisplayDetails from "./DataDisplayDetails";
import "./DataDisplayPage.css";

const dataDisplayComponents = [
  { id: "dataTable",   name: "Data Table",        description: "Responsive striped table with hover states for structured data.", tag: "Table"    },
  { id: "dataCard",    name: "Data Card",          description: "Metric card with value, trend indicator and icon.",               tag: "Card"     },
  { id: "skeleton",    name: "Skeleton",           description: "Shimmer placeholder while content loads.",                        tag: "Loader"   },
  { id: "spinner",     name: "Loaders & Spinners", description: "Spinner, dots, pulse ring and bar loader variants.",              tag: "Loader"   },
  { id: "progressBar", name: "Progress Bar",       description: "Animated progress bar with label and size variants.",             tag: "Progress" },
  { id: "emptyState",  name: "Empty State",        description: "Friendly empty state with icon, title and CTA.",                  tag: "State"    },
  { id: "tag",         name: "Tag / Chip",         description: "Soft or solid colored label chips with optional remove.",         tag: "Label"    },
  { id: "avatarGroup", name: "Avatar Group",       description: "Stacked avatars with overflow count for team displays.",          tag: "Avatar"   },
  { id: "timeline",    name: "Timeline",           description: "Vertical timeline for activity feeds and event history.",         tag: "Feed"     },
  { id: "misc",        name: "Misc Utilities",     description: "Keyboard badge, section divider and hover tooltip.",              tag: "Utility"  },
];

export default function DataDisplayPage() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (id) => { setSelected(id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleBack   = ()    => { setSelected(null); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <MainLayout>
      {selected ? (
        <DataDisplayDetails
          selected={selected}
          onBack={handleBack}
          onNavigateHome={() => navigate("/")}
        />
      ) : (
        <section className="dd-showcase">
          <div className="breadcrumbs">
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Home</span>
            {" > "}
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Components</span>
            {" > "}
            <span className="active">Data Display</span>
          </div>
          <div className="showcase-header">
            <h2>Data Display Components</h2>
            <p>10 data display patterns — tables, cards, loaders, skeletons & more</p>
          </div>
          <div className="dd-grid">
            {dataDisplayComponents.map((c) => (
              <div key={c.id} className="dd-card" onClick={() => handleSelect(c.id)}>
                <div className="dd-preview">
                  <div className="dd-tag-badge">{c.tag}</div>
                </div>
                <div className="dd-info">
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
