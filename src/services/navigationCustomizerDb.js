import { supabase } from "@/services/supabase/client";

const LOCAL_STORAGE_KEY = "templatehub_customized_navigation";

function getLocalNavigation() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Could not read customized navigation from localStorage:", err);
    return [];
  }
}

function saveLocalNavigation(items) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.warn("Could not save customized navigation to localStorage:", err);
  }
}

/**
 * Fetches all saved customized navigation configurations.
 */
export async function fetchCustomizedNavigations() {
  const localItems = getLocalNavigation();

  if (!supabase) {
    return localItems;
  }

  try {
    const { data, error } = await supabase
      .from("customized_navigation")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error || !data) {
      return localItems;
    }

    const localMap = new Map(localItems.map((item) => [item.id, item]));
    data.forEach((remote) => {
      const mapped = {
        id: remote.id,
        name: remote.name,
        sourceComponentId: remote.source_component_id || remote.sourceComponentId,
        componentType: remote.component_type || remote.componentType,
        configuration: remote.configuration,
        createdAt: remote.created_at || remote.createdAt,
        updatedAt: remote.updated_at || remote.updatedAt,
      };
      localMap.set(mapped.id, mapped);
    });

    const merged = Array.from(localMap.values());
    merged.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
    saveLocalNavigation(merged);
    return merged;
  } catch (err) {
    console.warn("Error fetching customized navigation from Supabase, using localStorage:", err);
    return localItems;
  }
}

/**
 * Fetches a single customized navigation design by ID.
 */
export async function fetchCustomizedNavigation(id) {
  const localItems = getLocalNavigation();
  const localMatch = localItems.find((item) => item.id === id);

  if (!supabase) {
    return localMatch || null;
  }

  try {
    const { data, error } = await supabase
      .from("customized_navigation")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return localMatch || null;
    }

    return {
      id: data.id,
      name: data.name,
      sourceComponentId: data.source_component_id || data.sourceComponentId,
      componentType: data.component_type || data.componentType,
      configuration: data.configuration,
      createdAt: data.created_at || data.createdAt,
      updatedAt: data.updated_at || data.updatedAt,
    };
  } catch (err) {
    console.warn(`Error fetching customized navigation ${id} from Supabase:`, err);
    return localMatch || null;
  }
}

/**
 * Saves or updates a customized navigation configuration.
 */
export async function saveCustomizedNavigation(payload) {
  const now = new Date().toISOString();
  const record = {
    id: payload.id || `custom-nav-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: payload.name || "Untitled Navigation",
    sourceComponentId: payload.sourceComponentId || "navbar",
    componentType: payload.componentType || "navbar",
    configuration: payload.configuration || payload,
    createdAt: payload.createdAt || now,
    updatedAt: now,
  };

  const localItems = getLocalNavigation();
  const existingIdx = localItems.findIndex((item) => item.id === record.id);
  if (existingIdx >= 0) {
    localItems[existingIdx] = record;
  } else {
    localItems.unshift(record);
  }
  saveLocalNavigation(localItems);

  if (supabase) {
    try {
      await supabase.from("customized_navigation").upsert({
        id: record.id,
        name: record.name,
        source_component_id: record.sourceComponentId,
        component_type: record.componentType,
        configuration: record.configuration,
        created_at: record.createdAt,
        updated_at: record.updatedAt,
      });
    } catch (err) {
      console.warn("Could not sync customized navigation to Supabase (offline-fallback active):", err);
    }
  }

  return record;
}

/**
 * Deletes a customized navigation design by ID.
 */
export async function deleteCustomizedNavigation(id) {
  const localItems = getLocalNavigation();
  const filtered = localItems.filter((item) => item.id !== id);
  saveLocalNavigation(filtered);

  if (supabase) {
    try {
      await supabase.from("customized_navigation").delete().eq("id", id);
    } catch (err) {
      console.warn("Could not delete customized navigation from Supabase:", err);
    }
  }

  return true;
}

/**
 * Duplicates a customized navigation design.
 */
export async function duplicateCustomizedNavigation(id) {
  const original = await fetchCustomizedNavigation(id);
  if (!original) throw new Error("Original navigation design not found");

  const duplicatePayload = {
    name: `${original.name} (Copy)`,
    sourceComponentId: original.sourceComponentId,
    componentType: original.componentType,
    configuration: {
      ...original.configuration,
      name: `${original.name} (Copy)`,
      id: `custom-nav-${Date.now()}`,
    },
  };

  return await saveCustomizedNavigation(duplicatePayload);
}

/**
 * Renames an existing customized navigation design.
 */
export async function renameCustomizedNavigation(id, newName) {
  const existing = await fetchCustomizedNavigation(id);
  if (!existing) throw new Error("Navigation design not found");

  existing.name = newName;
  if (existing.configuration) {
    existing.configuration.name = newName;
  }

  return await saveCustomizedNavigation(existing);
}
