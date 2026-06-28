import { useEffect, useRef, useState } from "preact/hooks";
import type { Term } from "@/data/taxonomy.ts";
import type { WorkSelection } from "@/src/types.ts";
import { canonicalWorkPath } from "@/data/taxonomy.ts";
import MultiSelect from "@/components/MultiSelect/MultiSelect.tsx";

interface WorkFilterProps {
  domains: Term[];
  stack: Term[];
  years: number[];
  selection: WorkSelection;
  shown: number;
  total: number;
}

type Facet = "domains" | "stack" | "years";

function toggleValue<T>(values: T[], value: T): T[] {
  return values.includes(value)
    ? values.filter((v) => v !== value)
    : [...values, value];
}

function go(href: string) {
  globalThis.location.assign(href);
}

export default function WorkFilter(
  { domains, stack, years, selection, shown, total }: WorkFilterProps,
) {
  const [open, setOpen] = useState<Facet | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };

    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const navWith = (patch: Partial<WorkSelection>) =>
    go(canonicalWorkPath({ ...selection, page: 1, ...patch }));

  const totalSelected = selection.domains.length + selection.stack.length +
    selection.years.length;

  const yearTerms: Term[] = years.map((y) => ({
    label: String(y),
    slug: String(y),
  }));

  return (
    <section class="flt-bar flt-bar-work" aria-label="Filter projects">
      <div class="flt-inner" ref={ref}>
        <div class="flt-row">
          <div class="flt-selects">
            <MultiSelect
              label="Domain"
              options={domains}
              selected={selection.domains}
              open={open === "domains"}
              onTrigger={() => setOpen(open === "domains" ? null : "domains")}
              onPick={(slug) =>
                navWith({ domains: toggleValue(selection.domains, slug) })}
              onClear={() => navWith({ domains: [] })}
            />
            <MultiSelect
              label="Stack"
              options={stack}
              selected={selection.stack}
              open={open === "stack"}
              onTrigger={() => setOpen(open === "stack" ? null : "stack")}
              onPick={(slug) =>
                navWith({ stack: toggleValue(selection.stack, slug) })}
              onClear={() => navWith({ stack: [] })}
            />
            <MultiSelect
              label="Year"
              options={yearTerms}
              selected={selection.years.map(String)}
              open={open === "years"}
              onTrigger={() => setOpen(open === "years" ? null : "years")}
              onPick={(slug) =>
                navWith({ years: toggleValue(selection.years, Number(slug)) })}
              onClear={() => navWith({ years: [] })}
            />
            {totalSelected > 0 && (
              <a class="flt-clear" href="/work/">
                Clear ({totalSelected})
              </a>
            )}
          </div>
          <span class="flt-count">
            {shown === total ? `${total} projects` : `${shown} of ${total}`}
          </span>
        </div>
      </div>
    </section>
  );
}
