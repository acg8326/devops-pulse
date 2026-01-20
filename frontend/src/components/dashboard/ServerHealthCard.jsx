import { Server, Cpu, HardDrive, MemoryStick } from "lucide-react";
import { Card, StatusBadge, ProgressBar } from "../common";

export default function ServerHealthCard({ server }) {
  return (
    <Card className="hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-700 rounded-lg">
            <Server className="w-5 h-5 text-slate-300" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{server.name}</h3>
            <p className="text-xs text-slate-400">{server.type} • {server.provider}</p>
          </div>
        </div>
        <StatusBadge status={server.status} />
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Cpu className="w-4 h-4" />
              <span>CPU</span>
            </div>
            <span className="text-white">{server.cpu}%</span>
          </div>
          <ProgressBar value={server.cpu} color="auto" />
        </div>

        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <div className="flex items-center gap-2 text-slate-400">
              <MemoryStick className="w-4 h-4" />
              <span>Memory</span>
            </div>
            <span className="text-white">{server.memory}%</span>
          </div>
          <ProgressBar value={server.memory} color="auto" />
        </div>

        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <div className="flex items-center gap-2 text-slate-400">
              <HardDrive className="w-4 h-4" />
              <span>Disk</span>
            </div>
            <span className="text-white">{server.disk}%</span>
          </div>
          <ProgressBar value={server.disk} color="auto" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-700 flex justify-between text-xs text-slate-400">
        <span>Uptime: {server.uptime}</span>
        <span>{server.environment}</span>
      </div>
    </Card>
  );
}
