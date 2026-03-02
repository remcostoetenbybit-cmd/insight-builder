import { useQuery } from "@tanstack/react-query";
import type { SpeedInsightsConfig } from "@/types/speed-insights";
import { fetchSpeedInsights } from "@/data/mock-speed-insights";

const defaultConfig: SpeedInsightsConfig = {
  fetchData: fetchSpeedInsights,
};

export function useSpeedInsights(config: Partial<SpeedInsightsConfig> = {}) {
  const merged = { ...defaultConfig, ...config };

  return useQuery({
    queryKey: ["speed-insights"],
    queryFn: merged.fetchData,
    staleTime: 60_000,
  });
}
