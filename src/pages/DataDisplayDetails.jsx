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
import ComponentDetailsShell from "../components/organisms/ComponentDetailsShell";
import "./FormDetails.css";

const details = {
  dataTable: {
    name: "Data Table",
    description: "Responsive striped table with hover states for displaying structured data.",
    uses: ["User lists", "Order history", "Analytics", "Admin panels"],
    variants: [{ label: "Striped", description: "Alternating row colors" }, { label: "Hover", description: "Row highlight on hover" }],
    code: `import { DataTable } from "@/components/atoms/data-display";

<DataTable
  columns={["Name", "Role", "Status", "Joined"]}
  rows={[
    ["Alice", "Admin",    "Active",   "Jan 2024"],
    ["Bob",   "Editor",   "Inactive", "Mar 2024"],
  ]}
/>`,
  },
  dataCard: {
    name: "Data Card",
    description: "Metric card with value, trend indicator, icon and subtitle.",
    uses: ["Dashboards", "KPI panels", "Analytics", "Stats overview"],
    variants: [{ label: "With Trend", description: "Up/down indicator" }, { label: "With Icon", description: "Emoji or icon" }],
    code: `import { DataCard } from "@/components/atoms/data-display";

<DataCard title="Total Users" value="12,430" trend="8.2%" trendUp icon="👥" subtitle="vs last month" />`,
  },
  skeleton: {
    name: "Skeleton",
    description: "Shimmer placeholder shown while content is loading.",
    uses: ["Page loading", "Lazy images", "Feed loading", "API wait states"],
    variants: [{ label: "Line", description: "Text placeholder" }, { label: "Circle", description: "Avatar placeholder" }, { label: "Card", description: "Full card skeleton" }],
    code: `import { Skeleton, SkeletonCard } from "@/components/atoms/data-display";

<Skeleton width="60%" height="14px" />
<Skeleton width="48px" height="48px" circle />
<SkeletonCard />`,
  },
  spinner: {
    name: "Loaders & Spinners",
    description: "Four loader variants — spinner, dots, pulse ring and bar loader.",
    uses: ["Button loading", "Page transitions", "Data fetching", "Form submit"],
    variants: [{ label: "Spinner", description: "Rotating ring" }, { label: "Dots", description: "Bouncing dots" }, { label: "Pulse", description: "Pulse ring" }, { label: "Bar", description: "Sliding bar" }],
    code: `import { Spinner, DotsLoader, PulseLoader, BarLoader } from "@/components/atoms/data-display";

<Spinner color="#6366f1" />
<DotsLoader color="#6366f1" />
<PulseLoader color="#6366f1" />
<BarLoader color="#6366f1" />`,
  },
  progressBar: {
    name: "Progress Bar",
    description: "Animated progress bar with label, value display and size variants.",
    uses: ["Upload progress", "Profile completion", "Skill levels", "Step indicators"],
    variants: [{ label: "Small", description: "4px height" }, { label: "Medium", description: "8px height" }, { label: "Large", description: "14px height" }],
    code: `import { ProgressBar } from "@/components/atoms/data-display";

<ProgressBar value={72} label="Upload" color="#6366f1" size="md" />
<ProgressBar value={45} label="Storage" color="#ef4444" size="sm" />`,
  },
  emptyState: {
    name: "Empty State",
    description: "Friendly empty state with icon, title, description and optional CTA.",
    uses: ["Empty lists", "No search results", "First-time users", "Error pages"],
    variants: [{ label: "Default", description: "Icon + title" }, { label: "With CTA", description: "Includes action button" }],
    code: `import { EmptyState } from "@/components/atoms/data-display";

<EmptyState
  icon="📭"
  title="No results found"
  description="Try adjusting your search filters."
  action="Clear Filters"
  onAction={() => {}}
/>`,
  },
  tag: {
    name: "Tag / Chip",
    description: "Soft or solid colored label chips with optional remove button.",
    uses: ["Category labels", "Filter chips", "Skill tags", "Status badges"],
    variants: [{ label: "Soft", description: "Light background" }, { label: "Solid", description: "Filled background" }, { label: "Removable", description: "With × button" }],
    code: `import { Tag } from "@/components/atoms/data-display";

<Tag label="React"      color="#3b82f6" />
<Tag label="TypeScript" color="#8b5cf6" variant="solid" />
<Tag label="Remove me"  color="#ef4444" onRemove={() => {}} />`,
  },
  avatarGroup: {
    name: "Avatar Group",
    description: "Stacked avatar group with overflow count for team displays.",
    uses: ["Team members", "Collaborators", "Assignees", "Participants"],
    variants: [{ label: "Initials", description: "Letter avatars" }, { label: "Overflow", description: "+N more" }],
    code: `import { AvatarGroup } from "@/components/atoms/data-display";

<AvatarGroup
  users={[{ name: "Alice" }, { name: "Bob" }, { name: "Carol" }, { name: "Dave" }]}
  max={3}
/>`,
  },
  timeline: {
    name: "Timeline",
    description: "Vertical timeline for activity feeds, changelogs and event history.",
    uses: ["Activity feed", "Changelog", "Order tracking", "Project milestones"],
    variants: [{ label: "Default", description: "Dot + line" }, { label: "Colored", description: "Custom dot colors" }],
    code: `import { Timeline } from "@/components/atoms/data-display";

<Timeline items={[
  { title: "Order placed",   time: "9:00 AM",  color: "#22c55e" },
  { title: "Processing",     time: "9:30 AM",  color: "#3b82f6" },
  { title: "Out for delivery", time: "2:00 PM", color: "#f59e0b" },
]} />`,
  },
  misc: {
    name: "Misc Utilities",
    description: "Keyboard shortcut badge, section divider and hover tooltip.",
    uses: ["Keyboard shortcuts", "Section separators", "Help tooltips", "UI polish"],
    variants: [{ label: "Kbd", description: "Key badge" }, { label: "Divider", description: "Section separator" }, { label: "Tooltip", description: "Hover hint" }],
    code: `import { Kbd, Divider, Tooltip } from "@/components/atoms/data-display";

<Kbd>⌘ K</Kbd>
<Divider label="OR" />
<Tooltip label="Click to copy">
  <button>Copy</button>
</Tooltip>`,
  },
};

