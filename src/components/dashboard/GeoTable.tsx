import type { GeoData } from "@/types/analytics";

interface GeoTableProps {
  data: GeoData[];
}

export function GeoTable({ data }: GeoTableProps) {
  return (
    <div className="border border-border bg-card">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-sm font-semibold">Visitors by Location</h2>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <th className="px-6 py-3">Country</th>
            <th className="px-6 py-3">Region</th>
            <th className="px-6 py-3">City</th>
            <th className="px-6 py-3 text-right">Visitors</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((row) => (
            <tr key={`${row.country}-${row.city}`} className="transition-colors hover:bg-accent">
              <td className="px-6 py-3 text-sm font-medium">{row.country}</td>
              <td className="px-6 py-3 text-sm text-muted-foreground">{row.region}</td>
              <td className="px-6 py-3 text-sm text-muted-foreground">{row.city}</td>
              <td className="px-6 py-3 text-right text-sm font-semibold tabular-nums">
                {row.visitors.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
