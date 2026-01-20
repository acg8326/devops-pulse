export default function ProgressBar({ value, max = 100, color = "blue" }) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colors = {
    blue: "bg-blue-500",
    green: "bg-emerald-500",
    yellow: "bg-amber-500",
    red: "bg-red-500",
    auto: percentage > 90 ? "bg-red-500" : percentage > 70 ? "bg-amber-500" : "bg-emerald-500"
  };
  
  const barColor = colors[color] || colors.blue;
  
  return (
    <div className="w-full bg-slate-700 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${barColor}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
