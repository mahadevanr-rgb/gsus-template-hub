const formFields = [
  {
    slug: "text-input",
    name: "Text Input",
    category: "inputs",
    description: "Standard text input with icon prefix and error state support.",
  },
  {
    slug: "password-input",
    name: "Password Input",
    category: "inputs",
    description: "Password field with show/hide toggle for better UX.",
  },
  {
    slug: "textarea",
    name: "Textarea",
    category: "inputs",
    description: "Multi-line text input for longer content with resizable height.",
  },
  {
    slug: "search-input",
    name: "Search Input",
    category: "inputs",
    description: "Search field with built-in search icon and onSearch callback.",
  },
  {
    slug: "select-dropdown",
    name: "Select Dropdown",
    category: "select",
    description: "Custom styled dropdown with options list and error support.",
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    category: "selection",
    description: "Accessible checkbox with custom checkmark icon.",
  },
  {
    slug: "radio-button",
    name: "Radio Button",
    category: "selection",
    description: "Radio button group for mutually exclusive options.",
  },
  {
    slug: "switch-toggle",
    name: "Switch Toggle",
    category: "selection",
    description: "Smooth animated switch toggle for binary states.",
  },
  {
    slug: "range-slider",
    name: "Range Slider",
    category: "selection",
    description: "Custom styled range slider with live value display.",
  },
  {
    slug: "date-input",
    name: "Date Input",
    category: "pickers",
    description: "HTML5 date picker with calendar icon indicator.",
  },
  {
    slug: "file-upload",
    name: "File Upload",
    category: "pickers",
    description: "Drag-and-drop file upload zone with file preview.",
  },
  {
    slug: "otp-input",
    name: "OTP Input",
    category: "inputs",
    description: "Split 6-digit OTP verification code input field.",
  },
  {
    slug: "input-label",
    name: "Input Label",
    category: "helpers",
    description: "Accessible form field label with required indicator.",
  },
  {
    slug: "input-error",
    name: "Input Error",
    category: "helpers",
    description: "Error message display with alert icon styling.",
  },
  {
    slug: "helper-text",
    name: "Helper Text",
    category: "helpers",
    description: "Subtle helper text with info icon for field guidance.",
  },
];

export const formComponents = formFields;
export { formFields };
export default formFields;
