export default function SectionCard({ number, title, description, children }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#061127] p-6 md:p-8">
      {/* Background Glow */}
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-cyan-500/5 blur-3xl" />

      {/* Header */}
      <div className="relative flex items-start gap-5 mb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-500 text-xl font-bold text-white shadow-lg shadow-indigo-500/30">
          {number}
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">{title}</h2>

          {description && (
            <p className="mt-2 text-sm text-slate-400">{description}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative">{children}</div>
    </section>
  );
}
