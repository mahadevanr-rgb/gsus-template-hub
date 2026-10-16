export function normalizeSourceFiles(component) {
  const files = (component?.files || [])
    .filter((file) => file && (file.content != null || file.source != null))
    .map((file, index) => ({
      ...file,
      path: file.path || file.name || `Component${index + 1}.jsx`,
      content: String(file.content ?? file.source),
    }));
  if (!files.length && component?.sourceCode)
    files.push({
      path: component.filePath || `${component.slug || "Component"}.jsx`,
      type: "component",
      content: component.sourceCode,
    });
  return files;
}
export const draftKey = (component) =>
  `templatehub:code-draft:${component?.draftStorageKey || component?.slug || component?.id || "unknown"}`;
const sourceSignature = (files) =>
  JSON.stringify(files.map(({ path, content }) => [path, content]));
export function readDraft(component, originals) {
  try {
    const parsed = JSON.parse(localStorage.getItem(draftKey(component)));
    // A draft from an older registry version can contain stale picker logic.
    // Keep edits only when they were made against this exact source snapshot.
    return parsed?.version === 1 &&
      parsed.signature === sourceSignature(originals) &&
      Array.isArray(parsed.files) &&
      parsed.files.length === originals.length
      ? parsed.files
      : originals;
  } catch {
    return originals;
  }
}
export function writeDraft(component, files) {
  try {
    const originals = normalizeSourceFiles(component);
    localStorage.setItem(
      draftKey(component),
      JSON.stringify({ version: 1, signature: sourceSignature(originals), files }),
    );
  } catch {
    /* quota or storage policy */
  }
}

export function createCustomizedComponent(component, files, installProps = {}) {
  const normalizedFiles = files.map((file) => ({
    ...file,
    content: String(file.content ?? file.source ?? ""),
  }));

  const primary = normalizedFiles[0];

  return {
    ...component,
    customizedSource: true,
    installProps: {
      ...(component.installProps || {}),
      ...installProps,
    },
    files: normalizedFiles,
    sourceCode: primary?.content || component.sourceCode || "",
  };
}
