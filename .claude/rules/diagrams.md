# Diagram Conventions

Every diagram is built from `components/diagrams/parts.tsx`. The parts own the
type, the spacing and the colour. A diagram file holds content and positions,
and never imports `diagram.module.css` or sets a font size.

## Size classes

- DO: **Draw new diagrams on a `Panel`.** A panel is 520 units wide and never
  renders wider than 520px, so on a desktop one unit is one pixel and the type
  is the size the ramp says. It never renders below 0.8, and scrolls sideways on
  a phone before it gets smaller.
- DO: **Put two panels in a `Pair`** for before and after, or step one and step
  two. In a post, wrap the pair in `<Wide>` so both sit side by side. Below a
  900px container they stack.
- DO: **Keep `Canvas` for the 1600-unit sheets on case-study pages.** They
  render at about 0.79, and the sheet ramp is sized so names, notes and labels
  land within a pixel or two of the panel ramp.
- NEVER: **Put a `Pair` outside `<Wide>`.** `Wide` is what gives a pair its
  side-by-side width and its 55px above and below. Without it the panels stack
  in the text column and touch the paragraph above, which is what the host-vote
  diagram did (feedback/img_25).
- NEVER: **Let a canvas scale its type up.** The first OpenGuessr diagrams drew
  640 units in a 688px column. Names rendered at 30px, above the page's 26px
  `h2`, while the same names in a pair rendered at 23px.

## Type roles

Sizes are rendered pixels on a panel. They are `px`, not `rem`, because the
boxes are measured in the same units as the text inside them.

| Role      | Use                                                  | Face                   |
| --------- | ---------------------------------------------------- | ---------------------- |
| `heading` | One per panel or zone: what the reader is looking at | Body 16, bold, ink     |
| `caption` | Column heads, axis titles, names over tokens         | Body 13, medium, muted |
| `name`    | Node titles, group names, a value shown large        | Display 21, ink        |
| `note`    | Node body, secondary labels                          | Body 15, muted         |
| `aside`   | One plain sentence, or the name of a point           | Body 15, medium, ink   |
| `label`   | Arrow and boundary labels                            | Body 13, medium, ink   |
| `data`    | Numbers, formulas, code                              | Mono 13, ink           |

- DO: **Pick a role.** `Node` sets `name` and `note`; `Panel` and `Zone` set
  `heading`; everything else is `<Label kind="…">`.
- DO: **Write every word in sentence case, with normal letter spacing.**
  Headings, legends and labels are words, so they are set in the body face the
  way the page sets its own headings: "Turn it into points", not "TURN IT INTO
  POINTS".
- DO: **Number steps with `step`.** `<Panel step={2} heading="…">` puts a muted
  mono `02` before the heading, the way the table of contents numbers a post.
- NEVER: **Use uppercase or tracked mono for a heading, a legend or a label.**
  On this site that style is a small grey metadata tag and nothing else, and
  capitals with wide spacing read as unnatural in a diagram.
- DO: **Keep mono for numbers, formulas and code.**
- NEVER: **Use the display face below the `name` size, or for more than names.**

## Spacing

- DO: **Take every position from `S1`–`S5`** (8, 13, 21, 34, 55), the same
  ladder as `--s-1`–`--s-5`.
- Panel padding is 21. The heading baseline sits at 34 and column captions at
  68.
- 13 between a caption and the thing it labels, and between siblings.
- 34 between two nodes joined by an arrow, so the arrowhead has room.
- 8 between a point and its label.
- A node has 21 of padding, its name on a baseline 34 down, and notes 21 apart
  from 55. Use `nodeHeight(lines)` for its height.

## Colour

- **Ink** is structure: outlines, arrows, names. **Muted** is everything
  secondary: notes, captions, guides.
- **The diagram blue** (`--diagram`, `#2193b0` in `styles/tokens.css`) is the
  one colour inside a diagram or chart. Amber is the mark for links on this
  site, so it stays out of diagrams, and a reader never has to ask whether
  something coloured is a link.
- The panel behind a diagram is ink at 0.4% opacity (`--d-wash`, one level of
  255), so the 1px rule draws the panel and the fill only lifts it off the page.
  Change the one number to make it stronger or fainter; leave `--panel` alone,
  which the about and case-study pages share.
- DO: **Mark the subject with `tone="focal"`**, a blue tint with a blue outline.
  One idea per panel: a single node, or one row of tokens that reads as a group.
  `BarChart` uses the same blue for the bar it recommends.
- DO: **Use `tone="ghost"`**, a dashed empty outline, for something absent, not
  counted or not built.
- DO: **Use `Boundary`**, a dashed blue line with a caption at its foot, for a
  rule that data has to cross, and **`Measure`** for the quantity a chart is
  about.
- NEVER: **Use amber, or any other hue, inside a diagram, or colour text with
  the diagram blue.**

## Clutter

- DO: **Stop at nine nodes and one focal idea per panel.** Past that, split into
  a pair.
- DO: **Say a repeated label once.** The OpenGuessr answer store went from
  eleven boxes reading "ROUND N COORDINATES" to numbered tokens under one name.
- NEVER: **Put a knockout rectangle behind a label.** End the line short of the
  label, as `Boundary` does.
- Arrows run straight or at right angles. The many-into-one bus is in
  `SharedSocket.tsx`.

## Verify

Run `deno task check`, then look at the diagram at 1440px in light and dark, at
1280px and at 390px. A panel should measure headings 16, names 21, notes 15 and
labels 13 on a desktop, and a sheet about 16, 22, 14 and 13.
