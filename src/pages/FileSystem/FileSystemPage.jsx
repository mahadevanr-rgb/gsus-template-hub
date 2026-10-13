import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fileSystemComponents } from "./fileSystem.config";
import FileSystemDetails from "./FileSystemDetails";
import {
  FileSystemBreadcrumbs,
  FileSystemHeader,
} from "./sections/FileSystemHeader";
import FileSystemCatalog from "./sections/FileSystemCatalog";
import FileSystemPlayground from "./sections/FileSystemPlayground";

export default function FileSystemPage() {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleSelectCard = (slug) => {
    navigate(`/file-system/${slug}`);
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

      {/* 3. Component Showcase Grid (Matching Overlay Component Catalog) */}
      <FileSystemCatalog
        components={fileSystemComponents}
        onSelectComponent={handleSelectCard}
      />

      {/* 4. Interactive Live Playground (Matching Modal & Overlay Real-Time Playground) */}
      <FileSystemPlayground />
    </div>
  );
}
