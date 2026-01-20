export const STATUS_COLORS = {
  success: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    solid: "bg-emerald-500"
  },
  running: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    border: "border-blue-500/30",
    solid: "bg-blue-500"
  },
  pending: {
    bg: "bg-slate-500/20",
    text: "text-slate-400",
    border: "border-slate-500/30",
    solid: "bg-slate-500"
  },
  failed: {
    bg: "bg-red-500/20",
    text: "text-red-400",
    border: "border-red-500/30",
    solid: "bg-red-500"
  },
  warning: {
    bg: "bg-amber-500/20",
    text: "text-amber-400",
    border: "border-amber-500/30",
    solid: "bg-amber-500"
  },
  critical: {
    bg: "bg-red-500/20",
    text: "text-red-400",
    border: "border-red-500/30",
    solid: "bg-red-500"
  },
  healthy: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    solid: "bg-emerald-500"
  },
  skipped: {
    bg: "bg-slate-500/20",
    text: "text-slate-400",
    border: "border-slate-500/30",
    solid: "bg-slate-600"
  },
  in_progress: {
    bg: "bg-blue-500/20",
    text: "text-blue-400",
    border: "border-blue-500/30",
    solid: "bg-blue-500"
  }
};

export const ENVIRONMENTS = [
  { value: "all", label: "All Environments" },
  { value: "production", label: "Production" },
  { value: "staging", label: "Staging" },
  { value: "development", label: "Development" }
];

export const REFRESH_INTERVALS = {
  PIPELINE_UPDATE: 8000,
  SERVER_UPDATE: 5000,
  ACTIVITY_UPDATE: 10000
};

export const API_ENDPOINTS = {
  PIPELINES: "/pipelines",
  SERVERS: "/servers",
  DEPLOYMENTS: "/deployments",
  STATS: "/stats",
  ACTIVITY: "/activity"
};
