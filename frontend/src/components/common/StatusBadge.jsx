const statusStyles = {
  success: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  running: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  pending: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  failed: "bg-red-500/20 text-red-400 border-red-500/30",
  warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  critical: "bg-red-500/20 text-red-400 border-red-500/30",
  healthy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  skipped: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  in_progress: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export default function StatusBadge({ status }) {
  const style = statusStyles[status] || statusStyles.pending;
  
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${style}`}>
      {status.replace("_", " ")}
    </span>
  );
}
