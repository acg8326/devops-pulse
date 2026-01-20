const express = require("express");
const router = express.Router();

const pipelinesRouter = require("./pipelines");
const serversRouter = require("./servers");
const deploymentsRouter = require("./deployments");
const statsRouter = require("./stats");
const activityRouter = require("./activity");

router.use("/pipelines", pipelinesRouter);
router.use("/servers", serversRouter);
router.use("/deployments", deploymentsRouter);
router.use("/stats", statsRouter);
router.use("/activity", activityRouter);

module.exports = router;
