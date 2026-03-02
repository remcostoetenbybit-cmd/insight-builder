/**
 * Endpoint Registry
 * 
 * To add a new endpoint, simply push a new entry to `ENDPOINTS`.
 * The UI will automatically render a card with a "Test" button.
 * The `handler` function is called when the user clicks "Test".
 * It should return a JSON-serialisable object (or throw).
 */

import { fetchHealth, fetchMetrics, fetchLatencyHistory } from "./mock-api";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface EndpointDefinition {
  /** Unique key – also used as React key */
  id: string;
  /** Human-readable name */
  name: string;
  /** REST method */
  method: HttpMethod;
  /** Path (display only) */
  path: string;
  /** Short description */
  description: string;
  /** Optional tags for filtering / grouping */
  tags?: string[];
  /** The function executed when the user clicks "Test".
   *  Return any JSON-serialisable value. Throw to simulate errors. */
  handler: () => Promise<unknown>;
}

export const ENDPOINTS: EndpointDefinition[] = [
  {
    id: "health",
    name: "Health Check",
    method: "GET",
    path: "/api/status/health",
    description: "Returns current system health, uptime status and latency.",
    tags: ["status", "monitoring"],
    handler: fetchHealth,
  },
  {
    id: "metrics",
    name: "System Metrics",
    method: "GET",
    path: "/api/status/metrics",
    description: "Returns aggregate metrics including request counts, cache stats and uptime.",
    tags: ["status", "metrics"],
    handler: fetchMetrics,
  },
  {
    id: "latency-history",
    name: "Latency History",
    method: "GET",
    path: "/api/status/latency",
    description: "Returns an array of latency data points over the last 24 hours.",
    tags: ["status", "charts"],
    handler: fetchLatencyHistory,
  },
  {
    id: "stream",
    name: "Live Event Stream",
    method: "GET",
    path: "/api/status/stream",
    description: "SSE endpoint that emits real-time analytics events.",
    tags: ["status", "streaming"],
    handler: async () => ({
      info: "This is a streaming endpoint. Use the live feed on the Status page to see events in real-time.",
      type: "SSE",
    }),
  },
];
