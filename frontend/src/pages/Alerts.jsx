import { useState, useMemo } from "react";
import { AlertTriangle, AlertCircle, Info, CheckCircle, Bell, BellOff, Clock, Server } from "lucide-react";
import { SearchInput, Card } from "../components/common";
import { alerts } from "../data/mockData";

export default function Alerts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesType = typeFilter === "all" || alert.type === typeFilter;
      const matchesStatus = statusFilter === "all" || alert.status === statusFilter;
      const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (alert.server && alert.server.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesType && matchesStatus && matchesSearch;
    });
  }, [typeFilter, statusFilter, searchQuery]);

  const alertCounts = useMemo(() => {
    return {
      all: alerts.length,
      critical: alerts.filter(a => a.type === "critical").length,
      warning: alerts.filter(a => a.type === "warning").length,
      info: alerts.filter(a => a.type === "info").length,
      active: alerts.filter(a => a.status === "active").length,
      acknowledged: alerts.filter(a => a.status === "acknowledged").length,
      resolved: alerts.filter(a => a.status === "resolved").length
    };
  }, []);

  const formatTime = (timestamp) => {
    if (!timestamp) return "-";
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "critical":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-slate-400" />;
    }
  };

  const getTypeBadgeClass = (type) => {
    const base = "px-2 py-1 text-xs font-medium rounded-full";
    switch (type) {
      case "critical":
        return `${base} bg-red-500/20 text-red-400 border border-red-500/30`;
      case "warning":
        return `${base} bg-amber-500/20 text-amber-400 border border-amber-500/30`;
      case "info":
        return `${base} bg-blue-500/20 text-blue-400 border border-blue-500/30`;
      default:
        return `${base} bg-slate-500/20 text-slate-400 border border-slate-500/30`;
    }
  };

  const getStatusBadgeClass = (status) => {
    const base = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case "active":
        return `${base} bg-red-500/20 text-red-400 border border-red-500/30`;
      case "acknowledged":
        return `${base} bg-amber-500/20 text-amber-400 border border-amber-500/30`;
      case "resolved":
        return `${base} bg-emerald-500/20 text-emerald-400 border border-emerald-500/30`;
      default:
        return `${base} bg-slate-500/20 text-slate-400 border border-slate-500/30`;
    }
  };

  const getFilterButtonClass = (isActive) => {
    const base = "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors";
    if (isActive) {
      return `${base} bg-emerald-600 text-white`;
    }
    return `${base} bg-slate-700 text-slate-300 hover:bg-slate-600`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Alerts</h2>
          <p className="text-slate-400">Monitor and manage system alerts</p>
        </div>
        <div className="w-full sm:w-64">
          <SearchInput 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search alerts..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Critical</p>
              <p className="text-2xl font-bold text-white">{alertCounts.critical}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Warning</p>
              <p className="text-2xl font-bold text-white">{alertCounts.warning}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-amber-500" />
          </div>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Active</p>
              <p className="text-2xl font-bold text-white">{alertCounts.active}</p>
            </div>
            <Bell className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        <Card className="border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Resolved</p>
              <p className="text-2xl font-bold text-white">{alertCounts.resolved}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-slate-400 py-1.5">Type:</span>
          <button onClick={() => setTypeFilter("all")} className={getFilterButtonClass(typeFilter === "all")}>
            All
          </button>
          <button onClick={() => setTypeFilter("critical")} className={getFilterButtonClass(typeFilter === "critical")}>
            Critical
          </button>
          <button onClick={() => setTypeFilter("warning")} className={getFilterButtonClass(typeFilter === "warning")}>
            Warning
          </button>
          <button onClick={() => setTypeFilter("info")} className={getFilterButtonClass(typeFilter === "info")}>
            Info
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-slate-400 py-1.5">Status:</span>
          <button onClick={() => setStatusFilter("all")} className={getFilterButtonClass(statusFilter === "all")}>
            All
          </button>
          <button onClick={() => setStatusFilter("active")} className={getFilterButtonClass(statusFilter === "active")}>
            Active
          </button>
          <button onClick={() => setStatusFilter("acknowledged")} className={getFilterButtonClass(statusFilter === "acknowledged")}>
            Acknowledged
          </button>
          <button onClick={() => setStatusFilter("resolved")} className={getFilterButtonClass(statusFilter === "resolved")}>
            Resolved
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className="hover:border-slate-600 transition-colors">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-slate-700 rounded-lg">
                {getTypeIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-white">{alert.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">{alert.message}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={getTypeBadgeClass(alert.type)}>{alert.type}</span>
                    <span className={getStatusBadgeClass(alert.status)}>{alert.status}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-400">
                  {alert.server && (
                    <div className="flex items-center gap-1">
                      <Server className="w-4 h-4" />
                      <span>{alert.server}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(alert.createdAt)}</span>
                  </div>
                  {alert.acknowledgedBy && (
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>Acknowledged by {alert.acknowledgedBy}</span>
                    </div>
                  )}
                </div>

                {alert.status === "active" && (
                  <div className="flex gap-2 mt-4">
                    <button className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 rounded text-sm text-white transition-colors">
                      Acknowledge
                    </button>
                    <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 rounded text-sm text-white transition-colors">
                      Resolve
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <BellOff className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No alerts found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
