import { Rocket, Clock, User } from "lucide-react";
import { Card, StatusBadge } from "../common";

export default function DeploymentHistory({ deployments }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <Card>
      <h2 className="text-lg font-semibold text-white mb-4">Recent Deployments</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-slate-400 border-b border-slate-700">
              <th className="pb-3 font-medium">Project</th>
              <th className="pb-3 font-medium">Version</th>
              <th className="pb-3 font-medium">Environment</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Deployed By</th>
              <th className="pb-3 font-medium">Time</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {deployments.map((deploy) => (
              <tr key={deploy.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-slate-400" />
                    <span className="text-white font-medium">{deploy.project}</span>
                  </div>
                </td>
                <td className="py-3">
                  <span className="text-slate-300 font-mono text-xs">{deploy.version}</span>
                </td>
                <td className="py-3">
                  <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">
                    {deploy.environment}
                  </span>
                </td>
                <td className="py-3">
                  <StatusBadge status={deploy.status} />
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1 text-slate-400">
                    <User className="w-3 h-3" />
                    <span>{deploy.deployedBy}</span>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(deploy.deployedAt)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
