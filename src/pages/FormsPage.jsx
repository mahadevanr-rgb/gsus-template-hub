import { useState } from "react";
import FormDetails from "./FormDetails";
import "./ButtonsPage.css";

const formComponents = [
  {
    id: "textInput",
    name: "Text Input",
    description: "Standard text input with icon and error support",
    tag: "Input",
  },
  {
    id: "passwordInput",
    name: "Password Input",
    description: "Password field with show/hide toggle",
    tag: "Input",
  },
  {
    id: "textarea",
    name: "Textarea",
    description: "Multi-line text input for longer content",
    tag: "Input",
  },
  {
    id: "searchInput",
    name: "Search Input",
    description: "Search field with built-in icon and callback",
    tag: "Input",
  },
  {
    id: "selectDropdown",
    name: "Select Dropdown",
    description: "Custom styled dropdown with options list",
    tag: "Select",
  },
  {
    id: "checkbox",
    name: "Checkbox",
    description: "Custom checkbox with label and checked state",
    tag: "Choice",
  },
  {
    id: "radioButton",
    name: "Radio Button",
    description: "Single selection radio button group",
    tag: "Choice",
  },
  {
    id: "switchToggle",
    name: "Switch Toggle",
    description: "Binary on/off toggle with smooth animation",
    tag: "Toggle",
  },
  {
    id: "rangeSlider",
    name: "Range Slider",
    description: "Slider for selecting numeric values",
    tag: "Slider",
  },
  {
    id: "dateInput",
    name: "Date Input",
    description: "Native date picker with consistent styling",
    tag: "Input",
  },
  {
    id: "fileUpload",
    name: "File Upload",
    description: "Drag & drop file upload with click support",
    tag: "Upload",
  },
  {
    id: "otpInput",
    name: "OTP Input",
    description: "One-time password with auto-focus digits",
    tag: "Input",
  },
  {
    id: "inputLabel",
    name: "Input Label",
    description: "Accessible label with required indicator",
    tag: "Label",
  },
  {
    id: "inputError",
    name: "Input Error",
    description: "Validation error message with animation",
    tag: "Feedback",
  },
  {
    id: "helperText",
    name: "Helper Text",
    description: "Supplementary hint text for form fields",
    tag: "Hint",
  },
];

export default function FormsPage() {
  const [selectedForm, setSelectedForm] = useState(null);

  const handleSelect = (id) => {
    setSelectedForm(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedForm(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (selectedForm) {
    return <FormDetails selectedForm={selectedForm} onBack={handleBack} />;
  }

  return (
    <div className="buttons-page">
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem",
          background: "linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)",
          minHeight: "100vh",
        }}
      >
        <div style={{ marginBottom: "3rem" }}>
          <h1
            style={{ fontSize: "2.5rem", fontWeight: 700, color: "#1f2937", marginBottom: "0.5rem" }}
          >
            Form Components Collection
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
            Complete set of 15 reusable form atoms. Click any component to explore details, variants, and code examples.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {formComponents.map((form) => (
            <div
              key={form.id}
              onClick={() => handleSelect(form.id)}
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "2rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                borderLeft: "4px solid #6366f1",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(99,102,241,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "0.25rem 0.75rem",
                  background: "rgba(99,102,241,0.1)",
                  color: "#6366f1",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  marginBottom: "1rem",
                }}
              >
                {form.tag}
              </span>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1f2937", marginBottom: "0.5rem" }}>
                {form.name}
              </h3>
              <p style={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: 1.5 }}>
                {form.description}
              </p>
              <div
                style={{
                  marginTop: "1.5rem",
                  color: "#6366f1",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                View Details →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
