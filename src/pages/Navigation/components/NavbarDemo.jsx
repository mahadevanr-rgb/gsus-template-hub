import { useState } from "react";
import Navbar from "@/components/common/Navigation/Navbar";
import { Sparkles, Globe, Shield, Terminal } from "lucide-react";

export default function NavbarDemo() {
  const [variant, setVariant] = useState("glass");
  const [lastClicked, setLastClicked] = useState("Home");

  const brand = {
    name: "Nexus Cloud",
    logo: (
      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
        <Sparkles className="w-4 h-4" />
      </div>
    ),
  };

  const navItems = [
    { label: "Overview", href: "#overview", active: lastClicked === "Overview" },
    {
      label: "Products",
      href: "#products",
      children: [
        { label: "Edge Computing", description: "Distributed container nodes", href: "#edge" },
        { label: "Global Mesh", description: "Zero-latency VPC interconnects", href: "#mesh" },
        { label: "Security Shield", description: "DDoS and WAF protection", href: "#shield" },
      ],
    },
    { label: "Solutions", href: "#solutions", active: lastClicked === "Solutions" },
    { label: "Pricing", href: "#pricing", active: lastClicked === "Pricing" },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Style Variant:</span>
          {["glass", "solid", "bordered"].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVariant(v)}
              className={`px-3 py-1 rounded-lg font-semibold capitalize transition-all ${
                variant === v
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span>Active Selection:</span>
          <span className="font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            {lastClicked}
          </span>
        </div>
      </div>

      {/* Rendered Navbar Preview */}
      <div className="rounded-3xl border border-slate-800 overflow-hidden bg-slate-950 p-2 sm:p-4 shadow-xl">
        <Navbar
          brand={brand}
          items={navItems}
          variant={variant}
          onItemClick={(item) => setLastClicked(item.label)}
        />
      </div>
    </div>
  );
}
