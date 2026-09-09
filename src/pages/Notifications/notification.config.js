export const notificationComponents = [
  {
    id: "toast",
    name: "Toast Notification",
    description:
      "Dismissible status feedback popups with custom icons and timeout support.",
    tag: "Feedback",
    theme: "amber",
  },
  {
    id: "alert",
    name: "Alert Banner",
    description:
      "Inline alert messages with title, description, and dismiss capability.",
    tag: "Feedback",
    theme: "blue",
  },
  {
    id: "banner",
    name: "System Announcement",
    description:
      "Full-width announcement bar with call-to-action button and close icon.",
    tag: "Banner",
    theme: "purple",
  },
  {
    id: "snackbar",
    name: "Snackbar Toast",
    description:
      "Compact floating snackbar with optional undo action at bottom viewport.",
    tag: "Snackbar",
    theme: "emerald",
  },
  {
    id: "notificationCard",
    name: "Notification Card",
    description:
      "Rich inbox notification card with user avatar, timestamp and unread badge.",
    tag: "Card",
    theme: "fuchsia",
  },
  {
    id: "notificationBadge",
    name: "Notification Badge",
    description:
      "Numeric counter and active ping dot overlays for buttons and avatars.",
    tag: "Badge",
    theme: "orange",
  },
  {
    id: "statusDot",
    name: "Status Indicator Dot",
    description:
      "Live presence status indicator (online, away, busy, offline).",
    tag: "Status",
    theme: "teal",
  },
  {
    id: "progressNotification",
    name: "Progress Notification",
    description:
      "Dynamic upload / async task progress card with linear percentage bar.",
    tag: "Progress",
    theme: "cyan",
  },
  {
    id: "confirmDialog",
    name: "Confirm Dialog Modal",
    description:
      "Accessible confirmation prompt with destructive and neutral action states.",
    tag: "Dialog",
    theme: "red",
  },
  {
    id: "inlineMessage",
    name: "Inline Helper Message",
    description:
      "Subtle inline helper indicator with status icons and contextual text.",
    tag: "Inline",
    theme: "indigo",
  },
];

export const notificationThemes = {
  amber: {
    border: "border-amber-500/30 hover:border-amber-400/70",
    glow: "bg-amber-500/10",
    tag: "text-amber-300 bg-amber-500/10 border-amber-500/25",
    hover: "group-hover:text-amber-300",
    arrow: "group-hover:border-amber-500/30 group-hover:bg-amber-500/10",
  },

  blue: {
    border: "border-blue-500/30 hover:border-blue-400/70",
    glow: "bg-blue-500/10",
    tag: "text-blue-300 bg-blue-500/10 border-blue-500/25",
    hover: "group-hover:text-blue-300",
    arrow: "group-hover:border-blue-500/30 group-hover:bg-blue-500/10",
  },

  purple: {
    border: "border-purple-500/30 hover:border-purple-400/70",
    glow: "bg-purple-500/10",
    tag: "text-purple-300 bg-purple-500/10 border-purple-500/25",
    hover: "group-hover:text-purple-300",
    arrow: "group-hover:border-purple-500/30 group-hover:bg-purple-500/10",
  },

  emerald: {
    border: "border-emerald-500/30 hover:border-emerald-400/70",
    glow: "bg-emerald-500/10",
    tag: "text-emerald-300 bg-emerald-500/10 border-emerald-500/25",
    hover: "group-hover:text-emerald-300",
    arrow: "group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10",
  },

  fuchsia: {
    border: "border-fuchsia-500/30 hover:border-fuchsia-400/70",
    glow: "bg-fuchsia-500/10",
    tag: "text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-500/25",
    hover: "group-hover:text-fuchsia-300",
    arrow: "group-hover:border-fuchsia-500/30 group-hover:bg-fuchsia-500/10",
  },

  orange: {
    border: "border-orange-500/30 hover:border-orange-400/70",
    glow: "bg-orange-500/10",
    tag: "text-orange-300 bg-orange-500/10 border-orange-500/25",
    hover: "group-hover:text-orange-300",
    arrow: "group-hover:border-orange-500/30 group-hover:bg-orange-500/10",
  },

  teal: {
    border: "border-teal-500/30 hover:border-teal-400/70",
    glow: "bg-teal-500/10",
    tag: "text-teal-300 bg-teal-500/10 border-teal-500/25",
    hover: "group-hover:text-teal-300",
    arrow: "group-hover:border-teal-500/30 group-hover:bg-teal-500/10",
  },

  cyan: {
    border: "border-cyan-500/30 hover:border-cyan-400/70",
    glow: "bg-cyan-500/10",
    tag: "text-cyan-300 bg-cyan-500/10 border-cyan-500/25",
    hover: "group-hover:text-cyan-300",
    arrow: "group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10",
  },

  red: {
    border: "border-red-500/30 hover:border-red-400/70",
    glow: "bg-red-500/10",
    tag: "text-red-300 bg-red-500/10 border-red-500/25",
    hover: "group-hover:text-red-300",
    arrow: "group-hover:border-red-500/30 group-hover:bg-red-500/10",
  },

  indigo: {
    border: "border-indigo-500/30 hover:border-indigo-400/70",
    glow: "bg-indigo-500/10",
    tag: "text-indigo-300 bg-indigo-500/10 border-indigo-500/25",
    hover: "group-hover:text-indigo-300",
    arrow: "group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10",
  },
};
