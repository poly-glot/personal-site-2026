import type { PageMeta } from "@/src/types.ts";

export const SITE_ORIGIN = "https://junaid.guru";
export const SITE_NAME = "Junaid Ahmed";

export const SITE_OG_IMAGE = `${SITE_ORIGIN}/img/default.png`;
export const SITE_OG_IMAGE_ALT = "Junaid Ahmed — Solutions Architect";
export const SITE_OG_IMAGE_WIDTH = "1200";
export const SITE_OG_IMAGE_HEIGHT = "630";
export const SITE_LOCALE = "en_GB";

const DEFAULT_TITLE = "Junaid Ahmed — Solutions Architect";
const DEFAULT_DESCRIPTION =
  "Junaid Ahmed — Solutions Architect in London, working as the glue between domains, platforms, and products.";

const BLOG_DEFAULT: Partial<PageMeta> = {
  title: "Blog — Junaid Ahmed",
  description:
    "Writing on architecture, platforms, engineering culture, and delivery by Junaid Ahmed.",
};

const WORK_DEFAULT: Partial<PageMeta> = {
  title: "Selected Work — Junaid Ahmed",
  description:
    "Selected work and case studies by Junaid Ahmed across CMS, e-commerce, DAM, and platform engineering.",
};

const STATIC_META: Record<string, Partial<PageMeta>> = {
  "/": {
    title: DEFAULT_TITLE,
    description:
      "Junaid Ahmed — Solutions Architect in London. The glue between domains, platforms, and products: shaping architecture, turning strategy into delivery, and enabling autonomous teams.",
  },
  "/about": {
    title: "About — Junaid Ahmed",
    description:
      "About Junaid Ahmed — a Solutions Architect in London connecting domains, platforms, and products across two decades of delivery.",
  },
  "/blog": BLOG_DEFAULT,
  "/work": WORK_DEFAULT,
  "/design-system": {
    title: "Design System — Junaid Ahmed",
    description:
      "The design tokens, type scale, and components behind junaid.guru.",
    robots: "noindex",
  },
};

function normalizePath(pathname: string): string {
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

function baseFor(path: string): Partial<PageMeta> {
  const exact = STATIC_META[path];
  if (exact) return exact;

  if (path.startsWith("/blog")) return BLOG_DEFAULT;
  if (path.startsWith("/work")) return WORK_DEFAULT;

  return {};
}

export function resolveMeta(url: URL, override?: Partial<PageMeta>): PageMeta {
  const base = baseFor(normalizePath(url.pathname));

  return {
    title: override?.title ?? base.title ?? DEFAULT_TITLE,
    description: override?.description ?? base.description ??
      DEFAULT_DESCRIPTION,
    canonical: override?.canonical ?? SITE_ORIGIN + url.pathname,
    ogType: override?.ogType ?? base.ogType ?? "website",
    ogImage: override?.ogImage ?? base.ogImage ?? SITE_OG_IMAGE,
    robots: override?.robots ?? base.robots,
  };
}
