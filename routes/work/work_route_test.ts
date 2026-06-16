import { assert, assertEquals } from "@std/assert";
import { canonicalWorkPath } from "@/data/taxonomy.ts";
import { resolveWork } from "./_resolve.ts";

function simulateGet(filter: string): {
  status: number;
  location?: string;
  data?: unknown;
} {
  const segments = filter.split("/").filter(Boolean);
  const result = resolveWork(segments);

  if (result === "notfound") return { status: 404 };
  if ("redirect" in result) return { status: 301, location: result.redirect };

  return { status: 200, data: result };
}

Deno.test("work index page 1 renders 200", () => {
  const res = simulateGet("");
  assertEquals(res.status, 200);
  assertEquals((res.data as { view: string }).view, "list");
});

Deno.test("unsorted domain values 301 to sorted canonical", () => {
  const res = simulateGet("domain/news-cms/1/");
  assertEquals(res.status, 301);
  assertEquals(res.location, "/work/domain/cms-news/1/");
});

Deno.test("missing trailing page segment on a filtered url 301s to canonical", () => {
  const res = simulateGet("domain/cms");
  assertEquals(res.status, 301);
  assertEquals(res.location, "/work/domain/cms/1/");
});

Deno.test("wrong facet order 301s to fixed domain-stack-year order", () => {
  const res = simulateGet("stack/react/domain/cms/1/");
  assertEquals(res.status, 301);
  assertEquals(res.location, "/work/domain/cms/stack/react/1/");
});

Deno.test("unknown facet value 404s", () => {
  assertEquals(simulateGet("domain/not-a-domain/1/").status, 404);
});

Deno.test("out-of-range page 404s", () => {
  assertEquals(simulateGet("999/").status, 404);
});

Deno.test("known case study returns detail view with project data", () => {
  const res = simulateGet("openguessr/");
  assertEquals(res.status, 200);
  const data = res.data as { view: string; project: { name: string } };
  assertEquals(data.view, "detail");
  assertEquals(data.project.name, "OpenGuessr");
});

Deno.test("openguessr case study has live-site href", () => {
  const res = simulateGet("openguessr/");
  const data = res.data as { project: { href: string } };
  assertEquals(data.project.href, "https://openguessr.junaid.guru/");
});

Deno.test("internal-only case study has placeholder href", () => {
  const res = simulateGet("luma-dam/");
  assertEquals(res.status, 200);
  const data = res.data as { project: { href: string } };
  assert(data.project.href === "#" || data.project.href === "");
});

Deno.test("unknown single segment is neither a case study nor a filter and 404s", () => {
  assertEquals(simulateGet("not-a-project/").status, 404);
});

Deno.test("canonicalWorkPath produces valid domain+stack url", () => {
  assertEquals(
    canonicalWorkPath({
      domains: ["cms"],
      stack: ["deno"],
      years: [],
      page: 1,
    }),
    "/work/domain/cms/stack/deno/1/",
  );
});
