import { Layout } from "./components/layout";
import { 
  StatsOverview, 
  PipelineList, 
  ServerHealthList, 
  ActivityFeed,
  DeploymentHistory
} from "./components/dashboard";
import { 
  stats, 
  pipelines, 
  servers, 
  activityFeed,
  deployments
} from "./data/mockData";

function App() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Dashboard</h2>
          <p className="text-slate-400">Welcome back, AJ. Here's what's happening.</p>
        </div>

        <StatsOverview stats={stats} />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 space-y-6">
            <PipelineList pipelines={pipelines} />
            <DeploymentHistory deployments={deployments} />
            <ServerHealthList servers={servers} />
          </div>
          <div className="xl:col-span-1">
            <div className="sticky top-6">
              <ActivityFeed activities={activityFeed} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
