import { App, staticFiles } from "fresh";
import { type State } from "@/utils/state.ts";
import { cacheHeaders } from "@/utils/cache.ts";

export const app = new App<State>();

app.use(cacheHeaders);
app.use(staticFiles());

app.fsRoutes();

if (import.meta.main) {
  await app.listen({
    hostname: "0.0.0.0",
    port: Number(Deno.env.get("PORT") ?? 8100),
  });
}
