import { useHealth, useMetrics, useLatencyHistory, useEventStream } from "@/hooks/use-status";
import StatusHero from "@/components/status/StatusHero";
import MetricsGrid from "@/components/status/MetricsGrid";
import LatencyChart from "@/components/status/LatencyChart";
import LiveEventFeed from "@/components/status/LiveEventFeed";
import { NavLink } from "@/components/NavLink";

function StatusPage() {
  const health = useHealth();
  const metrics = useMetrics();
  const latency = useLatencyHistory();
  const stream = useEventStream();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <NavLink to="/">
              <span className="text-sm font-semibold text-foreground tracking-tight">Analytics</span>
            </NavLink>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-medium text-foreground">System Status</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <StatusHero data={health.data} loading={health.loading} />
        <MetricsGrid data={metrics.data} loading={metrics.loading} />
        <LatencyChart data={latency.data} loading={latency.loading} />
        <LiveEventFeed events={stream.events} connected={stream.connected} />
      </main>
    </div>
  );
}

export default StatusPage;
