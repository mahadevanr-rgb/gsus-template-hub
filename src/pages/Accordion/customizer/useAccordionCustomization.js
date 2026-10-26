import { useState, useRef, useCallback, useEffect } from "react";
import {
  normalizeAccordionConfig,
  deepClone,
} from "./accordionCustomizationUtils";
import { getAccordionSchema } from "./accordionCustomizerConfig";
import { saveCustomizedAccordion } from "@/services/accordionCustomizerDb";

const MAX_HISTORY = 40;
const HISTORY_DEBOUNCE_MS = 400;

export function useAccordionCustomization(
  initialComponentId = "numbered-accordion",
  initialSavedData = null
) {
  const [config, setConfig] = useState(() => {
    if (initialSavedData) {
      return normalizeAccordionConfig(
        initialSavedData.sourceComponentId || initialComponentId,
        initialSavedData
      );
    }
    return normalizeAccordionConfig(initialComponentId);
  });

  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle"); // 'idle' | 'saved' | 'error'
  const [viewportMode, setViewportMode] = useState("desktop");
  const [zoom, setZoom] = useState(100);
  const [canvasBg, setCanvasBg] = useState("dots");

  const configRef = useRef(config);
  configRef.current = config;

  const historyDebounceTimer = useRef(null);
  const pendingHistorySnapshot = useRef(null);

  // Push snapshot to history with debounce grouping
  const recordHistory = useCallback((previousSnapshot) => {
    if (!pendingHistorySnapshot.current) {
      pendingHistorySnapshot.current = deepClone(previousSnapshot);
    }

    if (historyDebounceTimer.current) {
      clearTimeout(historyDebounceTimer.current);
    }

    historyDebounceTimer.current = setTimeout(() => {
      if (pendingHistorySnapshot.current) {
        setHistory((prev) => [
          ...prev.slice(-MAX_HISTORY + 1),
          pendingHistorySnapshot.current,
        ]);
        setFuture([]);
        pendingHistorySnapshot.current = null;
      }
    }, HISTORY_DEBOUNCE_MS);
  }, []);

  /**
   * Updates configuration using a dotted path string or updater function.
   */
  const updateConfig = useCallback(
    (keyOrUpdater, value) => {
      const prev = configRef.current;
      recordHistory(prev);

      setConfig((current) => {
        const next = deepClone(current);

        if (typeof keyOrUpdater === "function") {
          const updated = keyOrUpdater(next);
          return updated || next;
        }

        if (typeof keyOrUpdater === "string") {
          const parts = keyOrUpdater.split(".");
          let target = next;
          for (let i = 0; i < parts.length - 1; i++) {
            if (!target[parts[i]]) target[parts[i]] = {};
            target = target[parts[i]];
          }
          target[parts[parts.length - 1]] = value;
          return next;
        }

        return next;
      });

      setIsDirty(true);
    },
    [recordHistory]
  );

  /**
   * Updates an item in config.items by index.
   */
  const updateItem = useCallback(
    (index, updatedItem) => {
      const prev = configRef.current;
      recordHistory(prev);

      setConfig((current) => {
        const next = deepClone(current);
        if (Array.isArray(next.items) && next.items[index] !== undefined) {
          next.items[index] = { ...next.items[index], ...updatedItem };
        }
        return next;
      });

      setIsDirty(true);
    },
    [recordHistory]
  );

  /**
   * Adds a new item to config.items.
   */
  const addItem = useCallback(
    (newItem) => {
      const prev = configRef.current;
      recordHistory(prev);

      setConfig((current) => {
        const next = deepClone(current);
        if (!Array.isArray(next.items)) next.items = [];
        next.items.push(newItem);
        return next;
      });

      setIsDirty(true);
    },
    [recordHistory]
  );

  /**
   * Removes an item from config.items by index.
   */
  const removeItem = useCallback(
    (index) => {
      const prev = configRef.current;
      recordHistory(prev);

      setConfig((current) => {
        const next = deepClone(current);
        next.items = next.items.filter((_, i) => i !== index);
        return next;
      });

      setIsDirty(true);
    },
    [recordHistory]
  );

  /**
   * Duplicates an item in config.items by index.
   */
  const duplicateItem = useCallback(
    (index) => {
      const prev = configRef.current;
      recordHistory(prev);

      setConfig((current) => {
        const next = deepClone(current);
        const original = next.items[index];
        const duplicate = {
          ...deepClone(original),
          id: `${original.id || "item"}-copy-${Date.now()}`,
        };
        next.items.splice(index + 1, 0, duplicate);
        return next;
      });

      setIsDirty(true);
    },
    [recordHistory]
  );

  /**
   * Reorders items (move one index to another).
   */
  const reorderItems = useCallback(
    (fromIndex, toIndex) => {
      const prev = configRef.current;
      recordHistory(prev);

      setConfig((current) => {
        const next = deepClone(current);
        const [removed] = next.items.splice(fromIndex, 1);
        next.items.splice(toIndex, 0, removed);
        return next;
      });

      setIsDirty(true);
    },
    [recordHistory]
  );

  /** Undo last modification */
  const undo = useCallback(() => {
    if (history.length === 0) return;

    if (historyDebounceTimer.current) {
      clearTimeout(historyDebounceTimer.current);
      pendingHistorySnapshot.current = null;
    }

    const previousState = history[history.length - 1];
    const newHistory = history.slice(0, -1);

    setFuture((prev) => [deepClone(configRef.current), ...prev]);
    setHistory(newHistory);
    setConfig(deepClone(previousState));
    setIsDirty(true);
  }, [history]);

  /** Redo previously undone modification */
  const redo = useCallback(() => {
    if (future.length === 0) return;

    const nextState = future[0];
    const newFuture = future.slice(1);

    setHistory((prev) => [...prev, deepClone(configRef.current)]);
    setFuture(newFuture);
    setConfig(deepClone(nextState));
    setIsDirty(true);
  }, [future]);

  /** Resets all settings to the template defaults */
  const resetToDefaults = useCallback(() => {
    recordHistory(configRef.current);
    const defaults = normalizeAccordionConfig(config.sourceComponentId);
    defaults.name = config.name;
    defaults.id = config.id;
    setConfig(defaults);
    setIsDirty(true);
  }, [config.sourceComponentId, config.name, config.id, recordHistory]);

  /** Switches to a new source accordion pattern */
  const switchTemplate = useCallback(
    (newSourceComponentId) => {
      recordHistory(configRef.current);
      const schema = getAccordionSchema(newSourceComponentId);
      const newConfig = normalizeAccordionConfig(newSourceComponentId, {
        name: `${schema.title} Custom`,
      });
      setConfig(newConfig);
      setIsDirty(true);
    },
    [recordHistory]
  );

  /** Saves accordion design to Supabase / LocalStorage */
  const save = useCallback(async () => {
    setIsSaving(true);
    setSaveStatus("idle");

    try {
      const configSnapshot = deepClone(configRef.current);
      // Pack into the expected DB structure
      const payload = {
        id: configSnapshot.id,
        name: configSnapshot.name,
        sourceComponentId: configSnapshot.sourceComponentId,
        schemaVersion: "1.0.0",
        configuration: configSnapshot,
        createdAt: configSnapshot.createdAt,
        updatedAt: new Date().toISOString(),
      };

      const result = await saveCustomizedAccordion(payload);
      if (result?.data) {
        setConfig((prev) => ({
          ...prev,
          id: result.data.id,
          createdAt: result.data.createdAt,
          updatedAt: result.data.updatedAt,
        }));
      }
      setIsDirty(false);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
      return result?.data;
    } catch (err) {
      console.error("Failed to save accordion customization:", err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, []);

  /** Replaces entire configuration (e.g. on JSON import or loading a saved design) */
  const loadConfig = useCallback((newConfig) => {
    // newConfig may be the full saved DB record (with configuration field) or a bare config
    const sourceId =
      newConfig.sourceComponentId ||
      newConfig.configuration?.sourceComponentId ||
      "simple-accordion";
    const innerConfig = newConfig.configuration || newConfig;
    const normalized = normalizeAccordionConfig(sourceId, innerConfig);
    // Preserve the saved record id/name
    if (newConfig.id) normalized.id = newConfig.id;
    if (newConfig.name) normalized.name = newConfig.name;
    if (newConfig.createdAt) normalized.createdAt = newConfig.createdAt;
    setConfig(normalized);
    setHistory([]);
    setFuture([]);
    setIsDirty(false);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (historyDebounceTimer.current) {
        clearTimeout(historyDebounceTimer.current);
      }
    };
  }, []);

  return {
    config,
    updateConfig,
    updateItem,
    addItem,
    removeItem,
    duplicateItem,
    reorderItems,
    undo,
    redo,
    canUndo: history.length > 0,
    canRedo: future.length > 0,
    resetToDefaults,
    switchTemplate,
    save,
    loadConfig,
    isDirty,
    isSaving,
    saveStatus,
    viewportMode,
    setViewportMode,
    zoom,
    setZoom,
    canvasBg,
    setCanvasBg,
  };
}
