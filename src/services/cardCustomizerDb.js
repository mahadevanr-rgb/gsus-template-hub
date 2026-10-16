import { supabase } from "@/services/supabase/client";

const LOCAL_STORAGE_KEY = "templatehub-customized-cards";

/**
 * Safely retrieves customized cards from localStorage.
 */
function getLocalCustomizedCards() {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("Failed to load customized cards from localStorage", err);
    return [];
  }
}

/**
 * Saves customized cards array to localStorage.
 */
function setLocalCustomizedCards(cards) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cards));
  } catch (err) {
    console.warn("Failed to write customized cards to localStorage", err);
  }
}

/**
 * Normalizes DB row from snake_case to camelCase
 */
function normalizeFromDb(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name || "Untitled Card",
    sourceCardId: row.source_card_id || row.sourceCardId || "profile-card",
    customization: row.customization || {},
    content: row.content || {},
    responsiveSettings: row.responsive_settings || row.responsiveSettings || {},
    schemaVersion: row.schema_version || row.schemaVersion || "1.0.0",
    createdAt: row.created_at || row.createdAt || new Date().toISOString(),
    updatedAt: row.updated_at || row.updatedAt || new Date().toISOString(),
  };
}

/**
 * Normalizes card to snake_case for Supabase
 */
function normalizeForDb(card) {
  return {
    id: card.id,
    name: card.name,
    source_card_id: card.sourceCardId || card.source_card_id,
    customization: card.customization || {},
    content: card.content || {},
    responsive_settings: card.responsiveSettings || card.responsive_settings || {},
    schema_version: card.schemaVersion || "1.0.0",
    created_at: card.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

/**
 * Fetches all saved customized cards with fallback to localStorage.
 */
export async function fetchCustomizedCards() {
  const localCards = getLocalCustomizedCards();

  if (!supabase) {
    return localCards.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
  }

  try {
    const { data, error } = await supabase
      .from("customized_cards")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error || !data) {
      return localCards.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
    }

    const normalizedDb = data.map(normalizeFromDb);
    const dbIds = new Set(normalizedDb.map((c) => c.id));
    const merged = [
      ...normalizedDb,
      ...localCards.filter((c) => !dbIds.has(c.id)),
    ];

    return merged.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
  } catch (err) {
    console.warn("Supabase fetch failed, using localStorage fallback:", err);
    return localCards.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
  }
}

/**
 * Fetches a single customized card by ID.
 */
export async function fetchCustomizedCard(id) {
  if (!id) return null;

  const localCards = getLocalCustomizedCards();
  const localMatch = localCards.find((c) => c.id === id);

  if (!supabase) {
    return localMatch || null;
  }

  try {
    const { data, error } = await supabase
      .from("customized_cards")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return localMatch || null;
    }

    return normalizeFromDb(data);
  } catch (err) {
    console.warn("Supabase fetch single card failed, checking local:", err);
    return localMatch || null;
  }
}

/**
 * Saves or updates a customized card.
 */
export async function saveCustomizedCard(cardData) {
  if (!cardData) throw new Error("Card data is required to save.");

  const now = new Date().toISOString();
  const cardId = cardData.id || `custom-card-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  const cardToSave = {
    ...cardData,
    id: cardId,
    name: cardData.name?.trim() || "Untitled Card",
    sourceCardId: cardData.sourceCardId || "profile-card",
    customization: cardData.customization || {},
    content: cardData.content || {},
    responsiveSettings: cardData.responsiveSettings || {},
    schemaVersion: "1.0.0",
    createdAt: cardData.createdAt || now,
    updatedAt: now,
  };

  // Always update localStorage first for instant responsiveness & offline resilience
  const localCards = getLocalCustomizedCards();
  const existingIdx = localCards.findIndex((c) => c.id === cardId);
  if (existingIdx >= 0) {
    localCards[existingIdx] = cardToSave;
  } else {
    localCards.unshift(cardToSave);
  }
  setLocalCustomizedCards(localCards);

  // If Supabase is available, sync to cloud
  if (supabase) {
    try {
      const dbPayload = normalizeForDb(cardToSave);
      const { data, error } = await supabase
        .from("customized_cards")
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

  return { data: cardToSave, source: "localStorage" };
}

/**
 * Deletes a customized card by ID.
 */
export async function deleteCustomizedCard(id) {
  if (!id) return false;

  // Remove from localStorage
  const localCards = getLocalCustomizedCards();
  const filtered = localCards.filter((c) => c.id !== id);
  setLocalCustomizedCards(filtered);

  if (supabase) {
    try {
      await supabase.from("customized_cards").delete().eq("id", id);
    } catch (err) {
      console.warn("Supabase delete failed:", err);
    }
  }

  return true;
}

/**
 * Duplicates an existing customized card.
 */
export async function duplicateCustomizedCard(id) {
  const original = await fetchCustomizedCard(id);
  if (!original) throw new Error("Original card not found to duplicate.");

  const duplicated = {
    ...original,
    id: `custom-card-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: `${original.name} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return await saveCustomizedCard(duplicated);
}

/**
 * Renames a customized card.
 */
export async function renameCustomizedCard(id, newName) {
  const card = await fetchCustomizedCard(id);
  if (!card) throw new Error("Card not found to rename.");

  card.name = newName.trim() || "Untitled Card";
  return await saveCustomizedCard(card);
}
