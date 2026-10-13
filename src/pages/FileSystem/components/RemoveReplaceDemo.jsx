import React, { useState } from "react";
import { FileUpload } from "@/components/common/FileSystem";

export default function RemoveReplaceDemo() {
  const [lastAction, setLastAction] = useState("Idle");

  return (
    <div className="w-full max-w-lg mx-auto p-2 space-y-4">
      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
        <span>Lifecycle state: <strong>{lastAction}</strong></span>
        <span className="text-[10px] text-indigo-400">Click ⇄ to Replace or 🗑 to Remove</span>
      </div>

      <FileUpload
        accept="*/*"
        maxSize={10 * 1024 * 1024}
        allowReplace={true}
        allowRemove={true}
        title="Upload file to test replace & remove"
        description="Replace swaps file directly without resetting component"
        onFileChange={(file) => setLastAction(file ? `Selected: ${file.name}` : "Removed file")}
      />
    </div>
  );
}
