import React, { useState } from "react";
import { FileList } from "@/components/common/FileSystem";

export default function FileListDemo() {
  const [demoFiles, setDemoFiles] = useState([
    {
      id: "f1",
      name: "design_system_tokens.json",
      size: 45000,
      category: "code",
      status: "success",
      progress: 100,
      error: null,
    },
    {
      id: "f2",
      name: "enterprise_presentation.pdf",
      size: 4200000,
      category: "pdf",
      status: "uploading",
      progress: 68,
      error: null,
    },
    {
      id: "f3",
      name: "quarterly_budget.xlsx",
      size: 1850000,
      category: "spreadsheet",
      status: "error",
      progress: 45,
      error: "Network timeout: Connection closed by peer",
    },
    {
      id: "f4",
      name: "project_archive_backup.zip",
      size: 14500000,
      category: "archive",
      status: "selected",
      progress: 0,
      error: null,
    },
  ]);

  const handleRemove = (id) => {
    setDemoFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleRetry = (id) => {
    setDemoFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "uploading", progress: 20, error: null } : f))
    );
  };

  const handleCancel = (id) => {
    setDemoFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "canceled", error: "Upload canceled" } : f))
    );
  };

  const handleStartUpload = (id) => {
    setDemoFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "uploading", progress: 15, error: null } : f))
    );
  };

  const handleStartAll = () => {
    setDemoFiles((prev) =>
      prev.map((f) => ({ ...f, status: "uploading", progress: 10, error: null }))
    );
  };

  const handleClearAll = () => {
    setDemoFiles([]);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-2">
      <FileList
        files={demoFiles}
        onRemove={handleRemove}
        onRetry={handleRetry}
        onCancel={handleCancel}
        onStartUpload={handleStartUpload}
        onStartAllUploads={handleStartAll}
        onClearAll={handleClearAll}
        allowReplace={false}
      />
    </div>
  );
}
