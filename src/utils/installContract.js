/**
 * Stable install manifest helpers shared by the UI and future CLI integrations.
 */
export function getInstallCommand(slug) {
  return "npx templatehub add " + slug;
}

export function serializeJSXAttributes(props = {}) {
  return Object.entries(props)
    .filter(([, value]) => value !== undefined)
    .map(([name, value]) =>
      value === true ? name : `${name}={${JSON.stringify(value)}}`,
    )
    .join(" ");
}

const componentKey = (component) => component?.slug || component?.id;
const normalizedKey = (value) => String(value || "").replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const hasInstallableSource = (component) => Boolean(
  (Array.isArray(component?.files) && component.files.length) || component?.sourceCode || component?.code,
);
const safeRelativePath = (path) => {
  const original = String(path || "");
  if (original.startsWith("/") || /^[a-zA-Z]:/.test(original)) {
    throw new Error("Registry contains an unsafe installation path.");
  }
  const normalized = original.replace(/\\/g, "/");
  if (normalized.startsWith("/") || /^[a-zA-Z]:/.test(normalized)) {
    throw new Error("Registry contains an unsafe installation path.");
  }
  const parts = normalized.split("/").filter((part) => part && part !== ".");
  if (!parts.length || parts.some((part) => part === "..")) {
    throw new Error("Registry contains an unsafe installation path.");
  }
  return parts.join("/");
};

/**
 * Resolve the component's internal registry dependencies and npm packages.
 * Legacy Form Composition dependencies are matched to registry slugs when
 * possible; unmatched values remain external package names.
 */
