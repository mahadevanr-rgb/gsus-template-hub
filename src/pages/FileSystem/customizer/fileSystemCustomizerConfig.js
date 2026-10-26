/**
 * File System Customizer Configuration & Schemas
 * Comprehensive schema definitions, presets, palettes, and defaults for TemplateHub File System Customizer.
 */

export const FONT_OPTIONS = [
  { label: "Inter (Default)", value: "Inter, sans-serif" },
  { label: "Outfit (Modern Sans)", value: "Outfit, sans-serif" },
  { label: "Roboto (Clean)", value: "Roboto, sans-serif" },
  { label: "Plus Jakarta Sans", value: "'Plus Jakarta Sans', sans-serif" },
  { label: "System UI", value: "system-ui, -apple-system, sans-serif" },
  { label: "Monospace (Code)", value: "ui-monospace, monospace" },
  { label: "Georgia (Serif)", value: "Georgia, serif" },
];

export const COLOR_PALETTES = [
  {
    name: "Emerald Modern",
    cardBg: "#ffffff",
    dropzoneBg: "#f0fdf4",
    accentColor: "#10b981",
    titleColor: "#064e3b",
    descColor: "#475569",
    helperColor: "#64748b",
    borderColor: "#a7f3d0",
    btnBg: "#059669",
    btnTextColor: "#ffffff",
    dragOverBg: "rgba(16, 185, 129, 0.12)",
    dragOverBorderColor: "#10b981",
    previewBg: "#f8fafc",
    progressColor: "#10b981",
    successColor: "#059669",
    errorColor: "#ef4444",
  },
  {
    name: "Indigo Pro",
    cardBg: "#ffffff",
    dropzoneBg: "#eef2ff",
    accentColor: "#6366f1",
    titleColor: "#0f172a",
    descColor: "#475569",
    helperColor: "#64748b",
    borderColor: "#c7d2fe",
    btnBg: "#4f46e5",
    btnTextColor: "#ffffff",
    dragOverBg: "rgba(99, 102, 241, 0.12)",
    dragOverBorderColor: "#6366f1",
    previewBg: "#f8fafc",
    progressColor: "#6366f1",
    successColor: "#10b981",
    errorColor: "#f43f5e",
  },
  {
    name: "Cyan Cloud",
    cardBg: "#ffffff",
    dropzoneBg: "#ecfeff",
    accentColor: "#06b6d4",
    titleColor: "#164e63",
    descColor: "#475569",
    helperColor: "#64748b",
    borderColor: "#a5f3fc",
    btnBg: "#0891b2",
    btnTextColor: "#ffffff",
    dragOverBg: "rgba(6, 182, 212, 0.12)",
    dragOverBorderColor: "#06b6d4",
    previewBg: "#f8fafc",
    progressColor: "#06b6d4",
    successColor: "#10b981",
    errorColor: "#ef4444",
  },
  {
    name: "Obsidian Slate (Dark)",
    cardBg: "#0f172a",
    dropzoneBg: "rgba(15, 23, 42, 0.7)",
    accentColor: "#38bdf8",
    titleColor: "#f8fafc",
    descColor: "#94a3b8",
    helperColor: "#64748b",
    borderColor: "#334155",
    btnBg: "#0284c7",
    btnTextColor: "#ffffff",
    dragOverBg: "rgba(56, 189, 248, 0.15)",
    dragOverBorderColor: "#38bdf8",
    previewBg: "#1e293b",
    progressColor: "#38bdf8",
    successColor: "#34d399",
    errorColor: "#fb7185",
  },
  {
    name: "Dark Velvet",
    cardBg: "#111827",
    dropzoneBg: "rgba(31, 41, 55, 0.6)",
    accentColor: "#8b5cf6",
    titleColor: "#f9fafb",
    descColor: "#9ca3af",
    helperColor: "#6b7280",
    borderColor: "#374151",
    btnBg: "#7c3aed",
    btnTextColor: "#ffffff",
    dragOverBg: "rgba(139, 92, 246, 0.15)",
    dragOverBorderColor: "#8b5cf6",
    previewBg: "#1f2937",
    progressColor: "#8b5cf6",
    successColor: "#10b981",
    errorColor: "#ef4444",
  },
  {
    name: "Sunset Warm",
    cardBg: "#ffffff",
    dropzoneBg: "#fff7ed",
    accentColor: "#f97316",
    titleColor: "#431407",
    descColor: "#57534e",
    helperColor: "#78716c",
    borderColor: "#fed7aa",
    btnBg: "#ea580c",
    btnTextColor: "#ffffff",
    dragOverBg: "rgba(249, 115, 22, 0.12)",
    dragOverBorderColor: "#f97316",
    previewBg: "#fafaf9",
    progressColor: "#f97316",
    successColor: "#10b981",
    errorColor: "#ef4444",
  },
  {
    name: "Clean Monochrome",
    cardBg: "#ffffff",
    dropzoneBg: "#f8fafc",
    accentColor: "#18181b",
    titleColor: "#09090b",
    descColor: "#52525b",
    helperColor: "#71717a",
    borderColor: "#e4e4e7",
    btnBg: "#18181b",
    btnTextColor: "#fafafa",
    dragOverBg: "rgba(24, 24, 27, 0.08)",
    dragOverBorderColor: "#18181b",
    previewBg: "#f4f4f5",
    progressColor: "#27272a",
    successColor: "#10b981",
    errorColor: "#ef4444",
  },
];

