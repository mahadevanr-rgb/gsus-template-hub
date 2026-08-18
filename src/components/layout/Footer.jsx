import { useNavigate } from "react-router-dom";
import { Atom, GitFork, ExternalLink, MousePointerClick, FormInput, Bell, Monitor } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-slate-800/80 bg-[#0b0f19] mt-8">
      <div className="px-6 py-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Atom className="w-6 h-6 text-indigo-500" />
              <span className="font-bold text-white text-base">TemplateHub</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Build faster with professional React components and reusable templates.
            </p>
            <div className="flex gap-3 pt-1">
              <a href="https://github.com/mahadevanr-rgb/gsus-template-hub" target="_blank" rel="noreferrer"
                className="p-2 rounded-lg bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                <GitFork className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Components */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Components</h4>
            <ul className="space-y-2">
              {[
                { label: "Buttons",       path: "/buttons",       icon: MousePointerClick },
                { label: "Forms",         path: "/forms",         icon: FormInput },
                { label: "Notifications", path: "/notifications", icon: Bell },
                { label: "Data Display",  path: "/data-display",  icon: Monitor },
              ].map((item) => (
                <li key={item.path}>
                  <button onClick={() => navigate(item.path)}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Templates */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Templates</h4>
            <ul className="space-y-2">
              {[
                { label: "Ecommerce Store",    path: "/ecommerce" },
                { label: "Inventory Manager",  path: "/inventory" },
                { label: "Create Project",     path: "/create-project" },
              ].map((item) => (
                <li key={item.path}>
                  <button onClick={() => navigate(item.path)}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: "GitHub Repository", href: "https://github.com/mahadevanr-rgb/gsus-template-hub" },
                { label: "Documentation",     href: "#" },
                { label: "Changelog",         href: "#" },
                { label: "Report an Issue",   href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} target={item.href !== "#" ? "_blank" : undefined} rel="noreferrer"
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row gap-3 justify-between items-center">
          <p className="text-xs text-slate-500">© 2025 TemplateHub. Built with React + Vite.</p>
          <div className="flex gap-4 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
