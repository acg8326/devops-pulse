import { useState, useMemo } from "react";
import { Layout } from "./components/layout";
import { 
  StatsOverview, 
  PipelineList, 
  ServerHealthList, 
  ActivityFeed,
  DeploymentHistory,
  EnvironmentFilter,
  PipelineChart,
  DeploymentChart
} from "./components/dashboard";
import { SearchInput } from "./components/common";
import { useRealtimeData } from "./hooks";
import { pipelineHistory, deploymentHistory } from "./data/mockData";

function App() {
  const [selectedEnv, setSelectedEnv] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { 
    pipelines, 
    servers, 
    deployments, 
    stats, 
    activities, 
    loading, 
    error 
  } = useRealtimeData();

  const filteredPipelines = useMemo(() => {
    return pipelines.filter((pipeline) => {
      const matchesEnv = selectedEnv === "all" || pipeline.environment === selectedEnv;
      const matchesSearch = pipeline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pipeline.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pipeline.triggeredBy.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesEnv && matchesSearch;
    });
  }, [pipelines, selectedEnv, searchQuery]);

  const filteredServers = useMemo(() => {
    return servers.filter((server) => {
      return selectedEnv === "all" || server.environment === selectedEnv;
    });
  }, [servers, selectedEnv]);

  const filteredDeployments = useMemo(() => {
    return deployments.filter((deploy) => {
      const matchesEnv = selectedEnv === "all" || deploy.environment === selectedEnv;
      const matchesSearch = deploy.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           deploy.deployedBy.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesEnv && matchesSearch;
    });
  }, [deployments, selectedEnv, searchQuery]);

  const filteredStats = useMemo(() => {
    if (!stats) return null;
    if (selectedEnv === "all") return stats;
    
    const envPipelines = pipelines.filter(p => p.environment === selectedEnv);
    const envServers = servers.filter(s => s.environment === selectedEnv);
    const envDeployments = deployments.filter(d => d.environment === selectedEnv);
    
    const successCount = envPipelines.filter(p => p.status === "success").length;
    const successRate = envPipelines.length > 0 
      ? ((successCount / envPipelines.length) * 100).toFixed(1)
      : 0;
    
    return {
      totalPipelines: envPipelines.length,
      successRate: parseFloat(successRate),
      healthyServers: envServers.filter(s => s.status === "healthy").length,
      totalServers: envServers.length,
      deploymentsToday: envDeployments.length
    };
  }, [stats, pipelines, servers, deployments, selectedEnv]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-500 text-2xl">!</span>
            </div>
            <p className="text-red-400 mb-2">Failed to load dashboard</p>
            <p className="text-slate-500 text-sm">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Dashboard</h2>
            <p className="text-slate-400">Welcome back, AJ. Here's what's happening.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-slate-400">Live</span>
            </div>
            <div className="w-full sm:w-64">
              <SearchInput 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search pipelines..."
              />
            </div>
          </div>
        </div>

        <EnvironmentFilter selected={selectedEnv} onChange={setSelectedEnv} />

        {filteredStats && <StatsOverview stats={filteredStats} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PipelineChart data={pipelineHistory} />
          <DeploymentChart data={deploymentHistory} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 space-y-6">
            <PipelineList pipelines={filteredPipelines} />
            <DeploymentHistory deployments={filteredDeployments} />
            <ServerHealthList servers={filteredServers} />
          </div>
          <div className="xl:col-span-1">
            <div className="sticky top-6">
              <ActivityFeed activities={activities} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
