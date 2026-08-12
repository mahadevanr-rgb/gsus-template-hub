export const HelperText = ({ text }) =>
  text ? (
    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{text}</p>
  ) : null;
