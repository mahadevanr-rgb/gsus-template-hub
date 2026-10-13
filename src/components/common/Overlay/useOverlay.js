import { useEffect, useRef, useCallback } from "react";

// Global overlay stack for managing ESC key order and scroll lock count
const overlayStack = [];

function lockScroll() {
  if (typeof document === "undefined") return;
  const currentCount = parseInt(document.body.dataset.overlayCount || "0", 10);
  if (currentCount === 0) {
    document.body.dataset.originalOverflow = document.body.style.overflow;
    document.body.dataset.originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
  }
  document.body.dataset.overlayCount = `${currentCount + 1}`;
}

function unlockScroll() {
  if (typeof document === "undefined") return;
  const currentCount = parseInt(document.body.dataset.overlayCount || "1", 10) - 1;
  if (currentCount <= 0) {
    document.body.style.overflow = document.body.dataset.originalOverflow || "";
    document.body.style.paddingRight = document.body.dataset.originalPaddingRight || "";
    delete document.body.dataset.overlayCount;
    delete document.body.dataset.originalOverflow;
    delete document.body.dataset.originalPaddingRight;
  } else {
    document.body.dataset.overlayCount = `${currentCount}`;
  }
}

/**
 * useOverlay Hook
 * Provides focus trapping, scroll locking, ESC stack handling, and outside click management.
 */
export function useOverlay({
  open = false,
  onClose,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  lockBodyScroll = true,
  trapFocus = true,
  restoreFocus = true,
  overlayId,
  ignoreRefs = [],
}) {
  const containerRef = useRef(null);
  const previousFocusRef = useRef(null);
  const idRef = useRef(overlayId || `overlay-${Math.random().toString(36).slice(2, 9)}`);

  // Handle outside click
  const handleOutsideClick = useCallback(
    (event) => {
      if (!open || !closeOnOutsideClick || !onClose) return;

      const target = event.target;
      if (containerRef.current && !containerRef.current.contains(target)) {
        for (const ref of ignoreRefs) {
          if (ref?.current && ref.current.contains(target)) {
            return;
          }
        }
        onClose(event);
      }
    },
    [open, closeOnOutsideClick, onClose, ignoreRefs]
  );

  // Scroll lock & Stack management
  useEffect(() => {
    if (!open) return;

    if (typeof document !== "undefined") {
      previousFocusRef.current = document.activeElement;
    }

    if (lockBodyScroll) {
      lockScroll();
    }

    const currentId = idRef.current;
    overlayStack.push(currentId);

    // Global keydown handler for ESC key
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && closeOnEscape && onClose) {
        // Only trigger if this overlay is the topmost in the stack
        if (overlayStack[overlayStack.length - 1] === currentId) {
          event.stopPropagation();
          onClose();
        }
      }

      // Focus trapping
      if (event.key === "Tab" && trapFocus && containerRef.current) {
        const focusableElements = containerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Auto focus first element
    if (trapFocus && containerRef.current) {
      const firstFocusable = containerRef.current.querySelector(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 50);
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      const index = overlayStack.indexOf(currentId);
      if (index !== -1) {
        overlayStack.splice(index, 1);
      }

      if (lockBodyScroll) {
        unlockScroll();
      }

      if (restoreFocus && previousFocusRef.current && typeof previousFocusRef.current.focus === "function") {
        setTimeout(() => {
          try {
            previousFocusRef.current.focus();
          } catch {
            // Ignore focus errors
          }
        }, 10);
      }
    };
  }, [open, closeOnEscape, lockBodyScroll, trapFocus, restoreFocus, onClose]);

  return {
    containerRef,
    handleOutsideClick,
    overlayId: idRef.current,
  };
}

export default useOverlay;
