import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fileSystemComponents } from "./fileSystem.config";
import FileSystemDetails from "./FileSystemDetails";
import {
  FileSystemBreadcrumbs,
  FileSystemHeader,
} from "./sections/FileSystemHeader";
import FileSystemCatalog from "./sections/FileSystemCatalog";
import FileSystemPlayground from "./sections/FileSystemPlayground";
import MyCustomizedFileSystems from "./components/MyCustomizedFileSystems";

export default function FileSystemPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "my-designs" ? "my-designs" : "collection";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleSelectCard = (slug) => {
    navigate(`/file-system/${slug}`);
  };

  const handleCustomizeCard = (slug) => {
    navigate(`/file-system/customize/${slug}`);
  };

  if (selectedComponent) {
    return (
      <FileSystemDetails
        selected={selectedComponent}
        onBack={() => setSelectedComponent(null)}
        onNavigateHome={() => navigate("/")}
      />
    );
  }

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Breadcrumbs */}
      <FileSystemBreadcrumbs onHome={() => navigate("/")} />

      {/* 2. Page Header */}
      <FileSystemHeader />

      {/* 3. View Switcher & Hero Customize Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 w-fit">
          <button
            type="button"
            onClick={() => setActiveTab("collection")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "collection"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Browse File System ({fileSystemComponents.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("my-designs")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "my-designs"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <span>✨ My Saved Designs</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => navigate("/file-system/customize")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white shadow-md shadow-emerald-500/25 active:scale-[0.98] transition-all cursor-pointer self-start sm:self-auto"
        >
          <span>🎨 Customize File Component</span>
        </button>
      </div>

      {activeTab === "my-designs" ? (
        <MyCustomizedFileSystems onNewComponent={() => navigate("/file-system/customize")} />
      ) : (
        <>
          {/* 4. Component Showcase Grid */}
          <FileSystemCatalog
            components={fileSystemComponents}
            onSelectComponent={handleSelectCard}
            onCustomizeComponent={handleCustomizeCard}
          />

          {/* 5. Interactive Live Playground */}
          <FileSystemPlayground />
        </>
      )}
    </div>
  );
}
