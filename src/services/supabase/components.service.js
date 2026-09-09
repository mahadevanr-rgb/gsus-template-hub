import { supabase } from "./client";
import {
  getAllComponents,
  getComponent,
  getComponentsByCategory,
  searchComponents,
} from "@/codeRegistry/codeRegistry";

/** Fetch all components — Supabase with local fallback */
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
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`);

  if (error || !data?.length) return searchComponents(query);
  return data;
}
