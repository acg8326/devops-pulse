import { useState } from "react";
import { GitBranch, Clock, User, ChevronDown, ChevronUp, Terminal, ExternalLink } from "lucide-react";
import { Card, StatusBadge } from "../common";

export default function PipelineCard({ pipeline }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDuration = (seconds) => {
    if (!seconds) return "Running...";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
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

  const getStageTextColor = (status) => {
    const colors = {
      success: "text-emerald-400",
      running: "text-blue-400",
      pending: "text-slate-400",
      failed: "text-red-400",
      skipped: "text-slate-500"
    };
    return colors[status] || colors.pending;
  };

  return (
    <Card className="hover:border-slate-600 transition-all">
      <div 
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-white">{pipeline.name}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">
              <GitBranch className="w-4 h-4" />
              <span>{pipeline.branch}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={pipeline.status} />
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
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
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-700">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-2">Pipeline Stages</h4>
              <div className="space-y-2">
                {pipeline.stages.map((stage) => (
                  <div 
                    key={stage.name}
                    className="flex items-center justify-between p-2 bg-slate-700/50 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-white capitalize">{stage.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm ${getStageTextColor(stage.status)}`}>
                        {stage.status}
                      </span>
                      {stage.duration && (
                        <span className="text-xs text-slate-400">
                          {formatDuration(stage.duration)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Triggered</p>
                <p className="text-white">{formatTime(pipeline.triggeredAt)}</p>
              </div>
              <div>
                <p className="text-slate-400">Total Duration</p>
                <p className="text-white">{formatDuration(pipeline.duration)}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-sm text-slate-300 transition-colors">
                <Terminal className="w-4 h-4" />
                View Logs
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-sm text-slate-300 transition-colors">
                <ExternalLink className="w-4 h-4" />
                Open in GitLab
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
