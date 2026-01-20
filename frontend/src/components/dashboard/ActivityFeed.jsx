import { Rocket, GitBranch, AlertTriangle } from "lucide-react";
import { Card } from "../common";

export default function ActivityFeed({ activities }) {
  const getIcon = (type) => {
    const icons = {
      deployment: Rocket,
      pipeline: GitBranch,
      alert: AlertTriangle
    };
    return icons[type] || GitBranch;
  };

  const getIconStyle = (type) => {
    const styles = {
      deployment: "bg-purple-500/20 text-purple-400",
      pipeline: "bg-blue-500/20 text-blue-400",
      alert: "bg-red-500/20 text-red-400"
    };
    return styles[type] || styles.pipeline;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <Card>
      <h2 className="text-lg font-semibold text-white mb-4">Activity Feed</h2>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getIcon(activity.type);
          return (
            <div key={activity.id} className="flex gap-3">
              <div className={`p-2 rounded-lg h-fit ${getIconStyle(activity.type)}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-300">{activity.message}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <span>{activity.user}</span>
                  <span>•</span>
                  <span>{formatTime(activity.timestamp)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
