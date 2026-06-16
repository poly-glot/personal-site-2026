import { assertEquals } from "@std/assert";
import {
  BLOG_PAGE_SIZE,
  canonicalBlogPath,
  parseBlogSegments,
} from "@/data/taxonomy.ts";
import type { BlogVocab } from "@/src/types.ts";
import { resolveBlog } from "./_resolve.ts";

const BLOG_VOCAB: BlogVocab = { years: [2025, 2026] };

function simulateGet(filter: string): {
  status: number;
  location?: string;
  data?: unknown;
} {
  const segments = filter.split("/").filter(Boolean);
  const result = resolveBlog(segments);

  if (result === "notfound") return { status: 404 };
  if ("redirect" in result) return { status: 301, location: result.redirect };

  return { status: 200, data: result };
}

Deno.test("GET /blog/ returns 200 list", () => {
  const res = simulateGet("");
  assertEquals(res.status, 200);
  const view = (res.data as { view: { kind: string } }).view;
  assertEquals(view.kind, "list");
});

Deno.test("GET non-canonical topic order 301s to canonical", () => {
  const res = simulateGet("topic/platform-architecture/1/");
  assertEquals(res.status, 301);
  assertEquals(res.location, "/blog/topic/architecture-platform/1/");
});

Deno.test("GET filtered topic missing page 301s to canonical page 1", () => {
  const res = simulateGet("topic/architecture/");
  assertEquals(res.status, 301);
  assertEquals(res.location, "/blog/topic/architecture/1/");
});

Deno.test("GET unknown topic returns 404", () => {
  assertEquals(simulateGet("topic/nonsense/1/").status, 404);
});

Deno.test("GET out-of-range page returns 404", () => {
  assertEquals(simulateGet("999/").status, 404);
});

Deno.test("GET canonical filtered URL returns 200", () => {
  const res = simulateGet("topic/architecture/1/");
  assertEquals(res.status, 200);
  const view = (res.data as { view: { kind: string } }).view;
  assertEquals(view.kind, "list");
});

Deno.test("GET year + read facets return 200 list", () => {
  const res = simulateGet("year/2026/read/deep/1/");
  assertEquals(res.status, 200);
  const view = (res.data as { view: { kind: string } }).view;
  assertEquals(view.kind, "list");
});

Deno.test("GET known post returns 200 with detail data and TOC", () => {
  const res = simulateGet("adr-as-build-gates/");
  assertEquals(res.status, 200);
  const view = (res.data as {
    view: { kind: string; toc: { id: string }[] };
  }).view;
  assertEquals(view.kind, "detail");
  assertEquals(view.toc.some((e) => e.id === "why-adrs-rot"), true);
  assertEquals(view.toc.some((e) => e.id === "three-questions"), true);
});

Deno.test("GET unknown post returns 404", () => {
  assertEquals(simulateGet("not-a-real-post/").status, 404);
});

Deno.test("GET middle post has both prev and next neighbors", () => {
  const res = simulateGet("strangler-without-pain/");
  assertEquals(res.status, 200);
  const view = (res.data as {
    view: {
      kind: string;
      neighbors: {
        prev: { id: string } | null;
        next: { id: string } | null;
      };
    };
  }).view;
  assertEquals(view.kind, "detail");
  assertEquals(view.neighbors.prev !== null, true);
  assertEquals(view.neighbors.next !== null, true);
});

Deno.test("GET /blog/ list has BLOG_PAGE_SIZE posts on page 1", () => {
  const res = simulateGet("");
  const view = (res.data as { view: { posts: unknown[] } }).view;
  assertEquals(view.posts.length, BLOG_PAGE_SIZE);
});

Deno.test("parseBlogSegments notfound for unknown facet value", () => {
  assertEquals(
    parseBlogSegments(["topic", "nonsense", "1"], BLOG_VOCAB),
    "notfound",
  );
});

Deno.test("canonicalBlogPath produces the redirect target for non-canonical input", () => {
  assertEquals(
    canonicalBlogPath({
      topics: ["platform", "architecture"],
      years: [],
      reads: [],
      page: 1,
    }),
    "/blog/topic/architecture-platform/1/",
  );
});
