import { define } from "@/utils/state.ts";

export const IMMUTABLE = "public, max-age=31536000, immutable";
export const REVALIDATE =
  "public, max-age=0, s-maxage=600, stale-while-revalidate=86400";

const immutablePrefixes = ["/assets/"];

export function cacheControlFor(pathname: string): string {
  if (immutablePrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return IMMUTABLE;
  }

  return REVALIDATE;
}

export const cacheHeaders = define.middleware(async (ctx) => {
  const res = await ctx.next();

  if (res.status >= 300 && res.status < 400) {
    return res;
  }

  res.headers.set("cache-control", cacheControlFor(ctx.url.pathname));

  return res;
});
