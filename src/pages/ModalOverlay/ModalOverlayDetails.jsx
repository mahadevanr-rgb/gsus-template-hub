import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getComponent } from "@/codeRegistry/codeRegistry";
import ComponentDetailsView from "@/components/common/ComponentDetailsView/ComponentDetailsView";
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
import {
  SlidersHorizontal,
  Copy,
  Trash2,
  Sparkles,
  Layers,
  Settings,
  Download,
  Eye,
} from "lucide-react";

const overlaySiblings = [
  { slug: "basic-modal", name: "Basic Modal" },
  { slug: "form-modal", name: "Form Modal" },
  { slug: "dialog", name: "Configuration Dialog" },
  { slug: "confirm-dialog", name: "Confirmation Dialog" },
  { slug: "alert-dialog", name: "Alert Dialog" },
  { slug: "drawer", name: "Sliding Drawer" },
  { slug: "bottom-sheet", name: "Mobile Bottom Sheet" },
  { slug: "side-sheet", name: "Filter Side Sheet" },
  { slug: "popover", name: "Floating Popover" },
  { slug: "tooltip", name: "Interactive Tooltip" },
  { slug: "context-menu", name: "Custom Context Menu" },
  { slug: "dropdown-menu", name: "Dropdown Menu" },
  { slug: "command-menu", name: "Command Palette (⌘K)" },
];

