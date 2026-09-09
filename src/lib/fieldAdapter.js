import { createElement } from "react";
import { TextInput } from '@/pages/Forms/components/TextInput/TextInput';
import { PasswordInput } from '@/pages/Forms/components/PasswordInput/PasswordInput';
import { Checkbox } from '@/pages/Forms/components/Checkbox/Checkbox';
import { DateInput } from '@/pages/Forms/components/DateInput/DateInput';
import { FileUpload } from '@/pages/Forms/components/FileUpload/FileUpload';
import { HelperText } from '@/pages/Forms/components/HelperText/HelperText';
import { InputError } from '@/pages/Forms/components/InputError/InputError';
import { InputLabel } from '@/pages/Forms/components/InputLabel/InputLabel';
import { OTPInput } from '@/pages/Forms/components/OTPInput/OTPInput';
import { RadioButton } from '@/pages/Forms/components/RadioButton/RadioButton';
import { RangeSlider } from '@/pages/Forms/components/RangeSlider/RangeSlider';
import { SearchInput } from '@/pages/Forms/components/SearchInput/SearchInput';
import { SelectDropdown } from '@/pages/Forms/components/SelectDropdown/SelectDropdown';
import { SwitchToggle } from '@/pages/Forms/components/SwitchToggle/SwitchToggle';
import { Textarea } from '@/pages/Forms/components/Textarea/Textarea';

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
