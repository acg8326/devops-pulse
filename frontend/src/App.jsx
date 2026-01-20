import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts";
import { Layout } from "./components/layout";
import { DashboardSkeleton } from "./components/dashboard";
import { Dashboard, Pipelines, Servers, Deployments } from "./pages";
import { useRealtimeData } from "./hooks";

function AppContent() {
  const { 
    pipelines, 
    servers, 
    deployments, 
    stats, 
    activities, 
    loading, 
    error 
  } = useRealtimeData();

  if (loading) {
    return (
      <Layout>
        <DashboardSkeleton />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-500 text-2xl">!</span>
            </div>
            <p className="text-red-400 mb-2">Failed to load dashboard</p>
            <p className="text-slate-500 text-sm">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route 
          path="/" 
          element={
            <Dashboard 
              pipelines={pipelines}
              servers={servers}
              deployments={deployments}
              stats={stats}
              activities={activities}
            />
          } 
        />
        <Route 
          path="/pipelines" 
          element={<Pipelines pipelines={pipelines} />} 
        />
        <Route 
          path="/servers" 
          element={<Servers servers={servers} />} 
        />
        <Route 
          path="/deployments" 
          element={<Deployments deployments={deployments} />} 
        />
        <Route 
          path="/history" 
          element={
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-white mb-2">History</h2>
              <p className="text-slate-400">Coming soon...</p>
            </div>
          } 
        />
        <Route 
          path="/alerts" 
          element={
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-white mb-2">Alerts</h2>
              <p className="text-slate-400">Coming soon...</p>
            </div>
          } 
        />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
