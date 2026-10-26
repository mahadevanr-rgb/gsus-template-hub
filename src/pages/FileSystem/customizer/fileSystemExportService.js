import JSZip from "jszip";
import {
  generateReactCode,
  generateReactAndCss,
  generateHtmlCss,
} from "./fileSystemCodeGenerator";
import {
  toPascalCase,
  toSlug,
  serializeConfig,
} from "./fileSystemCustomizationUtils";

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
 * Generates and downloads a complete project ZIP bundle.
 */
export async function downloadZipPackage(config) {
  const zip = new JSZip();
  const componentName = toPascalCase(config.name || "CustomFileUploader");
  const slug = toSlug(config.name || "custom-file-uploader");

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
  zip.file("fileSystem.config.json", configJson);

  // 5. package.json
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

  // 6. README.md
  const readme = `# ${config.name || "Custom File Uploader"}

Exported from **TemplateHub File System Customizer**.

## Included Files
- **\`${componentName}.jsx\`**: Standalone, fully functional React component powered by Tailwind CSS and Lucide icons.
- **\`${componentName}WithCss.jsx\`** & **\`${componentName}.css\`**: Standalone React component styled using pure vanilla scoped CSS.
- **\`index.html\`**: Zero-dependency standalone HTML & CSS demo you can open directly in any browser.
- **\`fileSystem.config.json\`**: Configuration JSON file. You can import this file back into TemplateHub at any time to reopen and adjust your design.

## Features & Configured Rules
- **Accept**: \`${config.fileSelection?.acceptedExtensions || "*"}\`
- **Max File Size**: \`${config.validation?.maxSizeValue || 10} ${config.validation?.maxSizeUnit || "MB"}\`
- **Max Files**: \`${config.fileSelection?.multiple ? config.fileSelection?.maxFiles || 5 : 1}\`
- **Multiple Mode**: \`${config.fileSelection?.multiple ? "Enabled" : "Disabled (Single-File)"}\`
- **Memory-safe previews**: Object URLs are tracked and automatically revoked on removal and unmount.

## Usage in React
\`\`\`jsx
import ${componentName} from "./${componentName}";

export default function App() {
  const handleFileChange = (files) => {
    console.log("Selected files:", files);
  };

  return (
    <div className="p-8 flex items-center justify-center min-h-screen bg-slate-950">
      <${componentName} onFileChange={handleFileChange} />
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
