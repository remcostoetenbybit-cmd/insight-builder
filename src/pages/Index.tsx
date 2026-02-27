import { useAnalytics } from "@/hooks/use-analytics";
import { StatCard } from "@/components/dashboard/StatCard";
import { TimeseriesChart } from "@/components/dashboard/TimeseriesChart";
import { TopPagesTable } from "@/components/dashboard/TopPagesTable";
import { TopReferrersList } from "@/components/dashboard/TopReferrersList";
import { GeoTable } from "@/components/dashboard/GeoTable";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3 } from "lucide-react";

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
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Analytics</h1>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Pageviews" value={metrics.pageviews} icon="pageviews" />
          <StatCard label="Visitors" value={metrics.visitors} icon="visitors" />
          <StatCard label="Sessions" value={metrics.sessions} icon="sessions" />
        </div>

        <TimeseriesChart data={metrics.timeseries} />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <TopPagesTable data={metrics.topPages} />
          <TopReferrersList data={metrics.topReferrers} />
        </div>

        <GeoTable data={metrics.geo} />
      </div>
    </div>
  );
};

export default Index;
