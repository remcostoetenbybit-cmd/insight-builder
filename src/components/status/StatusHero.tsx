import type { HealthResponse } from "@/data/mock-api";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity } from "lucide-react";

function StatusHero({ data, loading }: { data: HealthResponse | null; loading: boolean }) {
  if (loading || !data) {
    return (
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-5 w-48" />
      </div>
    );
  }

  const isUp = data.up;

  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center">
            <span
              className={`absolute inline-flex h-5 w-5 animate-ping opacity-40 ${
                isUp ? "bg-emerald-500" : "bg-red-500"
              }`}
              style={{ borderRadius: "9999px" }}
            />
            <span
              className={`relative inline-flex h-3 w-3 ${
                isUp ? "bg-emerald-500" : "bg-red-500"
              }`}
              style={{ borderRadius: "9999px" }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">
              {isUp ? "All Systems Operational" : "Service Degraded"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Checked {new Date(data.checkedAt).toLocaleTimeString()} · {data.url}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Ping</p>
            <p className="text-2xl font-mono font-semibold text-foreground">
              {data.latencyMs}<span className="text-sm text-muted-foreground ml-0.5">ms</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Status</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Activity className="h-4 w-4 text-emerald-500" />
              <span
                className={`text-xs font-medium px-2 py-0.5 border ${
                  isUp
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    : "bg-red-500/10 text-red-500 border-red-500/20"
                }`}
              >
                {isUp ? "Operational" : "Down"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusHero;
