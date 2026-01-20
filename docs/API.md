# API Documentation

Base URL: http://localhost:3001/api

## Endpoints

### Pipelines
GET /api/pipelines - Get all pipelines
GET /api/pipelines/:id - Get pipeline by ID

Query Parameters:
- environment: Filter by environment
- status: Filter by status
- search: Search by name, branch, or user

### Servers
GET /api/servers - Get all servers
GET /api/servers/:id - Get server by ID

### Deployments
GET /api/deployments - Get all deployments

### Stats
GET /api/stats - Get dashboard statistics

### Activity
GET /api/activity - Get activity feed

### Health
GET /health - Server health check

## WebSocket Events

### Server to Client
- connected: Connection confirmed
- pipeline:update: Pipeline status changed
- server:update: Server metrics updated
- activity:new: New activity event

### Client to Server
- subscribe: Subscribe to channel
- unsubscribe: Unsubscribe from channel
