import React, { useState, useEffect } from "react";
import { Sliders, Sparkles, Download, Check, ArrowRight } from "lucide-react";
import { formatBytes, compressImage } from "./fileUtils";

/**
 * ImageCompressor
 * Live client-side image compression with quality, dimension scaling, and byte savings comparison.
 */
export default function ImageCompressor({
  file,
  onCompressionComplete,
  className = "",
}) {
  const [quality, setQuality] = useState(0.8);
  const [maxWidth, setMaxWidth] = useState(1600);
  const [isCompressing, setIsCompressing] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setResult(null);
      return;
    }

    let isMounted = true;
    const runCompression = async () => {
      setIsCompressing(true);
      try {
        const compressed = await compressImage(file, {
          quality,
          maxWidth,
          maxHeight: maxWidth,
          mimeType: file.type === "image/png" ? "image/png" : "image/jpeg",
        });

        if (isMounted) {
          setResult(compressed);
          if (onCompressionComplete) {
            onCompressionComplete(compressed);
          }
        }
      } catch (err) {
        console.error("Compression error:", err);
      } finally {
        if (isMounted) setIsCompressing(false);
      }
    };

    const timer = setTimeout(runCompression, 250);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [file, quality, maxWidth]);

  if (!file) {
    return (
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-center text-xs text-slate-500">
        Select an image to configure compression.
      </div>
    );
  }

  const originalSize = file.size;
  const compressedSize = result?.compressedSize || originalSize;
  const savedPercent = result?.savedPercent || 0;

  return (
    <div className={`p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-5 shadow-sm ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Image Compression Engine
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Optimize image payload before storage upload.
            </p>
          </div>
        </div>

        {savedPercent > 0 && (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            -{savedPercent}% Saved
          </span>
        )}
      </div>

      {/* Before & After Metrics Card */}
      <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400">Original</p>
          <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
            {formatBytes(originalSize)}
          </p>
        </div>

        <div className="flex items-center justify-center text-slate-400">
          <ArrowRight className="w-4 h-4" />
        </div>

        <div>
          <p className="text-[10px] uppercase font-bold text-indigo-400">Compressed</p>
          <p className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
            {formatBytes(compressedSize)}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4 text-xs">
        {/* Quality Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-slate-700 dark:text-slate-300 font-medium">
            <span>Compression Quality</span>
            <span className="font-mono font-bold text-indigo-500">{Math.round(quality * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="1.0"
            step="0.05"
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        {/* Max Dimension Selector */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-slate-700 dark:text-slate-300 font-medium">
            <span>Max Width / Height</span>
            <span className="font-mono text-slate-500">{maxWidth} px</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[800, 1200, 1600, 2400].map((dim) => (
              <button
                key={dim}
                type="button"
                onClick={() => setMaxWidth(dim)}
                className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  maxWidth === dim
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {dim}px
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
