export type HealthResponse = {
  ok: boolean;
  up: boolean;
  status: number | null;
  latencyMs: number | null;
  checkedAt: string;
  url: string;
  error?: string;
};

export type MetricsData = {
  totalRequests: number;
  duplicatesBlocked: number;
  cacheSize: number;
  hitRate: number;
  uptime: number;
};

export type MetricsResponse = {
  ok: boolean;
  metrics: MetricsData | null;
  status: number | null;
  latencyMs: number | null;
  checkedAt: string;
  url: string;
  error?: string;
};

export type StreamEvent = {
  id: string;
  projectId: string;
  type: string;
  path: string | null;
  ts: string;
  isLocalhost: boolean | null;
  deviceType: string | null;
  host: string | null;
};

export type LatencyPoint = {
  ts: string;
  latencyMs: number;
};

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchHealth(): Promise<HealthResponse> {
  await delay(400);
  return {
    ok: true,
    up: true,
    status: 200,
    latencyMs: Math.floor(Math.random() * 30) + 12,
    checkedAt: new Date().toISOString(),
    url: "https://api.example.com/health",
  };
}

export async function fetchMetrics(): Promise<MetricsResponse> {
  await delay(500);
  return {
    ok: true,
    metrics: {
      totalRequests: 1_284_932,
      duplicatesBlocked: 12_847,
      cacheSize: 4_096,
      hitRate: 0.9412,
      uptime: 1_234_567_890,
    },
    status: 200,
    latencyMs: 24,
    checkedAt: new Date().toISOString(),
    url: "https://api.example.com/metrics",
  };
}

export async function fetchLatencyHistory(): Promise<LatencyPoint[]> {
  await delay(350);
  const now = Date.now();
  return Array.from({ length: 48 }, (_, i) => ({
    ts: new Date(now - (47 - i) * 30 * 60_000).toISOString(),
    latencyMs: Math.floor(Math.random() * 40) + 10 + (Math.sin(i / 4) * 15),
  }));
}

const eventTypes = ["pageview", "click", "scroll", "navigation", "api_call", "error", "purchase"];
const paths = ["/", "/dashboard", "/settings", "/api/v1/data", "/checkout", "/blog/intro", null];
const devices: (string | null)[] = ["desktop", "mobile", "tablet", null];
const hosts = ["mock-tale-weave.lovable.app", "app.example.com", "localhost:3000"];
const projects = ["proj_abc123", "proj_def456", "proj_ghi789"];

function randomEvent(id: number): StreamEvent {
  return {
    id: `evt_${Date.now()}_${id}`,
    projectId: projects[Math.floor(Math.random() * projects.length)],
    type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
    path: paths[Math.floor(Math.random() * paths.length)],
    ts: new Date().toISOString(),
    isLocalhost: Math.random() > 0.8 ? true : null,
    deviceType: devices[Math.floor(Math.random() * devices.length)],
    host: hosts[Math.floor(Math.random() * hosts.length)],
  };
}

export function subscribeToStream(onEvent: (event: StreamEvent) => void): () => void {
  let counter = 0;
  const interval = setInterval(() => {
    onEvent(randomEvent(counter++));
  }, 800 + Math.random() * 1200);
  return () => clearInterval(interval);
}
