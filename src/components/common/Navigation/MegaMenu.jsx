import { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowRight, Sparkles, Shield, Cpu, Cloud, Database, BarChart } from "lucide-react";

/**
 * Reusable MegaMenu component
 * Multi-column desktop disclosure with featured highlights, rich link descriptions, and mobile accordion adaptation
 */
export default function MegaMenu({
  triggerLabel = "Products & Cloud",
  sections = [
    {
      title: "Core Infrastructure",
      icon: Cpu,
      links: [
        { label: "Serverless Functions", description: "Event-driven micro-containers with sub-10ms cold starts", href: "#", icon: Sparkles },
        { label: "Edge Networking", description: "Global CDN distribution across 280+ POP locations", href: "#", icon: Cloud },
        { label: "High-Throughput Queue", description: "FIFO messaging with at-least-once delivery guarantees", href: "#", icon: Database },
      ],
    },
    {
      title: "Security & Observability",
      icon: Shield,
      links: [
        { label: "Zero-Trust IAM", description: "Fine-grained RBAC and SSO identity federation", href: "#", icon: Shield },
        { label: "Realtime Telemetry", description: "Distributed tracing, metric graphs, and anomaly alarms", href: "#", icon: BarChart },
        { label: "Automated Compliance", description: "Continuous HIPAA, SOC2 Type II, and PCI checks", href: "#", icon: Sparkles },
      ],
    },
  ],
  featured = {
    badge: "Quarterly Release",
    title: "AI Inference Engine v3",
    description: "Low-latency streaming models deployed at the edge with GPU acceleration.",
    cta: "Read Changelog",
    href: "#",
  },
  onSelect = null,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
          isOpen
            ? "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400"
            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
      >
        <span>{triggerLabel}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Mega Menu Dropdown Canvas */}
      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 top-full mt-2 w-[90vw] sm:w-[680px] lg:w-[780px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl shadow-black/15 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Columns for Sections */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {sections.map((section, sIdx) => {
                const SectionIcon = section.icon;
                return (
                  <div key={sIdx} className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                      {SectionIcon && (
                        <SectionIcon className="w-4 h-4 text-indigo-500" />
                      )}
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        {section.title}
                      </h4>
                    </div>

                    <div className="space-y-1">
                      {section.links.map((link, lIdx) => {
                        const LinkIcon = link.icon;
                        return (
                          <a
                            key={lIdx}
                            href={link.href || "#"}
                            onClick={(e) => {
                              if (onSelect) {
                                e.preventDefault();
                                onSelect(link);
                              }
                              setIsOpen(false);
                            }}
                            className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                          >
                            {LinkIcon && (
                              <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-indigo-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 transition-colors shrink-0 mt-0.5">
                                <LinkIcon className="w-4 h-4" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                                {link.label}
                              </p>
                              {link.description && (
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                                  {link.description}
                                </p>
                              )}
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Featured Highlight Card */}
            {featured && (
              <div className="md:col-span-1 rounded-2xl bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-950 border border-indigo-500/20 p-5 flex flex-col justify-between text-left">
                <div className="space-y-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {featured.badge}
                  </span>
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    {featured.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {featured.description}
                  </p>
                </div>

                <a
                  href={featured.href || "#"}
                  onClick={(e) => {
                    if (onSelect) {
                      e.preventDefault();
                      onSelect(featured);
                    }
                    setIsOpen(false);
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <span>{featured.cta || "Learn More"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
