import { Search, ChevronDown, Check, X, Loader2 } from "lucide-react";

const previewStyles = {
  select: { border: "border-blue-500/30", bg: "bg-blue-500/10" },
  multiSelect: { border: "border-purple-500/30", bg: "bg-purple-500/10" },
  autocomplete: { border: "border-emerald-500/30", bg: "bg-emerald-500/10" },
  combobox: { border: "border-fuchsia-500/30", bg: "bg-fuchsia-500/10" },
  asyncSelect: { border: "border-cyan-500/30", bg: "bg-cyan-500/10" },
  searchableSelect: { border: "border-teal-500/30", bg: "bg-teal-500/10" },
  filterDemo: { border: "border-indigo-500/30", bg: "bg-indigo-500/10" },
  debounceDemo: { border: "border-orange-500/30", bg: "bg-orange-500/10" },
  validationDemo: { border: "border-red-500/30", bg: "bg-red-500/10" },
};

function PreviewContainer({ id, children }) {
  const style = previewStyles[id] || previewStyles.select;

  return (
    <div
      className={`relative flex min-h-[145px] items-center justify-center overflow-hidden rounded-xl border ${style.border} bg-[#020817] p-4`}
    >
      <div
        className={`pointer-events-none absolute h-32 w-40 rounded-full ${style.bg} opacity-70 blur-3xl`}
      />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

const Preview = {
  select: (
    <div className="mx-auto flex max-w-[320px] items-center justify-between rounded-xl border border-blue-500/30 bg-slate-900 px-3.5 py-2.5 text-xs text-white shadow-xl">
      <span className="text-slate-300">Select Framework</span>
      <ChevronDown className="h-4 w-4 text-slate-500" />
    </div>
  ),

  multiSelect: (
    <div className="mx-auto flex max-w-[330px] flex-wrap items-center gap-1.5 rounded-xl border border-purple-500/30 bg-slate-900 p-2 text-xs">
      <span className="inline-flex items-center gap-1 rounded-lg bg-purple-500/20 px-2 py-1 text-[11px] font-medium text-purple-300 border border-purple-500/30">
        React <X className="h-3 w-3 cursor-pointer" />
      </span>
      <span className="inline-flex items-center gap-1 rounded-lg bg-purple-500/20 px-2 py-1 text-[11px] font-medium text-purple-300 border border-purple-500/30">
        Tailwind <X className="h-3 w-3 cursor-pointer" />
      </span>
    </div>
  ),

  autocomplete: (
    <div className="mx-auto max-w-[320px] space-y-1">
      <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-slate-900 px-3 py-2 text-xs text-white">
        <Search className="h-3.5 w-3.5 text-emerald-400" />
        <span className="text-white">Next.js</span>
      </div>
    </div>
  ),

  combobox: (
    <div className="mx-auto max-w-[320px] rounded-xl border border-fuchsia-500/30 bg-slate-900 p-2 text-xs text-white">
      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 px-1">
        <span className="text-slate-400">Type or select...</span>
        <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
      </div>
    </div>
  ),

  asyncSelect: (
    <div className="mx-auto flex max-w-[320px] items-center justify-between rounded-xl border border-cyan-500/30 bg-slate-900 px-3.5 py-2.5 text-xs text-white">
      <span className="text-slate-400">Fetching users...</span>
      <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
    </div>
  ),
};

export default function SelectionSearchPreview({ id }) {
  return (
    <PreviewContainer id={id}>{Preview[id] || Preview.select}</PreviewContainer>
  );
}
