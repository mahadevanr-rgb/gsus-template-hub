import { useState } from "react";
import { ArrowRight, GitFork, LayoutTemplate, MessagesSquare, Send } from "lucide-react";

const footerColumns = [
  { title: "Product", links: ["Components", "Layouts", "Templates", "Pricing", "Changelog"] },
  { title: "Resources", links: ["Documentation", "Tutorials", "UI Kit Figma", "Community"] },
];

/** A responsive marketing footer with optional link and newsletter handlers. */
export default function Footer({ onNavigate, onSubscribe }) {
  const [email, setEmail] = useState("");
  const submitNewsletter = (event) => {
    event.preventDefault();
    if (email.trim()) onSubscribe?.(email.trim());
  };

  return (
    <footer className="border-t border-gray-800 bg-[#0b0f19] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <div className="flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"><LayoutTemplate className="h-5 w-5 text-white" /></span><span className="font-bold text-white">TemplateHub</span></div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">Beautiful, reusable interface building blocks for teams that move quickly.</p>
            <div className="mt-5 flex items-center gap-2">
              {[{ label: "GitHub", icon: GitFork }, { label: "Twitter", icon: Send }, { label: "Discord", icon: MessagesSquare }].map(({ label, icon: Icon }) => <button key={label} type="button" aria-label={label} onClick={() => onNavigate?.(label)} className="rounded-lg p-2 text-slate-400 transition-all duration-300 hover:bg-gray-800 hover:text-white"><Icon className="h-5 w-5" /></button>)}
            </div>
          </div>
          {footerColumns.map((column) => <div key={column.title}><h3 className="text-sm font-semibold text-white">{column.title}</h3><ul className="mt-4 space-y-3">{column.links.map((link) => <li key={link}><button type="button" onClick={() => onNavigate?.(link)} className="text-sm text-slate-400 transition-colors duration-300 hover:text-indigo-400">{link}</button></li>)}</ul></div>)}
          <div>
            <h3 className="text-sm font-semibold text-white">Subscribe for UI updates</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">A concise monthly digest of new components and design resources.</p>
            <form onSubmit={submitNewsletter} className="mt-4 flex gap-2">
              <label className="sr-only" htmlFor="templatehub-newsletter">Email address</label>
              <input id="templatehub-newsletter" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="min-w-0 flex-1 rounded-xl border border-gray-800 bg-[#111827] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10" />
              <button type="submit" aria-label="Subscribe" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-3 text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/40"><ArrowRight className="h-4 w-4" /></button>
            </form>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-gray-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} TemplateHub. All rights reserved.</p><div className="flex gap-5"><button type="button" onClick={() => onNavigate?.("Privacy Policy")} className="transition-colors hover:text-slate-300">Privacy Policy</button><button type="button" onClick={() => onNavigate?.("Terms of Service")} className="transition-colors hover:text-slate-300">Terms of Service</button></div></div>
      </div>
    </footer>
  );
}
