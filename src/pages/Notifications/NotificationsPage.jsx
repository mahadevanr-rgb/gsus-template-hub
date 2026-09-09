import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, ArrowRight } from "lucide-react";

import NotificationDetails from "./NotificationDetails";
import NotificationPreview from "./NotificationPreview";

import {
  notificationComponents,
  notificationThemes,
} from "./notification.config";

/* -------------------------------------------------------------------------- */
/* Reusable Components                                                        */
/* -------------------------------------------------------------------------- */

function Breadcrumbs({ onHome }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-500">
      <button
        type="button"
        onClick={onHome}
        className="transition-colors hover:text-white"
      >
        Home
      </button>

      <span>/</span>

      <button
        type="button"
        onClick={onHome}
        className="transition-colors hover:text-white"
      >
        Components
      </button>

      <span>/</span>

      <span className="font-medium text-white">Notifications</span>
    </div>
  );
}

function PageHeader() {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/50 px-5 py-5 shadow-xl shadow-black/10 sm:px-6">
      <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-purple-600/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative flex items-center gap-4">
        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/25 sm:flex">
          <Bell className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-2.5 py-1 text-[11px] font-semibold text-purple-300">
            <Bell className="h-3.5 w-3.5" />
            10 Notification Patterns
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Notification{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              & Feedback Systems
            </span>
          </h1>

          <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-400">
            Toasts, alerts, banners, status dots, and confirmation modals for
            seamless user communication.
          </p>
        </div>
      </div>
    </header>
  );
}

function NotificationCard({ item, onSelect }) {
  const theme = notificationThemes[item.theme];

  return (
    <article
      onClick={() => onSelect(item.id)}
      className={`
        group
        relative
        cursor-pointer
        overflow-hidden
        rounded-2xl
        border
        ${theme.border}
        bg-slate-900/65
        p-4
        shadow-xl
        shadow-black/20
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-slate-900/90
      `}
    >
      {/* Card glow */}
      <div
        className={`
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-36
          w-36
          rounded-full
          ${theme.glow}
          opacity-60
          blur-3xl
          transition-opacity
          group-hover:opacity-100
        `}
      />

      <div className="relative space-y-4">
        {/* Card meta */}
        <div className="flex items-center justify-between">
          <span
            className={`
              rounded-full
              border
              px-2.5
              py-1
              text-[10px]
              font-semibold
              ${theme.tag}
            `}
          >
            {item.tag}
          </span>

          <span className="font-mono text-[10px] text-slate-600">v1.0.0</span>
        </div>

        {/* Live preview */}
        <NotificationPreview id={item.id} />

        {/* Content */}
        <div>
          <h3
            className={`
              text-base
              font-semibold
              text-white
              transition-colors
              ${theme.hover}
            `}
          >
            {item.name}
          </h3>

          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-400">
            {item.description}
          </p>
        </div>

        {/* Footer */}
        <div
          className={`
            flex
            items-center
            justify-between
            border-t
            border-slate-800/70
            pt-3
            text-xs
            font-medium
            text-slate-500
            transition-colors
            ${theme.hover}
          `}
        >
          <span>View Details & Live Demo</span>

          <span
            className={`
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              border
              border-slate-800
              bg-slate-950/60
              transition-all
              ${theme.arrow}
            `}
          >
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function NotificationsPage() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const selectNotification = (id) => {
    setSelected(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setSelected(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (selected) {
    return (
      <NotificationDetails
        selected={selected}
        onBack={goBack}
        onNavigateHome={() => navigate("/")}
      />
    );
  }

  return (
    <main className="space-y-7">
      <Breadcrumbs onHome={() => navigate("/")} />

      <PageHeader />

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {notificationComponents.map((item) => (
          <NotificationCard
            key={item.id}
            item={item}
            onSelect={selectNotification}
          />
        ))}
      </section>
    </main>
  );
}
