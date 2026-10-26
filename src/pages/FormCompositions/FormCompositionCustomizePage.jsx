import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchFormComposition,
  saveFormComposition,
  generateUniqueSlug,
} from "@/services/db";
import { formCompositions } from "@/codeRegistry/formCompositionsRegistry";
import { CodeCustomizationWorkspace } from "@/components/common/CodeCustomization";
import AddToProjectModal from "@/components/common/AddToProjectModal/AddToProjectModal";
import { createCustomizedComponent } from "@/services/codeCustomization/codeCustomizationService";
import { generateCompositionCode } from "./FormCompositionDetails";
import pickerSource from "@/pages/Forms/components/DateTime/DateTimePickers.jsx?raw";
import pickerModel from "@/pages/Forms/components/DateTime/dateTimePickerModel.js?raw";
import fieldSource from "@/pages/Forms/components/FormField/FormField.jsx?raw";
import inputError from "@/pages/Forms/components/InputError/InputError.jsx?raw";
import helperText from "@/pages/Forms/components/HelperText/HelperText.jsx?raw";
import inputLabel from "@/pages/Forms/components/InputLabel/InputLabel.jsx?raw";
import validationIndex from "@/utils/validation/index.js?raw";
import validationHook from "@/utils/validation/useValidation.js?raw";
import validationEngine from "@/utils/validation/engine.js?raw";
import validationRules from "@/utils/validation/rules.js?raw";

const baseTheme = {
  theme: "default",
  primaryColor: "#4f46e5",
  borderRadius: 12,
  background: "#020617",
  inputBackground: "#0f172a",
  inputText: "#f8fafc",
  labelColor: "#f8fafc",
};
const lightTheme = {
  background: "#ffffff",
  inputBackground: "#ffffff",
  inputText: "#0f172a",
  labelColor: "#475569",
};
const darkTheme = {
  background: "#020617",
  inputBackground: "#0f172a",
  inputText: "#f8fafc",
  labelColor: "#f8fafc",
};
const escapeRegExp = (value) =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const createLinksMarkup = (links) =>
  links
    ? `<div className="mt-4 space-y-3 text-sm"><div className="text-right"><a href={customization.forgotPasswordHref || ${JSON.stringify(links.forgotPassword?.href || "/forgot-password")}} className="font-medium hover:underline" style={{ color: theme.primaryColor }}>{customization.forgotPasswordText || ${JSON.stringify(links.forgotPassword?.label || "Forgot password?")}}</a></div><p className="text-center" style={{ color: theme.labelColor }}>{customization.signUpText || ${JSON.stringify(links.signUp?.text || "Don't have an account?")}} <a href={customization.signUpHref || ${JSON.stringify(links.signUp?.href || "/signup")}} className="font-semibold hover:underline" style={{ color: theme.primaryColor }}>{customization.signUpLabel || ${JSON.stringify(links.signUp?.label || "Sign up")}}</a></p></div>`
    : "";
