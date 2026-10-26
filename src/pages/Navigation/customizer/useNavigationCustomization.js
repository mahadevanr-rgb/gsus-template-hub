import { useState, useRef, useCallback, useEffect } from "react";
import {
  normalizeNavigationConfig,
  deepClone,
} from "./navigationCustomizationUtils";
import { getNavigationSchema } from "./navigationCustomizerConfig";
import { saveCustomizedNavigation } from "@/services/navigationCustomizerDb";

const MAX_HISTORY = 40;
const HISTORY_DEBOUNCE_MS = 350;

export function useNavigationCustomization(
  initialComponentId = "navbar",
  initialSavedData = null
) {
  const [config, setConfig] = useState(() => {
    if (initialSavedData) {
      return normalizeNavigationConfig(
        initialSavedData.sourceComponentId || initialComponentId,
        initialSavedData
      );
    }
    return normalizeNavigationConfig(initialComponentId);
  });

  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle"); // 'idle' | 'saved' | 'error'
  const [viewportMode, setViewportMode] = useState("desktop"); // 'desktop' | 'tablet' | 'mobile'
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

      if (typeof keyOrUpdater === "function") {
        setConfig((curr) => {
          const next = keyOrUpdater(curr);
          return deepClone(next);
        });
      } else {
        const path = keyOrUpdater.split(".");
        setConfig((curr) => {
          const next = deepClone(curr);
          let target = next;
          for (let i = 0; i < path.length - 1; i++) {
            if (!target[path[i]] || typeof target[path[i]] !== "object") {
              target[path[i]] = {};
            }
            target = target[path[i]];
          }
          target[path[path.length - 1]] = value;
          return next;
        });
      }

      setIsDirty(true);
    },
    [recordHistory]
  );

  /** Undo action */
  const undo = useCallback(() => {
    if (history.length === 0) return;

    if (historyDebounceTimer.current) {
      clearTimeout(historyDebounceTimer.current);
      historyDebounceTimer.current = null;
    }
    pendingHistorySnapshot.current = null;

    const previousState = history[history.length - 1];
    const newHistory = history.slice(0, -1);

    setFuture((prev) => [deepClone(configRef.current), ...prev]);
    setHistory(newHistory);
    setConfig(deepClone(previousState));
    setIsDirty(true);
  }, [history]);

  /** Redo action */
  const redo = useCallback(() => {
    if (future.length === 0) return;

    const nextState = future[0];
    const newFuture = future.slice(1);

    setHistory((prev) => [...prev, deepClone(configRef.current)]);
    setFuture(newFuture);
    setConfig(deepClone(nextState));
    setIsDirty(true);
  }, [future]);

  /** Resets all settings to pattern defaults */
  const resetToDefaults = useCallback(() => {
    recordHistory(configRef.current);
    const defaults = normalizeNavigationConfig(config.sourceComponentId);
    defaults.name = config.name;
    defaults.id = config.id;
    setConfig(defaults);
    setIsDirty(true);
  }, [config.sourceComponentId, config.name, config.id, recordHistory]);

  /** Switches to another navigation component */
  const switchComponent = useCallback(
    (newSourceComponentId) => {
      recordHistory(configRef.current);
      const schema = getNavigationSchema(newSourceComponentId);
      const newConfig = normalizeNavigationConfig(newSourceComponentId, {
        name: `${schema.name} Custom`,
      });
      setConfig(newConfig);
      setIsDirty(true);
    },
    [recordHistory]
  );

  /** Saves navigation design */
  const save = useCallback(async () => {
    setIsSaving(true);
    setSaveStatus("idle");
    try {
      const payload = {
        id: config.id,
        name: config.name,
        sourceComponentId: config.sourceComponentId,
        componentType: config.componentType,
        configuration: deepClone(config),
        createdAt: config.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await saveCustomizedNavigation(payload);
      setSaveStatus("saved");
      setIsDirty(false);
      setTimeout(() => setSaveStatus("idle"), 2500);
    } catch (err) {
      console.error("Save navigation failed:", err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setIsSaving(false);
    }
  }, [config]);

  /** Loads an imported or fetched configuration into state */
  const loadConfig = useCallback((newConfig) => {
    const sourceId =
      newConfig.sourceComponentId ||
      newConfig.configuration?.sourceComponentId ||
      "navbar";
    const innerConfig = newConfig.configuration || newConfig;
    const normalized = normalizeNavigationConfig(sourceId, innerConfig);
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
    undo,
    redo,
    canUndo: history.length > 0,
    canRedo: future.length > 0,
    resetToDefaults,
    switchComponent,
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
