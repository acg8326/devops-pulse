import { useState, useMemo } from "react";
import { SearchInput } from "../components/common";
import { ServerHealthCard, EnvironmentFilter } from "../components/dashboard";

export default function Servers({ servers }) {
  const [selectedEnv, setSelectedEnv] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredServers = useMemo(() => {
    return servers.filter((server) => {
      const matchesEnv = selectedEnv === "all" || server.environment === selectedEnv;
      const matchesStatus = statusFilter === "all" || server.status === statusFilter;
      const matchesSearch = server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           server.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           server.provider.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesEnv && matchesSearch && matchesStatus;
    });
  }, [servers, selectedEnv, searchQuery, statusFilter]);

  const statusCounts = useMemo(() => {
    return {
      all: servers.length,
      healthy: servers.filter(s => s.status === "healthy").length,
      warning: servers.filter(s => s.status === "warning").length,
      critical: servers.filter(s => s.status === "critical").length
    };
  }, [servers]);

  const getStatusButtonClass = (status) => {
    const base = "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors";
    if (statusFilter === status) {
      const colors = {
        all: "bg-slate-600 text-white",
        healthy: "bg-emerald-600 text-white",
        warning: "bg-amber-600 text-white",
        critical: "bg-red-600 text-white"
      };
      return `${base} ${colors[status]}`;
    }
    return `${base} bg-slate-700 text-slate-300 hover:bg-slate-600`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Servers</h2>
          <p className="text-slate-400">Monitor server health and resources</p>
        </div>
        <div className="w-full sm:w-64">
          <SearchInput 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search servers..."
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredServers.map((server) => (
          <ServerHealthCard key={server.id} server={server} />
        ))}
      </div>

      {filteredServers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No servers found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
