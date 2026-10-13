import React, { useState } from "react";
import { FileUpload, formatBytes } from "@/components/common/FileSystem";

export default function FileSizeValidationDemo() {
  const [maxLimitMB, setMaxLimitMB] = useState(2); // 2 MB limit demo

  return (
    <div className="w-full max-w-lg mx-auto p-2 space-y-4">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">Configured Size Ceiling:</span>
        <div className="flex items-center gap-1.5">
          {[1, 2, 5, 10].map((mb) => (
            <button
              key={mb}
              type="button"
              onClick={() => setMaxLimitMB(mb)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                maxLimitMB === mb
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {mb} MB
            </button>
          ))}
        </div>
      </div>

      <FileUpload
        key={maxLimitMB}
        maxSize={maxLimitMB * 1024 * 1024}
        title={`Max ${maxLimitMB} MB File Size Limit`}
        description={`Files larger than ${maxLimitMB} MB will be rejected with clear error feedback`}
      />
    </div>
  );
}
