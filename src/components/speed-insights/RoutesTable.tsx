import type { RouteScore, ScoreCategory } from "@/types/speed-insights";
import { useState } from "react";

interface RoutesTableProps {
  routes: RouteScore[];
}

const categories: { key: ScoreCategory; label: string; range: string; color: string }[] = [
  { key: "poor", label: "Poor", range: "<50", color: "hsl(var(--score-poor))" },
  { key: "improvement", label: "Needs Improvement", range: "50 - 90", color: "hsl(var(--score-improvement))" },
  { key: "great", label: "Great", range: ">90", color: "hsl(var(--score-great))" },
];

function formatVisits(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return n.toString();
}

export function RoutesTable({ routes }: RoutesTableProps) {
  const [tab, setTab] = useState<"routes" | "paths">("routes");

  const grouped = categories.map((cat) => ({
    ...cat,
    items: routes.filter((r) => r.rating === cat.key),
  }));

  return (
    <div className="border border-border bg-card">
      <div className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex gap-4">
          {(["routes", "paths"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-sm capitalize ${t === tab ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"} transition-colors`}
            >
              {t}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">RES</span>
      </div>
      <div className="grid grid-cols-3 divide-x divide-border">
        {grouped.map((cat) => (
          <div key={cat.key} className="min-h-[160px]">
            <div className="px-4 py-3 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2" style={{ backgroundColor: cat.color }} />
                <span className="text-sm font-medium" style={{ color: cat.color }}>{cat.label}</span>
              </div>
              <span className="text-xs text-muted-foreground">{cat.range}</span>
            </div>
            <div>
              {cat.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-xs">No {cat.label.toLowerCase()} scores</span>
                </div>
              ) : (
                cat.items.map((route) => (
                  <div key={route.path} className="px-4 py-2.5 flex items-center justify-between hover:bg-muted/50 transition-colors">
                    <span className="text-sm font-mono">{route.path}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">{formatVisits(route.visits)}</span>
                      <span className="text-sm font-semibold w-8 text-right">{route.score}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
