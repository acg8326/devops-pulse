import { useState, useMemo } from "react";
import { SearchInput } from "../components/common";
import { PipelineCard, EnvironmentFilter } from "../components/dashboard";

export default function Pipelines({ pipelines }) {
  const [selectedEnv, setSelectedEnv] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPipelines = useMemo(() => {
    return pipelines.filter((pipeline) => {
      const matchesEnv = selectedEnv === "all" || pipeline.environment === selectedEnv;
      const matchesStatus = statusFilter === "all" || pipeline.status === statusFilter;
      const matchesSearch = pipeline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pipeline.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pipeline.triggeredBy.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesEnv && matchesSearch && matchesStatus;
    });
  }, [pipelines, selectedEnv, searchQuery, statusFilter]);

  const statusCounts = useMemo(() => {
    return {
      all: pipelines.length,
      success: pipelines.filter(p => p.status === "success").length,
      running: pipelines.filter(p => p.status === "running").length,
      failed: pipelines.filter(p => p.status === "failed").length,
      pending: pipelines.filter(p => p.status === "pending").length
    };
  }, [pipelines]);

  const getStatusButtonClass = (status) => {
    const base = "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors";
    if (statusFilter === status) {
      const colors = {
        all: "bg-slate-600 text-white",
        success: "bg-emerald-600 text-white",
        running: "bg-blue-600 text-white",
        failed: "bg-red-600 text-white",
        pending: "bg-slate-600 text-white"
      };
      return `${base} ${colors[status]}`;
    }
    return `${base} bg-slate-700 text-slate-300 hover:bg-slate-600`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Pipelines</h2>
          <p className="text-slate-400">Monitor and manage CI/CD pipelines</p>
        </div>
        <div className="w-full sm:w-64">
          <SearchInput 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search pipelines..."
          />
        </div>
      </div>

      <EnvironmentFilter selected={selectedEnv} onChange={setSelectedEnv} />

      <div className="flex flex-wrap gap-2">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={getStatusButtonClass(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredPipelines.map((pipeline) => (
          <PipelineCard key={pipeline.id} pipeline={pipeline} />
        ))}
      </div>

      {filteredPipelines.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No pipelines found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
