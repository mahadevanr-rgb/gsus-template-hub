import { useState } from "react";
import BottomNavigation from "@/components/common/Navigation/BottomNavigation";
import { Home, Compass, Plus, Bell, User, Smartphone } from "lucide-react";

export default function BottomNavigationDemo() {
  const [activeTab, setActiveTab] = useState("home");
  const [actionCount, setActionCount] = useState(0);

  const bottomItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "explore", label: "Explore", icon: Compass, badge: "New" },
    { id: "create", label: "Create", icon: Plus, isAction: true },
    { id: "alerts", label: "Alerts", icon: Bell, badge: 3 },
    { id: "profile", label: "Account", icon: User },
  ];

  const handleSelect = (id, item) => {
    if (item.isAction) {
      setActionCount((prev) => prev + 1);
    } else {
      setActiveTab(id);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Controls Bar */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
        <span className="text-slate-400">Selected Route:</span>
        <div className="flex items-center gap-2 font-mono">
          <span className="text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            {activeTab}
          </span>
          <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Quick Action Taps: {actionCount}
          </span>
        </div>
      </div>

      {/* Simulated Mobile Canvas */}
      <div className="p-8 rounded-3xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center shadow-xl">
        <div className="w-full max-w-sm rounded-[32px] border-2 border-slate-800 bg-slate-900/90 overflow-hidden shadow-2xl relative flex flex-col justify-between min-h-[380px]">
          {/* Mobile Status Bar */}
          <div className="px-6 py-3 flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800/60">
            <span>9:41 AM</span>
            <div className="flex items-center gap-1.5 text-xs">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>

          {/* Screen Content */}
          <div className="p-6 text-center space-y-2">
            <Smartphone className="w-8 h-8 text-indigo-400 mx-auto opacity-70" />
            <h4 className="text-sm font-bold text-white capitalize">
              {activeTab} Screen View
            </h4>
            <p className="text-xs text-slate-400">
              Responsive mobile-first navigation bar with elevated primary action trigger.
            </p>
          </div>

          {/* Bottom Bar attached */}
          <div className="p-2 border-t border-slate-800/80 bg-slate-950/80">
            <BottomNavigation
              items={bottomItems}
              activeId={activeTab}
              onChange={handleSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
