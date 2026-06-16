import { assertEquals } from "@std/assert";
import { REVALIDATE } from "@/utils/cache.ts";

const freshServerPath = new URL("_fresh/server.js", import.meta.url);

const built = await Deno.stat(freshServerPath).then(() => true).catch(() =>
  false
);

Deno.test({
  name: "home route is served with the revalidate cache policy",
  ignore: !built,
  async fn() {
    const mod = await import(freshServerPath.href);
    const server = mod.default as {
      fetch: (req: Request) => Promise<Response>;
    };

    const res = await server.fetch(new Request("http://localhost/"));
    await res.body?.cancel();

    assertEquals(res.status, 200);
    assertEquals(res.headers.get("cache-control"), REVALIDATE);
  },
});
