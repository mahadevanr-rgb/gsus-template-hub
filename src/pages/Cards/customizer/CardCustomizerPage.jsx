import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useCardCustomization } from "./useCardCustomization";
import { fetchCustomizedCard } from "@/services/cardCustomizerDb";
import { getCardSchema } from "./cardCustomizerConfig";
import CardCustomizerToolbar from "./components/CardCustomizerToolbar";
import CardCustomizerPanel from "./components/CardCustomizerPanel";
import CardPreviewCanvas from "./components/CardPreviewCanvas";
import CardCodePreview from "./components/CardCodePreview";
import CardExportMenu from "./components/CardExportMenu";
import TemplateSelectorModal from "./components/TemplateSelectorModal";
import { Sliders, Eye, Code, PanelRightClose, PanelRightOpen } from "lucide-react";

export default function CardCustomizerPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryDesignId = searchParams.get("design");
  const queryTemplateId = searchParams.get("template");

  // Determine initial source template or saved card ID
  const initialId = id || queryDesignId || queryTemplateId || "profile-card";

  const {
    config,
    updateConfig,
    undo,
    redo,
    canUndo,
    canRedo,
    resetToDefaults,
    switchTemplate,
    save,
    loadConfig,
    isDirty,
    isSaving,
    saveStatus,
    viewportMode,
    setViewportMode,
    zoom,
    setZoom,
    canvasBg,
    setCanvasBg,
  } = useCardCustomization(initialId);

  // Modal states
  const [showExportModal, setShowExportModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);

  // Responsive active view for mobile / tablet screens ('controls' | 'preview')
  const [mobileTab, setMobileTab] = useState("preview");

  // Check if initialId represents a saved customized card in DB/localStorage
  useEffect(() => {
    async function loadSavedCardIfPresent() {
      const targetId = queryDesignId || (id?.startsWith("custom-card-") ? id : null);
      if (targetId) {
        try {
          const savedCard = await fetchCustomizedCard(targetId);
          if (savedCard) {
            loadConfig(savedCard);
          }
        } catch (err) {
          console.warn("Could not load saved design, falling back to base template:", err);
        }
      }
    }
    loadSavedCardIfPresent();
  }, [id, queryDesignId, loadConfig]);

  // Handle Back to Cards with confirmation if unsaved
  const handleBack = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        "You have unsaved changes to your card design. Are you sure you want to leave?"
      );
      if (!confirmLeave) return;
    }
    navigate("/cards");
  };

  const currentSchema = getCardSchema(config.sourceCardId);

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 overflow-hidden select-none">
      {/* Top Application Toolbar */}
      <CardCustomizerToolbar
        cardName={config.name}
        onNameChange={(name) => updateConfig("name", name)}
        onBack={handleBack}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        onReset={resetToDefaults}
        isDirty={isDirty}
        isSaving={isSaving}
        saveStatus={saveStatus}
        onSave={save}
        onOpenExport={() => setShowExportModal(true)}
        onOpenCode={() => setShowCodeModal(true)}
        onOpenTemplateSelector={() => setShowTemplateModal(true)}
        viewportMode={viewportMode}
        onViewportChange={setViewportMode}
        sourceCardTitle={currentSchema.title}
      />

      {/* Mobile/Tablet Screen View Mode Switcher */}
      <div className="lg:hidden flex items-center justify-center gap-1.5 p-2 bg-slate-100 dark:bg-[#0d1322] border-b border-slate-200 dark:border-slate-800 text-xs shrink-0">
        <button
          type="button"
          onClick={() => setMobileTab("controls")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer ${
            mobileTab === "controls"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Customize Controls</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer ${
            mobileTab === "preview"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Main Workspace Stage - Spacious 2-Column Studio */}
      <div className="flex-1 flex overflow-hidden min-h-0 relative">
        {/* Left Column: Customization Controls Panel */}
        <div
          className={`w-full lg:w-80 xl:w-96 shrink-0 h-full overflow-hidden transition-all duration-200 border-r border-slate-200 dark:border-slate-800 ${
            mobileTab === "controls" ? "block" : "hidden lg:block"
          }`}
        >
          <CardCustomizerPanel config={config} updateConfig={updateConfig} />
        </div>

        {/* Spacious Canvas: Live Preview */}
        <div
          className={`flex-1 h-full min-w-0 overflow-hidden relative ${
            mobileTab === "preview" ? "block" : "hidden lg:block"
          }`}
        >
          <CardPreviewCanvas
            config={config}
            viewportMode={viewportMode}
            zoom={zoom}
            onZoomChange={setZoom}
            canvasBg={canvasBg}
            onCanvasBgChange={setCanvasBg}
            onPreviewAction={() => {}}
          />
        </div>
      </div>

      {/* Export Options Modal Dialog */}
      {showExportModal && (
        <CardExportMenu
          config={config}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {/* Code Inspector Modal Dialog */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 dark:bg-[#0d1322] border-b border-slate-200 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Generated Code & Export</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">({config.name})</span>
              </div>
              <button
                type="button"
                onClick={() => setShowCodeModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              <CardCodePreview config={config} onLoadConfig={loadConfig} />
            </div>
          </div>
        </div>
      )}

      {/* Template Switcher Modal Dialog */}
      {showTemplateModal && (
        <TemplateSelectorModal
          currentTemplateId={config.sourceCardId}
          onSelectTemplate={(newId) => switchTemplate(newId)}
          onClose={() => setShowTemplateModal(false)}
        />
      )}
    </div>
  );
}

