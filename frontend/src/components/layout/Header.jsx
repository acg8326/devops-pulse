import { Activity } from "lucide-react";
import { ThemeToggle, NotificationsDropdown, SettingsModal, UserMenu } from "../common";

export default function Header() {
  return (
    <header className="bg-slate-800 border-b border-slate-700 px-4 md:px-6 py-3 md:py-4 transition-colors sticky top-0 z-20">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <Activity className="w-6 md:w-8 h-6 md:h-8 text-emerald-500 flex-shrink-0" />
          <div className="min-w-0">
            <h1 className="text-lg md:text-xl font-bold text-white truncate">DevOps Pulse</h1>
            <p className="text-xs text-slate-400 hidden sm:block">Real-time Infrastructure Monitoring</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
          <ThemeToggle />
          <NotificationsDropdown />
          <div className="hidden sm:flex items-center gap-2">
            <SettingsModal />
            <UserMenu />
          </div>
          {/* Mobile: Show only user menu, hide settings */}
          <div className="sm:hidden">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
