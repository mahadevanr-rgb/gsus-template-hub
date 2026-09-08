// import { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ArrowLeft, Check, Clipboard, PackagePlus } from "lucide-react";
// import MainLayout from "../components/layout/MainLayout";
// import AddToProjectModal from "../components/organisms/AddToProjectModal";
// import "../components/organisms/AddToProjectModal.css";
// import PrimaryButton from "../components/atoms/buttons/PrimaryButton";
// import FieldAdapter from "../lib/fieldAdapter";
// import { fetchFormComposition } from "../lib/db";
// import "./FormCompositionDetails.css";

// function formatProp(value) {
//   return typeof value === "string"
//     ? `"${value}"`
//     : `{${JSON.stringify(value)}}`;
// }

// function compositionCode(composition) {
//   const imports = [
//     'import { useState } from "react";',
//     'import { TextInput } from "@/components/atoms/forms/TextInput";',
//     'import { PasswordInput } from "@/components/atoms/forms/PasswordInput";',
//     'import { Checkbox } from "@/components/atoms/forms/Checkbox";',
//     'import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";',
//   ];
//   const componentNames = {
//     "text-input": "TextInput",
//     "password-input": "PasswordInput",
//     checkbox: "Checkbox",
//   };
//   const fields = composition.fields
//     .map((field) => {
//       const props = Object.entries(field.props || {})
//         .filter(([key]) => key !== "defaultChecked")
//         .map(([key, value]) => `${key}=${formatProp(value)}`)
//         .join(" ");
//       return field.component === "checkbox"
//         ? `      <Checkbox label="${field.label}" checked={rememberMe} onChange={setRememberMe}${props ? ` ${props}` : ""} />`
//         : `      <label>\n        <span>${field.label}</span>\n        <${componentNames[field.component]}${props ? ` ${props}` : ""} />\n      </label>`;
//     })
//     .join("\n");
//   return `${imports.join("\n")}\n\nexport default function ${composition.name.replace(/ /g, "")}() {\n  const [rememberMe, setRememberMe] = useState(false);\n\n  return (\n    <form>\n${fields}\n      <PrimaryButton label="${composition.action.label}" onClick={() => {}} />\n    </form>\n  );\n}`;
// }

// export default function FormCompositionDetails() {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("Overview");
//   const [values, setValues] = useState({ remember: false });
//   const [showModal, setShowModal] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [composition, setComposition] = useState(undefined);

//   useEffect(() => {
//     let active = true;
//     setComposition(undefined);
//     fetchFormComposition(slug).then((result) => {
//       if (active) setComposition(result || null);
//     });
//     return () => {
//       active = false;
//     };
//   }, [slug]);

//   const code = useMemo(
//     () => (composition ? compositionCode(composition) : ""),
//     [composition],
//   );

//   if (composition === undefined)
//     return (
//       <MainLayout>
//         <main className="fcd-missing">
//           <h1>Loading…</h1>
//         </main>
//       </MainLayout>
//     );
//   if (!composition)
//     return (
//       <MainLayout>
//         <main className="fcd-missing">
//           <h1>Composition not found</h1>
//           <button onClick={() => navigate("/form-compositions")}>
//             Back to Form Compositions
//           </button>
//         </main>
//       </MainLayout>
//     );

