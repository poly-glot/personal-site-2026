import { assertEquals } from "@std/assert";
import { POSTS } from "@/data/content.gen.ts";

const EXPECTED_IDS = [
  "adr-as-build-gates",
  "editorial-design-systems",
  "hiring-principal-engineers",
  "open-source-without-burnout",
  "platform-team-outcomes",
  "react-hook-budgets",
  "signposting-integrations",
  "strangler-without-pain",
];

Deno.test("all 8 posts are generated", () => {
  assertEquals(POSTS.length, 8);
  assertEquals(POSTS.map((p) => p.post.id).sort(), EXPECTED_IDS);
});

Deno.test("adr post frontmatter matches the mockup", () => {
  const adr = POSTS.find((p) => p.post.id === "adr-as-build-gates")!.post;
  assertEquals(adr.title, "Turning ADRs into build-time gates");
  assertEquals(adr.topics, ["Architecture", "Process"]);
  assertEquals(adr.readMin, 11);
  assertEquals(adr.abstract, "GATE");
  assertEquals(adr.year, 2026);
  assertEquals(
    adr.deck,
    "Stop writing decisions you can't enforce. Pin the rule into the pipeline.",
  );
  assertEquals(
    adr.teaser,
    "Most ADRs read like wishes. The ones that survive are the ones the build refuses to merge without.",
  );
});

Deno.test("adr h2 ids match the mockup ids", () => {
  const adr = POSTS.find((p) => p.post.id === "adr-as-build-gates")!;
  const h2 = adr.body.filter((b) => b.kind === "h2").map((b) =>
    (b as { id: string }).id
  );
  assertEquals(h2, [
    "why-adrs-rot",
    "three-questions",
    "worked-example",
    "escape-hatches",
    "what-changes-culturally",
    "what-not-to-gate",
    "closing",
  ]);
});

Deno.test("every post's h2/h3 ids match the mockup ids", () => {
  const headingIds = (id: string) =>
    POSTS.find((p) => p.post.id === id)!.body
      .filter((b) => b.kind === "h2" || b.kind === "h3")
      .map((b) => (b as { id: string }).id);

  assertEquals(headingIds("strangler-without-pain"), [
    "the-shape",
    "day-one",
    "day-three",
    "single-leader",
    "dual-write-window",
    "decom-trap",
    "reusable-pattern",
    "closing",
  ]);
  assertEquals(headingIds("platform-team-outcomes"), [
    "the-trap",
    "what-we-measure",
    "office-hours",
    "saying-no",
    "celebrate-tenants",
    "closing",
  ]);
  assertEquals(headingIds("signposting-integrations"), [
    "the-stance",
    "how-it-works",
    "hard-cases",
    "background-jobs",
    "webhooks",
    "compliance-side",
    "what-this-cost",
    "closing",
  ]);
  assertEquals(headingIds("react-hook-budgets"), [
    "the-symptom",
    "the-diagnosis",
    "the-wrong-fix",
    "the-right-fix",
    "hook-budgets",
    "what-i-tell-juniors",
    "closing",
  ]);
  assertEquals(headingIds("hiring-principal-engineers"), [
    "thermostats",
    "what-i-ask",
    "what-i-avoid",
    "signals-i-watch",
    "the-anti-signals",
    "closing",
  ]);
  assertEquals(headingIds("open-source-without-burnout"), [
    "saying-no",
    "cadence",
    "triage-rules",
    "the-hard-conversations",
    "sponsorship",
    "closing",
  ]);
  assertEquals(headingIds("editorial-design-systems"), [
    "what-tokens-miss",
    "the-rhythm-we-use",
    "why-numbered-eyebrows",
    "italic-restraint",
    "accent-discipline",
    "what-this-costs",
    "closing",
  ]);
});

Deno.test("adr callout and code blocks survive", () => {
  const adr = POSTS.find((p) => p.post.id === "adr-as-build-gates")!;
  const callout = adr.body.find((b) => b.kind === "callout");
  assertEquals(callout, {
    kind: "callout",
    title: "Rule of thumb",
    text:
      "If the only thing keeping a decision alive is institutional memory, the decision is already on borrowed time. Pin it into the pipeline.",
  });
  const code = adr.body.find((b) => b.kind === "code") as {
    kind: "code";
    lang: string;
    text: string;
  };
  assertEquals(code.lang, "bash");
  assertEquals(code.text.includes("rg --type java"), true);
});

import { PROJECTS } from "@/data/content.gen.ts";
import { workVocab } from "@/data/content.ts";
import { assertUnambiguous } from "@/data/taxonomy.ts";

Deno.test("all 10 projects are generated in source order", () => {
  assertEquals(PROJECTS.length, 10);
  assertEquals(PROJECTS.map((p) => p.project.id), [
    "amazing-landing",
    "automotive-planner",
    "azadi-go",
    "bhx-travel",
    "boston",
    "crea8ive",
    "ech-uk",
    "hooklab",
    "luma-dam",
    "openguessr",
  ]);
});

Deno.test("openguessr project matches the mockup", () => {
  const og = PROJECTS.find((p) => p.project.id === "openguessr")!.project;
  assertEquals(og.name, "OpenGuessr");
  assertEquals(og.stack, ["React", "Node", "Firebase"]);
  assertEquals(og.domains, ["Mobile", "Directory"]);
  assertEquals(og.year, 2024);
  assertEquals(og.abstract, "MAP");
  assertEquals(og.href, "https://openguessr.junaid.guru/");
  assertEquals(og.tagline, "Guess the place. Open-source GeoGuessr.");
  assertEquals(
    og.summary,
    "An open, community-driven take on the location-guessing genre. Streetscape rendering, scoring rounds, multiplayer-ready architecture. Treated like a real platform — not a weekend hack.",
  );
});

Deno.test("derived stack and years cover the project data", () => {
  const vocab = workVocab();
  assertEquals(vocab.years, [2019, 2020, 2021, 2022, 2023, 2024, 2025]);
  assertEquals(vocab.stack, [
    "animation",
    "auth",
    "azure",
    "c",
    "css",
    "firebase",
    "firestore",
    "html",
    "java",
    "liquibase",
    "mdx",
    "motion",
    "mysql",
    "net",
    "node",
    "react",
    "redis",
    "spring",
    "sql",
    "tokens",
    "vite",
  ]);
});

Deno.test("derived stack vocabulary is unambiguously partitionable", () => {
  assertUnambiguous(workVocab().stack, "derived stack");
});
