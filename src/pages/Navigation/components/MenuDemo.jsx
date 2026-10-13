import { useState } from "react";
import Menu from "@/components/common/Navigation/Menu";
import { FilePlus, FolderPlus, Download, Share2, Trash2 } from "lucide-react";

export default function MenuDemo() {
  const [selectedAction, setSelectedAction] = useState(null);

  const menuItems = [
    { id: "new-file", label: "Create File", shortcut: "⌘N", icon: FilePlus },
    { id: "new-folder", label: "Create Folder", shortcut: "⇧⌘N", icon: FolderPlus },
    { type: "separator" },
    {
      id: "share",
      label: "Collaboration",
      icon: Share2,
      children: [
        { id: "share-team", label: "Share with Workspace", shortcut: "⌘S" },
        { id: "share-public", label: "Create Public Link", shortcut: "⌥⌘L" },
      ],
    },
    { id: "export", label: "Export Archive", shortcut: "⌘E", icon: Download },
    { type: "separator" },
    { id: "delete", label: "Delete Resource", shortcut: "⌫", danger: true, icon: Trash2 },
  ];

  return (
    <div className="w-full space-y-4">
      {/* State Log */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
        <span className="text-slate-400">Triggered Action:</span>
        <span className="font-mono text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
          {selectedAction ? `${selectedAction.label} (${selectedAction.id})` : "None"}
        </span>
      </div>

      {/* Menu Viewport */}
      <div className="p-8 rounded-3xl border border-slate-800 bg-slate-950 flex justify-center shadow-xl">
        <Menu
          items={menuItems}
          onSelect={(item) => setSelectedAction(item)}
        />
      </div>
    </div>
  );
}
