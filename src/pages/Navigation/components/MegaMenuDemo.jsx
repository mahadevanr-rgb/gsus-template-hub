import { useState } from "react";
import MegaMenu from "@/components/common/Navigation/MegaMenu";
import { Server, Database, Shield, Zap } from "lucide-react";

export default function MegaMenuDemo() {
  const [clickedItem, setClickedItem] = useState(null);

  const sections = [
    {
      title: "Distributed Compute",
      icon: Server,
      links: [
        { label: "Serverless Workers", description: "Ultra low-overhead isolate runtimes", href: "#" },
        { label: "Kubernetes Engine", description: "Fully automated cluster control plane", href: "#" },
        { label: "GPU Acceleration", description: "H100 & A100 LLM inference instances", href: "#" },
      ],
    },
    {
      title: "Data Persistence",
      icon: Database,
      links: [
        { label: "Vector Database", description: "High-dimensional embeddings index", href: "#" },
        { label: "Edge Key-Value", description: "Sub-5ms global replication store", href: "#" },
        { label: "Cold Archival", description: "Cost-optimized glacier tier object store", href: "#" },
      ],
    },
  ];

  return (
    <div className="w-full space-y-4">
      {/* State Log */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
        <span className="text-slate-400">Selected Product Target:</span>
        <span className="font-mono text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
          {clickedItem ? clickedItem.label || clickedItem.title : "None (Hover or click trigger below)"}
        </span>
      </div>

      {/* Canvas */}
      <div className="p-16 rounded-3xl border border-slate-800 bg-slate-950 flex flex-col items-center justify-center min-h-[360px] shadow-xl">
        <MegaMenu
          triggerLabel="Cloud Architecture & Services"
          sections={sections}
          featured={{
            badge: "Enterprise v4",
            title: "Multi-Region VPC Peering",
            description: "Direct encrypted fiber cross-connects between all global cloud providers.",
            cta: "Read Architecture Whitepaper",
          }}
          onSelect={(item) => setClickedItem(item)}
        />
      </div>
    </div>
  );
}
