import { useState } from "react";
import { DataTable }   from "../components/atoms/data-display/DataTable";
import { DataCard }    from "../components/atoms/data-display/DataCard";
import { Skeleton, SkeletonCard } from "../components/atoms/data-display/Skeleton";
import { Spinner, DotsLoader, PulseLoader, BarLoader } from "../components/atoms/data-display/Spinner";
import { ProgressBar } from "../components/atoms/data-display/ProgressBar";
import { EmptyState }  from "../components/atoms/data-display/EmptyState";
import { Tag }         from "../components/atoms/data-display/Tag";
import { AvatarGroup, AvatarItem } from "../components/atoms/data-display/AvatarGroup";
import { Timeline }    from "../components/atoms/data-display/Timeline";
import { Kbd, Divider, Tooltip } from "../components/atoms/data-display/Misc";
import AddToProjectModal from "../components/organisms/AddToProjectModal";
import "../components/organisms/AddToProjectModal.css";
import "./FormDetails.css";

const details = {
  dataTable: {
    name: "Data Table", tag: "Table", version: "1.0.0",
    description: "Responsive striped table with hover states for displaying structured data.",
    uses: ["User lists", "Order history", "Analytics", "Admin panels"],
    tags: ["table", "data", "grid", "responsive"],
    dependencies: ["None"], size: "3 KB", lastUpdated: "May 12, 2025",
    code: `import { DataTable } from "@/components/atoms/data-display";\n\n<DataTable\n  columns={["Name", "Role", "Status", "Joined"]}\n  rows={[\n    ["Alice", "Admin",  "Active",   "Jan 2024"],\n    ["Bob",   "Editor", "Inactive", "Mar 2024"],\n  ]}\n/>`,
  },
  dataCard: {
    name: "Data Card", tag: "Card", version: "1.0.0",
    description: "Metric card with value, trend indicator, icon and subtitle.",
    uses: ["Dashboards", "KPI panels", "Analytics", "Stats overview"],
    tags: ["card", "metric", "kpi", "dashboard"],
    dependencies: ["None"], size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { DataCard } from "@/components/atoms/data-display";\n\n<DataCard\n  title="Total Users"\n  value="12,430"\n  trend="8.2%"\n  trendUp\n  icon="👥"\n  subtitle="vs last month"\n/>`,
  },
  skeleton: {
    name: "Skeleton", tag: "Loader", version: "1.0.0",
    description: "Shimmer placeholder shown while content is loading.",
    uses: ["Page loading", "Lazy images", "Feed loading", "API wait states"],
    tags: ["skeleton", "loader", "shimmer", "placeholder"],
    dependencies: ["None"], size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { Skeleton, SkeletonCard } from "@/components/atoms/data-display";\n\n<Skeleton width="60%" height="14px" />\n<Skeleton width="48px" height="48px" circle />\n<SkeletonCard />`,
  },
  spinner: {
    name: "Loaders & Spinners", tag: "Loader", version: "1.0.0",
    description: "Four loader variants — spinner, dots, pulse ring and bar loader.",
    uses: ["Button loading", "Page transitions", "Data fetching", "Form submit"],
    tags: ["spinner", "loader", "dots", "animation"],
    dependencies: ["None"], size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { Spinner, DotsLoader, PulseLoader, BarLoader } from "@/components/atoms/data-display";\n\n<Spinner color="#6366f1" />\n<DotsLoader color="#6366f1" />\n<PulseLoader color="#6366f1" />\n<BarLoader color="#6366f1" />`,
  },
  progressBar: {
    name: "Progress Bar", tag: "Progress", version: "1.0.0",
    description: "Animated progress bar with label, value display and size variants.",
    uses: ["Upload progress", "Profile completion", "Skill levels", "Step indicators"],
    tags: ["progress", "bar", "animated", "indicator"],
    dependencies: ["None"], size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { ProgressBar } from "@/components/atoms/data-display";\n\n<ProgressBar value={72} label="Upload" color="#6366f1" size="md" />\n<ProgressBar value={45} label="Storage" color="#ef4444" size="sm" />`,
  },
  emptyState: {
    name: "Empty State", tag: "State", version: "1.0.0",
    description: "Friendly empty state with icon, title, description and optional CTA.",
    uses: ["Empty lists", "No search results", "First-time users", "Error pages"],
    tags: ["empty", "state", "placeholder", "cta"],
    dependencies: ["None"], size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { EmptyState } from "@/components/atoms/data-display";\n\n<EmptyState\n  icon="📭"\n  title="No results found"\n  description="Try adjusting your search filters."\n  action="Clear Filters"\n  onAction={() => {}}\n/>`,
  },
  tag: {
    name: "Tag / Chip", tag: "Label", version: "1.0.0",
    description: "Soft or solid colored label chips with optional remove button.",
    uses: ["Category labels", "Filter chips", "Skill tags", "Status badges"],
    tags: ["tag", "chip", "badge", "label"],
    dependencies: ["None"], size: "1 KB", lastUpdated: "May 12, 2025",
    code: `import { Tag } from "@/components/atoms/data-display";\n\n<Tag label="React"      color="#3b82f6" />\n<Tag label="TypeScript" color="#8b5cf6" variant="solid" />\n<Tag label="Remove me"  color="#ef4444" onRemove={() => {}} />`,
  },
  avatarGroup: {
    name: "Avatar Group", tag: "Avatar", version: "1.0.0",
    description: "Stacked avatar group with overflow count for team displays.",
    uses: ["Team members", "Collaborators", "Assignees", "Participants"],
    tags: ["avatar", "group", "team", "stack"],
    dependencies: ["None"], size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { AvatarGroup } from "@/components/atoms/data-display";\n\n<AvatarGroup\n  users={[\n    { name: "Alice" },\n    { name: "Bob" },\n    { name: "Carol" },\n    { name: "Dave" },\n  ]}\n  max={3}\n/>`,
  },
  timeline: {
    name: "Timeline", tag: "Feed", version: "1.0.0",
    description: "Vertical timeline for activity feeds, changelogs and event history.",
    uses: ["Activity feed", "Changelog", "Order tracking", "Project milestones"],
    tags: ["timeline", "feed", "activity", "events"],
    dependencies: ["None"], size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { Timeline } from "@/components/atoms/data-display";\n\n<Timeline items={[\n  { title: "Order placed",   time: "9:00 AM", color: "#22c55e" },\n  { title: "Processing",     time: "9:30 AM", color: "#3b82f6" },\n  { title: "Out for delivery", time: "2:00 PM", color: "#f59e0b" },\n]} />`,
  },
  misc: {
    name: "Misc Utilities", tag: "Utility", version: "1.0.0",
    description: "Keyboard shortcut badge, section divider and hover tooltip.",
    uses: ["Keyboard shortcuts", "Section separators", "Help tooltips", "UI polish"],
    tags: ["kbd", "divider", "tooltip", "utility"],
    dependencies: ["None"], size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { Kbd, Divider, Tooltip } from "@/components/atoms/data-display";\n\n<Kbd>⌘ K</Kbd>\n<Divider label="OR" />\n<Tooltip label="Click to copy">\n  <button>Copy</button>\n</Tooltip>`,
  },
};

