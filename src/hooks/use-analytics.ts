import { useQuery } from "@tanstack/react-query";
import { fetchAnalytics } from "@/services/analytics";

export function useAnalytics() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
    staleTime: 60_000,
  });
}
