import React from "react";
import { CheckCircle2, AlertCircle, Clock, XCircle, Loader2 } from "lucide-react";

/**
 * UploadProgress
 * Polished progress bar and status indicator with 0%, 25%, 50%, 75%, 100% states.
 */
export default function UploadProgress({
  progress = 0,
  status = "uploading", // "idle" | "selected" | "validating" | "uploading" | "success" | "error" | "canceled"
  error = null,
  showPercentage = true,
  size = "md", // "sm" | "md" | "lg"
  className = "",
}) {
  const clampedProgress = Math.min(100, Math.max(0, Math.round(progress)));

  const heightClasses = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-2.5",
  }[size] || "h-2";

  // Status color mapping
  const getStatusDetails = () => {
    switch (status) {
      case "success":
        return {
          barColor: "bg-emerald-500",
          textColor: "text-emerald-400",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
          label: "Completed",
        };
      case "error":
        return {
          barColor: "bg-rose-500",
          textColor: "text-rose-400",
          icon: <AlertCircle className="w-3.5 h-3.5 text-rose-400" />,
          label: error || "Upload failed",
        };
      case "canceled":
        return {
          barColor: "bg-slate-600",
          textColor: "text-slate-400",
          icon: <XCircle className="w-3.5 h-3.5 text-slate-400" />,
          label: "Canceled",
        };
      case "validating":
        return {
          barColor: "bg-amber-500",
          textColor: "text-amber-400",
          icon: <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />,
          label: "Validating...",
        };
      case "selected":
        return {
          barColor: "bg-blue-500",
          textColor: "text-blue-400",
          icon: <Clock className="w-3.5 h-3.5 text-blue-400" />,
          label: "Ready to upload",
        };
      case "uploading":
      default:
        return {
          barColor: "bg-gradient-to-r from-indigo-500 to-purple-500",
          textColor: "text-indigo-400",
          icon: <Loader2 className="w-3.5 h-3.5 text-indigo-400 animate-spin" />,
          label: `Uploading... ${clampedProgress}%`,
        };
    }
  };

  const details = getStatusDetails();

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-medium truncate">
          {details.icon}
          <span className={`text-[11px] truncate ${details.textColor}`}>
            {details.label}
          </span>
        </div>

        {showPercentage && status === "uploading" && (
          <span className="font-mono text-[11px] font-semibold text-slate-300">
            {clampedProgress}%
          </span>
        )}
      </div>

      <div className={`w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden ${heightClasses}`}>
        <div
          className={`h-full transition-all duration-300 ease-out rounded-full ${details.barColor}`}
          style={{ width: `${status === "error" ? 100 : clampedProgress}%` }}
        />
      </div>
    </div>
  );
}
