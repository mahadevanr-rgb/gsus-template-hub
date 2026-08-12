export const RangeSlider = ({ min = 0, max = 100, value = 50, onChange, error, ...props }) => (
  <div className="w-full space-y-2">
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange && onChange(Number(e.target.value))}
      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-indigo-600"
      {...props}
    />
    <div className="flex justify-between text-xs text-slate-400">
      <span>{min}</span>
      <span className="font-semibold text-indigo-600">{value}</span>
      <span>{max}</span>
    </div>
  </div>
);
