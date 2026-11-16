import { assertEquals } from "@std/assert";
import { POSTS, PROJECTS } from "@/data/content.gen.ts";
import { workVocab } from "@/data/content.ts";
import { assertUnambiguous } from "@/data/taxonomy.ts";
import { extractHeadings } from "@/scripts/mdx-headings.ts";
import { extract } from "@std/front-matter/yaml";

const EXPECTED_IDS = [
  "adr-as-build-gates",
  "hiring-principal-engineers",
  "openguessr-fair-play",
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

Deno.test("adr post frontmatter", () => {
  const adr = POSTS.find((p) => p.id === "adr-as-build-gates")!;
  assertEquals(
    adr.title,
    "What HookLab's out-of-date README taught me about written decisions",
  );
  assertEquals(adr.topics, ["Architecture", "Process"]);
  assertEquals(adr.readMin, 7);
  assertEquals(adr.abstract, "GATE");
  assertEquals(adr.year, 2026);
  assertEquals(
    adr.deck,
    "I write my decisions down in READMEs and rules files. The ones something checked were still true.",
  );
  assertEquals(
    adr.teaser,
    "I went back through four of my projects to see which written decisions were still true.",
  );
});

Deno.test("adr h2 ids (via manifest toc)", () => {
  const adr = POSTS.find((p) => p.id === "adr-as-build-gates")!;
  assertEquals(adr.toc.map((t) => t.id), [
    "which-stayed-true",
    "four-places",
    "two-small-checks",
    "not-everything",
    "closing",
  ]);
});

Deno.test("every post's h2/h3 ids match the mockup ids", async () => {
  assertEquals(await sourceHeadingIds("platform-team-outcomes"), [
    "receipts",
    "first-week",
    "wordpress",
    "limits",
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
    "guardrails",
    "the-role",
    "what-i-ask",
    "a-real-document",
    "signals",
    "closing",
  ]);
  assertEquals(await sourceHeadingIds("openguessr-fair-play"), [
    "the-browser",
    "the-score",
    "the-distance",
    "the-rules",
    "the-leak",
    "the-fix",
    "the-audit",
    "smaller-gaps",
    "checklist",
    "closing",
  ]);
});

Deno.test("all 21 projects are generated in source order", () => {
  assertEquals(PROJECTS.length, 21);
  assertEquals(PROJECTS.map((p) => p.id), [
    "academy",
    "airport-drupal",
    "amazing-landing",
    "azadi-go",
    "bhx-travel",
    "boxes",
    "cabinet",
    "crea8ive",
    "donation",
    "ech-uk",
    "flyvipcms",
    "halveron",
    "hooklab",
    "legal",
    "openguessr",
    "outrun",
    "parley",
    "shorten",
    "txtlocal",
    "wealth",
    "zig-directory",
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
    "asp-net-core",
    "athena",
    "aws-lambda",
    "builder-io",
    "cakephp",
    "cloud-run",
    "cloudfront",
    "codeigniter",
    "cognito",
    "css",
    "deno",
    "docker",
    "drupal",
    "dynamodb",
    "fastapi",
    "firebase",
    "firestore",
    "framer-motion",
    "fresh",
    "gemini",
    "go",
    "google-maps",
    "graphql",
    "helidon",
    "html5",
    "java",
    "javascript",
    "jquery",
    "kubernetes",
    "leaflet",
    "lit",
    "mdx",
    "mysql",
    "next-js",
    "node-js",
    "php",
    "playwright",
    "preact",
    "python",
    "react",
    "resend",
    "rust",
    "spring",
    "stripe",
    "terraform",
    "tiptap",
    "typescript",
    "vercel",
    "vite",
    "web-animations-api",
    "wordpress",
    "xhtml",
    "zig",
  ]);
});

Deno.test("derived stack vocabulary is unambiguously partitionable", () => {
  assertUnambiguous(workVocab().stack, "derived stack");
});