//   const mockComponent = {
//     name: composition.name,
//     slug: composition.slug,
//     sourceCode: code,
//     dependencies: composition.dependencies,
//     version: composition.version,
//   };
//   const copyCode = async () => {
//     await navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <MainLayout>
//       <main className="fcd-page">
//         <div className="fcd-top">
//           <nav className="fcd-breadcrumbs">
//             <button onClick={() => navigate("/")}>Home</button>
//             <span>/</span>
//             <button onClick={() => navigate("/form-compositions")}>
//               Form Compositions
//             </button>
//             <span>/</span>
//             <span>{composition.name}</span>
//           </nav>
//           <button className="fcd-add-top" onClick={() => setShowModal(true)}>
//             <PackagePlus size={17} /> Add to Project
//           </button>
//         </div>
//         <div className="fcd-layout">
//           <div className="fcd-content">
//             <header className="fcd-header">
//               <button
//                 className="fcd-back"
//                 onClick={() => navigate("/form-compositions")}
//               >
//                 <ArrowLeft size={17} /> All compositions
//               </button>
//               <div className="fcd-title-row">
//                 <h2>{composition.name}</h2>
//                 <span className="fcd-badge">{composition.category}</span>
//                 <span className="fcd-version">v{composition.version}</span>
//               </div>
//               <p>{composition.description}</p>
//             </header>
//             <section className="fcd-preview-section">
//               <div className="fcd-section-title">
//                 <h2>Live Preview</h2>
//                 <span>Interactive</span>
//               </div>
//               <div className="fcd-preview">
//                 <form
//                   className="fcd-login-form"
//                   onSubmit={(event) => event.preventDefault()}
//                 >
//                   {composition.fields.map((field) => (
//                     <FieldAdapter
//                       key={field.id}
//                       field={field}
//                       value={values[field.id] ?? ""}
//                       onChange={(value) =>
//                         setValues((current) => ({
//                           ...current,
//                           [field.id]: value,
//                         }))
//                       }
//                     />
//                   ))}
//                   <PrimaryButton
//                     label={composition.action.label}
//                     onClick={() => {}}
//                   />
//                 </form>
//               </div>
//             </section>
//             <section className="fcd-tabs">
//               <div className="fcd-tab-list">
//                 {["Overview", "Fields", "Usage", "Code", "Dependencies"].map(
//                   (tab) => (
//                     <button
//                       key={tab}
//                       onClick={() => setActiveTab(tab)}
//                       className={activeTab === tab ? "active" : ""}
//                     >
//                       {tab}
//                     </button>
//                   ),
//                 )}
//               </div>
//               <div className="fcd-tab-body">
//                 {activeTab === "Overview" && (
//                   <>
//                     <p>{composition.overview}</p>
//                     <h3>Included components</h3>
//                     <ul>
//                       {composition.dependencies.map((item) => (
//                         <li key={item}>
//                           <Check size={16} /> {item}
//                         </li>
//                       ))}
//                     </ul>
//                   </>
//                 )}
//                 {activeTab === "Fields" && (
//                   <div className="fcd-field-table">
//                     {composition.fields.map((field) => (
//                       <div key={field.id}>
//                         <strong>{field.label}</strong>
//                         <code>{field.component}</code>
//                         <span>
//                           {field.props?.required ? "Required" : "Optional"}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//                 {activeTab === "Usage" && (
//                   <p>
//                     Use this composition as the starting point for an
//                     authentication screen, then connect its submit action to
//                     your application’s sign-in flow.
//                   </p>
//                 )}
//                 {activeTab === "Code" && (
//                   <div className="fcd-code">
//                     <button onClick={copyCode}>
//                       <Clipboard size={15} /> {copied ? "Copied" : "Copy"}
//                     </button>
//                     <pre>
//                       <code>{code}</code>
//                     </pre>
//                   </div>
//                 )}
//                 {activeTab === "Dependencies" && (
//                   <ul>
//                     {composition.dependencies.map((item) => (
//                       <li key={item}>
//                         <code>{item}</code>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </section>
//           </div>
//           <aside className="fcd-aside">
//             <section>
//               <h3>Composition Information</h3>
//               <dl>
//                 <div>
//                   <dt>Category</dt>
//                   <dd>{composition.category}</dd>
//                 </div>
//                 <div>
//                   <dt>Version</dt>
//                   <dd>{composition.version}</dd>
//                 </div>
//                 <div>
//                   <dt>Fields</dt>
//                   <dd>{composition.fields.length}</dd>
//                 </div>
//               </dl>
//             </section>
//             <section>
//               <h3>Actions</h3>
//               <button
//                 className="fcd-aside-add"
//                 onClick={() => setShowModal(true)}
//               >
//                <span className="fd-action-icon">⚡</span> Add to Project

