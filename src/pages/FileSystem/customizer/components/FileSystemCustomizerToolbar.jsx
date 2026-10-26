import React from "react";
import { UploadCloud } from "lucide-react";
import CustomizerSharedToolbar from "@/components/common/Customizer/CustomizerSharedToolbar";

export default function FileSystemCustomizerToolbar({
  componentName,
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
  sourceComponentTitle = "File Upload",
}) {
  return (
    <CustomizerSharedToolbar
      name={componentName}
      onNameChange={onNameChange}
      onBack={onBack}
      backTitle="Back to File System Catalog"
      canUndo={canUndo}
      canRedo={canRedo}
      onUndo={onUndo}
      onRedo={onRedo}
      onReset={onReset}
      resetConfirmMessage="Reset all customizations to file system template defaults?"
      isDirty={isDirty}
      isSaving={isSaving}
      saveStatus={saveStatus}
      onSave={onSave}
      onOpenExport={onOpenExport}
      onOpenCode={onOpenCode}
      onOpenTemplateSelector={onOpenTemplateSelector}
      viewportMode={viewportMode}
      onViewportChange={onViewportChange}
      sourcePatternTitle={sourceComponentTitle}
      patternIcon={UploadCloud}
    />
  );
}
