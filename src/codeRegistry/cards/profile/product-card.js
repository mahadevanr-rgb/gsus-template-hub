import ProductCard from "@/pages/Cards/components/ProductCard/ProductCard";

const sourceCode = `import React from "react";

export default function ProductCard({
  productName = "Venus Product",
  icon = "planet",
  description = "You have the opportunity to play this game of life you need to appreciate every moment.",
  avatarGroup = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
  ],
  extraMemberCount = "18+",
  meta = [
    { type: "duration", label: "85 mins", icon: "clock" },
    { type: "format", label: "Video format", icon: "video" },
  ],
  onMenuClick,
  className = "",
}) {
  return (
    <div
      className={\`relative bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-lg overflow-hidden max-w-sm w-full flex flex-col justify-between transition-all \${className}\`}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 pb-0">
          <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/25">
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3.6 9h16.8" />
              <path d="M3.6 15h16.8" />
              <path d="M11.5 3a17 17 0 0 0 0 18" />
              <path d="M12.5 3a17 17 0 0 1 0 18" />
            </svg>
          </div>

          <button
            onClick={onMenuClick}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="More options"
            aria-label="More options"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>
        </div>

        {/* Product Details & Avatars */}
        <div className="p-5 pt-3 pb-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            {productName}
          </h3>

          {/* Avatar Group directly beneath title */}
          {avatarGroup && avatarGroup.length > 0 && (
            <div className="flex items-center -space-x-2 overflow-hidden mt-2.5 mb-3">
              {avatarGroup.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt="Contributor"
                  className="inline-block w-6 h-6 rounded-full object-cover ring-2 ring-white dark:ring-slate-900"
                />
              ))}
              {extraMemberCount && (
                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-[9px] font-bold text-slate-600 dark:text-slate-300 ring-2 ring-white dark:ring-slate-900 flex items-center justify-center">
                  {extraMemberCount}
                </div>
              )}
            </div>
          )}

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-3">
            {description}
          </p>
        </div>
      </div>

      {/* Meta Footer */}
      <div className="flex items-center justify-between p-5 pb-5 pt-3 border-t border-slate-100/80 dark:border-slate-800/80 mt-auto text-xs">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <svg
            className="w-4 h-4 text-emerald-500 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
          </svg>
          <span>{meta[0]?.label || "85 mins"}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-500 dark:text-rose-400">
          <div className="w-4 h-4 rounded bg-rose-500 text-white flex items-center justify-center shrink-0">
            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span>{meta[1]?.label || "Video format"}</span>
        </div>
      </div>
    </div>
  );
}`;

export default {
  id: "product-card",
  slug: "product-card",
  name: "Product Card",
  description: "Presents a product with identity, team contributors, summary description, and metadata badges.",
  category: "cards",
  subCategory: "profile",
  framework: "react",
  language: "javascript",
  styling: "tailwind",
  version: "1.0.0",
  dependencies: [],
  tags: ["product", "item", "course", "media", "video", "duration"],
  author: "TemplateHub",
  createdAt: "2025-05-12",
  updatedAt: "2025-05-12",
  files: [
    { path: "components/ui/cards/ProductCard.jsx", type: "component" },
  ],
  uses: [
    "Course & tutorial cards",
    "Digital product showcase",
    "SaaS feature highlights",
    "Media catalog items",
  ],
  component: ProductCard,
  previewProps: {
    productName: "Venus Product",
    icon: "planet",
    description: "You have the opportunity to play this game of life you need to appreciate every moment.",
    avatarGroup: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    ],
    extraMemberCount: "18+",
    meta: [
      { type: "duration", label: "85 mins", icon: "clock" },
      { type: "format", label: "Video format", icon: "video" },
    ],
  },
  sourceCode,
};
