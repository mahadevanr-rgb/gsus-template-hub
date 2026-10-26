/**
 * Navigation Customizer Configuration & Schemas
 * Provides schemas, presets, palettes, and default configurations for all 14 navigation components.
 */

export const FONT_OPTIONS = [
  { label: "Inter (Default)", value: "Inter, sans-serif" },
  { label: "Outfit (Modern Sans)", value: "Outfit, sans-serif" },
  { label: "Plus Jakarta Sans", value: "'Plus Jakarta Sans', sans-serif" },
  { label: "Roboto (Clean)", value: "Roboto, sans-serif" },
  { label: "System UI", value: "system-ui, -apple-system, sans-serif" },
  { label: "Monospace (Code)", value: "ui-monospace, monospace" },
  { label: "Georgia (Editorial)", value: "Georgia, serif" },
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

export const INDICATOR_STYLES = [
  { id: "pill", label: "Pill Background" },
  { id: "underline", label: "Bottom Underline" },
  { id: "left-bar", label: "Left Accent Bar" },
  { id: "glow", label: "Glow & Shadow" },
  { id: "subtle-bg", label: "Subtle Soft Surface" },
];

export const COLOR_PALETTES = [
  {
    name: "Default Dark",
    surfaceBg: "#0f172a",
    headerBg: "#090d16",
    activeBg: "#4f46e5",
    activeText: "#ffffff",
    inactiveText: "#94a3b8",
    hoverBg: "rgba(255, 255, 255, 0.06)",
    hoverText: "#ffffff",
    borderColor: "#1e293b",
    badgeBg: "#6366f1",
    badgeText: "#ffffff",
    accent: "#6366f1",
  },
  {
    name: "Clean Light",
    surfaceBg: "#ffffff",
    headerBg: "#f8fafc",
    activeBg: "#4f46e5",
    activeText: "#ffffff",
    inactiveText: "#64748b",
    hoverBg: "#f1f5f9",
    hoverText: "#0f172a",
    borderColor: "#e2e8f0",
    badgeBg: "#e0e7ff",
    badgeText: "#4338ca",
    accent: "#4f46e5",
  },
  {
    name: "Indigo Night",
    surfaceBg: "#0b1120",
    headerBg: "#070d18",
    activeBg: "#2563eb",
    activeText: "#ffffff",
    inactiveText: "#94a3b8",
    hoverBg: "rgba(37, 99, 235, 0.12)",
    hoverText: "#60a5fa",
    borderColor: "#1e293b",
    badgeBg: "#1d4ed8",
    badgeText: "#dbeafe",
    accent: "#3b82f6",
  },
  {
    name: "Emerald Forest",
    surfaceBg: "#022c22",
    headerBg: "#011c16",
    activeBg: "#059669",
    activeText: "#ffffff",
    inactiveText: "#a7f3d0",
    hoverBg: "rgba(5, 150, 105, 0.15)",
    hoverText: "#34d399",
    borderColor: "#065f46",
    badgeBg: "#047857",
    badgeText: "#ecfdf5",
    accent: "#10b981",
  },
  {
    name: "Midnight Violet",
    surfaceBg: "#180d2b",
    headerBg: "#10081d",
    activeBg: "#9333ea",
    activeText: "#ffffff",
    inactiveText: "#e9d5ff",
    hoverBg: "rgba(147, 51, 234, 0.15)",
    hoverText: "#c084fc",
    borderColor: "#3b1d6e",
    badgeBg: "#7e22ce",
    badgeText: "#faf5ff",
    accent: "#a855f7",
  },
  {
    name: "Warm Amber",
    surfaceBg: "#fffbeb",
    headerBg: "#fef3c7",
    activeBg: "#d97706",
    activeText: "#ffffff",
    inactiveText: "#92400e",
    hoverBg: "#fde68a",
    hoverText: "#78350f",
    borderColor: "#fcd34d",
    badgeBg: "#b45309",
    badgeText: "#ffffff",
    accent: "#f59e0b",
  },
  {
    name: "Cyber Cyan",
    surfaceBg: "#05131e",
    headerBg: "#030c14",
    activeBg: "#0891b2",
    activeText: "#ffffff",
    inactiveText: "#67e8f9",
    hoverBg: "rgba(8, 145, 178, 0.15)",
    hoverText: "#22d3ee",
    borderColor: "#155e75",
    badgeBg: "#0e7490",
    badgeText: "#ecfeff",
    accent: "#06b6d4",
  },
];

export const STYLE_PRESETS = [
  {
    name: "Modern Glass",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 16,
    shadow: "xl",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  {
    name: "Minimal Clean",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    shadow: "sm",
    borderColor: "#e2e8f0",
  },
  {
    name: "Rounded Floating",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 24,
    shadow: "2xl",
    borderColor: "#334155",
  },
  {
    name: "Enterprise Flat",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 6,
    shadow: "none",
    borderColor: "#1e293b",
  },
];

export const SUPPORTED_NAVIGATION_IDS = [
  "navbar",
  "header",
  "sidebar",
  "breadcrumb",
  "tabs",
  "nested-tabs",
  "bottom-navigation",
  "stepper",
  "menu",
  "dropdown-menu",
  "mega-menu",
  "context-menu",
  "command-palette",
  "navigation-drawer",
];

export const NAVIGATION_PATTERNS = {
  navbar: {
    id: "navbar",
    name: "Navbar",
    subCategory: "Bar & Header",
    tag: "Core",
    theme: "indigo",
    description: "Responsive top navigation bar with brand logo, dropdown items, mobile drawer, and action buttons.",
    defaultItems: [
      { id: "1", label: "Overview", href: "#overview", active: true },
      {
        id: "2",
        label: "Products",
        href: "#products",
        children: [
          { id: "2-1", label: "Edge Computing", description: "Distributed container nodes", href: "#edge" },
          { id: "2-2", label: "Global Mesh", description: "Zero-latency VPC interconnects", href: "#mesh" },
          { id: "2-3", label: "Security Shield", description: "DDoS and WAF protection", href: "#shield" },
        ],
      },
      { id: "3", label: "Solutions", href: "#solutions" },
      { id: "4", label: "Pricing", href: "#pricing" },
      { id: "5", label: "Documentation", href: "#docs" },
    ],
  },
  header: {
    id: "header",
    name: "Header",
    subCategory: "Bar & Header",
    tag: "Layout",
    theme: "purple",
    description: "Configurable application header with breadcrumbs, search integration, notifications, and user avatar.",
    defaultItems: [
      { id: "1", label: "Dashboard", href: "/dashboard" },
      { id: "2", label: "Infrastructure", href: "/infra" },
      { id: "3", label: "Deployment #142", href: "#", active: true },
    ],
  },
  sidebar: {
    id: "sidebar",
    name: "Sidebar",
    subCategory: "Panels & Drawers",
    tag: "Core",
    theme: "indigo",
    description: "Data-driven collapsible sidebar with nested groups, badge counts, collapsed tooltips, and keyboard navigation.",
    defaultGroups: [
      {
        id: "g1",
        title: "Platform Core",
        items: [
          { id: "dashboard", label: "Dashboard", href: "#dashboard", icon: "LayoutDashboard", badge: "Live" },
          {
            id: "analytics",
            label: "Analytics",
            icon: "BarChart3",
            children: [
              { id: "realtime", label: "Realtime Feeds", href: "#realtime" },
              { id: "reports", label: "Monthly Reports", href: "#reports" },
              { id: "conversions", label: "Conversions", href: "#conversions" },
            ],
          },
          { id: "projects", label: "Projects", href: "#projects", icon: "FolderKanban", badge: "8" },
        ],
      },
      {
        id: "g2",
        title: "Workspace & Team",
        items: [
          { id: "team", label: "Team Members", href: "#team", icon: "Users" },
          { id: "settings", label: "Settings", href: "#settings", icon: "Settings" },
        ],
      },
    ],
  },
  breadcrumb: {
    id: "breadcrumb",
    name: "Breadcrumb",
    subCategory: "Path & Tabs",
    tag: "Essential",
    theme: "blue",
    description: "Hierarchical trail with configurable separators, icons, responsive truncation, and accessibility tags.",
    defaultItems: [
      { id: "1", label: "Home", href: "/" },
      { id: "2", label: "Cloud Services", href: "/services" },
      { id: "3", label: "Databases", href: "/services/db" },
      { id: "4", label: "PostgreSQL Clusters", href: "#", current: true },
    ],
  },
  tabs: {
    id: "tabs",
    name: "Tabs",
    subCategory: "Path & Tabs",
    tag: "WAI-ARIA",
    theme: "indigo",
    description: "WAI-ARIA accessible tabs with keyboard arrow roving focus, horizontal & vertical modes, and 4 visual variants.",
    defaultItems: [
      { id: "overview", label: "Overview", badge: null },
      { id: "deployments", label: "Deployments", badge: "3" },
      { id: "variables", label: "Environment Variables", badge: null },
      { id: "logs", label: "Build Logs", badge: "Live" },
      { id: "security", label: "Security & Access", badge: null },
    ],
  },
  "nested-tabs": {
    id: "nested-tabs",
    name: "Nested Tabs",
    subCategory: "Path & Tabs",
    tag: "Compound",
    theme: "purple",
    description: "Two-level hierarchical tab disclosure with automatic state reset and child synchronization.",
    defaultItems: [
      {
        id: "frontend",
        label: "Frontend Web",
        children: [
          { id: "react", label: "React 19" },
          { id: "vite", label: "Vite Bundler" },
          { id: "tailwind", label: "Tailwind CSS" },
        ],
      },
      {
        id: "backend",
        label: "Backend Engine",
        children: [
          { id: "node", label: "Node.js Core" },
          { id: "edge", label: "Cloudflare Workers" },
          { id: "graphql", label: "GraphQL Mesh" },
        ],
      },
      {
        id: "devops",
        label: "DevOps & CI",
        children: [
          { id: "github", label: "GitHub Actions" },
          { id: "docker", label: "Containers" },
          { id: "kubernetes", label: "K8s Ingress" },
        ],
      },
    ],
  },
  "bottom-navigation": {
    id: "bottom-navigation",
    name: "Bottom Navigation",
    subCategory: "Mobile & Stepper",
    tag: "Mobile",
    theme: "emerald",
    description: "Mobile-first navigation bar with icon badges, active indicator, action button, and safe-area padding.",
    defaultItems: [
      { id: "home", label: "Home", icon: "Home" },
      { id: "explore", label: "Explore", icon: "Compass" },
      { id: "activity", label: "Activity", icon: "Bell", badge: "5" },
      { id: "profile", label: "Profile", icon: "User" },
    ],
  },
  stepper: {
    id: "stepper",
    name: "Stepper",
    subCategory: "Mobile & Stepper",
    tag: "Wizard",
    theme: "amber",
    description: "Multi-step workflow wizard with validation gating, horizontal/vertical layouts, and error states.",
    defaultItems: [
      { id: "1", title: "Account Details", description: "Personal & organization identity" },
      { id: "2", title: "Select Tier", description: "Pricing plan & quota allocations" },
      { id: "3", title: "Payment Info", description: "Credit card or invoice billing" },
      { id: "4", title: "Review & Deploy", description: "Final confirmation & provisioning" },
    ],
  },
  menu: {
    id: "menu",
    name: "Menu",
    subCategory: "Menus & Overlays",
    tag: "Menu",
    theme: "indigo",
    description: "General-purpose standalone menu list with keyboard navigation, hotkeys, separators, and nested submenus.",
    defaultItems: [
      { id: "edit", label: "Edit Component", icon: "Edit3", shortcut: "⌘E" },
      { id: "duplicate", label: "Duplicate Template", icon: "Copy", shortcut: "⌘D" },
      { id: "share", label: "Share Workspace", icon: "Share2", shortcut: "⌘S" },
      { separator: true },
      { id: "delete", label: "Delete Project", icon: "Trash2", shortcut: "⌫", danger: true },
    ],
  },
  "dropdown-menu": {
    id: "dropdown-menu",
    name: "Dropdown Menu",
    subCategory: "Menus & Overlays",
    tag: "Overlay",
    theme: "blue",
    description: "Anchored popup menu with viewport boundary awareness, click-outside, and escape-key handling.",
    defaultItems: [
      { id: "view", label: "View Details", icon: "Eye" },
      { id: "export", label: "Export as ZIP", icon: "Download", shortcut: "⌘E" },
      { id: "settings", label: "Configuration", icon: "Settings" },
      { separator: true },
      { id: "archive", label: "Archive Item", icon: "Archive", danger: true },
    ],
  },
  "mega-menu": {
    id: "mega-menu",
    name: "Mega Menu",
    subCategory: "Menus & Overlays",
    tag: "Enterprise",
    theme: "violet",
    description: "Multi-column desktop disclosure with featured highlights, rich link descriptions, and mobile adaptation.",
    defaultColumns: [
      {
        id: "c1",
        title: "Compute & Nodes",
        links: [
          { id: "l1", label: "Virtual Private Cloud", desc: "Isolated network spaces" },
          { id: "l2", label: "Edge Kubernetes", desc: "Low-latency regional clusters" },
          { id: "l3", label: "GPU Clusters", desc: "High-throughput inference units" },
        ],
      },
      {
        id: "c2",
        title: "Storage & State",
        links: [
          { id: "l4", label: "Object Storage S3", desc: "Encrypted distributed buckets" },
          { id: "l5", label: "Managed Postgres", desc: "Automated scaling & replicas" },
          { id: "l6", label: "Redis Vector Cache", desc: "Sub-millisecond semantic search" },
        ],
      },
      {
        id: "c3",
        title: "Developer Tools",
        links: [
          { id: "l7", label: "CLI & SDKs", desc: "Command-line deploy utilities" },
          { id: "l8", label: "API Gateway", desc: "Rate limiting & auth tokens" },
          { id: "l9", label: "Observability Hub", desc: "Distributed metrics & traces" },
        ],
      },
    ],
  },
  "context-menu": {
    id: "context-menu",
    name: "Context Menu",
    subCategory: "Menus & Overlays",
    tag: "Interaction",
    theme: "rose",
    description: "Cursor-anchored right-click menu with viewport edge detection and local event containment.",
    defaultItems: [
      { id: "inspect", label: "Inspect Element", icon: "Search", shortcut: "⌥⌘I" },
      { id: "copy", label: "Copy JSX Snippet", icon: "Copy", shortcut: "⌘C" },
      { id: "edit", label: "Open in Customizer", icon: "Sliders", shortcut: "⌘O" },
      { separator: true },
      { id: "delete", label: "Delete Selection", icon: "Trash2", shortcut: "⌫", danger: true },
    ],
  },
  "command-palette": {
    id: "command-palette",
    name: "Command Palette",
    subCategory: "Menus & Overlays",
    tag: "Keyboard",
    theme: "indigo",
    description: "Global keyboard command center (⌘K) with category groupings, route execution, and theme toggle.",
    defaultItems: [
      { id: "c1", label: "Create New Project", group: "Actions", shortcut: "⌘N", icon: "Sparkles" },
      { id: "c2", label: "Open Studio Settings", group: "Preferences", shortcut: "⌘,", icon: "Settings" },
      { id: "c3", label: "Export Standalone ZIP", group: "Export", shortcut: "⌘E", icon: "Download" },
      { id: "c4", label: "Toggle Dark Theme", group: "Appearance", shortcut: "⌘D", icon: "Sun" },
      { id: "c5", label: "Clear Local Cache", group: "System", shortcut: "⌘⌫", icon: "Trash2" },
    ],
  },
  "navigation-drawer": {
    id: "navigation-drawer",
    name: "Navigation Drawer",
    subCategory: "Panels & Drawers",
    tag: "Overlay",
    theme: "cyan",
    description: "Sliding navigation drawer using the existing TemplateHub Overlay system with backdrop and focus trap.",
    defaultItems: [
      { id: "dashboard", label: "Platform Dashboard", icon: "Home" },
      { id: "projects", label: "Repository Projects", icon: "Folder", badge: "14" },
      { id: "deployments", label: "CI/CD Pipelines", icon: "Activity" },
      { id: "analytics", label: "Metrics & Logs", icon: "BarChart2" },
      { id: "team", label: "Team & Permissions", icon: "Users" },
      { id: "settings", label: "Global Settings", icon: "Settings" },
    ],
  },
};

export function getNavigationSchema(id) {
  return NAVIGATION_PATTERNS[id] || NAVIGATION_PATTERNS["navbar"];
}

export function getDefaultNavigationConfig(id = "navbar") {
  const schema = getNavigationSchema(id);

  return {
    id: `custom-nav-${Date.now()}`,
    name: `${schema.name} Custom`,
    sourceComponentId: schema.id,
    componentType: schema.id,

    brand: {
      name: "Nexus Cloud",
      logoText: "NC",
      tagline: "Enterprise UI Platform",
      showLogo: true,
      href: "/",
    },

    items: schema.defaultItems || [],
    groups: schema.defaultGroups || [],
    columns: schema.defaultColumns || [],

    activeId: schema.defaultItems?.[0]?.id || schema.defaultGroups?.[0]?.items?.[0]?.id || "1",
    indicatorStyle: "pill", // 'pill' | 'underline' | 'left-bar' | 'glow' | 'subtle-bg'

    colors: {
      surfaceBg: "#0f172a",
      headerBg: "#090d16",
      activeBg: "#4f46e5",
      activeText: "#ffffff",
      inactiveText: "#94a3b8",
      hoverBg: "rgba(255, 255, 255, 0.06)",
      hoverText: "#ffffff",
      borderColor: "#1e293b",
      badgeBg: "#6366f1",
      badgeText: "#ffffff",
      accent: "#6366f1",
      backdropColor: "rgba(15, 23, 42, 0.65)",
    },

    border: {
      radius: 16,
      width: 1,
      style: "solid",
      color: "#1e293b",
      shadowIntensity: "lg",
    },

    typography: {
      fontFamily: "Inter, sans-serif",
      fontSize: 14,
      fontWeight: "500",
      lineHeight: 1.5,
      letterSpacing: "normal",
    },

    layout: {
      maxWidth: "100%",
      height: 64,
      sidebarWidth: 260,
      sidebarCollapsedWidth: 72,
      drawerPosition: "left",
      orientation: "horizontal", // 'horizontal' | 'vertical'
      sticky: true,
      searchEnabled: true,
      notificationsEnabled: true,
      userProfileEnabled: true,
      separator: "/",
      stepperCurrent: 1,
    },

    animation: {
      enabled: true,
      duration: 250,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    },

    responsive: {
      mobileBreakpoint: 768,
      collapseOnMobile: true,
      mobileStyle: "drawer", // 'drawer' | 'dropdown' | 'bottom-bar'
    },

    behavior: {
      closeOnSelect: true,
      closeOnEsc: true,
      trapFocus: true,
      lockScroll: true,
    },
  };
}
