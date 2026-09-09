import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toast } from "@/pages/Notifications/components/Toast/Toast";
import { Alert } from "@/pages/Notifications/components/Alert/Alert";
import { Banner } from "@/pages/Notifications/components/Banner/Banner";
import { Snackbar } from "@/pages/Notifications/components/Snackbar/Snackbar";
import { NotificationCard } from "@/pages/Notifications/components/NotificationCard/NotificationCard";
import { NotificationBadge } from "@/pages/Notifications/components/NotificationBadge/NotificationBadge";
import { StatusDot } from "@/pages/Notifications/components/StatusDot/StatusDot";
import { ProgressNotification } from "@/pages/Notifications/components/ProgressNotification/ProgressNotification";
import { ConfirmDialog } from "@/pages/Notifications/components/ConfirmDialog/ConfirmDialog";
import { InlineMessage } from "@/pages/Notifications/components/InlineMessage/InlineMessage";
import ComponentDetailsView from "@/components/common/ComponentDetailsView/ComponentDetailsView";

const notificationSiblings = [
  { slug: "toast", name: "Toast Notification" },
  { slug: "alert", name: "Alert Banner" },
  { slug: "banner", name: "System Banner" },
  { slug: "snackbar", name: "Snackbar Toast" },
  { slug: "notificationCard", name: "Notification Card" },
  { slug: "notificationBadge", name: "Notification Badge" },
  { slug: "statusDot", name: "Status Indicator Dot" },
  { slug: "progressNotification", name: "Progress Notification" },
  { slug: "confirmDialog", name: "Confirm Dialog Modal" },
  { slug: "inlineMessage", name: "Inline Helper Message" },
];

const notifMeta = {
  toast: {
    name: "Toast Notification",
    tag: "Feedback",
    description: "Dismissible status feedback popups with custom icons and timeout support.",
    code: `import Toast from "@/components/ui/Toast";\n\n<Toast type="success" message="Project saved successfully!" onClose={() => {}} />`,
    files: [{ path: "components/ui/notifications/Toast.jsx" }],
  },
  alert: {
    name: "Alert Banner",
    tag: "Feedback",
    description: "Inline alert messages with title, description, and dismiss capability.",
    code: `import Alert from "@/components/ui/Alert";\n\n<Alert type="warning" title="Warning" message="Please review your plan limits." />`,
    files: [{ path: "components/ui/notifications/Alert.jsx" }],
  },
  banner: {
    name: "System Announcement Banner",
    tag: "Banner",
    description: "Full-width announcement bar with call-to-action button and close icon.",
    code: `import Banner from "@/components/ui/Banner";\n\n<Banner type="info" message="New version 2.0 is live!" action="Learn more" />`,
    files: [{ path: "components/ui/notifications/Banner.jsx" }],
  },
  snackbar: {
    name: "Snackbar Toast",
    tag: "Snackbar",
    description: "Compact floating snackbar with optional undo action at bottom viewport.",
    code: `import Snackbar from "@/components/ui/Snackbar";\n\n<Snackbar message="File deleted." action="Undo" onAction={() => {}} />`,
    files: [{ path: "components/ui/notifications/Snackbar.jsx" }],
  },
  notificationCard: {
    name: "Notification Card",
    tag: "Card",
    description: "Rich inbox notification card with user avatar, timestamp and unread badge.",
    code: `import NotificationCard from "@/components/ui/NotificationCard";\n\n<NotificationCard avatar="👤" title="New Message" message="Sarah left a review." time="Just now" unread />`,
    files: [{ path: "components/ui/notifications/NotificationCard.jsx" }],
  },
  notificationBadge: {
    name: "Notification Badge",
    tag: "Badge",
    description: "Numeric counter and active ping dot overlays for buttons and avatars.",
    code: `import NotificationBadge from "@/components/ui/NotificationBadge";\n\n<NotificationBadge count={5}>\n  <button className="p-2 bg-slate-800 rounded-xl">🔔</button>\n</NotificationBadge>`,
    files: [{ path: "components/ui/notifications/NotificationBadge.jsx" }],
  },
  statusDot: {
    name: "Status Indicator Dot",
    tag: "Status",
    description: "Live presence status indicator (online, away, busy, offline).",
    code: `import StatusDot from "@/components/ui/StatusDot";\n\n<StatusDot status="online" label="Active Now" />`,
    files: [{ path: "components/ui/notifications/StatusDot.jsx" }],
  },
  progressNotification: {
    name: "Progress Notification",
    tag: "Progress",
    description: "Dynamic upload / async task progress card with linear percentage bar.",
    code: `import ProgressNotification from "@/components/ui/ProgressNotification";\n\n<ProgressNotification title="Uploading assets..." progress={75} />`,
    files: [{ path: "components/ui/notifications/ProgressNotification.jsx" }],
  },
  confirmDialog: {
    name: "Confirm Dialog Modal",
    tag: "Dialog",
    description: "Accessible confirmation prompt with destructive and neutral action states.",
    code: `import ConfirmDialog from "@/components/ui/ConfirmDialog";\n\n<ConfirmDialog\n  title="Delete Project?"\n  message="This action cannot be undone."\n  onConfirm={() => {}}\n  onCancel={() => {}}\n/>`,
    files: [{ path: "components/ui/notifications/ConfirmDialog.jsx" }],
  },
  inlineMessage: {
    name: "Inline Helper Message",
    tag: "Inline",
    description: "Subtle inline helper indicator with status icons and contextual text.",
    code: `import InlineMessage from "@/components/ui/InlineMessage";\n\n<InlineMessage type="success" message="Username is available" />`,
    files: [{ path: "components/ui/notifications/InlineMessage.jsx" }],
  },
};

