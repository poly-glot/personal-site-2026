import { assertEquals } from "@std/assert";
import { cacheHeaders, IMMUTABLE, REVALIDATE } from "@/utils/cache.ts";

function ctxFor(pathname: string, downstream: Response) {
  return {
    url: new URL(`http://localhost${pathname}`),
    next: () => Promise.resolve(downstream),
  };
}

Deno.test("middleware stamps immutable on hashed /assets responses", async () => {
  const ctx = ctxFor(
    "/assets/rozha-one-400-Cq3K7m.woff2",
    new Response("font"),
  );
  const res = await cacheHeaders(ctx as never);

  assertEquals(res.headers.get("cache-control"), IMMUTABLE);
});

Deno.test("middleware stamps revalidate on html responses", async () => {
  const ctx = ctxFor("/blog/", new Response("<!doctype html>"));
  const res = await cacheHeaders(ctx as never);

  assertEquals(res.headers.get("cache-control"), REVALIDATE);
});

Deno.test("middleware leaves redirect responses untouched", async () => {
  const redirect = new Response(null, {
    headers: { location: "/blog/architecture-platform-1/" },
    status: 301,
  });
  const ctx = ctxFor("/blog/platform-architecture-1/", redirect);
  const res = await cacheHeaders(ctx as never);

  assertEquals(res.status, 301);
  assertEquals(res.headers.get("cache-control"), null);
});
