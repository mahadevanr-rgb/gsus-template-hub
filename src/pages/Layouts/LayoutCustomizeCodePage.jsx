import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import layoutSections from "@/codeRegistry/layoutsRegistry";
import { CodeCustomizationWorkspace } from "@/components/common/CodeCustomization";
import AddToProjectModal from "@/components/common/AddToProjectModal/AddToProjectModal";
import { createCustomizedComponent } from "@/services/codeCustomization/codeCustomizationService";
import { defaultFooterConfig } from "@/components/layout/ReusableLayout/Footer.config";

const footerControls = [
  {
    name: "footerConfig",
    label: "Footer settings",
    type: "footerConfig",
    group: "Footer settings",
    defaultValue: defaultFooterConfig,
  },
];

const navbarControls = [
  {
    name: "brandName",
    label: "Brand name",
    type: "text",
    defaultValue: "TemplateHub",
  },
  {
    name: "brandLogo",
    label: "Company logo (PNG)",
    type: "file",
    accept: "image/png",
    maxSize: 2 * 1024 * 1024,
    defaultValue: "",
    help: "Optional. Up to 2 MB; the default mark is shown when no logo is selected.",
  },
  {
    name: "activeItem",
    label: "Active navigation item",
    type: "select",
    defaultValue: "Layouts",
    options: ["Dashboard", "Components", "Layouts", "Docs"].map((value) => ({
      value,
      label: value,
    })),
  },
  {
    name: "searchPlaceholder",
    label: "Search placeholder",
    type: "text",
    defaultValue: "Search...",
  },
  {
    name: "userName",
    label: "Profile name",
    type: "text",
    defaultValue: "Jordan Davis",
  },
  {
    name: "ctaLabel",
    label: "Primary action label",
    type: "text",
    defaultValue: "Get started",
  },
  {
    name: "accentColor",
    label: "Accent color",
    type: "color",
    defaultValue: "#4f46e5",
  },
  {
    name: "colorMode",
    label: "Color mode",
    type: "select",
    defaultValue: "dark",
    options: [
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
    ],
  },
  {
    name: "showSearch",
    label: "Show search",
    type: "checkbox",
    defaultValue: true,
  },
  {
    name: "showNotifications",
    label: "Show notifications",
    type: "checkbox",
    defaultValue: true,
  },
  {
    name: "showProfile",
    label: "Show profile menu",
    type: "checkbox",
    defaultValue: true,
  },
  {
    name: "showUpgrade",
    label: "Show upgrade button",
    type: "checkbox",
    defaultValue: true,
  },
];

const sidebarControls = [
  {
    name: "brandName",
    label: "Brand name",
    type: "text",
    defaultValue: "TemplateHub",
  },
  {
    name: "brandLogo",
    label: "Company logo (PNG)",
    type: "file",
    accept: "image/png",
    maxSize: 2 * 1024 * 1024,
    defaultValue: "",
    help: "Optional. Up to 2 MB; the default icon is used when no logo is selected.",
  },
  {
    name: "activeItem",
    label: "Active navigation item",
    type: "select",
    defaultValue: "Layout Sections",
    options: [
      "Dashboard",
      "Layout Sections",
      "Components",
      "Templates",
      "Web Apps",
      "Mobile Apps",
      "Marketing",
    ].map((value) => ({ value, label: value })),
  },
  {
    name: "storageUsed",
    label: "Storage usage",
    type: "select",
    defaultValue: 85,
    options: [35, 50, 65, 85, 95].map((value) => ({
      value,
      label: `${value}%`,
    })),
  },
  {
    name: "accentColor",
    label: "Accent color",
    type: "color",
    defaultValue: "#6366f1",
  },
  {
    name: "colorMode",
    label: "Color mode",
    type: "select",
    defaultValue: "dark",
    options: [
      { value: "dark", label: "Dark" },
      { value: "light", label: "Light" },
    ],
  },
  {
    name: "showStorage",
    label: "Show storage usage",
    type: "checkbox",
    defaultValue: true,
  },
  {
    name: "showSettings",
    label: "Show settings action",
    type: "checkbox",
    defaultValue: true,
  },
  {
    name: "showSupport",
    label: "Show support action",
    type: "checkbox",
    defaultValue: true,
  },
  {
    name: "responsive",
    label: "Preview desktop sidebar",
    type: "hidden",
    defaultValue: false,
    previewOnly: true,
  },
];

const heroControls = [
  {
    name: "eyebrow",
    label: "Eyebrow text",
    type: "text",
    defaultValue: "A better way to work",
  },
  {
    name: "title",
    label: "Headline",
    type: "textarea",
    defaultValue: "Build a better experience",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    defaultValue:
      "A clear, concise description of what your product helps people do.",
  },
  {
    name: "primaryLabel",
    label: "Primary button",
    type: "text",
    defaultValue: "Get started",
  },
  {
    name: "secondaryLabel",
    label: "Secondary button",
    type: "text",
    defaultValue: "Learn more",
  },
  {
    name: "alignment",
    label: "Content alignment",
    type: "select",
    defaultValue: "left",
    options: [
      { value: "left", label: "Left" },
      { value: "center", label: "Center" },
    ],
  },
  {
    name: "colorMode",
    label: "Color mode",
    type: "select",
    defaultValue: "dark",
    options: [
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
    ],
  },
  {
    name: "accentColor",
    label: "Accent color",
    type: "color",
    defaultValue: "#4f46e5",
  },
  {
    name: "showEyebrow",
    label: "Show eyebrow",
    type: "checkbox",
    defaultValue: true,
  },
  {
    name: "showSecondaryAction",
    label: "Show secondary button",
    type: "checkbox",
    defaultValue: true,
  },
  {
    name: "showVisual",
    label: "Show product visual",
    type: "checkbox",
    defaultValue: true,
  },
];

const layoutCustomization = {
  "top-navbar": { controls: navbarControls, title: "Customize navbar" },
  "persistent-sidebar": {
    controls: sidebarControls,
    title: "Customize sidebar",
  },
  "gradient-hero": { controls: heroControls, title: "Customize hero" },
  "newsletter-footer": { controls: footerControls, title: "Customize footer" },
};

export default function LayoutCustomizeCodePage() {
  const { layoutId } = useParams();
  const navigate = useNavigate();
  const [installComponent, setInstallComponent] = useState(null);
  const layout = useMemo(
    () => layoutSections.find((item) => item.slug === layoutId),
    [layoutId],
  );
  const customization = layout ? layoutCustomization[layout.slug] : null;
  const component = useMemo(
    () =>
      layout
        ? {
            ...layout,
            category: "Layout Module",
            exportName: layout.installName,
            namedExport: false,
            draftStorageKey:
              layout.slug === "newsletter-footer"
                ? "newsletter-footer-professional-v3"
                : undefined,
            files: layout.files,
          }
        : null,
    [layout],
  );

  if (!layout) {
    return (
      <main className="custom-workspace">
        <div role="alert" className="custom-error">
          Layout not found.
        </div>
        <button type="button" onClick={() => navigate("/layouts")}>
          Back to Layouts
        </button>
      </main>
    );
  }

  return (
    <>
      <CodeCustomizationWorkspace
        key={layout.slug}
        component={component}
        backPath={`/layouts/${layout.slug}`}
        previewControls={customization?.controls || []}
        previewControlsTitle={customization?.title}
        enableVisualMode={Boolean(customization)}
        onApply={(files, installProps) =>
          setInstallComponent(
            createCustomizedComponent(
              { ...component, customizedSource: true },
              files,
              installProps,
            ),
          )
        }
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
