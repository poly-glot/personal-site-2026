import { assertEquals } from "@std/assert";
import { resolveMeta, SITE_ORIGIN } from "@/src/site.ts";

Deno.test("home meta has site title, description, canonical, website type", () => {
  const m = resolveMeta(new URL(SITE_ORIGIN + "/"));

  assertEquals(m.title, "Junaid Ahmed — Solutions Architect");
  assertEquals(m.canonical, SITE_ORIGIN + "/");
  assertEquals(m.ogType, "website");
  assertEquals(m.description.length > 0, true);
});

Deno.test("trailing slash and bare path resolve the same base", () => {
  const a = resolveMeta(new URL(SITE_ORIGIN + "/about"));
  const b = resolveMeta(new URL(SITE_ORIGIN + "/about/"));

  assertEquals(a.title, b.title);
  assertEquals(a.title, "About — Junaid Ahmed");
});

Deno.test("blog and work subpaths fall back to section defaults", () => {
  const blog = resolveMeta(new URL(SITE_ORIGIN + "/blog/topic/platform/2/"));
  const work = resolveMeta(new URL(SITE_ORIGIN + "/work/domain/cms/1/"));

  assertEquals(blog.title, "Blog — Junaid Ahmed");
  assertEquals(work.title, "Selected Work — Junaid Ahmed");
});

Deno.test("override wins and carries article type and post canonical", () => {
  const m = resolveMeta(new URL(SITE_ORIGIN + "/blog/my-post/"), {
    title: "My Post — Junaid Ahmed",
    description: "A deck.",
    ogType: "article",
  });

  assertEquals(m.title, "My Post — Junaid Ahmed");
  assertEquals(m.ogType, "article");
  assertEquals(m.canonical, SITE_ORIGIN + "/blog/my-post/");
});

Deno.test("design-system is noindex", () => {
  const m = resolveMeta(new URL(SITE_ORIGIN + "/design-system"));

  assertEquals(m.robots, "noindex");
});
