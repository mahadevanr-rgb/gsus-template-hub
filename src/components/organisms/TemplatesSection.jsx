// import Card from "../atoms/Card";
// import Badge from "../atoms/Badge";

// const templates = [
//   {
//     id: 1,
//     title: "Ecommerce Store",
//     category: "E-commerce",
//     description: "Complete online shopping solution",
//     preview: "🛍️",
//     page: "ecommerce",
//   },
//   {
//     id: 2,
//     title: "Project Manager",
//     category: "Business",
//     description: "Manage stock and supplies",
//     preview: "📦",
//     page: "inventory",
//   },
// ];

// export default function TemplatesSection({ onNavigate }) {
//   return (
//     <section className="mb-12">
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
//           Popular Templates
//         </h2>
//         <p className="text-gray-600 dark:text-slate-400 text-lg mt-2">
//           Choose from our curated collection of templates
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {templates.map((template) => (
//           <Card
//             key={template.id}
//             className="group cursor-pointer overflow-hidden hover:border-primary-400 dark:hover:border-primary-500 hover:bg-gradient-to-br hover:from-primary-50 hover:to-accent-50 dark:hover:from-primary-500/10 dark:hover:to-accent-500/10"
//             onClick={() =>
//               template.page && onNavigate && onNavigate(template.page)
//             }
//             style={{ cursor: template.page ? "pointer" : "default" }}
//           >
//             <div className="w-full h-48 bg-gradient-to-br from-primary-100 via-accent-50 to-primary-50 dark:from-primary-500/15 dark:via-accent-500/10 dark:to-primary-500/10 rounded-xl flex items-center justify-center text-7xl font-bold text-primary-300 dark:text-primary-400 mb-5 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg">
//               {template.preview}
//             </div>

//             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
//               {template.title}
//             </h3>
//             <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">
//               {template.description}
//             </p>

//             <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-800">
//               <Badge text={template.category} variant="primary" />
//               {template.page && (
//                 <span className="text-xs font-bold text-primary-600 dark:text-primary-400 group-hover:text-accent-600 dark:group-hover:text-accent-400 flex items-center gap-1 transition-colors">
//                   Preview{" "}
//                   <span className="group-hover:translate-x-1 transition-transform">
//                     →
//                   </span>
//                 </span>
//               )}
//             </div>
//           </Card>
//         ))}
//       </div>
//     </section>
//   );
// }
import {
  ChevronRight,
  Layers,
  FolderKanban,
  Eye,
  MousePointerClick,
  FormInput,
  LayoutGrid,
  Navigation,
  Text,
  Table,
  PanelLeft,
  Atom,
} from "lucide-react";

// Categories Data
const categories = [
  {
    name: "Buttons",
    count: "12 Components",
    icon: MousePointerClick,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    name: "Forms",
    count: "18 Components",
    icon: FormInput,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    name: "Cards",
    count: "14 Components",
    icon: LayoutGrid,
    color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  },
  {
    name: "Navigation",
    count: "10 Components",
    icon: Navigation,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    name: "Inputs",
    count: "15 Components",
    icon: Text,
    color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    name: "Tables",
    count: "9 Components",
    icon: Table,
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
  {
    name: "Sidebar",
    count: "8 Components",
    icon: PanelLeft,
    color: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
  },
];

// Popular Components Data
const popularComponents = [
  {
    id: "primary-button",
    title: "Primary Button",
    badge: "Button",
    description: "Customizable button component with variants...",
    views: "1.2k",
    version: "v1.2.0",
    previewType: "button",
  },
  {
    id: "input-field",
    title: "Input Field",
    badge: "Input",
    description: "Text input field with label, validation and error state.",
    views: "980",
    version: "v1.1.0",
    previewType: "input",
  },
  {
    id: "card",
    title: "Card",
    badge: "Card",
    description: "Flexible card container with header and content.",
    views: "1.5k",
    version: "v1.0.3",
    previewType: "card",
  },
  {
    id: "modal",
    title: "Modal",
    badge: "Overlay",
    description: "Accessible modal component with variants.",
    views: "870",
    version: "v1.0.2",
    previewType: "modal",
  },
];

export default function TemplatesSection({ onNavigate }) {
  return (
    <div className="space-y-10 pb-12 text-slate-200">
      {/* 1. HERO BANNER SECTION */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900 to-indigo-950/40 border border-slate-800/80 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl space-y-3 z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Build faster with reusable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              React components
            </span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Discover, preview and integrate enterprise ready components into
            your projects in seconds.
          </p>
        </div>

        {/* Right Glass Stats Box with Illustration */}
        <div className="relative shrink-0 w-full md:w-auto flex items-center justify-end">
          <div className="w-full md:w-72 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-white leading-none">
                  100+
                </p>
                <p className="text-xs text-slate-400 mt-1">Components</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <FolderKanban className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-white leading-none">8</p>
                <p className="text-xs text-slate-400 mt-1">Categories</p>
              </div>
            </div>

            {/* Glowing 3D Atom Icon */}
            <div className="absolute -top-6 -right-6 text-indigo-500/20 pointer-events-none">
              <Atom className="w-32 h-32 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. BROWSE BY CATEGORIES */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Browse by Categories</h2>
          <button
            onClick={() => onNavigate && onNavigate("categories")}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
          >
            View all <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <div
                key={index}
                onClick={() => onNavigate && onNavigate(cat.name.toLowerCase())}
                className="flex flex-col items-center text-center p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/50 cursor-pointer transition-all duration-200 group"
              >
                <div
                  className={`p-2.5 rounded-xl border mb-2.5 transition-transform group-hover:scale-110 ${cat.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-white truncate w-full">
                  {cat.name}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5 truncate w-full">
                  {cat.count}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. POPULAR COMPONENTS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Popular Components</h2>
          <button
            onClick={() => onNavigate && onNavigate("components")}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
          >
            View all <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularComponents.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate && onNavigate(item.id)}
              className="flex flex-col justify-between p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40 cursor-pointer transition-all duration-200 group"
            >
              <div>
                {/* Header title & tag */}
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-medium text-slate-400 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Dynamic Preview Box (As shown in image) */}
                <div className="w-full h-24 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-center justify-center p-3 mb-4">
                  {item.previewType === "button" && (
                    <button className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-md shadow-md shadow-indigo-600/30">
                      Primary Button
                    </button>
                  )}
                  {item.previewType === "input" && (
                    <div className="w-full px-3 py-1.5 text-xs text-slate-500 bg-slate-900 border border-slate-800 rounded-md">
                      Enter your name
                    </div>
                  )}
                  {item.previewType === "card" && (
                    <div className="w-full p-2 bg-slate-900 border border-slate-800 rounded-md space-y-1 text-[10px]">
                      <div className="font-semibold text-slate-300">
                        Card Title
                      </div>
                      <div className="text-slate-500">
                        Card content goes here.
                      </div>
                    </div>
                  )}
                  {item.previewType === "modal" && (
                    <div className="p-2 bg-slate-900 border border-slate-800 rounded-md text-[10px] space-y-2 text-center w-3/4">
                      <p className="font-semibold text-slate-300">
                        Modal Title
                      </p>
                      <span className="inline-block px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-[9px]">
                        Close
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Metadata */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {item.views}
                </span>
                <span>{item.version}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
