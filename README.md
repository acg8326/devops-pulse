# DevOps Pulse 🚀

A real-time DevOps monitoring dashboard with live CI/CD pipeline tracking, server health metrics, and deployment history.

![Dashboard Screenshot](https://via.placeholder.com/800x450?text=DevOps+Pulse+Dashboard)

## Features

- **📊 Real-time Dashboard** - Live updates via WebSocket connections
- **🔄 Pipeline Monitoring** - Track CI/CD pipeline status across environments
- **💻 Server Health** - Monitor CPU, memory, and disk usage
- **📦 Deployment History** - View recent deployments with status tracking
- **📈 Analytics Charts** - Visualize pipeline activity and deployment trends
- **🌓 Dark/Light Mode** - Toggle between themes with persistence
- **🔍 Search & Filter** - Filter by environment, status, and search terms
- **📱 Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Socket.io Client** - Real-time updates
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Socket.io** - WebSocket server
- **CORS** - Cross-origin support

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/acg8326/devops-pulse.git
   cd devops-pulse
```

2. **Install backend dependencies**
```bash
   cd backend
   npm install
```

3. **Install frontend dependencies**
```bash
   cd ../frontend
   npm install
```

### Running Locally

1. **Start the backend server**
```bash
   cd backend
   npm run dev
```
   Backend runs on `http://localhost:3001`

2. **Start the frontend dev server**
```bash
   cd frontend
   npm run dev
```
   Frontend runs on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## Project Structure
```
devops-pulse/
├── backend/
│   ├── config/
│   │   └── index.js
│   ├── data/
│   │   └── mockData.js
│   ├── routes/
│   │   ├── activity.js
│   │   ├── deployments.js
│   │   ├── index.js
│   │   ├── pipelines.js
│   │   ├── servers.js
│   │   └── stats.js
│   ├── services/
│   │   └── simulator.js
│   ├── socket/
│   │   └── index.js
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── dashboard/
│   │   │   └── layout/
│   │   ├── contexts/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pipelines` | Get all pipelines |
| GET | `/api/pipelines/:id` | Get single pipeline |
| GET | `/api/servers` | Get all servers |
| GET | `/api/servers/:id` | Get single server |
| GET | `/api/deployments` | Get all deployments |
| GET | `/api/stats` | Get dashboard stats |
| GET | `/api/activity` | Get activity feed |
| GET | `/health` | Health check endpoint |

### Query Parameters

- `environment` - Filter by environment (production, staging, development)
- `status` - Filter by status
- `search` - Search by name/branch/user

## WebSocket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `connected` | Server → Client | Connection confirmation |
| `pipeline:update` | Server → Client | Pipeline status changed |
| `server:update` | Server → Client | Server metrics updated |
| `activity:new` | Server → Client | New activity event |

## Environment Variables

### Backend
```env
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### Frontend
```env
VITE_API_URL=http://localhost:3001/api
VITE_SOCKET_URL=http://localhost:3001
```

## Deployment

### Railway (Recommended)

1. Push your code to GitHub
2. Connect Railway to your GitHub repo
3. Deploy backend and frontend as separate services
4. Set environment variables in Railway dashboard

### Manual Deployment

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the dist folder with any static server
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

**AJ Garcia** - DevOps Engineer

---

Built with ❤️ for the DevOps community
