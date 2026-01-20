import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card } from "../common";

const responseTimeData = [
  { time: "00:00", api: 120, web: 85, db: 45 },
  { time: "04:00", api: 132, web: 90, db: 52 },
  { time: "08:00", api: 165, web: 120, db: 68 },
  { time: "12:00", api: 210, web: 145, db: 85 },
  { time: "16:00", api: 185, web: 130, db: 72 },
  { time: "20:00", api: 145, web: 98, db: 55 },
  { time: "Now", api: 158, web: 105, db: 48 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg">
        <p className="text-slate-300 font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}ms
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ResponseTimeChart() {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-white mb-4">Response Times (24h)</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={responseTimeData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickFormatter={(value) => `${value}ms`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="api"
              name="API"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#3b82f6" }}
            />
            <Line
              type="monotone"
              dataKey="web"
              name="Web"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#10b981" }}
            />
            <Line
              type="monotone"
              dataKey="db"
              name="Database"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#f59e0b" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-slate-400">API</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="text-sm text-slate-400">Web</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span className="text-sm text-slate-400">Database</span>
        </div>
      </div>
    </Card>
  );
}
