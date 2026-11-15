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
  web-guard hook warns on this. For edge-to-edge row lines inside a list, use
  `.bleed-divider` on each row (a line under every row but the last) and
  `.bleed-divider-top` on the list for an opening line; set
  `--bleed-divider-right` to stop a line short of a neighbouring column.
- NEVER: **`--accent` as a text colour on the page.** The orange is 2.04:1 on
  white, and any orange dark enough to pass 4.5:1 reads brown. Text stays ink
  (`--fg`) and carries the orange as a mark: `text-decoration: var(--mark)` with
  `text-underline-offset: var(--mark-offset)`, or `--mark-display` /
  `--mark-display-offset` at display sizes (the "glue" underline). Hover and
  active states add the mark; they never recolour text.
- DO: **Numerals stay plain.** Index numbers, years and eyebrow numerals are ink
  mono at weight 500 with no mark. The mark is for links, emphasis and hover, so
  it keeps meaning "this is interactive or important".
- DO: **`--accent` only where contrast doesn't apply or already passes.** The
  logotype dot, decorative glyphs (quote marks, list dashes, arrows), borders
  and rules. On inverted ink bands use `--accent-on-band`: orange in light mode
  (10:1 on black), the band's ink in dark mode, where the band turns light.

## Text children

- DO: **Build elements that receive MDX text with `h()`, not JSX.** The prose
  `p`, `li`, `h2` and `h3` in `proseComponents.tsx` do. Preact's precompiled JSX
  escapes string children in place, and when the children mix text with inline
  elements such as a link, the renderer escapes them again, so a quotation mark
  reaches the reader as a literal `&quot;`. `h()` escapes once.
- DO: **Scan every route for `&amp;quot;`, `&amp;amp;` and `&amp;lt;` after
  changing a component that renders `children`.** A page that mixes plain text
  and an inline element is where it shows.

## Links

- DO: **Write external links in MDX as plain Markdown links.** An `http` URL is
  rendered by `proseComponents.a`: `target="_blank"`, `rel="noopener"`, a
  visually hidden "(opens in a new tab)" for screen readers, and the `External`
  arrow for everyone else. Never hand-roll `target="_blank"` in a post.
- DO: **Keep internal links in the same tab.** Relative paths get no attributes
  and no arrow.
- NEVER: **Drop the hidden warning or the arrow to tidy a sentence.** A link
  that opens a new tab without saying so breaks the back button for the people
  who can least afford it.

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
