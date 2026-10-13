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

export default function Dialog({
  open = false,
  onClose,
  onOpenChange,
  title,
  description,
  icon,
  badge,
  children,
  footer,
  actions,
  size = "md",
  showClose = true,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  lockBodyScroll = true,
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

  const sizeWidthMap = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-xl",
    xl: "max-w-3xl",
  };

  const maxWidthClass = sizeWidthMap[size] || sizeWidthMap.md;

  return (
    <OverlayPortal>
      <div
        className={`fixed inset-0 ${OVERLAY_Z_INDEX.modal} flex items-center justify-center p-4 overflow-y-auto`}
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
            flex flex-col
            overflow-hidden
            rounded-3xl
            border border-slate-800/90
            bg-slate-900
            text-slate-200
            shadow-2xl
            shadow-black/70
            animate-in fade-in zoom-in-95 duration-200
            ${className}
          `}
        >
          {(title || showClose) && (
            <OverlayHeader
              title={title}
              description={description}
              icon={icon}
              badge={badge}
              onClose={showClose ? handleClose : undefined}
            />
          )}

          <OverlayBody>
            {children}
          </OverlayBody>

          {(footer || actions) && (
            <OverlayFooter>
              {footer || actions}
            </OverlayFooter>
          )}
        </div>
      </div>
    </OverlayPortal>
  );
}
