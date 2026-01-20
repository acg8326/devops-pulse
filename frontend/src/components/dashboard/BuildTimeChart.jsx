import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card } from "../common";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg">
        <p className="text-sm text-white">
          {payload[0].payload.name}: {payload[0].value}s avg
        </p>
      </div>
    );
  }
  return null;
};

export default function BuildTimeChart({ pipelines }) {
  const buildTimes = pipelines
    .filter(p => p.duration)
    .map(p => ({
      name: p.name,
      duration: p.duration,
      status: p.status
    }))
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 5);

  const getColor = (status) => {
    switch (status) {
      case "success": return "#10b981";
      case "failed": return "#ef4444";
      case "running": return "#3b82f6";
      default: return "#64748b";
    }
  };

  return (
    <Card>
      <h2 className="text-lg font-semibold text-white mb-4">Pipeline Build Times</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={buildTimes}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
          >
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickFormatter={(value) => `${Math.floor(value / 60)}m`}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              width={120}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(148, 163, 184, 0.1)" }} />
            <Bar dataKey="duration" radius={[0, 4, 4, 0]}>
              {buildTimes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.status)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
