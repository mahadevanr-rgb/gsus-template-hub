/**
 * Database abstraction layer
 *
 * All Supabase queries live here. The rest of the app imports from this
 * module only — never from supabase.js directly. This makes it easy to
 * swap the backend later without touching any UI code.
 *
 * When Supabase is not configured the functions fall back to the local
 * static registry so the app always works offline / in dev.
 */

import { supabase } from "./supabase";
import { getAllComponents, getComponent, getComponentsByCategory, searchComponents } from "../registry/index";

/** Fetch all components — DB first, local registry fallback */
export async function fetchAllComponents() {
  if (!supabase) return getAllComponents();

  const { data, error } = await supabase
    .from("components")
    .select("*")
    .order("category")
    .order("name");

  if (error || !data?.length) return getAllComponents();
  return data;
}

/** Fetch a single component by slug */
export async function fetchComponent(slug) {
  if (!supabase) return getComponent(slug);

  const { data, error } = await supabase
    .from("components")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return getComponent(slug);
  return data;
}

/** Fetch components by category */
export async function fetchComponentsByCategory(category) {
  if (!supabase) return getComponentsByCategory(category);

  const { data, error } = await supabase
    .from("components")
    .select("*")
    .eq("category", category)
    .order("name");

  if (error || !data?.length) return getComponentsByCategory(category);
  return data;
}

/** Search components */
export async function fetchSearchResults(query) {
  if (!supabase) return searchComponents(query);

  const { data, error } = await supabase
    .from("components")
    .select("*")
    .or(
      `name.ilike.%${query}%,description.ilike.%${query}%`
    );

  if (error || !data?.length) return searchComponents(query);
  return data;
}

/**
 * Sync local registry to Supabase.
 * Run this once from a setup script or admin panel to seed the DB.
 * Uses upsert so it's safe to run multiple times.
 */
export async function syncRegistryToSupabase() {
  if (!supabase) {
    console.warn("[TemplateHub] Supabase not configured — skipping sync.");
    return { error: "Supabase not configured" };
  }

  const components = getAllComponents().map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    category: c.category,
    description: c.description,
    framework: c.framework,
    language: c.language,
    styling: c.styling,
    version: c.version,
    dependencies: c.dependencies,
    tags: c.tags,
    author: c.author,
    files: c.files,
    uses: c.uses,
    created_at: c.createdAt,
    updated_at: c.updatedAt,
  }));

  const { error } = await supabase
    .from("components")
    .upsert(components, { onConflict: "slug" });

  if (error) {
    console.error("[TemplateHub] Sync failed:", error.message);
    return { error };
  }

  console.log(`[TemplateHub] Synced ${components.length} components to Supabase.`);
  return { count: components.length };
}
