import { supabase } from "@/services/supabase/client";

const LOCAL_STORAGE_KEY = "templatehub-customized-file-systems";

/**
 * Safely retrieves customized file systems from localStorage.
 */
function getLocalCustomizedFileSystems() {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("Failed to load customized file systems from localStorage", err);
    return [];
  }
}

/**
 * Saves customized file systems array to localStorage.
 */
function setLocalCustomizedFileSystems(items) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.warn("Failed to write customized file systems to localStorage", err);
  }
}

/**
 * Normalizes DB row from snake_case to camelCase
 */
function normalizeFromDb(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name || "Untitled File System",
    sourceComponentId: row.source_component_id || row.sourceComponentId || "basic-file-upload",
    configuration: row.configuration || {},
    schemaVersion: row.schema_version || row.schemaVersion || "1.0.0",
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
    updatedAt: row.updated_at || row.updatedAt || new Date().toISOString(),
  };
}

/**
 * Normalizes item to snake_case for Supabase
 */
function normalizeForDb(item) {
  return {
    id: item.id,
    name: item.name,
    source_component_id: item.sourceComponentId || item.source_component_id,
    configuration: item.configuration || {},
    schema_version: item.schemaVersion || "1.0.0",
    created_at: item.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

/**
 * Fetches all saved customized file systems with fallback to localStorage.
 */
export async function fetchCustomizedFileSystems() {
  const localItems = getLocalCustomizedFileSystems();

  if (!supabase) {
    return localItems.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
  }

  try {
    const { data, error } = await supabase
      .from("customized_file_systems")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error || !data) {
      return localItems.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
    }

    const normalizedDb = data.map(normalizeFromDb);
    const dbIds = new Set(normalizedDb.map((c) => c.id));
    const merged = [
      ...normalizedDb,
      ...localItems.filter((c) => !dbIds.has(c.id)),
    ];

    return merged.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
  } catch (err) {
    console.warn("Supabase fetch failed, using localStorage fallback:", err);
    return localItems.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
  }
}

/**
 * Fetches a single customized file system by ID.
 */
export async function fetchCustomizedFileSystem(id) {
  if (!id) return null;

  const localItems = getLocalCustomizedFileSystems();
  const localMatch = localItems.find((c) => c.id === id);

  if (!supabase) {
    return localMatch || null;
  }

  try {
    const { data, error } = await supabase
      .from("customized_file_systems")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return localMatch || null;
    }

    return normalizeFromDb(data);
  } catch (err) {
    console.warn("Supabase fetch single file system failed, checking local:", err);
    return localMatch || null;
  }
}

/**
 * Saves or updates a customized file system design.
 */
export async function saveCustomizedFileSystem(itemData) {
  if (!itemData) throw new Error("File system design data is required to save.");

  const now = new Date().toISOString();
  const itemId = itemData.id || `custom-fs-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  const itemToSave = {
    ...itemData,
    id: itemId,
    name: itemData.name?.trim() || "Untitled File System",
    sourceComponentId: itemData.sourceComponentId || "basic-file-upload",
    configuration: itemData.configuration || itemData,
    schemaVersion: itemData.schemaVersion || "1.0.0",
    createdAt: itemData.createdAt || now,
    updatedAt: now,
  };

  // Always update localStorage first for instant responsiveness & offline resilience
  const localItems = getLocalCustomizedFileSystems();
  const existingIdx = localItems.findIndex((c) => c.id === itemId);
  if (existingIdx >= 0) {
    localItems[existingIdx] = itemToSave;
  } else {
    localItems.unshift(itemToSave);
  }
  setLocalCustomizedFileSystems(localItems);

  // If Supabase is available, sync to cloud
  if (supabase) {
    try {
      const dbPayload = normalizeForDb(itemToSave);
      const { data, error } = await supabase
        .from("customized_file_systems")
        .upsert(dbPayload, { onConflict: "id" })
        .select()
        .single();

      if (!error && data) {
        return { data: normalizeFromDb(data), source: "supabase" };
      }
    } catch (err) {
      console.warn("Supabase upsert failed, preserved in localStorage:", err);
    }
  }

  return { data: itemToSave, source: "localStorage" };
}

/**
 * Deletes a customized file system by ID.
 */
export async function deleteCustomizedFileSystem(id) {
  if (!id) return false;

  const localItems = getLocalCustomizedFileSystems();
  const filtered = localItems.filter((c) => c.id !== id);
  setLocalCustomizedFileSystems(filtered);

  if (supabase) {
    try {
      await supabase.from("customized_file_systems").delete().eq("id", id);
    } catch (err) {
      console.warn("Supabase delete failed:", err);
    }
  }

  return true;
}

/**
 * Duplicates an existing customized file system.
 */
export async function duplicateCustomizedFileSystem(id) {
  const original = await fetchCustomizedFileSystem(id);
  if (!original) throw new Error("Original file system design not found to duplicate.");

  const duplicated = {
    ...original,
    id: `custom-fs-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: `${original.name} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return await saveCustomizedFileSystem(duplicated);
}

/**
 * Renames a customized file system.
 */
export async function renameCustomizedFileSystem(id, newName) {
  const item = await fetchCustomizedFileSystem(id);
  if (!item) throw new Error("File system design not found to rename.");

  item.name = newName.trim() || "Untitled File System";
  return await saveCustomizedFileSystem(item);
}
