/**
 * Accordion Customizer Configuration & Schemas
 * Defines schemas, defaults, supported controls, presets, and validation for Accordion Customizer.
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

export const ICON_OPTIONS = [
  { label: "Chevron Down", value: "ChevronDown" },
  { label: "Plus / Minus", value: "PlusMinus" },
  { label: "Arrow Down", value: "ArrowDown" },
  { label: "Chevron Right", value: "ChevronRight" },
  { label: "Plus", value: "Plus" },
  { label: "Minus", value: "Minus" },
  { label: "Circle Plus", value: "CirclePlus" },
  { label: "Circle Minus", value: "CircleMinus" },
  { label: "Caret Down", value: "CaretDown" },
];

export const EASING_OPTIONS = [
  { label: "Ease In Out", value: "ease-in-out" },
  { label: "Ease Out", value: "ease-out" },
  { label: "Ease In", value: "ease-in" },
  { label: "Linear", value: "linear" },
  { label: "Cubic Bezier (Bounce)", value: "cubic-bezier(0.34,1.56,0.64,1)" },
  { label: "Cubic Bezier (Swift)", value: "cubic-bezier(0.4,0,0.2,1)" },
];

export const ANIMATION_PRESETS = [
  { label: "None", value: "none", duration: 0, easing: "linear" },
  { label: "Fast", value: "fast", duration: 150, easing: "ease-out" },
  { label: "Smooth", value: "smooth", duration: 300, easing: "ease-in-out" },
  { label: "Gentle", value: "gentle", duration: 500, easing: "cubic-bezier(0.4,0,0.2,1)" },
];

export const BORDER_STYLE_OPTIONS = [
  { label: "Solid", value: "solid" },
  { label: "Dashed", value: "dashed" },
  { label: "Dotted", value: "dotted" },
  { label: "None", value: "none" },
];

export const STYLE_PRESETS = [
  {
    name: "Minimal",
    description: "Clean, no-frills style",
    settings: {
      borderWidth: "0",
      borderStyle: "none",
      borderRadius: "0",
      itemSpacing: "0",
      shadow: "none",
      showDivider: true,
    },
  },
  {
    name: "Outlined",
    description: "Classic bordered accordion",
    settings: {
      borderWidth: "1",
      borderStyle: "solid",
      borderRadius: "8",
      itemSpacing: "4",
      shadow: "none",
      showDivider: false,
    },
  },
  {
    name: "Rounded",
    description: "Soft rounded corners",
    settings: {
      borderWidth: "1",
      borderStyle: "solid",
      borderRadius: "16",
      itemSpacing: "8",
      shadow: "sm",
      showDivider: false,
    },
  },
  {
    name: "Soft Shadow",
    description: "Elevated cards with shadow",
    settings: {
      borderWidth: "1",
      borderStyle: "solid",
      borderRadius: "12",
      itemSpacing: "8",
      shadow: "md",
      showDivider: false,
    },
  },
  {
    name: "Compact",
    description: "Dense, minimal spacing",
    settings: {
      borderWidth: "1",
      borderStyle: "solid",
      borderRadius: "0",
      itemSpacing: "0",
      shadow: "none",
      showDivider: true,
    },
  },
  {
    name: "Modern Card",
    description: "Premium card with rounded corners & shadow",
    settings: {
      borderWidth: "1",
      borderStyle: "solid",
      borderRadius: "20",
      itemSpacing: "12",
      shadow: "lg",
      showDivider: false,
    },
  },
  {
    name: "Separated Items",
    description: "Items with clear visual separation",
    settings: {
      borderWidth: "1",
      borderStyle: "solid",
      borderRadius: "12",
      itemSpacing: "16",
      shadow: "sm",
      showDivider: false,
    },
  },
];

export const COLOR_PALETTES = [
  {
    name: "Default Dark",
    containerBg: "#0f172a",
    itemBg: "#1e293b",
    headerBg: "#1e293b",
    expandedHeaderBg: "#1e3a5f",
    contentBg: "#0f172a",
    borderColor: "#334155",
    titleColor: "#f1f5f9",
    contentColor: "#94a3b8",
    iconColor: "#94a3b8",
    accentColor: "#6366f1",
    hoverBg: "#293548",
  },
  {
    name: "Clean Light",
    containerBg: "#ffffff",
    itemBg: "#f8fafc",
    headerBg: "#f8fafc",
    expandedHeaderBg: "#f0f4ff",
    contentBg: "#ffffff",
    borderColor: "#e2e8f0",
    titleColor: "#1e293b",
    contentColor: "#475569",
    iconColor: "#64748b",
    accentColor: "#6366f1",
    hoverBg: "#f1f5f9",
  },
  {
    name: "Indigo Blue",
    containerBg: "#ffffff",
    itemBg: "#ffffff",
    headerBg: "#ffffff",
    expandedHeaderBg: "#eef2ff",
    contentBg: "#ffffff",
    borderColor: "#c7d2fe",
    titleColor: "#1e1b4b",
    contentColor: "#4338ca",
    iconColor: "#6366f1",
    accentColor: "#6366f1",
    hoverBg: "#f5f3ff",
  },
  {
    name: "Emerald Green",
    containerBg: "#ffffff",
    itemBg: "#ffffff",
    headerBg: "#ffffff",
    expandedHeaderBg: "#ecfdf5",
    contentBg: "#ffffff",
    borderColor: "#a7f3d0",
    titleColor: "#064e3b",
    contentColor: "#065f46",
    iconColor: "#10b981",
    accentColor: "#10b981",
    hoverBg: "#f0fdf4",
  },
  {
    name: "Slate Midnight",
    containerBg: "#020617",
    itemBg: "#0f172a",
    headerBg: "#0f172a",
    expandedHeaderBg: "#1e293b",
    contentBg: "#020617",
    borderColor: "#1e293b",
    titleColor: "#f8fafc",
    contentColor: "#94a3b8",
    iconColor: "#64748b",
    accentColor: "#818cf8",
    hoverBg: "#1e293b",
  },
  {
    name: "Warm Amber",
    containerBg: "#ffffff",
    itemBg: "#fffbeb",
    headerBg: "#fffbeb",
    expandedHeaderBg: "#fef3c7",
    contentBg: "#ffffff",
    borderColor: "#fcd34d",
    titleColor: "#78350f",
    contentColor: "#92400e",
    iconColor: "#d97706",
    accentColor: "#f59e0b",
    hoverBg: "#fef9c3",
  },
];

/** Default configuration for all accordion types */
export const UNIVERSAL_DEFAULT_CONFIG = {
  // General
  name: "My Custom Accordion",
  sectionTitle: "",
  sectionDescription: "",
  showSectionTitle: false,
  width: "100%",
  maxWidth: "100%",
  containerPadding: "0",
  contentAlignment: "left",

  // Behavior
  expansionMode: "single", // 'single' | 'multiple'
  collapsible: true,
  initialExpandedItem: null, // item id
  initialExpandedItems: [], // for multiple mode

  // Items
  items: [],

  // Appearance
  colors: {
    containerBg: "transparent",
    itemBg: "#ffffff",
    headerBg: "#ffffff",
    expandedHeaderBg: "#f0f4ff",
    contentBg: "#ffffff",
    borderColor: "#e2e8f0",
    titleColor: "#1e293b",
    contentColor: "#475569",
    iconColor: "#64748b",
    accentColor: "#6366f1",
    hoverBg: "#f8fafc",
    focusRing: "#6366f1",
    badgeBg: "#e0e7ff",
    badgeText: "#4338ca",
    numberBg: "#f1f5f9",
    numberText: "#1e293b",
    disabledOpacity: "0.5",
  },

  // Borders & Shape
  borders: {
    borderWidth: "1",
    borderStyle: "solid",
    borderRadius: "12",
    itemSpacing: "8",
    showDivider: false,
    dividerThickness: "1",
    dividerColor: "#e2e8f0",
    shadow: "sm",
    hoverShadow: "md",
    expandedShadow: "md",
  },

  // Typography
  typography: {
    fontFamily: "Inter, sans-serif",
    titleFontSize: "16",
    titleFontWeight: "600",
    contentFontSize: "14",
    contentLineHeight: "1.6",
    letterSpacing: "0",
    textAlign: "left",
  },

  // Icons
  icons: {
    expandIcon: "ChevronDown",
    iconSize: "16",
    iconPosition: "right",
    showIcons: true,
    rotateOnExpand: true,
  },

  // Animation
  animation: {
    enabled: true,
    preset: "smooth",
    duration: 300,
    easing: "ease-in-out",
    fadeContent: true,
    rotateIcon: true,
    respectReducedMotion: true,
  },

  // Layout
  layout: {
    headerPaddingX: "20",
    headerPaddingY: "16",
    contentPaddingX: "20",
    contentPaddingY: "16",
    iconAlignment: "center",
    fullWidth: true,
  },

  // Responsive
  responsive: {
    mobileStackThreshold: "640",
    mobileFontSizeTitle: "14",
    mobileFontSizeContent: "13",
  },
};

