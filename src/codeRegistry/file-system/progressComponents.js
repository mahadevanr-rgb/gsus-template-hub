import {
  UploadProgressDemo,
  UploadCancelDemo,
  UploadRetryDemo,
} from "@/pages/FileSystem/components";

export const progressComponents = [
  {
    id: "upload-progress",
    slug: "upload-progress",
    name: "Upload Progress States",
    category: "file-system",
    subCategory: "Progress",
    tag: "Progress",
    theme: "indigo",
    version: "v1.0.0",
    description:
      "Fine-grained progress bar states spanning 0%, 25%, 50%, 75%, 100%, success completions, validation spinners, and error alerts.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["progress", "progress-bar", "status", "loading", "percentage"],
    files: [{ name: "UploadProgress.jsx", path: "components/common/FileSystem/UploadProgress.jsx" }],
    component: UploadProgressDemo,
    sourceCode: `import React from "react";
import { UploadProgress } from "@/components/common/FileSystem";

export default function UploadProgressDemo() {
  return (
    <div className="space-y-4">
      <UploadProgress progress={65} status="uploading" />
      <UploadProgress progress={100} status="success" />
      <UploadProgress progress={40} status="error" error="Network timeout" />
    </div>
  );
}`,
    uses: ["Upload indicators", "Task completion bars", "Async process spinners"],
  },
  {
    id: "upload-cancel",
    slug: "upload-cancel",
    name: "In-Flight Upload Cancel",
    category: "file-system",
    subCategory: "Progress",
    tag: "Cancellation",
    theme: "red",
    version: "v1.0.0",
    description:
      "AbortController-powered upload cancellation engine that stops network simulations safely, sets canceled state, and allows instant retry.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["cancel", "abort", "abortcontroller", "in-flight", "retry"],
    files: [{ name: "useFileManager.js", path: "components/common/FileSystem/useFileManager.js" }],
    component: UploadCancelDemo,
    sourceCode: `import React from "react";
import { useFileManager, FileDropZone, FileList } from "@/components/common/FileSystem";

export default function UploadCancelDemo() {
  const { files, addFiles, cancelUpload, retryUpload, removeFile } = useFileManager({ autoUpload: true });

  return (
    <div className="space-y-4">
      <FileDropZone onFilesSelected={addFiles} />
      <FileList files={files} onCancel={cancelUpload} onRetry={retryUpload} onRemove={removeFile} />
    </div>
  );
}`,
    uses: ["Large file cancellation", "User abort workflows", "Bandwidth conservation"],
  },
  {
    id: "upload-retry",
    slug: "upload-retry",
    name: "Upload Error & Retry",
    category: "file-system",
    subCategory: "Resilience",
    tag: "Resilience",
    theme: "purple",
    version: "v1.0.0",
    description:
      "Network resilience pattern that handles failed uploads gracefully, presents human-readable error reasons, and provides one-click retry.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["retry", "error-recovery", "resilience", "network-failure"],
    files: [{ name: "useFileManager.js", path: "components/common/FileSystem/useFileManager.js" }],
    component: UploadRetryDemo,
    sourceCode: `import React from "react";
import { useFileManager, FileDropZone, FileList } from "@/components/common/FileSystem";

export default function UploadRetryDemo() {
  const { files, addFiles, retryUpload, removeFile } = useFileManager();

  return (
    <div className="space-y-4">
      <FileDropZone onFilesSelected={addFiles} />
      <FileList files={files} onRetry={retryUpload} onRemove={removeFile} />
    </div>
  );
}`,
    uses: ["Unstable network handling", "Fault-tolerant uploads", "Mission-critical file transfers"],
  },
];
