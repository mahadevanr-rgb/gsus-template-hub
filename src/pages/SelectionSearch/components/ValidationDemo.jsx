import { useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function ValidationDemo() {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const valid = value.length >= 3;

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1220] p-5">
      <h3 className="text-lg font-semibold text-white mb-1">Validation</h3>

      <p className="text-sm text-slate-400 mb-4">
        Minimum 3 characters required.
      </p>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder="Enter name..."
        className={`w-full rounded-xl px-4 py-3 bg-[#111827] text-white outline-none border ${
          touched
            ? valid
              ? "border-green-500"
              : "border-red-500"
            : "border-slate-700 focus:border-indigo-500"
        }`}
      />

      {touched && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          {valid ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400">Looks good!</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400">
                At least 3 characters required.
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
