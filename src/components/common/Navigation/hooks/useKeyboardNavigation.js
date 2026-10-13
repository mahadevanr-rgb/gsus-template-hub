import { useState, useCallback, useEffect } from "react";

/**
 * useKeyboardNavigation
 * Supports roving tabindex and arrow-key focus management (horizontal, vertical, or both)
 */
export function useKeyboardNavigation({
  itemCount = 0,
  orientation = "horizontal", // "horizontal" | "vertical" | "both"
  loop = true,
  onSelect = null,
  onEscape = null,
  initialIndex = 0,
  disabledIndices = [],
} = {}) {
  const [focusedIndex, setFocusedIndex] = useState(initialIndex);

  const getNextIndex = useCallback(
    (current, step) => {
      if (itemCount === 0) return 0;
      let next = current + step;

      if (loop) {
        if (next >= itemCount) next = 0;
        if (next < 0) next = itemCount - 1;
      } else {
        if (next >= itemCount) next = itemCount - 1;
        if (next < 0) next = 0;
      }

      // Skip disabled items if possible
      let attempts = 0;
      while (disabledIndices.includes(next) && attempts < itemCount) {
        next += step > 0 ? 1 : -1;
        if (loop) {
          if (next >= itemCount) next = 0;
          if (next < 0) next = itemCount - 1;
        } else {
          if (next >= itemCount) return current;
          if (next < 0) return current;
        }
        attempts++;
      }

      return next;
    },
    [itemCount, loop, disabledIndices]
  );

  const handleKeyDown = useCallback(
    (e) => {
      const isHorizontal = orientation === "horizontal" || orientation === "both";
      const isVertical = orientation === "vertical" || orientation === "both";

      if ((isHorizontal && e.key === "ArrowRight") || (isVertical && e.key === "ArrowDown")) {
        e.preventDefault();
        setFocusedIndex((prev) => getNextIndex(prev, 1));
      } else if ((isHorizontal && e.key === "ArrowLeft") || (isVertical && e.key === "ArrowUp")) {
        e.preventDefault();
        setFocusedIndex((prev) => getNextIndex(prev, -1));
      } else if (e.key === "Home") {
        e.preventDefault();
        setFocusedIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setFocusedIndex(Math.max(0, itemCount - 1));
      } else if (e.key === "Enter" || e.key === " ") {
        if (onSelect) {
          e.preventDefault();
          onSelect(focusedIndex);
        }
      } else if (e.key === "Escape") {
        if (onEscape) {
          e.preventDefault();
          onEscape();
        }
      }
    },
    [orientation, getNextIndex, itemCount, onSelect, onEscape, focusedIndex]
  );

  useEffect(() => {
    if (initialIndex >= 0 && initialIndex < itemCount) {
      setFocusedIndex(initialIndex);
    }
  }, [initialIndex, itemCount]);

  return {
    focusedIndex,
    setFocusedIndex,
    handleKeyDown,
    getItemProps: (index) => ({
      tabIndex: index === focusedIndex ? 0 : -1,
      onKeyDown: handleKeyDown,
      onFocus: () => setFocusedIndex(index),
    }),
  };
}

export default useKeyboardNavigation;