const pickerControlsByComponent = {
  date: ["clearable", "disableWeekends", "locale", "minDate", "maxDate"],
  "date-picker": [
    "clearable",
    "disableWeekends",
    "locale",
    "minDate",
    "maxDate",
  ],
  dateRange: [
    "clearable",
    "disableWeekends",
    "locale",
    "minDate",
    "maxDate",
    "startLabel",
    "endLabel",
    "startPlaceholder",
    "endPlaceholder",
  ],
  "date-range-picker": [
    "clearable",
    "disableWeekends",
    "locale",
    "minDate",
    "maxDate",
    "startLabel",
    "endLabel",
    "startPlaceholder",
    "endPlaceholder",
  ],
  datetime: [
    "clearable",
    "disableWeekends",
    "locale",
    "timeFormat",
    "min",
    "max",
  ],
  "datetime-picker": [
    "clearable",
    "disableWeekends",
    "locale",
    "timeFormat",
    "min",
    "max",
  ],
  datetimeRange: [
    "clearable",
    "disableWeekends",
    "locale",
    "timeFormat",
    "min",
    "max",
  ],
  "datetime-range-picker": [
    "clearable",
    "disableWeekends",
    "locale",
    "timeFormat",
    "min",
    "max",
  ],
};
const pickerComponentsWithoutSinglePlaceholder = new Set([
  "dateRange",
  "date-range-picker",
  "datetime",
  "datetime-picker",
  "datetimeRange",
  "datetime-range-picker",
  "month",
  "month-picker",
  "year",
  "year-picker",
  "week",
  "week-picker",
  "time",
  "time-picker",
]);
const optionFieldComponents = new Set(["select-dropdown", "radio-button"]);
const pickerControlDefinitions = {
  clearable: { label: "Allow clearing", type: "checkbox", defaultValue: true },
  disableWeekends: {
    label: "Disable weekends",
    type: "checkbox",
    defaultValue: false,
  },
  locale: {
    label: "Locale",
    type: "select",
    defaultValue: "en-US",
    options: [
      { value: "en-US", label: "English (US)" },
      { value: "en-GB", label: "English (UK)" },
      { value: "de-DE", label: "German" },
      { value: "ja-JP", label: "Japanese" },
    ],
  },
  timeFormat: {
    label: "Time format",
    type: "select",
    defaultValue: "24h",
    options: [
      { value: "12h", label: "12 hour" },
      { value: "24h", label: "24 hour" },
    ],
  },
  minDate: { label: "Earliest date", type: "date" },
  maxDate: { label: "Latest date", type: "date" },
  min: { label: "Minimum", type: "text" },
  max: { label: "Maximum", type: "text" },
  startLabel: {
    label: "Start date label",
    type: "text",
    defaultValue: "Start date",
  },
  endLabel: { label: "End date label", type: "text", defaultValue: "End date" },
  startPlaceholder: {
    label: "Start date placeholder",
    type: "text",
    defaultValue: "Select date",
  },
  endPlaceholder: {
    label: "End date placeholder",
    type: "text",
    defaultValue: "Select date",
  },
};

