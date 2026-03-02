import { useAnalytics } from "@/hooks/use-analytics";
import { StatCard } from "@/components/dashboard/StatCard";
import { TimeseriesChart } from "@/components/dashboard/TimeseriesChart";
import { TopPagesTable } from "@/components/dashboard/TopPagesTable";
import { TopReferrersList } from "@/components/dashboard/TopReferrersList";
import { GeoTable } from "@/components/dashboard/GeoTable";
import { DomainSwitcher } from "@/components/dashboard/DomainSwitcher";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { data, isLoading } = useAnalytics();

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-background p-6 md:p-10">
        <div className="mx-auto max-w-7xl space-y-6">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </div>
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  const { metrics } = data;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-3 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-semibold tracking-tight">Analytics</h1>
            <div className="h-4 w-px bg-border" />
            <DomainSwitcher />
          </div>
          <div className="flex items-center gap-4">
            <a href="/endpoints" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Endpoints
            </a>
            <a href="/status" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Status
            </a>
          </div>
        </div>
      </header>

      <main className="px-6 py-6 md:px-10">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="grid grid-cols-1 gap-px sm:grid-cols-3 border border-border">
            <StatCard label="Pageviews" value={metrics.pageviews} icon="pageviews" />
            <StatCard label="Visitors" value={metrics.visitors} icon="visitors" />
            <StatCard label="Sessions" value={metrics.sessions} icon="sessions" />
          </div>

          <TimeseriesChart data={metrics.timeseries} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TopPagesTable data={metrics.topPages} />
            <TopReferrersList data={metrics.topReferrers} />
          </div>

          <GeoTable data={metrics.geo} />
        </div>
      </main>
    </div>
  );
};

export default Index;
