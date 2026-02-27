import type { AnalyticsPayload } from "@/types/analytics";
import payload from "../../mock-payload-for-agent.json";

export function fetchAnalytics(): Promise<AnalyticsPayload> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(payload as AnalyticsPayload), 300);
  });
}
