import React from 'react';
import TextInput from '@/pages/Forms/components/TextInput/TextInput';
import PasswordInput from '@/pages/Forms/components/PasswordInput/PasswordInput';
import Textarea from '@/pages/Forms/components/Textarea/Textarea';
import Checkbox from '@/pages/Forms/components/Checkbox/Checkbox';
import SwitchToggle from '@/pages/Forms/components/SwitchToggle/SwitchToggle';
import FileUpload from '@/pages/Forms/components/FileUpload/FileUpload';
import RangeSlider from '@/pages/Forms/components/RangeSlider/RangeSlider';

export function renderField(field, value, onChange, error) {
  const commonProps = {
    id: field.name || field.id,
    name: field.name || field.id,
    label: field.label,
    placeholder: field.placeholder,
    required: field.required,
    value: value ?? '',
    onChange: (e) => onChange(e && e.target ? e.target.value : e),
    error: error
  };

  switch (field.type) {
    case 'password':
      return React.createElement(PasswordInput, commonProps);
    case 'textarea':
      return React.createElement(Textarea, { ...commonProps, rows: field.rows || 3 });
    case 'checkbox':
      return React.createElement(Checkbox, {
        ...commonProps,
        checked: !!value,
        onChange: (e) => onChange(e && e.target ? e.target.checked : e)
      });
    case 'switch':
      return React.createElement(SwitchToggle, {
        ...commonProps,
        checked: !!value,
        onChange: (e) => onChange(e && e.target ? e.target.checked : e)
      });
    case 'file':
      return React.createElement(FileUpload, commonProps);
    case 'range':
      return React.createElement(RangeSlider, { ...commonProps, min: field.min || 0, max: field.max || 100 });
    case 'text':
    case 'email':
    case 'number':
    default:
      return React.createElement(TextInput, { ...commonProps, type: field.type || 'text' });
  }
}

export default { renderField };
