import { useState } from "react";

export const PasswordInput = ({ placeholder = "Enter password...", error, className = "", ...props }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative flex w-full items-center">
      <input
        type={show ? "text" : "password"}
        className={`block w-full px-4 py-2.5 pr-12 text-sm leading-5 text-slate-900 placeholder:text-slate-400 dark:text-slate-100 bg-white dark:bg-slate-900 border ${error ? "border-rose-500" : "border-slate-200 dark:border-slate-800"} rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all ${className}`}
        placeholder={placeholder}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center leading-none text-slate-400 hover:text-slate-600 transition-colors"
      >
        {show ? "🙈" : "👁️"}
      </button>
    </div>
  );
};

export default PasswordInput;
