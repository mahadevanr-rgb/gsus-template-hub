/**
 * Card Customizer Configuration & Schemas
 * Defines schemas, defaults, supported controls, presets, and validation for TemplateHub Card Customizer.
 */

export const FONT_OPTIONS = [
  { label: "Inter (Default)", value: "Inter, sans-serif" },
  { label: "Outfit (Modern Sans)", value: "Outfit, sans-serif" },
  { label: "Roboto (Clean)", value: "Roboto, sans-serif" },
  { label: "Plus Jakarta Sans", value: "'Plus Jakarta Sans', sans-serif" },
  { label: "System UI", value: "system-ui, -apple-system, sans-serif" },
  { label: "Monospace (Code)", value: "ui-monospace, monospace" },
  { label: "Georgia (Editorial Serif)", value: "Georgia, serif" },
];

export const COLOR_PALETTES = [
  {
    name: "SaaS Indigo",
    cardBg: "#ffffff",
    darkCardBg: "#0f172a",
    accentColor: "#6366f1",
    titleColor: "#0f172a",
    subtitleColor: "#64748b",
    borderCol: "#e2e8f0",
    badgeBg: "#e0e7ff",
    badgeText: "#4338ca",
    btnBg: "#6366f1",
    btnText: "#ffffff",
    gradientFrom: "#6366f1",
    gradientTo: "#a855f7",
  },
  {
    name: "Emerald Finance",
    cardBg: "#ffffff",
    darkCardBg: "#062820",
    accentColor: "#10b981",
    titleColor: "#064e3b",
    subtitleColor: "#64748b",
    borderCol: "#d1fae5",
    badgeBg: "#ecfdf5",
    badgeText: "#047857",
    btnBg: "#059669",
    btnText: "#ffffff",
    gradientFrom: "#059669",
    gradientTo: "#14b8a6",
  },
  {
    name: "Sunset Coral",
    cardBg: "#ffffff",
    darkCardBg: "#1f1315",
    accentColor: "#f97316",
    titleColor: "#431407",
    subtitleColor: "#78716c",
    borderCol: "#fed7aa",
    badgeBg: "#fff7ed",
    badgeText: "#c2410c",
    btnBg: "#ea580c",
    btnText: "#ffffff",
    gradientFrom: "#f43f5e",
    gradientTo: "#f97316",
  },
  {
    name: "Dark Velvet",
    cardBg: "#111827",
    darkCardBg: "#0b0f19",
    accentColor: "#8b5cf6",
    titleColor: "#f9fafb",
    subtitleColor: "#9ca3af",
    borderCol: "#374151",
    badgeBg: "#312e81",
    badgeText: "#c4b5fd",
    btnBg: "#7c3aed",
    btnText: "#ffffff",
    gradientFrom: "#8b5cf6",
    gradientTo: "#ec4899",
  },
  {
    name: "Cyber Neon",
    cardBg: "#090d16",
    darkCardBg: "#05070c",
    accentColor: "#06b6d4",
    titleColor: "#ffffff",
    subtitleColor: "#94a3b8",
    borderCol: "#1e293b",
    badgeBg: "#083344",
    badgeText: "#67e8f9",
    btnBg: "#0891b2",
    btnText: "#ffffff",
    gradientFrom: "#06b6d4",
    gradientTo: "#3b82f6",
  },
  {
    name: "Clean Monochrome",
    cardBg: "#ffffff",
    darkCardBg: "#18181b",
    accentColor: "#18181b",
    titleColor: "#09090b",
    subtitleColor: "#71717a",
    borderCol: "#e4e4e7",
    badgeBg: "#f4f4f5",
    badgeText: "#27272a",
    btnBg: "#18181b",
    btnText: "#fafafa",
    gradientFrom: "#27272a",
    gradientTo: "#52525b",
  },
];

