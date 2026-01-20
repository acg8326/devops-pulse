import { Activity, Bell, Settings } from "lucide-react";
import { ThemeToggle } from "../common";

export default function Header() {
  return (
    <header className="bg-slate-800 dark:bg-slate-800 light:bg-white border-b border-slate-700 dark:border-slate-700 light:border-slate-200 px-6 py-4 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="w-8 h-8 text-emerald-500" />
          <div>
            <h1 className="text-xl font-bold text-white dark:text-white light:text-slate-800">DevOps Pulse</h1>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">Real-time Infrastructure Monitoring</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="relative p-2 text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-800 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-800 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 pl-4 border-l border-slate-700 dark:border-slate-700 light:border-slate-200">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">AJ</span>
            </div>
            <span className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-700">aj.garcia</span>
          </div>
        </div>
      </div>
    </header>
  );
}
