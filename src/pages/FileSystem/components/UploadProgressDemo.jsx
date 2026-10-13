import React, { useState } from "react";
import { UploadProgress } from "@/components/common/FileSystem";

export default function UploadProgressDemo() {
  const [sliderProgress, setSliderProgress] = useState(65);

  return (
    <div className="w-full max-w-lg mx-auto p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>Simulate Upload Progress</span>
          <span className="font-mono text-indigo-500">{sliderProgress}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderProgress}
          onChange={(e) => setSliderProgress(parseInt(e.target.value))}
          className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
      </div>

      <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
        <UploadProgress
          progress={sliderProgress}
          status="uploading"
        />

        <UploadProgress
          progress={100}
          status="success"
        />

        <UploadProgress
          progress={40}
          status="error"
          error="Upload failed: Server connection dropped"
        />

        <UploadProgress
          progress={25}
          status="canceled"
        />
      </div>
    </div>
  );
}
