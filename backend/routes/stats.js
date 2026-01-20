const express = require("express");
const router = express.Router();
const { stats, pipelines, servers, deployments } = require("../data/mockData");

// GET overall stats
router.get("/", (req, res) => {
  const { environment } = req.query;
  
  if (!environment || environment === "all") {
    return res.json(stats);
  }
  
  // Calculate filtered stats
  const envPipelines = pipelines.filter(p => p.environment === environment);
  const envServers = servers.filter(s => s.environment === environment);
  const envDeployments = deployments.filter(d => d.environment === environment);
  
  const successCount = envPipelines.filter(p => p.status === "success").length;
  const successRate = envPipelines.length > 0 
    ? ((successCount / envPipelines.length) * 100).toFixed(1)
    : 0;
  
  res.json({
    totalPipelines: envPipelines.length,
    successRate: parseFloat(successRate),
    healthyServers: envServers.filter(s => s.status === "healthy").length,
    totalServers: envServers.length,
    deploymentsToday: envDeployments.length
  });
});

module.exports = router;
