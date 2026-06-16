import { assertEquals, assertThrows } from "@std/assert";
import {
  assertUnambiguous,
  BLOG_PAGE_SIZE,
  BLOG_TOPICS,
  labelForTopic,
  partitionSlugs,
  slugify,
  WORK_DOMAINS,
  WORK_PAGE_SIZE,
} from "@/data/taxonomy.ts";

Deno.test("slugify kebab-cases and strips punctuation", () => {
  assertEquals(slugify("Engineering Culture"), "engineering-culture");
  assertEquals(slugify("E-commerce"), "e-commerce");
  assertEquals(slugify("High End Campaigns"), "high-end-campaigns");
  assertEquals(slugify(".NET"), "net");
  assertEquals(slugify("C#"), "c");
  assertEquals(slugify("  Open  Source  "), "open-source");
});

Deno.test("page sizes match the spec", () => {
  assertEquals(BLOG_PAGE_SIZE, 4);
  assertEquals(WORK_PAGE_SIZE, 50);
});

Deno.test("blog topics are the 8 fixed terms with kebab slugs", () => {
  assertEquals(BLOG_TOPICS.length, 8);
  assertEquals(BLOG_TOPICS.map((t) => t.slug), [
    "architecture",
    "engineering-culture",
    "platform",
    "performance",
    "career",
    "open-source",
    "devex",
    "process",
  ]);
  for (const term of BLOG_TOPICS) {
    assertEquals(term.slug, slugify(term.label));
  }
});

Deno.test("work domains are the 10 fixed terms with kebab slugs", () => {
  assertEquals(WORK_DOMAINS.length, 10);
  assertEquals(WORK_DOMAINS.map((t) => t.slug), [
    "directory",
    "news",
    "e-commerce",
    "mobile",
    "automotive",
    "dam",
    "high-end-campaigns",
    "reporting",
    "proxy",
    "cms",
  ]);
  for (const term of WORK_DOMAINS) {
    assertEquals(term.slug, slugify(term.label));
  }
});

Deno.test("labelForTopic maps slug back to label, null for unknown", () => {
  assertEquals(labelForTopic("open-source"), "Open Source");
  assertEquals(labelForTopic("architecture"), "Architecture");
  assertEquals(labelForTopic("nope"), null);
});

Deno.test("partitionSlugs greedy longest-match", () => {
  const vocab = ["c", "css", "e-commerce", "cms", "open-source", "devex"];
  assertEquals(partitionSlugs("c-css", vocab), ["c", "css"]);
  assertEquals(partitionSlugs("css-c", vocab), ["css", "c"]);
  assertEquals(partitionSlugs("e-commerce-cms", vocab), ["e-commerce", "cms"]);
  assertEquals(partitionSlugs("open-source-devex", vocab), [
    "open-source",
    "devex",
  ]);
  assertEquals(partitionSlugs("unknown", vocab), null);
  assertEquals(partitionSlugs("c-unknown", vocab), null);
});

Deno.test("assertUnambiguous passes the real vocabularies", () => {
  assertUnambiguous(BLOG_TOPICS.map((t) => t.slug), "blog topics");
  assertUnambiguous(WORK_DOMAINS.map((t) => t.slug), "work domains");
});

Deno.test("assertUnambiguous throws when a join mis-partitions back", () => {
  assertThrows(
    () => assertUnambiguous(["a", "a-b", "b"], "broken"),
    Error,
    "broken",
  );
});

import {
  type BlogVocab,
  canonicalBlogPath,
  canonicalWorkPath,
  EMPTY_BLOG_FILTER,
  parseBlogSegments,
  parseWorkSegments,
  type WorkVocab,
} from "@/data/taxonomy.ts";

const BLOG_VOCAB: BlogVocab = { years: [2024, 2025, 2026] };

const VOCAB: WorkVocab = {
  domains: WORK_DOMAINS.map((t) => t.slug),
  stack: ["deno", "preact", "java", "react"],
  years: [2023, 2024, 2025],
};

Deno.test("canonicalBlogPath builds the facet forms", () => {
  assertEquals(canonicalBlogPath(EMPTY_BLOG_FILTER), "/blog/");
  assertEquals(
    canonicalBlogPath({ topics: [], years: [], reads: [], page: 2 }),
    "/blog/2/",
  );
  assertEquals(
    canonicalBlogPath({
      topics: ["platform", "architecture"],
      years: [],
      reads: [],
      page: 1,
    }),
    "/blog/topic/architecture-platform/1/",
  );
  assertEquals(
    canonicalBlogPath({
      topics: ["architecture"],
      years: [2026],
      reads: ["deep"],
      page: 2,
    }),
    "/blog/topic/architecture/year/2026/read/deep/2/",
  );
});

Deno.test("parseBlogSegments: empty path is unfiltered page 1, canonical", () => {
  assertEquals(parseBlogSegments([], BLOG_VOCAB), {
    filter: EMPTY_BLOG_FILTER,
    canonical: "/blog/",
  });
});

Deno.test("parseBlogSegments: bare page number", () => {
  assertEquals(parseBlogSegments(["2"], BLOG_VOCAB), {
    filter: { topics: [], years: [], reads: [], page: 2 },
    canonical: "/blog/2/",
  });
});

Deno.test("parseBlogSegments: filtered topic, already canonical", () => {
  assertEquals(
    parseBlogSegments(["topic", "architecture-platform", "1"], BLOG_VOCAB),
    {
      filter: {
        topics: ["architecture", "platform"],
        years: [],
        reads: [],
        page: 1,
      },
      canonical: "/blog/topic/architecture-platform/1/",
    },
  );
});

