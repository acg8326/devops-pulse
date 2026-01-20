import { Activity } from "lucide-react";
import { ThemeToggle, NotificationsDropdown, SettingsModal, UserMenu } from "../common";

export default function Header() {
  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="w-8 h-8 text-emerald-500" />
          <div>
            <h1 className="text-xl font-bold text-white">DevOps Pulse</h1>
            <p className="text-xs text-slate-400">Real-time Infrastructure Monitoring</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NotificationsDropdown />
          <SettingsModal />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
