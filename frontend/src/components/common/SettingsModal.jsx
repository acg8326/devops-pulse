import { useState } from "react";
import { Settings, X, Moon, Sun, Bell, Monitor, Globe, Shield } from "lucide-react";
import { useTheme } from "../../contexts";

export default function SettingsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("appearance");
  const { theme, toggleTheme } = useTheme();
  
  const [settings, setSettings] = useState({
    notifications: {
      pipelineAlerts: true,
      serverAlerts: true,
      deploymentAlerts: true,
      emailNotifications: false
    },
    display: {
      compactMode: false,
      showAnimations: true,
      autoRefresh: true,
      refreshInterval: 30
    }
  });

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const tabs = [
    { id: "appearance", label: "Appearance", icon: Monitor },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "general", label: "General", icon: Globe }
  ];

  const Toggle = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-emerald-600" : "bg-slate-600"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-slate-400 hover:text-white transition-colors"
      >
        <Settings className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative bg-slate-800 border border-slate-700 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h2 className="text-lg font-semibold text-white">Settings</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex">
              <div className="w-48 border-r border-slate-700 p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === tab.id
                          ? "bg-emerald-600 text-white"
                          : "text-slate-400 hover:bg-slate-700 hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex-1 p-6 overflow-y-auto max-h-96">
                {activeTab === "appearance" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-white mb-4">Theme</h3>
                      <div className="flex gap-4">
                        <button
                          onClick={() => theme !== "dark" && toggleTheme()}
                          className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                            theme === "dark"
                              ? "border-emerald-500 bg-slate-700"
                              : "border-slate-600 hover:border-slate-500"
                          }`}
                        >
                          <Moon className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                          <p className="text-sm text-white">Dark</p>
                        </button>
                        <button
                          onClick={() => theme !== "light" && toggleTheme()}
                          className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                            theme === "light"
                              ? "border-emerald-500 bg-slate-700"
                              : "border-slate-600 hover:border-slate-500"
                          }`}
                        >
                          <Sun className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                          <p className="text-sm text-white">Light</p>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white">Compact Mode</p>
                          <p className="text-xs text-slate-400">Reduce spacing in UI</p>
                        </div>
                        <Toggle 
                          enabled={settings.display.compactMode}
                          onChange={(v) => updateSetting("display", "compactMode", v)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white">Show Animations</p>
                          <p className="text-xs text-slate-400">Enable UI animations</p>
                        </div>
                        <Toggle 
                          enabled={settings.display.showAnimations}
                          onChange={(v) => updateSetting("display", "showAnimations", v)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-white mb-4">Alert Preferences</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white">Pipeline Alerts</p>
                        <p className="text-xs text-slate-400">Get notified on pipeline events</p>
                      </div>
                      <Toggle 
                        enabled={settings.notifications.pipelineAlerts}
                        onChange={(v) => updateSetting("notifications", "pipelineAlerts", v)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white">Server Alerts</p>
                        <p className="text-xs text-slate-400">Get notified on server issues</p>
                      </div>
                      <Toggle 
                        enabled={settings.notifications.serverAlerts}
                        onChange={(v) => updateSetting("notifications", "serverAlerts", v)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white">Deployment Alerts</p>
                        <p className="text-xs text-slate-400">Get notified on deployments</p>
                      </div>
                      <Toggle 
                        enabled={settings.notifications.deploymentAlerts}
                        onChange={(v) => updateSetting("notifications", "deploymentAlerts", v)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white">Email Notifications</p>
                        <p className="text-xs text-slate-400">Receive alerts via email</p>
                      </div>
                      <Toggle 
                        enabled={settings.notifications.emailNotifications}
                        onChange={(v) => updateSetting("notifications", "emailNotifications", v)}
                      />
                    </div>
                  </div>
                )}

                {activeTab === "general" && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-white mb-4">Data Settings</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white">Auto Refresh</p>
                        <p className="text-xs text-slate-400">Automatically refresh data</p>
                      </div>
                      <Toggle 
                        enabled={settings.display.autoRefresh}
                        onChange={(v) => updateSetting("display", "autoRefresh", v)}
                      />
                    </div>

                    <div>
                      <label className="text-sm text-white">Refresh Interval</label>
                      <select 
                        value={settings.display.refreshInterval}
                        onChange={(e) => updateSetting("display", "refreshInterval", parseInt(e.target.value))}
                        className="mt-2 w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                      >
                        <option value={10}>10 seconds</option>
                        <option value={30}>30 seconds</option>
                        <option value={60}>1 minute</option>
                        <option value={300}>5 minutes</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 p-4 border-t border-slate-700">
              <button 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
