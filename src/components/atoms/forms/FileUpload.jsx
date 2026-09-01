import { useRef } from "react";

export const FileUpload = ({
  onChange,
  accept = "*",
  label = "Click to upload or drag & drop",
  error,
}) => {
  const inputRef = useRef();
  return (
    <div
      onClick={() => inputRef.current.click()}
      className={`w-full border-2 border-dashed ${
        error
          ? "border-rose-500"
          : "border-slate-300 dark:border-slate-700 hover:border-indigo-400"
      } rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all bg-slate-50 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800`}
    >
      <span className="text-3xl">📁</span>
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
        {label}
      </p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onChange && onChange(e.target.files)}
      />
    </div>
  );
};
