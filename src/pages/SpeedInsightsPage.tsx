import { useSpeedInsights } from "@/hooks/use-speed-insights";
import { VitalsSidebar } from "@/components/speed-insights/VitalsSidebar";
import { ScoreGauge } from "@/components/speed-insights/ScoreGauge";
import { ScoreChart } from "@/components/speed-insights/ScoreChart";
import { RoutesTable } from "@/components/speed-insights/RoutesTable";
import { CountriesTable } from "@/components/speed-insights/CountriesTable";
import { Skeleton } from "@/components/ui/skeleton";

export default function SpeedInsightsPage() {
  const { data, isLoading } = useSpeedInsights();

  if (isLoading || !data) {
    return (
      <div className="min-h-screen bg-background p-6 md:p-10">
        <div className="mx-auto max-w-7xl space-y-6">
          <Skeleton className="h-10 w-64" />
          <div className="flex gap-6">
            <Skeleton className="h-96 w-64" />
            <Skeleton className="h-96 flex-1" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-3 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-semibold tracking-tight">Speed Insights</h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Analytics
            </a>
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
          <div className="flex flex-col lg:flex-row gap-6">
            <VitalsSidebar vitals={data.vitals} />

            <div className="flex-1 border border-border bg-card">
              <div className="border-b border-border px-6 py-4">
                <span className="text-xs text-muted-foreground">Desktop</span>
                <h2 className="text-lg font-semibold mt-1">Real Experience Score</h2>
              </div>
              <div className="p-6 flex flex-col md:flex-row gap-8">
                <div className="shrink-0">
                  <ScoreGauge score={data.overallScore} rating={data.overallRating} />
                  <p className="text-xs text-muted-foreground mt-4 max-w-[220px]">
                    Measures the overall user experience. Pages should have a RES of more than 90.
                  </p>
                </div>
                <ScoreChart data={data.scoreHistory} percentile={data.percentile} />
              </div>
            </div>
          </div>

          <RoutesTable routes={data.routes} />

          <CountriesTable countries={data.countries} />

          <div className="flex items-center justify-between text-xs text-muted-foreground py-4">
            <span>Based on {data.dataPoints.toLocaleString()} data points</span>
            <span>Updated just now</span>
          </div>
        </div>
      </main>
    </div>
  );
}
