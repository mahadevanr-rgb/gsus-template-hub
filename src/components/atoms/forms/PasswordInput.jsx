import { useState } from "react";

export const PasswordInput = ({ placeholder = "Enter password...", error, ...props }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        className={`w-full px-4 py-2.5 pr-12 bg-white dark:bg-slate-900 border ${error ? "border-rose-500" : "border-slate-200 dark:border-slate-800"} rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all`}
        placeholder={placeholder}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
      >
        {show ? "🙈" : "👁️"}
      </button>
    </div>
  );
};
