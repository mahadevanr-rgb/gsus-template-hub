import React, { useState } from "react";
import { TextInput } from "../../atoms/forms/TextInput";
import { FormField } from "./FormField";

export const PasswordStrengthField = ({ value, ...props }) => {
  const getStrength = (val) => {
    if (!val) return 0;
    if (val.length > 8) return 100;
    return (val.length / 8) * 100;
  };

  return (
    <FormField {...props}>
      <TextInput type="password" value={value} {...props} />
      <div className="mt-2 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${value.length > 8 ? "bg-emerald-500" : "bg-amber-500"}`}
          style={{ width: `${getStrength(value)}%` }}
        />
      </div>
    </FormField>
  );
};
