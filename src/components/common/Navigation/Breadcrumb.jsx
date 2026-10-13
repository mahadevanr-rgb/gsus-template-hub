import { useState, useRef, useEffect } from "react";
import { ChevronRight, Slash, ArrowRight, MoreHorizontal } from "lucide-react";

/**
 * Reusable Breadcrumb component
 * Supports configurable separators, icons, responsive truncation with dropdown popover, and accessibility
 */
export default function Breadcrumb({
  items = [
    { label: "Home", href: "#" },
    { label: "Projects", href: "#" },
    { label: "Design Systems", href: "#" },
    { label: "Components", href: "#" },
    { label: "Navigation", isCurrent: true },
  ],
  separator = "chevron", // "chevron" | "slash" | "arrow" | "dot"
  maxItems = 4,
  onItemClick = null,
  className = "",
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderSeparator = () => {
    switch (separator) {
      case "slash":
        return <Slash className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />;
      case "arrow":
        return <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />;
      case "dot":
        return <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-600 mx-1 shrink-0" />;
      case "chevron":
      default:
        return <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />;
    }
  };

  // Truncation logic
  const shouldTruncate = items.length > maxItems && maxItems >= 3;
  let visibleItems = items;
  let hiddenItems = [];

  if (shouldTruncate) {
    // Keep first item, hide middle, keep last items
    const first = items[0];
    const lastItems = items.slice(-(maxItems - 2));
    hiddenItems = items.slice(1, items.length - (maxItems - 2));
    visibleItems = [first, { isEllipsis: true }, ...lastItems];
  }

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs sm:text-sm font-medium ${className}`}>
      <ol className="flex items-center gap-1.5 flex-wrap text-slate-500 dark:text-slate-400">
        {visibleItems.map((item, idx) => {
          if (item.isEllipsis) {
            return (
              <li key={`ellipsis-${idx}`} className="relative flex items-center gap-1.5" ref={popoverRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  aria-label="Show collapsed breadcrumb pages"
                  className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>

                {dropdownOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-44 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 shadow-xl shadow-black/10 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {hiddenItems.map((hItem, hIdx) => (
                      <a
                        key={hIdx}
                        href={hItem.href || "#"}
                        onClick={(e) => {
                          if (onItemClick) {
                            e.preventDefault();
                            onItemClick(hItem);
                          }
                          setDropdownOpen(false);
                        }}
                        className="block px-2.5 py-1.5 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors truncate"
                      >
                        {hItem.label}
                      </a>
                    ))}
                  </div>
                )}
                {renderSeparator()}
              </li>
            );
          }

          const isCurrent = item.isCurrent || idx === visibleItems.length - 1;
          const Icon = item.icon;

          return (
            <li key={idx} className="flex items-center gap-1.5">
              {isCurrent ? (
                <span
                  aria-current="page"
                  className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 truncate"
                >
                  {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                  <span>{item.label}</span>
                </span>
              ) : (
                <a
                  href={item.href || "#"}
                  onClick={(e) => {
                    if (onItemClick) {
                      e.preventDefault();
                      onItemClick(item);
                    }
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 truncate"
                >
                  {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                  <span>{item.label}</span>
                </a>
              )}

              {idx < visibleItems.length - 1 && renderSeparator()}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
