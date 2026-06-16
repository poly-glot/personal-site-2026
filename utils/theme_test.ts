import { assertEquals } from "@std/assert";
import { nextTheme, themeCookie } from "@/utils/theme.ts";

Deno.test("themeCookie fixes name, path, max-age and samesite", () => {
  assertEquals(
    themeCookie("light"),
    "theme=light; Path=/; Max-Age=31536000; SameSite=Lax",
  );
});

Deno.test("nextTheme steps light to dark and dark to light", () => {
  assertEquals(nextTheme("light"), "dark");
  assertEquals(nextTheme("dark"), "light");
});

Deno.test("nextTheme starts from dark when there is no current theme", () => {
  assertEquals(nextTheme(null), "dark");
});
