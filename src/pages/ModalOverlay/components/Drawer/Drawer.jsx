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

export default function Drawer({
  open = false,
  onClose,
  onOpenChange,
  side = "right", // 'left' | 'right' | 'top' | 'bottom'
  size = "md",
  title,
  description,
  icon,
  badge,
  children,
  footer,
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

  // Placement styles and animation definitions
  const sideConfig = {
    right: {
      container: "fixed inset-y-0 right-0 h-full flex flex-col justify-between",
      sizes: {
        sm: "w-full sm:w-80",
        md: "w-full sm:w-96",
        lg: "w-full sm:w-[32rem]",
        xl: "w-full sm:w-[42rem]",
        full: "w-full",
      },
      animation: "animate-in slide-in-from-right duration-300",
      border: "border-l border-slate-800",
    },
    left: {
      container: "fixed inset-y-0 left-0 h-full flex flex-col justify-between",
      sizes: {
        sm: "w-full sm:w-80",
        md: "w-full sm:w-96",
        lg: "w-full sm:w-[32rem]",
        xl: "w-full sm:w-[42rem]",
        full: "w-full",
      },
      animation: "animate-in slide-in-from-left duration-300",
      border: "border-r border-slate-800",
    },
    top: {
      container: "fixed inset-x-0 top-0 w-full flex flex-col justify-between",
      sizes: {
        sm: "max-h-[30vh]",
        md: "max-h-[50vh]",
        lg: "max-h-[70vh]",
        xl: "max-h-[85vh]",
        full: "h-full",
      },
      animation: "animate-in slide-in-from-top duration-300",
      border: "border-b border-slate-800",
    },
    bottom: {
      container: "fixed inset-x-0 bottom-0 w-full flex flex-col justify-between rounded-t-3xl",
      sizes: {
        sm: "max-h-[35vh]",
        md: "max-h-[55vh]",
        lg: "max-h-[75vh]",
        xl: "max-h-[90vh]",
        full: "h-full",
      },
      animation: "animate-in slide-in-from-bottom duration-300",
      border: "border-t border-slate-800",
    },
  };

  const currentSide = sideConfig[side] || sideConfig.right;
  const sizeClass = currentSide.sizes[size] || currentSide.sizes.md;

  return (
    <OverlayPortal>
      <div
        className={`fixed inset-0 ${OVERLAY_Z_INDEX.drawer} overflow-hidden`}
        onClick={handleOutsideClick}
        role="dialog"
        aria-modal="true"
      >
        <OverlayBackdrop />

        <div
          ref={containerRef}
          className={`
            ${currentSide.container}
            ${sizeClass}
            ${currentSide.border}
            ${currentSide.animation}
            bg-slate-900
            text-slate-200
            shadow-2xl
            shadow-black/80
            z-10
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
          <OverlayBody className="flex-1 max-h-none">
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
