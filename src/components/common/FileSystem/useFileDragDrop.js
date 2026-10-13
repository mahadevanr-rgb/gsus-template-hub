import { useState, useCallback } from "react";

/**
 * useFileDragDrop
 * Hook managing drag-enter, drag-over, drag-leave, and drop events with visual state.
 */
export function useFileDragDrop({ onFilesDropped, disabled = false } = {}) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = useCallback(
    (e) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(true);
    },
    [disabled]
  );

  const handleDragOver = useCallback(
    (e) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback(
    (e) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.currentTarget.contains(e.relatedTarget)) return;
      setIsDragOver(false);
    },
    [disabled]
  );

  const handleDrop = useCallback(
    (e) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        if (onFilesDropped) {
          onFilesDropped(e.dataTransfer.files);
        }
      }
    },
    [disabled, onFilesDropped]
  );

  return {
    isDragOver,
    setIsDragOver,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}
