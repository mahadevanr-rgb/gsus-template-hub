import { useState, useRef, useCallback } from "react";
import { normalizeFileSystemConfig, deepClone } from "./fileSystemCustomizationUtils";
import { getFileSystemSchema } from "./fileSystemCustomizerConfig";
import { saveCustomizedFileSystem } from "@/services/fileSystemCustomizerDb";

const MAX_HISTORY = 40;
const HISTORY_DEBOUNCE_MS = 400;

export function useFileSystemCustomization(initialComponentId = "basic-file-upload", initialCustomFileSystem = null) {
  // Initialize state
  const [config, setConfig] = useState(() => {
    if (initialCustomFileSystem) {
      return normalizeFileSystemConfig(
        initialCustomFileSystem.sourceComponentId || initialComponentId,
        initialCustomFileSystem.configuration || initialCustomFileSystem
      );
    }
    return normalizeFileSystemConfig(initialComponentId);
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
   * Updates configuration using a dotted path (e.g. 'appearance.accentColor', '#000') or updater function.
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

          // Keep bytes in sync if maxSizeValue or unit changes
          if (parts[0] === "validation" && (parts[1] === "maxSizeValue" || parts[1] === "maxSizeUnit")) {
            const unit = next.validation.maxSizeUnit === "KB" ? 1024 : 1024 * 1024;
            next.validation.maxSizeBytes = (next.validation.maxSizeValue || 1) * unit;
          }

          // Keep maxFiles in sync if multiple changes
          if (parts[0] === "fileSelection" && parts[1] === "multiple") {
            if (!value) {
              next.fileSelection.maxFiles = 1;
            } else if (next.fileSelection.maxFiles <= 1) {
              next.fileSelection.maxFiles = 5;
            }
          }

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
    setConfig(previousState);
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
    setConfig(nextState);
    setIsDirty(true);
  }, [future]);

  /**
   * Reset single category (e.g. 'appearance') to defaults
   */
  const resetCategory = useCallback(
    (categoryKey) => {
      const prev = configRef.current;
      recordHistory(prev);

      const schema = getFileSystemSchema(config.sourceComponentId);
      const defaults = normalizeFileSystemConfig(config.sourceComponentId);

      if (defaults[categoryKey]) {
        setConfig((current) => ({
          ...current,
          [categoryKey]: deepClone(defaults[categoryKey]),
        }));
        setIsDirty(true);
      }
    },
    [config.sourceComponentId, recordHistory]
  );

  /**
   * Resets entire configuration to base schema defaults.
   */
  const resetToDefaults = useCallback(() => {
    const prev = configRef.current;
    recordHistory(prev);

    const fresh = normalizeFileSystemConfig(config.sourceComponentId);
    fresh.name = config.name; // Keep custom name
    fresh.id = config.id;
    setConfig(fresh);
    setIsDirty(true);
  }, [config.sourceComponentId, config.name, config.id, recordHistory]);

  /**
   * Switch the underlying component archetype/template while preserving compatible styles.
   */
  const switchTemplate = useCallback(
    (newSourceComponentId) => {
      const prev = configRef.current;
      recordHistory(prev);

      const targetDefaults = normalizeFileSystemConfig(newSourceComponentId);
      const merged = {
        ...targetDefaults,
        id: prev.id,
        name: prev.name.includes("Custom") ? targetDefaults.name : prev.name,
        // Preserve user's preferred visual styles if desired
        appearance: {
          ...targetDefaults.appearance,
          cardBg: prev.appearance.cardBg,
          accentColor: prev.appearance.accentColor,
          borderColor: prev.appearance.borderColor,
          borderRadius: prev.appearance.borderRadius,
          shadow: prev.appearance.shadow,
        },
      };

      setConfig(merged);
      setIsDirty(true);
    },
    [recordHistory]
  );

  /**
   * Loads an external or imported configuration directly.
   */
  const loadConfig = useCallback((imported) => {
    const normalized = normalizeFileSystemConfig(
      imported.sourceComponentId || "basic-file-upload",
      imported.configuration || imported
    );
    if (imported.name) normalized.name = imported.name;
    if (imported.id) normalized.id = imported.id;

    setConfig(normalized);
    setHistory([]);
    setFuture([]);
    setIsDirty(false);
  }, []);

  /**
   * Persists current customization to DB and localStorage.
   */
  const save = useCallback(async () => {
    setIsSaving(true);
    setSaveStatus("idle");
    try {
      const payload = {
        id: configRef.current.id,
        name: configRef.current.name,
        sourceComponentId: configRef.current.sourceComponentId,
        configuration: configRef.current,
        schemaVersion: "1.0.0",
      };
      await saveCustomizedFileSystem(payload);
      setIsDirty(false);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } catch (err) {
      console.error("Failed to save customized file system design:", err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setIsSaving(false);
    }
  }, []);

  return {
    config,
    updateConfig,
    undo,
    redo,
    canUndo: history.length > 0,
    canRedo: future.length > 0,
    resetCategory,
    resetToDefaults,
    switchTemplate,
    loadConfig,
    save,
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
