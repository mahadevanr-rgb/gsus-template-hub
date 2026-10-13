import React from "react";
import { FolderUp } from "lucide-react";
import ShowcaseCard from "@/components/common/ShowcaseCard/ShowcaseCard";
import FileSystemCardPreview from "./FileSystemCardPreview";

export default function FileSystemCatalog({ components, onSelectComponent }) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FolderUp className="w-5 h-5 text-emerald-400" />
          <span>File System Component Catalog</span>
        </h2>
        <span className="text-xs text-slate-400">
          Click any card to inspect code, props, and dependencies
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {components.map((item) => (
          <ShowcaseCard
            key={item.id}
            title={item.name}
            description={item.description}
            tag={item.tag || item.subCategory}
            version={item.version || "v1.0.0"}
            theme={item.theme || "indigo"}
            preview={<FileSystemCardPreview id={item.id} />}
            onClick={() => onSelectComponent(item.slug || item.id)}
          />
        ))}
      </div>
    </section>
  );
}
