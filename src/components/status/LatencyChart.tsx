import type { LatencyPoint } from "@/data/mock-api";
import { Skeleton } from "@/components/ui/skeleton";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

function LatencyChart({ data, loading }: { data: LatencyPoint[]; loading: boolean }) {
  if (loading) {
    return (
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6">
        <Skeleton className="h-4 w-40 mb-6" />
        <Skeleton className="h-[260px] w-full" />
      </div>
    );
  }

  const formatted = data.map((p) => ({
    ...p,
    time: new Date(p.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  }));

  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6">
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-6">
        Latency — Last 24h
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={formatted} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="latencyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(142 71% 45%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(142 71% 45%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 15%)" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 10, fill: "hsl(0 0% 55%)" }}
            axisLine={{ stroke: "hsl(0 0% 15%)" }}
            tickLine={false}
            interval={7}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "hsl(0 0% 55%)" }}
            axisLine={false}
            tickLine={false}
            unit="ms"
          />
          <Tooltip
            contentStyle={{
              background: "hsl(0 0% 4%)",
              border: "1px solid hsl(0 0% 15%)",
              borderRadius: 0,
              fontSize: 12,
              color: "hsl(0 0% 93%)",
            }}
            labelStyle={{ color: "hsl(0 0% 55%)" }}
          />
          <Area
            type="monotone"
            dataKey="latencyMs"
            stroke="hsl(142 71% 45%)"
            strokeWidth={1.5}
            fill="url(#latencyGrad)"
            dot={false}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LatencyChart;
