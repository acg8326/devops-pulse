import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, GitBranch, Server, Rocket, Clock, AlertTriangle, Menu, X } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: GitBranch, label: "Pipelines", path: "/pipelines" },
  { icon: Server, label: "Servers", path: "/servers" },
  { icon: Rocket, label: "Deployments", path: "/deployments" },
  { icon: Clock, label: "History", path: "/history" },
  { icon: AlertTriangle, label: "Alerts", path: "/alerts" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const getNavClass = ({ isActive }) => {
    const base = "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors";
    if (isActive) {
      return `${base} bg-emerald-600 text-white`;
    }
    return `${base} text-slate-400 hover:bg-slate-700 hover:text-white`;
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed md:hidden top-20 left-4 z-40 p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-16 left-0 w-64 bg-slate-800 border-r border-slate-700 
        z-30 transition-transform duration-300 md:transition-none
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        overflow-y-auto
      `}>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <NavLink 
                    to={item.path} 
                    className={getNavClass}
                    onClick={handleNavClick}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
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
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse flex-shrink-0"></span>
            <span className="text-sm text-emerald-400 truncate">All systems operational</span>
          </div>
        </div>
      </aside>
    </>
  );
}
