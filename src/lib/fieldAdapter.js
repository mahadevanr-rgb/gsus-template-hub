import { createElement } from "react";
import { TextInput } from "@/pages/Forms/components/TextInput/TextInput";
import { PasswordInput } from "@/pages/Forms/components/PasswordInput/PasswordInput";
import { Checkbox } from "@/pages/Forms/components/Checkbox/Checkbox";
import { DateInput } from "@/pages/Forms/components/DateInput/DateInput";
import { FileUpload } from "@/pages/Forms/components/FileUpload/FileUpload";
import { HelperText } from "@/pages/Forms/components/HelperText/HelperText";
import { InputError } from "@/pages/Forms/components/InputError/InputError";
import { InputLabel } from "@/pages/Forms/components/InputLabel/InputLabel";
import { OTPInput } from "@/pages/Forms/components/OtpInput/OtpInput";
import { RadioButton } from "@/pages/Forms/components/RadioButton/RadioButton";
import { RangeSlider } from "@/pages/Forms/components/RangeSlider/RangeSlider";
import { SearchInput } from "@/pages/Forms/components/SearchInput/SearchInput";
import { SelectDropdown } from "@/pages/Forms/components/SelectDropdown/SelectDropdown";
import { SwitchToggle } from "@/pages/Forms/components/SwitchToggle/SwitchToggle";
import { Textarea } from "@/pages/Forms/components/Textarea/Textarea";

/** Bridges registry field data to the existing atom prop contracts. */
export default function FieldAdapter({ field, value, onChange, error }) {
  const props = field.props || {};

  const withLabel = (Component, componentProps) =>
    createElement(
      "div",
      { className: "fc-field" },
      createElement(
        "label",
        { className: "block" },
        createElement("span", null, field.label),
        createElement(Component, {
          ...componentProps,
          error: error || undefined,
          "aria-invalid": Boolean(error),
        }),
      ),
      error ? createElement(InputError, { message: error }) : null,
    );

  if (field.component === "checkbox") {
    return createElement(Checkbox, {
      label: field.label,
      checked: Boolean(value),
      onChange,
      labelColor: "var(--composition-label)",
      ...props,
    });
  }
  if (field.component === "switch-toggle")
    return createElement(SwitchToggle, {
      label: field.label,
      checked: Boolean(value),
      onChange,
    });
  if (field.component === "radio-button") {
    const options = Array.isArray(props.options) && props.options.length
      ? props.options
      : [{ value: "option", label: "Option" }];
    return createElement(
      "fieldset",
      { className: "fc-field space-y-2", "aria-label": field.label || "Choose an option" },
      field.label ? createElement("legend", { className: "mb-1 text-sm font-medium" }, field.label) : null,
      options.map((option) => createElement(RadioButton, {
        key: String(option.value),
        label: option.label,
        value: option.value,
        name: field.id || field.name,
        selected: value,
        onChange,
      })),
    );
  }
  if (field.component === "range-slider") {
    const min = Number(props.min ?? 0);
    const max = Number(props.max ?? 100);
    const sliderValue = value == null || value === ""
      ? min
      : Math.min(max, Math.max(min, Number(value)));
    return withLabel(RangeSlider, {
      min,
      max,
      step: Number(props.step ?? 1),
      value: sliderValue,
      onChange,
      ...props,
    });
  }
  if (field.component === "select-dropdown")
    return withLabel(SelectDropdown, {
      value: value ?? "",
      options: props.options || [{ value: "option", label: "Option" }],
      onChange: (event) => onChange(event.target.value),
      ...props,
    });
  if (field.component === "date-input")
    return withLabel(DateInput, {
      value,
      onChange: (event) => onChange(event.target.value),
      ...props,
    });
  if (field.component === "textarea")
    return withLabel(Textarea, {
      value,
      onChange: (event) => onChange(event.target.value),
      ...props,
    });
  if (field.component === "search-input")
    return withLabel(SearchInput, { onSearch: onChange, ...props });
  if (field.component === "file-upload")
    return createElement(FileUpload, {
      label: field.label,
      onChange,
      ...props,
    });
  if (field.component === "otp-input")
    return createElement(
      "div",
      { className: "fc-field" },
      createElement("span", null, field.label),
      createElement(OTPInput, { onChange, ...props }),
    );
  if (field.component === "input-label")
    return createElement(InputLabel, { required: props.required }, field.label);
  if (field.component === "input-error")
    return createElement(InputError, { message: field.label });
  if (field.component === "helper-text")
    return createElement(HelperText, { text: field.label });

  const Input =
    field.component === "password-input" ? PasswordInput : TextInput;
  return withLabel(Input, {
    value,
    onChange: (event) => onChange(event.target.value),
    ...props,
  });
}
