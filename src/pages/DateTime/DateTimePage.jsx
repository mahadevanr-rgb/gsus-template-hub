import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CalendarDays, Layers, Search } from "lucide-react";
import { formComponents } from "@/codeRegistry/formsRegistry";
import { DatePicker } from "@/pages/Forms/components/DatePicker/DatePicker";
import {
  DateRangePicker,
  DateTimePicker,
  DateTimeRangePicker,
  MonthPicker,
  TimePicker,
  WeekPicker,
  YearPicker,
} from "@/pages/Forms/components/DateTime/DateTimePickers";

const previewBySlug = {
  "date-picker": <DatePicker label="Choose date" placeholder="Select date" />,
  "date-range-picker": <DateRangePicker />,
  "month-picker": <MonthPicker />,
  "year-picker": <YearPicker />,
  "week-picker": <WeekPicker />,
  "time-picker": <TimePicker />,
  "datetime-picker": <DateTimePicker theme="dark" />,
  "datetime-range-picker": <DateTimeRangePicker />,
};

const dateTimeItems = formComponents
  .filter((component) => Object.hasOwn(previewBySlug, component.slug))
  .map((component) => ({
    ...component,
    group: component.slug.includes("time") || component.slug.includes("datetime")
      ? "Time"
      : "Date",
  }));

export default function DateTimePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("name");

  const categories = ["All", "Date", "Time"];
  const components = useMemo(
    () => dateTimeItems
      .filter((component) => category === "All" || component.group === category)
      .filter((component) => `${component.name} ${component.description}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : (b.version || "1.0.0").localeCompare(a.version || "1.0.0")),
    [category, query, sort],
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <button type="button" onClick={() => navigate("/")} className="transition-colors hover:text-white">Home</button>
        <span>/</span>
        <span className="font-medium text-white">Date &amp; Time</span>
      </div>

      <header className="flex flex-col justify-between gap-4 border-b border-slate-800/80 pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-400">
            <Layers className="h-3.5 w-3.5" />
            <span>Component Module</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Date &amp; Time</h1>
          <p className="mt-1 text-sm text-slate-400">Reusable date and time controls for your React projects.</p>
        </div>
      </header>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${category === item ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "border border-slate-800/80 bg-slate-900/60 text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search date & time..."
              className="w-full rounded-xl border border-slate-800/80 bg-slate-900/60 py-2 pl-9 pr-3.5 text-xs text-slate-200 placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="Sort components"
            className="cursor-pointer rounded-xl border border-slate-800/80 bg-slate-900/60 px-3.5 py-2 text-xs text-slate-300 focus:border-indigo-500 focus:outline-none"
          >
            <option value="name">Name</option>
            <option value="version">Version</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {components.map((component) => (
          <article
            key={component.slug}
            role="link"
            tabIndex={0}
            onClick={() => navigate(`/date-time/${component.slug}`)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                navigate(`/date-time/${component.slug}`);
              }
            }}
            className="group flex cursor-pointer flex-col justify-between space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg transition-all duration-200 hover:border-indigo-500/50 hover:bg-slate-900/90 hover:shadow-indigo-500/5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-400">
                  <CalendarDays className="h-3 w-3" />
                  {component.group} Picker
                </span>
                {/* <span className="font-mono text-xs text-slate-500">v{component.version || "1.0.0"}</span> */}
              </div>
              <div>
                <h2 className="text-base font-semibold text-white transition-colors group-hover:text-indigo-300">{component.name}</h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{component.description}</p>
              </div>
              <div className="pointer-events-none rounded-xl border border-slate-800/80 bg-slate-950/70 p-4">
                {previewBySlug[component.slug]}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-slate-800/60 pt-3 text-xs font-medium text-slate-400 transition-colors group-hover:text-indigo-400">
              <span>View component</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </article>
        ))}
      </div>

      {!components.length && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center text-xs text-slate-400">
          No date and time components match your search.
        </div>
      )}
    </div>
  );
}
