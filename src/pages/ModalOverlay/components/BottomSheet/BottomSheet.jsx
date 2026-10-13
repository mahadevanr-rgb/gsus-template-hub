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

export default function BottomSheet({
  open = false,
  onClose,
  title,
  description,
  icon,
  badge,
  children,
  footer,
  showClose = true,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  maxHeight = "max-h-[85vh]",
  className = "",
}) {
  const { containerRef, handleOutsideClick } = useOverlay({
    open,
    onClose,
    closeOnEscape,
    closeOnOutsideClick,
  });

  if (!open) return null;

  return (
    <OverlayPortal>
      <div
        className={`fixed inset-0 ${OVERLAY_Z_INDEX.drawer} flex flex-col justify-end items-center`}
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
            max-w-2xl
            ${maxHeight}
            flex flex-col
            overflow-hidden
            rounded-t-[2rem]
            border-t border-x border-slate-800
            bg-slate-900
            text-slate-200
            shadow-2xl
            shadow-black/90
            z-10
            animate-in slide-in-from-bottom duration-300 ease-out
            ${className}
          `}
        >
          {/* Mobile Drag Indicator Handle */}
          <div className="pt-3 pb-1 flex justify-center bg-slate-950/60">
            <div className="w-12 h-1.5 rounded-full bg-slate-700/80 hover:bg-slate-600 transition-colors cursor-grab" />
          </div>

          {(title || showClose) && (
            <OverlayHeader
              title={title}
              description={description}
              icon={icon}
              badge={badge}
              onClose={showClose ? onClose : undefined}
            />
          )}

          <OverlayBody className="flex-1 max-h-[60vh]">
            {children}
          </OverlayBody>

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
