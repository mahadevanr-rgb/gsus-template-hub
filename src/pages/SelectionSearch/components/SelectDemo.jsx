import { useState } from "react";
import { ChevronDown } from "lucide-react";

const options = ["Chicken", "Mutton", "Fish", "Egg", "Prawns"];

export default function SelectDemo() {
  const [value, setValue] = useState("Chicken");

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1220] p-5">
      <h3 className="text-lg font-semibold text-white mb-1">Single Select</h3>
      <p className="text-sm text-slate-400 mb-4">
        Choose one option from the dropdown.
      </p>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-700 bg-[#111827] px-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
        >
          {options.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
      </div>

      <div className="mt-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 p-3 text-sm">
        Selected: <span className="text-indigo-300 font-medium">{value}</span>
      </div>
    </div>
  );
}
