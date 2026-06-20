import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import { EXIT, visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import GithubSlugger from "github-slugger";

export function firstParagraphFromSource(markdown: string): string {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(markdown);
  let out = "";

  visit(tree, "paragraph", (node) => {
    out = toString(node).replace(/\s+/g, " ").trim();
    return EXIT;
  });

  return out;
}

const EXPLICIT_HEADING = /^(#{2,3})\s+(.*?)\s*\{#([a-z0-9-]+)\}\s*$/gm;

export function preprocessMdx(raw: string): string {
  return raw.replace(
    EXPLICIT_HEADING,
    (_m, hashes: string, text: string, id: string) => {
      const level = hashes.length === 2 ? 2 : 3;
      return `<h${level} id="${id}">${text}</h${level}>`;
    },
  );
}

export interface HeadingInfo {
  depth: 2 | 3;
  id: string;
  text: string;
}

interface MdxAttr {
  name?: string;
  value?: unknown;
}

interface AstNode {
  type: string;
  depth?: number;
  name?: string;
  attributes?: MdxAttr[];
}

function jsxAttrId(node: AstNode): string {
  const attr = (node.attributes ?? []).find((a) => a.name === "id");
  return typeof attr?.value === "string" ? attr.value : "";
}

export function extractHeadings(raw: string): HeadingInfo[] {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(
    preprocessMdx(raw),
  );
  const slugger = new GithubSlugger();
  const out: HeadingInfo[] = [];

  visit(tree, (node) => {
    const n = node as unknown as AstNode;

    if (n.type === "heading" && (n.depth === 2 || n.depth === 3)) {
      const text = toString(node).trim();
      out.push({ depth: n.depth as 2 | 3, id: slugger.slug(text), text });
    } else if (
      (n.type === "mdxJsxTextElement" || n.type === "mdxJsxFlowElement") &&
      (n.name === "h2" || n.name === "h3")
    ) {
      const text = toString(node).trim();
      out.push({ depth: n.name === "h2" ? 2 : 3, id: jsxAttrId(n), text });
    }
  });

  return out;
}
