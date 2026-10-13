import React, { useState } from "react";
import { FileUpload } from "@/components/common/FileSystem";

export default function FileTypeValidationDemo() {
  const [selectedFileType, setSelectedFileType] = useState(".pdf,.docx");

  return (
    <div className="w-full max-w-lg mx-auto p-2 space-y-4">
      {/* Type Rule Selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 font-medium">Strict Rule:</span>
        <div className="flex gap-1.5">
          {[
            { label: "PDF & DOCX Only", val: ".pdf,.docx" },
            { label: "Images Only", val: "image/png,image/jpeg,image/webp" },
            { label: "Spreadsheets", val: ".xlsx,.csv" },
          ].map((r) => (
            <button
              key={r.val}
              type="button"
              onClick={() => setSelectedFileType(r.val)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedFileType === r.val
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <FileUpload
        key={selectedFileType}
        accept={selectedFileType}
        maxSize={10 * 1024 * 1024}
        title="Upload supported files"
        description={`Files must strictly match: ${selectedFileType}`}
      />
    </div>
  );
}
