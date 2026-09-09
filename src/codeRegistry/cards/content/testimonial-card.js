import TestimonialCard from "@/pages/Cards/components/TestimonialCard/TestimonialCard";

const sourceCode = `import React from "react";

export default function TestimonialCard({
  rating = 5,
  quote = "Switching to this platform cut our onboarding time in half. The team notices the difference every single week.",
  author = {
    name: "Marcus Ihejirika",
    role: "Head of Ops",
    company: "Fieldnote",
    avatarBg: "from-amber-400 via-rose-400 to-pink-500",
  },
  className = "",
}) {
  const clampedRating = Math.max(1, Math.min(5, Math.round(rating)));

  return (
    <div className={\`bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 max-w-xs sm:max-w-sm w-full overflow-hidden p-6 sm:p-7 flex flex-col justify-between \${className}\`}>
      <div className="space-y-4">
        <div
          className="flex items-center gap-1 text-amber-400"
          role="img"
          aria-label={\`\${clampedRating} out of 5 stars\`}
        >
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={\`w-4 h-4 \${
                i < clampedRating ? "fill-amber-400 text-amber-400" : "fill-slate-200 dark:fill-slate-700 text-slate-200 dark:text-slate-700"
              }\`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <blockquote className="text-sm sm:text-[15px] font-medium text-slate-800 dark:text-slate-200 italic leading-relaxed">
          "{quote}"
        </blockquote>
      </div>

      <div className="flex items-center gap-3 pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80">
        {author.avatarUrl ? (
          <img
            src={author.avatarUrl}
            alt={author.name}
            className="w-10 h-10 rounded-full object-cover shadow-sm ring-1 ring-black/5"
          />
        ) : (
          <div
            className={\`w-10 h-10 rounded-full bg-gradient-to-tr \${
              author.avatarBg || "from-amber-400 via-rose-400 to-pink-500"
            } shadow-sm flex items-center justify-center text-white font-bold text-sm shrink-0\`}
          >
            {author.name?.charAt(0) || "U"}
          </div>
        )}

        <div className="space-y-0.5 min-w-0">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
            {author.name}
          </h4>
          <p className="text-[11px] text-slate-400 dark:text-slate-400 truncate">
            {author.role}
            {author.company ? \`, \${author.company}\` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}`;

export default {
  id: "testimonial-card",
  slug: "testimonial-card",
  name: "Testimonial Card",
  description: "Customer quote and review card with dynamic star rating, testimonial message, and author attribution.",
  category: "cards",
  subCategory: "content",
  framework: "react",
  language: "javascript",
  styling: "tailwind",
  version: "1.0.0",
  dependencies: [],
  tags: ["testimonial", "review", "quote", "rating", "social-proof", "feedback", "customer"],
  author: "TemplateHub",
  createdAt: "2025-05-12",
  updatedAt: "2025-05-12",
  files: [
    { path: "components/ui/cards/TestimonialCard.jsx", type: "component" },
  ],
  uses: [
    "Landing page social proof sections",
    "Customer feedback carousels & grids",
    "Case study quotation cards",
    "Product review highlights",
  ],
  component: TestimonialCard,
  previewProps: {
    rating: 5,
    quote: "Switching to this platform cut our onboarding time in half. The team notices the difference every single week.",
    author: {
      name: "Marcus Ihejirika",
      role: "Head of Ops",
      company: "Fieldnote",
      avatarBg: "from-amber-400 via-rose-400 to-pink-500",
    },
  },
  sourceCode,
};
