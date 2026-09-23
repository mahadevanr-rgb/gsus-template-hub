import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import ComponentDetailsView from "@/components/common/ComponentDetailsView/ComponentDetailsView";
import layoutSections from "@/codeRegistry/layoutsRegistry";

const accentOptions = [
  { name: "Indigo", color: "#6366f1", className: "bg-indigo-500" },
  { name: "Purple", color: "#a855f7", className: "bg-purple-500" },
  { name: "Pink", color: "#ec4899", className: "bg-pink-500" },
];

function CustomizePanel({ accent, onAccentChange, radius, onRadiusChange }) {
  return <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Customize</h3><div><p className="mb-2 text-xs font-medium text-slate-600 dark:text-slate-300">Accent color</p><div className="flex gap-2">{accentOptions.map((option) => <button key={option.name} type="button" aria-label={`Use ${option.name} accent`} onClick={() => onAccentChange(option.color)} className={`flex h-7 w-7 items-center justify-center rounded-lg ${option.className} ${accent === option.color ? "ring-2 ring-indigo-300 ring-offset-2 ring-offset-slate-900" : ""}`}>{accent === option.color && <Check className="h-3.5 w-3.5 text-white" />}</button>)}</div></div><label className="block text-xs font-medium text-slate-600 dark:text-slate-300">Corner radius<select value={radius} onChange={(event) => onRadiusChange(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"><option value="0px">Square</option><option value="12px">Rounded</option><option value="24px">Large rounded</option></select></label></section>;
}

export default function LayoutDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [accent, setAccent] = useState("#6366f1");
  const [radius, setRadius] = useState("12px");
  const layout = layoutSections.find((section) => section.slug === slug) || layoutSections[0];
  const LayoutComponent = layout.component;
  const componentData = { ...layout, subCategory: layout.category, tag: layout.category, files: [{ path: `components/layout/ReusableLayout/${LayoutComponent.name}.jsx` }], framework: "react", styling: "Tailwind CSS", version: "1.0.0", lastUpdated: "September 20, 2026", author: "TemplateHub UI Team" };
  const previewStyle = { borderColor: accent, borderRadius: radius, boxShadow: `0 0 28px ${accent}33` };
  const preview = () => layout.slug === "persistent-sidebar" ? <div style={previewStyle} className="h-64 w-full overflow-hidden border"><LayoutComponent responsive={false} /></div> : <div style={previewStyle} className="w-full overflow-hidden border"><LayoutComponent /></div>;

  return <ComponentDetailsView component={componentData} categoryName="Layout Module" categoryPath="/layouts" subCategories={layoutSections.map(({ slug: itemSlug, name }) => ({ slug: itemSlug, name }))} activeSlug={layout.slug} onSelectSibling={(nextSlug) => navigate(`/layouts/${nextSlug}`)} onBack={() => navigate("/layouts")} onNavigateHome={() => navigate("/")} renderCustomPreview={preview} renderSidebar={() => <CustomizePanel accent={accent} onAccentChange={setAccent} radius={radius} onRadiusChange={setRadius} />} />;
}
