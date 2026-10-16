import JSZip from "jszip";
import { generateReactCode, generateReactAndCss, generateHtmlCss } from "./cardCodeGenerator";
import { toPascalCase, toSlug, serializeConfig } from "./cardCustomizationUtils";

/**
 * Triggers browser file download via Blob.
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
 * Decodes base64 data URI to Uint8Array for zip packaging.
 */
function dataUriToUint8Array(dataUri) {
  try {
    const base64 = dataUri.split(",")[1];
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  } catch (err) {
    console.warn("Failed to decode base64 image data", err);
    return null;
  }
}

/**
 * Generates and downloads a complete project ZIP bundle.
 */
export async function downloadZipPackage(config) {
  const zip = new JSZip();
  const componentName = toPascalCase(config.name || "CustomCard");
  const slug = toSlug(config.name || "custom-card");

  // 1. Generate JSX
  const reactCode = generateReactCode(config);
  zip.file(`${componentName}.jsx`, reactCode);

  // 2. Generate React + CSS
  const { jsx: reactWithCss, css: standaloneCss } = generateReactAndCss(config);
  zip.file(`${componentName}WithCss.jsx`, reactWithCss);
  zip.file(`${componentName}.css`, standaloneCss);

  // 3. Generate HTML Demo
  const htmlDemo = generateHtmlCss(config);
  zip.file("index.html", htmlDemo);

  // 4. Configuration JSON
  const configJson = serializeConfig(config);
  zip.file("card.config.json", configJson);

  // 5. Check for base64 uploaded image asset
  if (config.image?.url?.startsWith("data:image/")) {
    const imgBytes = dataUriToUint8Array(config.image.url);
    if (imgBytes) {
      zip.folder("assets").file("card-image.png", imgBytes);
    }
  }

  // 6. package.json
  const packageJson = {
    name: slug,
    version: "1.0.0",
    private: true,
    description: `Custom ${config.name} exported from TemplateHub`,
    main: `${componentName}.jsx`,
    dependencies: {
      react: "^19.0.0",
      "react-dom": "^19.0.0",
      "lucide-react": "^1.14.0",
    },
    devDependencies: {
      tailwindcss: "^3.4.0",
    },
  };
  zip.file("package.json", JSON.stringify(packageJson, null, 2));

  // 7. README.md
  const readme = `# ${config.name || "Custom Card"}

Exported from **TemplateHub Card Customizer**.

## Included Files
- **\`${componentName}.jsx\`**: Standalone React component powered by Tailwind CSS and Lucide icons.
- **\`${componentName}WithCss.jsx\`** & **\`${componentName}.css\`**: Standalone React component styled using pure vanilla CSS.
- **\`index.html\`**: Zero-dependency HTML & CSS preview document you can open directly in any browser.
- **\`card.config.json\`**: Configuration JSON file. You can import this file back into TemplateHub at any time to reopen and adjust your design.

## Usage in React
\`\`\`jsx
import ${componentName} from "./${componentName}";

export default function MyPage() {
  return (
    <div className="p-8 flex items-center justify-center">
      <${componentName} onAction={() => alert("Action triggered!")} />
    </div>
  );
}
\`\`\`

## Dependencies
- \`react\` >= 18.0.0
- \`lucide-react\` >= 0.300.0
- Optional: \`tailwindcss\` >= 3.0.0
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
