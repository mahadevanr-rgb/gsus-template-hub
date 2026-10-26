import { supabase } from "@/services/supabase/client";

const LOCAL_STORAGE_KEY = "templatehub-customized-overlays";

/**
 * Safely retrieves customized overlays from localStorage.
 */
function getLocalCustomizedOverlays() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("Failed to load customized overlays from localStorage", err);
    return [];
  }
}

/**
 * Saves customized overlays array to localStorage.
 */
function setLocalCustomizedOverlays(items) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.warn("Failed to write customized overlays to localStorage", err);
  }
}

/**
 * Normalizes DB row from snake_case to camelCase.
 */
function normalizeFromDb(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name || "Untitled Overlay",
    sourceComponentId:
      row.source_component_id || row.sourceComponentId || "basic-modal",
    overlayType: row.overlay_type || row.overlayType || "modal",
    configuration: row.configuration || {},
    schemaVersion: row.schema_version || row.schemaVersion || "1.0.0",
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
    updatedAt: row.updated_at || row.updatedAt || new Date().toISOString(),
  };
}

/**
 * Normalizes item to snake_case for Supabase.
 */
function normalizeForDb(item) {
  return {
    id: item.id,
    name: item.name,
    source_component_id:
      item.sourceComponentId || item.source_component_id || "basic-modal",
    overlay_type: item.overlayType || item.overlay_type || "modal",
    configuration: item.configuration || {},
    schema_version: item.schemaVersion || "1.0.0",
    created_at: item.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

/**
 * Fetches all saved customized overlays with fallback to localStorage.
 */
export async function fetchCustomizedOverlays() {
  const localItems = getLocalCustomizedOverlays();

  if (!supabase) {
    return localItems.sort(
      (a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0)
    );
  }

  try {
    const { data, error } = await supabase
      .from("customized_overlays")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error || !data) {
      return localItems.sort(
        (a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0)
      );
    }

    const normalizedDb = data.map(normalizeFromDb);
    const dbIds = new Set(normalizedDb.map((c) => c.id));
    const merged = [
      ...normalizedDb,
      ...localItems.filter((c) => !dbIds.has(c.id)),
    ];

    return merged.sort(
      (a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0)
    );
  } catch (err) {
    console.warn(
      "Supabase fetch overlays failed, using localStorage fallback:",
      err
    );
    return localItems.sort(
      (a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0)
    );
  }
}

/**
 * Fetches a single customized overlay by ID.
 */
export async function fetchCustomizedOverlay(id) {
  if (!id) return null;

  const localItems = getLocalCustomizedOverlays();
  const localMatch = localItems.find((c) => c.id === id);

  if (!supabase) return localMatch || null;

  try {
    const { data, error } = await supabase
      .from("customized_overlays")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return localMatch || null;
    return normalizeFromDb(data);
  } catch (err) {
    console.warn(
      "Supabase fetch single overlay failed, checking local:",
      err
    );
    return localMatch || null;
  }
}

/**
 * Saves or updates a customized overlay.
 */
export async function saveCustomizedOverlay(overlayData) {
  if (!overlayData) throw new Error("Overlay data is required to save.");

  const now = new Date().toISOString();
  const itemId =
    overlayData.id ||
    `custom-overlay-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 7)}`;

  const itemToSave = {
    ...overlayData,
    id: itemId,
    name: overlayData.name?.trim() || "Untitled Overlay",
    sourceComponentId:
      overlayData.sourceComponentId || "basic-modal",
    overlayType: overlayData.overlayType || "modal",
    configuration: overlayData.configuration || {},
    schemaVersion: "1.0.0",
    createdAt: overlayData.createdAt || now,
    updatedAt: now,
  };

  // Always update localStorage first for instant responsiveness & offline resilience
  const localItems = getLocalCustomizedOverlays();
  const existingIdx = localItems.findIndex((c) => c.id === itemId);
  if (existingIdx >= 0) {
    localItems[existingIdx] = itemToSave;
  } else {
    localItems.unshift(itemToSave);
  }
  setLocalCustomizedOverlays(localItems);

  // If Supabase is available, sync to cloud
  if (supabase) {
    try {
      const dbPayload = normalizeForDb(itemToSave);
      const { data, error } = await supabase
        .from("customized_overlays")
        .upsert(dbPayload, { onConflict: "id" })
        .select()
        .single();

      if (!error && data) {
        return { data: normalizeFromDb(data), source: "supabase" };
      }
    } catch (err) {
      console.warn(
        "Supabase upsert overlay failed, preserved in localStorage:",
        err
      );
    }
  }

  return { data: itemToSave, source: "localStorage" };
}

/**
 * Deletes a customized overlay by ID.
 */
export async function deleteCustomizedOverlay(id) {
  if (!id) return false;

  const localItems = getLocalCustomizedOverlays();
  const filtered = localItems.filter((c) => c.id !== id);
  setLocalCustomizedOverlays(filtered);

  if (supabase) {
    try {
      await supabase.from("customized_overlays").delete().eq("id", id);
    } catch (err) {
      console.warn("Supabase delete overlay failed:", err);
    }
  }

  return true;
}

/**
 * Duplicates an existing customized overlay.
 */
export async function duplicateCustomizedOverlay(id) {
  const original = await fetchCustomizedOverlay(id);
  if (!original) throw new Error("Original overlay not found to duplicate.");

  const duplicated = {
    ...original,
    id: `custom-overlay-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 7)}`,
    name: `${original.name} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return await saveCustomizedOverlay(duplicated);
}

/**
 * Renames a customized overlay.
 */
export async function renameCustomizedOverlay(id, newName) {
  const item = await fetchCustomizedOverlay(id);
  if (!item) throw new Error("Overlay not found to rename.");

  item.name = newName.trim() || "Untitled Overlay";
  return await saveCustomizedOverlay(item);
}