// Pattern-specific schemas
export const ACCORDION_SCHEMAS = {
  "numbered-accordion": {
    id: "numbered-accordion",
    title: "Numbered FAQ Accordion",
    supportedSections: [
      "general",
      "items",
      "appearance",
      "typography",
      "borders",
      "behavior",
      "animation",
      "accessibility",
    ],
    defaultItems: [
      {
        id: "01",
        title: "What is ATS and why does it matter?",
        content:
          "ATS stands for Applicant Tracking System — software used by companies to filter resumes. If your resume isn't ATS-optimized, it may never be seen.",
        disabled: false,
      },
      {
        id: "02",
        title: "What happens after 7 days on the free plan?",
        content:
          "After your 7-day trial ends, your account transitions to the free starter tier with basic formatting tools.",
        disabled: false,
      },
      {
        id: "03",
        title: "Can I use my own domain name?",
        content:
          "Yes! You can easily link custom domains to host your online interactive resume and portfolio with automatic SSL certificates.",
        disabled: false,
      },
    ],
    patternSpecific: {
      showNumbers: true,
      numberStyle: "bold", // 'bold' | 'regular' | 'circle'
      numberColor: "#1e293b",
      numberSize: "30",
    },
  },

  "filter-accordion": {
    id: "filter-accordion",
    title: "Filter Selection Accordion",
    supportedSections: [
      "general",
      "items",
      "appearance",
      "borders",
      "behavior",
      "animation",
    ],
    defaultItems: [
      {
        id: "company",
        title: "Company",
        options: [
          { id: "google", label: "Google", selected: true },
          { id: "microsoft", label: "Microsoft" },
          { id: "apple", label: "Apple" },
          { id: "amazon", label: "Amazon" },
          { id: "meta", label: "Meta" },
        ],
        disabled: false,
      },
      {
        id: "industry",
        title: "Industry",
        options: [
          { id: "aerospace", label: "Aerospace", selected: true },
          { id: "food", label: "Food", selected: true },
          { id: "mining", label: "Mining" },
          { id: "music", label: "Music" },
          { id: "transportation", label: "Transportation" },
        ],
        disabled: false,
      },
      {
        id: "department",
        title: "Department",
        options: [
          { id: "engineering", label: "Engineering" },
          { id: "design", label: "Product & Design" },
          { id: "marketing", label: "Marketing" },
        ],
        disabled: false,
      },
    ],
    patternSpecific: {
      selectionMode: "multiple", // 'single' | 'multiple'
      showBadgeCount: true,
      checkboxColor: "#2563eb",
      defaultOpenSections: ["company", "industry"],
    },
  },

  "simple-accordion": {
    id: "simple-accordion",
    title: "Simple FAQ Accordion",
    supportedSections: [
      "general",
      "items",
      "appearance",
      "typography",
      "icons",
      "borders",
      "behavior",
      "animation",
      "accessibility",
    ],
    defaultItems: [
      {
        id: "faq-1",
        title: "How does Easy Accordion improve website content organization?",
        content:
          "Easy Accordion organizes lengthy content into responsive collapsible rows, reducing page scroll and cognitive load.",
        disabled: false,
      },
      {
        id: "faq-2",
        title: "How can I customize the accordion design and layout?",
        content:
          "You can customize colors, typography, borders, chevron animations, icons, and padding through simple props.",
        disabled: false,
      },
      {
        id: "faq-3",
        title: "Is Easy Accordion optimized for site speed and performance?",
        content:
          "Built using CSS Grid rows and zero external JS runtime dependencies, it guarantees 60fps animations with minimal bundle size.",
        disabled: false,
      },
    ],
    patternSpecific: {},
  },

  "icon-accordion": {
    id: "icon-accordion",
    title: "Icon Navigation Accordion",
    supportedSections: [
      "general",
      "items",
      "appearance",
      "icons",
      "borders",
      "behavior",
      "animation",
    ],
    defaultItems: [
      {
        id: "health-profile",
        title: "Health Profile",
        content:
          "View and manage your vital health records, medical assessments, and clinical history.",
        icon: "Heart",
        disabled: false,
      },
      {
        id: "group-section",
        title: "Group Section",
        content:
          "Manage departmental group allocations, shared access roles, and team policies.",
        icon: "Users",
        disabled: false,
      },
      {
        id: "mobility",
        title: "Mobility",
        content:
          "Configure mobility assistance requirements, transport options, and physical accommodations.",
        icon: "User",
        disabled: false,
      },
    ],
    patternSpecific: {
      variant: "warm", // 'warm' | 'default' | 'neutral'
    },
  },

  "form-accordion": {
    id: "form-accordion",
    title: "Dynamic Form Accordion",
    supportedSections: [
      "general",
      "items",
      "appearance",
      "borders",
      "behavior",
      "animation",
    ],
    defaultItems: [
      {
        id: "general-info",
        title: "General Info",
        subtitle: "Basic identity and tax filing status",
        required: true,
        icon: "FileText",
        fields: [
          {
            id: "fullName",
            name: "fullName",
            label: "Legal Full Name",
            type: "text",
            placeholder: "Jane Doe",
            required: true,
            defaultValue: "Jane Doe",
          },
          {
            id: "taxYear",
            name: "taxYear",
            label: "Tax Filing Year",
            type: "number",
            defaultValue: 2022,
            required: true,
          },
        ],
        disabled: false,
      },
      {
        id: "income",
        title: "Income",
        subtitle: "Enter your annual earned income",
        icon: "Wallet",
        fields: [
          {
            id: "annualIncome",
            name: "annualIncome",
            label: "How much did you make from your job(s)?",
            type: "number",
            defaultValue: 0,
            required: true,
          },
        ],
        disabled: false,
      },
    ],
    patternSpecific: {
      showRequiredBadge: true,
      submitButtonLabel: "Continue",
      submitButtonColor: "#007b8f",
    },
  },
};