export default function NotificationDetails({ selected, onBack, onNavigateHome }) {
  const params = useParams();
  const navigate = useNavigate();

  const activeSlug = selected || params.id || "toast";
  const [currentSlug, setCurrentSlug] = useState(activeSlug);

  useEffect(() => {
    if (selected) {
      setCurrentSlug(selected);
    } else if (params.id) {
      setCurrentSlug(params.id);
    }
  }, [selected, params.id]);

  const meta = notifMeta[currentSlug] || notifMeta.toast;
  const componentData = {
    name: meta.name,
    slug: currentSlug,
    subCategory: meta.tag,
    tag: meta.tag,
    description: meta.description,
    sourceCode: meta.code,
    files: meta.files,
    framework: "react",
    styling: "Tailwind CSS",
    version: "1.0.0",
    dependencies: ["None"],
    size: "~2.0 KB",
    lastUpdated: "May 12, 2025",
    author: "TemplateHub UI Team",
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/notifications");
    }
  };

  const handleHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      navigate("/");
    }
  };

  const renderPreview = () => {
    switch (currentSlug) {
      case "toast":
        return <Toast type="success" message="Changes saved successfully!" onClose={() => {}} />;
      case "alert":
        return <Alert type="info" title="System Update" message="Scheduled maintenance will take place at 12:00 AM UTC." />;
      case "banner":
        return <Banner type="dark" message="We use cookies to improve experience." action="Accept All" />;
      case "snackbar":
        return <Snackbar message="Item deleted from project." action="Undo" onAction={() => {}} onClose={() => {}} />;
      case "notificationCard":
        return <NotificationCard avatar="⚡" title="New build completed" message="Deployment finished in 42 seconds." time="2m ago" unread />;
      case "notificationBadge":
        return (
          <NotificationBadge count={3}>
            <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-white">
              Notifications
            </div>
          </NotificationBadge>
        );
      case "statusDot":
        return (
          <div className="flex gap-4 items-center">
            <StatusDot status="online" label="Online" />
            <StatusDot status="away" label="Away" />
            <StatusDot status="busy" label="Busy" />
          </div>
        );
      case "progressNotification":
        return <ProgressNotification title="Compressing video stream" progress={68} />;
      case "confirmDialog":
        return (
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <p className="text-xs font-bold text-white">Delete Workspace Confirmation</p>
            <p className="text-[11px] text-slate-400">Are you sure you want to permanently delete this repository?</p>
            <div className="flex gap-2 justify-end">
              <button className="px-3 py-1.5 rounded-lg text-xs bg-slate-800 text-slate-300">Cancel</button>
              <button className="px-3 py-1.5 rounded-lg text-xs bg-rose-600 text-white font-semibold">Delete</button>
            </div>
          </div>
        );
      case "inlineMessage":
        return <InlineMessage type="success" message="Security certificate is valid and verified." />;
      default:
        return <Toast type="success" message="Operational" />;
    }
  };

  return (
    <ComponentDetailsView
      component={componentData}
      categoryName="Notifications"
      categoryPath="/notifications"
      subCategories={notificationSiblings}
      activeSlug={currentSlug}
      onSelectSibling={(slug) => setCurrentSlug(slug)}
      onBack={handleBack}
      onNavigateHome={handleHome}
      renderCustomPreview={renderPreview}
    />
  );
}