export const SHADOW_PRESETS = [
  { label: "None", value: "none", css: "none" },
  { label: "Subtle (sm)", value: "sm", css: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
  { label: "Medium (md)", value: "md", css: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" },
  { label: "Elevated (lg)", value: "lg", css: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" },
  { label: "Dramatic (xl)", value: "xl", css: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" },
  { label: "Glow Accent", value: "glow", css: "0 0 25px -5px rgba(16, 185, 129, 0.35)" },
];

export const RADIUS_PRESETS = [
  { label: "Sharp (0px)", value: "0px" },
  { label: "Small (6px)", value: "6px" },
  { label: "Medium (12px)", value: "12px" },
  { label: "Rounded (16px)", value: "16px" },
  { label: "Pill/Large (24px)", value: "24px" },
  { label: "Full (Circle)", value: "9999px" },
];

export const LUCIDE_ICONS_LIST = [
  "UploadCloud",
  "FileUp",
  "FolderUp",
  "Upload",
  "ArrowUpCircle",
  "HardDrive",
  "Sparkles",
  "Layers",
  "FileText",
  "Image",
  "FileSpreadsheet",
  "FileArchive",
  "FileCode",
  "Camera",
  "CheckCircle2",
];

export const FILE_CATEGORY_PRESETS = [
  { id: "all", label: "All Files (*)", accept: "*" },
  { id: "images", label: "Images (PNG, JPG, WEBP, SVG, GIF)", accept: ".png,.jpg,.jpeg,.webp,.svg,.gif,image/*" },
  { id: "documents", label: "Documents (PDF, DOCX, TXT)", accept: ".pdf,.doc,.docx,.txt,application/pdf" },
  { id: "spreadsheets", label: "Spreadsheets (XLSX, CSV)", accept: ".xls,.xlsx,.csv" },
  { id: "archives", label: "Archives (ZIP, RAR, 7Z, TAR)", accept: ".zip,.rar,.7z,.tar,.gz" },
  { id: "media", label: "Media (Audio & Video)", accept: ".mp3,.wav,.mp4,.mov,.webm,video/*,audio/*" },
  { id: "code", label: "Code (JS, TS, JSON, HTML, CSS)", accept: ".js,.jsx,.ts,.tsx,.json,.html,.css" },
];

/**
 * Universal Default Configuration Template
 */
export const UNIVERSAL_DEFAULT_CONFIG = {
  id: "custom-file-upload",
  name: "Custom File Uploader",
  sourceComponentId: "basic-file-upload",
  category: "file-system",
  schemaVersion: "1.0.0",

  general: {
    title: "Upload your files",
    description: "Drag and drop your files here, or click to browse",
    helperText: "Supports documents and images up to 10 MB",
    browseBtnLabel: "Browse Files",
    uploadBtnLabel: "Upload Now",
    cancelBtnLabel: "Cancel",
    removeBtnLabel: "Remove",
    clearAllBtnLabel: "Clear All",
    showRequiredBadge: false,
    showOptionalBadge: true,
    showLabels: true,
    showFooter: true,
    footerText: "Your files are securely processed on your local device.",
    customClassName: "",
  },

  layout: {
    maxWidth: "lg", // 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
    padding: "normal", // 'compact' | 'normal' | 'spacious'
    alignment: "center", // 'center' | 'left' | 'right'
    dropzoneHeight: "normal", // 'compact' | 'normal' | 'tall'
    showDivider: true,
    iconPosition: "top", // 'top' | 'left' | 'inline'
  },

  appearance: {
    useThemeAwareDefaults: true,
    cardBg: "#ffffff",
    dropzoneBg: "rgba(248, 250, 252, 0.8)",
    borderColor: "#cbd5e1",
    borderStyle: "dashed", // 'dashed' | 'solid' | 'dotted'
    borderWidth: 2, // 1 | 2 | 3 | 4
    borderRadius: "16px",
    shadow: "sm",
    hoverShadow: "md",
    titleColor: "#0f172a",
    descColor: "#64748b",
    helperColor: "#94a3b8",
    accentColor: "#10b981",
    iconColor: "#10b981",
    iconBg: "rgba(16, 185, 129, 0.1)",
    btnBg: "#059669",
    btnTextColor: "#ffffff",
    dragOverBorderColor: "#10b981",
    dragOverBg: "rgba(16, 185, 129, 0.12)",
    previewBg: "#f8fafc",
    progressColor: "#10b981",
    successColor: "#059669",
    errorColor: "#ef4444",
    warningColor: "#f59e0b",
  },

  typography: {
    fontFamily: "Inter, sans-serif",
    titleSize: "text-base", // 'text-sm' | 'text-base' | 'text-lg' | 'text-xl'
    titleWeight: "font-bold", // 'font-medium' | 'font-semibold' | 'font-bold' | 'font-extrabold'
    descSize: "text-xs", // 'text-[11px]' | 'text-xs' | 'text-sm'
    helperSize: "text-[11px]",
    btnSize: "text-xs",
    textAlign: "center",
  },

  icons: {
    uploadIcon: "UploadCloud",
    fileIcon: "FileText",
    iconSize: "md", // 'sm' | 'md' | 'lg' | 'xl'
    iconShape: "rounded-2xl", // 'rounded-2xl' | 'circle' | 'square' | 'none'
    showIcon: true,
    showDecorativeBadge: true,
  },

  fileSelection: {
    multiple: false,
    maxFiles: 1,
    minFiles: 1,
    allowReplace: true,
    allowRemove: true,
    allowClearAll: true,
    preventDuplicates: true,
    categoryPreset: "all",
    acceptedExtensions: ".png,.jpg,.jpeg,.pdf,.zip",
    acceptMime: "*",
  },

  validation: {
    maxSizeValue: 10,
    maxSizeUnit: "MB", // 'MB' | 'KB'
    maxSizeBytes: 10 * 1024 * 1024,
    minSizeBytes: 0,
    maxBatchSizeBytes: 25 * 1024 * 1024,
    rejectOversizeImmediately: true,
    validateDimensions: false,
    minWidth: 200,
    maxWidth: 4000,
    minHeight: 200,
    maxHeight: 4000,
    aspectRatio: "auto", // 'auto' | '1:1' | '16:9' | '4:3'
    inlineErrors: true,
    showErrorSummary: true,
    keepValidOnPartialFailure: true,
    allowRetry: true,
  },

  preview: {
    showPreview: true,
    previewType: "card", // 'card' | 'thumbnail' | 'minimal'
    thumbnailSize: "md", // 'sm' | 'md' | 'lg'
    aspectRatio: "video", // 'auto' | 'video' | 'square'
    imageFit: "cover", // 'cover' | 'contain'
    allowEnlarge: true,
    allowCrop: false,
    allowCompress: false,
  },

  uploadBehavior: {
    autoUpload: false,
    simulateUpload: true,
    uploadSpeedMs: 1200,
    simulateFailure: false,
    showProgressBar: true,
    showProgressPercentage: true,
    progressStyle: "bar", // 'bar' | 'circular' | 'minimal'
  },

  responsive: {
    mobileStacked: true,
    mobileFullWidth: true,
    compactOnMobile: true,
  },
};

/**
 * Component-specific schemas tailored for the actual catalog components
 */
export const FILE_SYSTEM_SCHEMAS = {
  "basic-file-upload": {
    id: "basic-file-upload",
    title: "Basic File Upload",
    subCategory: "Single Upload",
    archetype: "single",
    description: "Complete single-file upload with dropzone, format check, live preview, progress, and remove/replace controls.",
    defaultConfig: {
      ...UNIVERSAL_DEFAULT_CONFIG,
      sourceComponentId: "basic-file-upload",
      name: "Basic File Upload",
      general: {
        ...UNIVERSAL_DEFAULT_CONFIG.general,
        title: "Upload component source",
        description: "PDF, PNG, JPG, or ZIP up to 5 MB",
        helperText: "Single document upload with live status",
      },
      fileSelection: {
        ...UNIVERSAL_DEFAULT_CONFIG.fileSelection,
        multiple: false,
        maxFiles: 1,
        acceptedExtensions: ".pdf,.png,.jpg,.jpeg,.zip",
      },
      validation: {
        ...UNIVERSAL_DEFAULT_CONFIG.validation,
        maxSizeValue: 5,
        maxSizeUnit: "MB",
        maxSizeBytes: 5 * 1024 * 1024,
      },
    },
  },

  "multiple-file-upload": {
    id: "multiple-file-upload",
    title: "Multiple File Upload / Batch Queue",
    subCategory: "Batch Upload",
    archetype: "batch",
    description: "Batch file uploader supporting multi-selection, drag & drop, file count limits, individual progress tracking, and batch actions.",
    defaultConfig: {
      ...UNIVERSAL_DEFAULT_CONFIG,
      sourceComponentId: "multiple-file-upload",
      name: "Multiple File Upload",
      general: {
        ...UNIVERSAL_DEFAULT_CONFIG.general,
        title: "Upload project assets",
        description: "Select multiple documents or images (Max 6 files)",
        helperText: "Batch queue with individual status & clear-all",
      },
      icons: {
        ...UNIVERSAL_DEFAULT_CONFIG.icons,
        uploadIcon: "Layers",
      },
      fileSelection: {
        ...UNIVERSAL_DEFAULT_CONFIG.fileSelection,
        multiple: true,
        maxFiles: 6,
        minFiles: 1,
        acceptedExtensions: ".pdf,.png,.jpg,.jpeg,.svg,.docx,.zip",
      },
      validation: {
        ...UNIVERSAL_DEFAULT_CONFIG.validation,
        maxSizeValue: 10,
        maxSizeUnit: "MB",
        maxSizeBytes: 10 * 1024 * 1024,
        maxBatchSizeBytes: 50 * 1024 * 1024,
      },
    },
  },

  "drag-drop-upload": {
    id: "drag-drop-upload",
    title: "Drag & Drop Upload Zone",
    subCategory: "Dropzone",
    archetype: "dropzone",
    description: "Accessible drag-and-drop target with responsive drag states, keyboard accessibility, and fallback browse trigger.",
    defaultConfig: {
      ...UNIVERSAL_DEFAULT_CONFIG,
      sourceComponentId: "drag-drop-upload",
      name: "Drag & Drop Upload Zone",
      general: {
        ...UNIVERSAL_DEFAULT_CONFIG.general,
        title: "Click to browse or drag & drop",
        description: "Release your files inside this highlighted drop target",
        helperText: "Instant drag-over feedback & keyboard trigger",
      },
      appearance: {
        ...UNIVERSAL_DEFAULT_CONFIG.appearance,
        borderWidth: 2,
        borderStyle: "dashed",
        borderRadius: "20px",
      },
      fileSelection: {
        ...UNIVERSAL_DEFAULT_CONFIG.fileSelection,
        multiple: true,
        maxFiles: 10,
        acceptedExtensions: "*",
      },
    },
  },

  "image-upload": {
    id: "image-upload",
    title: "Image Upload & Inspection",
    subCategory: "Image",
    archetype: "image",
    description: "Specialized image selector with dimension validation, aspect preview, built-in crop trigger, and compression.",
    defaultConfig: {
      ...UNIVERSAL_DEFAULT_CONFIG,
      sourceComponentId: "image-upload",
      name: "Image Upload & Crop",
      general: {
        ...UNIVERSAL_DEFAULT_CONFIG.general,
        title: "Upload High-Res Image",
        description: "PNG, JPG, WEBP or SVG up to 8 MB · Crop enabled",
        helperText: "Aspect ratio check & client-side canvas crop",
      },
      icons: {
        ...UNIVERSAL_DEFAULT_CONFIG.icons,
        uploadIcon: "Image",
      },
      fileSelection: {
        ...UNIVERSAL_DEFAULT_CONFIG.fileSelection,
        multiple: false,
        maxFiles: 1,
        categoryPreset: "images",
        acceptedExtensions: ".png,.jpg,.jpeg,.webp,.svg",
        acceptMime: "image/*",
      },
      validation: {
        ...UNIVERSAL_DEFAULT_CONFIG.validation,
        maxSizeValue: 8,
        maxSizeUnit: "MB",
        maxSizeBytes: 8 * 1024 * 1024,
        validateDimensions: true,
        minWidth: 400,
        maxWidth: 3840,
        minHeight: 300,
        maxHeight: 2160,
        aspectRatio: "16:9",
      },
      preview: {
        ...UNIVERSAL_DEFAULT_CONFIG.preview,
        showPreview: true,
        aspectRatio: "video",
        allowCrop: true,
        allowCompress: true,
      },
    },
  },

  "document-upload": {
    id: "document-upload",
    title: "Document Upload Center",
    subCategory: "Documents",
    archetype: "document",
    description: "Dedicated uploader for PDF, Word, Excel, and CSV documents with format badges and size calculation.",
    defaultConfig: {
      ...UNIVERSAL_DEFAULT_CONFIG,
      sourceComponentId: "document-upload",
      name: "Document Upload Center",
      general: {
        ...UNIVERSAL_DEFAULT_CONFIG.general,
        title: "Upload Official Documents",
        description: "PDF, Word, Excel, and CSV documents supported",
        helperText: "Maximum 5 files up to 15 MB each",
      },
      icons: {
        ...UNIVERSAL_DEFAULT_CONFIG.icons,
        uploadIcon: "FileText",
      },
      fileSelection: {
        ...UNIVERSAL_DEFAULT_CONFIG.fileSelection,
        multiple: true,
        maxFiles: 5,
        categoryPreset: "documents",
        acceptedExtensions: ".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt",
      },
      validation: {
        ...UNIVERSAL_DEFAULT_CONFIG.validation,
        maxSizeValue: 15,
        maxSizeUnit: "MB",
        maxSizeBytes: 15 * 1024 * 1024,
      },
    },
  },

  "file-preview": {
    id: "file-preview",
    title: "Multi-Format File Preview",
    subCategory: "Preview",
    archetype: "preview",
    description: "Multi-format file preview card rendering PDFs, images, code, archives, audio, video, and documents.",
    defaultConfig: {
      ...UNIVERSAL_DEFAULT_CONFIG,
      sourceComponentId: "file-preview",
      name: "Multi-Format File Preview",
      general: {
        ...UNIVERSAL_DEFAULT_CONFIG.general,
        title: "File Preview Card",
        description: "Inspect file details, dimensions, metadata, and format badges",
      },
      fileSelection: {
        ...UNIVERSAL_DEFAULT_CONFIG.fileSelection,
        multiple: false,
        maxFiles: 1,
        acceptedExtensions: "*",
      },
      preview: {
        ...UNIVERSAL_DEFAULT_CONFIG.preview,
        showPreview: true,
        previewType: "card",
        allowEnlarge: true,
      },
    },
  },

  "avatar-upload": {
    id: "avatar-upload",
    title: "Avatar & Profile Photo Uploader",
    subCategory: "Avatar",
    archetype: "avatar",
    description: "Circular or square avatar uploader with hover camera overlay, 1:1 aspect ratio, crop trigger, and initials fallback.",
    defaultConfig: {
      ...UNIVERSAL_DEFAULT_CONFIG,
      sourceComponentId: "avatar-upload",
      name: "Avatar Photo Uploader",
      general: {
        ...UNIVERSAL_DEFAULT_CONFIG.general,
        title: "Profile Avatar",
        description: "Upload a square portrait photo",
        helperText: "1:1 Aspect ratio · 5 MB max",
        browseBtnLabel: "Change Photo",
      },
      icons: {
        ...UNIVERSAL_DEFAULT_CONFIG.icons,
        uploadIcon: "Camera",
      },
      appearance: {
        ...UNIVERSAL_DEFAULT_CONFIG.appearance,
        borderRadius: "9999px", // Circle by default
      },
      fileSelection: {
        ...UNIVERSAL_DEFAULT_CONFIG.fileSelection,
        multiple: false,
        maxFiles: 1,
        categoryPreset: "images",
        acceptedExtensions: ".png,.jpg,.jpeg,.webp",
        acceptMime: "image/*",
      },
      validation: {
        ...UNIVERSAL_DEFAULT_CONFIG.validation,
        maxSizeValue: 5,
        maxSizeUnit: "MB",
        maxSizeBytes: 5 * 1024 * 1024,
        aspectRatio: "1:1",
        validateDimensions: true,
        minWidth: 128,
        maxWidth: 2048,
        minHeight: 128,
        maxHeight: 2048,
      },
      preview: {
        ...UNIVERSAL_DEFAULT_CONFIG.preview,
        aspectRatio: "square",
        allowCrop: true,
      },
    },
  },
};

/**
 * Maps any catalog slug / component ID to a suitable customization schema.
 */
export function getFileSystemSchema(idOrSlug) {
  if (!idOrSlug) return FILE_SYSTEM_SCHEMAS["basic-file-upload"];

  // Direct match
  if (FILE_SYSTEM_SCHEMAS[idOrSlug]) {
    return FILE_SYSTEM_SCHEMAS[idOrSlug];
  }

  // Component catalog mappings for all 18 components
  if (idOrSlug.includes("avatar")) return FILE_SYSTEM_SCHEMAS["avatar-upload"];
  if (idOrSlug.includes("crop") || idOrSlug.includes("compression") || idOrSlug.includes("dimension")) {
    return FILE_SYSTEM_SCHEMAS["image-upload"];
  }
  if (idOrSlug.includes("document")) return FILE_SYSTEM_SCHEMAS["document-upload"];
  if (idOrSlug.includes("preview")) return FILE_SYSTEM_SCHEMAS["file-preview"];
  if (idOrSlug.includes("multiple") || idOrSlug.includes("queue") || idOrSlug.includes("list") || idOrSlug.includes("progress") || idOrSlug.includes("retry") || idOrSlug.includes("cancel")) {
    return FILE_SYSTEM_SCHEMAS["multiple-file-upload"];
  }
  if (idOrSlug.includes("drag") || idOrSlug.includes("drop")) {
    return FILE_SYSTEM_SCHEMAS["drag-drop-upload"];
  }

  return FILE_SYSTEM_SCHEMAS["basic-file-upload"];
}
