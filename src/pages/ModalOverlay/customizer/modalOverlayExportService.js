import JSZip from "jszip";
import {
  generateReactCode,
  generateReactAndCss,
  generateHtmlCss,
} from "./modalOverlayCodeGenerator";
import {
  toPascalCase,
  toSlug,
  serializeConfig,
} from "./modalOverlayCustomizationUtils";

/**
 * Triggers a browser file download via Blob.
 */
export function downloadFile(filename, content, mimeType = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Generates and downloads a complete project ZIP bundle.
 */
export async function downloadZipPackage(config) {
  const zip = new JSZip();
  const componentName = toPascalCase(config.name || "CustomOverlay");
  const slug = toSlug(config.name || "custom-overlay");

  // 1. React JSX (self-contained with inline styling)
  const reactCode = generateReactCode(config);
  zip.file(`${componentName}.jsx`, reactCode);

  // 2. React + CSS
  const { jsx: reactWithCss, css: standaloneCss } = generateReactAndCss(config);
  zip.file(`${componentName}WithCss.jsx`, reactWithCss);
  zip.file(`${componentName}.css`, standaloneCss);

  // 3. Standalone HTML/CSS/JS
  const htmlDemo = generateHtmlCss(config);
  zip.file("index.html", htmlDemo);

  // 4. Configuration JSON
  const configJson = serializeConfig(config);
  zip.file("overlay.config.json", configJson);

  // 5. package.json
  const packageJson = {
    name: slug,
    version: "1.0.0",
    private: true,
    description: `Custom ${config.name} overlay component exported from TemplateHub`,
    main: `${componentName}.jsx`,
    dependencies: {
      react: "^19.0.0",
      "react-dom": "^19.0.0",
      "lucide-react": "^1.14.0",
    },
  };
  zip.file("package.json", JSON.stringify(packageJson, null, 2));

  // 6. README.md
  const readme = `# ${config.name || "Custom Overlay"}

Exported from **TemplateHub Modal & Overlay Customizer**.

## Source Pattern
**${config.sourceComponentId}** — ${config.name}

## Included Files
- **\`${componentName}.jsx\`**: Self-contained React component with inline styles and full accessibility/interaction behaviors.
- **\`${componentName}WithCss.jsx\`** & **\`${componentName}.css\`**: React component paired with an external scoped stylesheet.
- **\`index.html\`**: Standalone HTML/CSS/JS demo. Open directly in any modern browser without npm or bundlers.
- **\`overlay.config.json\`**: Complete serialized configuration. Import back into TemplateHub anytime to continue customizing.

## Usage in React
\`\`\`jsx
import React, { useState } from "react";
import ${componentName} from "./${componentName}";

export default function MyPage() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={() => setOpen(true)}>
        Open Overlay
      </button>

      <${componentName}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
\`\`\`

## Features & Accessibility
- Focus trapping and restoration.
- Escape key stack handling.
- Background body scroll locking.
- Outside click / backdrop dismissal according to your custom settings.
- Fully responsive across desktop, tablet, and mobile.
`;
  zip.file("README.md", readme);

  // Generate and download ZIP
  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${slug}-package.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
