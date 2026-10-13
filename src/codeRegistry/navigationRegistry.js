import Navbar from "@/components/common/Navigation/Navbar";
import Header from "@/components/common/Navigation/Header";
import Sidebar from "@/components/common/Navigation/Sidebar";
import Breadcrumb from "@/components/common/Navigation/Breadcrumb";
import Tabs from "@/components/common/Navigation/Tabs";
import NestedTabs from "@/components/common/Navigation/NestedTabs";
import BottomNavigation from "@/components/common/Navigation/BottomNavigation";
import Stepper from "@/components/common/Navigation/Stepper";
import Menu from "@/components/common/Navigation/Menu";
import DropdownMenu from "@/components/common/Navigation/DropdownMenu";
import MegaMenu from "@/components/common/Navigation/MegaMenu";
import ContextMenu from "@/components/common/Navigation/ContextMenu";
import CommandPalette from "@/components/common/Navigation/CommandPalette";
import NavigationDrawer from "@/components/common/Navigation/NavigationDrawer";

export const navigationComponents = [
  {
    id: "navbar",
    slug: "navbar",
    name: "Navbar",
    category: "navigation",
    subCategory: "Bar & Header",
    tag: "Core",
    theme: "indigo",
    version: "1.0.0",
    description: "Responsive top navigation bar with brand logo, dropdown items, mobile drawer, and action buttons.",
    framework: "react",
    language: "javascript",
    styling: "Tailwind CSS",
    dependencies: ["lucide-react"],
    tags: ["navbar", "navigation", "header", "responsive", "menu"],
    files: [{ name: "Navbar.jsx", path: "components/common/Navigation/Navbar.jsx" }],
    component: Navbar,
    uses: ["Application top bar", "Landing page headers", "Multi-tier navigation"],
    sourceCode: `import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar({
  brand = { name: "Acme Corp", href: "#", logo: null },
  items = [
    { label: "Home", href: "#", active: true },
    { label: "Features", href: "#" },
    {
      label: "Solutions",
      href: "#",
      children: [
        { label: "Enterprise Suite", description: "For fast-scaling teams", href: "#" },
        { label: "Security & Cloud", description: "SOC2 compliant infra", href: "#" },
      ],
    },
    { label: "Pricing", href: "#" },
  ],
  actions = null,
  onItemClick = null,
  className = "",
  variant = "glass",
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={\`w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 \${className}\`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 font-bold text-lg text-slate-900 dark:text-white">
            {brand.name}
          </div>
          <div ref={dropdownRef} className="hidden md:flex items-center gap-1">
            {items.map((item) => (
              <div key={item.label} className="relative">
                <a
                  href={item.href || "#"}
                  className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}`,
  },
  {
    id: "header",
    slug: "header",
    name: "Header",
    category: "navigation",
    subCategory: "Bar & Header",
    tag: "Layout",
    theme: "purple",
    version: "1.0.0",
    description: "Configurable application header with breadcrumbs, search integration, notifications, and user avatar.",
    framework: "react",
    language: "javascript",
    styling: "Tailwind CSS",
    dependencies: ["lucide-react"],
    tags: ["header", "appbar", "search", "notifications", "avatar"],
    files: [{ name: "Header.jsx", path: "components/common/Navigation/Header.jsx" }],
    component: Header,
    uses: ["Admin dashboard headers", "Console interfaces", "Workspaces"],
    sourceCode: `import React, { useState } from "react";
import { Search, Bell, Menu, X, ChevronRight, User } from "lucide-react";

export default function Header({
  title = "Enterprise Console",
  breadcrumbs = null,
  showSearch = true,
  showNotifications = true,
  unreadCount = 3,
  user = { name: "Sarah Jenkins", role: "Admin" },
}) {
  return (
    <header className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 h-16 flex items-center justify-between">
      <h1 className="text-base font-bold text-slate-900 dark:text-white">{title}</h1>
      <div className="flex items-center gap-3">
        {showSearch && <input type="text" placeholder="Search..." className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-white" />}
        <Bell className="w-4 h-4 text-slate-400" />
      </div>
    </header>
  );
}`,
  },
  {
    id: "sidebar",
    slug: "sidebar",
    name: "Sidebar",
    category: "navigation",
    subCategory: "Panels & Drawers",
    tag: "Core",
    theme: "indigo",
    version: "1.0.0",
    description: "Data-driven collapsible sidebar with nested groups, badge counts, collapsed tooltips, and keyboard navigation.",
    framework: "react",
    language: "javascript",
    styling: "Tailwind CSS",
    dependencies: ["lucide-react"],
    tags: ["sidebar", "collapsible", "nested", "drawer", "groups"],
    files: [{ name: "Sidebar.jsx", path: "components/common/Navigation/Sidebar.jsx" }],
    component: Sidebar,
    uses: ["Main application layout", "Multi-category navigation", "Complex SaaS portals"],
    sourceCode: `import React, { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar({ groups = [], activeId = "dashboard", collapsed = false }) {
  return (
    <aside className={\`flex flex-col bg-slate-900 border-r border-slate-800 \${collapsed ? "w-20" : "w-64"}\`}>
      {/* Sidebar implementation */}
    </aside>
  );
}`,
  },
  {
    id: "breadcrumb",
    slug: "breadcrumb",
    name: "Breadcrumb",
    category: "navigation",
    subCategory: "Path & Tabs",
    tag: "Essential",
    theme: "blue",
    version: "1.0.0",
    description: "Hierarchical trail with configurable separators, icons, responsive truncation, and accessibility tags.",
    framework: "react",
    language: "javascript",
    styling: "Tailwind CSS",
    dependencies: ["lucide-react"],
    tags: ["breadcrumb", "path", "trail", "hierarchy", "history"],
    files: [{ name: "Breadcrumb.jsx", path: "components/common/Navigation/Breadcrumb.jsx" }],
    component: Breadcrumb,
    uses: ["Deep route navigation", "File path hierarchies", "E-commerce category paths"],
    sourceCode: `import React from "react";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs">
      <ol className="flex items-center gap-1.5">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1.5">
            <span>{item.label}</span>
            {idx < items.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}`,
  },
  {
    id: "tabs",
    slug: "tabs",
    name: "Tabs",
    category: "navigation",
    subCategory: "Path & Tabs",
    tag: "WAI-ARIA",
    theme: "indigo",
    version: "1.0.0",
    description: "WAI-ARIA accessible tabs with keyboard arrow roving focus, horizontal & vertical modes, and 4 visual variants.",
    framework: "react",
    language: "javascript",
    styling: "Tailwind CSS",
    dependencies: [],
    tags: ["tabs", "tablist", "panels", "keyboard", "accessible"],
    files: [{ name: "Tabs.jsx", path: "components/common/Navigation/Tabs.jsx" }],
    component: Tabs,
    uses: ["Settings views", "Multi-view dashboards", "Tabbed data containers"],
    sourceCode: `import React, { useState } from "react";

export default function Tabs({ tabs = [], activeTab, onChange }) {
  return (
    <div role="tablist" className="flex gap-4 border-b border-slate-800">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          onClick={() => onChange && onChange(tab.id)}
          className="pb-2 text-xs font-semibold"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}`,
  },
  {
    id: "nested-tabs",
    slug: "nested-tabs",
    name: "Nested Tabs",
    category: "navigation",
    subCategory: "Path & Tabs",
    tag: "Compound",
    theme: "purple",
    version: "1.0.0",
    description: "Two-level hierarchical tab disclosure with automatic state reset and child synchronization.",
    framework: "react",
    language: "javascript",
    styling: "Tailwind CSS",
    dependencies: [],
    tags: ["nested-tabs", "hierarchy", "two-tier", "compound"],
    files: [{ name: "NestedTabs.jsx", path: "components/common/Navigation/NestedTabs.jsx" }],
    component: NestedTabs,
    uses: ["Cloud infrastructure consoles", "Multi-level configuration", "Resource management"],
    sourceCode: `import React, { useState } from "react";
import Tabs from "./Tabs";

export default function NestedTabs({ categories = [] }) {
  // Nested tabs implementation
}`,
  },
  {
    id: "bottom-navigation",
    slug: "bottom-navigation",
    name: "Bottom Navigation",
    category: "navigation",
    subCategory: "Mobile & Stepper",
    tag: "Mobile",
    theme: "emerald",
    version: "1.0.0",
    description: "Mobile-first navigation bar with icon badges, active indicator, action button, and safe-area padding.",
    framework: "react",
    language: "javascript",
    styling: "Tailwind CSS",
    dependencies: ["lucide-react"],
    tags: ["bottom-navigation", "mobile", "dock", "appbar", "badges"],
    files: [{ name: "BottomNavigation.jsx", path: "components/common/Navigation/BottomNavigation.jsx" }],
    component: BottomNavigation,
    uses: ["Mobile web apps", "PWA navigation", "Compact device layouts"],
    sourceCode: `import React from "react";

export default function BottomNavigation({ items = [], activeId, onChange }) {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-slate-900 border-t border-slate-800 p-2 flex justify-around">
      {/* Bottom navigation */}
    </nav>
  );
}`,
  },
  {
    id: "stepper",
    slug: "stepper",
    name: "Stepper",
    category: "navigation",
    subCategory: "Mobile & Stepper",
    tag: "Wizard",
    theme: "amber",
    version: "1.0.0",
    description: "Multi-step workflow wizard with validation gating, horizontal/vertical layouts, and error states.",
    framework: "react",
    language: "javascript",
    styling: "Tailwind CSS",
    dependencies: ["lucide-react"],
    tags: ["stepper", "wizard", "multistep", "progress", "validation"],
    files: [{ name: "Stepper.jsx", path: "components/common/Navigation/Stepper.jsx" }],
    component: Stepper,
    uses: ["Checkout flows", "User onboarding", "Form wizards", "KYC pipelines"],
    sourceCode: `import React from "react";
import { Check, AlertCircle } from "lucide-react";

export default function Stepper({ steps = [], currentStep = 0 }) {
  return (
    <div className="flex items-center gap-4">
      {/* Stepper items */}
    </div>
  );
}`,
  },
  {
    id: "menu",
    slug: "menu",
    name: "Menu",
    category: "navigation",
    subCategory: "Menus & Overlays",
    tag: "Menu",
    theme: "indigo",
    version: "1.0.0",
    description: "General-purpose standalone menu list with keyboard navigation, hotkeys, separators, and nested submenus.",
    framework: "react",
    language: "javascript",
    styling: "Tailwind CSS",
    dependencies: ["lucide-react"],
    tags: ["menu", "list", "submenus", "shortcuts", "keyboard"],
    files: [{ name: "Menu.jsx", path: "components/common/Navigation/Menu.jsx" }],
    component: Menu,
    uses: ["Application action menus", "Contextual action lists", "Command selectors"],
    sourceCode: `import React from "react";

export default function Menu({ items = [], onSelect }) {
  return (
    <div role="menu" className="w-64 rounded-2xl bg-slate-900 border border-slate-800 p-1.5">
      {/* Menu items */}
    </div>
  );
}`,
  },
  {
    id: "dropdown-menu",
    slug: "dropdown-menu",
    name: "Dropdown Menu",
    category: "navigation",
    subCategory: "Menus & Overlays",
    tag: "Overlay",
    theme: "blue",
    version: "1.0.0",
    description: "Anchored popup menu with viewport boundary awareness, click-outside, and escape-key handling.",
    framework: "react",
    language: "javascript",
    styling: "Tailwind CSS",
    dependencies: ["lucide-react"],
    tags: ["dropdown", "popover", "anchor", "context", "actions"],
    files: [{ name: "DropdownMenu.jsx", path: "components/common/Navigation/DropdownMenu.jsx" }],
    component: DropdownMenu,
    uses: ["Item action dropdowns", "Sort/filter controls", "Overflow actions"],
    sourceCode: `import React, { useState } from "react";
import Menu from "./Menu";

export default function DropdownMenu({ trigger, items = [], onSelect }) {
  // DropdownMenu implementation
}`,
  },
  {
    id: "mega-menu",
    slug: "mega-menu",
    name: "Mega Menu",
    category: "navigation",
    subCategory: "Menus & Overlays",
    tag: "Enterprise",
    theme: "violet",
    version: "1.0.0",
    description: "Multi-column desktop disclosure with featured highlights, rich link descriptions, and mobile adaptation.",
    framework: "react",
    language: "javascript",
    styling: "Tailwind CSS",
    dependencies: ["lucide-react"],
    tags: ["megamenu", "columns", "desktop", "rich-links", "featured"],
    files: [{ name: "MegaMenu.jsx", path: "components/common/Navigation/MegaMenu.jsx" }],
    component: MegaMenu,
    uses: ["Enterprise portals", "Extensive product catalogs", "Documentation portals"],
    sourceCode: `import React, { useState } from "react";

export default function MegaMenu({ triggerLabel, sections = [], featured }) {
  // MegaMenu implementation
}`,
  },
  {
    id: "context-menu",
    slug: "context-menu",
    name: "Context Menu",
    category: "navigation",
    subCategory: "Menus & Overlays",
    tag: "Interaction",
    theme: "rose",
    version: "1.0.0",
    description: "Cursor-anchored right-click menu with viewport edge detection and local event containment.",
    framework: "react",
    language: "javascript",
    styling: "Tailwind CSS",
    dependencies: ["lucide-react"],
    tags: ["context-menu", "right-click", "pointer", "actions"],
    files: [{ name: "ContextMenu.jsx", path: "components/common/Navigation/ContextMenu.jsx" }],
    component: ContextMenu,
    uses: ["Data grid row menus", "Canvas objects", "File tree actions"],
    sourceCode: `import React, { useState } from "react";
import Menu from "./Menu";

export default function ContextMenu({ children, items = [] }) {
  // ContextMenu implementation
}`,
  },
  {
    id: "command-palette",
    slug: "command-palette",
    name: "Command Palette",
    category: "navigation",
    subCategory: "Menus & Overlays",
    tag: "Keyboard",
    theme: "indigo",
    version: "1.0.0",
    description: "Global keyboard command center (⌘K) with category groupings, route execution, and theme toggle.",
    framework: "react",
    language: "javascript",
    styling: "Tailwind CSS",
    dependencies: ["lucide-react"],
    tags: ["command-palette", "spotlight", "cmd-k", "search", "shortcuts"],
    files: [{ name: "CommandPalette.jsx", path: "components/common/Navigation/CommandPalette.jsx" }],
    component: CommandPalette,
    uses: ["Global shortcuts", "Quick navigation", "Developer consoles"],
    sourceCode: `import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function CommandPalette({ open, onClose, commands = [] }) {
  // CommandPalette implementation
}`,
  },
  {
    id: "navigation-drawer",
    slug: "navigation-drawer",
    name: "Navigation Drawer",
    category: "navigation",
    subCategory: "Panels & Drawers",
    tag: "Overlay",
    theme: "cyan",
    version: "1.0.0",
    description: "Sliding navigation drawer using the existing TemplateHub Overlay system with backdrop and focus trap.",
    framework: "react",
    language: "javascript",
    styling: "Tailwind CSS",
    dependencies: ["lucide-react"],
    tags: ["drawer", "slideout", "offcanvas", "mobile", "overlay"],
    files: [{ name: "NavigationDrawer.jsx", path: "components/common/Navigation/NavigationDrawer.jsx" }],
    component: NavigationDrawer,
    uses: ["Mobile side navigation", "Context filters panel", "Settings drawer"],
    sourceCode: `import React from "react";
import { X } from "lucide-react";

export default function NavigationDrawer({ open, onClose, position = "left", items = [] }) {
  // NavigationDrawer implementation
}`,
  },
];

export function getNavigationComponents() {
  return navigationComponents;
}

export function getNavigationBySubCategory(subCategory) {
  return navigationComponents.filter((c) => c.subCategory === subCategory);
}

export function searchNavigationComponents(query) {
  const q = (query || "").toLowerCase();
  return navigationComponents.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      (c.tags && c.tags.some((t) => t.toLowerCase().includes(q)))
  );
}

export default navigationComponents;
