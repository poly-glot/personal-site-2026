import { assertEquals } from "@std/assert";
import type { Theme } from "@/src/types.ts";

Deno.test("Theme union accepts light and dark", () => {
  const themes: Theme[] = ["light", "dark"];
  assertEquals(themes.length, 2);
});
