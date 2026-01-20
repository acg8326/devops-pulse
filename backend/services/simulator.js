const { pipelines, servers } = require("../data/mockData");

const statuses = ["success", "running", "failed", "pending"];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function simulatePipelineUpdate() {
  const pipeline = getRandomElement(pipelines);
  const newStatus = getRandomElement(statuses);
  
  pipeline.status = newStatus;
  pipeline.triggeredAt = new Date().toISOString();
  
  if (newStatus === "success") {
    pipeline.duration = getRandomInt(120, 300);
    pipeline.stages.forEach(stage => {
      stage.status = "success";
      stage.duration = getRandomInt(30, 120);
    });
  } else if (newStatus === "running") {
    pipeline.duration = null;
    const runningIndex = getRandomInt(0, pipeline.stages.length - 1);
    pipeline.stages.forEach((stage, index) => {
      if (index < runningIndex) {
        stage.status = "success";
        stage.duration = getRandomInt(30, 120);
      } else if (index === runningIndex) {
        stage.status = "running";
        stage.duration = null;
      } else {
        stage.status = "pending";
        stage.duration = null;
      }
    });
  } else if (newStatus === "failed") {
    const failedIndex = getRandomInt(0, pipeline.stages.length - 1);
    pipeline.duration = getRandomInt(60, 180);
    pipeline.stages.forEach((stage, index) => {
      if (index < failedIndex) {
        stage.status = "success";
        stage.duration = getRandomInt(30, 120);
      } else if (index === failedIndex) {
        stage.status = "failed";
        stage.duration = getRandomInt(30, 90);
      } else {
        stage.status = "skipped";
        stage.duration = null;
      }
    });
  }
  
  return pipeline;
}

function simulateServerUpdate() {
  const server = getRandomElement(servers);
  
  server.cpu = Math.min(100, Math.max(5, server.cpu + getRandomInt(-15, 15)));
  server.memory = Math.min(100, Math.max(10, server.memory + getRandomInt(-10, 10)));
  
  if (server.cpu > 90 || server.memory > 90) {
    server.status = "critical";
  } else if (server.cpu > 70 || server.memory > 70) {
    server.status = "warning";
  } else {
    server.status = "healthy";
  }
  
  return server;
}

function generatePipelineActivity(pipeline) {
  let message;
  
  if (pipeline.status === "success") {
    message = `${pipeline.name} pipeline completed successfully`;
  } else if (pipeline.status === "running") {
    message = `${pipeline.name} pipeline started on ${pipeline.branch}`;
  } else if (pipeline.status === "failed") {
    const failedStage = pipeline.stages.find(s => s.status === "failed");
    const stageName = failedStage ? failedStage.name : "unknown";
    message = `${pipeline.name} pipeline failed at ${stageName} stage`;
  } else {
    message = `${pipeline.name} pipeline status changed to ${pipeline.status}`;
  }
  
  return {
    id: Date.now(),
    type: pipeline.status === "success" ? "deployment" : "pipeline",
    message,
    user: pipeline.triggeredBy,
    timestamp: new Date().toISOString()
  };
}

function generateServerActivity(server) {
  let message;
  
  if (server.status === "critical") {
    message = `${server.name} CPU usage exceeded 90%`;
  } else if (server.status === "warning") {
    message = `${server.name} memory usage is high (${server.memory}%)`;
  } else {
    message = `${server.name} recovered to healthy status`;
  }
  
  return {
    id: Date.now(),
    type: "alert",
    message,
    user: "system",
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  simulatePipelineUpdate,
  simulateServerUpdate,
  generatePipelineActivity,
  generateServerActivity
};
