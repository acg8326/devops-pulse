import { useState, useEffect, useCallback, useRef } from "react";
import api from "../services/api";
import socketService from "../services/socket";
import { useToast } from "../contexts";

export function useRealtimeData() {
  const [pipelines, setPipelines] = useState([]);
  const [servers, setServers] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toastRef = useRef(null);

  // Store toast in ref to avoid dependency issues
  const toast = useToast();
  toastRef.current = toast;

  // Fetch initial data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [pipelinesData, serversData, deploymentsData, statsData, activityData] = 
        await Promise.all([
          api.getPipelines(),
          api.getServers(),
          api.getDeployments(),
          api.getStats(),
          api.getActivity()
        ]);
      
      setPipelines(pipelinesData);
      setServers(serversData);
      setDeployments(deploymentsData);
      setStats(statsData);
      setActivities(activityData);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Setup real-time updates
  useEffect(() => {
    fetchData();
    
    // Connect to socket
    socketService.connect();
    
    // Listen for pipeline updates
    socketService.on("pipeline:update", (updatedPipeline) => {
      setPipelines((prev) => 
        prev.map((p) => (p.id === updatedPipeline.id ? updatedPipeline : p))
      );

      // Show toast based on status
      if (toastRef.current) {
        if (updatedPipeline.status === "success") {
          toastRef.current.success(`${updatedPipeline.name} pipeline completed successfully`);
        } else if (updatedPipeline.status === "failed") {
          toastRef.current.error(`${updatedPipeline.name} pipeline failed`);
        }
      }
    });
    
    // Listen for server updates
    socketService.on("server:update", (updatedServer) => {
      setServers((prev) => 
        prev.map((s) => (s.id === updatedServer.id ? updatedServer : s))
      );

      // Show toast for critical servers
      if (toastRef.current && updatedServer.status === "critical") {
        toastRef.current.warning(`${updatedServer.name} is in critical state`);
      }
    });
    
    // Listen for new activities
    socketService.on("activity:new", (newActivity) => {
      setActivities((prev) => [newActivity, ...prev].slice(0, 10));
    });
    
    // Cleanup
    return () => {
      socketService.off("pipeline:update");
      socketService.off("server:update");
      socketService.off("activity:new");
    };
  }, [fetchData]);

  return {
    pipelines,
    servers,
    deployments,
    stats,
    activities,
    loading,
    error,
    refetch: fetchData
  };
}

export default useRealtimeData;
