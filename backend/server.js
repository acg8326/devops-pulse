const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const config = require("./config");
const routes = require("./routes");
const setupSocket = require("./socket");

const app = express();
const server = http.createServer(app);

// Setup Socket.io
const io = new Server(server, {
  cors: config.cors
});

// Middleware
app.use(cors(config.cors));
app.use(express.json());

// API Routes
app.use("/api", routes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Setup Socket.io handlers
setupSocket(io);

// Start server
server.listen(config.port, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║     DevOps Pulse Backend Server        ║
  ╠════════════════════════════════════════╣
  ║  REST API: http://localhost:${config.port}/api  ║
  ║  Health:   http://localhost:${config.port}/health ║
  ║  Socket:   ws://localhost:${config.port}        ║
  ╚════════════════════════════════════════╝
  `);
});
