import type { EndpointDefinition } from "@/data/endpoints-registry";
import EndpointCard from "./EndpointCard";

interface EndpointListProps {
  endpoints: EndpointDefinition[];
  /** Optional filter predicate – defaults to showing all */
  filter?: (ep: EndpointDefinition) => boolean;
}

export default function EndpointList({ endpoints, filter }: EndpointListProps) {
  const visible = filter ? endpoints.filter(filter) : endpoints;

  if (visible.length === 0) {
    return (
      <div className="border border-border bg-card p-8 text-center text-sm text-muted-foreground">
        No endpoints match the current filter.
      </div>
    );
  }

  return (
    <div className="space-y-px">
      {visible.map((ep) => (
        <EndpointCard key={ep.id} endpoint={ep} />
      ))}
    </div>
  );
}