export const SHADOW_PRESETS = [
  { label: "None", value: "none", css: "none" },
  { label: "Subtle", value: "sm", css: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
  { label: "Medium", value: "md", css: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" },
  { label: "Elevated", value: "lg", css: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" },
  { label: "Dramatic", value: "xl", css: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" },
  { label: "Floating", value: "2xl", css: "0 25px 50px -12px rgb(0 0 0 / 0.25)" },
  { label: "Glow Accent", value: "glow", css: "0 0 25px -5px var(--card-accent, rgba(99, 102, 241, 0.4))" },
];

export const RADIUS_PRESETS = [
  { label: "Sharp (0px)", value: "0px" },
  { label: "Rounded (12px)", value: "12px" },
  { label: "Smooth (16px)", value: "16px" },
  { label: "Curved (24px)", value: "24px" },
  { label: "Pill / Full (9999px)", value: "9999px" },
];

export const LUCIDE_ICONS_LIST = [
  "Sparkles",
  "Star",
  "Check",
  "CheckCircle2",
  "Heart",
  "Zap",
  "Shield",
  "ShieldCheck",
  "ArrowRight",
  "TrendingUp",
  "TrendingDown",
  "DollarSign",
  "CreditCard",
  "Calendar",
  "Clock",
  "User",
  "Users",
  "UserCheck",
  "MapPin",
  "Mail",
  "Bell",
  "ShoppingCart",
  "Award",
  "Bookmark",
  "Briefcase",
  "Code",
  "Compass",
  "FileText",
  "Folder",
  "Globe",
  "Layers",
  "Lock",
  "Play",
  "Send",
  "ThumbsUp",
  "ExternalLink",
  "AlertTriangle",
  "Info",
];

/**
 * Base universal template defaults.
 */
export const UNIVERSAL_DEFAULT_CONFIG = {
  layout: {
    maxWidth: 380,
    minHeight: 0,
    padding: 24,
    alignment: "left", // 'left' | 'center' | 'right'
    orientation: "vertical", // 'vertical' | 'horizontal'
    showHeader: true,
    showFooter: true,
    showDividers: true,
    overflowHidden: true,
  },
  colors: {
    cardBg: "#ffffff",
    darkCardBg: "#0f172a",
    useGradient: false,
    gradientDirection: "to-br",
    gradientFrom: "#6366f1",
    gradientVia: "",
    gradientTo: "#a855f7",
    cardThemeMode: "auto", // 'auto' | 'light' | 'dark'
    titleColor: "#0f172a",
    subtitleColor: "#64748b",
    accentColor: "#6366f1",
    borderColor: "#e2e8f0",
    headerBg: "transparent",
    footerBg: "transparent",
    badgeBg: "#e0e7ff",
    badgeTextColor: "#4338ca",
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    titleFontSize: 20,
    titleFontWeight: "700",
    bodyFontSize: 14,
    lineHeight: 1.5,
    letterSpacing: "-0.01em",
    textTransform: "none",
  },
  borders: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 24,
    shadowPreset: "lg",
    hoverElevation: true,
    hoverScale: false,
    hoverBorderColor: "#6366f1",
  },
  button: {
    show: true,
    label: "Explore More",
    variant: "primary", // 'primary' | 'secondary' | 'outline' | 'gradient' | 'ghost'
    btnBg: "#6366f1",
    btnTextColor: "#ffffff",
    btnRadius: 12,
    btnFullWidth: true,
    btnIcon: "ArrowRight",
    btnIconPosition: "right",
    linkUrl: "#",
  },
  image: {
    show: true,
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    alt: "Card preview image",
    fit: "cover", // 'cover' | 'contain' | 'fill'
    aspectRatio: "video", // 'square' | 'video' | 'banner' | 'auto'
    avatarShape: "circle", // 'circle' | 'rounded' | 'square'
    radius: 16,
  },
  interactive: {
    transitionDuration: "200ms",
    customClassName: "",
    customCss: "",
  },
};

/**
 * Card family definitions with specialized defaults and content schemas.
 */
export const CARD_SCHEMAS = {
  // 1. Profile Card
  "profile-card": {
    id: "profile-card",
    title: "Profile Card",
    category: "profile",
    description: "Personal identity card with cover banner, circular avatar, metrics, and follow action.",
    supportedControls: ["layout", "colors", "typography", "borders", "image", "content", "button", "interactive"],
    defaultConfig: {
      ...UNIVERSAL_DEFAULT_CONFIG,
      layout: { ...UNIVERSAL_DEFAULT_CONFIG.layout, maxWidth: 380, alignment: "center" },
      content: {
        name: "Adela Parkson",
        role: "Product Designer & Strategist",
        bio: "Designing digital experiences that blend delight with functional precision.",
        coverGradient: "from-indigo-600 via-purple-600 to-pink-500",
        showCoverBanner: true,
        stats: [
          { label: "Projects", value: "28" },
          { label: "Followers", value: "9.7k" },
          { label: "Following", value: "312" },
        ],
      },
      button: {
        ...UNIVERSAL_DEFAULT_CONFIG.button,
        label: "Follow Profile",
        btnIcon: "UserCheck",
      },
      image: {
        ...UNIVERSAL_DEFAULT_CONFIG.image,
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
        avatarShape: "circle",
      },
    },
  },

  // 2. Pricing Card
  "pricing-card": {
    id: "pricing-card",
    title: "Pricing Tier Card",
    category: "pricing",
    description: "Subscription tier showcase with plan name, highlighted badge, feature checklist, and CTA.",
    supportedControls: ["layout", "colors", "typography", "borders", "content", "button", "interactive"],
    defaultConfig: {
      ...UNIVERSAL_DEFAULT_CONFIG,
      layout: { ...UNIVERSAL_DEFAULT_CONFIG.layout, maxWidth: 380, alignment: "center" },
      content: {
        planName: "Pro Tier",
        price: "29",
        currency: "$",
        priceUnit: "/ month, billed yearly",
        description: "Everything growing businesses need to scale collaboration and intelligence.",
        highlighted: true,
        highlightBadge: "Most Popular",
        features: [
          "Unlimited workspace members",
          "Advanced analytics & audit logs",
          "Custom branding & subdomains",
          "Dedicated 24/7 Slack support",
          "SOC2 Type II compliance",
        ],
      },
      button: {
        ...UNIVERSAL_DEFAULT_CONFIG.button,
        label: "Upgrade to Pro",
        btnIcon: "Zap",
      },
      image: { ...UNIVERSAL_DEFAULT_CONFIG.image, show: false },
    },
  },

  // 3. Testimonial Card
  "testimonial-card": {
    id: "testimonial-card",
    title: "Testimonial Card",
    category: "content",
    description: "Social proof review card with 5-star rating, customer quote, and author credentials.",
    supportedControls: ["layout", "colors", "typography", "borders", "image", "content", "interactive"],
    defaultConfig: {
      ...UNIVERSAL_DEFAULT_CONFIG,
      layout: { ...UNIVERSAL_DEFAULT_CONFIG.layout, maxWidth: 380 },
      content: {
        quote: "TemplateHub fundamentally accelerated our UI delivery. We saved 140+ engineering hours in sprint 1 alone.",
        rating: 5,
        authorName: "Marcus Ihejirika",
        authorRole: "Head of Operations",
        authorCompany: "Fieldnote Labs",
        verified: true,
      },
      image: {
        ...UNIVERSAL_DEFAULT_CONFIG.image,
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        avatarShape: "circle",
      },
      button: { ...UNIVERSAL_DEFAULT_CONFIG.button, show: false },
    },
  },

  // 4. Feature Card
  "feature-card": {
    id: "feature-card",
    title: "Feature Card",
    category: "content",
    description: "Product capability showcase with icon badge, title, concise description, and learn more link.",
    supportedControls: ["layout", "colors", "typography", "borders", "content", "button", "interactive"],
    defaultConfig: {
      ...UNIVERSAL_DEFAULT_CONFIG,
      layout: { ...UNIVERSAL_DEFAULT_CONFIG.layout, maxWidth: 360 },
      content: {
        icon: "Zap",
        iconEmoji: "⚡",
        title: "Real-time Collaboration",
        description: "Synchronize state, comments, and multiplayer cursors instantaneously across your distributed team.",
        actionLabel: "Learn more →",
      },
      button: {
        ...UNIVERSAL_DEFAULT_CONFIG.button,
        show: true,
        label: "Discover feature →",
        variant: "ghost",
        btnFullWidth: false,
      },
      image: { ...UNIVERSAL_DEFAULT_CONFIG.image, show: false },
    },
  },

  // 5. Stat / Metric Card
  "stat-card": {
    id: "stat-card",
    title: "Analytics Stat Card",
    category: "stats",
    description: "Key performance indicator card with big metric, trend badge, mini sparkline chart, and notes.",
    supportedControls: ["layout", "colors", "typography", "borders", "content", "interactive"],
    defaultConfig: {
      ...UNIVERSAL_DEFAULT_CONFIG,
      layout: { ...UNIVERSAL_DEFAULT_CONFIG.layout, maxWidth: 340 },
      content: {
        label: "MONTHLY REVENUE",
        value: "$248,500",
        changePercent: "18.4%",
        changeDirection: "up", // 'up' | 'down'
        sparklineData: [25, 45, 30, 65, 50, 85, 95],
        footerLeft: "Past 30 Days",
        footerRight: "+$32k vs last month",
        icon: "TrendingUp",
      },
      button: { ...UNIVERSAL_DEFAULT_CONFIG.button, show: false },
      image: { ...UNIVERSAL_DEFAULT_CONFIG.image, show: false },
    },
  },

  // 6. Product Card
  "product-card": {
    id: "product-card",
    title: "E-Commerce Product Card",
    category: "profile",
    description: "Online store product showcase with product image, badge, pricing, ratings, and Add to Cart action.",
    supportedControls: ["layout", "colors", "typography", "borders", "image", "content", "button", "interactive"],
    defaultConfig: {
      ...UNIVERSAL_DEFAULT_CONFIG,
      layout: { ...UNIVERSAL_DEFAULT_CONFIG.layout, maxWidth: 360 },
      content: {
        productName: "Aura Noise-Cancelling Headphones",
        category: "Audio Equipment",
        description: "Studio-grade acoustics with 40-hour battery life and spatial audio isolation.",
        price: "$299",
        originalPrice: "$349",
        rating: 4.8,
        reviewsCount: "1,240 reviews",
        badge: "Best Seller",
        inStock: true,
      },
      image: {
        ...UNIVERSAL_DEFAULT_CONFIG.image,
        show: true,
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
        aspectRatio: "video",
      },
      button: {
        ...UNIVERSAL_DEFAULT_CONFIG.button,
        label: "Add to Cart",
        btnIcon: "ShoppingCart",
      },
    },
  },

  // 7. Invoice Card
  "invoice-card": {
    id: "invoice-card",
    title: "Invoice & Billing Card",
    category: "finance",
    description: "Financial invoice tracker with status badge, amount, client details, and payment action.",
    supportedControls: ["layout", "colors", "typography", "borders", "content", "button", "interactive"],
    defaultConfig: {
      ...UNIVERSAL_DEFAULT_CONFIG,
      layout: { ...UNIVERSAL_DEFAULT_CONFIG.layout, maxWidth: 380 },
      content: {
        invoiceNumber: "INV-2026-0842",
        clientName: "Acme Corporation",
        clientEmail: "billing@acme.com",
        amount: "$4,850.00",
        status: "Paid", // 'Paid' | 'Pending' | 'Overdue'
        issueDate: "Oct 10, 2026",
        dueDate: "Nov 10, 2026",
        itemsCount: "4 deliverables",
      },
      button: {
        ...UNIVERSAL_DEFAULT_CONFIG.button,
        label: "Download Invoice PDF",
        btnIcon: "FileText",
        variant: "secondary",
      },
      image: { ...UNIVERSAL_DEFAULT_CONFIG.image, show: false },
    },
  },

  // 8. Task Card
  "task-card": {
    id: "task-card",
    title: "Kanban Task Card",
    category: "tasks",
    description: "Project management task card with priority tag, checklist progress, due date, and assignee.",
    supportedControls: ["layout", "colors", "typography", "borders", "image", "content", "button", "interactive"],
    defaultConfig: {
      ...UNIVERSAL_DEFAULT_CONFIG,
      layout: { ...UNIVERSAL_DEFAULT_CONFIG.layout, maxWidth: 360 },
      content: {
        taskTitle: "Redesign Design System Tokens",
        taskDescription: "Audit color semantics, typographic scale, and elevate dark mode consistency.",
        priority: "High Priority",
        dueDate: "Tomorrow, 5:00 PM",
        progress: 75,
        checklistText: "6 of 8 subtasks completed",
        assigneeName: "Sophia Chen",
        tags: ["Design System", "V2", "Core UI"],
      },
      image: {
        ...UNIVERSAL_DEFAULT_CONFIG.image,
        show: true,
        url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
        avatarShape: "circle",
      },
      button: {
        ...UNIVERSAL_DEFAULT_CONFIG.button,
        label: "View Task Details",
        btnIcon: "ArrowRight",
        variant: "outline",
      },
    },
  },

  // 9. Event Card
  "event-card": {
    id: "event-card",
    title: "Event & Booking Card",
    category: "events",
    description: "Calendar event card with date badge, location, schedule details, and RSVP action.",
    supportedControls: ["layout", "colors", "typography", "borders", "image", "content", "button", "interactive"],
    defaultConfig: {
      ...UNIVERSAL_DEFAULT_CONFIG,
      layout: { ...UNIVERSAL_DEFAULT_CONFIG.layout, maxWidth: 380 },
      content: {
        eventTitle: "Frontend Architecture Summit 2026",
        date: "Thursday, Nov 18",
        time: "10:00 AM - 4:30 PM EST",
        location: "Grand Ballroom & Virtual Stream",
        attendeesCount: "1,450 registered",
        badge: "Live Event",
      },
      image: {
        ...UNIVERSAL_DEFAULT_CONFIG.image,
        show: true,
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=80",
        aspectRatio: "banner",
      },
      button: {
        ...UNIVERSAL_DEFAULT_CONFIG.button,
        label: "Reserve Free Ticket",
        btnIcon: "Calendar",
      },
    },
  },

  // 10. Alert / Notification Card
  "alert-card": {
    id: "alert-card",
    title: "Notification Alert Card",
    category: "notifications",
    description: "Feedback and status alert card with severity indicator, descriptive message, and action buttons.",
    supportedControls: ["layout", "colors", "typography", "borders", "content", "button", "interactive"],
    defaultConfig: {
      ...UNIVERSAL_DEFAULT_CONFIG,
      layout: { ...UNIVERSAL_DEFAULT_CONFIG.layout, maxWidth: 400 },
      content: {
        alertTitle: "Security Authentication Required",
        alertMessage: "A new sign-in was detected from Chrome on macOS in Seattle, WA. Verify your identity to protect your credentials.",
        severity: "warning", // 'info' | 'success' | 'warning' | 'error'
        timestamp: "Just now",
        dismissible: true,
      },
      button: {
        ...UNIVERSAL_DEFAULT_CONFIG.button,
        label: "Confirm My Identity",
        btnIcon: "ShieldCheck",
        btnBg: "#f59e0b",
      },
      image: { ...UNIVERSAL_DEFAULT_CONFIG.image, show: false },
    },
  },

  // 11. Blank Canvas Card
  "blank-card": {
    id: "blank-card",
    title: "Custom Blank Card",
    category: "custom",
    description: "Clean starting point to build any custom card design from scratch.",
    supportedControls: ["layout", "colors", "typography", "borders", "image", "content", "button", "interactive"],
    defaultConfig: {
      ...UNIVERSAL_DEFAULT_CONFIG,
      content: {
        title: "Your Custom Card Title",
        subtitle: "Custom Card Subtitle",
        description: "Customize this card using the controls in the left sidebar. Add images, colors, buttons, and custom styles.",
      },
    },
  },
};

/**
 * Maps any card slug from cardsRegistry to its best matching schema.
 */
export function getCardSchema(sourceCardId) {
  if (CARD_SCHEMAS[sourceCardId]) {
    return CARD_SCHEMAS[sourceCardId];
  }

  // Smart family mapping for any of the 26 cards in cardsRegistry:
  if (sourceCardId?.includes("profile") || sourceCardId?.includes("team") || sourceCardId?.includes("user")) {
    return { ...CARD_SCHEMAS["profile-card"], id: sourceCardId };
  }
  if (sourceCardId?.includes("pricing") || sourceCardId?.includes("subscription") || sourceCardId?.includes("comparison")) {
    return { ...CARD_SCHEMAS["pricing-card"], id: sourceCardId };
  }
  if (sourceCardId?.includes("stat") || sourceCardId?.includes("kpi") || sourceCardId?.includes("metric") || sourceCardId?.includes("progress")) {
    return { ...CARD_SCHEMAS["stat-card"], id: sourceCardId };
  }
  if (sourceCardId?.includes("invoice") || sourceCardId?.includes("transaction") || sourceCardId?.includes("payment") || sourceCardId?.includes("billing")) {
    return { ...CARD_SCHEMAS["invoice-card"], id: sourceCardId };
  }
  if (sourceCardId?.includes("task") || sourceCardId?.includes("kanban") || sourceCardId?.includes("project")) {
    return { ...CARD_SCHEMAS["task-card"], id: sourceCardId };
  }
  if (sourceCardId?.includes("event") || sourceCardId?.includes("booking") || sourceCardId?.includes("appointment")) {
    return { ...CARD_SCHEMAS["event-card"], id: sourceCardId };
  }
  if (sourceCardId?.includes("alert") || sourceCardId?.includes("notification") || sourceCardId?.includes("status")) {
    return { ...CARD_SCHEMAS["alert-card"], id: sourceCardId };
  }
  if (sourceCardId?.includes("product") || sourceCardId?.includes("ecommerce")) {
    return { ...CARD_SCHEMAS["product-card"], id: sourceCardId };
  }
  if (sourceCardId?.includes("testimonial") || sourceCardId?.includes("review")) {
    return { ...CARD_SCHEMAS["testimonial-card"], id: sourceCardId };
  }

  // Fallback to feature-card or blank-card
  return { ...CARD_SCHEMAS["feature-card"], id: sourceCardId || "blank-card" };
}

/**
 * Returns available starter templates for modal picker.
 */
export function getAvailableTemplates() {
  return Object.values(CARD_SCHEMAS);
}
