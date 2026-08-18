import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import FormDetails from "./FormDetails";
import "./FormsPage.css";

const formComponents = [
  { id: "textInput",      name: "Text Input",       description: "Standard text input with icon and error support",          tag: "Input"    },
  { id: "passwordInput",  name: "Password Input",   description: "Password field with show/hide toggle",                     tag: "Input"    },
  { id: "textarea",       name: "Textarea",         description: "Multi-line text input for longer content",                 tag: "Input"    },
  { id: "searchInput",    name: "Search Input",     description: "Search field with built-in icon and callback",             tag: "Input"    },
  { id: "selectDropdown", name: "Select Dropdown",  description: "Custom styled dropdown with options list",                 tag: "Select"   },
  { id: "checkbox",       name: "Checkbox",         description: "Custom checkbox with label and checked state",             tag: "Choice"   },
  { id: "radioButton",    name: "Radio Button",     description: "Single selection radio button group",                      tag: "Choice"   },
  { id: "switchToggle",   name: "Switch Toggle",    description: "Binary on/off toggle with smooth animation",               tag: "Toggle"   },
  { id: "rangeSlider",    name: "Range Slider",     description: "Slider for selecting numeric values",                      tag: "Slider"   },
  { id: "dateInput",      name: "Date Input",       description: "Native date picker with consistent styling",               tag: "Input"    },
  { id: "fileUpload",     name: "File Upload",      description: "Drag & drop file upload with click support",               tag: "Upload"   },
  { id: "otpInput",       name: "OTP Input",        description: "One-time password with auto-focus digits",                 tag: "Input"    },
  { id: "inputLabel",     name: "Input Label",      description: "Accessible label with required indicator",                 tag: "Label"    },
  { id: "inputError",     name: "Input Error",      description: "Validation error message with animation",                  tag: "Feedback" },
  { id: "helperText",     name: "Helper Text",      description: "Supplementary hint text for form fields",                  tag: "Hint"     },
];

export default function FormsPage() {
  const [selectedForm, setSelectedForm] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (id) => { setSelectedForm(id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleBack   = ()    => { setSelectedForm(null); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <MainLayout>
      {selectedForm ? (
        <FormDetails
          selectedForm={selectedForm}
          onBack={handleBack}
          onNavigateHome={() => navigate("/")}
        />
      ) : (
        <section className="forms-showcase">
          <div className="breadcrumbs">
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Home</span>
            {" > "}
            <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Components</span>
            {" > "}
            <span className="active">Forms</span>
          </div>
          <div className="showcase-header">
            <h2>Form Components Collection</h2>
            <p>Complete set of 15 reusable form atoms for every use case</p>
          </div>
          <div className="forms-grid">
            {formComponents.map((form) => (
              <div key={form.id} className="form-card" onClick={() => handleSelect(form.id)}>
                <div className="form-preview">
                  <div className="form-tag-badge">{form.tag}</div>
                </div>
                <div className="form-info">
                  <h3>{form.name}</h3>
                  <p>{form.description}</p>
                  <span className="view-details">View Details →</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </MainLayout>
  );
}
