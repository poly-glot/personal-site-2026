# Web Conventions (Fresh 2.x + Preact, Deno)

The stack version lives in **`deno.json`**: Fresh 2.x (`@fresh/core`),
`@fresh/plugin-vite`, and Vite. Co-located CSS Modules (`*.module.css`) are the
styling mechanism. When this file disagrees with `deno.json`, `deno.json` wins,
so fix this file.

- DO: **Islands hold only interactivity.** Interactive bits go in `islands/`;
  static layout and markup stay in `components/` and route files. Keep islands
  minimal.
- DO: **Island props are JSON-serializable.** Strings, numbers, booleans, plain
  objects, arrays. No functions, class instances, or `Date`s across the island
  boundary.
- DO: **Use `class`, not `className`.** Codebase convention; Preact accepts
  both.
- DO: **Route handlers follow the existing `createDefine`/`PageProps` shape.**
  Don't hand-roll context plumbing.

## Styling

- NEVER: **Inline `style=`.** No `style="..."` or `style={{…}}` in any `.tsx`.
  Lift the rule into the co-located `*.module.css` and reference it via
  `class={styles.x}`. The web-guard hook blocks this. Touching a file with a
  pre-existing inline style makes it yours to clean up; "it was already there"
  is not an excuse.
- DO: **Design tokens over hardcoded values.** Use the custom properties in
  `styles/tokens.css` (`--ink`, `--rule`, `--paper`, the spacing scale) instead
  of literal colors or sizes.
- NEVER: **Raw full-bleed geometry.** Don't write `width: 100vw` with
  `position:absolute; left:50%; transform:translateX(-50%)` for a viewport-wide
  rule or strip. Use the `.bleed-rule` primitive in `styles/utility.css`:
  `class="… bleed-rule" data-bleed="bottom|top|both"`. If `.bleed-rule` doesn't
  cover your case, extend the primitive rather than re-derive the raw block. The
  web-guard hook warns on this.

## Comments

- DO: **Keep comments that explain server/client rendering boundaries, island
  hydration caveats, and accessibility rationale.**
- NEVER: **Write JSDoc that restates a typed prop's default**, like
  `/** @default 10 */` over `pageSize = 10`.

## Verify

Run `deno task check` (fmt check, lint, type-check). For any user-visible
change, `curl` the route and confirm the rendered result yourself — green
type-checks don't catch CSS or visual-width changes. See the verify section of
the root [CLAUDE.md](../../CLAUDE.md).
