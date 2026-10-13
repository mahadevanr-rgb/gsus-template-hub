import { useState, useCallback } from "react";

/**
 * useNavigationState
 * Manages comprehensive state for navigation items:
 * active, hovered, focused, selected, expanded/collapsed, disabled, loading, error, completed.
 */
export function useNavigationState({
  initialActiveId = null,
  initialExpanded = {},
  allowMultipleExpanded = true,
  onChange = null,
} = {}) {
  const [activeId, setActiveId] = useState(initialActiveId);
  const [hoveredId, setHoveredId] = useState(null);
  const [focusedId, setFocusedId] = useState(null);
  const [expandedMap, setExpandedMap] = useState(initialExpanded);
  const [disabledSet, setDisabledSet] = useState(new Set());
  const [loadingSet, setLoadingSet] = useState(new Set());
  const [errorMap, setErrorMap] = useState({});

  const selectItem = useCallback(
    (id) => {
      if (disabledSet.has(id)) return;
      setActiveId(id);
      if (onChange) onChange(id);
    },
    [disabledSet, onChange]
  );

  const toggleExpanded = useCallback(
    (id) => {
      setExpandedMap((prev) => {
        if (!allowMultipleExpanded) {
          return { [id]: !prev[id] };
        }
        return { ...prev, [id]: !prev[id] };
      });
    },
    [allowMultipleExpanded]
  );

  const setExpanded = useCallback((id, isExp) => {
    setExpandedMap((prev) => ({ ...prev, [id]: isExp }));
  }, []);

  const setItemDisabled = useCallback((id, disabled = true) => {
    setDisabledSet((prev) => {
      const next = new Set(prev);
      if (disabled) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const setItemLoading = useCallback((id, loading = true) => {
    setLoadingSet((prev) => {
      const next = new Set(prev);
      if (loading) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const setItemError = useCallback((id, error = null) => {
    setErrorMap((prev) => ({ ...prev, [id]: error }));
  }, []);

  return {
    activeId,
    setActiveId: selectItem,
    hoveredId,
    setHoveredId,
    focusedId,
    setFocusedId,
    expandedMap,
    toggleExpanded,
    setExpanded,
    disabledSet,
    setItemDisabled,
    loadingSet,
    setItemLoading,
    errorMap,
    setItemError,
    isItemActive: (id) => activeId === id,
    isItemExpanded: (id) => !!expandedMap[id],
    isItemDisabled: (id) => disabledSet.has(id),
    isItemLoading: (id) => loadingSet.has(id),
  };
}

export default useNavigationState;
