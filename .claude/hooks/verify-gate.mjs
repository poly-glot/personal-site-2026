#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

let raw = "";
for await (const chunk of process.stdin) raw += chunk;
const payload = JSON.parse(raw || "{}");

if (payload.stop_hook_active) process.exit(0);

const status = spawnSync("git", ["status", "--porcelain"], {
  cwd: REPO_ROOT,
  encoding: "utf8",
});
const files = (status.stdout || "")
  .split("\n")
  .map((line) => line.slice(3).trim())
  .filter(Boolean);

const codeTouched = files.some((f) => /\.(ts|tsx|js|jsx|json|css|md)$/.test(f));

function gate(label, cmd, args, cwd) {
  const res = spawnSync(cmd, args, { cwd, encoding: "utf8" });
  if (res.status === 0) return true;
  const out = ((res.stdout || "") + (res.stderr || "")).slice(-3000);
  console.error(
    `verify-gate: ${label} FAILED — do not declare done until it passes.\n${out}`,
  );
  return false;
}

let ok = true;
if (codeTouched) {
  ok = gate("deno task check", "deno", ["task", "check"], REPO_ROOT) && ok;
}

process.exit(ok ? 0 : 2);