Deno.test("parseBlogSegments: unsorted topic order canonicalizes (caller 301s)", () => {
  const r = parseBlogSegments(
    ["topic", "platform-architecture", "1"],
    BLOG_VOCAB,
  );
  assertEquals(r, {
    filter: {
      topics: ["architecture", "platform"],
      years: [],
      reads: [],
      page: 1,
    },
    canonical: "/blog/topic/architecture-platform/1/",
  });
});

Deno.test("parseBlogSegments: all three facets round-trip", () => {
  const segs = "topic/architecture/year/2026/read/deep/2".split("/");
  assertEquals(parseBlogSegments(segs, BLOG_VOCAB), {
    filter: {
      topics: ["architecture"],
      years: [2026],
      reads: ["deep"],
      page: 2,
    },
    canonical: "/blog/topic/architecture/year/2026/read/deep/2/",
  });
});

Deno.test("parseBlogSegments: wrong facet order canonicalizes (caller 301s)", () => {
  const r = parseBlogSegments(
    "read/deep/topic/architecture/1".split("/"),
    BLOG_VOCAB,
  );
  assertEquals(r, {
    filter: { topics: ["architecture"], years: [], reads: ["deep"], page: 1 },
    canonical: "/blog/topic/architecture/read/deep/1/",
  });
});

Deno.test("parseBlogSegments: omitted page canonicalizes to page 1 (caller 301s)", () => {
  const r = parseBlogSegments(["topic", "architecture-platform"], BLOG_VOCAB);
  assertEquals(r, {
    filter: {
      topics: ["architecture", "platform"],
      years: [],
      reads: [],
      page: 1,
    },
    canonical: "/blog/topic/architecture-platform/1/",
  });
});

Deno.test("parseBlogSegments: unknown facet/value and bad page are notfound", () => {
  assertEquals(
    parseBlogSegments(["topic", "nope", "1"], BLOG_VOCAB),
    "notfound",
  );
  assertEquals(
    parseBlogSegments(["year", "1999", "1"], BLOG_VOCAB),
    "notfound",
  );
  assertEquals(
    parseBlogSegments(["read", "epic", "1"], BLOG_VOCAB),
    "notfound",
  );
  assertEquals(
    parseBlogSegments(["color", "red", "1"], BLOG_VOCAB),
    "notfound",
  );
  assertEquals(parseBlogSegments(["0"], BLOG_VOCAB), "notfound");
  assertEquals(
    parseBlogSegments(["topic", "architecture", "0"], BLOG_VOCAB),
    "notfound",
  );
});

Deno.test("canonicalWorkPath builds the spec forms", () => {
  assertEquals(
    canonicalWorkPath({ domains: [], stack: [], years: [], page: 1 }),
    "/work/",
  );
  assertEquals(
    canonicalWorkPath({ domains: [], stack: [], years: [], page: 2 }),
    "/work/2/",
  );
  assertEquals(
    canonicalWorkPath({
      domains: ["news", "cms"],
      stack: [],
      years: [],
      page: 2,
    }),
    "/work/domain/cms-news/2/",
  );
  assertEquals(
    canonicalWorkPath({
      domains: ["cms"],
      stack: ["preact", "deno"],
      years: [2025, 2024],
      page: 1,
    }),
    "/work/domain/cms/stack/deno-preact/year/2024-2025/1/",
  );
});

Deno.test("parseWorkSegments: empty path", () => {
  assertEquals(parseWorkSegments([], VOCAB), {
    selection: { domains: [], stack: [], years: [], page: 1 },
    canonical: "/work/",
  });
});

Deno.test("parseWorkSegments: bare page", () => {
  assertEquals(parseWorkSegments(["2"], VOCAB), {
    selection: { domains: [], stack: [], years: [], page: 2 },
    canonical: "/work/2/",
  });
});

Deno.test("parseWorkSegments: full canonical round-trips", () => {
  const segs = "domain/cms/stack/deno-preact/year/2024-2025/1".split("/");
  assertEquals(parseWorkSegments(segs, VOCAB), {
    selection: {
      domains: ["cms"],
      stack: ["deno", "preact"],
      years: [2024, 2025],
      page: 1,
    },
    canonical: "/work/domain/cms/stack/deno-preact/year/2024-2025/1/",
  });
});

Deno.test("parseWorkSegments: unsorted values canonicalize", () => {
  const r = parseWorkSegments("domain/news-cms/2".split("/"), VOCAB);
  assertEquals(r, {
    selection: { domains: ["cms", "news"], stack: [], years: [], page: 2 },
    canonical: "/work/domain/cms-news/2/",
  });
});

Deno.test("parseWorkSegments: wrong facet order canonicalizes (caller 301s)", () => {
  const r = parseWorkSegments("stack/deno/domain/cms/1".split("/"), VOCAB);
  assertEquals(r, {
    selection: { domains: ["cms"], stack: ["deno"], years: [], page: 1 },
    canonical: "/work/domain/cms/stack/deno/1/",
  });
});

Deno.test("parseWorkSegments: omitted trailing page canonicalizes to page 1 (caller 301s)", () => {
  const r = parseWorkSegments("domain/cms".split("/"), VOCAB);
  assertEquals(r, {
    selection: { domains: ["cms"], stack: [], years: [], page: 1 },
    canonical: "/work/domain/cms/1/",
  });
});

Deno.test("parseWorkSegments: unknown value and facet are notfound", () => {
  assertEquals(
    parseWorkSegments("domain/nope/1".split("/"), VOCAB),
    "notfound",
  );
  assertEquals(parseWorkSegments("color/red/1".split("/"), VOCAB), "notfound");
  assertEquals(parseWorkSegments("domain/cms/0".split("/"), VOCAB), "notfound");
});
