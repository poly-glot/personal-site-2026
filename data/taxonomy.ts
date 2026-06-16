import type {
  BlogFilter,
  BlogVocab,
  Term,
  WorkSelection,
  WorkVocab,
} from "@/src/types.ts";

export type { BlogVocab, Term, WorkVocab } from "@/src/types.ts";

export const BLOG_PAGE_SIZE = 4;
export const WORK_PAGE_SIZE = 50;

export const EMPTY_WORK_SELECTION: WorkSelection = {
  domains: [],
  stack: [],
  years: [],
  page: 1,
};

export const EMPTY_BLOG_FILTER: BlogFilter = {
  topics: [],
  years: [],
  reads: [],
  page: 1,
};

export function slugify(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function term(label: string): Term {
  return { label, slug: slugify(label) };
}

export const BLOG_TOPICS: readonly Term[] = [
  term("Architecture"),
  term("Engineering Culture"),
  term("Platform"),
  term("Performance"),
  term("Career"),
  term("Open Source"),
  term("DevEx"),
  term("Process"),
];

export const BLOG_READS: readonly Term[] = [
  { label: "Quick (≤7m)", slug: "quick" },
  { label: "Standard (8–11m)", slug: "standard" },
  { label: "Deep (12m+)", slug: "deep" },
];

export function readBucketSlug(readMin: number): string {
  if (readMin <= 7) return "quick";
  if (readMin <= 11) return "standard";
  return "deep";
}

export const WORK_DOMAINS: readonly Term[] = [
  term("Directory"),
  term("News"),
  term("E-commerce"),
  term("Mobile"),
  term("Automotive"),
  term("DAM"),
  term("High End Campaigns"),
  term("Reporting"),
  term("Proxy"),
  term("CMS"),
];

export function labelForTopic(slug: string): string | null {
  return BLOG_TOPICS.find((t) => t.slug === slug)?.label ?? null;
}

export function partitionSlugs(
  joined: string,
  vocab: readonly string[],
): string[] | null {
  const tokens = joined.split("-");
  const byLengthDesc = [...vocab].sort(
    (a, b) => b.split("-").length - a.split("-").length,
  );

  const out: string[] = [];
  let i = 0;

  while (i < tokens.length) {
    const matched = byLengthDesc.find((slug) => {
      const parts = slug.split("-");
      return parts.length <= tokens.length - i &&
        parts.every((part, k) => tokens[i + k] === part);
    });

    if (!matched) return null;

    out.push(matched);
    i += matched.split("-").length;
  }

  return out;
}

export function assertUnambiguous(
  vocab: readonly string[],
  name: string,
): void {
  for (const a of vocab) {
    for (const b of vocab) {
      if (a === b) continue;

      const joined = `${a}-${b}`;
      const parts = partitionSlugs(joined, vocab);

      const roundTrips = parts !== null &&
        parts.length === 2 && parts[0] === a && parts[1] === b;

      if (!roundTrips) {
        throw new Error(
          `${name}: vocabulary cannot partition "${joined}" back to ["${a}", "${b}"] — slugs are not unambiguously partitionable`,
        );
      }
    }
  }
}

function parsePage(segment: string): number | null {
  if (!/^\d+$/.test(segment)) return null;

  const page = Number(segment);
  return page >= 1 ? page : null;
}

const BLOG_READ_SLUGS = BLOG_READS.map((r) => r.slug);
const BLOG_TOPIC_SLUGS = BLOG_TOPICS.map((t) => t.slug);

export function canonicalBlogPath(filter: BlogFilter): string {
  const facets: string[] = [];

  if (filter.topics.length > 0) {
    facets.push("topic", [...filter.topics].sort().join("-"));
  }
  if (filter.years.length > 0) {
    facets.push("year", [...filter.years].sort((a, b) => a - b).join("-"));
  }
  if (filter.reads.length > 0) {
    facets.push("read", [...filter.reads].sort().join("-"));
  }

  if (facets.length === 0) {
    return filter.page <= 1 ? "/blog/" : `/blog/${filter.page}/`;
  }

  return `/blog/${facets.join("/")}/${filter.page}/`;
}

export function parseBlogSegments(
  segments: string[],
  vocab: BlogVocab,
): { filter: BlogFilter; canonical: string } | "notfound" {
  if (segments.length === 0) {
    return { filter: EMPTY_BLOG_FILTER, canonical: "/blog/" };
  }

  const order = ["topic", "year", "read"] as const;
  const hasTrailingPage = segments.length % 2 === 1;

  let page = 1;
  if (hasTrailingPage) {
    const parsed = parsePage(segments[segments.length - 1]);
    if (parsed === null) return "notfound";
    page = parsed;
  }

  const facetSegments = hasTrailingPage ? segments.slice(0, -1) : segments;

  const filter: BlogFilter = { topics: [], years: [], reads: [], page };

  for (let i = 0; i < facetSegments.length; i += 2) {
    const facet = facetSegments[i];
    const value = facetSegments[i + 1];

    if (!order.includes(facet as typeof order[number])) return "notfound";

    if (facet === "topic") {
      const parts = partitionSlugs(value, BLOG_TOPIC_SLUGS);
      if (parts === null) return "notfound";
      filter.topics = [...new Set(parts)].sort();
    } else if (facet === "year") {
      const years = parseYears(value);
      if (years === null || !years.every((y) => vocab.years.includes(y))) {
        return "notfound";
      }
      filter.years = years;
    } else {
      const parts = partitionSlugs(value, BLOG_READ_SLUGS);
      if (parts === null) return "notfound";
      filter.reads = [...new Set(parts)].sort();
    }
  }

  return { filter, canonical: canonicalBlogPath(filter) };
}

export function canonicalWorkPath(sel: WorkSelection): string {
  const facets: string[] = [];

  if (sel.domains.length > 0) {
    facets.push("domain", [...sel.domains].sort().join("-"));
  }
  if (sel.stack.length > 0) {
    facets.push("stack", [...sel.stack].sort().join("-"));
  }
  if (sel.years.length > 0) {
    facets.push("year", [...sel.years].sort((a, b) => a - b).join("-"));
  }

  if (facets.length === 0) {
    return sel.page <= 1 ? "/work/" : `/work/${sel.page}/`;
  }

  return `/work/${facets.join("/")}/${sel.page}/`;
}

function parseYears(joined: string): number[] | null {
  const years = joined.split("-").map((v) => parsePage(v));
  if (years.some((y) => y === null)) return null;
  return [...new Set(years as number[])].sort((a, b) => a - b);
}

export function parseWorkSegments(
  segments: string[],
  vocab: WorkVocab,
): { selection: WorkSelection; canonical: string } | "notfound" {
  if (segments.length === 0) {
    return {
      selection: { domains: [], stack: [], years: [], page: 1 },
      canonical: "/work/",
    };
  }

  const order = ["domain", "stack", "year"] as const;
  const hasTrailingPage = segments.length % 2 === 1;

  let page = 1;
  if (hasTrailingPage) {
    const parsed = parsePage(segments[segments.length - 1]);
    if (parsed === null) return "notfound";
    page = parsed;
  }

  const facetSegments = hasTrailingPage ? segments.slice(0, -1) : segments;

  const selection: WorkSelection = {
    domains: [],
    stack: [],
    years: [],
    page,
  };

  for (let i = 0; i < facetSegments.length; i += 2) {
    const facet = facetSegments[i];
    const value = facetSegments[i + 1];

    if (!order.includes(facet as typeof order[number])) return "notfound";

    if (facet === "domain") {
      const parts = partitionSlugs(value, vocab.domains);
      if (parts === null) return "notfound";
      selection.domains = [...new Set(parts)].sort();
    } else if (facet === "stack") {
      const parts = partitionSlugs(value, vocab.stack);
      if (parts === null) return "notfound";
      selection.stack = [...new Set(parts)].sort();
    } else {
      const years = parseYears(value);
      if (years === null || !years.every((y) => vocab.years.includes(y))) {
        return "notfound";
      }
      selection.years = years;
    }
  }

  return { selection, canonical: canonicalWorkPath(selection) };
}
