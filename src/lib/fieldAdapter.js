import { createElement } from "react";
import { TextInput } from "../components/atoms/forms/TextInput";
import { PasswordInput } from "../components/atoms/forms/PasswordInput";
import { Checkbox } from "../components/atoms/forms/Checkbox";
import { DateInput } from "../components/atoms/forms/DateInput";
import { FileUpload } from "../components/atoms/forms/FileUpload";
import { HelperText } from "../components/atoms/forms/HelperText";
import { InputError } from "../components/atoms/forms/InputError";
import { InputLabel } from "../components/atoms/forms/InputLabel";
import { OTPInput } from "../components/atoms/forms/OTPInput";
import { RadioButton } from "../components/atoms/forms/RadioButton";
import { RangeSlider } from "../components/atoms/forms/RangeSlider";
import { SearchInput } from "../components/atoms/forms/SearchInput";
import { SelectDropdown } from "../components/atoms/forms/SelectDropdown";
import { SwitchToggle } from "../components/atoms/forms/SwitchToggle";
import { Textarea } from "../components/atoms/forms/Textarea";

/** Bridges registry field data to the existing atom prop contracts. */
export default function FieldAdapter({ field, value, onChange }) {
  const props = field.props || {};
  const withLabel = (Component, componentProps) => createElement(
    "label",
    { className: "fc-field" },
    createElement("span", null, field.label),
    createElement(Component, componentProps),
  );

  if (field.component === "checkbox") {
    return createElement(Checkbox, { label: field.label, checked: Boolean(value), onChange, ...props });
  }
  if (field.component === "switch-toggle") return createElement(SwitchToggle, { label: field.label, checked: Boolean(value), onChange });
  if (field.component === "radio-button") return createElement(RadioButton, { label: field.label, value: "option", selected: value, onChange });
  if (field.component === "range-slider") return withLabel(RangeSlider, { value: Number(value) || 50, onChange });
  if (field.component === "select-dropdown") return withLabel(SelectDropdown, { options: [{ value: "option", label: "Option" }], onChange: (event) => onChange(event.target.value), ...props });
  if (field.component === "date-input") return withLabel(DateInput, { value, onChange: (event) => onChange(event.target.value), ...props });
  if (field.component === "textarea") return withLabel(Textarea, { value, onChange: (event) => onChange(event.target.value), ...props });
  if (field.component === "search-input") return withLabel(SearchInput, { onSearch: onChange, ...props });
  if (field.component === "file-upload") return createElement(FileUpload, { label: field.label, onChange, ...props });
  if (field.component === "otp-input") return createElement(OTPInput, { onChange, ...props });
  if (field.component === "input-label") return createElement(InputLabel, { required: props.required }, field.label);
  if (field.component === "input-error") return createElement(InputError, { message: field.label });
  if (field.component === "helper-text") return createElement(HelperText, { text: field.label });

  const Input = field.component === "password-input" ? PasswordInput : TextInput;
  return withLabel(Input, { value, onChange: (event) => onChange(event.target.value), ...props });
}
