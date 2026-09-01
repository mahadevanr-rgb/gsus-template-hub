import { useRef } from "react";

export const OTPInput = ({ length = 6, onChange }) => {
  const inputs = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/, "");
    e.target.value = val;
    if (val && idx < length - 1) inputs.current[idx + 1].focus();
    const otp = inputs.current.map((el) => el?.value || "").join("");
    onChange && onChange(otp);
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !e.target.value && idx > 0) {
      inputs.current[idx - 1].focus();
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => (inputs.current[idx] = el)}
          type="text"
          maxLength={1}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className="w-12 h-12 text-center text-xl font-bold border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
        />
      ))}
    </div>
  );
};
