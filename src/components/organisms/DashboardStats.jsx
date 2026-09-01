import { Zap, Package, FolderOpen } from "lucide-react";
import StatCard from "../atoms/StatCard";

export default function DashboardStats() {
  const stats = [
    {
      icon: Zap,
      label: "Total Templates",
      value: "24",
      change: "12%",
    },
    {
      icon: Package,
      label: "Components Count",
      value: "156",
      change: "8%",
    },
    {
      icon: FolderOpen,
      label: "Projects Created",
      value: "42",
      change: "15%",
    },
  ];

  return (
    <section className="mb-12">
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-primary-700 to-primary-600 dark:from-white dark:via-primary-400 dark:to-accent-400 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-slate-400 text-lg">
          Welcome back! Here's your project overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            change={stat.change}
          />
        ))}
      </div>
    </section>
  );
}