//               </button>
//               <button onClick={copyCode}>
//                 <Clipboard size={17} /> {copied ? "Code copied" : "Copy code"}
//               </button>
//             </section>
//           </aside>
//         </div>
//       </main>
//       {showModal && (
//         <AddToProjectModal
//           component={mockComponent}
//           onClose={() => setShowModal(false)}
//         />
//       )}
//     </MainLayout>
//   );
// }



import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Clipboard, PackagePlus } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";
import AddToProjectModal from "../components/organisms/AddToProjectModal";
import "../components/organisms/AddToProjectModal.css";
import PrimaryButton from "../components/atoms/buttons/PrimaryButton";
import FieldAdapter from "../lib/fieldAdapter";
import { fetchFormComposition } from "../lib/db";
import "./FormCompositionDetails.css";

function formatProp(value) {
  return typeof value === "string"
    ? `"${value}"`
    : `{${JSON.stringify(value)}}`;
}

function compositionCode(composition) {
  const imports = [
    'import { useState } from "react";',
    'import { TextInput } from "@/components/atoms/forms/TextInput";',
    'import { PasswordInput } from "@/components/atoms/forms/PasswordInput";',
    'import { Checkbox } from "@/components/atoms/forms/Checkbox";',
    'import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";',
  ];
  const componentNames = {
    "text-input": "TextInput",
    "password-input": "PasswordInput",
    checkbox: "Checkbox",
  };
  const fields = composition.fields
    .map((field) => {
      const props = Object.entries(field.props || {})
        .filter(([key]) => key !== "defaultChecked")
        .map(([key, value]) => `${key}=${formatProp(value)}`)
        .join(" ");
      return field.component === "checkbox"
        ? `      <Checkbox label="${field.label}" checked={rememberMe} onChange={setRememberMe}${props ? ` ${props}` : ""} />`
        : `      <label>\n        <span>${field.label}</span>\n        <${componentNames[field.component]}${props ? ` ${props}` : ""} />\n      </label>`;
    })
    .join("\n");
  return `${imports.join("\n")}\n\nexport default function ${composition.name.replace(/ /g, "")}() {\n  const [rememberMe, setRememberMe] = useState(false);\n\n  return (\n    <form>\n${fields}\n      <PrimaryButton label="${composition.action.label}" onClick={() => {}} />\n    </form>\n  );\n}`;
}

