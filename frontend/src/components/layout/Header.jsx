import { Activity, Bell, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="w-8 h-8 text-emerald-500" />
          <div>
            <h1 className="text-xl font-bold text-white">DevOps Pulse</h1>
            <p className="text-xs text-slate-400">Real-time Infrastructure Monitoring</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 text-slate-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 pl-4 border-l border-slate-700">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">AJ</span>
            </div>
            <span className="text-sm text-slate-300">aj.garcia</span>
          </div>
        </div>
      </div>
    </header>
  );
}
