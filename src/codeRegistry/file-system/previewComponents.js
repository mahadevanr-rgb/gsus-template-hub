import {
  ImagePreviewDemo,
  FilePreviewDemo,
  FileListDemo,
  RemoveReplaceDemo,
} from "@/pages/FileSystem/components";

export const previewComponents = [
  {
    id: "image-preview",
    slug: "image-preview",
    name: "Image Preview & Zoom",
    category: "file-system",
    subCategory: "Preview",
    tag: "Preview",
    theme: "cyan",
    version: "v1.0.0",
    description:
      "Rich image preview component displaying natural pixel dimensions, aspect ratio containers, and full-screen inspection lightbox.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["preview", "image-preview", "zoom", "lightbox", "dimensions"],
    files: [{ name: "FilePreview.jsx", path: "components/common/FileSystem/FilePreview.jsx" }],
    component: ImagePreviewDemo,
    sourceCode: `import React, { useState } from "react";
import { FilePreview, FileDropZone } from "@/components/common/FileSystem";

export default function ImagePreviewDemo() {
  const [file, setFile] = useState(null);

  return (
    <FilePreview
      file={file}
      category="image"
      aspectRatio="video"
      allowEnlarge={true}
    />
  );
}`,
    uses: ["Media inspectors", "Photo detail panels", "Asset review tools"],
  },
  {
    id: "file-preview",
    slug: "file-preview",
    name: "Multi-Format File Preview",
    category: "file-system",
    subCategory: "Preview",
    tag: "Preview",
    theme: "fuchsia",
    version: "v1.0.0",
    description:
      "Adaptive preview system for PDFs, spreadsheets, source code, archives, and media files without fake rendering for unsupported formats.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["file-preview", "multi-format", "pdf", "code", "spreadsheet"],
    files: [{ name: "FilePreview.jsx", path: "components/common/FileSystem/FilePreview.jsx" }],
    component: FilePreviewDemo,
    sourceCode: `import React from "react";
import { FilePreview } from "@/components/common/FileSystem";

export default function FilePreviewDemo() {
  return (
    <FilePreview
      name="annual-report-2025.pdf"
      size={3450000}
      category="pdf"
      aspectRatio="video"
    />
  );
}`,
    uses: ["Generic file viewers", "Attachment cards", "Email attachment previews"],
  },
  {
    id: "file-list",
    slug: "file-list",
    name: "Interactive File List",
    category: "file-system",
    subCategory: "List",
    tag: "List",
    theme: "amber",
    version: "v1.0.0",
    description:
      "Comprehensive queue table displaying status pills, upload progress bars, formatted file sizes, retry, cancel, replace, and removal actions.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["file-list", "queue", "progress-table", "batch-actions"],
    files: [{ name: "FileList.jsx", path: "components/common/FileSystem/FileList.jsx" }],
    component: FileListDemo,
    sourceCode: `import React from "react";
import { FileList } from "@/components/common/FileSystem";

export default function FileListDemo() {
  const files = [
    { id: "1", name: "presentation.pdf", size: 4200000, category: "pdf", status: "uploading", progress: 68 },
    { id: "2", name: "tokens.json", size: 45000, category: "code", status: "success", progress: 100 }
  ];

  return <FileList files={files} />;
}`,
    uses: ["Upload manager tables", "Asset management queues", "Form attachment lists"],
  },
  {
    id: "remove-replace",
    slug: "remove-replace",
    name: "Remove & Replace Flow",
    category: "file-system",
    subCategory: "Interaction",
    tag: "Workflow",
    theme: "orange",
    version: "v1.0.0",
    description:
      "Seamless in-place replacement workflow allowing users to swap individual files or safely delete them with proper memory cleanup.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["replace", "remove", "workflow", "lifecycle", "memory-safe"],
    files: [{ name: "FileUpload.jsx", path: "components/common/FileSystem/FileUpload.jsx" }],
    component: RemoveReplaceDemo,
    sourceCode: `import React from "react";
import { FileUpload } from "@/components/common/FileSystem";

export default function RemoveReplaceDemo() {
  return (
    <FileUpload
      accept="*/*"
      allowReplace={true}
      allowRemove={true}
      title="Upload file to test replace & remove"
      description="Replace swaps file directly without resetting component"
    />
  );
}`,
    uses: ["Form file edits", "Profile picture update", "Document revision replacement"],
  },
];
