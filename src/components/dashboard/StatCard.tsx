import { Eye, Users, MousePointerClick } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: "pageviews" | "visitors" | "sessions";
}

const icons = {
  pageviews: Eye,
  visitors: Users,
  sessions: MousePointerClick,
};

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString();
}

export function StatCard({ label, value, icon }: StatCardProps) {
  const Icon = icons[icon];

  return (
    <div className="flex items-center gap-4 bg-card p-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold tracking-tight">{formatNumber(value)}</p>
      </div>
    </div>
  );
}
