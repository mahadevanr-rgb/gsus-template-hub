import React from 'react';
import InputError from '@/pages/Forms/components/InputError/InputError';
import HelperText from '@/pages/Forms/components/HelperText/HelperText';

export function FormField({
  label,
  required,
  error,
  helperText,
  children,
  className = '',
  labelColor,
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          className="block text-xs font-semibold"
          style={labelColor ? { color: labelColor } : undefined}
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      {children}
      {error && <InputError message={error} />}
      {!error && helperText && <HelperText text={helperText} />}
    </div>
  );
}

export default FormField;