import {
  Bell,
  CheckCircle2,
  Info,
  Megaphone,
  X,
  RotateCcw,
  Star,
  Upload,
  Trash2,
  ShieldCheck,
} from "lucide-react";

const previewStyles = {
  toast: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    icon: "text-emerald-400",
  },

  alert: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    icon: "text-blue-400",
  },

  banner: {
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    icon: "text-purple-400",
  },

  snackbar: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    icon: "text-emerald-400",
  },

  notificationCard: {
    border: "border-fuchsia-500/30",
    bg: "bg-fuchsia-500/10",
    icon: "text-fuchsia-400",
  },

  notificationBadge: {
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    icon: "text-orange-400",
  },

  statusDot: {
    border: "border-teal-500/30",
    bg: "bg-teal-500/10",
    icon: "text-teal-400",
  },

  progressNotification: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    icon: "text-cyan-400",
  },

  confirmDialog: {
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    icon: "text-red-400",
  },

  inlineMessage: {
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/10",
    icon: "text-indigo-400",
  },
};

function PreviewContainer({ id, children }) {
  const style = previewStyles[id];

  return (
    <div
      className={`
        relative
        flex
        min-h-[145px]
        items-center
        justify-center
        overflow-hidden
        rounded-xl
        border
        ${style.border}
        bg-[#020817]
        p-4
      `}
    >
      <div
        className={`
          pointer-events-none
          absolute
          h-32
          w-40
          rounded-full
          ${style.bg}
          opacity-70
          blur-3xl
        `}
      />

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

const Preview = {
  toast: (
    <div className="mx-auto flex max-w-[330px] items-center gap-3 rounded-xl border border-emerald-500/30 bg-slate-900 px-4 py-3 shadow-xl shadow-emerald-500/10">
      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />

      <div className="flex-1">
        <p className="text-xs font-semibold text-white">
          Changes saved successfully!
        </p>
        <p className="mt-0.5 text-[10px] text-slate-500">Just now</p>
      </div>

      <X className="h-4 w-4 text-slate-500" />
    </div>
  ),

  alert: (
    <div className="mx-auto flex max-w-[350px] items-start gap-3 rounded-xl border border-blue-500/30 bg-blue-500/10 p-3.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/15">
        <Info className="h-4 w-4 text-blue-400" />
      </div>

      <div className="flex-1">
        <p className="text-xs font-semibold text-white">System Update</p>

        <p className="mt-1 text-[10px] leading-relaxed text-blue-100/60">
          Scheduled maintenance will take place at 12:00 AM UTC.
        </p>
      </div>

      <X className="h-4 w-4 text-blue-300/60" />
    </div>
  ),

  banner: (
    <div className="mx-auto flex max-w-[370px] items-center gap-3 rounded-xl border border-purple-500/30 bg-gradient-to-r from-purple-500/15 to-fuchsia-500/10 p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/15">
        <Megaphone className="h-4 w-4 text-purple-400" />
      </div>

      <div className="flex-1">
        <p className="text-xs font-semibold text-white">
          New version available
        </p>

        <p className="mt-0.5 text-[10px] text-slate-400">
          Explore the latest platform updates.
        </p>
      </div>

      <button className="rounded-lg bg-purple-500/20 px-2.5 py-1.5 text-[10px] font-semibold text-purple-300">
        Learn
      </button>

      <X className="h-4 w-4 text-slate-500" />
    </div>
  ),

  snackbar: (
    <div className="mx-auto flex max-w-[350px] items-center gap-3 rounded-xl border border-emerald-500/30 bg-slate-900 px-4 py-3">
      <CheckCircle2 className="h-4 w-4 text-emerald-400" />

      <p className="flex-1 text-xs font-medium text-white">
        Item deleted from project.
      </p>

      <button className="flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1.5 text-[10px] font-semibold text-emerald-400">
        <RotateCcw className="h-3 w-3" />
        Undo
      </button>
    </div>
  ),

  notificationCard: (
    <div className="mx-auto flex max-w-[350px] items-start gap-3 rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/10 p-3.5">
      <div className="relative">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white">
          <Star className="h-4 w-4 fill-current" />
        </div>

        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-fuchsia-400" />
      </div>

      <div className="flex-1">
        <div className="flex justify-between gap-2">
          <p className="text-xs font-semibold text-white">
            New Feature Released
          </p>

          <span className="text-[9px] text-slate-500">2m ago</span>
        </div>

        <p className="mt-1 text-[10px] text-slate-400">
          Check out the latest updates and improvements.
        </p>
      </div>
    </div>
  ),

  notificationBadge: (
    <div className="flex justify-center">
      <div className="relative">
        <div className="rounded-xl border border-orange-500/30 bg-slate-900 px-5 py-3 text-xs font-semibold text-white">
          <Bell className="mr-2 inline-block h-4 w-4 text-orange-300" />
          Notifications
        </div>

        <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-[#020817] bg-gradient-to-br from-orange-500 to-rose-600 px-1.5 text-[10px] font-bold text-white">
          3
        </span>

        <span className="absolute -right-1 -top-3 h-2.5 w-2.5 animate-pulse rounded-full bg-orange-300" />
      </div>
    </div>
  ),

  statusDot: (
    <div className="flex justify-center">
      <div className="flex items-center gap-2 rounded-xl border border-teal-500/30 bg-teal-500/10 px-4 py-2.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>

        <span className="text-xs font-semibold text-white">Online</span>

        <span className="text-[10px] text-teal-300">Active now</span>
      </div>
    </div>
  ),

  progressNotification: (
    <div className="mx-auto max-w-[350px] rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/15">
          <Upload className="h-4 w-4 text-cyan-400" />
        </div>

        <div className="flex-1">
          <div className="flex justify-between">
            <p className="text-xs font-semibold text-white">
              Uploading assets...
            </p>

            <span className="text-[10px] font-bold text-cyan-400">68%</span>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
          </div>
        </div>
      </div>
    </div>
  ),

  confirmDialog: (
    <div className="mx-auto max-w-[350px] rounded-xl border border-red-500/30 bg-red-500/10 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/15">
          <Trash2 className="h-4 w-4 text-red-400" />
        </div>

        <div>
          <p className="text-xs font-semibold text-white">Delete Workspace?</p>

          <p className="mt-1 text-[10px] text-slate-500">
            This action cannot be undone.
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button className="rounded-lg bg-slate-800 px-3 py-1.5 text-[10px] text-slate-300">
          Cancel
        </button>

        <button className="rounded-lg bg-red-600 px-3 py-1.5 text-[10px] font-semibold text-white">
          Delete
        </button>
      </div>
    </div>
  ),

  inlineMessage: (
    <div className="mx-auto flex max-w-[350px] items-center gap-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/15">
        <ShieldCheck className="h-4 w-4 text-indigo-400" />
      </div>

      <div>
        <p className="text-xs font-semibold text-white">Security verified</p>

        <p className="mt-0.5 text-[10px] text-slate-500">
          Certificate is valid and verified.
        </p>
      </div>
    </div>
  ),
};

export default function NotificationPreview({ id }) {
  return <PreviewContainer id={id}>{Preview[id]}</PreviewContainer>;
}
