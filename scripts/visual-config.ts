export interface Viewport {
  label: "mobile" | "tablet" | "desktop";
  width: number;
  height: number;
}

export const VIEWPORTS: readonly Viewport[] = [
  { label: "mobile", width: 375, height: 812 },
  { label: "tablet", width: 768, height: 1024 },
  { label: "desktop", width: 1280, height: 900 },
];

export const ROUTES: readonly string[] = [
  "/",
  "/blog/",
  "/blog/architecture-platform-1/",
  "/work/",
  "/work/domain/cms/",
  "/about",
  "/design-system",
];

export function shotName(route: string, viewport: string): string {
  const slug = route.replace(/^\/+|\/+$/g, "").replace(/\//g, "-");
  const base = slug === "" ? "home" : slug;

  return `${base}__${viewport}.png`;
}

export interface OverflowReport {
  clientWidth: number;
  ok: boolean;
  overflowPx: number;
  scrollWidth: number;
}

export function overflowReport(
  clientWidth: number,
  scrollWidth: number,
): OverflowReport {
  const overflowPx = Math.max(0, scrollWidth - clientWidth);

  return {
    clientWidth,
    ok: scrollWidth <= clientWidth,
    overflowPx,
    scrollWidth,
  };
}

export function cookiePersisted(
  expected: string,
  actual: string | null,
): boolean {
  return actual !== null && actual === expected;
}

export function detailRoutes(
  blogId: string | null,
  workId: string | null,
): string[] {
  const routes: string[] = [];

  if (blogId !== null) routes.push(`/blog/${blogId}/`);
  if (workId !== null) routes.push(`/work/${workId}/`);

  return routes;
}
