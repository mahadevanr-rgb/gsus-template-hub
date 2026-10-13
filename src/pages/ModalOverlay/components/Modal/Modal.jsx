import React from "react";
import {
  OverlayPortal,
  OverlayBackdrop,
  OverlayHeader,
  OverlayBody,
  OverlayFooter,
  OVERLAY_Z_INDEX,
} from "@/components/common/Overlay";
import { useOverlay } from "@/components/common/Overlay/useOverlay";

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[95vw] h-[90vh]",
};

export default function Modal({
  open = false,
  onClose,
  onOpenChange,
  title,
  description,
  icon,
  badge,
  size = "md",
  children,
  footer,
  showClose = true,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  lockBodyScroll = true,
  fullScreenOnMobile = false,
  className = "",
}) {
  const handleClose = () => {
    if (onOpenChange) onOpenChange(false);
    if (onClose) onClose();
  };

  const { containerRef, handleOutsideClick } = useOverlay({
    open,
    onClose: handleClose,
    closeOnEscape,
    closeOnOutsideClick,
    lockBodyScroll,
  });

  if (!open) return null;

  const maxWidthClass = sizeClasses[size] || sizeClasses.md;

  return (
    <OverlayPortal>
      <div
        className={`fixed inset-0 ${OVERLAY_Z_INDEX.modal} flex items-center justify-center p-3 sm:p-4 overflow-y-auto`}
        onClick={handleOutsideClick}
        role="dialog"
        aria-modal="true"
      >
        <OverlayBackdrop />

        <div
          ref={containerRef}
          className={`
            relative
            w-full
            ${maxWidthClass}
            ${fullScreenOnMobile ? "h-full sm:h-auto" : ""}
            flex flex-col
            overflow-hidden
            rounded-3xl
            border border-slate-800/90
            bg-slate-900
            text-slate-200
            shadow-2xl
            shadow-black/60
            animate-in fade-in zoom-in-95 duration-200
            ${className}
          `}
        >
          {/* Header */}
          {(title || showClose) && (
            <OverlayHeader
              title={title}
              description={description}
              icon={icon}
              badge={badge}
              onClose={showClose ? handleClose : undefined}
            />
          )}

          {/* Body */}
          <OverlayBody className="flex-1">
            {children}
          </OverlayBody>

          {/* Footer */}
          {footer && (
            <OverlayFooter>
              {footer}
            </OverlayFooter>
          )}
        </div>
      </div>
    </OverlayPortal>
  );
}
