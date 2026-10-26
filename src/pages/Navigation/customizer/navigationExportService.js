import JSZip from "jszip";
import {
  generateReactCode,
  generateReactAndCss,
  generateHtmlCss,
} from "./navigationCodeGenerator";
import {
  toPascalCase,
  toSlug,
  serializeNavigationConfig,
} from "./navigationCustomizationUtils";

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
 * Generates and downloads a complete standalone ZIP bundle for the customized navigation.
 */
export async function exportNavigationZipPackage(config) {
  const zip = new JSZip();
  const componentName = toPascalCase(config.name || "CustomNavigation");
  const slug = toSlug(config.name || "custom-navigation");

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
  const configJson = serializeNavigationConfig(config);
  zip.file("navigation.config.json", configJson);

  // 5. package.json
  const packageJson = {
    name: slug,
    version: "1.0.0",
    private: true,
    description: `Custom ${config.name} navigation component exported from TemplateHub`,
    main: `${componentName}.jsx`,
    dependencies: {
      react: "^18.0.0 || ^19.0.0",
      "react-dom": "^18.0.0 || ^19.0.0",
      "lucide-react": "^0.470.0",
    },
    peerDependencies: {
      "react-router-dom": "^6.0.0 || ^7.0.0",
    },
  };
  zip.file("package.json", JSON.stringify(packageJson, null, 2));

  // 6. README.md
  const readme = `# ${componentName}

Exported from **TemplateHub Navigation & Component States Customizer**.

## Overview
- **Pattern:** \`${config.sourceComponentId || "navbar"}\`
- **Component Name:** \`${componentName}\`
- **Indicator Style:** \`${config.indicatorStyle || "pill"}\`
- **Font Family:** \`${config.typography?.fontFamily || "Inter, sans-serif"}\`

## Quick Start
1. Copy \`${componentName}.jsx\` into your React project.
2. Ensure you have \`lucide-react\` installed:
   \`\`\`bash
   npm install lucide-react
   \`\`\`
3. Import and render in your view:
   \`\`\`jsx
   import ${componentName} from "./${componentName}";

   export default function App() {
     return (
       <${componentName}
         activeId="${config.activeId || "1"}"
         onItemSelect={(id, href) => console.log("Navigated to:", id, href)}
       />
     );
   }
   \`\`\`

## React Router Integration
To integrate with **React Router 6/7**, pass an \`onItemSelect\` callback:
\`\`\`jsx
import { useNavigate } from "react-router-dom";
import ${componentName} from "./${componentName}";

export function HeaderNav() {
  const navigate = useNavigate();

  return (
    <${componentName}
      onItemSelect={(id, href) => {
        if (href && !href.startsWith("#")) {
          navigate(href);
        }
      }}
    />
  );
}
\`\`\`

## Re-importing into TemplateHub
You can import \`navigation.config.json\` back into TemplateHub at any time via the **Import Config JSON** button in the code inspector.
`;
  zip.file("README.md", readme);

  // Generate and trigger download
  const blob = await zip.generateAsync({ type: "blob" });
  downloadFile(`${slug}-bundle.zip`, blob, "application/zip");
}

export const downloadZipPackage = exportNavigationZipPackage;
