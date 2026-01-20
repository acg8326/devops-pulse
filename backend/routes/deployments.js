const express = require("express");
const router = express.Router();
const { deployments } = require("../data/mockData");

// GET all deployments
router.get("/", (req, res) => {
  const { environment, status } = req.query;
  
  let filtered = [...deployments];
  
  if (environment && environment !== "all") {
    filtered = filtered.filter(d => d.environment === environment);
  }
  
  if (status) {
    filtered = filtered.filter(d => d.status === status);
  }
  
  res.json(filtered);
});

// GET single deployment
router.get("/:id", (req, res) => {
  const deployment = deployments.find(d => d.id === parseInt(req.params.id));
  
  if (!deployment) {
    return res.status(404).json({ error: "Deployment not found" });
  }
  
  res.json(deployment);
});

module.exports = router;
