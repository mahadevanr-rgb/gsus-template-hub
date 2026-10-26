import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchComponent } from "@/services/supabase/components.service";
import { getAllComponents } from "@/codeRegistry/codeRegistry";
import { CodeCustomizationWorkspace } from "@/components/common/CodeCustomization";
import AddToProjectModal from "@/components/common/AddToProjectModal/AddToProjectModal";
import {
  createCustomizedComponent,
  normalizeSourceFiles,
} from "@/services/codeCustomization/codeCustomizationService";
import { getPickerCustomizationControls } from "./pickerCustomizationControls";
export default function CustomizeCodePage() {
  const { componentId } = useParams();
  const navigate = useNavigate();
  const [component, setComponent] = useState(null);
  const [error, setError] = useState("");
  const [installComponent, setInstallComponent] = useState(null);
  const [previewModules, setPreviewModules] = useState([]);
  useEffect(() => {
    let active = true;
    fetchComponent(componentId)
      .then((value) => {
        if (!active) return;
        if (
          !value ||
          (value.slug !== componentId && value.id !== componentId)
        ) {
          setError("Component not found in the registry.");
          return;
        }
        const registry = getAllComponents();
        const localComponent = registry.find(
          (entry) => entry.slug === value.slug || entry.id === value.id,
        );
        // The built-in picker source is versioned with the app. Database
        // snapshots can lag behind and reintroduce the old controlled-only
        // DateRangePicker, so use the local source as the customization base.
        const customizationComponent = localComponent?.files?.length
          ? {
              ...value,
              sourceCode: localComponent.sourceCode || value.sourceCode,
              files: localComponent.files,
            }
          : value;

        if (!normalizeSourceFiles(customizationComponent).length) {
          setError(
            "This component has no source files available to customize.",
          );
          return;
        }
        setComponent(customizationComponent);
        const pending = [
          ...(customizationComponent.componentDependencies ||
            customizationComponent.component_dependencies ||
            []),
        ];
        const found = [];
        const seen = new Set();
        while (pending.length) {
          const key = pending.shift();
          if (seen.has(key)) continue;
          seen.add(key);
          const dependency = registry.find(
            (entry) => entry.slug === key || entry.id === key,
          );
          if (!dependency) continue;
          found.push(dependency);
          pending.push(
            ...(dependency.componentDependencies ||
              dependency.component_dependencies ||
              []),
          );
        }
        setPreviewModules([customizationComponent, ...found]);
      })
      .catch(
        (cause) =>
          active && setError(cause.message || "Unable to load component."),
      );
    return () => {
      active = false;
    };
  }, [componentId]);
  if (error)
    return (
      <main className="custom-workspace">
        <div role="alert" className="custom-error">
          {error}
        </div>
        <button onClick={() => navigate(`/date-time/${componentId}`)}>
          Back to Details
        </button>
      </main>
    );
  if (!component)
    return <main className="custom-workspace">Loading component source…</main>;
  return (
    <>
      <CodeCustomizationWorkspace
        key={componentId}
        component={component}
        previewModules={previewModules}
        previewControls={getPickerCustomizationControls(component.slug || component.id)}
        previewControlsTitle="Customize picker"
        enableVisualMode
        onApply={(files, installProps) => {
          const customizedComponent = createCustomizedComponent(
            {
              ...component,
              customizedSource: true,
            },
            files,
            installProps,
          );

          setInstallComponent(customizedComponent);
        }}
      />
      {installComponent && (
        <AddToProjectModal
          component={installComponent}
          onClose={() => setInstallComponent(null)}
        />
      )}
    </>
  );
}
