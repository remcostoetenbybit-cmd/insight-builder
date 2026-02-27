export interface TimeseriesPoint {
  ts: string;
  count: number;
}

export interface PageData {
  path: string;
  views: number;
}

export interface ReferrerData {
  source: string;
  visits: number;
}

export interface GeoData {
  country: string;
  region: string;
  city: string;
  visitors: number;
}

export interface AnalyticsMetrics {
  pageviews: number;
  visitors: number;
  sessions: number;
  timeseries: TimeseriesPoint[];
  topPages: PageData[];
  topReferrers: ReferrerData[];
  geo: GeoData[];
}

export interface AnalyticsPayload {
  metrics: AnalyticsMetrics;
}
