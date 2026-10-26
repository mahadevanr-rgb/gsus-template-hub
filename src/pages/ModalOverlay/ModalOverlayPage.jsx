import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layers,
  Sparkles,
  CheckCircle2,
  FolderPlus,
  Trash2,
  AlertTriangle,
  SlidersHorizontal,
  ChevronDown,
  Search,
  ExternalLink,
  Copy,
  Info,
  Check,
  Settings,
  MoreVertical,
  HelpCircle,
  Eye,
  PanelRightClose,
  PanelLeftClose,
  Menu,
} from "lucide-react";
import ShowcaseCard from "@/components/common/ShowcaseCard/ShowcaseCard";
import { modalOverlayComponents } from "@/codeRegistry/modalOverlayRegistry";
import {
  Modal,
  FormModal,
  Dialog,
  ConfirmDialog,
  AlertDialog,
  Drawer,
  BottomSheet,
  SideSheet,
  Popover,
  Tooltip,
  ContextMenu,
  DropdownMenu,
  CommandMenu,
} from "./components";
import MyCustomizedOverlays from "./components/MyCustomizedOverlays";

/* -------------------------------------------------------------------------- */
/* Breadcrumb & Header Primitives                                             */
/* -------------------------------------------------------------------------- */

function Breadcrumbs({ onHome }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-500">
      <button
        type="button"
        onClick={onHome}
        className="transition-colors hover:text-white cursor-pointer"
      >
        Home
      </button>
      <span>/</span>
      <button
        type="button"
        onClick={onHome}
        className="transition-colors hover:text-white cursor-pointer"
      >
        Components
      </button>
      <span>/</span>
      <span className="font-medium text-white">Modal &amp; Overlay</span>
    </div>
  );
}