const previews = {
  dataTable: (
    <DataTable
      columns={["Name", "Role", "Status", "Joined"]}
      rows={[
        ["Alice Johnson", "Admin",    <span style={{ color: "#22c55e", fontWeight: 600 }}>Active</span>,   "Jan 2024"],
        ["Bob Smith",     "Editor",   <span style={{ color: "#9ca3af", fontWeight: 600 }}>Inactive</span>, "Mar 2024"],
        ["Carol White",   "Viewer",   <span style={{ color: "#22c55e", fontWeight: 600 }}>Active</span>,   "Apr 2024"],
        ["Dave Brown",    "Manager",  <span style={{ color: "#f59e0b", fontWeight: 600 }}>Pending</span>,  "May 2024"],
      ]}
    />
  ),
  dataCard: (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "12px", width: "100%" }}>
      <DataCard title="Total Users"   value="12,430" trend="8.2%"  trendUp  icon="👥" subtitle="vs last month" color="#6366f1" />
      <DataCard title="Revenue"       value="$48.2K" trend="12.5%" trendUp  icon="💰" subtitle="vs last month" color="#22c55e" />
      <DataCard title="Bounce Rate"   value="24.3%"  trend="3.1%"  trendUp={false} icon="📉" subtitle="vs last month" color="#ef4444" />
      <DataCard title="Active Sessions" value="1,284" trend="5.7%" trendUp icon="🟢" subtitle="right now"    color="#f59e0b" />
    </div>
  ),
  skeleton: (
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
  ),
  spinner: (
    <div style={{ display: "flex", gap: "40px", alignItems: "center", flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <Spinner color="#6366f1" />
        <span style={{ fontSize: "12px", color: "#6b7280" }}>Spinner</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <DotsLoader color="#ec4899" />
        <span style={{ fontSize: "12px", color: "#6b7280" }}>Dots</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <PulseLoader color="#22c55e" />
        <span style={{ fontSize: "12px", color: "#6b7280" }}>Pulse</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <BarLoader color="#f59e0b" />
        <span style={{ fontSize: "12px", color: "#6b7280" }}>Bar</span>
      </div>
    </div>
  ),
  progressBar: (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
      <ProgressBar value={72} label="Upload Progress"    color="#6366f1" size="md" />
      <ProgressBar value={45} label="Storage Used"       color="#ef4444" size="sm" />
      <ProgressBar value={88} label="Profile Complete"   color="#22c55e" size="lg" />
      <ProgressBar value={30} label="Tasks Completed"    color="#f59e0b" size="md" />
    </div>
  ),
  emptyState: (
    <EmptyState icon="📭" title="No results found" description="Try adjusting your search or filter to find what you're looking for." action="Clear Filters" />
  ),
  tag: (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      <Tag label="React"      color="#3b82f6" />
      <Tag label="TypeScript" color="#8b5cf6" />
      <Tag label="Tailwind"   color="#06b6d4" />
      <Tag label="Vite"       color="#f59e0b" variant="solid" />
      <Tag label="Node.js"    color="#22c55e" variant="solid" />
      <Tag label="Remove me"  color="#ef4444" onRemove={() => {}} />
    </div>
  ),
  avatarGroup: (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <AvatarGroup users={[{ name: "Alice Johnson" }, { name: "Bob Smith" }, { name: "Carol White" }, { name: "Dave Brown" }, { name: "Eve Davis" }]} max={4} />
      <div style={{ display: "flex", gap: "12px" }}>
        <AvatarItem name="Alice Johnson" size="48px" color="#6366f1" />
        <AvatarItem name="Bob Smith"     size="48px" color="#ec4899" />
        <AvatarItem name="Carol White"   size="48px" color="#f59e0b" />
      </div>
    </div>
  ),
  timeline: (
    <Timeline items={[
      { title: "Order placed",      description: "Payment confirmed",       time: "9:00 AM",  color: "#22c55e" },
      { title: "Processing",        description: "Preparing your order",    time: "9:30 AM",  color: "#3b82f6" },
      { title: "Out for delivery",  description: "Driver is on the way",    time: "2:00 PM",  color: "#f59e0b" },
      { title: "Delivered",         description: "Package left at door",    time: "4:45 PM",  color: "#6366f1" },
    ]} />
  ),
  misc: (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Kbd>⌘ K</Kbd><Kbd>Ctrl + S</Kbd><Kbd>Alt + F4</Kbd><Kbd>⇧ Shift</Kbd>
      </div>
      <Divider label="OR" />
      <Divider />
      <div style={{ display: "flex", gap: "16px" }}>
        <Tooltip label="Copy to clipboard"><button style={{ padding: "8px 16px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>Hover me</button></Tooltip>
        <Tooltip label="Delete permanently"><button style={{ padding: "8px 16px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>Danger</button></Tooltip>
      </div>
    </div>
  ),
};

const slugMap = {
  dataTable: "data-table", dataCard: "data-card", skeleton: "skeleton",
  spinner: "spinner", progressBar: "progress-bar", emptyState: "empty-state",
  tag: "tag", avatarGroup: "avatar-group", timeline: "timeline", misc: "misc",
};

export default function DataDisplayDetails({ selected, onBack }) {
  const d = details[selected];
  const [copied, setCopied] = useState(false);

  if (!d) return <div className="form-details-empty"><p>Select a component to view details</p></div>;

  const handleCopy = () => { navigator.clipboard.writeText(d.code); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <ComponentDetailsShell
      slug={slugMap[selected] || selected}
      sourceCode={d.code}
      onBack={onBack}
    >

      <section className="details-section preview-section">
        <h2>Live Preview</h2>
        <div className="preview-area"><div className="preview-item" style={{ width: "100%" }}>{previews[selected]}</div></div>
      </section>

      <section className="details-section variants-section">
        <h2>Variants & States</h2>
        <div className="variants-grid">
          {d.variants?.map((v, i) => (
            <div key={i} className="variant-item">
              <div className="variant-preview">{previews[selected]}</div>
              <div className="variant-info"><h4>{v.label}</h4><p>{v.description}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="details-section use-cases-section">
        <h2>Best Used For</h2>
        <div className="use-cases-list">
          {d.uses?.map((u, i) => (
            <div key={i} className="use-case-item"><span className="use-case-icon">✓</span><span>{u}</span></div>
          ))}
        </div>
      </section>

      <section className="details-section code-section">
        <div className="code-header">
          <h2>Code Example</h2>
          <button className="copy-button" onClick={handleCopy}>{copied ? "✓ Copied!" : "Copy"}</button>
        </div>
        <pre className="code-block"><code>{d.code}</code></pre>
      </section>
    </ComponentDetailsShell>
  );
}
