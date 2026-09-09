import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { FileUpload } from "@/pages/Forms/components/FileUpload/FileUpload";
import { OTPInput } from "@/pages/Forms/components/OTPInput/OTPInput";
import { InputLabel } from "@/pages/Forms/components/InputLabel/InputLabel";
import { InputError } from "@/pages/Forms/components/InputError/InputError";
import { HelperText } from "@/pages/Forms/components/HelperText/HelperText";
import ComponentDetailsView from "@/components/common/ComponentDetailsView/ComponentDetailsView";

const formSiblings = [
  { slug: "textInput", name: "Text Input" },
  { slug: "passwordInput", name: "Password Input" },
  { slug: "textarea", name: "Textarea" },
  { slug: "searchInput", name: "Search Input" },
  { slug: "selectDropdown", name: "Select Dropdown" },
  { slug: "checkbox", name: "Checkbox" },
  { slug: "radioButton", name: "Radio Button" },
  { slug: "switchToggle", name: "Switch Toggle" },
  { slug: "rangeSlider", name: "Range Slider" },
  { slug: "dateInput", name: "Date Input" },
  { slug: "fileUpload", name: "File Upload" },
  { slug: "otpInput", name: "OTP Input" },
  { slug: "inputLabel", name: "Input Label" },
  { slug: "inputError", name: "Input Error" },
  { slug: "helperText", name: "Helper Text" },
];

const formMeta = {
  textInput: {
    name: "Text Input",
    tag: "Input",
    description: "Standard text input with icon prefix and error state support.",
    code: `import TextInput from "@/components/ui/TextInput";\n\n<TextInput placeholder="Enter text..." />\n<TextInput placeholder="Search..." icon="🔍" />\n<TextInput placeholder="Invalid..." error />`,
    files: [{ path: "components/ui/forms/TextInput.jsx" }],
  },
  passwordInput: {
    name: "Password Input",
    tag: "Input",
    description: "Password field with show/hide toggle for better UX.",
    code: `import PasswordInput from "@/components/ui/PasswordInput";\n\n<PasswordInput placeholder="Enter password..." />`,
    files: [{ path: "components/ui/forms/PasswordInput.jsx" }],
  },
  textarea: {
    name: "Textarea",
    tag: "Input",
    description: "Multi-line text input for longer content with resizable height.",
    code: `import Textarea from "@/components/ui/Textarea";\n\n<Textarea placeholder="Enter description..." rows={4} />`,
    files: [{ path: "components/ui/forms/Textarea.jsx" }],
  },
  searchInput: {
    name: "Search Input",
    tag: "Input",
    description: "Search field with built-in search icon and onSearch callback.",
    code: `import SearchInput from "@/components/ui/SearchInput";\n\n<SearchInput placeholder="Search..." onSearch={(val) => console.log(val)} />`,
    files: [{ path: "components/ui/forms/SearchInput.jsx" }],
  },
  selectDropdown: {
    name: "Select Dropdown",
    tag: "Select",
    description: "Custom styled dropdown with options list and error support.",
    code: `import SelectDropdown from "@/components/ui/SelectDropdown";\n\n<SelectDropdown\n  placeholder="Select an option..."\n  options={[{ value: "1", label: "Option 1" }]}\n/>`,
    files: [{ path: "components/ui/forms/SelectDropdown.jsx" }],
  },
  checkbox: {
    name: "Checkbox",
    tag: "Choice",
    description: "Accessible custom checkbox with checkmark animation.",
    code: `import Checkbox from "@/components/ui/Checkbox";\n\n<Checkbox label="Remember me" checked={true} onChange={(val) => {}} />`,
    files: [{ path: "components/ui/forms/Checkbox.jsx" }],
  },
  radioButton: {
    name: "Radio Button",
    tag: "Choice",
    description: "Radio button group for mutually exclusive options.",
    code: `import RadioButton from "@/components/ui/RadioButton";\n\n<RadioButton label="Option A" value="a" selected="a" onChange={() => {}} />`,
    files: [{ path: "components/ui/forms/RadioButton.jsx" }],
  },
  switchToggle: {
    name: "Switch Toggle",
    tag: "Toggle",
    description: "Smooth animated switch toggle for binary states.",
    code: `import SwitchToggle from "@/components/ui/SwitchToggle";\n\n<SwitchToggle checked={true} onChange={(val) => {}} />`,
    files: [{ path: "components/ui/forms/SwitchToggle.jsx" }],
  },
  rangeSlider: {
    name: "Range Slider",
    tag: "Slider",
    description: "Interactive slider for selecting numeric range values.",
    code: `import RangeSlider from "@/components/ui/RangeSlider";\n\n<RangeSlider min={0} max={100} value={50} onChange={(val) => {}} />`,
    files: [{ path: "components/ui/forms/RangeSlider.jsx" }],
  },
  dateInput: {
    name: "Date Input",
    tag: "Picker",
    description: "Native date picker formatted with calendar indicators.",
    code: `import DateInput from "@/components/ui/DateInput";\n\n<DateInput />`,
    files: [{ path: "components/ui/forms/DateInput.jsx" }],
  },
  fileUpload: {
    name: "File Upload",
    tag: "Upload",
    description: "Drag-and-drop file upload zone with file preview.",
    code: `import FileUpload from "@/components/ui/FileUpload";\n\n<FileUpload onUpload={(files) => console.log(files)} />`,
    files: [{ path: "components/ui/forms/FileUpload.jsx" }],
  },
  otpInput: {
    name: "OTP Input",
    tag: "Input",
    description: "Split 6-digit verification code input with auto-advance.",
    code: `import OTPInput from "@/components/ui/OTPInput";\n\n<OTPInput length={6} onComplete={(code) => console.log(code)} />`,
    files: [{ path: "components/ui/forms/OTPInput.jsx" }],
  },
  inputLabel: {
    name: "Input Label",
    tag: "Helper",
    description: "Accessible form field label with required star indicator.",
    code: `import InputLabel from "@/components/ui/InputLabel";\n\n<InputLabel required>Email Address</InputLabel>`,
    files: [{ path: "components/ui/forms/InputLabel.jsx" }],
  },
  inputError: {
    name: "Input Error",
    tag: "Feedback",
    description: "Validation error message banner with alert styling.",
    code: `import InputError from "@/components/ui/InputError";\n\n<InputError message="This field is required" />`,
    files: [{ path: "components/ui/forms/InputError.jsx" }],
  },
  helperText: {
    name: "Helper Text",
    tag: "Helper",
    description: "Subtle hint text with info icon for field guidance.",
    code: `import HelperText from "@/components/ui/HelperText";\n\n<HelperText text="Must be at least 8 characters" />`,
    files: [{ path: "components/ui/forms/HelperText.jsx" }],
  },
};

