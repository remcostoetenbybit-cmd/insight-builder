import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PageData } from "@/types/analytics";

interface TopPagesTableProps {
  data: PageData[];
}

export function TopPagesTable({ data }: TopPagesTableProps) {
  const maxViews = Math.max(...data.map((d) => d.views));

  return (
    <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top Pages</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.map((page) => (
          <div key={page.path} className="group flex items-center gap-3">
            <div className="relative flex-1 overflow-hidden rounded-md bg-secondary/50 px-3 py-2">
              <div
                className="absolute inset-y-0 left-0 rounded-md bg-primary/10 transition-all group-hover:bg-primary/15"
                style={{ width: `${(page.views / maxViews) * 100}%` }}
              />
              <span className="relative text-sm font-medium">{page.path}</span>
            </div>
            <span className="w-16 text-right text-sm font-semibold tabular-nums text-muted-foreground">
              {page.views.toLocaleString()}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
