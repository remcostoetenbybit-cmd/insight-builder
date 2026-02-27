import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";

const domains = [
  { label: "acme.com", value: "acme.com" },
  { label: "docs.acme.com", value: "docs.acme.com" },
  { label: "blog.acme.com", value: "blog.acme.com" },
  { label: "app.acme.com", value: "app.acme.com" },
];

export function DomainSwitcher() {
  const [selected, setSelected] = useState(domains[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
      >
        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
        {selected.label}
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-50 mt-1 min-w-[180px] border border-border bg-popover py-1 shadow-lg">
            {domains.map((domain) => (
              <button
                key={domain.value}
                onClick={() => {
                  setSelected(domain);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm transition-colors hover:bg-accent ${
                  selected.value === domain.value
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <Globe className="h-3.5 w-3.5" />
                {domain.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
