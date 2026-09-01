/**
 * Installation Contract
 *
 * This module defines the interface between the TemplateHub registry
 * and any installation mechanism (CLI, VS Code extension, etc.).
 *
 * Future CLI usage:
 *   npx templatehub add <slug>
 */

/** Returns the CLI install command string for a component */
export function getInstallCommand(slug) {
  return `npx templatehub add ${slug}`;
}

/**
 * Installation manifest — everything a CLI needs to install a component.
 * Shape is stable so the CLI / VS Code extension can depend on it.
 */
export function getInstallManifest(component) {
  return {
    slug: component.slug,
    version: component.version,
    framework: component.framework,
    language: component.language,
    styling: component.styling,
    dependencies: component.dependencies,
    files: component.files,
    installCommand: getInstallCommand(component.slug),
  };
}

/** Returns the target directory for installing a component */
export function getComponentInstallDir(component) {
  if (component?.files?.[0]?.path) {
    const parts = component.files[0].path.split("/");
    parts.pop();
    return parts.join("/");
  }
  if (component?.category === "cards") {
    return "components/ui/cards";
  }
  return "components/ui";
}

/** Returns the component filename */
export function getComponentFileName(component) {
  if (component?.files?.[0]?.path) {
    return component.files[0].path.split("/").pop();
  }
  if (component?.slug) {
    return component.slug
      .split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join("") + ".jsx";
  }
  return "Component.jsx";
}

/** Returns full relative output path (e.g. components/ui/cards/ProfileCard.jsx) */
export function getComponentOutputPath(component) {
  const dir = getComponentInstallDir(component);
  const file = getComponentFileName(component);
  return `${dir}/${file}`;
}

/** Returns import snippet for the component */
export function getComponentImportSnippet(component) {
  const outputPath = getComponentOutputPath(component);
  const compName = getComponentFileName(component).replace(/\.jsx?$/, "");
  return `import ${compName} from "./${outputPath}";`;
}

/** Copy text to clipboard, returns a promise */
export async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
}