export default function FormCompositionDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [values, setValues] = useState({ remember: false });
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [composition, setComposition] = useState(undefined);

  useEffect(() => {
    let active = true;
    setComposition(undefined);
    fetchFormComposition(slug).then((result) => {
      if (active) setComposition(result || null);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  const code = useMemo(
    () => (composition ? compositionCode(composition) : ""),
    [composition],
  );

  if (composition === undefined)
    return (
      <MainLayout>
        <main className="fcd-missing">
          <h1>Loading…</h1>
        </main>
      </MainLayout>
    );
  if (!composition)
    return (
      <MainLayout>
        <main className="fcd-missing">
          <h1>Composition not found</h1>
          <button onClick={() => navigate("/form-compositions")}>
            Back to Form Compositions
          </button>
        </main>
      </MainLayout>
    );

  const mockComponent = {
    name: composition.name,
    slug: composition.slug,
    sourceCode: code,
    dependencies: composition.dependencies,
    version: composition.version,
  };
  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MainLayout>
      <main className="fcd-page">
        <div className="fcd-top">
          <nav className="fcd-breadcrumbs">
            <button onClick={() => navigate("/")}>Home</button>
            <span>/</span>
            <button onClick={() => navigate("/form-compositions")}>
              Form Compositions
            </button>
            <span>/</span>
            <span>{composition.name}</span>
          </nav>
          <button className="fcd-add-top" onClick={() => setShowModal(true)}>
            <PackagePlus size={17} /> Add to Project
          </button>
        </div>
        <div className="fcd-layout">
          <div className="fcd-content">
            <header className="fcd-header">
              <button
                className="fcd-back"
                onClick={() => navigate("/form-compositions")}
              >
                <ArrowLeft size={17} /> All compositions
              </button>
              <div className="fcd-title-row">
                <h2>{composition.name}</h2>
                <span className="fcd-badge">{composition.category}</span>
                <span className="fcd-version">v{composition.version}</span>
              </div>
              <p>{composition.description}</p>
            </header>
            <section className="fcd-preview-section">
              <div className="fcd-section-title">
                <h2>Live Preview</h2>
                <span>Interactive</span>
              </div>
              <div className="fcd-preview">
                <form
                  className="fcd-login-form"
                  onSubmit={(event) => event.preventDefault()}
                >
                  {composition.fields.map((field) => (
                    <FieldAdapter
                      key={field.id}
                      field={field}
                      value={values[field.id] ?? ""}
                      onChange={(value) =>
                        setValues((current) => ({
                          ...current,
                          [field.id]: value,
                        }))
                      }
                    />
                  ))}
                  <PrimaryButton
                    label={composition.action.label}
                    onClick={() => {}}
                  />
                </form>
              </div>
            </section>
            <section className="fcd-tabs">
              <div className="fcd-tab-list">
                {["Overview", "Fields", "Usage", "Code", "Dependencies"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={activeTab === tab ? "active" : ""}
                    >
                      {tab}
                    </button>
                  ),
                )}
              </div>
              <div className="fcd-tab-body">
                {activeTab === "Overview" && (
                  <>
                    <p>{composition.overview}</p>
                    <h3>Included components</h3>
                    <ul>
                      {composition.dependencies.map((item) => (
                        <li key={item}>
                          <Check size={16} /> {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {activeTab === "Fields" && (
                  <div className="fcd-field-table">
                    {composition.fields.map((field) => (
                      <div key={field.id}>
                        <strong>{field.label}</strong>
                        <code>{field.component}</code>
                        <span>
                          {field.props?.required ? "Required" : "Optional"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "Usage" && (
                  <p>
                    Use this composition as the starting point for an
                    authentication screen, then connect its submit action to
                    your application’s sign-in flow.
                  </p>
                )}
                {activeTab === "Code" && (
                  <div className="fcd-code">
                    <button onClick={copyCode}>
                      <Clipboard size={15} /> {copied ? "Copied" : "Copy"}
                    </button>
                    <pre>
                      <code>{code}</code>
                    </pre>
                  </div>
                )}
                {activeTab === "Dependencies" && (
                  <ul>
                    {composition.dependencies.map((item) => (
                      <li key={item}>
                        <code>{item}</code>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </div>
          <aside className="fcd-aside">
            <section>
              <h3>Composition Information</h3>
              <dl>
                <div>
                  <dt>Category</dt>
                  <dd>{composition.category}</dd>
                </div>
                <div>
                  <dt>Version</dt>
                  <dd>{composition.version}</dd>
                </div>
                <div>
                  <dt>Fields</dt>
                  <dd>{composition.fields.length}</dd>
                </div>
              </dl>
            </section>
            <section>
              <h3>Actions</h3>
              <button
                className="fcd-aside-add"
                onClick={() => setShowModal(true)}
              >
               <span className="fd-action-icon">⚡</span> Add to Project

              </button>
              <button onClick={copyCode}>
                <Clipboard size={17} /> {copied ? "Code copied" : "Copy code"}
              </button>
            </section>
          </aside>
        </div>
      </main>
      {showModal && (
        <AddToProjectModal
          component={mockComponent}
          onClose={() => setShowModal(false)}
        />
      )}
    </MainLayout>
  );
}