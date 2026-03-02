import { useState, useMemo } from "react";
import { ENDPOINTS } from "@/data/endpoints-registry";
import EndpointList from "@/components/endpoints/EndpointList";
import { Search } from "lucide-react";

export default function EndpointsPage() {
  const [search, setSearch] = useState("");

  const allTags = useMemo(() => {
    const set = new Set<string>();
    ENDPOINTS.forEach((ep) => ep.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filter = useMemo(() => {
    const q = search.toLowerCase().trim();
    return (ep: (typeof ENDPOINTS)[number]) => {
      const matchesSearch =
        !q ||
        ep.name.toLowerCase().includes(q) ||
        ep.path.toLowerCase().includes(q) ||
        ep.description.toLowerCase().includes(q) ||
        ep.method.toLowerCase().includes(q);
      const matchesTag = !activeTag || ep.tags?.includes(activeTag);
      return matchesSearch && matchesTag;
    };
  }, [search, activeTag]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Analytics
            </a>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-semibold text-foreground">Endpoints</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/status"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Status
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">API Endpoints</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {ENDPOINTS.length} endpoints registered · Click <strong>Test</strong> to execute
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter endpoints…"
              className="h-8 w-56 bg-card border border-border pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        {/* Tag filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-2 py-0.5 text-[11px] font-medium border transition-colors ${
                activeTag === null
                  ? "border-foreground text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-2 py-0.5 text-[11px] font-medium border transition-colors ${
                  activeTag === tag
                    ? "border-foreground text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* List */}
        <EndpointList endpoints={ENDPOINTS} filter={filter} />
      </main>
    </div>
  );
}
