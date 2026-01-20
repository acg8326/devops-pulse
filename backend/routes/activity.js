const express = require("express");
const router = express.Router();
const { activityFeed } = require("../data/mockData");

// GET activity feed
router.get("/", (req, res) => {
  const { limit = 10, type } = req.query;
  
  let filtered = [...activityFeed];
  
  if (type) {
    filtered = filtered.filter(a => a.type === type);
  }
  
  res.json(filtered.slice(0, parseInt(limit)));
});

module.exports = router;
