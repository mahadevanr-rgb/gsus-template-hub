import React, { useState } from "react";
import {
  CheckCircle2,
  Sparkles,
  CloudUpload,
  Crop,
  Sliders,
  User,
  FileText,
  FileSpreadsheet,
  FileCode,
  Repeat,
  RefreshCw,
  XCircle,
  ShieldCheck,
  Maximize2,
  FolderUp,
} from "lucide-react";
import {
  FileUpload,
  MultipleFileUpload,
  AvatarUpload,
  ImageCropModal,
  ImageCompressor,
  FilePreview,
  FileList,
  UploadProgress,
  useFileManager,
} from "@/components/common/FileSystem";

export default function FileSystemPlayground() {
  // Modal states for live playground demonstrations
  const [activeSingleModal, setActiveSingleModal] = useState(false);
  const [activeBatchModal, setActiveBatchModal] = useState(false);
  const [activeCropModal, setActiveCropModal] = useState(false);
  const [activeGlobalDropzone, setActiveGlobalDropzone] = useState(false);

  // Sample progress simulation state
  const [simulatedProgress, setSimulatedProgress] = useState(65);
  const [simulatedStatus, setSimulatedStatus] = useState("uploading");

  // Sample queue items for interactive list
  const [demoQueue, setDemoQueue] = useState([
    {
      id: "demo-1",
      name: "architecture_blueprint.pdf",
      size: 3450000,
      category: "pdf",
      status: "success",
      progress: 100,
    },
    {
      id: "demo-2",
      name: "hero_banner_final.webp",
      size: 1850000,
      category: "image",
      status: "uploading",
      progress: 68,
      previewUrl: "https://picsum.photos/400/300",
    },
    {
      id: "demo-3",
      name: "financial_export_q3.xlsx",
      size: 520000,
      category: "spreadsheet",
      status: "error",
      progress: 45,
      error: "Connection timeout",
    },
  ]);

  const handleRetryDemo = (id) => {
    setDemoQueue((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "uploading", progress: 10, error: null } : item
      )
    );
    setTimeout(() => {
      setDemoQueue((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "success", progress: 100 } : item
        )
      );
    }, 1200);
  };

  const handleCancelDemo = (id) => {
    setDemoQueue((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "canceled", error: "Upload canceled" } : item
      )
    );
  };

  const handleRemoveDemo = (id) => {
    setDemoQueue((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="space-y-12 pt-6 border-t border-slate-800/80">
      {/* 1. Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Live Interactive Playground</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Test All 18 File System Patterns in Real-Time
        </h2>
        <p className="text-sm text-slate-400">
          Interactive live sessions for single &amp; batch uploads, validation guardrails, canvas crop, compression, and retry resilience.
        </p>
      </div>

      {/* 2. GROUP 1: Single & Multiple Uploads */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                GROUP 1
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Upload Dropzones &amp; Multi-File Queues
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Interactive single-file dropzones, multi-selection batch uploads, and document centers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-6 rounded-3xl bg-slate-950/60 border border-slate-800/80 shadow-2xl">
          {/* Card 1: Basic File Upload */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-white">Single File Upload</h4>
              <p className="text-xs text-slate-400">
                Dropzone with format checking, progress bar, replace, and remove.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveSingleModal(true)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <CloudUpload className="w-4 h-4" />
              <span>Test Single Uploader</span>
            </button>
          </div>

          {/* Card 2: Batch Multi-File */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-white">Batch Multi-File Upload</h4>
              <p className="text-xs text-slate-400">
                Multi-selection queue with individual progress and batch upload actions.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveBatchModal(true)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-all shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FolderUp className="w-4 h-4" />
              <span>Test Batch Uploader</span>
            </button>
          </div>

          {/* Card 3: Document Upload Center */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-white">Document Upload Center</h4>
              <p className="text-xs text-slate-400">
                Dedicated uploader for PDF, Word, Excel, and CSV documents.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveGlobalDropzone(true)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 transition-all shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Test Document Center</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. GROUP 2: Image Processing & Avatars */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                GROUP 2
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Image Processing, Client-Side Crop &amp; Avatar Editor
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Canvas image cropping modal, live byte compression engine, and profile avatar editor.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-6 rounded-3xl bg-slate-950/60 border border-slate-800/80 shadow-2xl">
          {/* Avatar Editor */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-between text-center space-y-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Profile Avatar Editor</h4>
              <p className="text-xs text-slate-400">Circular hover trigger &amp; 1:1 crop.</p>
            </div>
            <AvatarUpload size="md" initials="TH" allowCrop={true} />
          </div>

          {/* Client-Side Image Cropper */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-white">Client-Side Canvas Crop</h4>
              <p className="text-xs text-slate-400">
                Interactive zoom, pan, and 1:1 / 4:3 / 16:9 / Free aspect ratio presets.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveCropModal(true)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-fuchsia-600 hover:bg-fuchsia-500 transition-all shadow-md shadow-fuchsia-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Crop className="w-4 h-4" />
              <span>Launch Canvas Cropper</span>
            </button>
          </div>

          {/* Compression Engine */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-white">Image Compression Engine</h4>
              <p className="text-xs text-slate-400">
                Real-time canvas scaling and byte savings calculator.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                -65% Average Savings
              </span>
              <p className="text-[11px] text-slate-300 font-mono">2.4 MB → 840 KB</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. GROUP 3: File Inspection & Queue Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                GROUP 3
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                File Inspection, Queue Table &amp; In-Place Replacement
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Multi-format file preview lightbox and interactive queue table with retry, replace, and cancel.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-950/60 border border-slate-800/80 shadow-2xl space-y-5">
          <FileList
            files={demoQueue}
            onRetry={handleRetryDemo}
            onCancel={handleCancelDemo}
            onRemove={handleRemoveDemo}
            allowReplace={true}
          />
        </div>
      </div>

      {/* 5. GROUP 4: Progress, Resilience & Validations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                GROUP 4
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Upload Resilience, Progress States &amp; Strict Validation
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Multi-state progress bars, AbortController cancellation signal, and strict MIME/size filters.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-6 rounded-3xl bg-slate-950/60 border border-slate-800/80 shadow-2xl">
          {/* Progress States */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3">
            <h4 className="text-sm font-bold text-white">Progress Indicator</h4>
            <UploadProgress progress={simulatedProgress} status={simulatedStatus} />
            <div className="flex gap-1">
              {[25, 65, 100].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setSimulatedProgress(p);
                    setSimulatedStatus(p === 100 ? "success" : "uploading");
                  }}
                  className="flex-1 py-1 rounded bg-slate-800 text-[10px] text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  {p}%
                </button>
              ))}
            </div>
          </div>

          {/* Cancellation */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3">
            <h4 className="text-sm font-bold text-white">AbortController Cancel</h4>
            <p className="text-xs text-slate-400">Stops simulated in-flight upload gracefully.</p>
            <button
              type="button"
              onClick={() => {
                setSimulatedStatus("canceled");
              }}
              className="w-full py-2 px-3 rounded-xl bg-rose-600/20 text-rose-300 border border-rose-500/30 text-xs font-semibold hover:bg-rose-600/30 cursor-pointer"
            >
              Trigger Cancel Signal
            </button>
          </div>

          {/* Retry Recovery */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3">
            <h4 className="text-sm font-bold text-white">One-Click Retry</h4>
            <p className="text-xs text-slate-400">Recovers from network timeouts instantly.</p>
            <button
              type="button"
              onClick={() => {
                setSimulatedStatus("uploading");
                setSimulatedProgress(20);
              }}
              className="w-full py-2 px-3 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 text-xs font-semibold hover:bg-purple-600/30 cursor-pointer"
            >
              Restart Simulation
            </button>
          </div>

          {/* Strict MIME & Size Ceiling */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3">
            <h4 className="text-sm font-bold text-white">Strict Guardrails</h4>
            <div className="space-y-1 text-[11px] text-slate-400">
              <p>✓ MIME: <span className="text-emerald-400 font-mono">.pdf, .docx</span></p>
              <p>✓ Size Ceiling: <span className="text-indigo-400 font-mono">Max 5 MB</span></p>
            </div>
            <div className="p-1.5 rounded-lg bg-slate-950 text-center text-[10px] text-slate-500">
              Human-readable error alerts
            </div>
          </div>
        </div>
      </div>

      {/* 6. Global Callout Bar */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-teal-950/40 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Global File Management Foundation Available Anywhere</span>
          </h3>
          <p className="text-xs text-slate-400">
            Drag &amp; drop files anywhere onto the workspace or click below to launch the multi-format file uploader.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setActiveBatchModal(true)}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-600/25 flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <FolderUp className="w-4 h-4" />
          <span>Launch File Manager</span>
        </button>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* Active Modals for Playground                                           */}
      {/* ---------------------------------------------------------------------- */}

      {/* Single File Upload Dialog */}
      {activeSingleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Single File Upload Dialog</h3>
              <button
                type="button"
                onClick={() => setActiveSingleModal(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
            <FileUpload
              accept=".pdf,.png,.jpg,.jpeg,.zip"
              maxSize={5 * 1024 * 1024}
              title="Upload project blueprint"
              description="PDF, PNG, JPG, or ZIP up to 5 MB"
              autoUpload={true}
            />
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveSingleModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 bg-slate-800 hover:bg-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Batch File Upload Dialog */}
      {activeBatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Batch Multi-File Uploader</h3>
              <button
                type="button"
                onClick={() => setActiveBatchModal(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
            <MultipleFileUpload
              maxFiles={6}
              title="Upload multiple project assets"
              description="Select multiple documents or images (Max 6 files)"
              autoUpload={false}
            />
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveBatchModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 bg-slate-800 hover:bg-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Center Dialog */}
      {activeGlobalDropzone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Document Center</h3>
              <button
                type="button"
                onClick={() => setActiveGlobalDropzone(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
            <FileUpload
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
              maxSize={10 * 1024 * 1024}
              title="Upload specifications & reports"
              description="PDF, Word, Excel, and CSV supported"
            />
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveGlobalDropzone(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 bg-slate-800 hover:bg-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Crop Modal Demo */}
      <ImageCropModal
        isOpen={activeCropModal}
        imageSrc="https://picsum.photos/800/600"
        imageName="sample_banner.png"
        aspectRatio="1:1"
        onClose={() => setActiveCropModal(false)}
        onCropComplete={(res) => {
          console.log("Crop completed:", res);
          setActiveCropModal(false);
        }}
      />
    </section>
  );
}
