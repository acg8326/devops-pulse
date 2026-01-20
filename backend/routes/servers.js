const express = require("express");
const router = express.Router();
const { servers } = require("../data/mockData");

// GET all servers
router.get("/", (req, res) => {
  const { environment, status } = req.query;
  
  let filtered = [...servers];
  
  if (environment && environment !== "all") {
    filtered = filtered.filter(s => s.environment === environment);
  }
  
  if (status) {
    filtered = filtered.filter(s => s.status === status);
  }
  
  res.json(filtered);
});

// GET single server
router.get("/:id", (req, res) => {
  const server = servers.find(s => s.id === parseInt(req.params.id));
  
  if (!server) {
    return res.status(404).json({ error: "Server not found" });
  }
  
  res.json(server);
});

module.exports = router;
