const express = require("express");
const router = express.Router();
const { pipelines } = require("../data/mockData");

// GET all pipelines
router.get("/", (req, res) => {
  const { environment, status, search } = req.query;
  
  let filtered = [...pipelines];
  
  if (environment && environment !== "all") {
    filtered = filtered.filter(p => p.environment === environment);
  }
  
  if (status) {
    filtered = filtered.filter(p => p.status === status);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.branch.toLowerCase().includes(searchLower) ||
      p.triggeredBy.toLowerCase().includes(searchLower)
    );
  }
  
  res.json(filtered);
});

// GET single pipeline
router.get("/:id", (req, res) => {
  const pipeline = pipelines.find(p => p.id === parseInt(req.params.id));
  
  if (!pipeline) {
    return res.status(404).json({ error: "Pipeline not found" });
  }
  
  res.json(pipeline);
});

module.exports = router;
