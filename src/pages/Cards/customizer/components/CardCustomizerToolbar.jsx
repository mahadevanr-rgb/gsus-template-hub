import React from "react";
import { LayoutTemplate } from "lucide-react";
import CustomizerSharedToolbar from "@/components/common/Customizer/CustomizerSharedToolbar";

export default function CardCustomizerToolbar({
  cardName,
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
  sourceCardTitle = "Card",
}) {
  return (
    <CustomizerSharedToolbar
      name={cardName}
      onNameChange={onNameChange}
      onBack={onBack}
      backTitle="Back to Cards Collection"
      canUndo={canUndo}
      canRedo={canRedo}
      onUndo={onUndo}
      onRedo={onRedo}
      onReset={onReset}
      resetConfirmMessage="Reset all customizations to template defaults?"
      isDirty={isDirty}
      isSaving={isSaving}
      saveStatus={saveStatus}
      onSave={onSave}
      onOpenExport={onOpenExport}
      onOpenCode={onOpenCode}
      onOpenTemplateSelector={onOpenTemplateSelector}
      viewportMode={viewportMode}
      onViewportChange={onViewportChange}
      sourcePatternTitle={sourceCardTitle}
      patternIcon={LayoutTemplate}
    />
  );
}
