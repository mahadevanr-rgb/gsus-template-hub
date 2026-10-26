import JSZip from "jszip";
import {
  generateReactCode,
  generateReactAndCss,
  generateHtmlCss,
} from "./accordionCodeGenerator";
import { toPascalCase, toSlug, serializeConfig } from "./accordionCustomizationUtils";

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
  const componentName = toPascalCase(config.name || "CustomAccordion");
  const slug = toSlug(config.name || "custom-accordion");

  // 1. React JSX (inline styles, self-contained)
  const reactCode = generateReactCode(config);
  zip.file(`${componentName}.jsx`, reactCode);

  // 2. React + CSS
  const { jsx: reactWithCss, css: standaloneCss } = generateReactAndCss(config);
  zip.file(`${componentName}WithCss.jsx`, reactWithCss);
  zip.file(`${componentName}.css`, standaloneCss);

  // 3. HTML/CSS/JS standalone
  const htmlDemo = generateHtmlCss(config);
  zip.file("index.html", htmlDemo);

  // 4. Configuration JSON
  const configJson = serializeConfig(config);
  zip.file("accordion.config.json", configJson);

  // 5. package.json
  const packageJson = {
    name: slug,
    version: "1.0.0",
    private: true,
    description: `Custom ${config.name} accordion exported from TemplateHub`,
    main: `${componentName}.jsx`,
    dependencies: {
      react: "^19.0.0",
      "react-dom": "^19.0.0",
      "lucide-react": "^1.14.0",
    },
  };
  zip.file("package.json", JSON.stringify(packageJson, null, 2));

  // 6. README.md
  const readme = `# ${config.name || "Custom Accordion"}

Exported from **TemplateHub Accordion Customizer**.

## Source Pattern
**${config.sourceComponentId}** — ${config.name}

## Included Files
- **\`${componentName}.jsx\`**: Self-contained React component with inline styles.
- **\`${componentName}WithCss.jsx\`** & **\`${componentName}.css\`**: React component with separate CSS file.
- **\`index.html\`**: Standalone HTML/CSS/JS demo. Open directly in any browser.
- **\`accordion.config.json\`**: Full configuration. Import back into TemplateHub to continue editing.

## Usage in React
\`\`\`jsx
import ${componentName} from "./${componentName}";

export default function MyPage() {
  return (
    <div style={{ padding: "40px" }}>
      <${componentName} />
    </div>
  );
}
\`\`\`

## Dependencies
- \`react\` >= 18.0.0
- \`lucide-react\` >= 0.300.0
`;
  zip.file("README.md", readme);

  // Generate and download
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
