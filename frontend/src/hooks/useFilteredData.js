import { useMemo } from "react";

/**
 * Custom hook to filter data based on environment and search query
 */
export function useFilteredData(data, { environment = "all", searchQuery = "", searchFields = [] }) {
  return useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    
    return data.filter((item) => {
      // Environment filter
      const matchesEnv = environment === "all" || item.environment === environment;
      
      // Search filter
      let matchesSearch = true;
      if (searchQuery && searchFields.length > 0) {
        const query = searchQuery.toLowerCase();
        matchesSearch = searchFields.some((field) => {
          const value = item[field];
          return value && value.toString().toLowerCase().includes(query);
        });
      }
      
      return matchesEnv && matchesSearch;
    });
  }, [data, environment, searchQuery, searchFields]);
}

/**
 * Custom hook to calculate stats from filtered data
 */
export function useCalculatedStats(pipelines, servers, deployments, environment = "all") {
  return useMemo(() => {
    const envPipelines = environment === "all" 
      ? pipelines 
      : pipelines.filter(p => p.environment === environment);
    
    const envServers = environment === "all"
      ? servers
      : servers.filter(s => s.environment === environment);
    
    const envDeployments = environment === "all"
      ? deployments
      : deployments.filter(d => d.environment === environment);
    
    const successCount = envPipelines.filter(p => p.status === "success").length;
    const successRate = envPipelines.length > 0 
      ? ((successCount / envPipelines.length) * 100)
      : 0;
    
    return {
      totalPipelines: envPipelines.length,
      successRate: parseFloat(successRate.toFixed(1)),
      healthyServers: envServers.filter(s => s.status === "healthy").length,
      warningServers: envServers.filter(s => s.status === "warning").length,
      criticalServers: envServers.filter(s => s.status === "critical").length,
      totalServers: envServers.length,
      deploymentsToday: envDeployments.length,
      failedPipelines: envPipelines.filter(p => p.status === "failed").length,
      runningPipelines: envPipelines.filter(p => p.status === "running").length
    };
  }, [pipelines, servers, deployments, environment]);
}

export default useFilteredData;
