import { define } from "@/utils/state.ts";
import { SITE_ORIGIN } from "@/src/site.ts";
import { getAllPosts, getAllProjects } from "@/data/content.ts";

const STATIC_PATHS = ["/", "/about/", "/blog/", "/work/"];

function urlEntry(path: string): string {
  return `  <url>\n    <loc>${SITE_ORIGIN}${path}</loc>\n  </url>`;
}

function buildSitemap(paths: string[]): string {
  const entries = paths.map(urlEntry).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

export const handler = define.handlers({
  GET(_ctx) {
    const postPaths = getAllPosts().map((post) => `/blog/${post.id}/`);
    const projectPaths = getAllProjects().map(
      (project) => `/work/${project.id}/`,
    );

    const xml = buildSitemap([...STATIC_PATHS, ...postPaths, ...projectPaths]);

    return new Response(xml, {
      headers: { "content-type": "application/xml; charset=utf-8" },
    });
  },
});
