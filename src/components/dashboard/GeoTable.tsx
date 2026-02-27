import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { GeoData } from "@/types/analytics";

interface GeoTableProps {
  data: GeoData[];
}

export function GeoTable({ data }: GeoTableProps) {
  return (
    <Card className="animate-fade-in col-span-full" style={{ animationDelay: "0.4s" }}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Visitors by Location</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Country</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>City</TableHead>
              <TableHead className="text-right">Visitors</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={`${row.country}-${row.city}`}>
                <TableCell className="font-medium">{row.country}</TableCell>
                <TableCell className="text-muted-foreground">{row.region}</TableCell>
                <TableCell className="text-muted-foreground">{row.city}</TableCell>
                <TableCell className="text-right font-semibold tabular-nums">
                  {row.visitors.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