const renderPreview = (selected) => {
  switch (selected) {
    case "dataTable": return (
      <DataTable
        columns={["Name", "Role", "Status", "Joined"]}
        rows={[
          ["Alice Johnson", "Admin",   <span style={{ color: "#22c55e", fontWeight: 600 }}>Active</span>,   "Jan 2024"],
          ["Bob Smith",     "Editor",  <span style={{ color: "#9ca3af", fontWeight: 600 }}>Inactive</span>, "Mar 2024"],
          ["Carol White",   "Viewer",  <span style={{ color: "#22c55e", fontWeight: 600 }}>Active</span>,   "Apr 2024"],
          ["Dave Brown",    "Manager", <span style={{ color: "#f59e0b", fontWeight: 600 }}>Pending</span>,  "May 2024"],
        ]}
      />
    );
    case "dataCard": return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: "12px", width: "100%" }}>
        <DataCard title="Total Users"     value="12,430" trend="8.2%"  trendUp  icon="👥" subtitle="vs last month" color="#6366f1" />
        <DataCard title="Revenue"         value="$48.2K" trend="12.5%" trendUp  icon="💰" subtitle="vs last month" color="#22c55e" />
        <DataCard title="Bounce Rate"     value="24.3%"  trend="3.1%"  trendUp={false} icon="📉" subtitle="vs last month" color="#ef4444" />
        <DataCard title="Active Sessions" value="1,284"  trend="5.7%"  trendUp  icon="🟢" subtitle="right now"    color="#f59e0b" />
      </div>
    );
    case "skeleton": return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Skeleton width="48px" height="48px" circle />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
            <Skeleton width="50%" height="14px" />
            <Skeleton width="35%" height="12px" />
          </div>
        </div>
        <SkeletonCard />
      </div>
    );
    case "spinner": return (
      <div style={{ display: "flex", gap: "40px", alignItems: "center", flexWrap: "wrap" }}>
        {[["#6366f1", "Spinner", <Spinner color="#6366f1" />], ["#ec4899", "Dots", <DotsLoader color="#ec4899" />], ["#22c55e", "Pulse", <PulseLoader color="#22c55e" />], ["#f59e0b", "Bar", <BarLoader color="#f59e0b" />]].map(([, label, el]) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            {el}
            <span style={{ fontSize: "12px", color: "#6b7280" }}>{label}</span>
          </div>
        ))}
      </div>
    );
    case "progressBar": return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
        <ProgressBar value={72} label="Upload Progress"  color="#6366f1" size="md" />
        <ProgressBar value={45} label="Storage Used"     color="#ef4444" size="sm" />
        <ProgressBar value={88} label="Profile Complete" color="#22c55e" size="lg" />
        <ProgressBar value={30} label="Tasks Completed"  color="#f59e0b" size="md" />
      </div>
    );
    case "emptyState": return (
      <EmptyState icon="📭" title="No results found" description="Try adjusting your search or filter to find what you're looking for." action="Clear Filters" />
    );
    case "tag": return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        <Tag label="React"      color="#3b82f6" />
        <Tag label="TypeScript" color="#8b5cf6" />
        <Tag label="Tailwind"   color="#06b6d4" />
        <Tag label="Vite"       color="#f59e0b" variant="solid" />
        <Tag label="Node.js"    color="#22c55e" variant="solid" />
        <Tag label="Remove me"  color="#ef4444" onRemove={() => {}} />
      </div>
    );
    case "avatarGroup": return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <AvatarGroup users={[{ name: "Alice Johnson" }, { name: "Bob Smith" }, { name: "Carol White" }, { name: "Dave Brown" }, { name: "Eve Davis" }]} max={4} />
        <div style={{ display: "flex", gap: "12px" }}>
          <AvatarItem name="Alice Johnson" size="48px" color="#6366f1" />
          <AvatarItem name="Bob Smith"     size="48px" color="#ec4899" />
          <AvatarItem name="Carol White"   size="48px" color="#f59e0b" />
        </div>
      </div>
    );
    case "timeline": return (
      <Timeline items={[
        { title: "Order placed",     description: "Payment confirmed",    time: "9:00 AM", color: "#22c55e" },
        { title: "Processing",       description: "Preparing your order", time: "9:30 AM", color: "#3b82f6" },
        { title: "Out for delivery", description: "Driver on the way",    time: "2:00 PM", color: "#f59e0b" },
        { title: "Delivered",        description: "Package left at door", time: "4:45 PM", color: "#6366f1" },
      ]} />
    );
    case "misc": return (
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Kbd>⌘ K</Kbd><Kbd>Ctrl + S</Kbd><Kbd>Alt + F4</Kbd><Kbd>⇧ Shift</Kbd>
        </div>
        <Divider label="OR" />
        <div style={{ display: "flex", gap: "16px" }}>
          <Tooltip label="Copy to clipboard"><button style={{ padding: "8px 16px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>Hover me</button></Tooltip>
          <Tooltip label="Delete permanently"><button style={{ padding: "8px 16px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>Danger</button></Tooltip>
        </div>
      </div>
    );
    default: return null;
  }
};

function CopyAction({ text, label = "Copy Code", icon = "📋" }) {
  const [copied, setCopied] = useState(false);
  const handle = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className="fd-action-btn fd-copy-btn" onClick={handle}>
      <span className="fd-action-icon">{copied ? "✓" : icon}</span>
      {copied ? "✓ Copied!" : label}
    </button>
  );
}

export default function DataDisplayDetails({ selected, onBack, onNavigateHome }) {
  const [activeTab, setActiveTab] = useState("description");
  const [showModal, setShowModal] = useState(false);

  const d = details[selected];

  if (!d) return (
    <div className="fd-empty">
      <p>Component not found.</p>
      <button onClick={onBack}>Back to Collection</button>
    </div>
  );

  const mockComponent = {
    name: d.name,
    slug: selected.replace(/([A-Z])/g, "-$1").toLowerCase(),
    sourceCode: d.code,
    dependencies: d.dependencies[0] === "None" ? [] : d.dependencies,
    version: d.version,
  };

  return (
    <div className="fd-wrapper">
      {/* TOP NAV */}
      <div className="fd-top-nav">
        <div className="fd-breadcrumbs">
          <span onClick={onNavigateHome}>Home</span>
          {" > "}
          <span onClick={onNavigateHome}>Components</span>
          {" > "}
          <span onClick={onBack}>Data Display</span>
          {" > "}
          <span className="fd-bc-active">{d.name}</span>
        </div>
        <button className="fd-top-add-btn" onClick={() => setShowModal(true)}>
          ⚡ Add to Project
        </button>
      </div>

      <div className="fd-main-layout">
        {/* LEFT COLUMN */}
        <div className="fd-left-col">
          {/* HEADER */}
          <div className="fd-component-header">
            <div className="fd-title-row">
              <h1 className="fd-title">{d.name}</h1>
              <span className="fd-type-badge">{d.tag}</span>
              <span className="fd-version-badge">v{d.version}</span>
            </div>
            <p className="fd-description">{d.description}</p>
          </div>

          {/* LIVE PREVIEW */}
          <section className="fd-preview-section">
            <div className="fd-preview-label-row"><span>Live Preview</span></div>
            <div className="fd-preview-area">
              <div className="fd-preview-item" style={{ width: "100%", maxWidth: "100%" }}>
                {renderPreview(selected)}
              </div>
            </div>
          </section>

          {/* CODE PREVIEW */}
          <section className="fd-code-section">
            <div className="fd-code-header">
              <span className="fd-code-title">Code Preview</span>
              <div className="fd-code-controls">
                <span>Import</span>
                <span className="fd-es6-badge">ES6</span>
              </div>
            </div>
            <div className="fd-code-body">
              <pre className="fd-code-block"><code>{d.code}</code></pre>
              <CopyAction text={d.code} label="Copy" icon="📄" />
            </div>
          </section>

          {/* TABS */}
          <section className="fd-tabs-section">
            <div className="fd-tabs-list">
              {["Description", "Props", "Usage", "Dependencies"].map((tab) => (
                <button
                  key={tab}
                  className={`fd-tab-btn ${activeTab === tab.toLowerCase() ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="fd-tab-content">
              {activeTab === "description" && (
                <div>
                  <p>{d.description}</p>
                  <h3>Features</h3>
                  <ul className="fd-features-list">
                    {d.tags?.map((tag) => (
                      <li key={tag} className="fd-feature-item">
                        <span className="fd-check-icon">✓</span> {tag}
                      </li>
                    ))}
                    {d.uses?.map((use) => (
                      <li key={use} className="fd-feature-item">
                        <span className="fd-check-icon">✓</span> Best Used For: {use}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === "props"        && <div>Props documentation coming soon...</div>}
              {activeTab === "usage"        && <div>Usage examples coming soon...</div>}
              {activeTab === "dependencies" && (
                <div>
                  <h3>Dependencies</h3>
                  <ul className="fd-dep-list">
                    {d.dependencies.map((dep) => <li key={dep}>{dep}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="fd-right-sidebar">
          <section className="fd-sidebar-box">
            <h3>Component Information</h3>
            <div className="fd-info-grid">
              <div className="fd-info-row"><span className="fd-info-label">Category</span><span className="fd-info-value">Data Display</span></div>
              <div className="fd-info-row"><span className="fd-info-label">Type</span><span className="fd-info-value">{d.tag}</span></div>
              <div className="fd-info-row"><span className="fd-info-label">Size</span><span className="fd-info-value">{d.size}</span></div>
              <div className="fd-info-row"><span className="fd-info-label">Last Updated</span><span className="fd-info-value">{d.lastUpdated}</span></div>
              <div className="fd-info-row"><span className="fd-info-label">Author</span><span className="fd-info-value">UI Team</span></div>
            </div>
          </section>

          <section className="fd-sidebar-box">
            <h3>Actions</h3>
            <div className="fd-actions-list">
              <button className="fd-action-btn fd-add-btn" onClick={() => setShowModal(true)}>
                <span className="fd-action-icon">⚡</span> Add to Project
              </button>
              <CopyAction text={d.code} label="Copy Code" icon="📋" />
              <button
                className="fd-action-btn fd-github-btn"
                onClick={() => window.open("https://github.com/mahadevanr-rgb/gsus-template-hub", "_blank")}
              >
                <span className="fd-action-icon">🔗</span> View on GitHub
              </button>
            </div>
          </section>
        </div>
      </div>

      {showModal && (
        <AddToProjectModal component={mockComponent} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
