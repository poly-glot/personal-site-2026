#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const FMT_EXTS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".css",
  ".md",
]);

let raw = "";
for await (const chunk of process.stdin) raw += chunk;

const filePath = JSON.parse(raw || "{}").tool_input?.file_path;
if (
  typeof filePath !== "string" || filePath.length === 0 ||
  filePath.includes("\0")
) {
  process.exit(0);
}

const resolved = path.resolve(filePath);
if (!resolved.startsWith(REPO_ROOT + path.sep)) process.exit(0);

const ext = path.extname(resolved);

function run(cmd, args, cwd) {
  spawnSync(cmd, args, { stdio: "ignore", shell: false, cwd });
}

if (FMT_EXTS.has(ext)) {
  run("deno", ["fmt", resolved], REPO_ROOT);
  run("deno", ["lint", "--fix", resolved], REPO_ROOT);
  console.log(`Auto-formatted ${resolved} (deno fmt + lint --fix).`);
}

process.exit(0);
