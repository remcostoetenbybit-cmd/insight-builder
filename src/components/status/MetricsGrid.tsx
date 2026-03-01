import type { MetricsResponse } from "@/data/mock-api";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3, ShieldCheck, Database, Clock } from "lucide-react";

function formatUptime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${days}d ${hours}h ${minutes}m`;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

const icons = [BarChart3, ShieldCheck, Database, Clock];

function MetricsGrid({ data, loading }: { data: MetricsResponse | null; loading: boolean }) {
  if (loading || !data?.metrics) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white/[0.03] backdrop-blur-xl p-6">
            <Skeleton className="h-4 w-24 mb-3" />
            <Skeleton className="h-8 w-32" />
          </div>
        ))}
      </div>
    );
  }

  const m = data.metrics;
  const cards = [
    { label: "Total Requests", value: formatNumber(m.totalRequests) },
    { label: "Duplicates Blocked", value: formatNumber(m.duplicatesBlocked) },
    { label: "Cache Hit Rate", value: `${(m.hitRate * 100).toFixed(1)}%` },
    { label: "Uptime", value: formatUptime(m.uptime) },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
      {cards.map((card, i) => {
        const Icon = icons[i];
        return (
          <div
            key={card.label}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 transition-colors hover:bg-white/[0.06]"
          >
            <div className="flex items-center gap-2 mb-3">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{card.label}</p>
            </div>
            <p className="text-2xl font-mono font-semibold text-foreground">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
}

export default MetricsGrid;
