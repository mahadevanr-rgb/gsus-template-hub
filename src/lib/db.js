import { supabase } from "./supabase";
import { getAllComponents, getComponent, getComponentsByCategory, searchComponents } from "../registry/index";
import formCompositions from "../registry/form-compositions";

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

/** Fetch all form compositions — local seeded + Supabase, deduped by slug */
export async function fetchFormCompositions() {
  if (!supabase) return formCompositions;

  const { data, error } = await supabase
    .from("form_compositions")
    .select("*")
    .order("name");

  if (error) return formCompositions;

  const dbSlugs = new Set((data || []).map((c) => c.slug));
  const localOnly = formCompositions.filter((c) => !dbSlugs.has(c.slug));
  return [...localOnly, ...(data || [])];
}

/** Fetch a single form composition by slug — checks local seeded first, then Supabase */
export async function fetchFormComposition(slug) {
  const local = formCompositions.find((c) => c.slug === slug);
  if (local) return local;

  if (!supabase) return null;

  const { data, error } = await supabase
    .from("form_compositions")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data;
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Generate a slug that doesn't collide with any existing composition (local or Supabase) */
export async function generateUniqueSlug(name) {
  const base = slugify(name) || "form";
  const existing = await fetchFormCompositions();
  const slugs = new Set(existing.map((c) => c.slug));

  if (!slugs.has(base)) return base;

  let counter = 2;
  while (slugs.has(`${base}-${counter}`)) counter++;
  return `${base}-${counter}`;
}

/** Save a new form composition. Requires Supabase — no silent local fallback for writes. */
export async function saveFormComposition(payload) {
  if (!supabase) {
    return {
      error:
        "Saving requires Supabase to be configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.",
    };
  }

  const record = {
    id: payload.id,
    name: payload.name,
    slug: payload.slug,
    category: payload.category,
    version: payload.version,
    description: payload.description,
    overview: payload.overview,
    fields: payload.fields,
    action: payload.action,
    dependencies: payload.dependencies,
    tags: payload.tags,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("form_compositions")
    .upsert(record, { onConflict: "slug" })
    .select()
    .single();

  if (error) return { error: error.message };
  return { data };
}

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
