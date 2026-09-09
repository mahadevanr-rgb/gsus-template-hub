import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataTable } from "@/pages/DataDisplay/components/DataTable/DataTable";
import { DataCard } from "@/pages/DataDisplay/components/DataCard/DataCard";
import { Skeleton } from "@/pages/DataDisplay/components/Skeleton/Skeleton";
import { Spinner } from "@/pages/DataDisplay/components/Spinner/Spinner";
import { ProgressBar } from "@/pages/DataDisplay/components/ProgressBar/ProgressBar";
import { EmptyState } from "@/pages/DataDisplay/components/EmptyState/EmptyState";
import { Tag } from "@/pages/DataDisplay/components/Tag/Tag";
import { AvatarGroup } from "@/pages/DataDisplay/components/AvatarGroup/AvatarGroup";
import { Timeline } from "@/pages/DataDisplay/components/Timeline/Timeline";
import { Misc } from "@/pages/DataDisplay/components/Misc/Misc";
import ComponentDetailsView from "@/components/common/ComponentDetailsView/ComponentDetailsView";

const dataDisplaySiblings = [
  { slug: "dataTable", name: "Data Table" },
  { slug: "dataCard", name: "Metric Data Card" },
  { slug: "skeleton", name: "Skeleton Shimmer" },
  { slug: "spinner", name: "Loaders & Spinners" },
  { slug: "progressBar", name: "Progress Bar" },
  { slug: "emptyState", name: "Empty State View" },
  { slug: "tag", name: "Tags & Chips" },
  { slug: "avatarGroup", name: "Avatar Group" },
  { slug: "timeline", name: "Activity Timeline" },
  { slug: "misc", name: "Misc UI Primitives" },
];

const ddMeta = {
  dataTable: {
    name: "Data Table",
    tag: "Table",
    description: "Responsive structured data table with striped rows, badges, and hover highlights.",
    code: `import DataTable from "@/components/ui/DataTable";\n\n<DataTable headers={["User", "Role", "Status"]} data={[["Alex", "Admin", "Active"]]} />`,
    files: [{ path: "components/ui/dataDisplay/DataTable.jsx" }],
  },
  dataCard: {
    name: "Metric Data Card",
    tag: "Card",
    description: "Executive metric card with key value, positive/negative trend badge and icon.",
    code: `import DataCard from "@/components/ui/DataCard";\n\n<DataCard label="Total Revenue" value="$48,250" trend="+14.2%" positive icon="💰" />`,
    files: [{ path: "components/ui/dataDisplay/DataCard.jsx" }],
  },
  skeleton: {
    name: "Skeleton Shimmer",
    tag: "Loader",
    description: "Smooth shimmer placeholder animation cards shown while data loads.",
    code: `import Skeleton from "@/components/ui/Skeleton";\n\n<Skeleton type="card" />\n<Skeleton type="text" count={3} />`,
    files: [{ path: "components/ui/dataDisplay/Skeleton.jsx" }],
  },
  spinner: {
    name: "Loaders & Spinners",
    tag: "Loader",
    description: "Set of clean CSS spinners, pulsing rings, and indeterminate loading bars.",
    code: `import Spinner from "@/components/ui/Spinner";\n\n<Spinner variant="ring" size="md" color="indigo" />`,
    files: [{ path: "components/ui/dataDisplay/Spinner.jsx" }],
  },
  progressBar: {
    name: "Progress Bar",
    tag: "Progress",
    description: "Linear progress bar with label, percentage counter, and variant gradients.",
    code: `import ProgressBar from "@/components/ui/ProgressBar";\n\n<ProgressBar value={72} label="Upload Progress" variant="gradient" />`,
    files: [{ path: "components/ui/dataDisplay/ProgressBar.jsx" }],
  },
  emptyState: {
    name: "Empty State View",
    tag: "State",
    description: "Friendly placeholder with illustration/icon, title, description, and action CTA.",
    code: `import EmptyState from "@/components/ui/EmptyState";\n\n<EmptyState title="No Projects Found" description="Get started by creating your first project." actionLabel="New Project" />`,
    files: [{ path: "components/ui/dataDisplay/EmptyState.jsx" }],
  },
  tag: {
    name: "Tags & Chips",
    tag: "Chip",
    description: "Soft and solid chip badges with remove buttons and categorical colors.",
    code: `import Tag from "@/components/ui/Tag";\n\n<Tag label="React 19" variant="indigo" removable onRemove={() => {}} />`,
    files: [{ path: "components/ui/dataDisplay/Tag.jsx" }],
  },
  avatarGroup: {
    name: "Avatar Group",
    tag: "Avatar",
    description: "Stacked avatar circles with overflow badge counter for team displays.",
    code: `import AvatarGroup from "@/components/ui/AvatarGroup";\n\n<AvatarGroup avatars={["Alex", "John", "Sara", "Emily"]} max={3} />`,
    files: [{ path: "components/ui/dataDisplay/AvatarGroup.jsx" }],
  },
  timeline: {
    name: "Activity Timeline",
    tag: "Feed",
    description: "Vertical timeline stream for audit logs, activity feeds, and order tracking.",
    code: `import Timeline from "@/components/ui/Timeline";\n\n<Timeline events={[{ title: "Project deployed", time: "10m ago" }]} />`,
    files: [{ path: "components/ui/dataDisplay/Timeline.jsx" }],
  },
  misc: {
    name: "Misc UI Primitives",
    tag: "Utility",
    description: "Keyboard shortcuts badge (Kbd), section divider lines, and tooltip wrappers.",
    code: `import Misc from "@/components/ui/Misc";\n\n<Misc.Kbd shortcut="⌘K" />\n<Misc.Divider label="OR" />`,
    files: [{ path: "components/ui/dataDisplay/Misc.jsx" }],
  },
};

