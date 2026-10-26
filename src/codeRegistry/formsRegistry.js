import datePickerSource from "@/pages/Forms/components/DatePicker/DatePicker.jsx?raw";
import dateTimePickersSource from "@/pages/Forms/components/DateTime/DateTimePickers.jsx?raw";
import dateTimePickerModelSource from "@/pages/Forms/components/DateTime/dateTimePickerModel.js?raw";
import textInputSource from "@/pages/Forms/components/TextInput/TextInput.jsx?raw";
import inputLabelSource from "@/pages/Forms/components/InputLabel/InputLabel.jsx?raw";
import inputErrorSource from "@/pages/Forms/components/InputError/InputError.jsx?raw";
import helperTextSource from "@/pages/Forms/components/HelperText/HelperText.jsx?raw";

const dateTimePickerFiles = () => [
  {
    path: "forms/DateTime/DateTimePickers.jsx",
    type: "component",
    content: dateTimePickersSource,
  },
  {
    path: "forms/DateTime/dateTimePickerModel.js",
    type: "utility",
    content: dateTimePickerModelSource,
  },
];

const formFields = [
  {
    id: "text-input",
    slug: "text-input",
    name: "Text Input",
    category: "inputs",
    description:
      "Standard text input with icon prefix and error state support.",
    sourceCode: textInputSource,
    files: [
      {
        path: "forms/TextInput/TextInput.jsx",
        type: "component",
        content: textInputSource,
      },
    ],
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
    description:
      "Multi-line text input for longer content with resizable height.",
  },
  {
    slug: "search-input",
    name: "Search Input",
    category: "inputs",
    description:
      "Search field with built-in search icon and onSearch callback.",
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
    id: "date-picker",
    slug: "date-picker",
    name: "Date Picker",
    category: "date-time",
    description:
      "Accessible calendar date picker with manual entry, date constraints, and clear support.",
    exportName: "DatePicker",
    namedExport: true,
    componentDependencies: [
      "text-input",
      "input-label",
      "input-error",
      "helper-text",
    ],
    dependencies: ["lucide-react"],
    sourceCode: datePickerSource,
    files: [
      {
        path: "forms/DatePicker/DatePicker.jsx",
        type: "component",
        content: datePickerSource,
      },
    ],
    tags: ["date", "calendar", "picker"],
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    version: "1.0.0",
    author: "TemplateHub",
    uses: ["Date selection", "Date constrained forms"],
  },
  {
    id: "date-range-picker",
    slug: "date-range-picker",
    name: "Date Range Picker",
    category: "date-time",
    description:
      "Responsive date range fields with optional date limits and configurable presets.",
    exportName: "DateRangePicker",
    namedExport: true,
    componentDependencies: ["input-label", "input-error", "helper-text"],
    dependencies: ["lucide-react"],
    sourceCode: dateTimePickersSource,
    files: dateTimePickerFiles(),
    tags: ["date", "range", "presets"],
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    version: "1.0.0",
    author: "TemplateHub",
    uses: ["Date range forms", "Reporting filters"],
  },
  ...[
    [
      "month-picker",
      "Month Picker",
      "Select a month with the native localized month input.",
    ],
    [
      "year-picker",
      "Year Picker",
      "Select a year using a numeric input without hardcoded bounds.",
    ],
    [
      "week-picker",
      "Week Picker",
      "Select an ISO week using the native week input.",
    ],
    [
      "time-picker",
      "Time Picker",
      "Select time with optional second precision.",
    ],
    [
      "datetime-picker",
      "Date + Time Picker",
      "Select a local date and wall time.",
    ],
    [
      "datetime-range-picker",
      "Date + Time Range Picker",
      "Select and validate a start and end wall time.",
    ],
  ].map(([slug, name, description]) => ({
    id: slug,
    slug,
    name,
    category: "date-time",
    description,
    exportName: {
      "month-picker": "MonthPicker",
      "year-picker": "YearPicker",
      "week-picker": "WeekPicker",
      "time-picker": "TimePicker",
      "datetime-picker": "DateTimePicker",
      "datetime-range-picker": "DateTimeRangePicker",
    }[slug],
    namedExport: true,
    componentDependencies: ["input-label", "input-error", "helper-text"],
    dependencies: ["lucide-react"],
    files: dateTimePickerFiles(),
    tags: ["date-time", slug],
    framework: "react",
    language: "javascript",
    styling: "tailwind",
    version: "1.0.0",
    author: "TemplateHub",
    uses: [description],
  })),
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
    id: "input-label",
    slug: "input-label",
    name: "Input Label",
    category: "helpers",
    description: "Accessible form field label with required indicator.",
    sourceCode: inputLabelSource,
    files: [
      {
        path: "forms/InputLabel/InputLabel.jsx",
        type: "component",
        content: inputLabelSource,
      },
    ],
  },
  {
    id: "input-error",
    slug: "input-error",
    name: "Input Error",
    category: "helpers",
    description: "Error message display with alert icon styling.",
    sourceCode: inputErrorSource,
    files: [
      {
        path: "forms/InputError/InputError.jsx",
        type: "component",
        content: inputErrorSource,
      },
    ],
  },
  {
    id: "helper-text",
    slug: "helper-text",
    name: "Helper Text",
    category: "helpers",
    description: "Subtle helper text with info icon for field guidance.",
    sourceCode: helperTextSource,
    files: [
      {
        path: "forms/HelperText/HelperText.jsx",
        type: "component",
        content: helperTextSource,
      },
    ],
  },
];

export const formComponents = formFields;
export { formFields };
export default formFields;
