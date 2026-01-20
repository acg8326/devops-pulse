import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card } from "../common";

const COLORS = {
  healthy: "#10b981",
  warning: "#f59e0b",
  critical: "#ef4444"
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg">
        <p className="text-sm text-white">
          {payload[0].name}: {payload[0].value} servers
        </p>
      </div>
    );
  }
  return null;
};

export default function ServerStatusChart({ servers }) {
  const statusCounts = servers.reduce((acc, server) => {
    acc[server.status] = (acc[server.status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(statusCounts).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
    color: COLORS[status] || "#64748b"
  }));

  return (
    <Card>
      <h2 className="text-lg font-semibold text-white mb-4">Server Status Overview</h2>
      <div className="h-48 sm:h-56 md:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => <span className="text-slate-300 text-sm">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-2">
        {data.map((item) => (
          <div key={item.name} className="text-center">
            <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</p>
            <p className="text-xs text-slate-400">{item.name}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
