import { extract } from "@std/front-matter/yaml";
import {
  extractHeadings,
  firstParagraphFromSource,
} from "@/scripts/mdx-headings.ts";
import type {
  BlogAbstract,
  BlogPost,
  WorkAbstract,
  WorkProject,
} from "@/src/types.ts";

function wordCountFromSource(markdown: string): number {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`[\]()-]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .length;
}

async function readPost(path: string): Promise<BlogPost> {
  const raw = await Deno.readTextFile(path);
  const { attrs, body: markdown } = extract(raw);
  const fm = attrs as Record<string, unknown>;
  const headings = extractHeadings(markdown);
  const toc = headings
    .filter((h) => h.depth === 2)
    .map((h) => ({ id: h.id, text: h.text }));
  const words = wordCountFromSource(markdown);

  return {
    id: fm.id as string,
    title: fm.title as string,
    deck: fm.deck as string,
    date: fm.date as string,
    year: Number(fm.year ?? new Date(fm.date as string).getFullYear()),
    topics: fm.topics as string[],
    readMin: fm.readMin !== undefined
      ? Number(fm.readMin)
      : Math.max(1, Math.round(words / 200)),
    abstract: fm.abstract as BlogAbstract,
    tone: fm.tone as string,
    teaser: (fm.teaser ?? fm.deck) as string,
    toc,
  };
}

async function readProject(path: string): Promise<WorkProject> {
  const raw = await Deno.readTextFile(path);
  const { attrs, body: markdown } = extract(raw);
  const fm = attrs as Record<string, unknown>;

  return {
    id: fm.id as string,
    name: fm.name as string,
    tagline: fm.tagline as string,
    summary: (fm.summary as string) ?? firstParagraphFromSource(markdown),
    role: fm.role as string,
    stack: fm.stack as string[],
    domains: fm.domains as string[],
    year: Number(fm.year),
    url: fm.url as string,
    href: fm.href as string,
    abstract: fm.abstract as WorkAbstract,
    tone: fm.tone as string,
  };
}

async function readDir<T>(
  dir: string,
  read: (path: string) => Promise<T>,
  ext: string,
): Promise<T[]> {
  const entries: string[] = [];
  for await (const entry of Deno.readDir(dir)) {
    if (entry.isFile && entry.name.endsWith(ext)) {
      entries.push(`${dir}/${entry.name}`);
    }
  }
  entries.sort();

  return Promise.all(entries.map(read));
}

function tonesCss(
  posts: BlogPost[],
  projects: WorkProject[],
): string {
  const rules = [
    ...posts.map((p) => [p.id, p.tone] as const),
    ...projects.map((p) => [p.id, p.tone] as const),
  ].map(([id, tone]) => `[data-tone="${id}"] {\n  --bw-tone: ${tone};\n}`);

  return `${rules.join("\n\n")}\n`;
}

async function build(): Promise<void> {
  const posts = await readDir("content/blog", readPost, ".mdx");
  const projects = await readDir("content/work", readProject, ".mdx");

  const banner =
    `import type { BlogPost, WorkProject } from "@/src/types.ts";\n\n`;
  const postsOut = `export const POSTS: BlogPost[] = ${
    JSON.stringify(posts, null, 2)
  };\n\n`;
  const projectsOut = `export const PROJECTS: WorkProject[] = ${
    JSON.stringify(projects, null, 2)
  };\n`;

  await Deno.writeTextFile(
    "data/content.gen.ts",
    banner + postsOut + projectsOut,
  );
  await Deno.writeTextFile(
    "styles/content-tones.gen.css",
    tonesCss(posts, projects),
  );
}

if (import.meta.main) {
  await build();
}
