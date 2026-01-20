const { 
  simulatePipelineUpdate, 
  simulateServerUpdate, 
  generatePipelineActivity, 
  generateServerActivity 
} = require("../services/simulator");

function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
    
    socket.emit("connected", { message: "Connected to DevOps Pulse server" });
    
    socket.on("subscribe", (channel) => {
      console.log(`Client ${socket.id} subscribed to ${channel}`);
      socket.join(channel);
    });
    
    socket.on("unsubscribe", (channel) => {
      console.log(`Client ${socket.id} unsubscribed from ${channel}`);
      socket.leave(channel);
    });
    
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
  
  setInterval(() => {
    const pipeline = simulatePipelineUpdate();
    const activity = generatePipelineActivity(pipeline);
    
    io.emit("pipeline:update", pipeline);
    io.emit("activity:new", activity);
    
    console.log(`Pipeline update: ${pipeline.name} -> ${pipeline.status}`);
  }, 8000);
  
  setInterval(() => {
    const server = simulateServerUpdate();
    
    io.emit("server:update", server);
    
    if (server.status === "critical" || server.status === "warning") {
      const activity = generateServerActivity(server);
      io.emit("activity:new", activity);
    }
    
    console.log(`Server update: ${server.name} -> CPU: ${server.cpu}%, Memory: ${server.memory}%`);
  }, 5000);
}

module.exports = setupSocket;
