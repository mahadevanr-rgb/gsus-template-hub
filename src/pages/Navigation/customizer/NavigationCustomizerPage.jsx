import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useNavigationCustomization } from "./useNavigationCustomization";
import { fetchCustomizedNavigation } from "@/services/navigationCustomizerDb";
import { getNavigationSchema } from "./navigationCustomizerConfig";
import NavigationCustomizerToolbar from "./components/NavigationCustomizerToolbar";
import NavigationCustomizerPanel from "./components/NavigationCustomizerPanel";
import NavigationPreviewCanvas from "./components/NavigationPreviewCanvas";
import NavigationCodePreview from "./components/NavigationCodePreview";
import NavigationExportMenu from "./components/NavigationExportMenu";
import NavigationTemplateSelectorModal from "./components/NavigationTemplateSelectorModal";
import { Sliders, Eye, Code } from "lucide-react";

export default function NavigationCustomizerPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryDesignId = searchParams.get("design");
  const queryTemplateId = searchParams.get("template");

  // Initial source pattern or saved design ID
  const initialId = id || queryDesignId || queryTemplateId || "navbar";

  const {
    config,
    updateConfig,
    undo,
    redo,
    canUndo,
    canRedo,
    resetToDefaults,
    switchComponent,
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
  } = useNavigationCustomization(initialId);

  // Modal dialog states
  const [showExportModal, setShowExportModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);

  // Responsive active view for mobile / tablet screens ('controls' | 'preview')
  const [mobileTab, setMobileTab] = useState("preview");

  // Load saved navigation if id represents a saved custom design
  useEffect(() => {
    async function loadSavedNavigationIfPresent() {
      const targetId = queryDesignId || (id?.startsWith("custom-nav-") ? id : null);
      if (targetId) {
        try {
          const savedNav = await fetchCustomizedNavigation(targetId);
          if (savedNav) {
            loadConfig(savedNav);
          }
        } catch (err) {
          console.warn("Could not load saved navigation design, falling back to base template:", err);
        }
      }
    }
    loadSavedNavigationIfPresent();
  }, [id, queryDesignId, loadConfig]);

  // Sync template from URL query param if user arrived with ?template=...
  useEffect(() => {
    if (queryTemplateId && queryTemplateId !== config.sourceComponentId) {
      switchComponent(queryTemplateId);
    }
  }, [queryTemplateId, switchComponent]);

  // Handle Back to Navigation catalog with unsaved changes confirmation
  const handleBack = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        "You have unsaved changes to your navigation design. Are you sure you want to leave?"
      );
      if (!confirmLeave) return;
    }
    navigate("/navigation");
  };

  const currentPatternMeta = getNavigationSchema(
    config.sourceComponentId || config.componentType || "navbar"
  );

  return (
    <div className="flex flex-col h-screen w-full bg-[#0b0f19] text-slate-100 overflow-hidden select-none">
      {/* Top Application Toolbar */}
      <NavigationCustomizerToolbar
        navName={config.name}
        onNameChange={(name) => updateConfig((prev) => ({ ...prev, name }))}
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
        sourcePatternTitle={currentPatternMeta?.name || "Navbar"}
      />

      {/* Mobile/Tablet Screen View Mode Switcher */}
      <div className="lg:hidden flex items-center justify-center gap-1.5 p-2 bg-[#0d1322] border-b border-slate-800 text-xs shrink-0">
        <button
          type="button"
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
          type="button"
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
          <NavigationCustomizerPanel
            config={config}
            updateConfig={updateConfig}
          />
        </div>

        {/* Center / Right Column: Live Interactive Preview Stage */}
        <div
          className={`flex-1 h-full min-w-0 relative ${
            mobileTab === "preview" ? "block" : "hidden lg:block"
          }`}
        >
          <NavigationPreviewCanvas
            config={config}
            viewportMode={viewportMode}
            zoom={zoom}
            onZoomChange={setZoom}
            canvasBg={canvasBg}
            onCanvasBgChange={setCanvasBg}
          />
        </div>
      </div>

      {/* Template Selector Modal */}
      {showTemplateModal && (
        <NavigationTemplateSelectorModal
          currentTemplateId={config.sourceComponentId || config.componentType}
          onSelectTemplate={(newId) => switchComponent(newId)}
          onClose={() => setShowTemplateModal(false)}
        />
      )}

      {/* Code Inspector & Import Modal */}
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
                type="button"
                onClick={() => setShowCodeModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              <NavigationCodePreview
                config={config}
                onLoadConfig={(importedConfig) => loadConfig(importedConfig)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Export Bundle Modal */}
      {showExportModal && (
        <NavigationExportMenu
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          config={config}
        />
      )}
    </div>
  );
}
