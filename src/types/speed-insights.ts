export type ScoreCategory = "great" | "improvement" | "poor";

export interface WebVital {
  id: string;
  name: string;
  value: number;
  unit: string;
  rating: ScoreCategory;
  p75: number;
  description: string;
}

export interface ScorePoint {
  date: string;
  score: number;
}

export interface RouteScore {
  path: string;
  visits: number;
  score: number;
  rating: ScoreCategory;
}

export interface CountryScore {
  country: string;
  visits: number;
  score: number;
  rating: ScoreCategory;
}

export interface SpeedInsightsData {
  overallScore: number;
  overallRating: ScoreCategory;
  percentile: string;
  vitals: WebVital[];
  scoreHistory: ScorePoint[];
  routes: RouteScore[];
  countries: CountryScore[];
  dataPoints: number;
  updatedAt: string;
}

export interface SpeedInsightsConfig {
  fetchData: () => Promise<SpeedInsightsData>;
}
