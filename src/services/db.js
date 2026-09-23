import { supabase } from "@/services/supabase/client";
import { formCompositions } from "@/codeRegistry/formCompositionsRegistry";

const LOCAL_COMPOSITIONS_KEY = "templatehub-form-compositions";

function getLocalCompositions() {
  if (typeof window === "undefined") return [];

  try {
    const saved = JSON.parse(window.localStorage.getItem(LOCAL_COMPOSITIONS_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveLocalComposition(payload) {
  const compositions = getLocalCompositions();
  const index = compositions.findIndex((item) => item.slug === payload.slug);

  if (index >= 0) compositions[index] = payload;
  else compositions.push(payload);

  window.localStorage.setItem(LOCAL_COMPOSITIONS_KEY, JSON.stringify(compositions));
  return payload;
}

export async function fetchFormCompositions() {
  const localSaved = getLocalCompositions();
  if (!supabase) return [...(formCompositions || []), ...localSaved];

  try {
    const { data, error } = await supabase
      .from("form_compositions")
      .select("*")
      .order("name");

    if (error || !data) return [...(formCompositions || []), ...localSaved];

    const dbSlugs = new Set((data || []).map((c) => c.slug));
    const nonDatabase = [...(formCompositions || []), ...localSaved].filter(
      (c) => !dbSlugs.has(c.slug),
    );
    return [...nonDatabase, ...(data || [])];
  } catch {
    return [...(formCompositions || []), ...localSaved];
  }
}

export async function fetchFormComposition(slug) {
  const local = (formCompositions || []).find((c) => c.slug === slug);
  if (local) return local;

  const locallySaved = getLocalCompositions().find((c) => c.slug === slug);
  if (locallySaved) return locallySaved;

  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("form_compositions")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

export function generateUniqueSlug(name) {
  const base = (name || "form").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "form";
  const existingSlugs = new Set([
    ...(formCompositions || []).map((composition) => composition.slug),
    ...getLocalCompositions().map((composition) => composition.slug),
  ]);

  if (!existingSlugs.has(base)) return base;
  let suffix = 2;
  while (existingSlugs.has(`${base}-${suffix}`)) suffix += 1;
  return `${base}-${suffix}`;
}

export async function saveFormComposition(payload) {
  if (!supabase) return { data: saveLocalComposition(payload), source: "local" };

  const { data, error } = await supabase
    .from("form_compositions")
    .upsert(payload, { onConflict: "slug" })
    .select()
    .single();

  // Keep the builder useful offline or when the database policy rejects writes.
  if (error) return { data: saveLocalComposition(payload), source: "local" };
  return { data };
}

export default {
  fetchFormCompositions,
  fetchFormComposition,
  generateUniqueSlug,
  saveFormComposition,
};
