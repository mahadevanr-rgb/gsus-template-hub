export default function StatCard({ icon: Icon, label, value, change }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-lg dark:shadow-none dark:hover:border-slate-700 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-2">
            {label}
          </p>
          <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 mb-3">
            {value}
          </p>
          {change && (
            <p className="text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
              <span className="text-lg">↗</span> {change} from last month
            </p>
          )}
        </div>
        <div className="p-4 bg-primary-50 dark:bg-primary-500/10 rounded-2xl">
          <Icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
        </div>
      </div>
    </div>
  );
}
