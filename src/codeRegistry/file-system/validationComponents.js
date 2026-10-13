import {
  FileTypeValidationDemo,
  FileSizeValidationDemo,
  ImageDimensionValidationDemo,
} from "@/pages/FileSystem/components";

export const validationComponents = [
  {
    id: "file-type-validation",
    slug: "file-type-validation",
    name: "MIME & Extension Validation",
    category: "file-system",
    subCategory: "Validation",
    tag: "Validation",
    theme: "blue",
    version: "v1.0.0",
    description:
      "Strict file type and MIME validator matching accept filters with detailed, actionable error alerts when unsupported files are dropped.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["validation", "mime", "extension", "security", "file-type"],
    files: [{ name: "fileUtils.js", path: "components/common/FileSystem/fileUtils.js" }],
    component: FileTypeValidationDemo,
    sourceCode: `import React from "react";
import { FileUpload } from "@/components/common/FileSystem";

export default function FileTypeValidationDemo() {
  return (
    <FileUpload
      accept=".pdf,.docx"
      title="Upload supported files"
      description="Files must strictly match: .pdf, .docx"
    />
  );
}`,
    uses: ["Security guardrails", "Format-specific inputs", "Import schema enforcers"],
  },
  {
    id: "file-size-validation",
    slug: "file-size-validation",
    name: "File Size Ceiling Validation",
    category: "file-system",
    subCategory: "Validation",
    tag: "Validation",
    theme: "emerald",
    version: "v1.0.0",
    description:
      "Configurable file size limiter that prevents oversized file selection and displays formatted human-readable size limits.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["size-validation", "max-size", "limit", "byte-formatter"],
    files: [{ name: "fileUtils.js", path: "components/common/FileSystem/fileUtils.js" }],
    component: FileSizeValidationDemo,
    sourceCode: `import React from "react";
import { FileUpload } from "@/components/common/FileSystem";

export default function FileSizeValidationDemo() {
  return (
    <FileUpload
      maxSize={2 * 1024 * 1024} // 2 MB limit
      title="Max 2 MB File Size Limit"
      description="Files larger than 2 MB will be rejected with clear error feedback"
    />
  );
}`,
    uses: ["Server payload limit enforcement", "Storage quota management", "Mobile data protection"],
  },
  {
    id: "image-dimension-validation",
    slug: "image-dimension-validation",
    name: "Image Dimension Validation",
    category: "file-system",
    subCategory: "Validation",
    tag: "Validation",
    theme: "teal",
    version: "v1.0.0",
    description:
      "Asynchronous image dimension inspector that validates minimum and maximum pixel width/height constraints before upload starts.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["dimensions", "image-size", "pixel-check", "aspect-validation"],
    files: [{ name: "fileUtils.js", path: "components/common/FileSystem/fileUtils.js" }],
    component: ImageDimensionValidationDemo,
    sourceCode: `import React from "react";
import { ImageUpload } from "@/components/common/FileSystem";

export default function ImageDimensionValidationDemo() {
  return (
    <ImageUpload
      accept="image/*"
      minWidth={800}
      minHeight={600}
      maxWidth={4000}
      maxHeight={4000}
      title="Upload High-Res Banner"
      description="Minimum required: 800 × 600 px · Maximum: 4000 × 4000 px"
    />
  );
}`,
    uses: ["High-res hero banners", "Marketplace product photos", "Print-ready image assets"],
  },
];