function PageHeader({ onCustomize }) {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/50 px-5 py-6 shadow-xl shadow-black/10 sm:px-8">
      <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-indigo-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-fuchsia-600/15 blur-3xl" />

      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-5">
          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-indigo-500/25 sm:flex">
            <Layers className="h-7 w-7" />
          </div>

          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              12 Production Patterns · Compound Overlay Foundation
            </div>

            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Modal &amp;{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Overlay Systems
              </span>
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-400">
              Enterprise-grade modals, sliding drawers, popovers, context menus, and command palettes built on a unified, accessible portal foundation with focus trapping, scroll locking, and ESC stack management.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCustomize}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white shadow-lg shadow-indigo-500/25 active:scale-[0.98] transition-all cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch Customizer</span>
        </button>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Showcase Card Mini-Previews                                                */
/* -------------------------------------------------------------------------- */

function OverlayCardPreview({ id }) {
  switch (id) {
    case "basic-modal":
      return (
        <div className="w-full px-3 py-1">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-center shadow-lg">
            <div className="w-16 h-1.5 bg-indigo-500/40 rounded-full mx-auto" />
            <p className="text-[11px] font-semibold text-white">Centered Dialog</p>
            <div className="flex justify-center gap-1.5 pt-1">
              <span className="w-10 h-3 rounded bg-slate-800 text-[8px] text-slate-400 flex items-center justify-center">Cancel</span>
              <span className="w-10 h-3 rounded bg-indigo-600 text-[8px] text-white flex items-center justify-center">Confirm</span>
            </div>
          </div>
        </div>
      );
    case "form-modal":
      return (
        <div className="w-full px-3 py-1">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-left">
            <div className="flex items-center justify-between text-[10px] text-purple-400 font-semibold">
              <span>Create Project</span>
              <span className="text-slate-500">✕</span>
            </div>
            <div className="w-full h-4 rounded bg-slate-900 border border-slate-800 px-2 text-[8px] text-slate-400 flex items-center">
              Project Name...
            </div>
            <div className="w-full h-3 rounded bg-purple-600 text-[8px] text-white flex items-center justify-center font-bold">
              Submit Form
            </div>
          </div>
        </div>
      );
    case "dialog":
      return (
        <div className="w-full px-3 py-1">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1 text-left">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <p className="text-[11px] font-semibold text-white">Config Settings</p>
            </div>
            <p className="text-[9px] text-slate-400">Multi-action interactive dialog</p>
          </div>
        </div>
      );
    case "confirm-dialog":
      return (
        <div className="w-full px-3 py-1">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-rose-500/30 space-y-1.5 text-center">
            <div className="flex items-center justify-center gap-1 text-rose-400 text-[10px] font-bold">
              <Trash2 className="w-3 h-3" />
              <span>Delete Component?</span>
            </div>
            <div className="flex justify-center gap-1">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[8px] text-slate-400">Cancel</span>
              <span className="px-2 py-0.5 rounded bg-rose-600 text-[8px] text-white font-bold">Delete</span>
            </div>
          </div>
        </div>
      );
    case "alert-dialog":
      return (
        <div className="w-full px-3 py-1">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="min-w-0 text-left">
              <p className="text-[10px] font-bold text-amber-300">Unsaved Changes</p>
              <p className="text-[8px] text-slate-400 truncate">4 variations available</p>
            </div>
          </div>
        </div>
      );
    case "drawer":
      return (
        <div className="w-full px-3 py-1 flex justify-end">
          <div className="w-32 p-2 rounded-l-xl bg-slate-950 border-y border-l border-teal-500/40 space-y-1 text-left shadow-lg">
            <div className="flex items-center justify-between text-[9px] text-teal-300 font-bold">
              <span>Right Drawer</span>
              <span>✕</span>
            </div>
            <div className="space-y-0.5">
              <div className="w-full h-1.5 bg-slate-800 rounded" />
              <div className="w-3/4 h-1.5 bg-slate-800 rounded" />
            </div>
          </div>
        </div>
      );
    case "bottom-sheet":
      return (
        <div className="w-full px-3 py-1 flex flex-col justify-end items-center">
          <div className="w-full p-2 rounded-t-xl bg-slate-950 border-t border-x border-cyan-500/40 text-center space-y-1">
            <div className="w-6 h-1 bg-slate-600 rounded-full mx-auto" />
            <p className="text-[9px] text-cyan-300 font-bold">Mobile Action Sheet</p>
          </div>
        </div>
      );
    case "side-sheet":
      return (
        <div className="w-full px-3 py-1 flex justify-end">
          <div className="w-32 p-2 rounded-l-xl bg-slate-950 border-y border-l border-emerald-500/40 space-y-1 text-left">
            <p className="text-[9px] text-emerald-300 font-bold">Filter Side Sheet</p>
            <div className="w-full h-1.5 bg-slate-800 rounded" />
          </div>
        </div>
      );
    case "popover":
      return (
        <div className="w-full px-3 py-1 flex justify-center">
          <div className="p-2 rounded-xl bg-slate-950/90 border border-orange-500/30 text-center space-y-0.5 shadow-lg">
            <p className="text-[10px] font-bold text-orange-300">Contextual Popover</p>
            <p className="text-[8px] text-slate-400">Positioned by trigger</p>
          </div>
        </div>
      );
    case "tooltip":
      return (
        <div className="w-full px-3 py-1 flex justify-center">
          <div className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-[10px] text-white shadow-lg flex items-center gap-1">
            <span>Copy Code</span>
            <span className="text-[8px] text-slate-500">⌘C</span>
          </div>
        </div>
      );
    case "context-menu":
      return (
        <div className="w-full px-3 py-1 flex justify-center">
          <div className="w-32 p-1.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-[9px] text-slate-300">
            <div className="px-1.5 py-0.5 rounded bg-slate-800 text-white font-semibold">Right Click Menu</div>
            <div className="px-1.5 py-0.5 text-slate-400">Inspect</div>
          </div>
        </div>
      );
    case "dropdown-menu":
      return (
        <div className="w-full px-3 py-1 flex justify-center">
          <div className="w-32 p-1.5 rounded-xl bg-slate-950 border border-purple-500/30 space-y-1 text-[9px] text-slate-300 shadow-lg">
            <div className="px-1.5 py-0.5 flex justify-between text-white">
              <span>Options</span>
              <span>▼</span>
            </div>
            <div className="w-full h-[1px] bg-slate-800" />
            <div className="px-1.5 py-0.5 text-purple-300">Export ZIP</div>
          </div>
        </div>
      );
    case "command-menu":
    default:
      return (
        <div className="w-full px-3 py-1 flex justify-center">
          <div className="w-full p-2 rounded-xl bg-slate-950 border border-fuchsia-500/30 flex items-center justify-between text-[10px]">
            <span className="text-slate-400 flex items-center gap-1">
              <Search className="w-3 h-3 text-fuchsia-400" /> Search...
            </span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[9px]">⌘K</span>
          </div>
        </div>
      );
  }
}

/* -------------------------------------------------------------------------- */
/* Main Modal & Overlay Showcase Page                                         */
/* -------------------------------------------------------------------------- */

export default function ModalOverlayPage() {
  const navigate = useNavigate();

  // Overlay state hooks for live playground
  const [activeModal, setActiveModal] = useState(false);
  const [activeFormModal, setActiveFormModal] = useState(false);
  const [activeDialog, setActiveDialog] = useState(false);
  const [activeConfirm, setActiveConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activeAlert, setActiveAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("warning");
  const [activeDrawer, setActiveDrawer] = useState(false);
  const [drawerSide, setDrawerSide] = useState("right");
  const [activeBottomSheet, setActiveBottomSheet] = useState(false);
  const [activeSideSheet, setActiveSideSheet] = useState(false);
  const [activeCommand, setActiveCommand] = useState(false);

  // Filter Popover state
  const [popoverPlacement, setPopoverPlacement] = useState("bottom");

  // Submitted project notification log
  const [createdProject, setCreatedProject] = useState(null);

  const [activeTab, setActiveTab] = useState("collection");

  const handleSelectCard = (slug) => {
    navigate(`/modal-overlay/${slug}`);
  };

  const handleConfirmDelete = async () => {
    setConfirmLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setConfirmLoading(false);
    setActiveConfirm(false);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Breadcrumbs */}
      <Breadcrumbs onHome={() => navigate("/")} />

      {/* 2. Page Header */}
      <PageHeader onCustomize={() => navigate("/modal-overlay/customize")} />

      {/* 3. Tab Switcher & Quick Customize Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-slate-800 self-start">
          <button
            type="button"
            onClick={() => setActiveTab("collection")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "collection"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Browse Overlays ({modalOverlayComponents.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("my-designs")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "my-designs"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>My Saved Overlays</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => navigate("/modal-overlay/customize")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white shadow-md shadow-indigo-500/25 active:scale-[0.98] transition-all cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>🎨 Open Overlay Customizer</span>
        </button>
      </div>

      {activeTab === "my-designs" ? (
        <MyCustomizedOverlays onNewOverlay={() => navigate("/modal-overlay/customize")} />
      ) : (
        <>
          {/* 4. Component Showcase Grid */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                <span>Overlay Component Catalog</span>
              </h2>
              <span className="text-xs text-slate-400">
                Click any card to inspect code or customize directly
              </span>
            </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {modalOverlayComponents.map((item) => (
            <ShowcaseCard
              key={item.id}
              title={item.name}
              description={item.description}
              tag={item.tag}
              theme={item.theme}
              preview={<OverlayCardPreview id={item.id} />}
              onClick={() => handleSelectCard(item.slug)}
            />
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE LIVE PLAYGROUND / CANVAS */}
      <section className="space-y-12 pt-6 border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Live Interactive Playground</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Test All 12 Overlay Patterns in Real-Time
          </h2>
          <p className="text-sm text-slate-400">
            Interact with live trigger buttons, test focus traps, keyboard shortcuts, background scroll locking, and ESC dismiss.
          </p>
        </div>

        {/* SECTION 1: Modals & Forms */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  GROUP 1
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Modals, Dialogs &amp; Forms
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Centered overlays with focus trapping, backdrop blur, validation states, and action flows.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-6 rounded-3xl bg-slate-950/60 border border-slate-800/80 shadow-2xl">
            {/* 1. Basic Modal */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-white">Basic Modal</h4>
                <p className="text-xs text-slate-400">
                  Standard centered dialog with header, body text, and dismiss actions.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(true)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20"
              >
                Open Basic Modal
              </button>
            </div>

            {/* 2. Form Modal */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-white">Project Form Modal</h4>
                <p className="text-xs text-slate-400">
                  Full form with inputs, category dropdown, validation, and async loading.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveFormModal(true)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-all shadow-md shadow-purple-600/20"
              >
                Open Create Project Form
              </button>
            </div>

            {/* 3. Configuration Dialog */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-white">Configuration Dialog</h4>
                <p className="text-xs text-slate-400">
                  Interactive multi-action dialog for project parameters and deploy keys.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveDialog(true)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md shadow-blue-600/20"
              >
                Open Settings Dialog
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: Feedback & Alert Dialogs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  GROUP 2
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Confirmation &amp; System Alerts
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Destructive action guards and variant-specific system announcements.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 rounded-3xl bg-slate-950/60 border border-slate-800/80 shadow-2xl">
            {/* Delete Confirmation */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4 text-rose-400" />
                  <h4 className="text-sm font-bold text-white">Destructive Confirmation</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Guards dangerous actions (e.g. deleting templates) with async loading feedback.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveConfirm(true)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-all shadow-md shadow-rose-600/20"
              >
                Trigger Delete Confirmation
              </button>
            </div>

            {/* Alert Dialog with Variant Selector */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">Alert Dialog</h4>
                  <div className="flex gap-1.5">
                    {["info", "success", "warning", "error"].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setAlertVariant(v)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold capitalize transition-all ${
                          alertVariant === v
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                            : "bg-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-400">
                  Current alert variant: <span className="font-semibold text-amber-400 capitalize">{alertVariant}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveAlert(true)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 transition-all shadow-md shadow-amber-600/20"
              >
                Trigger {alertVariant} Alert
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 3: Sliding Drawers & Sheets */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  GROUP 3
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Drawers, Bottom Sheets &amp; Side Sheets
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Sliding perimeter overlays with directional edge animation and touch-friendly handles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-6 rounded-3xl bg-slate-950/60 border border-slate-800/80 shadow-2xl">
            {/* Sliding Drawer */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white">Sliding Drawer</h4>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400">Placement:</span>
                  {["right", "left", "bottom", "top"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setDrawerSide(s)}
                      className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold transition-all ${
                        drawerSide === s
                          ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                          : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveDrawer(true)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 transition-all shadow-md shadow-teal-600/20"
              >
                Open {drawerSide.toUpperCase()} Drawer
              </button>
            </div>

            {/* Mobile Bottom Sheet */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-white">Bottom Sheet</h4>
                <p className="text-xs text-slate-400">
                  Mobile-optimized bottom sheet with grab handle and quick actions.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveBottomSheet(true)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 transition-all shadow-md shadow-cyan-600/20"
              >
                Open Bottom Sheet
              </button>
            </div>

            {/* Filter Side Sheet */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-white">Filter Side Sheet</h4>
                <p className="text-xs text-slate-400">
                  Dedicated side panel with faceted filter options and reset actions.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveSideSheet(true)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-md shadow-emerald-600/20"
              >
                Open Filter Side Sheet
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 4: Popovers, Tooltips & Menus */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  GROUP 4
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Floating Popovers, Tooltips &amp; Menus
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Contextual floating overlays, right-click context menus, and global command palette.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-6 rounded-3xl bg-slate-950/60 border border-slate-800/80 shadow-2xl">
            {/* Popover */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-white">Floating Popover</h4>
                <p className="text-xs text-slate-400">Click trigger button below to open popover.</p>
              </div>
              <Popover
                placement="bottom"
                trigger={
                  <button
                    type="button"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-orange-600 hover:bg-orange-500 transition-all shadow-md shadow-orange-600/20"
                  >
                    Open Popover ▼
                  </button>
                }
              >
                <div className="space-y-2 text-left">
                  <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-orange-400" />
                    Quick Dimensions
                  </h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Adjust viewport preview constraints or export presets.
                  </p>
                  <div className="pt-2 flex justify-end">
                    <span className="text-[10px] font-mono text-orange-300 bg-orange-500/10 px-2 py-0.5 rounded">
                      Width: 100%
                    </span>
                  </div>
                </div>
              </Popover>
            </div>

            {/* Tooltip */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-white">Interactive Tooltips</h4>
                <p className="text-xs text-slate-400">Hover or focus over the button below.</p>
              </div>
              <Tooltip content="Copies clean JSX code snippet directly to clipboard" placement="top">
                <button
                  type="button"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <Copy className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Hover for Tooltip</span>
                </button>
              </Tooltip>
            </div>

            {/* Context Menu */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-white">Context Menu</h4>
                <p className="text-xs text-slate-400">Right-click within target area.</p>
              </div>
              <ContextMenu
                items={[
                  { id: "inspect", label: "Inspect Source", icon: Eye, shortcut: "⌘I" },
                  { id: "copy", label: "Copy Component", icon: Copy, shortcut: "⌘C" },
                  { separator: true },
                  { id: "del", label: "Delete", icon: Trash2, destructive: true, shortcut: "⌫" },
                ]}
              >
                <div className="py-2.5 px-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 text-center text-xs text-slate-400 hover:text-white transition-colors cursor-context-menu">
                  🖱️ Right Click Zone
                </div>
              </ContextMenu>
            </div>

            {/* Dropdown Menu */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-white">Dropdown Menu</h4>
                <p className="text-xs text-slate-400">Standard menu with keyboard navigation.</p>
              </div>
              <DropdownMenu
                items={[
                  { id: "profile", label: "View Profile", icon: Eye },
                  { id: "settings", label: "Preferences", icon: Settings, shortcut: "⌘," },
                  { separator: true },
                  { id: "signout", label: "Sign Out", destructive: true },
                ]}
                trigger={
                  <button
                    type="button"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-between"
                  >
                    <span>Actions Menu</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                }
              />
            </div>
          </div>
        </div>

        {/* Global Command Palette Trigger Bar */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-fuchsia-950/40 via-purple-950/40 to-slate-900 border border-fuchsia-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-fuchsia-400" />
              <span>Global Command Palette Available Anywhere</span>
            </h3>
            <p className="text-xs text-slate-400">
              Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">⌘ K</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">Ctrl + K</kbd> to jump between pages and trigger overlay commands instantly.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveCommand(true)}
            className="px-5 py-2.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-fuchsia-600/25 flex items-center gap-2 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Open Command Palette</span>
            <kbd className="px-1.5 py-0.5 rounded bg-fuchsia-800 text-[10px]">⌘K</kbd>
          </button>
        </div>
      </section>

      {/* ---------------------------------------------------------------------- */}
      {/* Active Overlay Renderers                                               */}
      {/* ---------------------------------------------------------------------- */}

      {/* 1. Basic Modal */}
      <Modal
        open={activeModal}
        onClose={() => setActiveModal(false)}
        title="Project Information"
        description="Review repository architecture and template configurations."
        size="md"
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setActiveModal(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800"
            >
              Close
            </button>
          </div>
        }
      >
        <div className="space-y-3 text-xs text-slate-300">
          <p>
            This modal is powered by the shared <code className="text-indigo-400 font-mono">useOverlay</code> hook. It automatically creates an accessible portal at <code className="text-indigo-400 font-mono">document.body</code>, locks background scrolling, traps keyboard focus, and closes safely on ESC.
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-white">Accessibility Verified:</span>
            <p className="text-slate-400">ARIA attributes <code className="text-indigo-300">role="dialog"</code> and <code className="text-indigo-300">aria-modal="true"</code> applied.</p>
          </div>
        </div>
      </Modal>

      {/* 2. Form Modal */}
      <FormModal
        open={activeFormModal}
        onClose={() => setActiveFormModal(false)}
        onSubmitSuccess={(data) => setCreatedProject(data)}
      />

      {/* 3. Configuration Dialog */}
      <Dialog
        open={activeDialog}
        onClose={() => setActiveDialog(false)}
        title="Project Configuration"
        description="Manage deployment pipelines and environment variables."
        size="md"
        actions={
          <button
            onClick={() => setActiveDialog(false)}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500"
          >
            Save Configuration
          </button>
        }
      >
        <div className="space-y-3 text-xs">
          <label className="block space-y-1">
            <span className="font-semibold text-slate-300">Build Command</span>
            <input
              type="text"
              defaultValue="vite build"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
            />
          </label>
          <label className="block space-y-1">
            <span className="font-semibold text-slate-300">Output Directory</span>
            <input
              type="text"
              defaultValue="dist"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
            />
          </label>
        </div>
      </Dialog>

      {/* 4. Confirm Dialog */}
      <ConfirmDialog
        open={activeConfirm}
        onClose={() => setActiveConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Component?"
        description="Are you sure you want to delete this component? This action is permanent and cannot be reversed."
        confirmText="Yes, Delete"
        variant="danger"
        isLoading={confirmLoading}
      />

      {/* 5. Alert Dialog */}
      <AlertDialog
        open={activeAlert}
        onClose={() => setActiveAlert(false)}
        variant={alertVariant}
        title={
          alertVariant === "warning"
            ? "Unsaved Changes Detected"
            : alertVariant === "error"
            ? "Network Disconnected"
            : alertVariant === "success"
            ? "Deployment Complete"
            : "System Maintenance Notice"
        }
        description={
          alertVariant === "warning"
            ? "You have unsaved changes in your form builder. Leaving now will discard edits."
            : alertVariant === "error"
            ? "Unable to reach Supabase backend. Switched to offline LocalStorage mode."
            : alertVariant === "success"
            ? "All assets and styles have been bundled and published to the production CDN."
            : "Scheduled system upgrade will occur at 02:00 UTC."
        }
        actionText="Acknowledge"
        cancelText={alertVariant === "warning" ? "Keep Editing" : undefined}
      />

      {/* 6. Sliding Drawer */}
      <Drawer
        open={activeDrawer}
        onClose={() => setActiveDrawer(false)}
        side={drawerSide}
        size="md"
        title={`${drawerSide.toUpperCase()} Sliding Drawer`}
        description="Slide-in navigation panel and inspector canvas."
        footer={
          <button
            onClick={() => setActiveDrawer(false)}
            className="px-4 py-2 bg-teal-600 text-white text-xs font-semibold rounded-xl"
          >
            Done
          </button>
        }
      >
        <div className="space-y-4 text-xs text-slate-300">
          <p>
            Sliding drawers provide an expansive lateral or vertical canvas for inspecting deep properties, logs, or secondary workflows.
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-semibold text-white">Drawer Details:</span>
            <ul className="list-disc pl-4 space-y-1 text-slate-400">
              <li>Current placement: <strong className="text-teal-400">{drawerSide}</strong></li>
              <li>Supports Left, Right, Top, and Bottom sides</li>
              <li>Transitions smoothly using CSS slide transforms</li>
            </ul>
          </div>
        </div>
      </Drawer>

      {/* 7. Bottom Sheet */}
      <BottomSheet
        open={activeBottomSheet}
        onClose={() => setActiveBottomSheet(false)}
        title="Mobile Actions"
        description="Choose a quick action for this component."
      >
        <div className="space-y-2">
          <button
            onClick={() => setActiveBottomSheet(false)}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            <span>Download Component ZIP</span>
            <span className="text-cyan-400">→</span>
          </button>
          <button
            onClick={() => setActiveBottomSheet(false)}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            <span>Duplicate Template</span>
            <span className="text-cyan-400">→</span>
          </button>
        </div>
      </BottomSheet>

      {/* 8. Filter Side Sheet */}
      <SideSheet
        open={activeSideSheet}
        onClose={() => setActiveSideSheet(false)}
        title="Filter Component Catalog"
        description="Filter by framework, category, and styling methodology."
        footer={
          <button
            onClick={() => setActiveSideSheet(false)}
            className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl"
          >
            Apply Filters
          </button>
        }
      >
        <div className="space-y-4 text-xs">
          <div className="space-y-2">
            <span className="font-semibold text-slate-300 block">Framework</span>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                React 19
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400">
                Vue 3
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400">
                Svelte
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <span className="font-semibold text-slate-300 block">Styling</span>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                Tailwind CSS
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400">
                SCSS Modules
              </span>
            </div>
          </div>
        </div>
      </SideSheet>

        <CommandMenu
          open={activeCommand}
          onClose={() => setActiveCommand(false)}
          onAction={(item) => {
            if (item.action === "modal") setActiveModal(true);
            else if (item.action === "form-modal") setActiveFormModal(true);
            else if (item.action === "drawer") setActiveDrawer(true);
            else if (item.action === "alert") setActiveAlert(true);
            else if (item.action === "confirm") setActiveConfirm(true);
          }}
        />
      </>
      )}
    </div>
  );
}
