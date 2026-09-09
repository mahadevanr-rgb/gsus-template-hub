import { supabase } from "./client";
import { getAllComponents } from "@/codeRegistry/codeRegistry";

/** Sync all local codeRegistry components to Supabase */
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
