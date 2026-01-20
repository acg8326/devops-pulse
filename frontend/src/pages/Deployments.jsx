import { useState, useMemo } from "react";
import { SearchInput } from "../components/common";
import { DeploymentHistory, EnvironmentFilter } from "../components/dashboard";

export default function Deployments({ deployments }) {
  const [selectedEnv, setSelectedEnv] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDeployments = useMemo(() => {
    return deployments.filter((deploy) => {
      const matchesEnv = selectedEnv === "all" || deploy.environment === selectedEnv;
      const matchesSearch = deploy.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           deploy.deployedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           deploy.version.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesEnv && matchesSearch;
    });
  }, [deployments, selectedEnv, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Deployments</h2>
          <p className="text-slate-400">Track deployment history across environments</p>
        </div>
        <div className="w-full sm:w-64">
          <SearchInput 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search deployments..."
          />
        </div>
      </div>

      <EnvironmentFilter selected={selectedEnv} onChange={setSelectedEnv} />

      <DeploymentHistory deployments={filteredDeployments} />

      {filteredDeployments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No deployments found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
