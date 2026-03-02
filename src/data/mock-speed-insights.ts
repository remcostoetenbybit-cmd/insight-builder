import type { SpeedInsightsData } from "@/types/speed-insights";

export async function fetchSpeedInsights(): Promise<SpeedInsightsData> {
  await new Promise((r) => setTimeout(r, 600));

  return {
    overallScore: 87,
    overallRating: "improvement",
    percentile: "P75",
    vitals: [
      { id: "fcp", name: "First Contentful Paint", value: 1.2, unit: "s", rating: "great", p75: 1.8, description: "Time until the first content is painted on screen." },
      { id: "lcp", name: "Largest Contentful Paint", value: 2.5, unit: "s", rating: "improvement", p75: 2.5, description: "Time until the largest content element is visible." },
      { id: "inp", name: "Interaction to Next Paint", value: 120, unit: "ms", rating: "improvement", p75: 200, description: "Responsiveness to user interactions." },
      { id: "cls", name: "Cumulative Layout Shift", value: 0.05, unit: "", rating: "great", p75: 0.1, description: "Visual stability of the page." },
      { id: "fid", name: "First Input Delay", value: 8, unit: "ms", rating: "great", p75: 100, description: "Time from first interaction to browser response." },
      { id: "ttfb", name: "Time to First Byte", value: 0.42, unit: "s", rating: "great", p75: 0.8, description: "Server response time." },
    ],
    scoreHistory: [
      { date: "2026-02-23", score: 82 },
      { date: "2026-02-24", score: 85 },
      { date: "2026-02-25", score: 79 },
      { date: "2026-02-26", score: 88 },
      { date: "2026-02-27", score: 91 },
      { date: "2026-02-28", score: 85 },
      { date: "2026-03-01", score: 87 },
      { date: "2026-03-02", score: 87 },
    ],
    routes: [
      { path: "/", visits: 23000, score: 92, rating: "great" },
      { path: "/docs", visits: 4600, score: 95, rating: "great" },
      { path: "/blog/[...slug]", visits: 1200, score: 72, rating: "improvement" },
      { path: "/pricing", visits: 890, score: 88, rating: "improvement" },
      { path: "/dashboard", visits: 560, score: 65, rating: "improvement" },
      { path: "/api/health", visits: 340, score: 98, rating: "great" },
    ],
    countries: [
      { country: "United States", visits: 50000, score: 91, rating: "great" },
      { country: "India", visits: 61000, score: 78, rating: "improvement" },
      { country: "Germany", visits: 12000, score: 94, rating: "great" },
      { country: "Japan", visits: 30000, score: 96, rating: "great" },
      { country: "Netherlands", visits: 7200, score: 68, rating: "improvement" },
      { country: "Brazil", visits: 8500, score: 45, rating: "poor" },
      { country: "South Korea", visits: 25000, score: 97, rating: "great" },
      { country: "Poland", visits: 4000, score: 65, rating: "improvement" },
    ],
    dataPoints: 245892,
    updatedAt: new Date().toISOString(),
  };
}
