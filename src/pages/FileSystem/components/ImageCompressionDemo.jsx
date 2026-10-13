import React, { useState } from "react";
import { FileDropZone, ImageCompressor } from "@/components/common/FileSystem";
import { Sliders } from "lucide-react";

export default function ImageCompressionDemo() {
  const [file, setFile] = useState(null);

  const handleSelect = (files) => {
    const selected = files[0];
    if (selected && selected.type.startsWith("image/")) {
      setFile(selected);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-2 space-y-4">
      {!file ? (
        <FileDropZone
          onFilesSelected={handleSelect}
          accept="image/png,image/jpeg,image/webp"
          icon={Sliders}
          title="Select an image to test compression"
          description="Compress client-side with quality and dimension scaling"
        />
      ) : (
        <div className="space-y-3">
          <ImageCompressor
            file={file}
            onCompressionComplete={(res) => console.log("Compressed:", res)}
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setFile(null)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Choose Another Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
