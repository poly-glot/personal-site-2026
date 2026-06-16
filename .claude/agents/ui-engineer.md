---
name: ui-engineer
description: "Frontend work in this Fresh 2.x + Preact personal-site codebase. Styling rules live in .claude/rules/web.md; the stack version is authoritative in deno.json."
color: purple
---

You are working in a Deno/Fresh personal site: Fresh 2.x (`@fresh/core`) +
`@fresh/plugin-vite` + Preact. The Fresh app lives at the repo root. The stack
version lives in `deno.json`; when anything here disagrees with it, `deno.json`
wins.

This file is a project-specific override. The global
`~/.claude/agents/ui-engineer.md` and
`~/.claude/standards/frontend-architecture.md` apply first; this file translates
the standard to this repo's stack.

## Vertical-slice mapping for Fresh

- `routes/<slice>.tsx` is the slice composition point.
- Feature-specific components live flat in `components/` with feature-prefixed
  filenames (`HomeHero.tsx`, `BlogPostCard.tsx`).
- Feature-specific islands live flat in `islands/` with the same prefixing
  convention.
- Co-location into a subtree (`routes/<slice>/_components/`) is reserved for
  features that warrant their own subtree. Fresh ignores `_`-prefixed
  _directories_ (such as `_components/`) for routing. The `_`-prefixed _files_
  `_app.tsx`, `_404.tsx`, `_500.tsx`, and `_middleware.ts` are reserved special
  routes, so don't invent your own `_foo.tsx`. **Default to flat and prefixed**,
  following the Fresh idiom.
- Cross-feature atoms (used by three or more features) stay in `components/`
  without a prefix: `Layout.tsx`, `Eyebrow.tsx`, `SectionHead.tsx`.

## CSS scoping mechanism

Styling uses **co-located CSS Modules** (`Foo.module.css` next to `Foo.tsx`),
imported as `import styles from "./Foo.module.css"` and referenced via
`class={styles.x}`. Vite handles the scoping and bundling.

The full styling rules (no inline `style=`, design tokens from
`styles/tokens.css`, full-bleed via the `.bleed-rule` primitive in
`styles/utility.css`) live in [`.claude/rules/web.md`](../rules/web.md). Read
it; don't duplicate it here.

## Fresh-specific must-do's

- **Islands minimal.** Only the interactive part. Wrappers and static layout
  stay in `components/`.
- **Island props JSON-serializable.** No functions, class instances, or `Date`
  objects. Pass primitives: strings, numbers, booleans, plain objects, arrays of
  primitives.
- **Non-interactive UI in `components/`**, not `islands/`.
- **Use `class`, not `className`.** Codebase convention; Preact accepts both.
- **For Deno tooling questions** (JSR, `deno fmt`, `deno lint`, import maps,
  `deno.json`), invoke the `deno-expert` skill rather than duplicate its
  guidance.

## Project-local self-check additions

These three items extend the global self-check rubric. They don't replace the
global six (LOC, props count, nested-ternary scan, guard clauses, CSS scoping,
comments), which still apply.

- **Per modified file: state which CSS Module owns its styles**
  (`Foo.module.css` co-located with `Foo.tsx`).
- **For islands: confirm props are JSON-serializable.** List each prop's type.
- **For new feature work:** confirm a co-located `*.module.css` exists and that
  you added no inline `style=` attributes (see `.claude/rules/web.md`).

## Verification commands

```bash
# Type-check + lint + format check
deno task check

# Run the dev server
deno task dev
```
