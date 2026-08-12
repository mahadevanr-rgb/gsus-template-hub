import { useState } from "react";
import { TextInput } from "../components/atoms/forms/TextInput";
import { PasswordInput } from "../components/atoms/forms/PasswordInput";
import { Textarea } from "../components/atoms/forms/Textarea";
import { SearchInput } from "../components/atoms/forms/SearchInput";
import { SelectDropdown } from "../components/atoms/forms/SelectDropdown";
import { Checkbox } from "../components/atoms/forms/Checkbox";
import { RadioButton } from "../components/atoms/forms/RadioButton";
import { SwitchToggle } from "../components/atoms/forms/SwitchToggle";
import { RangeSlider } from "../components/atoms/forms/RangeSlider";
import { DateInput } from "../components/atoms/forms/DateInput";
import { FileUpload } from "../components/atoms/forms/FileUpload";
import { OTPInput } from "../components/atoms/forms/OTPInput";
import { InputLabel } from "../components/atoms/forms/InputLabel";
import { InputError } from "../components/atoms/forms/InputError";
import { HelperText } from "../components/atoms/forms/HelperText";
import ComponentDetailsShell from "../components/organisms/ComponentDetailsShell";
import "./FormDetails.css";

const formDetails = {
  textInput: {
    name: "Text Input",
    description: "Standard text input with icon prefix and error state support.",
    uses: ["User information", "Search fields", "Form data entry", "Text collection"],
    variants: [
      { label: "Default", description: "Standard text input" },
      { label: "With Icon", description: "Icon prefix support" },
      { label: "Error State", description: "Validation feedback" },
    ],
    code: `import { TextInput } from "@/components/atoms/forms";

<TextInput placeholder="Enter text..." />
<TextInput placeholder="Search..." icon={<SearchIcon />} />
<TextInput placeholder="Invalid..." error />`,
  },
  passwordInput: {
    name: "Password Input",
    description: "Password field with show/hide toggle for better UX.",
    uses: ["Login forms", "Registration", "Password change", "Secure fields"],
    variants: [
      { label: "Hidden", description: "Password masked" },
      { label: "Visible", description: "Toggle to show" },
      { label: "Error State", description: "Validation feedback" },
    ],
    code: `import { PasswordInput } from "@/components/atoms/forms";

<PasswordInput placeholder="Enter password..." />
<PasswordInput placeholder="Confirm password..." error />`,
  },
  textarea: {
    name: "Textarea",
    description: "Multi-line text input for longer content with resizable height.",
    uses: ["Comments", "Descriptions", "Messages", "Long-form content"],
    variants: [
      { label: "Small", description: "3 rows" },
      { label: "Medium", description: "5 rows" },
      { label: "Large", description: "8 rows" },
    ],
    code: `import { Textarea } from "@/components/atoms/forms";

<Textarea placeholder="Enter description..." rows={4} />
<Textarea placeholder="Error state..." error />`,
  },
  searchInput: {
    name: "Search Input",
    description: "Search field with built-in search icon and onSearch callback.",
    uses: ["Site search", "Filter lists", "Data lookup", "Navigation"],
    variants: [
      { label: "Default", description: "Standard search" },
      { label: "Error State", description: "Validation feedback" },
    ],
    code: `import { SearchInput } from "@/components/atoms/forms";

<SearchInput 
  placeholder="Search..." 
  onSearch={(val) => console.log(val)} 
/>`,
  },
  selectDropdown: {
    name: "Select Dropdown",
    description: "Custom styled dropdown with options list and error support.",
    uses: ["Category selection", "Country picker", "Role assignment", "Filters"],
    variants: [
      { label: "Default", description: "Standard dropdown" },
      { label: "Error State", description: "Validation feedback" },
    ],
    code: `import { SelectDropdown } from "@/components/atoms/forms";

<SelectDropdown
  placeholder="Select option..."
  options={[
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ]}
/>`,
  },
  checkbox: {
    name: "Checkbox",
    description: "Custom styled checkbox with label and checked state.",
    uses: ["Agreements", "Multi-select", "Preferences", "Feature flags"],
    variants: [
      { label: "Unchecked", description: "Default state" },
      { label: "Checked", description: "Selected state" },
      { label: "Error State", description: "Validation feedback" },
    ],
    code: `import { Checkbox } from "@/components/atoms/forms";

<Checkbox
  label="I agree to terms"
  checked={agreed}
  onChange={setAgreed}
/>`,
  },
  radioButton: {
    name: "Radio Button",
    description: "Custom radio button for single selection from a group.",
    uses: ["Single choice", "Plan selection", "Gender field", "Preference"],
    variants: [
      { label: "Unselected", description: "Default state" },
      { label: "Selected", description: "Active state" },
    ],
    code: `import { RadioButton } from "@/components/atoms/forms";

<RadioButton label="Option A" value="a" selected={val} onChange={setVal} />
<RadioButton label="Option B" value="b" selected={val} onChange={setVal} />`,
  },
  switchToggle: {
    name: "Switch Toggle",
    description: "Toggle switch for binary on/off states with smooth animation.",
    uses: ["Settings", "Feature toggles", "Preferences", "Enable/Disable"],
    variants: [
      { label: "Off", description: "Default off state" },
      { label: "On", description: "Active on state" },
    ],
    code: `import { SwitchToggle } from "@/components/atoms/forms";

<SwitchToggle checked={isEnabled} onChange={setIsEnabled} />`,
  },
  rangeSlider: {
    name: "Range Slider",
    description: "Slider input for selecting a numeric value within a range.",
    uses: ["Price range", "Volume control", "Rating", "Progress"],
    variants: [
      { label: "Default", description: "0 to 100" },
      { label: "Custom Range", description: "Custom min/max" },
    ],
    code: `import { RangeSlider } from "@/components/atoms/forms";

<RangeSlider 
  min={0} max={100} 
  value={volume} 
  onChange={setVolume} 
/>`,
  },
  dateInput: {
    name: "Date Input",
    description: "Native date picker with consistent styling across browsers.",
    uses: ["Date of birth", "Booking dates", "Deadlines", "Scheduling"],
    variants: [
      { label: "Default", description: "Standard date picker" },
      { label: "Error State", description: "Validation feedback" },
    ],
    code: `import { DateInput } from "@/components/atoms/forms";

<DateInput />
<DateInput error />`,
  },
  fileUpload: {
    name: "File Upload",
    description: "Drag & drop file upload area with click-to-browse support.",
    uses: ["Profile photo", "Document upload", "Attachments", "Media"],
    variants: [
      { label: "Default", description: "Click or drag & drop" },
      { label: "Error State", description: "Validation feedback" },
    ],
    code: `import { FileUpload } from "@/components/atoms/forms";

<FileUpload 
  accept="image/*" 
  onChange={(files) => console.log(files)} 
/>`,
  },
  otpInput: {
    name: "OTP Input",
    description: "One-time password input with auto-focus between digits.",
    uses: ["2FA verification", "Phone verification", "Email OTP", "PIN entry"],
    variants: [
      { label: "4 Digits", description: "Short PIN" },
      { label: "6 Digits", description: "Standard OTP" },
    ],
    code: `import { OTPInput } from "@/components/atoms/forms";

<OTPInput length={6} onChange={(otp) => console.log(otp)} />`,
  },
  inputLabel: {
    name: "Input Label",
    description: "Accessible label with optional required asterisk indicator.",
    uses: ["Form labels", "Field descriptions", "Required indicators", "Accessibility"],
    variants: [
      { label: "Default", description: "Standard label" },
      { label: "Required", description: "With asterisk" },
    ],
    code: `import { InputLabel } from "@/components/atoms/forms";

<InputLabel htmlFor="name">Full Name</InputLabel>
<InputLabel htmlFor="email" required>Email</InputLabel>`,
  },
  inputError: {
    name: "Input Error",
    description: "Animated error message for displaying validation feedback.",
    uses: ["Validation errors", "Form feedback", "User guidance", "Error states"],
    variants: [
      { label: "Visible", description: "Shows error message" },
      { label: "Hidden", description: "No error present" },
    ],
    code: `import { InputError } from "@/components/atoms/forms";

<InputError message="This field is required" />`,
  },
  helperText: {
    name: "Helper Text",
    description: "Supplementary hint text to provide context or instructions.",
    uses: ["Field hints", "Character limits", "Format examples", "Guidance"],
    variants: [
      { label: "Default", description: "Standard helper text" },
    ],
    code: `import { HelperText } from "@/components/atoms/forms";

<HelperText text="Maximum 200 characters" />`,
  },
};

