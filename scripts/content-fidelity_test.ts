import { assertEquals } from "@std/assert";
import { POSTS, PROJECTS } from "@/data/content.gen.ts";
import { workVocab } from "@/data/content.ts";
import { assertUnambiguous } from "@/data/taxonomy.ts";
import { extractHeadings } from "@/scripts/mdx-headings.ts";
import { extract } from "@std/front-matter/yaml";

const EXPECTED_IDS = [
  "adr-as-build-gates",
  "hiring-principal-engineers",
  "open-source-without-burnout",
  "platform-team-outcomes",
  "react-hook-budgets",
];

async function sourceHeadingIds(id: string): Promise<string[]> {
  const raw = await Deno.readTextFile(`content/blog/${id}.mdx`);
  const { body } = extract(raw);
  return extractHeadings(body).map((h) => h.id);
}

Deno.test("all 5 posts are generated", () => {
  assertEquals(POSTS.length, 5);
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
  assertEquals(await sourceHeadingIds("platform-team-outcomes"), [
    "the-trap",
    "what-we-measure",
    "office-hours",
    "saying-no",
    "celebrate-tenants",
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
});

Deno.test("all 7 projects are generated in source order", () => {
  assertEquals(PROJECTS.length, 7);
  assertEquals(PROJECTS.map((p) => p.id), [
    "amazing-landing",
    "azadi-go",
    "bhx-travel",
    "crea8ive",
    "ech-uk",
    "hooklab",
    "openguessr",
  ]);
});

Deno.test("openguessr project matches its case study", () => {
  const og = PROJECTS.find((p) => p.id === "openguessr")!;
  assertEquals(og.name, "OpenGuessr");
  assertEquals(og.stack, [
    "JavaScript",
    "Lit",
    "Firebase",
    "Gemini",
    "Leaflet",
    "Google Maps",
  ]);
  assertEquals(og.domains, ["Games"]);
  assertEquals(og.year, 2026);
  assertEquals(og.abstract, "MAP");
  assertEquals(og.href, "https://openguessr.junaid.guru/");
  assertEquals(og.source, "https://github.com/poly-glot/openguessr");
  assertEquals(og.layout, "chapters");
  assertEquals(
    og.tagline,
    "A geography game for friends, played from one link.",
  );
});

Deno.test("derived stack and years cover the project data", () => {
  const vocab = workVocab();
  assertEquals(vocab.years, [2007, 2014, 2015, 2022, 2026]);
  assertEquals(vocab.stack, [
    "builder-io",
    "cloud-run",
    "css",
    "deno",
    "firebase",
    "firestore",
    "gemini",
    "go",
    "google-maps",
    "helidon",
    "html5",
    "java",
    "javascript",
    "jquery",
    "leaflet",
    "lit",
    "next-js",
    "php",
    "react",
    "resend",
    "spring",
    "stripe",
    "terraform",
    "typescript",
    "vercel",
    "vite",
    "web-animations-api",
    "xhtml",
  ]);
});

Deno.test("derived stack vocabulary is unambiguously partitionable", () => {
  assertUnambiguous(workVocab().stack, "derived stack");
});
