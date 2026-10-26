import { supabase } from "@/services/supabase/client";

const LOCAL_STORAGE_KEY = "templatehub-customized-accordions";

/**
 * Safely retrieves customized accordions from localStorage.
 */
function getLocalCustomizedAccordions() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("Failed to load customized accordions from localStorage", err);
    return [];
  }
}

/**
 * Saves customized accordions array to localStorage.
 */
function setLocalCustomizedAccordions(items) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.warn("Failed to write customized accordions to localStorage", err);
  }
}

/**
 * Normalizes DB row from snake_case to camelCase.
 */
function normalizeFromDb(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name || "Untitled Accordion",
    sourceComponentId:
      row.source_component_id || row.sourceComponentId || "numbered-accordion",
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
      item.sourceComponentId || item.source_component_id,
    configuration: item.configuration || {},
    schema_version: item.schemaVersion || "1.0.0",
    created_at: item.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

/**
 * Fetches all saved customized accordions with fallback to localStorage.
 */
export async function fetchCustomizedAccordions() {
  const localItems = getLocalCustomizedAccordions();

  if (!supabase) {
    return localItems.sort(
      (a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0)
    );
  }

  try {
    const { data, error } = await supabase
      .from("customized_accordions")
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
      "Supabase fetch accordions failed, using localStorage fallback:",
      err
    );
    return localItems.sort(
      (a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0)
    );
  }
}

/**
 * Fetches a single customized accordion by ID.
 */
export async function fetchCustomizedAccordion(id) {
  if (!id) return null;

  const localItems = getLocalCustomizedAccordions();
  const localMatch = localItems.find((c) => c.id === id);

  if (!supabase) return localMatch || null;

  try {
    const { data, error } = await supabase
      .from("customized_accordions")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return localMatch || null;
    return normalizeFromDb(data);
  } catch (err) {
    console.warn(
      "Supabase fetch single accordion failed, checking local:",
      err
    );
    return localMatch || null;
  }
}

/**
 * Saves or updates a customized accordion.
 */
export async function saveCustomizedAccordion(accordionData) {
  if (!accordionData) throw new Error("Accordion data is required to save.");

  const now = new Date().toISOString();
  const itemId =
    accordionData.id ||
    `custom-accordion-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 7)}`;

  const itemToSave = {
    ...accordionData,
    id: itemId,
    name: accordionData.name?.trim() || "Untitled Accordion",
    sourceComponentId:
      accordionData.sourceComponentId || "numbered-accordion",
    configuration: accordionData.configuration || {},
    schemaVersion: "1.0.0",
    createdAt: accordionData.createdAt || now,
    updatedAt: now,
  };

  // Always update localStorage first for instant responsiveness & offline resilience
  const localItems = getLocalCustomizedAccordions();
  const existingIdx = localItems.findIndex((c) => c.id === itemId);
  if (existingIdx >= 0) {
    localItems[existingIdx] = itemToSave;
  } else {
    localItems.unshift(itemToSave);
  }
  setLocalCustomizedAccordions(localItems);

  // If Supabase is available, sync to cloud
  if (supabase) {
    try {
      const dbPayload = normalizeForDb(itemToSave);
      const { data, error } = await supabase
        .from("customized_accordions")
        .upsert(dbPayload, { onConflict: "id" })
        .select()
        .single();

      if (!error && data) {
        return { data: normalizeFromDb(data), source: "supabase" };
      }
    } catch (err) {
      console.warn(
        "Supabase upsert accordion failed, preserved in localStorage:",
        err
      );
    }
  }

  return { data: itemToSave, source: "localStorage" };
}

/**
 * Deletes a customized accordion by ID.
 */
export async function deleteCustomizedAccordion(id) {
  if (!id) return false;

  const localItems = getLocalCustomizedAccordions();
  const filtered = localItems.filter((c) => c.id !== id);
  setLocalCustomizedAccordions(filtered);

  if (supabase) {
    try {
      await supabase.from("customized_accordions").delete().eq("id", id);
    } catch (err) {
      console.warn("Supabase delete accordion failed:", err);
    }
  }

  return true;
}

/**
 * Duplicates an existing customized accordion.
 */
export async function duplicateCustomizedAccordion(id) {
  const original = await fetchCustomizedAccordion(id);
  if (!original) throw new Error("Original accordion not found to duplicate.");

  const duplicated = {
    ...original,
    id: `custom-accordion-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 7)}`,
    name: `${original.name} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return await saveCustomizedAccordion(duplicated);
}

/**
 * Renames a customized accordion.
 */
export async function renameCustomizedAccordion(id, newName) {
  const item = await fetchCustomizedAccordion(id);
  if (!item) throw new Error("Accordion not found to rename.");

  item.name = newName.trim() || "Untitled Accordion";
  return await saveCustomizedAccordion(item);
}
