import { assertEquals } from "@std/assert";
import { extractHeadings, preprocessMdx } from "./mdx-headings.ts";

Deno.test("preprocessMdx rewrites explicit-id headings to prose components", () => {
  assertEquals(
    preprocessMdx("## Closing thought {#closing}").trim(),
    '<H2 id="closing">Closing thought</H2>',
  );
  assertEquals(
    preprocessMdx("### A sub {#sub-id}").trim(),
    '<H3 id="sub-id">A sub</H3>',
  );
  assertEquals(preprocessMdx("## Plain heading").trim(), "## Plain heading");
});

Deno.test("preprocessMdx keeps the blank line that ends the heading block", () => {
  assertEquals(
    preprocessMdx("## Closing thought {#closing}\n\nBody."),
    '<H2 id="closing">Closing thought</H2>\n\nBody.',
  );
});

Deno.test("extractHeadings: h2/h3 ids match github-slugger + explicit ids", () => {
  const src = [
    "## Why ADRs rot",
    "",
    "## Three questions during review {#three-questions}",
    "",
    "### The failure message matters more than the rule",
    "",
    "## A worked example: ADR-027 {#worked-example}",
  ].join("\n");

  assertEquals(extractHeadings(src), [
    { depth: 2, id: "why-adrs-rot", text: "Why ADRs rot" },
    { depth: 2, id: "three-questions", text: "Three questions during review" },
    {
      depth: 3,
      id: "the-failure-message-matters-more-than-the-rule",
      text: "The failure message matters more than the rule",
    },
    { depth: 2, id: "worked-example", text: "A worked example: ADR-027" },
  ]);
});
