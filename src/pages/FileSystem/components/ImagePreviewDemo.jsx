import React, { useState } from "react";
import { FilePreview, FileDropZone } from "@/components/common/FileSystem";
import { formatBytes } from "@/components/common/FileSystem";
import { RefreshCw, Trash2, Maximize2 } from "lucide-react";

export default function ImagePreviewDemo() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dimensions, setDimensions] = useState(null);

  const handleSelect = (fileList) => {
    const selected = fileList[0];
    if (selected && selected.type.startsWith("image/")) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = URL.createObjectURL(selected);
      setFile(selected);
      setPreviewUrl(url);

      const img = new Image();
      img.onload = () => {
        setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.src = url;
    }
  };

  const handleClear = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setDimensions(null);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-2 space-y-4">
      {!file ? (
        <FileDropZone
          onFilesSelected={handleSelect}
          accept="image/*"
          title="Select an image to preview"
          description="Click to browse or drop an image to view resolution & preview"
        />
      ) : (
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <FilePreview
            file={file}
            previewUrl={previewUrl}
            name={file.name}
            size={file.size}
            category="image"
            dimensions={dimensions}
            aspectRatio="video"
          />

          <div className="flex items-center justify-between text-xs pt-1">
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{file.name}</p>
              <p className="text-slate-500 dark:text-slate-400">
                {formatBytes(file.size)} · {dimensions ? `${dimensions.width}×${dimensions.height}px` : "Inspecting..."}
              </p>
            </div>

            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
