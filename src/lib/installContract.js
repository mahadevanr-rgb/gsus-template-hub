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

/** Copy text to clipboard, returns a promise */
export async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
}
