import type { StreamEvent } from "@/data/mock-api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Radio, Monitor, Smartphone, Tablet } from "lucide-react";

function DeviceIcon({ type }: { type: string | null }) {
  switch (type) {
    case "mobile":
      return <Smartphone className="h-3.5 w-3.5" />;
    case "tablet":
      return <Tablet className="h-3.5 w-3.5" />;
    case "desktop":
      return <Monitor className="h-3.5 w-3.5" />;
    default:
      return <Monitor className="h-3.5 w-3.5 opacity-30" />;
  }
}

const typeColors: Record<string, string> = {
  pageview: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  click: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  error: "bg-red-500/10 text-red-400 border-red-500/20",
  purchase: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  navigation: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  api_call: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  scroll: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};

function LiveEventFeed({ events, connected }: { events: StreamEvent[]; connected: boolean }) {
  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">Live Event Feed</p>
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-2 w-2 ${connected ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`}
            style={{ borderRadius: "9999px" }}
          />
          <span className="text-xs text-muted-foreground">{connected ? "Connected" : "Disconnected"}</span>
        </div>
      </div>

      <div className="px-6 py-2 border-b border-white/5 grid grid-cols-[1fr_100px_1fr_80px_100px] gap-2 text-[10px] text-muted-foreground uppercase tracking-wider">
        <span>Event</span>
        <span>Type</span>
        <span>Path</span>
        <span>Device</span>
        <span className="text-right">Time</span>
      </div>

      <ScrollArea className="h-[400px]">
        {events.length === 0 && (
          <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
            <Radio className="h-4 w-4 mr-2 animate-pulse" />
            Waiting for events…
          </div>
        )}
        {events.map((evt, i) => (
          <div
            key={evt.id}
            className="grid grid-cols-[1fr_100px_1fr_80px_100px] gap-2 px-6 py-2.5 border-b border-white/5 text-sm transition-colors hover:bg-white/[0.04] animate-fade-in"
            style={{ animationDelay: `${i * 20}ms` }}
          >
            <span className="text-muted-foreground font-mono text-xs truncate">{evt.id.slice(0, 16)}</span>
            <span>
              <span className={`text-[11px] font-medium px-1.5 py-0.5 border ${typeColors[evt.type] || typeColors.scroll}`}>
                {evt.type}
              </span>
            </span>
            <span className="text-foreground font-mono text-xs truncate">{evt.path || "—"}</span>
            <span className="text-muted-foreground flex items-center gap-1">
              <DeviceIcon type={evt.deviceType} />
            </span>
            <span className="text-muted-foreground text-xs text-right font-mono">
              {new Date(evt.ts).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

export default LiveEventFeed;
