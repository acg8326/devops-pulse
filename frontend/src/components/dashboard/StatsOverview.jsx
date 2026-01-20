import { GitBranch, CheckCircle, Server, Rocket } from "lucide-react";
import { Card } from "../common";

export default function StatsOverview({ stats }) {
  const statCards = [
    {
      label: "Total Pipelines",
      value: stats.totalPipelines,
      icon: GitBranch,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20"
    },
    {
      label: "Success Rate",
      value: `${stats.successRate}%`,
      icon: CheckCircle,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/20"
    },
    {
      label: "Healthy Servers",
      value: `${stats.healthyServers}/${stats.totalServers}`,
      icon: Server,
      color: "text-amber-400",
      bgColor: "bg-amber-500/20"
    },
    {
      label: "Deployments Today",
      value: stats.deploymentsToday,
      icon: Rocket,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
