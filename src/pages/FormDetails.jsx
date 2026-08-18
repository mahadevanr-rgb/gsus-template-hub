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
import AddToProjectModal from "../components/organisms/AddToProjectModal";
import "../components/organisms/AddToProjectModal.css";
import "./FormDetails.css";

const formDetails = {
  textInput: {
    name: "Text Input", tag: "Input", version: "1.0.0",
    description: "Standard text input with icon prefix and error state support.",
    uses: ["User information", "Search fields", "Form data entry", "Text collection"],
    tags: ["input", "form", "text", "field"],
    dependencies: ["None"],
    size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { TextInput } from "@/components/atoms/forms";\n\n<TextInput placeholder="Enter text..." />\n<TextInput placeholder="Search..." icon={<SearchIcon />} />\n<TextInput placeholder="Invalid..." error />`,
  },
  passwordInput: {
    name: "Password Input", tag: "Input", version: "1.0.0",
    description: "Password field with show/hide toggle for better UX.",
    uses: ["Login forms", "Registration", "Password change", "Secure fields"],
    tags: ["input", "form", "password", "security"],
    dependencies: ["None"],
    size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { PasswordInput } from "@/components/atoms/forms";\n\n<PasswordInput placeholder="Enter password..." />\n<PasswordInput placeholder="Confirm password..." error />`,
  },
  textarea: {
    name: "Textarea", tag: "Input", version: "1.0.0",
    description: "Multi-line text input for longer content with resizable height.",
    uses: ["Comments", "Descriptions", "Messages", "Long-form content"],
    tags: ["input", "form", "textarea", "multiline"],
    dependencies: ["None"],
    size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { Textarea } from "@/components/atoms/forms";\n\n<Textarea placeholder="Enter description..." rows={4} />\n<Textarea placeholder="Error state..." error />`,
  },
  searchInput: {
    name: "Search Input", tag: "Input", version: "1.0.0",
    description: "Search field with built-in search icon and onSearch callback.",
    uses: ["Site search", "Filter lists", "Data lookup", "Navigation"],
    tags: ["input", "form", "search", "filter"],
    dependencies: ["None"],
    size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { SearchInput } from "@/components/atoms/forms";\n\n<SearchInput\n  placeholder="Search..."\n  onSearch={(val) => console.log(val)}\n/>`,
  },
  selectDropdown: {
    name: "Select Dropdown", tag: "Select", version: "1.0.0",
    description: "Custom styled dropdown with options list and error support.",
    uses: ["Category selection", "Country picker", "Role assignment", "Filters"],
    tags: ["select", "dropdown", "form", "choice"],
    dependencies: ["None"],
    size: "3 KB", lastUpdated: "May 12, 2025",
    code: `import { SelectDropdown } from "@/components/atoms/forms";\n\n<SelectDropdown\n  placeholder="Select option..."\n  options={[\n    { value: "1", label: "Option 1" },\n    { value: "2", label: "Option 2" },\n  ]}\n/>`,
  },
  checkbox: {
    name: "Checkbox", tag: "Choice", version: "1.0.0",
    description: "Custom styled checkbox with label and checked state.",
    uses: ["Agreements", "Multi-select", "Preferences", "Feature flags"],
    tags: ["checkbox", "form", "choice", "boolean"],
    dependencies: ["None"],
    size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { Checkbox } from "@/components/atoms/forms";\n\n<Checkbox\n  label="I agree to terms"\n  checked={agreed}\n  onChange={setAgreed}\n/>`,
  },
  radioButton: {
    name: "Radio Button", tag: "Choice", version: "1.0.0",
    description: "Custom radio button for single selection from a group.",
    uses: ["Single choice", "Plan selection", "Gender field", "Preference"],
    tags: ["radio", "form", "choice", "selection"],
    dependencies: ["None"],
    size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { RadioButton } from "@/components/atoms/forms";\n\n<RadioButton label="Option A" value="a" selected={val} onChange={setVal} />\n<RadioButton label="Option B" value="b" selected={val} onChange={setVal} />`,
  },
  switchToggle: {
    name: "Switch Toggle", tag: "Toggle", version: "1.0.0",
    description: "Toggle switch for binary on/off states with smooth animation.",
    uses: ["Settings", "Feature toggles", "Preferences", "Enable/Disable"],
    tags: ["toggle", "switch", "form", "boolean"],
    dependencies: ["None"],
    size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { SwitchToggle } from "@/components/atoms/forms";\n\n<SwitchToggle checked={isEnabled} onChange={setIsEnabled} />`,
  },
  rangeSlider: {
    name: "Range Slider", tag: "Slider", version: "1.0.0",
    description: "Slider input for selecting a numeric value within a range.",
    uses: ["Price range", "Volume control", "Rating", "Progress"],
    tags: ["slider", "range", "form", "numeric"],
    dependencies: ["None"],
    size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { RangeSlider } from "@/components/atoms/forms";\n\n<RangeSlider\n  min={0} max={100}\n  value={volume}\n  onChange={setVolume}\n/>`,
  },
  dateInput: {
    name: "Date Input", tag: "Input", version: "1.0.0",
    description: "Native date picker with consistent styling across browsers.",
    uses: ["Date of birth", "Booking dates", "Deadlines", "Scheduling"],
    tags: ["date", "input", "form", "picker"],
    dependencies: ["None"],
    size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { DateInput } from "@/components/atoms/forms";\n\n<DateInput />\n<DateInput error />`,
  },
  fileUpload: {
    name: "File Upload", tag: "Upload", version: "1.0.0",
    description: "Drag & drop file upload area with click-to-browse support.",
    uses: ["Profile photo", "Document upload", "Attachments", "Media"],
    tags: ["upload", "file", "form", "drag-drop"],
    dependencies: ["None"],
    size: "3 KB", lastUpdated: "May 12, 2025",
    code: `import { FileUpload } from "@/components/atoms/forms";\n\n<FileUpload\n  accept="image/*"\n  onChange={(files) => console.log(files)}\n/>`,
  },
  otpInput: {
    name: "OTP Input", tag: "Input", version: "1.0.0",
    description: "One-time password input with auto-focus between digits.",
    uses: ["2FA verification", "Phone verification", "Email OTP", "PIN entry"],
    tags: ["otp", "pin", "input", "verification"],
    dependencies: ["None"],
    size: "2 KB", lastUpdated: "May 12, 2025",
    code: `import { OTPInput } from "@/components/atoms/forms";\n\n<OTPInput length={6} onChange={(otp) => console.log(otp)} />`,
  },
  inputLabel: {
    name: "Input Label", tag: "Label", version: "1.0.0",
    description: "Accessible label with optional required asterisk indicator.",
    uses: ["Form labels", "Field descriptions", "Required indicators", "Accessibility"],
    tags: ["label", "form", "accessibility"],
    dependencies: ["None"],
    size: "1 KB", lastUpdated: "May 12, 2025",
    code: `import { InputLabel } from "@/components/atoms/forms";\n\n<InputLabel htmlFor="name">Full Name</InputLabel>\n<InputLabel htmlFor="email" required>Email</InputLabel>`,
  },
  inputError: {
    name: "Input Error", tag: "Feedback", version: "1.0.0",
    description: "Animated error message for displaying validation feedback.",
    uses: ["Validation errors", "Form feedback", "User guidance", "Error states"],
    tags: ["error", "validation", "form", "feedback"],
    dependencies: ["None"],
    size: "1 KB", lastUpdated: "May 12, 2025",
    code: `import { InputError } from "@/components/atoms/forms";\n\n<InputError message="This field is required" />`,
  },
  helperText: {
    name: "Helper Text", tag: "Hint", version: "1.0.0",
    description: "Supplementary hint text to provide context or instructions.",
    uses: ["Field hints", "Character limits", "Format examples", "Guidance"],
    tags: ["hint", "helper", "form", "text"],
    dependencies: ["None"],
    size: "1 KB", lastUpdated: "May 12, 2025",
    code: `import { HelperText } from "@/components/atoms/forms";\n\n<HelperText text="Maximum 200 characters" />`,
  },
};

function CopyAction({ text, label = "Copy Code", icon = "📋" }) {
  const [copied, setCopied] = useState(false);
  const handle = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className="fd-action-btn fd-copy-btn" onClick={handle}>
      <span className="fd-action-icon">{copied ? "✓" : icon}</span>
      {copied ? "✓ Copied!" : label}
    </button>
  );
}

export default function FormDetails({ selectedForm, onBack, onNavigateHome }) {
  const [activeTab, setActiveTab] = useState("description");
  const [showModal, setShowModal] = useState(false);
  const [demoChecked, setDemoChecked] = useState(false);
  const [demoRadio, setDemoRadio] = useState("a");
  const [demoRange, setDemoRange] = useState(50);
  const [demoToggle, setDemoToggle] = useState(false);

  const details = formDetails[selectedForm];

  if (!details) {
    return (
      <div className="fd-empty">
        <p>Component not found.</p>
        <button onClick={onBack}>Back to Collection</button>
      </div>
    );
  }

  // Build a mock component object for AddToProjectModal
  const mockComponent = {
    name: details.name,
    slug: selectedForm.replace(/([A-Z])/g, "-$1").toLowerCase(),
    sourceCode: details.code,
    dependencies: details.dependencies[0] === "None" ? [] : details.dependencies,
    version: details.version,
  };

  const renderPreview = () => {
    switch (selectedForm) {
      case "textInput":      return <TextInput placeholder="Enter text..." />;
      case "passwordInput":  return <PasswordInput placeholder="Enter password..." />;
      case "textarea":       return <Textarea placeholder="Enter description..." rows={3} />;
      case "searchInput":    return <SearchInput placeholder="Search..." />;
      case "selectDropdown": return (
        <SelectDropdown placeholder="Select an option..." options={[
          { value: "1", label: "Option One" },
          { value: "2", label: "Option Two" },
          { value: "3", label: "Option Three" },
        ]} />
      );
      case "checkbox": return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <Checkbox label="Option A" checked={demoChecked} onChange={setDemoChecked} />
          <Checkbox label="Option B (checked)" checked={true} onChange={() => {}} />
        </div>
      );
      case "radioButton": return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <RadioButton label="Option A" value="a" selected={demoRadio} onChange={setDemoRadio} />
          <RadioButton label="Option B" value="b" selected={demoRadio} onChange={setDemoRadio} />
          <RadioButton label="Option C" value="c" selected={demoRadio} onChange={setDemoRadio} />
        </div>
      );
      case "switchToggle":  return <SwitchToggle checked={demoToggle} onChange={setDemoToggle} />;
      case "rangeSlider":   return <RangeSlider min={0} max={100} value={demoRange} onChange={setDemoRange} />;
      case "dateInput":     return <DateInput />;
      case "fileUpload":    return <FileUpload />;
      case "otpInput":      return <OTPInput length={6} />;
      case "inputLabel":    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <InputLabel>Standard Label</InputLabel>
          <InputLabel required>Required Label</InputLabel>
        </div>
      );
      case "inputError":    return <InputError message="This field is required" />;
      case "helperText":    return <HelperText text="Maximum 200 characters allowed" />;
      default:              return null;
    }
  };

  return (
    <div className="fd-wrapper">
      {/* TOP NAV */}
      <div className="fd-top-nav">
        <div className="fd-breadcrumbs">
          <span onClick={onNavigateHome}>Home</span>
          {" > "}
          <span onClick={onNavigateHome}>Components</span>
          {" > "}
          <span onClick={onBack}>Forms</span>
          {" > "}
          <span className="fd-bc-active">{details.name}</span>
        </div>
        <button className="fd-top-add-btn" onClick={() => setShowModal(true)}>
          ⚡ Add to Project
        </button>
      </div>

      <div className="fd-main-layout">
        {/* LEFT COLUMN */}
        <div className="fd-left-col">
          {/* HEADER */}
          <div className="fd-component-header">
            <div className="fd-title-row">
              <h1 className="fd-title">{details.name}</h1>
              <span className="fd-type-badge">{details.tag}</span>
              <span className="fd-version-badge">v{details.version}</span>
            </div>
            <p className="fd-description">{details.description}</p>
          </div>

          {/* LIVE PREVIEW */}
          <section className="fd-preview-section">
            <div className="fd-preview-label-row">
              <span>Live Preview</span>
            </div>
            <div className="fd-preview-area">
              <div className="fd-preview-item">{renderPreview()}</div>
            </div>
          </section>

          {/* CODE PREVIEW */}
          <section className="fd-code-section">
            <div className="fd-code-header">
              <span className="fd-code-title">Code Preview</span>
              <div className="fd-code-controls">
                <span>Import</span>
                <span className="fd-es6-badge">ES6</span>
              </div>
            </div>
            <div className="fd-code-body">
              <pre className="fd-code-block"><code>{details.code}</code></pre>
              <CopyAction text={details.code} label="Copy" icon="📄" />
            </div>
          </section>

          {/* TABS */}
          <section className="fd-tabs-section">
            <div className="fd-tabs-list">
              {["Description", "Props", "Usage", "Dependencies"].map((tab) => (
                <button
                  key={tab}
                  className={`fd-tab-btn ${activeTab === tab.toLowerCase() ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="fd-tab-content">
              {activeTab === "description" && (
                <div>
                  <p>The {details.name} component is used for {details.description.toLowerCase()}</p>
                  <h3>Features</h3>
                  <ul className="fd-features-list">
                    {details.tags?.map((tag) => (
                      <li key={tag} className="fd-feature-item">
                        <span className="fd-check-icon">✓</span> {tag}
                      </li>
                    ))}
                    {details.uses?.map((use) => (
                      <li key={use} className="fd-feature-item">
                        <span className="fd-check-icon">✓</span> Best Used For: {use}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === "props" && <div>Props documentation coming soon...</div>}
              {activeTab === "usage" && <div>Usage examples coming soon...</div>}
              {activeTab === "dependencies" && (
                <div>
                  <h3>Dependencies</h3>
                  <ul className="fd-dep-list">
                    {details.dependencies.map((dep) => <li key={dep}>{dep}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="fd-right-sidebar">
          <section className="fd-sidebar-box">
            <h3>Component Information</h3>
            <div className="fd-info-grid">
              <div className="fd-info-row"><span className="fd-info-label">Category</span><span className="fd-info-value">Forms</span></div>
              <div className="fd-info-row"><span className="fd-info-label">Type</span><span className="fd-info-value">{details.tag}</span></div>
              <div className="fd-info-row"><span className="fd-info-label">Size</span><span className="fd-info-value">{details.size}</span></div>
              <div className="fd-info-row"><span className="fd-info-label">Last Updated</span><span className="fd-info-value">{details.lastUpdated}</span></div>
              <div className="fd-info-row"><span className="fd-info-label">Author</span><span className="fd-info-value">UI Team</span></div>
            </div>
          </section>

          <section className="fd-sidebar-box">
            <h3>Actions</h3>
            <div className="fd-actions-list">
              <button className="fd-action-btn fd-add-btn" onClick={() => setShowModal(true)}>
                <span className="fd-action-icon">⚡</span> Add to Project
              </button>
              <CopyAction text={details.code} label="Copy Code" icon="📋" />
              <button
                className="fd-action-btn fd-github-btn"
                onClick={() => window.open("https://github.com/mahadevanr-rgb/gsus-template-hub", "_blank")}
              >
                <span className="fd-action-icon">🔗</span> View on GitHub
              </button>
            </div>
          </section>
        </div>
      </div>

      {showModal && (
        <AddToProjectModal component={mockComponent} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
