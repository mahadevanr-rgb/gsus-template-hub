import React, { useState } from 'react';
import TextInput from '@/pages/Forms/components/TextInput/TextInput';
import FormField from '@/pages/Forms/components/FormField/FormField';

export function PasswordStrengthField({ label = "Password", ...props }) {
  const [val, setVal] = useState('');
  return (
    <FormField label={label} helperText="Use at least 8 characters">
      <TextInput
        type="password"
        value={val}
        onChange={(e) => setVal(e.target ? e.target.value : e)}
        placeholder="Enter password..."
        {...props}
      />
    </FormField>
  );
}
export default PasswordStrengthField;
