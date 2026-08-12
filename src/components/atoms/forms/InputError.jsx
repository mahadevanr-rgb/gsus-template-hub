export const InputError = ({ message }) =>
  message ? (
    <p className="mt-1.5 text-xs font-medium text-rose-500 animate-in fade-in slide-in-from-top-1">
      {message}
    </p>
  ) : null;
