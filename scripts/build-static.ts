import { join } from "@std/path";

const PUBLIC = "public";
const CLIENT = join("_fresh", "client");
const SKIP_COPY = new Set([".vite"]);

function freePort(): number {
  const listener = Deno.listen({ port: 0 });
  const { port } = listener.addr as Deno.NetAddr;
  listener.close();

  return port;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function cleanPublic(): Promise<void> {
  for await (const entry of Deno.readDir(PUBLIC)) {
    if (entry.name === ".gitkeep") continue;
    await Deno.remove(join(PUBLIC, entry.name), { recursive: true });
  }
}

async function runBuild(): Promise<void> {
  const build = new Deno.Command("deno", {
    args: ["task", "build"],
    stdout: "inherit",
    stderr: "inherit",
  }).spawn();

  const { success } = await build.status;
  if (!success) throw new Error("deno task build failed");
}

function startServer(port: number): Deno.ChildProcess {
  return new Deno.Command("deno", {
    args: ["serve", "-A", "--port", String(port), join("_fresh", "server.js")],
    stdout: "null",
    stderr: "null",
  }).spawn();
}

async function waitReady(base: string): Promise<void> {
  for (let attempt = 0; attempt < 120; attempt++) {
    try {
      const res = await fetch(base);
      await res.body?.cancel();
      return;
    } catch {
      await delay(500);
    }
  }

  throw new Error(`server at ${base} never came up`);
}

async function sitemapPaths(base: string): Promise<string[]> {
  const res = await fetch(`${base}/sitemap.xml`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  return locs.map((loc) => new URL(loc).pathname);
}

async function renderPage(base: string, path: string): Promise<void> {
  const res = await fetch(`${base}${path}`);
  if (!res.ok) throw new Error(`${path} returned HTTP ${res.status}`);

  const html = await res.text();
  const outDir = path === "/" ? PUBLIC : join(PUBLIC, path);

  await Deno.mkdir(outDir, { recursive: true });
  await Deno.writeTextFile(join(outDir, "index.html"), html);
}

async function copyTree(src: string, dest: string): Promise<void> {
  for await (const entry of Deno.readDir(src)) {
    if (SKIP_COPY.has(entry.name)) continue;

    const from = join(src, entry.name);
    const to = join(dest, entry.name);

    if (entry.isDirectory) {
      await Deno.mkdir(to, { recursive: true });
      await copyTree(from, to);
      continue;
    }

    await Deno.copyFile(from, to);
  }
}

async function main(): Promise<void> {
  const port = freePort();
  const base = `http://localhost:${port}`;

  console.log("→ cleaning public/");
  await cleanPublic();

  console.log("→ building production bundle");
  await runBuild();

  console.log(`→ serving _fresh on ${base}`);
  const server = startServer(port);

  try {
    await waitReady(base);

    const paths = await sitemapPaths(base);
    console.log(`→ rendering ${paths.length} pages`);
    for (const path of paths) {
      await renderPage(base, path);
      console.log(`   ${path}`);
    }
  } finally {
    server.kill("SIGTERM");
    await server.status;
  }

  console.log("→ copying client assets");
  await copyTree(CLIENT, PUBLIC);

  console.log("✓ static site written to public/");
}

await main();
