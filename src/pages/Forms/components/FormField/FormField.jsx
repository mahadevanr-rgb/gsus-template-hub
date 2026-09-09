import React from 'react';
import InputError from '@/pages/Forms/components/InputError/InputError';
import HelperText from '@/pages/Forms/components/HelperText/HelperText';

export function FormField({ label, required, error, helperText, children, className = '' }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-slate-300">
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
