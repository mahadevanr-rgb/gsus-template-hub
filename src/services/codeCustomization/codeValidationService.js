export function validateSource(files) {
  if (!Array.isArray(files) || !files.length || files.some((file) => !file.path || typeof file.content !== "string")) return { valid: false, error: "One or more source files are missing a path or content." };
  const source = files.map((file) => file.content).join("\n");
  if (!source.trim()) return { valid: false, error: "Source code is empty." };
  // Restrict TypeScript checks to declaration syntax. Plain JSX copy such as
  // "interface building blocks" must not be mistaken for a TS interface.
  if (/(?:^|\n)\s*(?:export\s+)?(?:interface\s+\w+|type\s+\w+\s*=|enum\s+\w+)/.test(source) || /\b(?:useState|useMemo|useCallback|useRef)<[A-Z]?[a-zA-Z0-9_,\s|&<>]*>/.test(source)) return { valid: false, error: "TypeScript is not supported by the standalone JSX preview. Use JavaScript JSX." };
  return { valid: true };
}
