import { assertEquals } from "@std/assert";
import { findFontPath } from "@/src/preload.ts";

const PATTERN = /rozha-one-latin-400-normal-[^/]*\.woff2$/;

Deno.test("findFontPath resolves the hashed display woff2 to a root path", () => {
  const manifest = {
    "fresh:client-entry": {
      file: "assets/client-entry-BNpFY5W5.js",
      assets: ["assets/rozha-one-latin-400-normal-Dg3_0_Ac.woff2"],
    },
    "node_modules/.deno/rozha/files/rozha-one-latin-400-normal.woff2": {
      file: "assets/rozha-one-latin-400-normal-Dg3_0_Ac.woff2",
    },
  };

  assertEquals(
    findFontPath(manifest, PATTERN),
    "/assets/rozha-one-latin-400-normal-Dg3_0_Ac.woff2",
  );
});

Deno.test("findFontPath returns null when nothing matches", () => {
  assertEquals(
    findFontPath({ a: { file: "assets/client-entry.js" } }, PATTERN),
    null,
  );
});
