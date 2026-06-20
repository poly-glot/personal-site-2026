import { assertEquals } from "@std/assert";
import {
  filterPosts,
  filterProjects,
  getAllPosts,
  getAllProjects,
  getPost,
  getPostNeighbors,
  getProject,
  paginate,
  workVocab,
} from "@/data/content.ts";
import { EMPTY_BLOG_FILTER } from "@/data/taxonomy.ts";
import type { BlogFilter } from "@/src/types.ts";

const topicFilter = (...topics: string[]): BlogFilter => ({
  topics,
  years: [],
  reads: [],
  page: 1,
});

Deno.test("getAllPosts is date-descending", () => {
  const posts = getAllPosts();
  assertEquals(posts[0].id, "adr-as-build-gates");
  assertEquals(posts[posts.length - 1].id, "editorial-design-systems");

  for (let i = 1; i < posts.length; i++) {
    const prev = new Date(posts[i - 1].date).getTime();
    const cur = new Date(posts[i].date).getTime();
    assertEquals(prev >= cur, true);
  }
});

Deno.test("getPost returns post or null", () => {
  assertEquals(
    getPost("adr-as-build-gates")?.title,
    "Turning ADRs into build-time gates",
  );
  assertEquals(getPost("missing"), null);
});

Deno.test("getPostNeighbors walks date-desc order", () => {
  const posts = getAllPosts();
  const firstId = posts[0].id;
  const secondId = posts[1].id;
  const lastId = posts[posts.length - 1].id;

  assertEquals(getPostNeighbors(firstId).prev, null);
  assertEquals(getPostNeighbors(firstId).next?.id, secondId);
  assertEquals(getPostNeighbors(secondId).prev?.id, firstId);
  assertEquals(getPostNeighbors(lastId).next, null);
});

Deno.test("toc is derived from h2s", () => {
  const found = getPost("adr-as-build-gates")!;
  assertEquals(found.toc[0], { id: "why-adrs-rot", text: "Why ADRs rot" });
});

Deno.test("filterPosts: empty is all (date desc), OR within topics", () => {
  const all = getAllPosts();
  assertEquals(filterPosts(all, EMPTY_BLOG_FILTER).length, all.length);
  assertEquals(
    filterPosts(all, EMPTY_BLOG_FILTER).map((p) => p.id),
    all.map((p) => p.id),
  );

  const arch = filterPosts(all, topicFilter("architecture"));
  for (const p of arch) {
    assertEquals(p.topics.some((t) => t === "Architecture"), true);
  }
  assertEquals(arch.length > 0, true);

  const multi = filterPosts(all, topicFilter("architecture", "career"));
  assertEquals(multi.length > arch.length, true);

  assertEquals(filterPosts(all, topicFilter("devex")).length > 0, true);
});

Deno.test("getAllProjects is source order; getProject by id", () => {
  const projects = getAllProjects();
  assertEquals(projects[0].id, "amazing-landing");
  assertEquals(getProject("openguessr")?.name, "OpenGuessr");
  assertEquals(getProject("nope"), null);
});

Deno.test("workVocab derives sorted stack and ascending years", () => {
  const v = workVocab();
  assertEquals(Array.isArray(v.stack), true);
  assertEquals(v.stack.length > 0, true);
  for (let i = 1; i < v.years.length; i++) {
    assertEquals(v.years[i] >= v.years[i - 1], true);
  }
});

Deno.test("filterProjects: AND across facets, OR within a facet", () => {
  const projects = getAllProjects();
  const all = { domains: [], stack: [], years: [], page: 1 };
  const allProjects = filterProjects(projects, all);
  assertEquals(allProjects.length, projects.length);

  const cms = filterProjects(projects, { ...all, domains: ["cms"] });
  for (const p of cms) {
    assertEquals(p.domains.some((d) => d === "CMS"), true);
  }
  assertEquals(cms.length > 0, true);
});

Deno.test("paginate is non-clamping: slices, counts pages, empty when out of range", () => {
  const items = [1, 2, 3, 4, 5];
  assertEquals(paginate(items, 1, 2), { items: [1, 2], page: 1, pageCount: 3 });
  assertEquals(paginate(items, 3, 2), { items: [5], page: 3, pageCount: 3 });
  assertEquals(paginate(items, 4, 2), { items: [], page: 4, pageCount: 3 });
  assertEquals(paginate(items, 0, 2), { items: [], page: 0, pageCount: 3 });
  assertEquals(paginate([], 1, 4), { items: [], page: 1, pageCount: 1 });
});

Deno.test("getAllPosts returns posts sorted by date descending", () => {
  const posts = getAllPosts();
  for (let i = 1; i < posts.length; i++) {
    const prev = new Date(posts[i - 1].date).getTime();
    const cur = new Date(posts[i].date).getTime();
    assertEquals(prev >= cur, true);
  }
});

Deno.test("getPost returns a post for a known id", () => {
  const found = getPost("adr-as-build-gates");
  assertEquals(found?.id, "adr-as-build-gates");
  assertEquals(found!.toc.length > 0, true);
});

Deno.test("getPost returns null for an unknown id", () => {
  assertEquals(getPost("does-not-exist"), null);
});

Deno.test("getPostNeighbors walks date-descending order", () => {
  const posts = getAllPosts();
  const mid = posts[1].id;
  const { prev, next } = getPostNeighbors(mid);
  assertEquals(prev?.id, posts[0].id);
  assertEquals(next?.id, posts[2].id);
});

Deno.test("getPostNeighbors clamps at the ends", () => {
  const posts = getAllPosts();
  const first = getPostNeighbors(posts[0].id);
  assertEquals(first.prev, null);
  assertEquals(first.next?.id, posts[1].id);
  const last = getPostNeighbors(posts[posts.length - 1].id);
  assertEquals(last.next, null);
});

Deno.test("filterPosts with empty topics returns all, date descending", () => {
  assertEquals(
    filterPosts(getAllPosts(), EMPTY_BLOG_FILTER).length,
    getAllPosts().length,
  );
});

Deno.test("filterPosts ORs within topics", () => {
  const result = filterPosts(getAllPosts(), topicFilter("architecture"));
  for (const p of result) {
    assertEquals(p.topics.includes("Architecture"), true);
  }
  assertEquals(result.length > 0, true);
});

Deno.test("toc extracts h2 entries with the migrated ids, in order", () => {
  const found = getPost("adr-as-build-gates")!;
  assertEquals(found.toc[0], { id: "why-adrs-rot", text: "Why ADRs rot" });
  assertEquals(found.toc[1], {
    id: "three-questions",
    text: "Three questions during review",
  });
  assertEquals(found.toc[2], {
    id: "worked-example",
    text: "A worked example: ADR-027",
  });
});

Deno.test("paginate slices and reports page metadata, non-clamping", () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const p2 = paginate(items, 2, 4);
  assertEquals(p2.items, [5, 6, 7, 8]);
  assertEquals(p2.page, 2);
  assertEquals(p2.pageCount, 3);
});

Deno.test("paginate returns an empty slice for an out-of-range page", () => {
  const items = [1, 2, 3];
  const p = paginate(items, 9, 2);
  assertEquals(p.page, 9);
  assertEquals(p.pageCount, 2);
  assertEquals(p.items, []);
});
