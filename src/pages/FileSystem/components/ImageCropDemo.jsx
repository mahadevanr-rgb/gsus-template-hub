import React, { useState } from "react";
import { FileDropZone, ImageCropModal } from "@/components/common/FileSystem";
import { Crop, RefreshCw, CheckCircle2, Sliders } from "lucide-react";

export default function ImageCropDemo() {
  const [sourceImage, setSourceImage] = useState(null);
  const [cropResult, setCropResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (files) => {
    const file = files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setSourceImage({ file, url, name: file.name });
      setCropResult(null);
      setIsModalOpen(true);
    }
  };

  const handleCropComplete = (result) => {
    setCropResult(result);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-2 space-y-4">
      {!sourceImage ? (
        <FileDropZone
          onFilesSelected={handleSelect}
          accept="image/*"
          icon={Crop}
          title="Select an image to test cropping"
          description="Opens crop modal with 1:1, 4:3, and 16:9 aspect ratios"
        />
      ) : (
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {cropResult ? "Cropped Output" : "Original Image"}
            </h4>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1 transition-colors"
              >
                <Crop className="w-3.5 h-3.5" />
                <span>Adjust Crop</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSourceImage(null);
                  setCropResult(null);
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800">
            <img
              src={cropResult ? cropResult.previewUrl : sourceImage.url}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          </div>

          {cropResult && (
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Crop applied successfully</span>
              </span>
              <span className="font-mono text-[11px]">
                {cropResult.width} × {cropResult.height} px
              </span>
            </div>
          )}

          <ImageCropModal
            isOpen={isModalOpen}
            imageSrc={sourceImage.url}
            imageName={sourceImage.name}
            aspectRatio="1:1"
            onClose={() => setIsModalOpen(false)}
            onCropComplete={handleCropComplete}
          />
        </div>
      )}
    </div>
  );
}
