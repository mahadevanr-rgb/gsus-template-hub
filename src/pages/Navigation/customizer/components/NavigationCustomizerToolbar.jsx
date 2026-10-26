import React from "react";
import { Compass } from "lucide-react";
import CustomizerSharedToolbar from "@/components/common/Customizer/CustomizerSharedToolbar";

export default function NavigationCustomizerToolbar({
  navName,
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
  sourcePatternTitle = "Navbar",
}) {
  return (
    <CustomizerSharedToolbar
      name={navName}
      onNameChange={onNameChange}
      onBack={onBack}
      backTitle="Back to Navigation Catalog"
      canUndo={canUndo}
      canRedo={canRedo}
      onUndo={onUndo}
      onRedo={onRedo}
      onReset={onReset}
      resetConfirmMessage="Reset all settings to component defaults?"
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
      patternIcon={Compass}
    />
  );
}
