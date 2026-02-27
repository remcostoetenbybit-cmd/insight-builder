import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReferrerData } from "@/types/analytics";

interface TopReferrersListProps {
  data: ReferrerData[];
}

export function TopReferrersList({ data }: TopReferrersListProps) {
  const maxVisits = Math.max(...data.map((d) => d.visits));

  return (
    <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top Referrers</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.map((ref) => (
          <div key={ref.source} className="group flex items-center gap-3">
            <div className="relative flex-1 overflow-hidden rounded-md bg-secondary/50 px-3 py-2">
              <div
                className="absolute inset-y-0 left-0 rounded-md bg-chart-2/15 transition-all group-hover:bg-chart-2/25"
                style={{ width: `${(ref.visits / maxVisits) * 100}%` }}
              />
              <span className="relative text-sm font-medium">{ref.source}</span>
            </div>
            <span className="w-16 text-right text-sm font-semibold tabular-nums text-muted-foreground">
              {ref.visits.toLocaleString()}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
