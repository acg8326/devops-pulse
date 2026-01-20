# DevOps Pulse

A real-time DevOps monitoring dashboard with live CI/CD pipeline tracking, server health metrics, and deployment history. Built with React, Node.js, and Socket.io.

## Features

- Real-time Updates - Live data via WebSocket
- Interactive Charts - Pipeline, deployment, and server metrics
- Dark/Light Mode - Toggle between themes
- Notifications - Toast alerts for critical events
- Search and Filter - Find what you need quickly

## Tech Stack

### Frontend
- React 18 - UI Framework
- Vite - Build Tool
- Tailwind CSS - Styling
- React Router - Navigation
- Recharts - Data Visualization
- Socket.io Client - Real-time Communication
- Lucide React - Icons

### Backend
- Node.js - Runtime
- Express - Web Framework
- Socket.io - WebSocket Server
- CORS - Cross-Origin Support

## Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository
   git clone https://github.com/acg8326/devops-pulse.git
   cd devops-pulse

2. Install backend dependencies
   cd backend
   npm install

3. Install frontend dependencies
   cd ../frontend
   npm install

### Running Locally

1. Start the backend (Terminal 1)
   cd backend
   npm run dev

2. Start the frontend (Terminal 2)
   cd frontend
   npm run dev

3. Open browser at http://localhost:5173

## API Endpoints

GET /api/pipelines - Get all pipelines
GET /api/servers - Get all servers
GET /api/deployments - Get all deployments
GET /api/stats - Get dashboard statistics
GET /api/activity - Get activity feed
GET /health - Health check

## WebSocket Events

pipeline:update - Pipeline status changed
server:update - Server metrics updated
activity:new - New activity event

## License

MIT License - see LICENSE file for details

## Author

AJ Gordo - DevOps Engineer
