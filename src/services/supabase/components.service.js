import { supabase } from "./client";
import {
  getAllComponents,
  getComponent,
  getComponentsByCategory,
  searchComponents,
} from "@/codeRegistry/codeRegistry";

function mergeRegistryMetadata(local, remote = {}) {
  const localFiles = Array.isArray(local?.files) ? local.files : [];
  const remoteFiles = Array.isArray(remote.files) ? remote.files : [];
  // Supabase can contain an older snapshot of a built-in component. Keep its
  // additional files/metadata, but let the current local registry win whenever
  // both sources provide the same path so installs cannot ship stale behavior.
  const filesByPath = new Map(remoteFiles.map((file) => [file.path, file]));
  localFiles.forEach((file) => {
    const localName = String(file.path || "").replace(/\\/g, "/").split("/").pop()?.toLowerCase();
    const remoteMatch = filesByPath.get(file.path) || [...filesByPath.values()].find((candidate) =>
      String(candidate.path || "").replace(/\\/g, "/").split("/").pop()?.toLowerCase() === localName,
    );
    const remoteFile = remoteMatch || {};
    if (remoteMatch?.path && remoteMatch.path !== file.path) filesByPath.delete(remoteMatch.path);
    filesByPath.set(file.path, {
      ...remoteFile,
      ...file,
      content: file.content ?? remoteFile.content,
    });
  });
  const remoteComponentDependencies = remote.component_dependencies ?? remote.componentDependencies;
  const componentDependencies = remoteComponentDependencies?.length
    ? remoteComponentDependencies
    : local?.componentDependencies || remoteComponentDependencies || [];
  return {
    ...local,
    ...remote,
    sourceCode: local?.sourceCode || remote.sourceCode,
    files: Array.from(filesByPath.values()),
    dependencies: remote.dependencies?.length ? remote.dependencies : local?.dependencies || remote.dependencies || [],
    componentDependencies,
  };
}

/** Fetch all components — Supabase with local fallback */
export async function fetchAllComponents() {
  const localComponents = getAllComponents();
  if (!supabase) return localComponents;

  const { data, error } = await supabase
    .from("components")
    .select("*")
    .order("category")
    .order("name");

  if (error || !data?.length) return localComponents;
  const localBySlug = new Map(localComponents.map((component) => [component.slug, component]));
  const merged = data.map((component) => mergeRegistryMetadata(localBySlug.get(component.slug), component));
  const databaseSlugs = new Set(data.map((component) => component.slug));
  return [...merged, ...localComponents.filter((component) => !databaseSlugs.has(component.slug))];
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
  return mergeRegistryMetadata(getComponent(slug), data);
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