export function resolveInstallPlan(component, registryComponents = []) {
  if (!component) throw new Error("No component was provided for installation.");
  const registry = new Map();
  registryComponents.forEach((item) => {
    for (const key of [item.slug, item.id, item.name, normalizedKey(item.name)]) {
      if (key) registry.set(String(key).toLowerCase(), item);
    }
  });

  const rootKey = componentKey(component);
  const registeredRoot = registry.get(String(rootKey || "").toLowerCase()) ||
    registry.get(normalizedKey(rootKey)) ||
    registry.get(normalizedKey(component.name));
  const root = registeredRoot
    ? {
      ...registeredRoot,
      ...component,
      sourceCode: component.customizedSource ? component.sourceCode : (registeredRoot.sourceCode || component.sourceCode),
      code: registeredRoot.code || component.code,
      files: component.customizedSource ? component.files : (registeredRoot.files?.length ? registeredRoot.files : component.files),
      dependencies: registeredRoot.dependencies?.length ? registeredRoot.dependencies : component.dependencies,
      componentDependencies: registeredRoot.componentDependencies || registeredRoot.component_dependencies || component.componentDependencies,
      installProps: {
        ...(registeredRoot.installProps || {}),
        ...(component.installProps || {}),
      },
    }
    : component;
  const rootIdentity = componentKey(root);
  const files = new Map();
  const packages = new Set();
  const resolvedComponents = [];
  const visiting = new Set();
  const visited = new Set();

  const visit = (item) => {
    const key = String(componentKey(item) || item.name || "component");
    if (visited.has(key)) return;
    if (visiting.has(key)) throw new Error("Circular component dependency found at " + key + ".");
    visiting.add(key);

    const explicitInternal = Array.isArray(item.componentDependencies)
      ? item.componentDependencies
      : Array.isArray(item.component_dependencies) ? item.component_dependencies : [];
    const declared = Array.isArray(item.dependencies) ? item.dependencies : [];
    explicitInternal.forEach((dependency) => {
      const match = registry.get(String(dependency).toLowerCase()) || registry.get(normalizedKey(dependency));
      if (!match) throw new Error("Internal component dependency not found in registry: " + dependency);
      if (!hasInstallableSource(match)) {
        throw new Error("Internal component source is not available for installation: " + dependency);
      }
      visit(match);
    });
    declared.forEach((dependency) => {
      const match = registry.get(String(dependency).toLowerCase()) || registry.get(normalizedKey(dependency));
      if (match && hasInstallableSource(match)) visit(match);
      else if (!match && dependency !== "None") packages.add(dependency);
    });

    const componentFiles = Array.isArray(item.files) ? item.files : [];
    if (componentFiles.length) {
      componentFiles.forEach((file, index) => {
        const content = file.content ?? file.source ?? (index === 0 ? item.sourceCode || item.code : undefined);
        if (content === undefined) {
          throw new Error("Source content is missing for " + (file.path || componentKey(item)) + ".");
        }
        const path = safeRelativePath(file.path);
        const existing = files.get(path);
        if (existing && existing.content !== content) {
          throw new Error("Two components provide different source for " + path + ".");
        }
        files.set(path, { path, content, type: file.type || "component" });
      });
    } else if (item.sourceCode || item.code) {
      const path = safeRelativePath(item.filePath || (componentKey(item) || "Component") + ".jsx");
      files.set(path, { path, content: item.sourceCode || item.code, type: "component" });
    } else {
      throw new Error("No installable source files are registered for " + (item.name || key) + ".");
    }

    visiting.delete(key);
    visited.add(key);
    resolvedComponents.push(key);
  };

  visit(root);
  const installProps = root.installProps || {};
  const exportName = root.exportName || root.installName || root.name?.replace(/[^a-zA-Z0-9]/g, "");
  const namedExport = root.namedExport ?? Boolean(root.exportName);
  // Package customized options as an entry component. The reusable source stays
  // generic; consumers can use <Component /> and still get their chosen setup.
  if (Object.keys(installProps).some((key) => installProps[key] !== undefined)) {
    const rootSourcePath = (Array.isArray(root.files) ? root.files : [])
      .map((file) => file.path || file.name)
      .find((path) => path && /\.(jsx|tsx)$/i.test(path));
    const sourcePath = rootSourcePath
      ? safeRelativePath(rootSourcePath)
      : Array.from(files.keys()).find((path) => path.endsWith(".jsx") || path.endsWith(".tsx"));
    if (!sourcePath || !exportName) {
      throw new Error("Cannot create the configured component entry point: source file or export name is missing.");
    }
    const directory = sourcePath.includes("/") ? sourcePath.slice(0, sourcePath.lastIndexOf("/") + 1) : "";
    const sourceBase = sourcePath.slice(sourcePath.lastIndexOf("/") + 1).replace(/\.(jsx|tsx)$/i, "");
    const entryPath = `${directory}${exportName}.configured.jsx`;
    const defaults = JSON.stringify(installProps, null, 2).replace(/^/gm, "  ");
    const importLine = namedExport
      ? `import { ${exportName} as BaseComponent } from "./${sourceBase}";`
      : `import BaseComponent from "./${sourceBase}";`;
    const hasRangeState = ["date-range-picker", "datetime-range-picker"].includes(normalizedKey(rootIdentity));
    const wrapper = hasRangeState
      ? `import { useState } from "react";\n${importLine}\n\nconst customizedDefaults = ${defaults};\n\nexport function ${exportName}(props) {\n  const controlled = props.value !== undefined && typeof props.onChange === "function";\n  const [internalValue, setInternalValue] = useState(() => props.value || { start: "", end: "" });\n  const value = controlled ? props.value : internalValue;\n  const handleChange = (nextValue) => {\n    if (!controlled) setInternalValue(nextValue);\n    props.onChange?.(nextValue);\n  };\n  return (\n    <>\n      <style>{\`.picker-accent-field:hover, .picker-accent-field:focus, .date-time-picker-field:hover, .date-time-picker-field:focus { border-color: var(--picker-accent, #4f46e5) !important; }\n        .picker-accent-field:focus, .date-time-picker-field:focus { outline: none; box-shadow: 0 0 0 4px color-mix(in srgb, var(--picker-accent, #4f46e5) 16%, transparent) !important; }\`}</style>\n      <BaseComponent {...customizedDefaults} {...props} value={value} onChange={handleChange} />\n    </>\n  );\n}\n\nexport default ${exportName};\n`
      : `${importLine}\n\nconst customizedDefaults = ${defaults};\n\nexport function ${exportName}(props) {\n  return <BaseComponent {...customizedDefaults} {...props} />;\n}\n\nexport default ${exportName};\n`;
    files.set(entryPath, { path: entryPath, content: wrapper, type: "component-entry" });
  }
  return {
    component: rootIdentity,
    files: Array.from(files.values()),
    componentDependencies: resolvedComponents.filter((key) => key !== String(rootIdentity)),
    externalDependencies: Array.from(packages),
    installProps,
    exportName,
    namedExport,
  };
}

/**
 * Additive extension of the existing CLI/VS Code manifest.
 * The original keys remain available to existing consumers.
 */
export function getInstallManifest(component, registryComponents = []) {
  const plan = resolveInstallPlan(component, registryComponents);
  return {
    slug: component.slug,
    version: component.version,
    framework: component.framework,
    language: component.language,
    styling: component.styling,
    dependencies: component.dependencies,
    files: plan.files,
    installCommand: getInstallCommand(component.slug),
    componentDependencies: plan.componentDependencies,
    externalDependencies: plan.externalDependencies,
    installProps: plan.installProps,
    exportName: plan.exportName,
    namedExport: plan.namedExport,
  };
}

export async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
}
