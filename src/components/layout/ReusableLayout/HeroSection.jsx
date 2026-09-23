import { ArrowRight, Code2, Play } from "lucide-react";

const previewCode = `<main className="min-h-screen bg-slate-950">
  <Navbar />
  <Sidebar />
  <HeroSection />
</main>`;

/** A marketing hero with independent CTA callbacks and a code-preview mockup. */
export default function HeroSection({ onExplore, onPlayground }) {
  return (
    <section className="relative overflow-hidden bg-[#0b0f19] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_75%_35%,rgba(139,92,246,0.16),transparent_28%),radial-gradient(circle_at_20%_70%,rgba(79,70,229,0.14),transparent_25%)]" />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0 max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 shadow-lg shadow-indigo-500/10">✨ Introducing TemplateHub v2.0 <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">Build <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Sleek Web Interfaces</span> 10x Faster</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">Pre-built responsive layout compositions including Header, Sidebar, Hero, and Footer.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={onExplore} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/40">Explore Components <ArrowRight className="h-4 w-4" /></button>
            <button type="button" onClick={onPlayground} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-700 bg-[#111827] px-5 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-indigo-500/60 hover:bg-gray-800 hover:text-white"><Play className="h-4 w-4" />Live Playground</button>
          </div>
        </div>

        <div className="relative mx-auto w-full min-w-0 max-w-xl">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-xl" />
          <div className="relative overflow-hidden rounded-2xl border border-indigo-400/30 bg-[#111827] shadow-2xl shadow-indigo-500/10">
            <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3"><div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-pink-500" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /></div><span className="flex items-center gap-1.5 text-xs text-slate-500"><Code2 className="h-3.5 w-3.5" />layout.jsx</span></div>
            <pre className="overflow-x-auto p-5 text-left font-mono text-xs leading-6 text-indigo-200 sm:p-6 sm:text-sm"><code>{previewCode}</code></pre>
          </div>
        </div>
      </div>
    </section>
  );
}
