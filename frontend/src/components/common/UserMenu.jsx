import { useState, useRef, useEffect } from "react";
import { User, LogOut, Settings, HelpCircle, Moon, Sun } from "lucide-react";
import { useTheme } from "../../contexts";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { icon: User, label: "Profile", action: () => console.log("Profile clicked") },
    { icon: Settings, label: "Settings", action: () => console.log("Settings clicked") },
    { icon: HelpCircle, label: "Help & Support", action: () => console.log("Help clicked") },
    { 
      icon: theme === "dark" ? Sun : Moon, 
      label: theme === "dark" ? "Light Mode" : "Dark Mode", 
      action: toggleTheme 
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-4 border-l border-slate-700 hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-white">AJ</span>
        </div>
        <span className="text-sm text-slate-300">aj.gordo</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-lg font-medium text-white">AJ</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Aj Gordo</p>
                <p className="text-xs text-slate-400">DevOps Engineer</p>
              </div>
            </div>
          </div>

          <div className="p-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    item.action();
                    if (item.label !== "Light Mode" && item.label !== "Dark Mode") {
                      setIsOpen(false);
                    }
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="p-2 border-t border-slate-700">
            <button
              onClick={() => console.log("Logout clicked")}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
