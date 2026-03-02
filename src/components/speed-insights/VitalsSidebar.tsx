import type { WebVital } from "@/types/speed-insights";
import { WebVitalCard } from "./WebVitalCard";

interface VitalsSidebarProps {
  vitals: WebVital[];
}

export function VitalsSidebar({ vitals }: VitalsSidebarProps) {
  return (
    <div className="border border-border bg-card w-full lg:w-64 shrink-0">
      {vitals.map((v) => (
        <WebVitalCard key={v.id} vital={v} />
      ))}
    </div>
  );
}