export default function ModalOverlayDetails({ selected, onBack, onNavigateHome }) {
  const params = useParams();
  const navigate = useNavigate();

  const activeSlug = selected || params.id || "basic-modal";
  const [currentSlug, setCurrentSlug] = useState(activeSlug);

  // Playground state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState("md");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSide, setDrawerSide] = useState("right");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertVariant, setAlertVariant] = useState("warning");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmVariant, setConfirmVariant] = useState("danger");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sideSheetOpen, setSideSheetOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  // Popover & Tooltip playground state
  const [popoverPlacement, setPopoverPlacement] = useState("bottom");
  const [tooltipPlacement, setTooltipPlacement] = useState("top");

  useEffect(() => {
    if (selected) {
      setCurrentSlug(selected);
    } else if (params.id) {
      setCurrentSlug(params.id);
    }
  }, [selected, params.id]);

  const component = getComponent(currentSlug);

  const handleBack = () => {
    if (onBack) onBack();
    else navigate("/modal-overlay");
  };

  const handleHome = () => {
    if (onNavigateHome) onNavigateHome();
    else navigate("/");
  };

  const handleConfirmAction = async () => {
    setConfirmLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setConfirmLoading(false);
    setConfirmOpen(false);
  };

  const renderCustomPreview = () => {
    switch (currentSlug) {
      case "basic-modal":
        return (
          <div className="w-full max-w-lg space-y-5 py-4 text-center">
            {/* Props Bar */}
            <div className="flex items-center justify-center gap-2 p-2 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">Modal Size:</span>
              {["sm", "md", "lg", "xl"].map((s) => (
                <button
                  key={s}
                  onClick={() => setModalSize(s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                    modalSize === s
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all"
            >
              Open Basic Modal ({modalSize.toUpperCase()})
            </button>

            <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              size={modalSize}
              title="Basic Modal Preview"
              description="Demonstrating ESC close, focus trap, and background scroll locking."
              footer={
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
                >
                  Got It
                </button>
              }
            >
              <p className="text-slate-300 text-xs leading-relaxed">
                This dialog uses the centralized <code className="text-indigo-400 font-mono">useOverlay</code> engine. Pressing <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px]">ESC</kbd> or clicking the backdrop dismisses this overlay cleanly.
              </p>
            </Modal>
          </div>
        );

      case "form-modal":
        return (
          <div className="w-full max-w-lg space-y-4 py-4 text-center">
            <button
              onClick={() => setFormModalOpen(true)}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-purple-600/25 transition-all"
            >
              Open Create Project Form Modal
            </button>

            <FormModal
              open={formModalOpen}
              onClose={() => setFormModalOpen(false)}
            />
          </div>
        );

      case "dialog":
        return (
          <div className="w-full max-w-lg space-y-4 py-4 text-center">
            <button
              onClick={() => setDialogOpen(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-blue-600/25 transition-all"
            >
              Open Configuration Dialog
            </button>

            <Dialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              title="Build & Deployment Settings"
              description="Configure build pipelines and distribution destinations."
              actions={
                <button
                  onClick={() => setDialogOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl"
                >
                  Save Settings
                </button>
              }
            >
              <div className="space-y-3 text-xs text-slate-300 text-left">
                <p>Manage project distribution directories and environment hooks.</p>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="font-mono text-blue-400">NEXT_PUBLIC_API_URL</span>
                </div>
              </div>
            </Dialog>
          </div>
        );

      case "confirm-dialog":
        return (
          <div className="w-full max-w-lg space-y-5 py-4 text-center">
            <div className="flex items-center justify-center gap-2 p-2 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">Variant:</span>
              {["danger", "warning", "info"].map((v) => (
                <button
                  key={v}
                  onClick={() => setConfirmVariant(v)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                    confirmVariant === v
                      ? "bg-rose-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            <button
              onClick={() => setConfirmOpen(true)}
              className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-rose-600/25 transition-all"
            >
              Trigger {confirmVariant.toUpperCase()} Confirmation
            </button>

            <ConfirmDialog
              open={confirmOpen}
              onClose={() => setConfirmOpen(false)}
              onConfirm={handleConfirmAction}
              title="Delete Component Template?"
              description="This will remove the component from the active registry. You can reinstall it anytime from git."
              confirmText="Delete Component"
              variant={confirmVariant}
              isLoading={confirmLoading}
            />
          </div>
        );

      case "alert-dialog":
        return (
          <div className="w-full max-w-lg space-y-5 py-4 text-center">
            <div className="flex items-center justify-center gap-2 p-2 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">Alert Variant:</span>
              {["info", "success", "warning", "error"].map((v) => (
                <button
                  key={v}
                  onClick={() => setAlertVariant(v)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                    alertVariant === v
                      ? "bg-amber-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            <button
              onClick={() => setAlertOpen(true)}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-amber-600/25 transition-all"
            >
              Trigger {alertVariant.toUpperCase()} Alert
            </button>

            <AlertDialog
              open={alertOpen}
              onClose={() => setAlertOpen(false)}
              variant={alertVariant}
              title={`System ${alertVariant.toUpperCase()} Alert`}
              description="Demonstrating variant-specific iconography, badges, borders, and action styles."
            />
          </div>
        );

      case "drawer":
        return (
          <div className="w-full max-w-lg space-y-5 py-4 text-center">
            <div className="flex items-center justify-center gap-2 p-2 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">Drawer Side:</span>
              {["right", "left", "top", "bottom"].map((s) => (
                <button
                  key={s}
                  onClick={() => setDrawerSide(s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                    drawerSide === s
                      ? "bg-teal-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              onClick={() => setDrawerOpen(true)}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-teal-600/25 transition-all"
            >
              Open {drawerSide.toUpperCase()} Sliding Drawer
            </button>

            <Drawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              side={drawerSide}
              size="md"
              title={`${drawerSide.toUpperCase()} Drawer`}
              description="Side panel with smooth CSS slide animations and full keyboard control."
            >
              <div className="space-y-3 text-xs text-slate-300 text-left">
                <p>
                  Drawers lock background body scrolling and close when you press ESC or click outside.
                </p>
              </div>
            </Drawer>
          </div>
        );

      case "bottom-sheet":
        return (
          <div className="w-full max-w-lg space-y-4 py-4 text-center">
            <button
              onClick={() => setSheetOpen(true)}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-cyan-600/25 transition-all"
            >
              Open Mobile Bottom Sheet
            </button>

            <BottomSheet
              open={sheetOpen}
              onClose={() => setSheetOpen(false)}
              title="Mobile Quick Actions"
              description="Choose an action to perform on this template."
            >
              <div className="space-y-2">
                <button
                  onClick={() => setSheetOpen(false)}
                  className="w-full text-left p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  📥 Export as Component ZIP
                </button>
                <button
                  onClick={() => setSheetOpen(false)}
                  className="w-full text-left p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  📋 Copy Import Statement
                </button>
              </div>
            </BottomSheet>
          </div>
        );

      case "side-sheet":
        return (
          <div className="w-full max-w-lg space-y-4 py-4 text-center">
            <button
              onClick={() => setSideSheetOpen(true)}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-emerald-600/25 transition-all"
            >
              Open Filter Side Sheet
            </button>

            <SideSheet
              open={sideSheetOpen}
              onClose={() => setSideSheetOpen(false)}
              title="Component Filter Facets"
              description="Refine displayed components by category and tags."
            >
              <div className="space-y-4 text-xs text-left">
                <div className="space-y-2">
                  <span className="font-semibold text-slate-300">Category</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Buttons
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Cards
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Overlays
                    </span>
                  </div>
                </div>
              </div>
            </SideSheet>
          </div>
        );

      case "popover":
        return (
          <div className="w-full max-w-lg space-y-6 py-4 text-center">
            <div className="flex items-center justify-center gap-2 p-2 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">Placement:</span>
              {["top", "bottom", "left", "right"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPopoverPlacement(p)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                    popoverPlacement === p
                      ? "bg-orange-600 text-white shadow-md shadow-orange-600/25"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="py-12 flex justify-center">
              <Popover
                key={popoverPlacement}
                placement={popoverPlacement}
                trigger={
                  <button
                    type="button"
                    className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl text-xs font-bold shadow-xl shadow-orange-600/30 transition-all flex items-center gap-2"
                  >
                    <span>Click to Toggle Popover</span>
                    <span className="px-1.5 py-0.5 rounded bg-orange-700 text-[10px] uppercase font-mono">
                      {popoverPlacement}
                    </span>
                  </button>
                }
              >
                <div className="space-y-2.5 text-left">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-orange-400" />
                      Filter Dimensions
                    </h4>
                    <span className="text-[10px] text-orange-300 font-mono bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">
                      Active
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Floating contextual card automatically positioned with viewport boundary detection.
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-500">
                    <span>Press ESC to dismiss</span>
                    <span className="text-orange-400 font-semibold cursor-pointer">Reset</span>
                  </div>
                </div>
              </Popover>
            </div>
          </div>
        );

      case "tooltip":
        return (
          <div className="w-full max-w-lg space-y-6 py-4 text-center">
            <div className="flex items-center justify-center gap-2 p-2 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400">Placement:</span>
              {["top", "bottom", "left", "right"].map((p) => (
                <button
                  key={p}
                  onClick={() => setTooltipPlacement(p)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                    tooltipPlacement === p
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="py-12 flex justify-center">
              <Tooltip
                key={tooltipPlacement}
                content={`Tooltip positioned at "${tooltipPlacement.toUpperCase()}" with arrow alignment`}
                placement={tooltipPlacement}
                delay={50}
              >
                <button
                  type="button"
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs font-bold border border-slate-700 flex items-center gap-2.5 shadow-xl transition-all cursor-pointer"
                >
                  <Copy className="w-4 h-4 text-indigo-400" />
                  <span>Hover or Focus Me ({tooltipPlacement.toUpperCase()})</span>
                </button>
              </Tooltip>
            </div>

            <p className="text-[11px] text-slate-500">
              💡 Hover over the button or navigate with <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">Tab</kbd> to trigger the tooltip.
            </p>
          </div>
        );

      case "context-menu":
        return (
          <div className="w-full max-w-lg space-y-4 py-4 text-center">
            <ContextMenu
              items={[
                { id: "edit", label: "Edit Component", icon: Sparkles, shortcut: "⌘E" },
                { id: "copy", label: "Copy Snippet", icon: Copy, shortcut: "⌘C" },
                { separator: true },
                { id: "delete", label: "Delete", icon: Trash2, destructive: true, shortcut: "⌫" },
              ]}
            >
              <div className="p-12 rounded-3xl border border-dashed border-slate-700 bg-slate-950/60 text-center text-xs text-slate-400 hover:text-white transition-colors cursor-context-menu">
                🖱️ Right click anywhere inside this box to open the custom context menu!
              </div>
            </ContextMenu>
          </div>
        );

      case "dropdown-menu":
        return (
          <div className="w-full max-w-lg space-y-4 py-4 flex justify-center">
            <DropdownMenu
              items={[
                { id: "export", label: "Export as ZIP", icon: Download, shortcut: "⌘S" },
                { id: "settings", label: "Preferences", icon: Settings },
                { separator: true },
                { id: "upgrade", label: "Upgrade Plan", icon: Sparkles },
              ]}
              trigger={
                <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs font-bold border border-slate-700 flex items-center gap-2 shadow-lg">
                  <span>Open Dropdown Menu ▼</span>
                </button>
              }
            />
          </div>
        );

      case "command-menu":
      default:
        return (
          <div className="w-full max-w-lg space-y-4 py-4 text-center">
            <button
              onClick={() => setCommandOpen(true)}
              className="px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-2xl text-xs font-bold shadow-lg shadow-fuchsia-600/25 transition-all flex items-center gap-2 mx-auto"
            >
              <span>Open Command Palette</span>
              <kbd className="px-1.5 py-0.5 rounded bg-fuchsia-800 text-[10px]">⌘K</kbd>
            </button>

            <CommandMenu
              open={commandOpen}
              onClose={() => setCommandOpen(false)}
            />
          </div>
        );
    }
  };

  const handleCustomize = () => {
    navigate(`/modal-overlay/customize?template=${currentSlug}`);
  };

  const renderSidebar = () => (
    <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900/60 border border-indigo-500/20 space-y-3">
      <div className="flex items-center gap-2 text-indigo-400">
        <Sparkles className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-wider">Interactive Customizer</span>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">
        Live-tune dimensions, positions, color schemes, animations, and dismissal rules in the studio.
      </p>
      <button
        type="button"
        onClick={handleCustomize}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/30 active:scale-[0.98] transition-all cursor-pointer"
      >
        <span>⚡ Customize This Overlay</span>
      </button>
    </div>
  );

  return (
    <ComponentDetailsView
      component={component}
      categoryName="Modal & Overlay"
      categoryPath="/modal-overlay"
      subCategories={overlaySiblings}
      activeSlug={currentSlug}
      onSelectSibling={(slug) => {
        setCurrentSlug(slug);
        navigate(`/modal-overlay/${slug}`);
      }}
      onBack={handleBack}
      onNavigateHome={handleHome}
      renderCustomPreview={renderCustomPreview}
      renderSidebar={renderSidebar}
    />
  );
}
