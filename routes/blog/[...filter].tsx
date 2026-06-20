import { HttpError } from "fresh";
import { define } from "@/utils/state.ts";
import { BlogPage } from "./_shared.tsx";
import { resolveBlog } from "./_resolve.ts";

export const config = { routeOverride: "/blog/*" };

export const handler = define.handlers({
  GET(ctx) {
    const raw = new URL(ctx.req.url).pathname.replace(/^\/blog\//, "").replace(
      /\/$/,
      "",
    );
    const segments = raw ? raw.split("/") : [];
    const result = resolveBlog(segments);

    if (result === "notfound") throw new HttpError(404);

    if ("redirect" in result) {
      return new Response(null, {
        status: 301,
        headers: { location: result.redirect },
      });
    }

    if (result.view.kind === "detail") {
      const post = result.view.detail;
      ctx.state.meta = {
        title: `${post.title} — Junaid Ahmed`,
        description: post.deck,
        ogType: "article",
      };
    }

    return { data: result };
  },
});

export default define.page<typeof handler>(({ data }) => (
  <BlogPage data={data} />
));
