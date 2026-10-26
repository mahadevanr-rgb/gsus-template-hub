import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "lucide-react";
import ShowcaseCard from "@/components/common/ShowcaseCard/ShowcaseCard";
import FormDetails from "./FormDetails";
import { formComponents } from "./formComponents";

import { TextInput } from "@/pages/Forms/components/TextInput/TextInput";
import { PasswordInput } from "@/pages/Forms/components/PasswordInput/PasswordInput";
import { Textarea } from "@/pages/Forms/components/Textarea/Textarea";
import { SearchInput } from "@/pages/Forms/components/SearchInput/SearchInput";
import { SelectDropdown } from "@/pages/Forms/components/SelectDropdown/SelectDropdown";
import { Checkbox } from "@/pages/Forms/components/Checkbox/Checkbox";
import { RadioButton } from "@/pages/Forms/components/RadioButton/RadioButton";
import { SwitchToggle } from "@/pages/Forms/components/SwitchToggle/SwitchToggle";
import { RangeSlider } from "@/pages/Forms/components/RangeSlider/RangeSlider";
import { DateInput } from "@/pages/Forms/components/DateInput/DateInput";
import { DatePicker } from "@/pages/Forms/components/DatePicker/DatePicker";
import { OTPInput } from "@/pages/Forms/components/OTPInput/OTPInput";
import { InputLabel } from "@/pages/Forms/components/InputLabel/InputLabel";
import { InputError } from "@/pages/Forms/components/InputError/InputError";
import { HelperText } from "@/pages/Forms/components/HelperText/HelperText";

function FormAtomPreview({ id }) {
  switch (id) {
    case "textInput":
      return (
        <div className="w-full px-2">
          <TextInput
            placeholder="Jane Doe"
            className="w-full pointer-events-none"
          />
        </div>
      );
    case "passwordInput":
      return (
        <div className="w-full px-2">
          <PasswordInput
            placeholder="••••••••"
            className="w-full pointer-events-none"
          />
        </div>
      );
    case "textarea":
      return (
        <div className="w-full px-2">
          <Textarea
            placeholder="Write a short summary..."
            rows={2}
            className="w-full pointer-events-none"
          />
        </div>
      );
    case "searchInput":
      return (
        <div className="w-full px-2">
          <SearchInput
            placeholder="Search records..."
            className="w-full pointer-events-none"
          />
        </div>
      );
    case "selectDropdown":
      return (
        <div className="w-full px-2">
          <SelectDropdown
            placeholder="Select option..."
            options={[{ value: "1", label: "Enterprise Plan" }]}
            className="w-full pointer-events-none"
          />
        </div>
      );
    case "checkbox":
      return (
        <div className="flex items-center justify-center">
          <Checkbox
            label="Agree to Terms & Conditions"
            checked={true}
            onChange={() => {}}
          />
        </div>
      );
    case "radioButton":
      return (
        <div className="flex gap-4 items-center justify-center">
          <RadioButton
            label="Monthly"
            value="m"
            selected="m"
            onChange={() => {}}
          />
          <RadioButton
            label="Annual"
            value="a"
            selected="m"
            onChange={() => {}}
          />
        </div>
      );
    case "switchToggle":
      return (
        <div className="flex items-center justify-between w-full max-w-[220px] px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800">
          <span className="text-xs font-medium text-slate-300">Auto-Renew</span>
          <SwitchToggle checked={true} onChange={() => {}} />
        </div>
      );
    case "rangeSlider":
      return (
        <div className="w-full px-3">
          <RangeSlider
            min={0}
            max={100}
            value={65}
            onChange={() => {}}
            className="w-full"
          />
        </div>
      );
    case "dateInput":
      return (
        <div className="w-full px-2">
          <DateInput className="w-full pointer-events-none" />
        </div>
      );
    case "datePicker":
      return (
        <div className="w-full px-2">
          <DatePicker placeholder="Select date" />
        </div>
      );
    case "fileUpload":
      return (
        <div className="w-full p-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 text-center text-xs text-slate-400">
          📁 Drop files or click to upload
        </div>
      );
    case "otpInput":
      return (
        <div className="flex justify-center scale-90">
          <OTPInput length={6} className="pointer-events-none" />
        </div>
      );
    case "inputLabel":
      return (
        <div className="w-full px-3 text-left">
          <InputLabel style={{ color: "#e2e8f0" }} required>
            Email Address
          </InputLabel>
        </div>
      );
    case "inputError":
      return (
        <div className="w-full px-2">
          <InputError message="Please enter a valid email format" />
        </div>
      );
    case "helperText":
      return (
        <div className="w-full px-2">
          <HelperText text="Must contain at least 8 characters & 1 symbol" />
        </div>
      );
    default:
      return null;
  }
}

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
            <span
              className="hover:text-white cursor-pointer transition-colors"
              onClick={() => navigate("/")}
            >
              Home
            </span>
            <span>/</span>
            <span
              className="hover:text-white cursor-pointer transition-colors"
              onClick={() => navigate("/")}
            >
              Components
            </span>
            <span>/</span>
            <span className="text-white font-medium">Forms</span>
          </div>

          {/* Header */}
          <header className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/50 px-5 py-5 shadow-xl shadow-black/10 sm:px-6">
            <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-emerald-600/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-teal-600/10 blur-3xl" />

            <div className="relative flex items-center gap-4">
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white shadow-xl shadow-emerald-500/25 sm:flex">
                <FormInput className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                  <FormInput className="h-3.5 w-3.5" />
                  {formComponents.length} Form Atoms
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Form{" "}
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    Components Collection
                  </span>
                </h1>

                <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-400">
                  Complete set of accessible, theme-aware form inputs, toggles,
                  pickers, and helper primitives.
                </p>
              </div>
            </div>
          </header>

          {/* Cards Grid using global ShowcaseCard */}
          <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {formComponents.map((form) => (
              <ShowcaseCard
                key={form.id}
                title={form.name}
                description={form.description}
                tag={form.tag}
                theme={form.theme}
                preview={
                  <div className="w-full h-24 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-center p-3">
                    <FormAtomPreview id={form.id} />
                  </div>
                }
                onClick={() => handleSelect(form.id)}
              />
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
