import { GitBranch, Clock, User } from "lucide-react";
import { Card, StatusBadge } from "../common";

export default function PipelineCard({ pipeline }) {
  const formatDuration = (seconds) => {
    if (!seconds) return "Running...";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  const getStageColor = (status) => {
    const colors = {
      success: "bg-emerald-500",
      running: "bg-blue-500 animate-pulse",
      pending: "bg-slate-600",
      failed: "bg-red-500",
      skipped: "bg-slate-600"
    };
    return colors[status] || colors.pending;
  };

  return (
    <Card className="hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-white">{pipeline.name}</h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
            <GitBranch className="w-4 h-4" />
            <span>{pipeline.branch}</span>
          </div>
        </div>
        <StatusBadge status={pipeline.status} />
      </div>

      <div className="flex items-center gap-1 mb-3">
        {pipeline.stages.map((stage, index) => (
          <div key={stage.name} className="flex items-center">
            <div 
              className={`w-8 h-2 rounded ${getStageColor(stage.status)}`}
              title={`${stage.name}: ${stage.status}`}
            />
            {index < pipeline.stages.length - 1 && (
              <div className="w-2 h-0.5 bg-slate-700" />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <User className="w-3 h-3" />
          <span>{pipeline.triggeredBy}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 bg-slate-700 rounded text-slate-300">
            {pipeline.environment}
          </span>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{formatDuration(pipeline.duration)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
