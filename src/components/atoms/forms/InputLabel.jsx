import React from "react";

export const InputLabel = ({ children, htmlFor, required }) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5 ml-0.5"
  >
    {children}
    {required && <span className="text-rose-500 ml-1">*</span>}
  </label>
);
// import React from "react";

// export const InputLabel = ({ children, htmlFor, required }) => (
//   <label
//     htmlFor={htmlFor}
//     className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5 ml-0.5"
//   >
//     {children}
//     {required && <span className="text-rose-500 ml-1">*</span>}
//   </label>
// );
