import type { CountryScore, ScoreCategory } from "@/types/speed-insights";
import { useState } from "react";

interface CountriesTableProps {
  countries: CountryScore[];
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

export function CountriesTable({ countries }: CountriesTableProps) {
  const [expanded, setExpanded] = useState<ScoreCategory | null>("great");

  const grouped = categories.map((cat) => ({
    ...cat,
    items: countries.filter((c) => c.rating === cat.key),
  }));

  return (
    <div className="border border-border bg-card">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-sm font-semibold">Countries</h2>
      </div>
      <div className="divide-y divide-border">
        {grouped.map((cat) => (
          <div key={cat.key}>
            <button
              onClick={() => setExpanded(expanded === cat.key ? null : cat.key)}
              className="w-full px-6 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{expanded === cat.key ? "∨" : "›"}</span>
                <span className="w-2 h-2" style={{ backgroundColor: cat.color }} />
                <span className="text-sm font-medium" style={{ color: cat.color }}>{cat.label}</span>
              </div>
              <span className="text-xs text-muted-foreground">{cat.range}</span>
            </button>
            {expanded === cat.key && (
              <div>
                {cat.items.map((country) => (
                  <div key={country.country} className="px-6 py-2.5 flex items-center justify-between hover:bg-muted/50 transition-colors ml-4">
                    <span className="text-sm">{country.country}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground">{formatVisits(country.visits)}</span>
                      <div className="w-24 h-1 bg-muted overflow-hidden">
                        <div
                          className="h-full transition-all duration-500"
                          style={{ width: `${country.score}%`, backgroundColor: cat.color }}
                        />
                      </div>
                      <span className="text-sm font-semibold w-8 text-right">{country.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
