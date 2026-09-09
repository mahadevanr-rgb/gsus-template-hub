import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormDetails from "./FormDetails";
import { FormInput, Sparkles, ArrowRight } from "lucide-react";

const formComponents = [
  { id: "textInput",      name: "Text Input",       description: "Standard text input with icon prefix and error state support.",          tag: "Input",    color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { id: "passwordInput",  name: "Password Input",   description: "Password field with show/hide toggle for enhanced UX.",                 tag: "Input",    color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
  { id: "textarea",       name: "Textarea",         description: "Multi-line text input for longer content with resizable height.",       tag: "Input",    color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { id: "searchInput",    name: "Search Input",     description: "Search field with built-in search icon and callback.",                 tag: "Input",    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
  { id: "selectDropdown", name: "Select Dropdown",  description: "Custom styled dropdown with options list and clear state.",             tag: "Select",   color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  { id: "checkbox",       name: "Checkbox",         description: "Accessible custom checkbox with checkmark animation.",                  tag: "Choice",   color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  { id: "radioButton",    name: "Radio Button",     description: "Radio button group for mutually exclusive options.",                     tag: "Choice",   color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  { id: "switchToggle",   name: "Switch Toggle",    description: "Smooth animated switch toggle for boolean flags.",                      tag: "Toggle",   color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
  { id: "rangeSlider",    name: "Range Slider",     description: "Interactive slider for selecting numeric range values.",                tag: "Slider",   color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { id: "dateInput",      name: "Date Input",       description: "Native date picker formatted with calendar indicators.",                tag: "Picker",   color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  { id: "fileUpload",     name: "File Upload",      description: "Drag-and-drop file upload zone with file preview.",                     tag: "Upload",   color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
  { id: "otpInput",       name: "OTP Input",        description: "Split 6-digit verification code input with auto-advance.",              tag: "Input",    color: "text-violet-400 bg-violet-500/10 border-violet-500/20" },
  { id: "inputLabel",     name: "Input Label",      description: "Accessible form field label with required star indicator.",             tag: "Helper",   color: "text-slate-400 bg-slate-500/10 border-slate-500/20" },
  { id: "inputError",     name: "Input Error",      description: "Validation error message banner with alert styling.",                   tag: "Feedback", color: "text-red-400 bg-red-500/10 border-red-500/20" },
  { id: "helperText",     name: "Helper Text",      description: "Subtle hint text with info icon for field guidance.",                  tag: "Helper",   color: "text-slate-400 bg-slate-500/10 border-slate-500/20" },
];

export default function FormsPage() {
  const [selectedForm, setSelectedForm] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (id) => {
    setSelectedForm(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedForm(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      {selectedForm ? (
        <FormDetails
          selectedForm={selectedForm}
          onBack={handleBack}
          onNavigateHome={() => navigate("/")}
        />
      ) : (
        <div className="space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate("/")}>Home</span>
            <span>/</span>
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate("/")}>Components</span>
            <span>/</span>
            <span className="text-white font-medium">Forms</span>
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
                <FormInput className="w-3.5 h-3.5" />
                <span>15 Form Atoms</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Form Components Collection</h1>
              <p className="text-sm text-slate-400 mt-1">Complete set of accessible, theme-aware form inputs and helper primitives.</p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {formComponents.map((form) => (
              <div
                key={form.id}
                onClick={() => handleSelect(form.id)}
                className="group relative p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/50 hover:bg-slate-900/90 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 shadow-lg hover:shadow-emerald-500/5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${form.color}`}>
                      {form.tag}
                    </span>
                    <span className="text-xs text-slate-500 group-hover:text-emerald-400 font-mono transition-colors">
                      v1.0.0
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {form.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                      {form.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-emerald-400 transition-colors">
                  <span>View Details & Live Demo</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
