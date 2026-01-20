import { NavLink } from "react-router-dom";
import { LayoutDashboard, GitBranch, Server, Rocket, Clock, AlertTriangle } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: GitBranch, label: "Pipelines", path: "/pipelines" },
  { icon: Server, label: "Servers", path: "/servers" },
  { icon: Rocket, label: "Deployments", path: "/deployments" },
  { icon: Clock, label: "History", path: "/history" },
  { icon: AlertTriangle, label: "Alerts", path: "/alerts" },
];

export default function Sidebar() {
  const getNavClass = ({ isActive }) => {
    const base = "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors";
    if (isActive) {
      return `${base} bg-emerald-600 text-white`;
    }
    return `${base} text-slate-400 hover:bg-slate-700 hover:text-white`;
  };

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <NavLink to={item.path} className={getNavClass}>
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 mt-4 mx-4 bg-slate-700/50 rounded-lg">
        <p className="text-xs text-slate-400 mb-1">System Status</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-sm text-emerald-400">All systems operational</span>
        </div>
      </div>
    </aside>
  );
}
