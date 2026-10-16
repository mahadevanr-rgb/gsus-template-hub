import { useState, useRef, useCallback, useEffect } from "react";
import { normalizeCardConfig, deepClone } from "./cardCustomizationUtils";
import { getCardSchema } from "./cardCustomizerConfig";
import { saveCustomizedCard } from "@/services/cardCustomizerDb";

const MAX_HISTORY = 40;
const HISTORY_DEBOUNCE_MS = 400;

export function useCardCustomization(initialCardId = "profile-card", initialCustomCard = null) {
  // Initialize state
  const [config, setConfig] = useState(() => {
    if (initialCustomCard) {
      return normalizeCardConfig(initialCustomCard.sourceCardId || initialCardId, initialCustomCard);
    }
    return normalizeCardConfig(initialCardId);
  });

  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle"); // 'idle' | 'saved' | 'error'
  const [viewportMode, setViewportMode] = useState("desktop"); // 'desktop' | 'tablet' | 'mobile'
  const [zoom, setZoom] = useState(100); // 50, 75, 100, 125
  const [canvasBg, setCanvasBg] = useState("dots"); // 'dots' | 'dark' | 'light' | 'gradient' | 'grid'

  // Ref to hold the latest config for history snapshots
  const configRef = useRef(config);
  configRef.current = config;

  const historyDebounceTimer = useRef(null);
  const pendingHistorySnapshot = useRef(null);

  // Push snapshot to history with debounce grouping for rapid slider/color changes
  const recordHistory = useCallback((previousSnapshot) => {
    if (!pendingHistorySnapshot.current) {
      pendingHistorySnapshot.current = deepClone(previousSnapshot);
    }

    if (historyDebounceTimer.current) {
      clearTimeout(historyDebounceTimer.current);
    }

    historyDebounceTimer.current = setTimeout(() => {
      if (pendingHistorySnapshot.current) {
        setHistory((prev) => [...prev.slice(-MAX_HISTORY + 1), pendingHistorySnapshot.current]);
        setFuture([]); // Clear redo future on new edit
        pendingHistorySnapshot.current = null;
      }
    }, HISTORY_DEBOUNCE_MS);
  }, []);

  /**
   * Updates configuration using a dotted path (e.g. 'colors.cardBg', '#000') or an updater function.
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
   * Undo last modification.
   */
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

  /**
   * Redo previously undone modification.
   */
  const redo = useCallback(() => {
    if (future.length === 0) return;

    const nextState = future[0];
    const newFuture = future.slice(1);

    setHistory((prev) => [...prev, deepClone(configRef.current)]);
    setFuture(newFuture);
    setConfig(deepClone(nextState));
    setIsDirty(true);
  }, [future]);

  /**
   * Resets card settings to initial template defaults.
   */
  const resetToDefaults = useCallback(() => {
    recordHistory(configRef.current);
    const defaults = normalizeCardConfig(config.sourceCardId);
    defaults.name = config.name; // Preserve current custom card name
    defaults.id = config.id;
    setConfig(defaults);
    setIsDirty(true);
  }, [config.sourceCardId, config.name, config.id, recordHistory]);

  /**
   * Switches to a new source card template.
   */
  const switchTemplate = useCallback((newSourceCardId) => {
    recordHistory(configRef.current);
    const schema = getCardSchema(newSourceCardId);
    const newConfig = normalizeCardConfig(newSourceCardId, {
      name: `${schema.title} Custom`,
    });
    setConfig(newConfig);
    setIsDirty(true);
  }, [recordHistory]);

  /**
   * Saves card design to Supabase / LocalStorage.
   */
  const save = useCallback(async () => {
    setIsSaving(true);
    setSaveStatus("idle");

    try {
      const result = await saveCustomizedCard(configRef.current);
      if (result?.data) {
        setConfig((prev) => ({ ...prev, ...result.data }));
      }
      setIsDirty(false);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
      return result?.data;
    } catch (err) {
      console.error("Failed to save card customization:", err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, []);

  /**
   * Replaces entire configuration (e.g. on JSON import or loading a saved design).
   */
  const loadConfig = useCallback((newConfig) => {
    const normalized = normalizeCardConfig(newConfig.sourceCardId || "profile-card", newConfig);
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
