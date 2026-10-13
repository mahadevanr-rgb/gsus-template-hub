import {
  BasicFileUploadDemo,
  MultipleFileUploadDemo,
  DragDropUploadDemo,
  ImageUploadDemo,
  DocumentUploadDemo,
} from "@/pages/FileSystem/components";

export const uploadComponents = [
  {
    id: "basic-file-upload",
    slug: "basic-file-upload",
    name: "Basic File Upload",
    category: "file-system",
    subCategory: "Single Upload",
    tag: "Upload",
    theme: "indigo",
    version: "v1.0.0",
    description:
      "A complete single-file upload solution with integrated dropzone, format checking, live preview, smooth progress bar, and removal controls.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["upload", "file", "single-upload", "dropzone", "progress"],
    files: [{ name: "FileUpload.jsx", path: "components/common/FileSystem/FileUpload.jsx" }],
    component: BasicFileUploadDemo,
    sourceCode: `import React from "react";
import { FileUpload } from "@/components/common/FileSystem";

export default function BasicFileUploadDemo() {
  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <FileUpload
        accept=".pdf,.png,.jpg,.jpeg,.zip"
        maxSize={5 * 1024 * 1024} // 5 MB
        title="Upload component source"
        description="PDF, PNG, JPG, or ZIP up to 5 MB"
        onFileChange={(file) => console.log("Selected:", file?.name)}
        onUploadSuccess={(res) => console.log("Upload Success:", res)}
      />
    </div>
  );
}`,
    uses: ["Single document upload", "Attachment inputs", "Form attachments", "File importers"],
  },
  {
    id: "multiple-file-upload",
    slug: "multiple-file-upload",
    name: "Multiple File Upload",
    category: "file-system",
    subCategory: "Batch Upload",
    tag: "Batch",
    theme: "purple",
    version: "v1.0.0",
    description:
      "Batch file uploader supporting multi-selection, drag & drop, file count limits, individual progress tracking, and batch upload actions.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["multiple-upload", "batch", "files", "queue", "dropzone"],
    files: [{ name: "MultipleFileUpload.jsx", path: "components/common/FileSystem/MultipleFileUpload.jsx" }],
    component: MultipleFileUploadDemo,
    sourceCode: `import React from "react";
import { MultipleFileUpload } from "@/components/common/FileSystem";

export default function MultipleFileUploadDemo() {
  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <MultipleFileUpload
        accept=".pdf,.png,.jpg,.jpeg,.svg,.docx,.zip"
        maxSize={10 * 1024 * 1024}
        maxFiles={6}
        title="Upload project assets"
        description="Select multiple documents or images (Max 6 files)"
        onFilesChange={(files) => console.log("Files queue:", files.length)}
      />
    </div>
  );
}`,
    uses: ["Batch asset uploads", "Project attachments", "Photo gallery uploader", "Document bulk upload"],
  },
  {
    id: "drag-drop-upload",
    slug: "drag-drop-upload",
    name: "Drag & Drop Upload Zone",
    category: "file-system",
    subCategory: "Dropzone",
    tag: "Dropzone",
    theme: "blue",
    version: "v1.0.0",
    description:
      "Accessible drag-and-drop file target with responsive visual drag states, keyboard accessibility, and fallback browse trigger.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["drag-and-drop", "dnd", "dropzone", "accessible", "browse"],
    files: [{ name: "FileDropZone.jsx", path: "components/common/FileSystem/FileDropZone.jsx" }],
    component: DragDropUploadDemo,
    sourceCode: `import React from "react";
import { FileDropZone, useFileManager } from "@/components/common/FileSystem";
import { CloudUpload } from "lucide-react";

export default function DragDropUploadDemo() {
  const { isDragOver, addFiles, handleDragEnter, handleDragOver, handleDragLeave, handleDrop } =
    useFileManager({ multiple: true });

  return (
    <FileDropZone
      onFilesSelected={addFiles}
      accept="*"
      multiple={true}
      icon={CloudUpload}
      title="Drag & drop project files here"
      description="Drop anything from your desktop or click browse"
      isDragOver={isDragOver}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    />
  );
}`,
    uses: ["Modern web app dropzones", "Hero upload zones", "Media library managers"],
  },
  {
    id: "image-upload",
    slug: "image-upload",
    name: "Image Upload & Inspection",
    category: "file-system",
    subCategory: "Image",
    tag: "Image",
    theme: "emerald",
    version: "v1.0.0",
    description:
      "Specialized image file selector with automatic aspect preview, dimensions inspection, built-in crop trigger, and compression tools.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["image", "preview", "crop", "compress", "dimensions"],
    files: [{ name: "ImageUpload.jsx", path: "components/common/FileSystem/ImageUpload.jsx" }],
    component: ImageUploadDemo,
    sourceCode: `import React from "react";
import { ImageUpload } from "@/components/common/FileSystem";

export default function ImageUploadDemo() {
  return (
    <ImageUpload
      accept="image/png,image/jpeg,image/webp,image/svg+xml"
      maxSize={8 * 1024 * 1024}
      allowCrop={true}
      allowCompress={true}
      aspectRatio="16:9"
      title="Upload component preview"
      description="PNG, JPG or WEBP up to 8 MB · Crop & Compress enabled"
    />
  );
}`,
    uses: ["Blog featured images", "Product thumbnail uploader", "Design preview submissions"],
  },
  {
    id: "document-upload",
    slug: "document-upload",
    name: "Document Upload Center",
    category: "file-system",
    subCategory: "Documents",
    tag: "Documents",
    theme: "teal",
    version: "v1.0.0",
    description:
      "Dedicated uploader for PDF, Word, Excel, and CSV documents featuring format indicator badges, size calculation, and batch management.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["document", "pdf", "docx", "xlsx", "csv"],
    files: [{ name: "DocumentUpload.jsx", path: "components/common/FileSystem/DocumentUpload.jsx" }],
    component: DocumentUploadDemo,
    sourceCode: `import React from "react";
import { DocumentUpload } from "@/components/common/FileSystem";

export default function DocumentUploadDemo() {
  return (
    <DocumentUpload
      accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
      maxSize={15 * 1024 * 1024}
      maxFiles={4}
      title="Upload documentation & specs"
      description="PDF, Word, Excel, and CSV files supported"
    />
  );
}`,
    uses: ["Resume / CV submission", "Financial report uploads", "Contract / PDF agreements"],
  },
];