export default function FormDetails({ selectedForm, onBack, onNavigateHome }) {
  const params = useParams();
  const navigate = useNavigate();

  const activeSlug = selectedForm || params.id || "textInput";
  const [currentSlug, setCurrentSlug] = useState(activeSlug);
  const [demoChecked, setDemoChecked] = useState(true);
  const [demoRadio, setDemoRadio] = useState("a");
  const [demoToggle, setDemoToggle] = useState(true);
  const [demoRange, setDemoRange] = useState(65);

  useEffect(() => {
    if (selectedForm) {
      setCurrentSlug(selectedForm);
    } else if (params.id) {
      setCurrentSlug(params.id);
    }
  }, [selectedForm, params.id]);

  const meta = formMeta[currentSlug] || formMeta.textInput;
  const componentData = {
    name: meta.name,
    slug: currentSlug,
    subCategory: meta.tag,
    tag: meta.tag,
    description: meta.description,
    sourceCode: meta.code,
    files: meta.files,
    framework: "react",
    styling: "Tailwind CSS",
    version: "1.0.0",
    dependencies: ["None"],
    size: "~2.0 KB",
    lastUpdated: "May 12, 2025",
    author: "TemplateHub UI Team",
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/forms");
    }
  };

  const handleHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      navigate("/");
    }
  };

  const renderPreview = () => {
    switch (currentSlug) {
      case "textInput":
        return <TextInput placeholder="Enter text..." className="w-full" />;
      case "passwordInput":
        return <PasswordInput placeholder="Enter password..." className="w-full" />;
      case "textarea":
        return <Textarea placeholder="Enter description..." rows={3} className="w-full" />;
      case "searchInput":
        return <SearchInput placeholder="Search..." className="w-full" />;
      case "selectDropdown":
        return (
          <SelectDropdown
            placeholder="Select an option..."
            options={[
              { value: "1", label: "Option One" },
              { value: "2", label: "Option Two" },
              { value: "3", label: "Option Three" },
            ]}
            className="w-full"
          />
        );
      case "checkbox":
        return (
          <div className="flex flex-col gap-2">
            <Checkbox label="Remember preferences" checked={demoChecked} onChange={setDemoChecked} />
            <Checkbox label="Enable notifications (active)" checked={true} onChange={() => {}} />
          </div>
        );
      case "radioButton":
        return (
          <div className="flex flex-col gap-2">
            <RadioButton label="Standard Delivery (Free)" value="a" selected={demoRadio} onChange={setDemoRadio} />
            <RadioButton label="Express Delivery ($9.99)" value="b" selected={demoRadio} onChange={setDemoRadio} />
          </div>
        );
      case "switchToggle":
        return <SwitchToggle checked={demoToggle} onChange={setDemoToggle} />;
      case "rangeSlider":
        return <RangeSlider min={0} max={100} value={demoRange} onChange={setDemoRange} className="w-full" />;
      case "dateInput":
        return <DateInput className="w-full" />;
      case "fileUpload":
        return <FileUpload className="w-full" />;
      case "otpInput":
        return <OTPInput length={6} />;
      case "inputLabel":
        return (
          <div className="flex flex-col gap-2">
            <InputLabel>Standard Label</InputLabel>
            <InputLabel required>Required Field Label</InputLabel>
          </div>
        );
      case "inputError":
        return <InputError message="Please enter a valid email address" />;
      case "helperText":
        return <HelperText text="Maximum 200 characters allowed" />;
      default:
        return <TextInput placeholder="Enter text..." className="w-full" />;
    }
  };

  return (
    <ComponentDetailsView
      component={componentData}
      categoryName="Forms"
      categoryPath="/forms"
      subCategories={formSiblings}
      activeSlug={currentSlug}
      onSelectSibling={(slug) => setCurrentSlug(slug)}
      onBack={handleBack}
      onNavigateHome={handleHome}
      renderCustomPreview={renderPreview}
    />
  );
}
