import React, { useState } from "react";
import { ImageUpload } from "@/components/common/FileSystem";

export default function ImageDimensionValidationDemo() {
  const [minWidth, setMinWidth] = useState(600);
  const [minHeight, setMinHeight] = useState(400);

  return (
    <div className="w-full max-w-lg mx-auto p-2 space-y-4">
      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
        <span>Minimum resolution constraint:</span>
        <span className="font-mono font-bold text-indigo-500">
          {minWidth} × {minHeight} px
        </span>
      </div>

      <ImageUpload
        key={`${minWidth}-${minHeight}`}
        accept="image/*"
        minWidth={minWidth}
        minHeight={minHeight}
        maxWidth={4000}
        maxHeight={4000}
        title="Upload High-Res Banner"
        description={`Minimum required: ${minWidth} × ${minHeight} px · Maximum: 4000 × 4000 px`}
      />
    </div>
  );
}