export default function DataDisplayDetails({ selected, onBack, onNavigateHome }) {
  const params = useParams();
  const navigate = useNavigate();

  const activeSlug = selected || params.id || "dataTable";
  const [currentSlug, setCurrentSlug] = useState(activeSlug);

  useEffect(() => {
    if (selected) {
      setCurrentSlug(selected);
    } else if (params.id) {
      setCurrentSlug(params.id);
    }
  }, [selected, params.id]);

  const meta = ddMeta[currentSlug] || ddMeta.dataTable;
  const componentData = {
    name: meta.name,
    slug: currentSlug,
    subCategory: meta.tag,
    tag: meta.tag,
    description: meta.description,
    sourceCode: meta.code,
    files: meta.files,
    framework: "react",
    styling: "Tailwind CSS",
    version: "1.0.0",
    dependencies: ["None"],
    size: "~2.0 KB",
    lastUpdated: "May 12, 2025",
    author: "TemplateHub UI Team",
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/data-display");
    }
  };

  const handleHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      navigate("/");
    }
  };

  const renderPreview = () => {
    switch (currentSlug) {
      case "dataTable":
        return <DataTable className="w-full" />;
      case "dataCard":
        return <DataCard label="Total Revenue" value="$48,250" trend="+14.2%" positive icon="💰" />;
      case "skeleton":
        return <Skeleton className="w-full" />;
      case "spinner":
        return (
          <div className="flex items-center gap-6">
            <Spinner variant="spin" />
            <Spinner variant="pulse" />
            <Spinner variant="bar" />
          </div>
        );
      case "progressBar":
        return <ProgressBar value={72} label="Storage Quota" className="w-full" />;
      case "emptyState":
        return <EmptyState title="No items found" description="Create a new entry to get started." />;
      case "tag":
        return (
          <div className="flex flex-wrap gap-2">
            <Tag label="React 19" variant="blue" />
            <Tag label="Tailwind CSS" variant="indigo" />
            <Tag label="Production" variant="emerald" />
            <Tag label="v1.0" variant="purple" />
          </div>
        );
      case "avatarGroup":
        return <AvatarGroup avatars={["Alex", "John", "Sarah", "David"]} max={3} />;
      case "timeline":
        return <Timeline />;
      case "misc":
        return <Misc />;
      default:
        return <DataTable className="w-full" />;
    }
  };

  return (
    <ComponentDetailsView
      component={componentData}
      categoryName="Data Display"
      categoryPath="/data-display"
      subCategories={dataDisplaySiblings}
      activeSlug={currentSlug}
      onSelectSibling={(slug) => setCurrentSlug(slug)}
      onBack={handleBack}
      onNavigateHome={handleHome}
      renderCustomPreview={renderPreview}
    />
  );
}
