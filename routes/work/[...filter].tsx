import { HttpError } from "fresh";
import { define } from "@/utils/state.ts";
import Header from "@/components/Header/Header.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import WorkDetail from "@/components/WorkDetail/WorkDetail.tsx";
import { resolveWork, WorkListPage } from "./_shared.tsx";

export const config = { routeOverride: "/work/*" };

export const handler = define.handlers({
  GET(ctx) {
    const raw = new URL(ctx.req.url).pathname.replace(/^\/work\//, "").replace(
      /\/$/,
      "",
    );
    const segments = raw ? raw.split("/") : [];
    const result = resolveWork(segments);

    if (result === "notfound") throw new HttpError(404);

    if ("redirect" in result) {
      return new Response(null, {
        status: 301,
        headers: { location: result.redirect },
      });
    }

    if (result.view === "detail") {
      ctx.state.meta = {
        title: `${result.project.name} — Junaid Ahmed`,
        description: result.project.tagline,
        ogType: "article",
      };
    }

    return { data: result };
  },
});

export default define.page<typeof handler>(({ data }) => {
  if (data.view === "detail") {
    return (
      <div>
        <Header active="work" />
        <main id="main" class="container">
          <WorkDetail
            project={data.project}
            body={data.body}
            prev={data.prev}
            next={data.next}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return <WorkListPage data={data} />;
});
