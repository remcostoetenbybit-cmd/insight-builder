import type { WebVital, ScoreCategory } from "@/types/speed-insights";

interface WebVitalCardProps {
  vital: WebVital;
}

const ratingColor: Record<ScoreCategory, string> = {
  great: "bg-[hsl(var(--score-great))]",
  improvement: "bg-[hsl(var(--score-improvement))]",
  poor: "bg-[hsl(var(--score-poor))]",
};

export function WebVitalCard({ vital }: WebVitalCardProps) {
  const progress = Math.min((vital.value / vital.p75) * 100, 100);

  return (
    <div className="border-b border-border px-5 py-4 last:border-b-0">
      <p className="text-xs text-muted-foreground">{vital.name}</p>
      <p className="text-xl font-semibold mt-1">
        {vital.value}
        <span className="text-xs font-normal text-muted-foreground ml-0.5">{vital.unit}</span>
      </p>
      <div className="mt-2 h-1 w-full bg-muted overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${ratingColor[vital.rating]}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
