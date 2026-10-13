/**
 * File System Utilities
 * Core helpers for file formatting, validation, dimension checking, canvas crop, and compression.
 */

export {
  formatBytes,
  getFileExtension,
  getFileCategory,
} from "./fileFormatUtils";

export {
  validateFileType,
  validateFileSize,
  getImageDimensions,
  validateImageDimensions,
} from "./fileValidationUtils";

export {
  compressImage,
  cropImageToBlob,
} from "./imageCanvasUtils";

export {
  simulateUploadAdapter,
} from "./uploadSimulationUtils";
