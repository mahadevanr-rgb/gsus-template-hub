import { useState } from "react";
import NavigationDrawer from "@/components/common/Navigation/NavigationDrawer";
import { PanelLeft, PanelRight, Layers } from "lucide-react";

export default function NavigationDrawerDemo() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState("left");
  const [selectedLink, setSelectedLink] = useState("Dashboard");

  const drawerLinks = [
    { id: "dash", label: "Dashboard Hub" },
    {
      id: "modules",
      label: "Component Modules",
      children: [
        { id: "nav", label: "Navigation & States" },
        { id: "cards", label: "Cards UI Collection" },
        { id: "forms", label: "Form Architectures" },
        { id: "files", label: "File System System" },
      ],
    },
    { id: "logs", label: "Cluster Event Logs" },
    { id: "security", label: "Zero-Trust Settings" },
  ];

  return (
    <div className="w-full space-y-4">
      {/* State Log */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
        <span className="text-slate-400">Last Selected Item:</span>
        <span className="font-mono text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
          {selectedLink}
        </span>
      </div>

      {/* Trigger Buttons */}
      <div className="p-16 rounded-3xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-center gap-4 min-h-[300px] shadow-xl">
        <button
          type="button"
          onClick={() => {
            setPosition("left");
            setOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
        >
          <PanelLeft className="w-4 h-4" />
          <span>Open Left Navigation Drawer</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setPosition("right");
            setOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all active:scale-95"
        >
          <PanelRight className="w-4 h-4" />
          <span>Open Right Navigation Drawer</span>
        </button>

        <NavigationDrawer
          open={open}
          onClose={() => setOpen(false)}
          position={position}
          title={`${position === "left" ? "Left" : "Right"} Navigation Drawer`}
          items={drawerLinks}
          onItemSelect={(item) => setSelectedLink(item.label)}
        />
      </div>
    </div>
  );
}
