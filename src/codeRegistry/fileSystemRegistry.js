import { uploadComponents } from "./file-system/uploadComponents";
import { previewComponents } from "./file-system/previewComponents";
import { progressComponents } from "./file-system/progressComponents";
import { validationComponents } from "./file-system/validationComponents";
import { processingComponents } from "./file-system/processingComponents";

export const fileSystemComponents = [
  ...uploadComponents,
  ...previewComponents,
  ...progressComponents,
  ...validationComponents,
  ...processingComponents,
];

export function getFileSystemComponents() {
  return fileSystemComponents;
}

export function searchFileSystemComponents(query) {
  const q = (query || "").toLowerCase();
  return fileSystemComponents.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      (c.tags && c.tags.some((t) => t.toLowerCase().includes(q)))
  );
}

export default fileSystemComponents;
