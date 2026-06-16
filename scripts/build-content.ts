import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkDirective from "remark-directive";
import { toString } from "mdast-util-to-string";
import { extract } from "@std/front-matter/yaml";
import type {
  BlockNode,
  BlogAbstract,
  BlogPost,
  PostWithBody,
  ProjectWithBody,
  WorkAbstract,
  WorkProject,
} from "@/src/types.ts";
import { slugify } from "@/data/taxonomy.ts";

interface MdNode {
  type: string;
  depth?: number;
  lang?: string | null;
  value?: string;
  name?: string;
  data?: { directiveLabel?: boolean };
  children?: MdNode[];
}

const EXPLICIT_ID = /\s*\{#([a-z0-9-]+)\}\s*$/;

function collapse(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function uniqueId(base: string, used: Map<string, number>): string {
  const seen = used.get(base) ?? 0;
  used.set(base, seen + 1);
  return seen === 0 ? base : `${base}-${seen + 1}`;
}

function headingIdAndText(
  raw: string,
  used: Map<string, number>,
): { id: string; text: string } {
  const explicit = raw.match(EXPLICIT_ID);
  const text = explicit ? raw.replace(EXPLICIT_ID, "").trim() : raw.trim();
  const base = explicit ? explicit[1] : slugify(text);

  return { id: uniqueId(base, used), text };
}

function calloutFrom(node: MdNode): BlockNode {
  const labelNode = (node.children ?? []).find((c) => c.data?.directiveLabel);
  const title = labelNode ? toString(labelNode) : "";

  const bodyNodes = (node.children ?? []).filter(
    (c) => !c.data?.directiveLabel,
  );
  const text = collapse(bodyNodes.map((c) => toString(c)).join(" "));

  return { kind: "callout", title, text };
}

function blockFor(node: MdNode, used: Map<string, number>): BlockNode | null {
  switch (node.type) {
    case "paragraph":
      return { kind: "p", text: collapse(toString(node)) };
    case "heading": {
      const { id, text } = headingIdAndText(toString(node), used);

      return node.depth === 2
        ? { kind: "h2", id, text }
        : { kind: "h3", id, text };
    }
    case "blockquote":
      return { kind: "pull", text: collapse(toString(node)) };
    case "list":
      return {
        kind: "list",
        items: (node.children ?? []).map((li) => collapse(toString(li))),
      };
    case "code":
      return { kind: "code", lang: node.lang ?? "", text: node.value ?? "" };
    case "containerDirective":
      return node.name === "callout" ? calloutFrom(node) : null;
    default:
      return null;
  }
}

export function mdToBlocks(markdown: string): BlockNode[] {
  const processor = unified().use(remarkParse).use(remarkDirective);
  const tree = processor.runSync(
    processor.parse(markdown),
  ) as unknown as MdNode;

  const used = new Map<string, number>();
  const out: BlockNode[] = [];

  for (const node of tree.children ?? []) {
    const block = blockFor(node, used);
    if (block) out.push(block);
  }

  return out;
}

function firstParagraph(body: BlockNode[]): string {
  const p = body.find((b) => b.kind === "p");
  return p && p.kind === "p" ? p.text : "";
}

function wordCount(body: BlockNode[]): number {
  return body
    .map((b) => {
      if (b.kind === "list") return b.items.join(" ");
      if (b.kind === "code") return "";
      if (b.kind === "callout") return `${b.title} ${b.text}`;
      return b.text;
    })
    .join(" ")
    .split(/\s+/)
    .filter(Boolean)
    .length;
}

async function readPost(path: string): Promise<PostWithBody> {
  const raw = await Deno.readTextFile(path);
  const { attrs, body: markdown } = extract(raw);
  const fm = attrs as Record<string, unknown>;
  const body = mdToBlocks(markdown);

  const post: BlogPost = {
    id: fm.id as string,
    title: fm.title as string,
    deck: fm.deck as string,
    date: fm.date as string,
    year: Number(fm.year ?? new Date(fm.date as string).getFullYear()),
    topics: fm.topics as string[],
    readMin: fm.readMin !== undefined
      ? Number(fm.readMin)
      : Math.max(1, Math.round(wordCount(body) / 200)),
    abstract: fm.abstract as BlogAbstract,
    tone: fm.tone as string,
    teaser: (fm.teaser ?? fm.deck) as string,
  };

  return { post, body };
}

async function readProject(path: string): Promise<ProjectWithBody> {
  const raw = await Deno.readTextFile(path);
  const { attrs, body: markdown } = extract(raw);
  const fm = attrs as Record<string, unknown>;
  const body = mdToBlocks(markdown);

  const project: WorkProject = {
    id: fm.id as string,
    name: fm.name as string,
    tagline: fm.tagline as string,
    summary: (fm.summary as string) ?? firstParagraph(body),
    role: fm.role as string,
    stack: fm.stack as string[],
    domains: fm.domains as string[],
    year: Number(fm.year),
    url: fm.url as string,
    href: fm.href as string,
    abstract: fm.abstract as WorkAbstract,
    tone: fm.tone as string,
  };

  return { project, body };
}

async function readDir<T>(
  dir: string,
  read: (path: string) => Promise<T>,
): Promise<T[]> {
  const entries: string[] = [];
  for await (const entry of Deno.readDir(dir)) {
    if (entry.isFile && entry.name.endsWith(".md")) {
      entries.push(`${dir}/${entry.name}`);
    }
  }
  entries.sort();

  return Promise.all(entries.map(read));
}

function tonesCss(
  posts: PostWithBody[],
  projects: ProjectWithBody[],
): string {
  const rules = [
    ...posts.map((p) => [p.post.id, p.post.tone] as const),
    ...projects.map((p) => [p.project.id, p.project.tone] as const),
  ].map(([id, tone]) => `[data-tone="${id}"] {\n  --bw-tone: ${tone};\n}`);

  return `${rules.join("\n\n")}\n`;
}

async function build(): Promise<void> {
  const posts = await readDir("content/blog", readPost);
  const projects = await readDir("content/work", readProject);

  const banner =
    `import type { PostWithBody, ProjectWithBody } from "@/src/types.ts";\n\n`;
  const postsOut = `export const POSTS: PostWithBody[] = ${
    JSON.stringify(posts, null, 2)
  };\n\n`;
  const projectsOut = `export const PROJECTS: ProjectWithBody[] = ${
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
