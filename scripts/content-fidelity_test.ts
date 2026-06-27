import { assertEquals } from "@std/assert";
import { POSTS, PROJECTS } from "@/data/content.gen.ts";
import { workVocab } from "@/data/content.ts";
import { assertUnambiguous } from "@/data/taxonomy.ts";
import { extractHeadings } from "@/scripts/mdx-headings.ts";
import { extract } from "@std/front-matter/yaml";

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

async function sourceHeadingIds(id: string): Promise<string[]> {
  const raw = await Deno.readTextFile(`content/blog/${id}.mdx`);
  const { body } = extract(raw);
  return extractHeadings(body).map((h) => h.id);
}

Deno.test("all 8 posts are generated", () => {
  assertEquals(POSTS.length, 8);
  assertEquals(POSTS.map((p) => p.id).sort(), EXPECTED_IDS);
});

Deno.test("adr post frontmatter matches the mockup", () => {
  const adr = POSTS.find((p) => p.id === "adr-as-build-gates")!;
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

Deno.test("adr h2 ids match the mockup ids (via manifest toc)", () => {
  const adr = POSTS.find((p) => p.id === "adr-as-build-gates")!;
  assertEquals(adr.toc.map((t) => t.id), [
    "why-adrs-rot",
    "three-questions",
    "worked-example",
    "escape-hatches",
    "what-changes-culturally",
    "what-not-to-gate",
    "closing",
  ]);
});

Deno.test("every post's h2/h3 ids match the mockup ids", async () => {
  assertEquals(await sourceHeadingIds("strangler-without-pain"), [
    "the-shape",
    "day-one",
    "day-three",
    "single-leader",
    "dual-write-window",
    "decom-trap",
    "reusable-pattern",
    "closing",
  ]);
  assertEquals(await sourceHeadingIds("platform-team-outcomes"), [
    "the-trap",
    "what-we-measure",
    "office-hours",
    "saying-no",
    "celebrate-tenants",
    "closing",
  ]);
  assertEquals(await sourceHeadingIds("signposting-integrations"), [
    "the-stance",
    "how-it-works",
    "hard-cases",
    "background-jobs",
    "webhooks",
    "compliance-side",
    "what-this-cost",
    "closing",
  ]);
  assertEquals(await sourceHeadingIds("react-hook-budgets"), [
    "the-symptom",
    "the-diagnosis",
    "the-wrong-fix",
    "the-right-fix",
    "hook-budgets",
    "what-i-tell-juniors",
    "closing",
  ]);
  assertEquals(await sourceHeadingIds("hiring-principal-engineers"), [
    "thermostats",
    "what-i-ask",
    "what-i-avoid",
    "signals-i-watch",
    "the-anti-signals",
    "closing",
  ]);
  assertEquals(await sourceHeadingIds("open-source-without-burnout"), [
    "saying-no",
    "cadence",
    "triage-rules",
    "the-hard-conversations",
    "sponsorship",
    "closing",
  ]);
  assertEquals(await sourceHeadingIds("editorial-design-systems"), [
    "what-tokens-miss",
    "the-rhythm-we-use",
    "why-numbered-eyebrows",
    "italic-restraint",
    "accent-discipline",
    "what-this-costs",
    "closing",
  ]);
});

Deno.test("all 10 projects are generated in source order", () => {
  assertEquals(PROJECTS.length, 10);
  assertEquals(PROJECTS.map((p) => p.id), [
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
  const og = PROJECTS.find((p) => p.id === "openguessr")!;
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
