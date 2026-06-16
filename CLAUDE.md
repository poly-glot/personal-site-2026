# personal-site-2026: Project Contract

A Deno/Fresh personal site. Deno only — no other runtime or backend. The Fresh
app lives at the repo root; `example/` holds the static design mockup the site
is built from. This file loads every session. The enforceable conventions live
in [`.claude/rules/`](.claude/rules/). Read them.

## Core principles

- **Simplicity first.** The smallest change that correctly solves the problem
  wins. Justify added machinery against the current scale, not a hypothetical
  one.
- **No laziness, no band-aids.** Fix root causes, not symptoms. If you patch a
  symptom to unblock, say so and name the real fix.
- **Declarative, testable, maintainable.** Senior-level code: clear names,
  focused units, no clever one-liners, behavior covered by tests.

## Verify before "done" (non-negotiable)

A change is done only when the gate passes and, for anything user-visible, you
have confirmed the rendered result against the running app.

- Any change: `deno task check` (fmt check, lint, type-check) exits 0.
- User-visible change: also `curl` the affected route and look at the page.
  Type-checks miss CSS and width regressions.
- Cite the evidence in your summary. The Stop hook runs the gate and blocks
  turn-end on failure. The visual check is yours to do.

The recurring failure: you verify a narrow probe, declare done, and then the
user opens the page and it is still broken.

## Source of truth

The stack version lives in **`deno.json`**. Docs and rules describe it; they
never override it. When a doc disagrees with `deno.json`, fix the doc.

## Knowledge hierarchy

- **Durable canon:** this file and `.claude/rules/`, version-controlled and
  inherited by subagents.
- **Session and project state:** `memory.md`, `docs/superpowers/` specs and
  plans.
- **Scratch:** home-dir auto-memory. Capture a lesson there, then _promote_ it
  into a rule here. It isn't shared, so don't rely on it.

## Communication

When debugging stalls past two or three cycles, stop narrating ruled-out
hypotheses. Give the user an **issue / scope / fix** snapshot they can act on,
then execute.

## Phase 2 invariants

### URL canonicalization

- Blog: `/blog/` (all, page 1) · `/blog/{page}/` (all, page N) ·
  `/blog/topic/{vals}/year/{vals}/read/{vals}/{page}/` (filtered) — only
  non-empty facets appear; facet order is fixed topic→year→read; topic and read
  vals sorted alphabetically, years ascending. Read buckets are
  `quick`/`standard`/`deep` (≤7 / 8–11 / 12+ min). Non-canonical → 301.
- Work: `/work/` (all) · `/work/domain/{vals}/stack/{vals}/year/{vals}/{page}/`
  — only non-empty facets appear; vals within each facet sorted alphabetically
  (years ascending). Non-canonical → 301.
- Slug partition is greedy longest-match. Unknown slug → 404, bad page number
  → 404.

### `assertUnambiguous` — pairs-only round-trip

`assertUnambiguous` verifies every ordered pair `(a, b)` from the vocab
satisfies `partitionSlugs(a+"-"+b)` → `[a, b]`. This does not cover triples, but
a triples collision is unreachable for the current fixed `BLOG_TOPICS` and
`WORK_DOMAINS` vocabularies (exhaustively verified at authoring time). Do not
relax to `=== null`; that misses infix-overlap collisions.

### h2/h3 id stability contract

Heading ids in compiled `BlockNode[]` come from the markdown source. When the
mockup's id differs from `slugify(text)`, the markdown file carries an explicit
`{#id}` suffix on that heading line. Never regenerate content markdown without
preserving those explicit ids — the generated `content.gen.ts` and the TOC both
depend on stable ids that match the mockup.

## Rules index

- [`common.md`](.claude/rules/common.md): cross-cutting (trailing newline,
  root-cause over band-aid, no commented-out code).
- [`web.md`](.claude/rules/web.md): Fresh/Preact (islands, no inline styles,
  `.bleed-rule`, tokens).
- [`architecture.md`](.claude/rules/architecture.md): smallest-change
  discipline, data assembled in one place, migration discipline.
