import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="animate-fade-in">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold tracking-tight">{formatNumber(value)}</p>
        </div>
      </CardContent>
    </Card>
  );
}
