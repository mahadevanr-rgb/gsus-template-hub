import React, { useState, useRef, useEffect } from "react";
import { Crop, ZoomIn, RotateCcw, Check, X, Sparkles } from "lucide-react";
import { cropImageToBlob } from "./fileUtils";

/**
 * ImageCropModal
 * Client-side canvas image cropping modal with aspect ratio presets and zoom controls.
 */
export default function ImageCropModal({
  isOpen,
  imageSrc,
  imageName = "image.png",
  aspectRatio = "1:1", // "1:1" | "4:3" | "16:9" | "free"
  onClose,
  onCropComplete,
}) {
  const [selectedAspect, setSelectedAspect] = useState(aspectRatio);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageMeta, setImageMeta] = useState({ width: 0, height: 0 });
  const [isProcessing, setIsProcessing] = useState(false);

  const containerRef = useRef(null);
  const imgRef = useRef(null);

  // Load natural image dimensions
  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.onload = () => {
      setImageMeta({ width: img.naturalWidth, height: img.naturalHeight });
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  if (!isOpen || !imageSrc) return null;

  const aspectPresets = [
    { id: "1:1", label: "1:1 Square", ratio: 1 / 1 },
    { id: "4:3", label: "4:3 Standard", ratio: 4 / 3 },
    { id: "16:9", label: "16:9 Wide", ratio: 16 / 9 },
    { id: "free", label: "Free Form", ratio: null },
  ];

  // Mouse pan handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleConfirmCrop = async () => {
    if (!imgRef.current || !containerRef.current) return;
    setIsProcessing(true);

    try {
      const img = imgRef.current;
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;

      // Compute crop bounds relative to natural image
      const aspectItem = aspectPresets.find((p) => p.id === selectedAspect);
      const ratio = aspectItem?.ratio || naturalWidth / naturalHeight;

      let cropWidth = naturalWidth / zoom;
      let cropHeight = cropWidth / ratio;

      if (cropHeight > naturalHeight / zoom) {
        cropHeight = naturalHeight / zoom;
        cropWidth = cropHeight * ratio;
      }

      // Center crop box offset
      const startX = Math.max(0, Math.min(naturalWidth - cropWidth, (naturalWidth - cropWidth) / 2 - (offset.x * (naturalWidth / 300))));
      const startY = Math.max(0, Math.min(naturalHeight - cropHeight, (naturalHeight - cropHeight) / 2 - (offset.y * (naturalHeight / 300))));

      const cropArea = {
        x: startX,
        y: startY,
        width: cropWidth,
        height: cropHeight,
      };

      const croppedBlob = await cropImageToBlob(imageSrc, cropArea, "image/png", 0.95);
      const croppedFile = new File([croppedBlob], `cropped-${imageName}`, {
        type: "image/png",
        lastModified: Date.now(),
      });

      const croppedUrl = URL.createObjectURL(croppedBlob);

      if (onCropComplete) {
        onCropComplete({
          file: croppedFile,
          blob: croppedBlob,
          previewUrl: croppedUrl,
          width: Math.round(cropWidth),
          height: Math.round(cropHeight),
        });
      }
      onClose();
    } catch (err) {
      console.error("Crop error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-5 sm:p-6"
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Crop className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Crop Image</h3>
              <p className="text-xs text-slate-400">
                Adjust aspect ratio, zoom, and frame position.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Aspect Ratio Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          {aspectPresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => setSelectedAspect(preset.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedAspect === preset.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Canvas / Crop Viewport */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          className="relative w-full h-72 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        >
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

          {/* Draggable Image */}
          <img
            ref={imgRef}
            src={imageSrc}
            alt="To crop"
            draggable={false}
            className="max-w-none transition-transform duration-75"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              maxHeight: "260px",
            }}
          />

          {/* Crop Overlay Grid Frame */}
          <div className="absolute inset-4 border-2 border-dashed border-indigo-500/80 rounded-xl pointer-events-none shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
              <div className="border-r border-b border-indigo-300" />
              <div className="border-r border-b border-indigo-300" />
              <div className="border-b border-indigo-300" />
              <div className="border-r border-b border-indigo-300" />
              <div className="border-r border-b border-indigo-300" />
              <div className="border-b border-indigo-300" />
              <div className="border-r border-indigo-300" />
              <div className="border-r border-indigo-300" />
              <div />
            </div>
          </div>
        </div>

        {/* Zoom & Reset Bar */}
        <div className="flex items-center justify-between gap-4 pt-1 text-xs">
          <div className="flex items-center gap-2 flex-1 max-w-xs text-slate-400">
            <ZoomIn className="w-4 h-4 shrink-0" />
            <span className="font-mono text-[11px]">{zoom.toFixed(1)}x</span>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmCrop}
            disabled={isProcessing}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>{isProcessing ? "Cropping..." : "Apply Crop"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
