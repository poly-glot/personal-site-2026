import { assertEquals } from "@std/assert";
import { cacheControlFor, IMMUTABLE, REVALIDATE } from "@/utils/cache.ts";

Deno.test("hashed build assets are immutable for a year", () => {
  assertEquals(
    cacheControlFor("/assets/client-entry-BHDOkTBM.js"),
    IMMUTABLE,
  );
  assertEquals(
    cacheControlFor("/assets/server-entry-D1yWvLP3.css"),
    IMMUTABLE,
  );
});

Deno.test("bundled @fontsource woff2 under /assets is immutable for a year", () => {
  assertEquals(
    cacheControlFor("/assets/rozha-one-400-Cq3K7m.woff2"),
    IMMUTABLE,
  );
});

Deno.test("html routes are short-lived with shared revalidation", () => {
  assertEquals(cacheControlFor("/"), REVALIDATE);
  assertEquals(cacheControlFor("/blog/"), REVALIDATE);
  assertEquals(cacheControlFor("/work/domain/cms-news/2/"), REVALIDATE);
  assertEquals(cacheControlFor("/about"), REVALIDATE);
});

Deno.test("constants match the spec policy verbatim", () => {
  assertEquals(IMMUTABLE, "public, max-age=31536000, immutable");
  assertEquals(
    REVALIDATE,
    "public, max-age=0, s-maxage=600, stale-while-revalidate=86400",
  );
});
