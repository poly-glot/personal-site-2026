import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import rehypeSlug from "rehype-slug";
import { preprocessMdx } from "./scripts/mdx-headings.ts";

function mdxPreprocess() {
  return {
    name: "mdx-heading-preprocess",
    enforce: "pre" as const,
    transform(code: string, id: string) {
      if (!id.endsWith(".mdx")) return null;
      return { code: preprocessMdx(code), map: null };
    },
  };
}

export default defineConfig({
  plugins: [
    mdxPreprocess(),
    {
      enforce: "pre",
      ...mdx({
        jsxImportSource: "preact",
        remarkPlugins: [remarkFrontmatter],
        rehypePlugins: [rehypeSlug],
      }),
    },
    fresh(),
  ],
  server: { host: true, port: 5273 },
});