export function getAccordionSchema(sourceComponentId) {
  return ACCORDION_SCHEMAS[sourceComponentId] || ACCORDION_SCHEMAS["simple-accordion"];
}

/** All supported accordion source component IDs for the customizer */
export const SUPPORTED_ACCORDION_IDS = [
  "numbered-accordion",
  "filter-accordion",
  "simple-accordion",
  "icon-accordion",
  "form-accordion",
];

/** Available item icons for icon-accordion and other icon fields */
export const ITEM_ICON_OPTIONS = [
  { label: "None", value: "" },
  { label: "Heart", value: "Heart" },
  { label: "Users", value: "Users" },
  { label: "User", value: "User" },
  { label: "Star", value: "Star" },
  { label: "Settings", value: "Settings" },
  { label: "FileText", value: "FileText" },
  { label: "Wallet", value: "Wallet" },
  { label: "Home", value: "Home" },
  { label: "Mail", value: "Mail" },
  { label: "Phone", value: "Phone" },
  { label: "Globe", value: "Globe" },
  { label: "Briefcase", value: "Briefcase" },
  { label: "CheckCircle", value: "CheckCircle2" },
  { label: "AlertCircle", value: "AlertCircle" },
  { label: "Info", value: "Info" },
  { label: "Layers", value: "Layers" },
  { label: "Glasses", value: "Glasses" },
  { label: "ThumbsUp", value: "ThumbsUp" },
  { label: "Zap", value: "Zap" },
  { label: "Shield", value: "Shield" },
  { label: "Lock", value: "Lock" },
  { label: "Tag", value: "Tag" },
  { label: "Calendar", value: "Calendar" },
  { label: "Clock", value: "Clock" },
  { label: "Banknote", value: "Banknote" },
  { label: "Users2", value: "Users2" },
];
