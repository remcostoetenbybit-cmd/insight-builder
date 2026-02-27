import type { PageData } from "@/types/analytics";

interface TopPagesTableProps {
  data: PageData[];
}

export function TopPagesTable({ data }: TopPagesTableProps) {
  const maxViews = Math.max(...data.map((d) => d.views));

  return (
    <div className="border border-border bg-card">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-sm font-semibold">Top Pages</h2>
      </div>
      <div className="divide-y divide-border">
        {data.map((page) => (
          <div key={page.path} className="group flex items-center gap-3 px-6 py-3">
            <div className="relative flex-1 overflow-hidden bg-accent px-3 py-1.5">
              <div
                className="absolute inset-y-0 left-0 bg-foreground/5 transition-all group-hover:bg-foreground/10"
                style={{ width: `${(page.views / maxViews) * 100}%` }}
              />
              <span className="relative text-sm font-medium">{page.path}</span>
            </div>
            <span className="w-16 text-right text-xs font-semibold tabular-nums text-muted-foreground">
              {page.views.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
