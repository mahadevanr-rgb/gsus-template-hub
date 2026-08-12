export default function StatCard({ icon: Icon, label, value, change }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
            {label}
          </p>
          <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600 mb-3">
            {value}
          </p>
          {change && (
            <p className="text-xs font-semibold text-green-600 flex items-center gap-1">
              <span className="text-lg">↗</span> {change} from last month
            </p>
          )}
        </div>
        <div className="p-4 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl">
          <Icon className="w-7 h-7 text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600" />
        </div>
      </div>
    </div>
  );
}
