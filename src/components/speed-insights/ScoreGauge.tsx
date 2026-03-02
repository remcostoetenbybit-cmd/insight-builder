import type { ScoreCategory } from "@/types/speed-insights";

interface ScoreGaugeProps {
  score: number;
  rating: ScoreCategory;
  size?: number;
}

const ratingColor: Record<ScoreCategory, string> = {
  great: "hsl(var(--score-great))",
  improvement: "hsl(var(--score-improvement))",
  poor: "hsl(var(--score-poor))",
};

const ratingLabel: Record<ScoreCategory, string> = {
  great: "Great",
  improvement: "Needs Improvement",
  poor: "Poor",
};

export function ScoreGauge({ score, rating, size = 96 }: ScoreGaugeProps) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = ratingColor[rating];

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="butt"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-2xl font-bold"
          style={{ color }}
        >
          {score}
        </span>
      </div>
      <div>
        <p className="text-base font-semibold" style={{ color }}>
          {ratingLabel[rating]}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {rating === "great" ? "Above 90" : rating === "improvement" ? "50 – 90" : "Below 50"}
        </p>
      </div>
    </div>
  );
}
