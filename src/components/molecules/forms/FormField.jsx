import React from "react";
import { InputError } from "../../atoms/forms/InputError";
import { HelperText } from "../../atoms/forms/HelperText";

export const FormField = ({
  label,
  error,
  helperText,
  required,
  children,
  id,
}) => {
  return (
    <div className="flex flex-col w-full">
      {/* {label && (
        <InputLabel htmlFor={id} required={required}>
          {label}
        </InputLabel>
      )} */}
      {children}
      <InputError message={error} />
      <HelperText text={helperText} />
    </div>
  );
};
