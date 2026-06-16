import { assertEquals } from "@std/assert";
import { mdToBlocks } from "@/scripts/build-content.ts";

Deno.test("paragraph -> p", () => {
  assertEquals(mdToBlocks("Hello world."), [
    { kind: "p", text: "Hello world." },
  ]);
});

Deno.test("h2/h3 default to de-duplicated slug ids", () => {
  const md = "## Closing\n\nText.\n\n### Closing\n\n## Closing";
  assertEquals(mdToBlocks(md), [
    { kind: "h2", id: "closing", text: "Closing" },
    { kind: "p", text: "Text." },
    { kind: "h3", id: "closing-2", text: "Closing" },
    { kind: "h2", id: "closing-3", text: "Closing" },
  ]);
});

Deno.test("explicit {#id} overrides the slug; text drops the marker", () => {
  const md = "## Three questions during review {#three-questions}";
  assertEquals(mdToBlocks(md), [
    {
      kind: "h2",
      id: "three-questions",
      text: "Three questions during review",
    },
  ]);
});

Deno.test("explicit ids participate in de-duplication", () => {
  const md = "## Closing thought {#closing}\n\n### Closing";
  assertEquals(mdToBlocks(md), [
    { kind: "h2", id: "closing", text: "Closing thought" },
    { kind: "h3", id: "closing-2", text: "Closing" },
  ]);
});

Deno.test("blockquote -> pull (joined text)", () => {
  assertEquals(mdToBlocks("> One line.\n> Two line."), [
    { kind: "pull", text: "One line. Two line." },
  ]);
});

Deno.test("list -> list items", () => {
  assertEquals(mdToBlocks("- a\n- b\n- c"), [
    { kind: "list", items: ["a", "b", "c"] },
  ]);
});

Deno.test("fenced code -> code {lang,text}", () => {
  const md = "```bash\nexit 1\n```";
  assertEquals(mdToBlocks(md), [
    { kind: "code", lang: "bash", text: "exit 1" },
  ]);
});

Deno.test("code with no language -> empty lang", () => {
  const md = "```\nplain\n```";
  assertEquals(mdToBlocks(md), [
    { kind: "code", lang: "", text: "plain" },
  ]);
});

Deno.test("callout container directive -> callout {title,text}", () => {
  const md = ":::callout[Rule of thumb]\nPin it into the pipeline.\n:::";
  assertEquals(mdToBlocks(md), [
    {
      kind: "callout",
      title: "Rule of thumb",
      text: "Pin it into the pipeline.",
    },
  ]);
});
