import { assertEquals } from "@std/assert";
import {
  cookiePersisted,
  detailRoutes,
  overflowReport,
  ROUTES,
  shotName,
  VIEWPORTS,
} from "@/scripts/visual-config.ts";

Deno.test("VIEWPORTS are the three spec sizes in ascending width", () => {
  assertEquals(VIEWPORTS.map((v) => v.width), [375, 768, 1280]);
  assertEquals(VIEWPORTS.map((v) => v.label), ["mobile", "tablet", "desktop"]);
  for (const v of VIEWPORTS) {
    assertEquals(typeof v.height, "number");
  }
});

Deno.test("static ROUTES are canonical trailing-slash paths", () => {
  assertEquals(ROUTES, [
    "/",
    "/blog/",
    "/blog/architecture-platform-1/",
    "/work/",
    "/work/domain/cms/",
    "/about",
    "/design-system",
  ]);
});

Deno.test("shotName slugifies the route and joins the viewport label", () => {
  assertEquals(shotName("/", "desktop"), "home__desktop.png");
  assertEquals(
    shotName("/blog/architecture-platform-1/", "mobile"),
    "blog-architecture-platform-1__mobile.png",
  );
  assertEquals(shotName("/about", "tablet"), "about__tablet.png");
  assertEquals(
    shotName("/work/domain/cms/", "desktop"),
    "work-domain-cms__desktop.png",
  );
});

Deno.test("overflowReport flags scrollWidth > clientWidth", () => {
  assertEquals(overflowReport(375, 375).ok, true);
  assertEquals(overflowReport(375, 390).ok, false);
  assertEquals(overflowReport(1280, 1281).overflowPx, 1);
  assertEquals(overflowReport(1280, 1280).overflowPx, 0);
});

Deno.test("cookiePersisted requires theme cookie to match after reload", () => {
  assertEquals(cookiePersisted("dark", "dark"), true);
  assertEquals(cookiePersisted("dark", "light"), false);
  assertEquals(cookiePersisted("dark", null), false);
  assertEquals(cookiePersisted("light", "light"), true);
});

Deno.test("detailRoutes builds canonical blog/work detail paths", () => {
  assertEquals(
    detailRoutes("the-shape-of-platforms", "storyteq-cms"),
    ["/blog/the-shape-of-platforms/", "/work/storyteq-cms/"],
  );
});

Deno.test("detailRoutes drops a missing id without inventing one", () => {
  assertEquals(detailRoutes(null, "storyteq-cms"), ["/work/storyteq-cms/"]);
  assertEquals(detailRoutes("the-shape-of-platforms", null), [
    "/blog/the-shape-of-platforms/",
  ]);
  assertEquals(detailRoutes(null, null), []);
});