export default function FormCompositionCustomizePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [composition, setComposition] = useState(null);
  const [error, setError] = useState("");
  const [installComponent, setInstallComponent] = useState(null);

  useEffect(() => {
    let active = true;
    const local = formCompositions.find(
      (item) => item.slug === id || item.id === id,
    );
    Promise.resolve(local || fetchFormComposition(id))
      .then((value) => {
        if (!active) return;
        if (!value) {
          setError("Form composition not found.");
          return;
        }
        setComposition(value);
      })
      .catch(
        (cause) =>
          active && setError(cause.message || "Unable to load composition."),
      );
    return () => {
      active = false;
    };
  }, [id]);

  const sourceCode = useMemo(() => {
    if (!composition) return "";
    let source =
      composition.customizedSourceCode ||
      generateCompositionCode(composition, baseTheme);
    source = source.replace(
      "const defaultFields = ",
      "const compositionFields = ",
    );
    source = source.replace("const fields = ", "const compositionFields = ");
    source = source.replace("  const fields = defaultFields;\n", "");
    source = source.replaceAll(
      "Object.fromEntries(fields.map",
      "Object.fromEntries(compositionFields.map",
    );
    source = source.replace(
      /export default function ([A-Za-z0-9]+)\(([^\n]*)\)\s*\{/,
      (_match, name, currentProps) => {
        const props = currentProps
          .replace(/^\{\s*|\s*\}$/g, "")
          .split(",")
          .map((prop) => prop.trim())
          .filter(Boolean);
        const regularProps = props.filter((prop) => !prop.startsWith("..."));
        const additions = [
          ['appearance = "dark"', "appearance"],
          ["primaryColor", "primaryColor"],
          ["borderRadius", "borderRadius"],
          ["title: titleOverride", "title:"],
          ["subtitle: subtitleOverride", "subtitle:"],
          ["buttonText: buttonTextOverride", "buttonText:"],
        ]
          .filter(([, key]) => !regularProps.some((prop) => prop.includes(key)))
          .map(([value]) => value);
        return `export default function ${name}({ ${[...regularProps, ...additions, "...customization"].join(", ")} }) {`;
      },
    );
    const fieldsSetup = `const pickerCustomizationProps = ${JSON.stringify(Object.keys(pickerControlDefinitions))};\n  const fields = (Array.isArray(customization.fieldStructure) ? customization.fieldStructure : compositionFields).map((field) => { const fieldKey = String(field.id).replace(/[^a-zA-Z0-9_-]/g, "-"); const baseField = compositionFields.find((item) => item.id === field.id); const mergedField = { ...(baseField || {}), ...field, props: { ...(baseField?.props || {}), ...(field.props || {}) } }; const label = customization["fieldLabel_" + fieldKey]; const placeholder = customization["fieldPlaceholder_" + fieldKey]; const pickerProps = Object.fromEntries(pickerCustomizationProps.filter((name) => customization["fieldPicker_" + fieldKey + "_" + name] !== undefined).map((name) => [name, customization["fieldPicker_" + fieldKey + "_" + name]])); const optionText = customization["fieldOptions_" + fieldKey]; const options = typeof optionText === "string" ? optionText.split(",").map((item) => item.trim()).filter(Boolean).map((label, index) => ({ label, value: label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "option" + (index + 1) })) : null; return { ...mergedField, ...(label !== undefined ? { label } : {}), props: { ...mergedField.props, ...(placeholder !== undefined ? { placeholder } : {}), ...pickerProps, ...(options?.length ? { options } : {}) } }; });\n  const schema = Object.fromEntries(fields.map((field) => [field.id, { ...(field.validationRules || {}), ...(field.props?.required ? { required: true } : {}) }]));\n  const initialValues = Object.fromEntries(fields.map((field) => [field.id, field.component === "range-slider" ? Number(field.props?.min ?? 0) : field.component?.includes("range") ? {} : ""]));`;
    if (source.includes("const fields = compositionFields.map")) {
      source = source.replace(
        /const fields = compositionFields\.map\(\(field\) => \{[^\n]*?\}\);/,
        fieldsSetup,
      );
    } else if (
      !source.includes(
        "const fields = (Array.isArray(customization.fieldStructure)",
      )
    ) {
      source = source.replace(
        /(export default function [A-Za-z0-9]+\([^\n]*\)\s*\{)/,
        `$1\n  ${fieldsSetup}`,
      );
    }
    const appearanceThemeSource = `const appearanceTheme = appearance === "light" ? ${JSON.stringify(lightTheme)} : ${JSON.stringify(darkTheme)};\n  const theme = { ...defaultTheme, ...themeOverrides, ...appearanceTheme, ...(primaryColor ? { primaryColor } : {}), ...(borderRadius ? { borderRadius: Number(borderRadius) } : {}) };`;
    if (!source.includes("const appearanceTheme = appearance ===")) {
      source = source.replace(
        "const theme = { ...defaultTheme, ...themeOverrides };",
        appearanceThemeSource,
      );
      if (!source.includes("const appearanceTheme = appearance ===")) {
        source = source.replace(
          /const theme = \{ \.\.\.defaultTheme, \.\.\.themeOverrides, .*?\};/,
          appearanceThemeSource,
        );
      }
    }
    source = source.replace(
      `<h2 style={{ color: theme.inputText }} className="text-lg font-bold">${composition.name}</h2>`,
      `<h2 style={{ color: theme.inputText }} className="text-lg font-bold">{titleOverride || ${JSON.stringify(composition.name)}}</h2>`,
    );
    source = source.replace(
      `<p className="mt-1 text-sm text-slate-500">${composition.description}</p>`,
      `<p className="mt-1 text-sm text-slate-500">{subtitleOverride || ${JSON.stringify(composition.description || "")}}</p>`,
    );
    const buttonLabel = composition.action?.label || "Submit";
    const buttonPattern = new RegExp(
      `>(\\s*)${escapeRegExp(buttonLabel)}(\\s*)<\\/button>`,
    );
    source = source.replace(
      buttonPattern,
      `>{buttonTextOverride || ${JSON.stringify(buttonLabel)}}</button>`,
    );
    if (
      composition.links &&
      !source.includes("customization.forgotPasswordHref")
    ) {
      source = source.replace(
        "</form>",
        `${createLinksMarkup(composition.links)}</form>`,
      );
    }
    return source;
  }, [composition]);
  const component = useMemo(() => {
    if (!composition || !sourceCode) return null;
    const safeFieldSource = fieldSource
      .replace(
        "@/pages/Forms/components/InputError/InputError",
        "../InputError/InputError.jsx",
      )
      .replace(
        "@/pages/Forms/components/HelperText/HelperText",
        "../HelperText/HelperText.jsx",
      );
    return {
      name: composition.name,
      slug: composition.slug,
      category: "Form Compositions",
      subCategory: composition.category,
      description: composition.description,
      sourceCode,
      framework: "react",
      styling: "Tailwind CSS",
      dependencies: ["lucide-react"],
      customizedSource: true,
      files: [
        {
          path: `src/components/forms/${composition.slug}.jsx`,
          content: sourceCode,
        },
        {
          path: "src/pages/Forms/components/DateTime/DateTimePickers.jsx",
          content: pickerSource,
        },
        {
          path: "src/pages/Forms/components/DateTime/dateTimePickerModel.js",
          content: pickerModel,
        },
        {
          path: "src/pages/Forms/components/FormField/FormField.jsx",
          content: safeFieldSource,
        },
        {
          path: "src/pages/Forms/components/InputError/InputError.jsx",
          content: inputError,
        },
        {
          path: "src/pages/Forms/components/HelperText/HelperText.jsx",
          content: helperText,
        },
        {
          path: "src/pages/Forms/components/InputLabel/InputLabel.jsx",
          content: inputLabel,
        },
        { path: "src/utils/validation/index.js", content: validationIndex },
        {
          path: "src/utils/validation/useValidation.js",
          content: validationHook,
        },
        { path: "src/utils/validation/engine.js", content: validationEngine },
        { path: "src/utils/validation/rules.js", content: validationRules },
      ],
    };
  }, [composition, sourceCode]);

  if (error)
    return (
      <main className="custom-workspace">
        <div role="alert" className="custom-error">
          {error}
        </div>
        <button onClick={() => navigate(`/form-compositions/${id}`)}>
          Back to Details
        </button>
      </main>
    );
  if (!component)
    return <main className="custom-workspace">Loading form composition…</main>;

  const controls = [
    {
      name: "appearance",
      label: "Appearance",
      type: "select",
      group: "Appearance",
      defaultValue: composition.installProps?.appearance || "dark",
      options: [
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
      ],
    },
    {
      name: "primaryColor",
      label: "Primary color",
      type: "color",
      group: "Appearance",
      defaultValue:
        composition.installProps?.primaryColor || baseTheme.primaryColor,
    },
    {
      name: "borderRadius",
      label: "Input style",
      type: "select",
      group: "Appearance",
      options: [
        { value: "2", label: "Square" },
        { value: "6", label: "Soft" },
        { value: "12", label: "Rounded" },
        { value: "18", label: "Pill" },
      ],
      defaultValue: String(
        composition.installProps?.borderRadius || baseTheme.borderRadius,
      ),
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      group: "Form content",
      defaultValue: composition.installProps?.title || composition.name,
    },
    {
      name: "subtitle",
      label: "Description",
      type: "textarea",
      group: "Form content",
      defaultValue:
        composition.installProps?.subtitle ?? composition.description ?? "",
    },
    {
      name: "buttonText",
      label: "Button text",
      type: "text",
      group: "Form content",
      defaultValue:
        composition.installProps?.buttonText ||
        composition.action?.label ||
        "Submit",
    },
    ...(composition.links
      ? [
          {
            name: "forgotPasswordText",
            label: "Forgot password text",
            type: "text",
            group: "Form content",
            defaultValue:
              composition.installProps?.forgotPasswordText ||
              composition.links.forgotPassword?.label ||
              "Forgot password?",
          },
          {
            name: "forgotPasswordHref",
            label: "Forgot password link",
            type: "text",
            group: "Form content",
            defaultValue:
              composition.installProps?.forgotPasswordHref ||
              composition.links.forgotPassword?.href ||
              "/forgot-password",
          },
          {
            name: "signUpText",
            label: "Sign up prompt",
            type: "text",
            group: "Form content",
            defaultValue:
              composition.installProps?.signUpText ||
              composition.links.signUp?.text ||
              "Don't have an account?",
          },
          {
            name: "signUpLabel",
            label: "Sign up link text",
            type: "text",
            group: "Form content",
            defaultValue:
              composition.installProps?.signUpLabel ||
              composition.links.signUp?.label ||
              "Sign up",
          },
          {
            name: "signUpHref",
            label: "Sign up link",
            type: "text",
            group: "Form content",
            defaultValue:
              composition.installProps?.signUpHref ||
              composition.links.signUp?.href ||
              "/signup",
          },
        ]
      : []),
    ...(composition.fields || []).flatMap((field) => {
      const key = String(field.id || field.label).replace(
        /[^a-zA-Z0-9_-]/g,
        "-",
      );
      const pickerControls = (
        pickerControlsByComponent[field.component] || []
      ).map((prop) => {
        const definition = pickerControlDefinitions[prop];
        return {
          name: `fieldPicker_${key}_${prop}`,
          label: `${field.label || field.id} · ${definition.label}`,
          type: definition.type,
          group: "Date & Time fields",
          defaultValue:
            composition.installProps?.[`fieldPicker_${key}_${prop}`] ??
            field.props?.[prop] ??
            definition.defaultValue,
          ...(definition.options ? { options: definition.options } : {}),
        };
      });
      const optionControl = optionFieldComponents.has(field.component)
        ? [
            {
              name: `fieldOptions_${key}`,
              label: `${field.label || field.id} options`,
              type: "textarea",
              group: "Fields",
              help: "Enter option labels separated by commas, for example: Engineering, Marketing, Sales.",
              defaultValue:
                composition.installProps?.[`fieldOptions_${key}`] ??
                (field.props?.options || [])
                  .map((option) => option.label ?? option.value)
                  .join(", "),
            },
          ]
        : [];
      return [
        {
          name: `fieldLabel_${key}`,
          label: `${field.label || field.id} label`,
          type: "text",
          group: "Fields",
          defaultValue:
            composition.installProps?.[`fieldLabel_${key}`] ??
            field.label ??
            "",
        },
        ...(![
          "checkbox",
          "radio-button",
          "switch-toggle",
          "range-slider",
          "input-label",
          "input-error",
          "helper-text",
        ].includes(field.component) &&
        !pickerComponentsWithoutSinglePlaceholder.has(field.component)
          ? [
              {
                name: `fieldPlaceholder_${key}`,
                label: `${field.label || field.id} placeholder`,
                type: "text",
                group: "Fields",
                defaultValue:
                  composition.installProps?.[`fieldPlaceholder_${key}`] ??
                  field.props?.placeholder ??
                  (["date", "date-picker"].includes(field.component)
                    ? `Select ${field.label || field.id}`
                    : ""),
              },
            ]
          : []),
        ...optionControl,
        ...pickerControls,
      ];
    }),
    {
      name: "fieldStructure",
      type: "hidden",
      defaultValue:
        composition.installProps?.fieldStructure || composition.fields || [],
    },
  ];

  return (
    <>
      <CodeCustomizationWorkspace
        key={`${id}:${sourceCode.length}:${sourceCode.slice(-48)}`}
        component={component}
        previewModules={[]}
        previewControls={controls}
        previewControlsTitle="Form appearance"
        enableVisualMode
        onApply={async (files, installProps) => {
          const customized = createCustomizedComponent(
            component,
            files,
            installProps,
          );
          const copySlug = generateUniqueSlug(`${composition.name} customized`);
          const updated = {
            ...composition,
            id: copySlug,
            slug: copySlug,
            name: `${composition.name} (Customized)`,
            customizedFrom: composition.slug,
            customizedSourceCode:
              files.find((file) =>
                file.path.endsWith(`${composition.slug}.jsx`),
              )?.content || files.at(-1)?.content,
            customizedFiles: files,
            installProps: {
              ...(composition.installProps || {}),
              ...installProps,
            },
            version: composition.version || "1.0.0",
          };
          const isUserCreatedComposition = !formCompositions.some(
            (item) =>
              item.slug === composition.slug || item.id === composition.id,
          );
          if (isUserCreatedComposition) {
            const result = await saveFormComposition(updated);
            if (!result?.data)
              throw new Error(
                result?.error || "Unable to save customized composition.",
              );
          }
          setInstallComponent({
            ...customized,
            ...updated,
            files,
            sourceCode: updated.customizedSourceCode,
          });
        }}
        backPath={`/form-compositions/${id}`}
      />
      {installComponent && (
        <AddToProjectModal
          component={installComponent}
          onClose={() => setInstallComponent(null)}
        />
      )}
    </>
  );
}
