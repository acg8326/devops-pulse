import { 
  StatCardSkeleton, 
  CardSkeleton, 
  ChartSkeleton 
} from "../common";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="h-8 w-48 bg-slate-700 rounded animate-pulse mb-2" />
          <div className="h-4 w-64 bg-slate-700 rounded animate-pulse" />
        </div>
        <div className="h-10 w-64 bg-slate-700 rounded-lg animate-pulse" />
      </div>

      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 w-28 bg-slate-700 rounded-lg animate-pulse" />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-6">
          <div>
            <div className="h-6 w-36 bg-slate-700 rounded animate-pulse mb-4" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
        <div className="xl:col-span-1">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="h-6 w-28 bg-slate-700 rounded animate-pulse mb-4" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-3 mb-4">
                <div className="h-8 w-8 bg-slate-700 rounded-lg animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-full bg-slate-700 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-slate-700 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
