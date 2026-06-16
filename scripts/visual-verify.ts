import { chromium } from "playwright";
import { getAllPosts, getAllProjects } from "@/data/content.ts";
import {
  cookiePersisted,
  detailRoutes,
  overflowReport,
  ROUTES,
  shotName,
  VIEWPORTS,
} from "@/scripts/visual-config.ts";

const CDP_URL = Deno.env.get("CDP_URL") ?? "http://host.docker.internal:9223";
const PREVIEW_URL = Deno.env.get("PREVIEW_URL") ?? "http://localhost:8100";
const OUT_DIR = new URL("../screenshots/", import.meta.url);

interface ShotResult {
  cookieOk: boolean;
  overflowOk: boolean;
  overflowPx: number;
  route: string;
  viewport: string;
}

async function run(): Promise<number> {
  await Deno.mkdir(OUT_DIR, { recursive: true });

  const firstPost = getAllPosts()[0]?.id ?? null;
  const firstProject = getAllProjects()[0]?.id ?? null;
  const routes = [...ROUTES, ...detailRoutes(firstPost, firstProject)];

  const browser = await chromium.connectOverCDP(CDP_URL).catch((err: Error) => {
    console.error(`CDP connection failed: ${err.message}`);
    console.error(`Is Chrome running with --remote-debugging-port=9223?`);
    Deno.exit(1);
  });

  const context = await browser.newContext();
  const results: ShotResult[] = [];

  for (const viewport of VIEWPORTS) {
    const page = await context.newPage();
    await page.setViewportSize({
      height: viewport.height,
      width: viewport.width,
    });

    for (const route of routes) {
      const target = new URL(route, PREVIEW_URL).href;
      await page.goto(target, { waitUntil: "load" });
      await page.screenshot({
        fullPage: true,
        path: new URL(shotName(route, viewport.label), OUT_DIR).pathname,
      });

      const dims = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      const overflow = overflowReport(dims.clientWidth, dims.scrollWidth);

      await context.addCookies([{
        domain: new URL(target).hostname,
        name: "theme",
        path: "/",
        value: "dark",
      }]);
      await page.reload({ waitUntil: "load" });
      const after = (await context.cookies(target)).find((c) =>
        c.name === "theme"
      );
      const cookieOk = cookiePersisted("dark", after?.value ?? null);

      results.push({
        cookieOk,
        overflowOk: overflow.ok,
        overflowPx: overflow.overflowPx,
        route,
        viewport: viewport.label,
      });
    }

    await page.close();
  }

  await context.close();
  await browser.close();

  const failures = results.filter((r) => !r.overflowOk || !r.cookieOk);

  console.table(results);
  console.log(`screenshots written to ${OUT_DIR.pathname}`);

  if (failures.length > 0) {
    console.error(`FAIL: ${failures.length} shot(s) failed assertions`);

    return 1;
  }

  console.log(
    `PASS: ${results.length} shots, no overflow, theme cookie persists`,
  );

  return 0;
}

Deno.exit(await run());
