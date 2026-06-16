import { assertEquals } from "@std/assert";
import { CONTACT_EMAIL, NAV_LINKS } from "@/src/nav.ts";

Deno.test("NAV_LINKS are the four primary destinations in order", () => {
  assertEquals(
    NAV_LINKS.map((l) => l.id),
    ["work", "about", "blog", "contact"],
  );
});

Deno.test("NAV_LINKS use canonical Fresh routes, contact is a mailto stub", () => {
  assertEquals(NAV_LINKS[0].href, "/work/");
  assertEquals(NAV_LINKS[1].href, "/about");
  assertEquals(NAV_LINKS[2].href, "/blog/");
  assertEquals(NAV_LINKS[3].href, `mailto:${CONTACT_EMAIL}`);
  assertEquals(NAV_LINKS[3].stub, true);
});

Deno.test("NAV_LINKS carry two-digit index labels", () => {
  assertEquals(NAV_LINKS.map((l) => l.num), ["01", "02", "03", "04"]);
});
