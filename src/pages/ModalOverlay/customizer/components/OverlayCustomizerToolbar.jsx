import React from "react";
import { Layers } from "lucide-react";
import CustomizerSharedToolbar from "@/components/common/Customizer/CustomizerSharedToolbar";

export default function OverlayCustomizerToolbar({
  overlayName,
  onNameChange,
  onBack,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onReset,
  isDirty,
  isSaving,
  saveStatus,
  onSave,
  onOpenExport,
  onOpenCode,
  onOpenTemplateSelector,
  viewportMode,
  onViewportChange,
  sourcePatternTitle = "Modal",
}) {
  return (
    <CustomizerSharedToolbar
      name={overlayName}
      onNameChange={onNameChange}
      onBack={onBack}
      backTitle="Back to Modal & Overlay Catalog"
      canUndo={canUndo}
      canRedo={canRedo}
      onUndo={onUndo}
      onRedo={onRedo}
      onReset={onReset}
      resetConfirmMessage="Reset all customizations to pattern defaults?"
      isDirty={isDirty}
      isSaving={isSaving}
      saveStatus={saveStatus}
      onSave={onSave}
      onOpenExport={onOpenExport}
      onOpenCode={onOpenCode}
      onOpenTemplateSelector={onOpenTemplateSelector}
      viewportMode={viewportMode}
      onViewportChange={onViewportChange}
      sourcePatternTitle={sourcePatternTitle}
      patternIcon={Layers}
    />
  );
}
