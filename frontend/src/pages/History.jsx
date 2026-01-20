import { useState, useMemo } from "react";
import { GitBranch, Clock, User, CheckCircle, XCircle, Calendar } from "lucide-react";
import { SearchInput, Card, StatusBadge } from "../components/common";
import { EnvironmentFilter } from "../components/dashboard";
import { pipelineHistoryLog } from "../data/mockData";

export default function History() {
  const [selectedEnv, setSelectedEnv] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  const filteredHistory = useMemo(() => {
    return pipelineHistoryLog.filter((item) => {
      const matchesEnv = selectedEnv === "all" || item.environment === selectedEnv;
      const matchesSearch = item.pipelineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.triggeredBy.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesDate = true;
      if (dateFilter !== "all") {
        const itemDate = new Date(item.startedAt);
        const now = new Date();
        const diffHours = (now - itemDate) / (1000 * 60 * 60);
        
        if (dateFilter === "today") matchesDate = diffHours <= 24;
        else if (dateFilter === "week") matchesDate = diffHours <= 168;
        else if (dateFilter === "month") matchesDate = diffHours <= 720;
      }
      
      return matchesEnv && matchesSearch && matchesDate;
    });
  }, [selectedEnv, searchQuery, dateFilter]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const stats = useMemo(() => {
    const total = filteredHistory.length;
    const success = filteredHistory.filter(h => h.status === "success").length;
    const failed = filteredHistory.filter(h => h.status === "failed").length;
    const avgDuration = total > 0 
      ? Math.round(filteredHistory.reduce((acc, h) => acc + h.duration, 0) / total)
      : 0;
    
    return { total, success, failed, avgDuration };
  }, [filteredHistory]);

  const getDateButtonClass = (value) => {
    const base = "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors";
    if (dateFilter === value) {
      return `${base} bg-emerald-600 text-white`;
    }
    return `${base} bg-slate-700 text-slate-300 hover:bg-slate-600`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Pipeline History</h2>
          <p className="text-slate-400">View past pipeline executions and results</p>
        </div>
        <div className="w-full sm:w-64">
          <SearchInput 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search history..."
          />
        </div>
      </div>

      <EnvironmentFilter selected={selectedEnv} onChange={setSelectedEnv} />

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setDateFilter("all")} className={getDateButtonClass("all")}>
          All Time
        </button>
        <button onClick={() => setDateFilter("today")} className={getDateButtonClass("today")}>
          Today
        </button>
        <button onClick={() => setDateFilter("week")} className={getDateButtonClass("week")}>
          This Week
        </button>
        <button onClick={() => setDateFilter("month")} className={getDateButtonClass("month")}>
          This Month
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-slate-400">Total Runs</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-400">Successful</p>
          <p className="text-2xl font-bold text-emerald-400">{stats.success}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-400">Failed</p>
          <p className="text-2xl font-bold text-red-400">{stats.failed}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-400">Avg Duration</p>
          <p className="text-2xl font-bold text-white">{formatDuration(stats.avgDuration)}</p>
        </Card>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-slate-400 border-b border-slate-700">
                <th className="pb-3 font-medium">Pipeline</th>
                <th className="pb-3 font-medium">Branch</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Environment</th>
                <th className="pb-3 font-medium">Triggered By</th>
                <th className="pb-3 font-medium">Started</th>
                <th className="pb-3 font-medium">Duration</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="py-3">
                    <span className="text-white font-medium">{item.pipelineName}</span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-1 text-slate-300">
                      <GitBranch className="w-4 h-4" />
                      <span>{item.branch}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">
                      {item.environment}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-1 text-slate-400">
                      <User className="w-3 h-3" />
                      <span>{item.triggeredBy}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(item.startedAt)}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{formatDuration(item.duration)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No history found matching your filters.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
