import { supabase } from "@/services/supabase/client";
import { formCompositions } from "@/codeRegistry/formCompositionsRegistry";

export async function fetchFormCompositions() {
  if (!supabase) return formCompositions || [];

  try {
    const { data, error } = await supabase
      .from("form_compositions")
      .select("*")
      .order("name");

    if (error || !data) return formCompositions || [];

    const dbSlugs = new Set((data || []).map((c) => c.slug));
    const localOnly = (formCompositions || []).filter((c) => !dbSlugs.has(c.slug));
    return [...localOnly, ...(data || [])];
  } catch (e) {
    return formCompositions || [];
  }
}

export async function fetchFormComposition(slug) {
  const local = (formCompositions || []).find((c) => c.slug === slug);
  if (local) return local;

  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("form_compositions")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) return null;
    return data;
  } catch (e) {
    return null;
  }
}

export function generateUniqueSlug(name) {
  return (name || 'form').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function saveFormComposition(payload) {
  return { data: payload };
}

export default {
  fetchFormCompositions,
  fetchFormComposition,
  generateUniqueSlug,
  saveFormComposition,
};