// Map pageId → registry slug
const slugMap = {
  textInput: "text-input", passwordInput: "password-input", textarea: "textarea",
  searchInput: "search-input", selectDropdown: "select-dropdown", checkbox: "checkbox",
  radioButton: "radio-button", switchToggle: "switch-toggle", rangeSlider: "range-slider",
  dateInput: "date-input", fileUpload: "file-upload", otpInput: "otp-input",
  inputLabel: "input-label", inputError: "input-error", helperText: "helper-text",
};

export default function FormDetails({ selectedForm, onBack }) {
  const details = formDetails[selectedForm];
  const [copied, setCopied] = useState(false);
  const [demoChecked, setDemoChecked] = useState(false);
  const [demoRadio, setDemoRadio] = useState("a");
  const [demoRange, setDemoRange] = useState(50);
  const [demoToggle, setDemoToggle] = useState(false);

  if (!details) {
    return (
      <div className="form-details-empty">
        <p>Select a form component to view details</p>
      </div>
    );
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(details.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderPreview = () => {
    switch (selectedForm) {
      case "textInput":
        return <TextInput placeholder="Enter text..." />;
      case "passwordInput":
        return <PasswordInput placeholder="Enter password..." />;
      case "textarea":
        return <Textarea placeholder="Enter description..." rows={4} />;
      case "searchInput":
        return <SearchInput placeholder="Search..." />;
      case "selectDropdown":
        return (
          <SelectDropdown
            placeholder="Select an option..."
            options={[
              { value: "1", label: "Option One" },
              { value: "2", label: "Option Two" },
              { value: "3", label: "Option Three" },
            ]}
          />
        );
      case "checkbox":
        return (
          <div className="space-y-2">
            <Checkbox label="Option A" checked={demoChecked} onChange={setDemoChecked} />
            <Checkbox label="Option B (checked)" checked={true} onChange={() => {}} />
          </div>
        );
      case "radioButton":
        return (
          <div className="space-y-2">
            <RadioButton label="Option A" value="a" selected={demoRadio} onChange={setDemoRadio} />
            <RadioButton label="Option B" value="b" selected={demoRadio} onChange={setDemoRadio} />
            <RadioButton label="Option C" value="c" selected={demoRadio} onChange={setDemoRadio} />
          </div>
        );
      case "switchToggle":
        return <SwitchToggle checked={demoToggle} onChange={setDemoToggle} />;
      case "rangeSlider":
        return <RangeSlider min={0} max={100} value={demoRange} onChange={setDemoRange} />;
      case "dateInput":
        return <DateInput />;
      case "fileUpload":
        return <FileUpload />;
      case "otpInput":
        return <OTPInput length={6} />;
      case "inputLabel":
        return (
          <div className="space-y-2">
            <InputLabel>Standard Label</InputLabel>
            <InputLabel required>Required Label</InputLabel>
          </div>
        );
      case "inputError":
        return <InputError message="This field is required" />;
      case "helperText":
        return <HelperText text="Maximum 200 characters allowed" />;
      default:
        return null;
    }
  };

  return (
    <ComponentDetailsShell
      slug={slugMap[selectedForm] || selectedForm}
      sourceCode={details.code}
      onBack={onBack}
    >
      {/* PREVIEW */}
      <section className="details-section preview-section">
        <h2>Live Preview</h2>
        <div className="preview-area">
          <div className="preview-item">{renderPreview()}</div>
        </div>
      </section>

      {/* VARIANTS */}
      <section className="details-section variants-section">
        <h2>Variants & States</h2>
        <div className="variants-grid">
          {details.variants?.map((variant, idx) => (
            <div key={idx} className="variant-item">
              <div className="variant-preview">{renderPreview()}</div>
              <div className="variant-info">
                <h4>{variant.label}</h4>
                <p>{variant.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* USE CASES */}
      <section className="details-section use-cases-section">
        <h2>Best Used For</h2>
        <div className="use-cases-list">
          {details.uses?.map((use, idx) => (
            <div key={idx} className="use-case-item">
              <span className="use-case-icon">✓</span>
              <span>{use}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CODE */}
      <section className="details-section code-section">
        <div className="code-header">
          <h2>Code Example</h2>
          <button className="copy-button" onClick={handleCopyCode}>
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>
        <pre className="code-block">
          <code>{details.code}</code>
        </pre>
      </section>
    </ComponentDetailsShell>
  );
}
