import { assertEquals } from "@std/assert";
import { extractHeadings, preprocessMdx } from "./mdx-headings.ts";

Deno.test("preprocessMdx rewrites explicit-id headings to JSX", () => {
  assertEquals(
    preprocessMdx("## Closing thought {#closing}").trim(),
    '<h2 id="closing">Closing thought</h2>',
  );
  assertEquals(
    preprocessMdx("### A sub {#sub-id}").trim(),
    '<h3 id="sub-id">A sub</h3>',
  );
  assertEquals(preprocessMdx("## Plain heading").trim(), "## Plain heading");
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
