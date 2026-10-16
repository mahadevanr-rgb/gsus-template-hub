import { useState } from "react";
import { defaultFooterConfig } from "@/components/layout/ReusableLayout/Footer.config";

const iconOptions = ["LayoutTemplate", "Sparkles", "Layers3", "Building2", "Circle", "Hexagon"];

function Field({ label, children, hint }) {
  return <label className="footer-config-field"><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>;
}

function Toggle({ label, checked, onChange }) {
  return <label className="footer-config-toggle"><input type="checkbox" checked={Boolean(checked)} onChange={(event) => onChange(event.target.checked)} /><span>{label}</span></label>;
}

function LogoUploader({ logoSrc, onChange }) {
  const [error, setError] = useState("");
  const selectFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== "image/png" || file.size > 2 * 1024 * 1024) {
      setError(file.type !== "image/png" ? "Choose a PNG image." : "Choose a PNG smaller than 2 MB.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => { setError(""); onChange(String(reader.result || "")); };
      image.onerror = () => setError("This PNG could not be decoded. Choose another image.");
      image.src = String(reader.result || "");
    };
    reader.onerror = () => setError("The image could not be read.");
    reader.readAsDataURL(file);
    event.target.value = "";
  };
  return <div className="footer-logo-upload">
    <Field label="Company logo (PNG)" hint="Up to 2 MB; image proportions are preserved."><input type="file" accept="image/png" onChange={selectFile} /></Field>
    {logoSrc && <div className="footer-logo-upload-preview"><img src={logoSrc} alt="Company logo preview" /><button type="button" onClick={() => { onChange(""); setError(""); }}>Remove</button></div>}
    {error && <p className="footer-config-error" role="alert">{error}</p>}
  </div>;
}

export default function FooterConfigurationEditor({ value = defaultFooterConfig, onChange }) {
  const config = { ...defaultFooterConfig, ...value };
  const brand = { ...defaultFooterConfig.brand, ...config.brand };
  const appearance = { ...defaultFooterConfig.appearance, ...config.appearance };
  const newsletter = { ...defaultFooterConfig.newsletter, ...config.newsletter };
  const set = (key, next) => onChange({ ...config, [key]: next });
  const setNested = (section, key, next) => onChange({ ...config, [section]: { ...config[section], [key]: next } });
  const setAccent = (next) => onChange({ ...config, accentColor: next, appearance: { ...appearance, accent: next } });
  const setAppearanceMode = (mode) => {
    const colors = mode === "light"
      ? { background: "#f8fafc", heading: "#0f172a", body: "#475569", link: "#475569", linkHover: "#4f46e5", divider: "#e2e8f0" }
      : { background: "#0b0f19", heading: "#ffffff", body: "#94a3b8", link: "#94a3b8", linkHover: "#818cf8", divider: "#1f2937" };
    onChange({ ...config, appearanceMode: mode, appearance: { ...appearance, ...colors } });
  };

  return <div className="footer-config-editor footer-config-minimal">
    <div className="footer-config-grid">
      <Field label="Brand name"><input type="text" value={brand.name} onChange={(event) => setNested("brand", "name", event.target.value)} placeholder="Your company" /></Field>
      <Field label="Description"><input type="text" value={brand.description} onChange={(event) => setNested("brand", "description", event.target.value)} placeholder="A short description" /></Field>
      {!brand.logoSrc && <Field label="Brand icon"><select value={brand.icon} onChange={(event) => setNested("brand", "icon", event.target.value)}>{iconOptions.map((icon) => <option key={icon} value={icon}>{icon.replace(/([A-Z])/g, " $1").trim()}</option>)}</select></Field>}
      <LogoUploader logoSrc={brand.logoSrc} onChange={(next) => setNested("brand", "logoSrc", next)} />
      <Field label="Layout"><select value={config.layout} onChange={(event) => set("layout", event.target.value)}><option value="columns">Columns</option><option value="centered">Centered</option></select></Field>
      {config.layout === "columns" && <Field label="Columns"><select value={config.columns} onChange={(event) => set("columns", Number(event.target.value))}>{[2, 3, 4, 5].map((count) => <option key={count} value={count}>{count}</option>)}</select></Field>}
      <Field label="Color mode"><select value={config.appearanceMode || "dark"} onChange={(event) => setAppearanceMode(event.target.value)}><option value="dark">Dark</option><option value="light">Light</option></select></Field>
      <Field label="Accent color"><input type="color" value={appearance.accent} onChange={(event) => setAccent(event.target.value)} /></Field>
      <Toggle label="Show social links" checked={config.showSocialLinks} onChange={(next) => set("showSocialLinks", next)} />
      <Toggle label="Show newsletter" checked={newsletter.show} onChange={(next) => setNested("newsletter", "show", next)} />
    </div>
  </div>;
}
