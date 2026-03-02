import type { EndpointDefinition } from "@/data/endpoints-registry";
import { useEndpointTester } from "@/hooks/use-endpoint-tester";
import MethodBadge from "./MethodBadge";
import ResponseViewer from "./ResponseViewer";
import { Play, RotateCcw } from "lucide-react";

export default function EndpointCard({ endpoint }: { endpoint: EndpointDefinition }) {
  const { result, run, reset } = useEndpointTester(endpoint.handler);
  const isLoading = result.status === "loading";

  return (
    <div className="border border-border bg-card transition-colors hover:bg-accent/40">
      <div className="flex items-start justify-between gap-4 p-4">
        {/* Left */}
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-center gap-2.5">
            <MethodBadge method={endpoint.method} />
            <code className="text-sm font-mono text-foreground truncate">
              {endpoint.path}
            </code>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {endpoint.description}
          </p>
          {endpoint.tags && endpoint.tags.length > 0 && (
            <div className="flex gap-1.5 pt-0.5">
              {endpoint.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground bg-muted border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {result.status !== "idle" && (
            <button
              onClick={reset}
              className="flex items-center justify-center h-7 w-7 text-muted-foreground hover:text-foreground transition-colors border border-border bg-background"
              title="Clear"
            >
              <RotateCcw className="h-3 w-3" />
            </button>
          )}
          <button
            onClick={run}
            disabled={isLoading}
            className="flex items-center gap-1.5 h-7 px-3 text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors disabled:opacity-50"
          >
            <Play className="h-3 w-3" />
            {isLoading ? "Running…" : "Test"}
          </button>
        </div>
      </div>

      {/* Response panel */}
      {result.status !== "idle" && (
        <div className="px-4 pb-4">
          <ResponseViewer result={result} />
        </div>
      )}
    </div>
  );
}
