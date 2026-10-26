/**
 * Modal & Overlay Customizer Configuration & Schemas
 * Defines schemas, defaults, supported controls, presets, and validation for Modal & Overlay Customizer.
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

export const EASING_OPTIONS = [
  { label: "Ease In Out", value: "ease-in-out" },
  { label: "Ease Out", value: "ease-out" },
  { label: "Ease In", value: "ease-in" },
  { label: "Cubic Bezier (Swift)", value: "cubic-bezier(0.16, 1, 0.3, 1)" },
  { label: "Cubic Bezier (Bounce)", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
  { label: "Linear", value: "linear" },
];

export const ANIMATION_PRESETS = [
  { label: "None", value: "none", duration: 0, easing: "linear" },
  { label: "Fast (150ms)", value: "fast", duration: 150, easing: "ease-out" },
  { label: "Smooth (250ms)", value: "smooth", duration: 250, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
  { label: "Gentle (400ms)", value: "gentle", duration: 400, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
  { label: "Spring (350ms)", value: "spring", duration: 350, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
];

export const BORDER_STYLE_OPTIONS = [
  { label: "Solid", value: "solid" },
  { label: "Dashed", value: "dashed" },
  { label: "Dotted", value: "dotted" },
  { label: "None", value: "none" },
];

export const STYLE_PRESETS = [
  {
    name: "Modern Glass",
    description: "Sleek dark translucent panel with subtle border & shadow",
    settings: {
      borderWidth: "1",
      borderStyle: "solid",
      borderRadius: "24",
      shadow: "xl",
      showHeaderDivider: true,
      showFooterDivider: true,
      overlayBg: "#0f172a",
      headerBg: "#090d16",
      footerBg: "#090d16",
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  {
    name: "Minimal Clean",
    description: "Clean minimalist layout without heavy borders",
    settings: {
      borderWidth: "0",
      borderStyle: "none",
      borderRadius: "16",
      shadow: "lg",
      showHeaderDivider: false,
      showFooterDivider: false,
      overlayBg: "#1e293b",
      headerBg: "#1e293b",
      footerBg: "#1e293b",
      borderColor: "transparent",
    },
  },
  {
    name: "Enterprise Outlined",
    description: "Crisp corporate structure with distinct dividers",
    settings: {
      borderWidth: "1",
      borderStyle: "solid",
      borderRadius: "12",
      shadow: "md",
      showHeaderDivider: true,
      showFooterDivider: true,
      overlayBg: "#0b0f19",
      headerBg: "#111827",
      footerBg: "#111827",
      borderColor: "#374151",
    },
  },
  {
    name: "Soft Light",
    description: "Bright airy theme with high contrast dark text",
    settings: {
      borderWidth: "1",
      borderStyle: "solid",
      borderRadius: "20",
      shadow: "xl",
      showHeaderDivider: true,
      showFooterDivider: true,
      overlayBg: "#ffffff",
      headerBg: "#f8fafc",
      footerBg: "#f8fafc",
      borderColor: "#e2e8f0",
      titleColor: "#0f172a",
      textColor: "#334155",
      secondaryTextColor: "#64748b",
      primaryBtnBg: "#4f46e5",
      primaryBtnText: "#ffffff",
      secondaryBtnBg: "#f1f5f9",
      secondaryBtnText: "#334155",
    },
  },
  {
    name: "Vibrant Indigo",
    description: "Deep indigo surfaces with vivid purple accent buttons",
    settings: {
      borderWidth: "1",
      borderStyle: "solid",
      borderRadius: "24",
      shadow: "2xl",
      showHeaderDivider: true,
      showFooterDivider: true,
      overlayBg: "#0d1117",
      headerBg: "#161b22",
      footerBg: "#161b22",
      borderColor: "#30363d",
      accentColor: "#6366f1",
      primaryBtnBg: "#6366f1",
      primaryBtnText: "#ffffff",
    },
  },
];

export const COLOR_PALETTES = [
  {
    name: "Default Dark",
    overlayBg: "#0f172a",
    headerBg: "#090d16",
    footerBg: "#090d16",
    titleColor: "#ffffff",
    textColor: "#cbd5e1",
    secondaryTextColor: "#94a3b8",
    borderColor: "#1e293b",
    backdropColor: "#000000",
    backdropOpacity: 0.75,
    accentColor: "#6366f1",
    primaryBtnBg: "#6366f1",
    primaryBtnText: "#ffffff",
    secondaryBtnBg: "#1e293b",
    secondaryBtnText: "#e2e8f0",
    dangerColor: "#f43f5e",
    successColor: "#10b981",
    warningColor: "#f59e0b",
    inputBg: "#1e293b",
    inputBorder: "#334155",
  },
  {
    name: "Clean Light",
    overlayBg: "#ffffff",
    headerBg: "#f8fafc",
    footerBg: "#f8fafc",
    titleColor: "#0f172a",
    textColor: "#334155",
    secondaryTextColor: "#64748b",
    borderColor: "#e2e8f0",
    backdropColor: "#0f172a",
    backdropOpacity: 0.45,
    accentColor: "#4f46e5",
    primaryBtnBg: "#4f46e5",
    primaryBtnText: "#ffffff",
    secondaryBtnBg: "#f1f5f9",
    secondaryBtnText: "#334155",
    dangerColor: "#e11d48",
    successColor: "#059669",
    warningColor: "#d97706",
    inputBg: "#ffffff",
    inputBorder: "#cbd5e1",
  },
  {
    name: "Indigo Blue",
    overlayBg: "#0b1120",
    headerBg: "#070d18",
    footerBg: "#070d18",
    titleColor: "#f8fafc",
    textColor: "#94a3b8",
    secondaryTextColor: "#64748b",
    borderColor: "#1e293b",
    backdropColor: "#030712",
    backdropOpacity: 0.8,
    accentColor: "#3b82f6",
    primaryBtnBg: "#2563eb",
    primaryBtnText: "#ffffff",
    secondaryBtnBg: "#1e293b",
    secondaryBtnText: "#cbd5e1",
    dangerColor: "#ef4444",
    successColor: "#10b981",
    warningColor: "#f59e0b",
    inputBg: "#0f172a",
    inputBorder: "#1e293b",
  },
  {
    name: "Emerald Glow",
    overlayBg: "#022c22",
    headerBg: "#011c16",
    footerBg: "#011c16",
    titleColor: "#ecfdf5",
    textColor: "#a7f3d0",
    secondaryTextColor: "#6ee7b7",
    borderColor: "#065f46",
    backdropColor: "#000000",
    backdropOpacity: 0.8,
    accentColor: "#10b981",
    primaryBtnBg: "#059669",
    primaryBtnText: "#ffffff",
    secondaryBtnBg: "#064e3b",
    secondaryBtnText: "#d1fae5",
    dangerColor: "#f43f5e",
    successColor: "#34d399",
    warningColor: "#fbbf24",
    inputBg: "#064e3b",
    inputBorder: "#047857",
  },
  {
    name: "Midnight Violet",
    overlayBg: "#180d2b",
    headerBg: "#10081d",
    footerBg: "#10081d",
    titleColor: "#faf5ff",
    textColor: "#e9d5ff",
    secondaryTextColor: "#c084fc",
    borderColor: "#3b1d6e",
    backdropColor: "#050014",
    backdropOpacity: 0.82,
    accentColor: "#a855f7",
    primaryBtnBg: "#9333ea",
    primaryBtnText: "#ffffff",
    secondaryBtnBg: "#2e1065",
    secondaryBtnText: "#f3e8ff",
    dangerColor: "#f43f5e",
    successColor: "#10b981",
    warningColor: "#f59e0b",
    inputBg: "#241242",
    inputBorder: "#4c1d95",
  },
  {
    name: "Warm Amber",
    overlayBg: "#fffbeb",
    headerBg: "#fef3c7",
    footerBg: "#fef3c7",
    titleColor: "#78350f",
    textColor: "#92400e",
    secondaryTextColor: "#b45309",
    borderColor: "#fde68a",
    backdropColor: "#451a03",
    backdropOpacity: 0.5,
    accentColor: "#d97706",
    primaryBtnBg: "#d97706",
    primaryBtnText: "#ffffff",
    secondaryBtnBg: "#fef3c7",
    secondaryBtnText: "#78350f",
    dangerColor: "#dc2626",
    successColor: "#16a34a",
    warningColor: "#d97706",
    inputBg: "#ffffff",
    inputBorder: "#fde68a",
  },
];

export const ICON_OPTIONS = [
  { label: "Layers", value: "Layers" },
  { label: "Sparkles", value: "Sparkles" },
  { label: "Settings", value: "Settings" },
  { label: "Check Circle", value: "CheckCircle2" },
  { label: "Alert Triangle", value: "AlertTriangle" },
  { label: "Info", value: "Info" },
  { label: "Help Circle", value: "HelpCircle" },
  { label: "Folder Plus", value: "FolderPlus" },
  { label: "Trash", value: "Trash2" },
  { label: "Sliders", value: "SlidersHorizontal" },
  { label: "Search", value: "Search" },
  { label: "Lock", value: "Lock" },
  { label: "Shield", value: "Shield" },
  { label: "User", value: "User" },
  { label: "Mail", value: "Mail" },
  { label: "Bell", value: "Bell" },
  { label: "External Link", value: "ExternalLink" },
];

export const UNIVERSAL_DEFAULT_CONFIG = {
  id: "custom-overlay",
  name: "Customized Overlay",
  sourceComponentId: "basic-modal",
  overlayType: "modal", // 'modal' | 'dialog' | 'drawer' | 'popover' | 'tooltip' | 'menu' | 'command'

  dimensions: {
    sizePreset: "md", // 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'custom'
    width: "100%",
    maxWidth: "540px",
    minHeight: "auto",
    maxHeight: "85vh",
    padding: 24,
  },

  content: {
    title: "Modal Title",
    subtitle: "",
    description: "Review details and confirm your selection.",
    badgeText: "",
    headerIcon: "Layers",
    contentText:
      "This is a fully customizable modal dialog rendered using accessible portal primitives, focus trapping, and background scroll locking.",
    footerText: "",
    formFields: [
      { id: "field-1", name: "projectName", label: "Project Name", type: "text", placeholder: "e.g. Acme Dashboard", required: true, defaultValue: "" },
      { id: "field-2", name: "category", label: "Category", type: "select", options: ["web", "mobile", "desktop", "api"], required: true, defaultValue: "web" },
      { id: "field-3", name: "description", label: "Description", type: "textarea", placeholder: "Describe the scope of this project...", required: false, defaultValue: "" },
    ],
    menuItems: [
      { id: "item-1", label: "Edit Details", icon: "Edit3", shortcut: "⌘E" },
      { id: "item-2", label: "Copy Link", icon: "Copy", shortcut: "⌘C" },
      { id: "item-3", label: "View Analytics", icon: "BarChart", shortcut: "" },
      { separator: true },
      { id: "item-4", label: "Delete Project", icon: "Trash2", destructive: true, shortcut: "⌫" },
    ],
    commandItems: [
      { id: "cmd-1", label: "Create New Project", category: "Actions", shortcut: "⌘N", icon: "FolderPlus" },
      { id: "cmd-2", label: "Search Components", category: "Navigation", shortcut: "⌘F", icon: "Search" },
      { id: "cmd-3", label: "Open Settings", category: "Preferences", shortcut: "⌘,", icon: "Settings" },
      { id: "cmd-4", label: "Export Workspace", category: "Actions", shortcut: "⌘E", icon: "Download" },
    ],
    confirmText: "Confirm Action",
    cancelText: "Cancel",
    actionText: "Save Changes",
    alertVariant: "warning", // 'info' | 'success' | 'warning' | 'error'
  },

  colors: {
    overlayBg: "#0f172a",
    headerBg: "#090d16",
    footerBg: "#090d16",
    titleColor: "#ffffff",
    textColor: "#cbd5e1",
    secondaryTextColor: "#94a3b8",
    borderColor: "#1e293b",
    backdropColor: "#000000",
    backdropOpacity: 0.75,
    accentColor: "#6366f1",
    primaryBtnBg: "#6366f1",
    primaryBtnText: "#ffffff",
    secondaryBtnBg: "#1e293b",
    secondaryBtnText: "#e2e8f0",
    dangerColor: "#f43f5e",
    successColor: "#10b981",
    warningColor: "#f59e0b",
    inputBg: "#1e293b",
    inputBorder: "#334155",
    hoverBg: "#1e293b",
  },

  borders: {
    borderWidth: "1",
    borderStyle: "solid",
    borderRadius: "24",
    shadow: "xl",
    showHeaderDivider: true,
    showFooterDivider: true,
  },

  typography: {
    fontFamily: "Inter, sans-serif",
    titleFontSize: 18,
    titleFontWeight: 700,
    bodyFontSize: 14,
    bodyLineHeight: 1.6,
    alignment: "left",
  },

  headerFooter: {
    showHeader: true,
    showFooter: true,
    showCloseButton: true,
    headerPaddingX: 24,
    headerPaddingY: 16,
    footerPaddingX: 24,
    footerPaddingY: 16,
  },

  buttons: {
    showPrimary: true,
    showSecondary: true,
    primaryLabel: "Save Changes",
    secondaryLabel: "Cancel",
    primaryVariant: "solid", // 'solid' | 'outline' | 'gradient'
    buttonRadius: "12",
    buttonSize: "md",
    buttonAlignment: "right", // 'left' | 'center' | 'right' | 'space-between'
  },

  backdrop: {
    enabled: true,
    blur: true,
    color: "#000000",
    opacity: 0.75,
    closeOnClick: true,
  },

  animation: {
    enabled: true,
    preset: "smooth",
    openDuration: 250,
    closeDuration: 200,
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionType: "scale-fade", // 'scale-fade' | 'slide' | 'fade'
  },

  interaction: {
    closeOnEscape: true,
    closeOnOutsideClick: true,
    trapFocus: true,
    restoreFocus: true,
    lockBodyScroll: true,
    preventAccidentalClose: false,
    fullScreenOnMobile: true,
  },

  patternSpecific: {
    // Drawer
    side: "right", // 'right' | 'left' | 'top' | 'bottom'
    drawerWidth: "384px",
    drawerHeight: "360px",

    // Popover & Tooltip
    placement: "bottom", // 'top' | 'bottom' | 'left' | 'right'
    align: "center", // 'start' | 'center' | 'end'
    offset: 8,
    showArrow: false,
    delay: 200,

    // Confirm & Alert
    confirmVariant: "danger", // 'danger' | 'warning' | 'info' | 'success'
    alertVariant: "warning", // 'info' | 'success' | 'warning' | 'error'
    simulateLoading: true,

    // Command menu
    searchPlaceholder: "Type a command or search...",
    shortcutKey: "⌘K",
  },
};

export const SUPPORTED_OVERLAY_IDS = [
  "basic-modal",
  "form-modal",
  "dialog",
  "confirm-dialog",
  "alert-dialog",
  "drawer",
  "bottom-sheet",
  "side-sheet",
  "popover",
  "tooltip",
  "context-menu",
  "dropdown-menu",
  "command-menu",
];

export const OVERLAY_PATTERNS = {
  "basic-modal": {
    id: "basic-modal",
    name: "Basic Modal",
    overlayType: "modal",
    category: "Modals",
    tag: "Modal",
    theme: "indigo",
    description: "Centered dialog with backdrop blur, scale entrance, and clean footer actions.",
    defaultConfig: {
      content: {
        title: "Project Information",
        description: "Review your project details, members, and repository access settings.",
        contentText:
          "Modal dialogs isolate critical user tasks from the surrounding UI without navigation disruption. All keyboard navigation and focus trapping remain constrained.",
        actionText: "Save Details",
      },
      dimensions: {
        sizePreset: "md",
        maxWidth: "540px",
      },
    },
  },

  "form-modal": {
    id: "form-modal",
    name: "Form Modal",
    overlayType: "modal",
    category: "Modals",
    tag: "Form",
    theme: "purple",
    description: "Form dialog with inputs, dynamic validation, loading states, and submit action.",
    defaultConfig: {
      content: {
        title: "Create New Project",
        description: "Configure workspace parameters to initialize the repository template.",
        actionText: "Create Project",
        formFields: [
          { id: "f1", name: "projectName", label: "Project Name", type: "text", placeholder: "e.g. Alpha Design System", required: true, defaultValue: "" },
          { id: "f2", name: "visibility", label: "Repository Visibility", type: "select", options: ["private", "public", "internal"], required: true, defaultValue: "private" },
          { id: "f3", name: "description", label: "Project Summary", type: "textarea", placeholder: "Provide an executive overview...", required: false, defaultValue: "" },
        ],
      },
      dimensions: {
        sizePreset: "md",
        maxWidth: "560px",
      },
    },
  },

  "dialog": {
    id: "dialog",
    name: "Configuration Dialog",
    overlayType: "dialog",
    category: "Dialogs",
    tag: "Dialog",
    theme: "blue",
    description: "Multi-action application dialog designed for settings and preferences.",
    defaultConfig: {
      content: {
        title: "Workspace Settings",
        description: "Manage automatic deployments, build webhooks, and team roles.",
        contentText:
          "Configure workspace notifications, telemetry, and automated code review parameters before deploying to staging.",
        actionText: "Apply Configuration",
      },
      dimensions: {
        sizePreset: "lg",
        maxWidth: "640px",
      },
    },
  },

  "confirm-dialog": {
    id: "confirm-dialog",
    name: "Confirmation Dialog",
    overlayType: "dialog",
    category: "Feedback",
    tag: "Confirm",
    theme: "red",
    description: "Destructive confirmation modal with warning icons and loading simulation.",
    defaultConfig: {
      content: {
        title: "Delete Repository Component?",
        description: "This action cannot be undone. All component files, assets, and history will be permanently deleted.",
        confirmText: "Delete Component",
        cancelText: "Keep Component",
        headerIcon: "Trash2",
      },
      patternSpecific: {
        confirmVariant: "danger",
        simulateLoading: true,
      },
      colors: {
        primaryBtnBg: "#e11d48",
        dangerColor: "#f43f5e",
        accentColor: "#e11d48",
      },
      dimensions: {
        sizePreset: "sm",
        maxWidth: "460px",
      },
    },
  },

  "alert-dialog": {
    id: "alert-dialog",
    name: "Alert Dialog",
    overlayType: "dialog",
    category: "Feedback",
    tag: "Alert",
    theme: "amber",
    description: "Announcement alert dialog with dedicated warning, info, and success variants.",
    defaultConfig: {
      content: {
        title: "Unsaved Changes Detected",
        description: "You have unpublished customizations in the canvas that will be lost if you leave now.",
        actionText: "Discard Changes",
        cancelText: "Keep Editing",
        headerIcon: "AlertTriangle",
      },
      patternSpecific: {
        alertVariant: "warning",
      },
      colors: {
        primaryBtnBg: "#d97706",
        warningColor: "#f59e0b",
        accentColor: "#d97706",
      },
      dimensions: {
        sizePreset: "sm",
        maxWidth: "460px",
      },
    },
  },

  "drawer": {
    id: "drawer",
    name: "Sliding Drawer",
    overlayType: "drawer",
    category: "Drawers",
    tag: "Drawer",
    theme: "teal",
    description: "Multi-direction sliding side panel (right, left, top, bottom) with fluid transitions.",
    defaultConfig: {
      content: {
        title: "Template Inspection",
        description: "Inspect component structure, dependencies, and code metrics.",
        contentText:
          "Sliding drawers offer spacious side-stage canvas for complex contextual navigation and property tweaking without losing context of your main view.",
        actionText: "Export Spec",
      },
      patternSpecific: {
        side: "right",
        drawerWidth: "420px",
        drawerHeight: "360px",
      },
      dimensions: {
        maxWidth: "420px",
      },
    },
  },

  "bottom-sheet": {
    id: "bottom-sheet",
    name: "Mobile Bottom Sheet",
    overlayType: "drawer",
    category: "Drawers",
    tag: "Sheet",
    theme: "cyan",
    description: "Ergonomic mobile bottom sheet with drag handle indicator and action items.",
    defaultConfig: {
      content: {
        title: "Quick Actions",
        description: "Perform immediate operations on the selected component.",
        menuItems: [
          { id: "bs-1", label: "Download ZIP Package", icon: "Download" },
          { id: "bs-2", label: "Duplicate Template", icon: "Copy" },
          { id: "bs-3", label: "Share Design Link", icon: "ExternalLink" },
          { separator: true },
          { id: "bs-4", label: "Remove from Workspace", icon: "Trash2", destructive: true },
        ],
      },
      patternSpecific: {
        side: "bottom",
        drawerHeight: "340px",
      },
      dimensions: {
        maxWidth: "500px",
      },
    },
  },

  "side-sheet": {
    id: "side-sheet",
    name: "Filter Side Sheet",
    overlayType: "drawer",
    category: "Drawers",
    tag: "Side Sheet",
    theme: "emerald",
    description: "Facet filter panel for searching, multi-tag filtering, and setting parameters.",
    defaultConfig: {
      content: {
        title: "Filter Components",
        description: "Refine catalog items by tech stack, component family, and tags.",
        actionText: "Apply Filters (3)",
      },
      patternSpecific: {
        side: "right",
        drawerWidth: "400px",
      },
      dimensions: {
        maxWidth: "400px",
      },
    },
  },

  "popover": {
    id: "popover",
    name: "Floating Popover",
    overlayType: "popover",
    category: "Floating",
    tag: "Popover",
    theme: "orange",
    description: "Floating contextual card dynamically placed relative to trigger element.",
    defaultConfig: {
      content: {
        title: "Canvas Dimensions",
        description: "Select fluid viewport width for preview testing.",
        contentText: "Choose between desktop, tablet, or mobile responsive simulation frames.",
      },
      patternSpecific: {
        placement: "bottom",
        align: "center",
        offset: 10,
        showArrow: true,
      },
      backdrop: {
        enabled: false,
      },
      dimensions: {
        maxWidth: "300px",
      },
    },
  },

  "tooltip": {
    id: "tooltip",
    name: "Interactive Tooltip",
    overlayType: "tooltip",
    category: "Floating",
    tag: "Tooltip",
    theme: "slate",
    description: "Accessible micro-hover info balloon with customizable direction and delay.",
    defaultConfig: {
      content: {
        title: "",
        contentText: "Copy JSX component code directly to clipboard",
      },
      patternSpecific: {
        placement: "top",
        delay: 200,
        showArrow: true,
      },
      backdrop: {
        enabled: false,
      },
      dimensions: {
        maxWidth: "240px",
        padding: 8,
      },
      borders: {
        borderRadius: "8",
      },
    },
  },

  "context-menu": {
    id: "context-menu",
    name: "Custom Context Menu",
    overlayType: "menu",
    category: "Menus",
    tag: "Context",
    theme: "indigo",
    description: "Desktop right-click context menu with keyboard shortcuts and actions.",
    defaultConfig: {
      content: {
        menuItems: [
          { id: "cm-1", label: "Inspect Element", icon: "Layers", shortcut: "⌥⌘I" },
          { id: "cm-2", label: "Copy Snippet", icon: "Copy", shortcut: "⌘C" },
          { id: "cm-3", label: "Open in Editor", icon: "ExternalLink", shortcut: "⌘O" },
          { separator: true },
          { id: "cm-4", label: "Delete Component", icon: "Trash2", destructive: true, shortcut: "⌫" },
        ],
      },
      backdrop: {
        enabled: false,
      },
      dimensions: {
        maxWidth: "240px",
      },
      borders: {
        borderRadius: "14",
      },
    },
  },

  "dropdown-menu": {
    id: "dropdown-menu",
    name: "Dropdown Menu",
    overlayType: "menu",
    category: "Menus",
    tag: "Dropdown",
    theme: "purple",
    description: "Versatile click trigger dropdown with shortcut badges and grouped items.",
    defaultConfig: {
      content: {
        menuItems: [
          { id: "dm-1", label: "Export Package", icon: "Download", shortcut: "⌘E" },
          { id: "dm-2", label: "Template Settings", icon: "Settings", shortcut: "⌘," },
          { separator: true },
          { id: "dm-3", label: "Upgrade to Pro", icon: "Sparkles", shortcut: "" },
        ],
      },
      patternSpecific: {
        placement: "bottom",
        align: "end",
        offset: 6,
      },
      backdrop: {
        enabled: false,
      },
      dimensions: {
        maxWidth: "220px",
      },
      borders: {
        borderRadius: "14",
      },
    },
  },

  "command-menu": {
    id: "command-menu",
    name: "Command Palette (⌘K)",
    overlayType: "command",
    category: "Command",
    tag: "Palette",
    theme: "fuchsia",
    description: "Global keyboard-driven command palette with fuzzy search across templates.",
    defaultConfig: {
      content: {
        title: "Command Palette",
        commandItems: [
          { id: "c1", label: "Create New Template", category: "Actions", shortcut: "⌘N", icon: "FolderPlus" },
          { id: "c2", label: "Search Overlay Registry", category: "Navigation", shortcut: "⌘F", icon: "Search" },
          { id: "c3", label: "Export Customized Design", category: "Actions", shortcut: "⌘S", icon: "Download" },
          { id: "c4", label: "Preferences & Theme", category: "Preferences", shortcut: "⌘,", icon: "Settings" },
        ],
      },
      dimensions: {
        sizePreset: "lg",
        maxWidth: "600px",
      },
      patternSpecific: {
        shortcutKey: "⌘K",
        searchPlaceholder: "Type a command or search templates...",
      },
    },
  },
};

export function getOverlaySchema(id) {
  return OVERLAY_PATTERNS[id] || OVERLAY_PATTERNS["basic-modal"];
}
