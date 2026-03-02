import type { TestResult } from "@/hooks/use-endpoint-tester";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ResponseViewer({ result }: { result: TestResult }) {
  if (result.status === "idle") return null;

  if (result.status === "loading") {
    return (
      <div className="mt-3 border border-border bg-background p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-block h-2 w-2 animate-pulse bg-foreground" />
          Executing…
        </div>
      </div>
    );
  }

  const isError = result.status === "error";

  return (
    <div className="mt-3 border border-border bg-background">
      {/* Status bar */}
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-[11px]">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-1.5 w-1.5 ${isError ? "bg-red-500" : "bg-emerald-500"}`}
          />
          <span className={isError ? "text-red-400" : "text-emerald-400"}>
            {isError ? "Error" : "200 OK"}
          </span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          {result.durationMs !== null && <span>{result.durationMs}ms</span>}
          {result.testedAt && (
            <span>{new Date(result.testedAt).toLocaleTimeString()}</span>
          )}
        </div>
      </div>

      {/* Body */}
      <ScrollArea className="max-h-64">
        <pre className="p-3 text-xs leading-relaxed text-foreground font-mono whitespace-pre-wrap break-all">
          {isError
            ? result.error
            : JSON.stringify(result.data, null, 2)}
        </pre>
      </ScrollArea>
    </div>
  );
}
