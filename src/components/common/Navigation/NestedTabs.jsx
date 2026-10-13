import { useState, useId } from "react";
import Tabs from "./Tabs";

/**
 * Reusable NestedTabs component
 * Two-level hierarchical tabs with automatic state validation and child synchronization
 */
export default function NestedTabs({
  categories = [
    {
      id: "infrastructure",
      label: "Infrastructure",
      tabs: [
        { id: "compute", label: "Compute Nodes", description: "VMs and serverless clusters" },
        { id: "storage", label: "Object Storage", description: "S3 buckets and block stores" },
        { id: "networking", label: "Virtual Networks", description: "VPCs, subnets, and routes" },
      ],
    },
    {
      id: "database",
      label: "Databases",
      tabs: [
        { id: "postgres", label: "PostgreSQL", description: "Managed relational database engine" },
        { id: "redis", label: "Redis Cache", description: "Low-latency in-memory data store" },
      ],
    },
    {
      id: "security",
      label: "Security & Access",
      tabs: [
        { id: "iam", label: "IAM Roles", description: "Access control policies and service accounts" },
        { id: "secrets", label: "Secrets Vault", description: "Encrypted API keys and certs" },
      ],
    },
  ],
  defaultParent = null,
  onSelectionChange = null,
  renderContent = null,
  className = "",
}) {
  const instanceId = useId();
  const initialParent = defaultParent || categories[0]?.id;
  const initialChild = categories.find((c) => c.id === initialParent)?.tabs[0]?.id;

  const [activeParent, setActiveParent] = useState(initialParent);
  const [activeChildMap, setActiveChildMap] = useState({
    [initialParent]: initialChild,
  });

  const currentCategory = categories.find((c) => c.id === activeParent) || categories[0];
  const activeChild =
    activeChildMap[activeParent] || currentCategory?.tabs[0]?.id;

  const handleParentChange = (newParentId) => {
    setActiveParent(newParentId);
    const targetCategory = categories.find((c) => c.id === newParentId);
    // Ensure selected child is valid for the new parent!
    const validChild =
      activeChildMap[newParentId] || targetCategory?.tabs[0]?.id;

    setActiveChildMap((prev) => ({
      ...prev,
      [newParentId]: validChild,
    }));

    if (onSelectionChange) {
      onSelectionChange({ parentId: newParentId, childId: validChild });
    }
  };

  const handleChildChange = (newChildId) => {
    setActiveChildMap((prev) => ({
      ...prev,
      [activeParent]: newChildId,
    }));

    if (onSelectionChange) {
      onSelectionChange({ parentId: activeParent, childId: newChildId });
    }
  };

  const currentTabItem = currentCategory?.tabs?.find((t) => t.id === activeChild);

  return (
    <div className={`w-full space-y-4 ${className}`}>
      {/* 1. Level 1: Parent Tabs */}
      <div className="bg-slate-100/80 dark:bg-slate-900/60 p-2 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
        <Tabs
          tabs={categories.map((c) => ({
            id: c.id,
            label: c.label,
            count: c.tabs?.length,
          }))}
          activeTab={activeParent}
          onChange={handleParentChange}
          variant="segment"
        />
      </div>

      {/* 2. Level 2: Child Tabs */}
      {currentCategory?.tabs && (
        <div className="px-1">
          <Tabs
            key={`child-tabs-${instanceId}-${activeParent}`}
            tabs={currentCategory.tabs}
            activeTab={activeChild}
            onChange={handleChildChange}
            variant="pills"
          />
        </div>
      )}

      {/* 3. Content Panel */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm transition-all">
        {renderContent ? (
          renderContent({
            parent: currentCategory,
            child: currentTabItem,
            parentId: activeParent,
            childId: activeChild,
          })
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">
                {currentCategory?.label}
              </span>
              <span className="text-slate-400 text-xs">/</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {currentTabItem?.label}
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {currentTabItem?.description || "Configured parameters for this subsection."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
