import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { format, parseISO } from "date-fns";
import type { ScorePoint } from "@/types/speed-insights";

interface ScoreChartProps {
  data: ScorePoint[];
  percentile: string;
}

export function ScoreChart({ data, percentile }: ScoreChartProps) {
  const chartData = data.map((d) => ({
    date: format(parseISO(d.date), "MMM d"),
    score: d.score,
  }));

  return (
    <div className="flex-1">
      <div className="flex items-center justify-end gap-3 mb-2">
        {["P75", "P90", "P95", "P99"].map((p) => (
          <span
            key={p}
            className={`text-xs ${p === percentile ? "text-foreground font-semibold" : "text-muted-foreground"}`}
          >
            {p === percentile && <span className="inline-block w-1.5 h-1.5 bg-[hsl(var(--score-great))] mr-1" />}
            {p}
          </span>
        ))}
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              tickLine={false}
              axisLine={false}
            />
            <ReferenceLine
              y={90}
              stroke="hsl(var(--score-great))"
              strokeDasharray="6 4"
              label={{ value: "90", position: "left", fontSize: 10, fill: "hsl(var(--score-great))" }}
            />
            <ReferenceLine
              y={50}
              stroke="hsl(var(--score-improvement))"
              strokeDasharray="6 4"
              label={{ value: "50", position: "left", fontSize: 10, fill: "hsl(var(--score-improvement))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0px",
                color: "hsl(var(--foreground))",
                fontSize: 12,
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="hsl(var(--foreground))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--foreground))", r: 3 }}
              activeDot={{ r: 5, fill: "hsl(var(--score-great))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
