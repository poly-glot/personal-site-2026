import { useEffect, useRef, useState } from "preact/hooks";
import type { Term } from "@/data/taxonomy.ts";
import type { BlogFilter as BlogFilterState } from "@/src/types.ts";
import { canonicalBlogPath } from "@/data/taxonomy.ts";
import MultiSelect from "@/components/MultiSelect/MultiSelect.tsx";

interface BlogFilterProps {
  topics: Term[];
  years: number[];
  reads: Term[];
  filter: BlogFilterState;
  shown: number;
  total: number;
  page: number;
  pageCount: number;
}

type Facet = "topics" | "years" | "reads";

function toggleValue<T>(values: T[], value: T): T[] {
  return values.includes(value)
    ? values.filter((v) => v !== value)
    : [...values, value];
}

function go(href: string) {
  globalThis.location.assign(href);
}

export default function BlogFilter(
  { topics, years, reads, filter, shown, total, page, pageCount }:
    BlogFilterProps,
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

  const navWith = (patch: Partial<BlogFilterState>) =>
    go(canonicalBlogPath({ ...filter, page: 1, ...patch }));

  const totalSelected = filter.topics.length + filter.years.length +
    filter.reads.length;

  const yearTerms: Term[] = years.map((y) => ({
    label: String(y),
    slug: String(y),
  }));

  return (
    <section class="flt-bar" aria-label="Filter writing">
      <div class="flt-inner" ref={ref}>
        <div class="flt-row">
          <div class="flt-selects">
            <MultiSelect
              label="Topic"
              options={topics}
              selected={filter.topics}
              open={open === "topics"}
              onTrigger={() => setOpen(open === "topics" ? null : "topics")}
              onPick={(slug) =>
                navWith({ topics: toggleValue(filter.topics, slug) })}
              onClear={() => navWith({ topics: [] })}
            />
            <MultiSelect
              label="Year"
              options={yearTerms}
              selected={filter.years.map(String)}
              open={open === "years"}
              onTrigger={() => setOpen(open === "years" ? null : "years")}
              onPick={(slug) =>
                navWith({ years: toggleValue(filter.years, Number(slug)) })}
              onClear={() => navWith({ years: [] })}
            />
            <MultiSelect
              label="Read time"
              options={reads}
              selected={filter.reads}
              open={open === "reads"}
              onTrigger={() => setOpen(open === "reads" ? null : "reads")}
              onPick={(slug) =>
                navWith({ reads: toggleValue(filter.reads, slug) })}
              onClear={() => navWith({ reads: [] })}
            />
            {totalSelected > 0 && (
              <a class="flt-clear" href="/blog/">
                Clear ({totalSelected})
              </a>
            )}
          </div>
          <span class="flt-count">
            {shown === total ? `${total} essays` : `${shown} of ${total}`}
            {pageCount > 1 ? ` · page ${page}/${pageCount}` : ""}
          </span>
        </div>
      </div>
    </section>
  );
}
