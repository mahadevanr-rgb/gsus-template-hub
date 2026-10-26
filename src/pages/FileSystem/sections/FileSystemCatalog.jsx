import React from "react";
import { FolderUp, Sliders } from "lucide-react";
import ShowcaseCard from "@/components/common/ShowcaseCard/ShowcaseCard";
import FileSystemCardPreview from "./FileSystemCardPreview";

export default function FileSystemCatalog({
  components,
  onSelectComponent,
  onCustomizeComponent,
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FolderUp className="w-5 h-5 text-emerald-400" />
          <span>File System Component Catalog</span>
        </h2>
        <span className="text-xs text-slate-400">
          Click any card to inspect code, or hover to customize
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {components.map((item) => (
          <div key={item.id} className="relative group/catalogCard">
            <ShowcaseCard
              title={item.name}
              description={item.description}
              tag={item.tag || item.subCategory}
              version={item.version || "v1.0.0"}
              theme={item.theme || "indigo"}
              preview={<FileSystemCardPreview id={item.id} />}
              onClick={() => onSelectComponent(item.slug || item.id)}
            />

            {/* Quick customize button on hover */}
            {onCustomizeComponent && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCustomizeComponent(item.slug || item.id);
                }}
                title={`Customize ${item.name} in visual workspace`}
                className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover/catalogCard:opacity-100 transition-all duration-200 px-2.5 py-1 rounded-xl text-[10px] font-bold bg-emerald-600/90 hover:bg-emerald-500 text-white shadow-lg shadow-black/40 flex items-center gap-1 backdrop-blur-sm cursor-pointer"
              >
                <Sliders className="w-3 h-3" />
                <span>Customize</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
