import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useAccordionCustomization } from "./useAccordionCustomization";
import { fetchCustomizedAccordion } from "@/services/accordionCustomizerDb";
import { getAccordionSchema } from "./accordionCustomizerConfig";
import AccordionCustomizerToolbar from "./components/AccordionCustomizerToolbar";
import AccordionCustomizerPanel from "./components/AccordionCustomizerPanel";
import AccordionPreviewCanvas from "./components/AccordionPreviewCanvas";
import AccordionCodePreview from "./components/AccordionCodePreview";
import AccordionExportMenu from "./components/AccordionExportMenu";
import AccordionTemplateSelectorModal from "./components/AccordionTemplateSelectorModal";
import { Sliders, Eye, Code } from "lucide-react";

export default function AccordionCustomizerPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryDesignId = searchParams.get("design");
  const queryTemplateId = searchParams.get("template");

  // Determine initial source template or saved accordion ID
  const initialId = id || queryDesignId || queryTemplateId || "numbered-accordion";

  const {
    config,
    updateConfig,
    updateItem,
    addItem,
    removeItem,
    duplicateItem,
    reorderItems,
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
  } = useAccordionCustomization(initialId);

  // Modal states
  const [showExportModal, setShowExportModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);

  // Responsive active view for mobile / tablet screens ('controls' | 'preview')
  const [mobileTab, setMobileTab] = useState("preview");

  // Check if initialId represents a saved customized accordion in DB/localStorage
  useEffect(() => {
    async function loadSavedAccordionIfPresent() {
      const targetId = queryDesignId || (id?.startsWith("custom-accordion-") ? id : null);
      if (targetId) {
        try {
          const savedAccordion = await fetchCustomizedAccordion(targetId);
          if (savedAccordion) {
            loadConfig(savedAccordion);
          }
        } catch (err) {
          console.warn("Could not load saved accordion design, falling back to base template:", err);
        }
      }
    }
    loadSavedAccordionIfPresent();
  }, [id, queryDesignId, loadConfig]);

  // Handle Back to Accordion page with confirmation if unsaved
  const handleBack = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        "You have unsaved changes to your accordion design. Are you sure you want to leave?"
      );
      if (!confirmLeave) return;
    }
    navigate("/accordion");
  };

  const currentSchema = getAccordionSchema(config.sourceComponentId);

  return (
    <div className="flex flex-col h-screen w-full bg-[#0b0f19] text-slate-100 overflow-hidden select-none">
      {/* Top Application Toolbar */}
      <AccordionCustomizerToolbar
        accordionName={config.name}
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
        sourcePatternTitle={currentSchema?.title || "Accordion"}
      />

      {/* Mobile/Tablet Screen View Mode Switcher */}
      <div className="lg:hidden flex items-center justify-center gap-1.5 p-2 bg-[#0d1322] border-b border-slate-800 text-xs shrink-0">
        <button
          onClick={() => setMobileTab("controls")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-colors ${
            mobileTab === "controls"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Customize Controls</span>
        </button>
        <button
          onClick={() => setMobileTab("preview")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-semibold transition-colors ${
            mobileTab === "preview"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-400 hover:text-white"
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
          className={`w-full lg:w-80 xl:w-96 shrink-0 h-full overflow-hidden transition-all duration-200 border-r border-slate-800 ${
            mobileTab === "controls" ? "block" : "hidden lg:block"
          }`}
        >
          <AccordionCustomizerPanel
            config={config}
            updateConfig={updateConfig}
            updateItem={updateItem}
            addItem={addItem}
            removeItem={removeItem}
            duplicateItem={duplicateItem}
            reorderItems={reorderItems}
          />
        </div>

        {/* Spacious Canvas: Live Preview */}
        <div
          className={`flex-1 h-full min-w-0 overflow-hidden relative ${
            mobileTab === "preview" ? "block" : "hidden lg:block"
          }`}
        >
          <AccordionPreviewCanvas
            config={config}
            viewportMode={viewportMode}
            zoom={zoom}
            onZoomChange={setZoom}
            canvasBg={canvasBg}
            onCanvasBgChange={setCanvasBg}
          />
        </div>
      </div>

      {/* Export Options Modal Dialog */}
      {showExportModal && (
        <AccordionExportMenu
          config={config}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {/* Code Inspector Modal Dialog */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl max-w-4xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#0d1322] border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-sm text-white">Generated Code & Export</h3>
                <span className="text-xs text-slate-400">({config.name})</span>
              </div>
              <button
                onClick={() => setShowCodeModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              <AccordionCodePreview config={config} onLoadConfig={loadConfig} />
            </div>
          </div>
        </div>
      )}

      {/* Template Switcher Modal Dialog */}
      {showTemplateModal && (
        <AccordionTemplateSelectorModal
          currentTemplateId={config.sourceComponentId}
          onSelectTemplate={(newId) => switchTemplate(newId)}
          onClose={() => setShowTemplateModal(false)}
        />
      )}
    </div>
  );
}
