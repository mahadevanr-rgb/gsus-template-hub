import React, { useState } from "react";
import { FilePreview, FileDropZone } from "@/components/common/FileSystem";

export default function FilePreviewDemo() {
  const [selectedFormat, setSelectedFormat] = useState("pdf");

  const sampleFormats = [
    { id: "pdf", name: "annual-report-2025.pdf", size: 3450000, category: "pdf" },
    { id: "spreadsheet", name: "financial-forecast.xlsx", size: 1240000, category: "spreadsheet" },
    { id: "code", name: "FileSystemEngine.tsx", size: 48000, category: "code" },
    { id: "archive", name: "template-assets-v2.zip", size: 18900000, category: "archive" },
  ];

  const currentSample = sampleFormats.find((s) => s.id === selectedFormat);

  return (
    <div className="w-full max-w-lg mx-auto p-2 space-y-4">
      {/* Format Switcher */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {sampleFormats.map((fmt) => (
          <button
            key={fmt.id}
            type="button"
            onClick={() => setSelectedFormat(fmt.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
              selectedFormat === fmt.id
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {fmt.category}
          </button>
        ))}
      </div>

      {/* Preview Card */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <FilePreview
          name={currentSample.name}
          size={currentSample.size}
          category={currentSample.category}
          aspectRatio="video"
        />
      </div>
    </div>
  );
}
