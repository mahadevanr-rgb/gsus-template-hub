import React from "react";

export const InputLabel = ({
  children,
  htmlFor,
  required,
  className = "",
  style,
}) => (
  <label
    htmlFor={htmlFor}
    style={style}
    className={`block text-sm font-semibold mb-1.5 ml-0.5 ${className}`}
  >
    {children}
    {required && <span className="text-rose-500 ml-1">*</span>}
  </label>
);

export default InputLabel;