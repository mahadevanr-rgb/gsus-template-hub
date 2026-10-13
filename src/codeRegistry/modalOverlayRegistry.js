export const modalOverlayComponents = [
  {
    id: "basic-modal",
    slug: "basic-modal",
    name: "Basic Modal",
    category: "modal-overlay",
    subCategory: "Modals",
    tag: "Modal",
    theme: "indigo",
    version: "v1.0.0",
    description:
      "A centered, accessible modal dialog with backdrop blur, smooth scale animation, focus trapping, and ESC to close.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["modal", "dialog", "overlay", "popup"],
    files: [{ name: "Modal.jsx", path: "components/ui/Modal.jsx" }],
    code: `import React, { useState } from "react";
import { Modal } from "@/components/common/Overlay";

export default function BasicModalDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-500 transition-colors"
      >
        Open Modal
      </button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Project Information"
        description="Review project details and team settings."
        size="md"
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 bg-slate-800"
            >
              Close
            </button>
          </div>
        }
      >
        <p className="text-slate-300 text-sm">
          Modal content renders seamlessly into a portal with focus trapping and background scroll lock.
        </p>
      </Modal>
    </div>
  );
}`,
  },
  {
    id: "form-modal",
    slug: "form-modal",
    name: "Form Modal",
    category: "modal-overlay",
    subCategory: "Modals",
    tag: "Form",
    theme: "purple",
    version: "v1.0.0",
    description:
      "Full-featured form modal demonstrating inputs, validation errors, loading state transitions, and save actions.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["modal", "form", "create", "inputs"],
    files: [{ name: "FormModal.jsx", path: "components/ui/FormModal.jsx" }],
    code: `import React, { useState } from "react";
import { FormModal } from "@/pages/ModalOverlay/components";

export default function FormModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-semibold hover:bg-purple-500"
      >
        Create Project Form
      </button>

      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmitSuccess={(data) => console.log("Created project:", data)}
      />
    </>
  );
}`,
  },
  {
    id: "dialog",
    slug: "dialog",
    name: "Configuration Dialog",
    category: "modal-overlay",
    subCategory: "Dialogs",
    tag: "Dialog",
    theme: "blue",
    version: "v1.0.0",
    description:
      "A flexible multi-action dialog tailored for application configurations, data exports, and settings views.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["dialog", "settings", "configuration"],
    files: [{ name: "Dialog.jsx", path: "components/ui/Dialog.jsx" }],
    code: `import React, { useState } from "react";
import { Dialog } from "@/pages/ModalOverlay/components";

export default function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-500"
      >
        Open Configuration Dialog
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Repository Settings"
        description="Configure automated build rules and webhook deployments."
        size="md"
        actions={
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
          >
            Save Configuration
          </button>
        }
      >
        <p className="text-slate-300 text-xs">
          Easily adjust settings and notifications for this repository.
        </p>
      </Dialog>
    </>
  );
}`,
  },
  {
    id: "confirm-dialog",
    slug: "confirm-dialog",
    name: "Confirmation Dialog",
    category: "modal-overlay",
    subCategory: "Feedback",
    tag: "Confirm",
    theme: "red",
    version: "v1.0.0",
    description:
      "Destructive & critical confirmation modal with warning icons, async loading simulation, and semantic ARIA roles.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["confirm", "delete", "destructive", "modal"],
    files: [{ name: "ConfirmDialog.jsx", path: "components/ui/ConfirmDialog.jsx" }],
    code: `import React, { useState } from "react";
import { ConfirmDialog } from "@/pages/ModalOverlay/components";

export default function ConfirmDialogDemo() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-500"
      >
        Delete Component
      </button>

      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        title="Delete Component?"
        description="This action cannot be undone. This component and its assets will be permanently removed."
        confirmText="Delete"
        variant="danger"
        isLoading={loading}
      />
    </>
  );
}`,
  },
  {
    id: "alert-dialog",
    slug: "alert-dialog",
    name: "Alert Dialog",
    category: "modal-overlay",
    subCategory: "Feedback",
    tag: "Alert",
    theme: "amber",
    version: "v1.0.0",
    description:
      "System announcement and warning alert dialog with four dedicated visual variants: info, success, warning, and error.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["alert", "warning", "notification", "modal"],
    files: [{ name: "AlertDialog.jsx", path: "components/ui/AlertDialog.jsx" }],
    code: `import React, { useState } from "react";
import { AlertDialog } from "@/pages/ModalOverlay/components";

export default function AlertDialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-semibold hover:bg-amber-500"
      >
        Show Unsaved Changes Alert
      </button>

      <AlertDialog
        open={open}
        onClose={() => setOpen(false)}
        variant="warning"
        title="Unsaved Changes Detected"
        description="You have pending changes in the form builder that have not been published."
        actionText="Discard Changes"
        cancelText="Keep Editing"
      />
    </>
  );
}`,
  },
  {
    id: "drawer",
    slug: "drawer",
    name: "Sliding Drawer",
    category: "modal-overlay",
    subCategory: "Drawers",
    tag: "Drawer",
    theme: "teal",
    version: "v1.0.0",
    description:
      "Multi-directional sliding drawer supporting left, right, top, and bottom placements with fluid CSS transitions.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["drawer", "slide", "sidebar", "panel"],
    files: [{ name: "Drawer.jsx", path: "components/ui/Drawer.jsx" }],
    code: `import React, { useState } from "react";
import { Drawer } from "@/pages/ModalOverlay/components";

export default function DrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-semibold hover:bg-teal-500"
      >
        Open Right Drawer
      </button>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        side="right"
        size="md"
        title="Component Details"
        description="Inspect code metrics and metadata."
      >
        <p className="text-slate-300 text-xs">
          Drawers provide dedicated vertical side canvas for rich inspection without losing page context.
        </p>
      </Drawer>
    </>
  );
}`,
  },
  {
    id: "bottom-sheet",
    slug: "bottom-sheet",
    name: "Mobile Bottom Sheet",
    category: "modal-overlay",
    subCategory: "Drawers",
    tag: "Sheet",
    theme: "cyan",
    version: "v1.0.0",
    description:
      "Ergonomic bottom sheet designed for mobile interactions and quick contextual menus, with a top drag indicator handle.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["bottomsheet", "mobile", "drawer", "actions"],
    files: [{ name: "BottomSheet.jsx", path: "components/ui/BottomSheet.jsx" }],
    code: `import React, { useState } from "react";
import { BottomSheet } from "@/pages/ModalOverlay/components";

export default function BottomSheetDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-cyan-600 text-white rounded-xl text-xs font-semibold hover:bg-cyan-500"
      >
        Open Bottom Sheet
      </button>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Select Quick Action"
        description="Choose an action to perform on this template."
      >
        <div className="space-y-2">
          <button className="w-full text-left p-2.5 rounded-xl bg-slate-800 text-xs text-white">
            Export to ZIP
          </button>
          <button className="w-full text-left p-2.5 rounded-xl bg-slate-800 text-xs text-white">
            Duplicate Component
          </button>
        </div>
      </BottomSheet>
    </>
  );
}`,
  },
  {
    id: "side-sheet",
    slug: "side-sheet",
    name: "Filter Side Sheet",
    category: "modal-overlay",
    subCategory: "Drawers",
    tag: "Side Sheet",
    theme: "emerald",
    version: "v1.0.0",
    description:
      "A dedicated side sheet for facet filtering, complex parameters, and extended component property tweaking.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["sidesheet", "filter", "settings", "panel"],
    files: [{ name: "SideSheet.jsx", path: "components/ui/SideSheet.jsx" }],
    code: `import React, { useState } from "react";
import { SideSheet } from "@/pages/ModalOverlay/components";

export default function SideSheetDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-500"
      >
        Filter Components
      </button>

      <SideSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Filter Templates"
        description="Refine your component search by framework and tags."
        width="md"
      >
        <div className="space-y-3">
          <label className="text-xs text-slate-300 font-semibold block">Framework</label>
          <div className="flex gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs">React 19</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 text-xs">Vue</span>
          </div>
        </div>
      </SideSheet>
    </>
  );
}`,
  },
  {
    id: "popover",
    slug: "popover",
    name: "Floating Popover",
    category: "modal-overlay",
    subCategory: "Floating",
    tag: "Popover",
    theme: "orange",
    version: "v1.0.0",
    description:
      "Lightweight floating contextual card positioned dynamically relative to any trigger element, with auto viewport containment.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["popover", "floating", "tooltip", "card"],
    files: [{ name: "Popover.jsx", path: "components/ui/Popover.jsx" }],
    code: `import React from "react";
import { Popover } from "@/pages/ModalOverlay/components";

export default function PopoverDemo() {
  return (
    <Popover
      trigger={
        <button className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-semibold">
          Open Filter Popover
        </button>
      }
      placement="bottom"
      align="center"
    >
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-white">Quick Dimensions</h4>
        <p className="text-[11px] text-slate-400">Select canvas width for preview testing.</p>
      </div>
    </Popover>
  );
}`,
  },
  {
    id: "tooltip",
    slug: "tooltip",
    name: "Interactive Tooltip",
    category: "modal-overlay",
    subCategory: "Floating",
    tag: "Tooltip",
    theme: "slate",
    version: "v1.0.0",
    description:
      "Accessible micro-hover info tooltip with direction placement (top, bottom, left, right), customizable delay, and portal rendering.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["tooltip", "hint", "hover", "floating"],
    files: [{ name: "Tooltip.jsx", path: "components/ui/Tooltip.jsx" }],
    code: `import React from "react";
import { Tooltip } from "@/pages/ModalOverlay/components";

export default function TooltipDemo() {
  return (
    <Tooltip content="Copy JSX code to clipboard" placement="top">
      <button className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-700">
        Hover Me
      </button>
    </Tooltip>
  );
}`,
  },
  {
    id: "context-menu",
    slug: "context-menu",
    name: "Custom Context Menu",
    category: "modal-overlay",
    subCategory: "Menus",
    tag: "Context",
    theme: "indigo",
    version: "v1.0.0",
    description:
      "Desktop-grade right-click context menu with keyboard arrows, keyboard shortcuts, icons, separators, and boundary detection.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["contextmenu", "rightclick", "menu", "actions"],
    files: [{ name: "ContextMenu.jsx", path: "components/ui/ContextMenu.jsx" }],
    code: `import React from "react";
import { ContextMenu } from "@/pages/ModalOverlay/components";
import { Copy, Edit3, Trash2 } from "lucide-react";

export default function ContextMenuDemo() {
  const menuItems = [
    { id: "edit", label: "Edit Component", icon: Edit3, shortcut: "⌘E" },
    { id: "copy", label: "Copy Snippet", icon: Copy, shortcut: "⌘C" },
    { separator: true },
    { id: "delete", label: "Delete", icon: Trash2, destructive: true, shortcut: "⌫" },
  ];

  return (
    <ContextMenu items={menuItems} onSelect={(item) => console.log(item.label)}>
      <div className="p-8 rounded-2xl border border-dashed border-slate-700 text-center text-xs text-slate-400">
        Right click inside this area to open custom context menu
      </div>
    </ContextMenu>
  );
}`,
  },
  {
    id: "dropdown-menu",
    slug: "dropdown-menu",
    name: "Dropdown Menu",
    category: "modal-overlay",
    subCategory: "Menus",
    tag: "Dropdown",
    theme: "purple",
    version: "v1.0.0",
    description:
      "Versatile action dropdown menu with triggers, grouped items, shortcut badges, keyboard arrow navigation, and ESC handling.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["dropdown", "menu", "select", "actions"],
    files: [{ name: "DropdownMenu.jsx", path: "components/ui/DropdownMenu.jsx" }],
    code: `import React from "react";
import { DropdownMenu } from "@/pages/ModalOverlay/components";
import { Sparkles, Download, Settings } from "lucide-react";

export default function DropdownMenuDemo() {
  const items = [
    { id: "export", label: "Export Code", icon: Download, shortcut: "⌘S" },
    { id: "settings", label: "Settings", icon: Settings },
    { separator: true },
    { id: "upgrade", label: "Upgrade Plan", icon: Sparkles },
  ];

  return (
    <DropdownMenu
      items={items}
      onSelect={(item) => console.log("Selected:", item.label)}
    />
  );
}`,
  },
  {
    id: "command-menu",
    slug: "command-menu",
    name: "Command Palette (⌘K)",
    category: "modal-overlay",
    subCategory: "Command",
    tag: "Palette",
    theme: "fuchsia",
    version: "v1.0.0",
    description:
      "Global command palette with fuzzy filtering across all template categories, arrow navigation, shortcut triggers, and direct routing.",
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    dependencies: ["lucide-react"],
    tags: ["command", "palette", "search", "shortcuts"],
    files: [{ name: "CommandMenu.jsx", path: "components/ui/CommandMenu.jsx" }],
    code: `import React, { useState, useEffect } from "react";
import { CommandMenu } from "@/pages/ModalOverlay/components";

export default function CommandMenuDemo() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-fuchsia-600 text-white rounded-xl text-xs font-semibold flex items-center gap-2"
      >
        <span>Open Command Palette</span>
        <kbd className="px-1.5 py-0.5 rounded bg-fuchsia-800 text-[10px]">⌘K</kbd>
      </button>

      <CommandMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}`,
  },
];

export function getModalOverlayComponents() {
  return modalOverlayComponents;
}

export function searchModalOverlays(query) {
  const q = (query || "").toLowerCase();
  return modalOverlayComponents.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      (c.tags && c.tags.some((t) => t.toLowerCase().includes(q)))
  );
}

export default modalOverlayComponents;
