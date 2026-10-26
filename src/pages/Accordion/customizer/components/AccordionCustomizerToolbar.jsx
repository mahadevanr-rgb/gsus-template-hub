import React from "react";
import { LayoutTemplate } from "lucide-react";
import CustomizerSharedToolbar from "@/components/common/Customizer/CustomizerSharedToolbar";

export default function AccordionCustomizerToolbar({
  accordionName,
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
  sourcePatternTitle = "Accordion",
}) {
  return (
    <CustomizerSharedToolbar
      name={accordionName}
      onNameChange={onNameChange}
      onBack={onBack}
      backTitle="Back to Accordion Catalog"
      canUndo={canUndo}
      canRedo={canRedo}
      onUndo={onUndo}
      onRedo={onRedo}
      onReset={onReset}
      resetConfirmMessage="Reset all customizations to accordion defaults?"
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
      patternIcon={LayoutTemplate}
    />
  );
}
