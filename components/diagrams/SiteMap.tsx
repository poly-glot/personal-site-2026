import {
  Canvas,
  Chip,
  Label,
  Line,
  Node,
  S1,
  S2,
  S3,
  S4,
  S5,
  Sketch,
  Spotlight,
  Sticker,
  Wire,
} from "./parts.tsx";

type Layout = "banner" | "form" | "grid" | "hero" | "list";
type Box = readonly [x: number, y: number, w: number, h: number];

interface Page {
  layout: Layout;
  name: string;
}

const DESCRIPTION =
  "Academy's 26 pages drawn as small wireframes, with a dot where each link starts and an arrow where it arrives. Orange stickers mark the pages that matter most: Certification, the core offer, shaded together with its five certificate pages; Membership, where people join; and My Academy, the members' area. Home links to the five sections in the menu: About, Membership, Certification, Courses and Community. Certification links to five certificate pages: FCCP, CCPP, CCM, CSA and CCR. Under About are ten people, drawn dashed because they have no pages of their own. Linked from the header and footer of every page are News and media, which links to six articles, Contact, My Academy, and six text pages: careers, terms, copyright, privacy, accessibility and page not found.";

const SHEET_W = 1600;
const PAGE_W = 280;
const PAGE_H = 190;
const COLUMN = PAGE_W + S4;
const LEFT = (SHEET_W - 5 * PAGE_W - 4 * S4) / 2;
const PAD = 22;
const SKETCH_TOP = 66;
const ARROW_GAP = 2;
const TOKEN = S4;
const SHEET_LEADING = 24;

const HOME: Page = { layout: "hero", name: "Home" };
const MENU: readonly Page[] = [
  { layout: "grid", name: "About" },
  { layout: "hero", name: "Membership" },
  { layout: "banner", name: "Certification" },
  { layout: "list", name: "Courses" },
  { layout: "grid", name: "Community" },
];
const LINKED: readonly Page[] = [
  { layout: "grid", name: "News & media" },
  { layout: "form", name: "Contact" },
  { layout: "form", name: "My Academy" },
];
const CERTIFICATES = ["FCCP", "CCPP", "CCM", "CSA", "CCR"];
const ARTICLES = ["1", "2", "3", "4", "5", "6"];
const TEXT_PAGES = [
  "Careers",
  "Terms",
  "Copyright",
  "Privacy",
  "Accessibility",
  "Page not found",
];
const STICKERS: readonly {
  column: number;
  lines: string[];
  row: "menu" | "linked";
}[] = [
  { column: 1, lines: ["Join", "here"], row: "menu" },
  { column: 2, lines: ["Core", "offer"], row: "menu" },
  { column: 2, lines: ["Members"], row: "linked" },
];
const STICKER_INSET = S2;
const PEOPLE_ROWS = [0, 1];
const PEOPLE_PER_ROW = [0, 1, 2, 3, 4];

const SKETCHES: Record<Layout, readonly Box[]> = {
  banner: [[0, 0, 236, 8], [0, 18, 236, 40], [0, 68, 236, 8], [0, 82, 180, 8]],
  form: [
    [0, 0, 236, 8],
    [0, 22, 140, 10],
    [0, 42, 236, 14],
    [0, 62, 236, 14],
    [0, 84, 70, 18],
  ],
  grid: [
    [0, 0, 236, 8],
    [0, 20, 120, 10],
    [0, 40, 72, 62],
    [82, 40, 72, 62],
    [164, 40, 72, 62],
  ],
  hero: [
    [0, 0, 236, 8],
    [0, 22, 110, 10],
    [0, 40, 96, 8],
    [0, 54, 104, 8],
    [0, 76, 60, 16],
    [128, 20, 108, 82],
  ],
  list: [
    [0, 0, 236, 8],
    [0, 22, 236, 14],
    [0, 44, 236, 14],
    [0, 66, 236, 14],
    [0, 88, 160, 14],
  ],
};

const ABOUT = 0;
const CERTIFICATION = 2;
const NEWS = 0;
const TEXT_COLUMN = 3;

const HOME_Y = S3;
const BUS_Y = HOME_Y + PAGE_H + S3;
const MENU_Y = BUS_Y + S5;
const CHILD_BUS = MENU_Y + PAGE_H + S3;
const CHILD_Y = CHILD_BUS + S4;
const CHILD_CAPTION = CHILD_Y + 2 * TOKEN + S1 + S4;
const LINKED_Y = CHILD_CAPTION + S5 + S3;
const ARTICLE_BUS = LINKED_Y + PAGE_H + S3;
const ARTICLES_Y = ARTICLE_BUS + S4;
const ARTICLE_CAPTION = ARTICLES_Y + S5 + S4;
const HEIGHT = ARTICLE_CAPTION + S3;

function column(index: number): number {
  return LEFT + index * COLUMN;
}

function centre(index: number): number {
  return column(index) + PAGE_W / 2;
}

function cardWidth(count: number, span: number): number {
  return (span - (count - 1) * S1) / count;
}

function cardX(left: number, width: number, index: number): number {
  return left + index * (width + S1);
}

function Screen({ page, x, y }: { page: Page; x: number; y: number }) {
  return (
    <g>
      <Node h={PAGE_H} lines={[]} title={page.name} w={PAGE_W} x={x} y={y} />
      {SKETCHES[page.layout].map(([dx, dy, w, h]) => (
        <Sketch
          h={h}
          key={`${dx}-${dy}`}
          w={w}
          x={x + PAD + dx}
          y={y + SKETCH_TOP + dy}
        />
      ))}
    </g>
  );
}

function FanOut(
  { from, fromY, busY, targets, topY }: {
    busY: number;
    from: number;
    fromY: number;
    targets: readonly number[];
    topY: number;
  },
) {
  const first = Math.min(from, ...targets);
  const last = Math.max(from, ...targets);

  return (
    <g>
      <Line d={`M${from} ${fromY} L${from} ${busY}`} from="dot" />
      <Line d={`M${first} ${busY} L${last} ${busY}`} />
      {targets.map((x) => (
        <Wire d={`M${x} ${busY} L${x} ${topY - ARROW_GAP}`} key={x} />
      ))}
    </g>
  );
}

function Cards(
  { h, labels, left, span, y }: {
    h: number;
    labels: readonly string[];
    left: number;
    span: number;
    y: number;
  },
) {
  const width = cardWidth(labels.length, span);

  return (
    <g>
      {labels.map((label, index) => (
        <Chip
          h={h}
          key={label}
          text={label}
          w={width}
          x={cardX(left, width, index)}
          y={y}
        />
      ))}
    </g>
  );
}

function centres(labels: readonly string[], left: number): number[] {
  const width = cardWidth(labels.length, PAGE_W);

  return labels.map((_, index) => cardX(left, width, index) + width / 2);
}

export default function SiteMap() {
  const textWidth = cardWidth(3, 2 * PAGE_W + S4);

  return (
    <Canvas
      description={DESCRIPTION}
      title="Academy's 26 pages and how a visitor moves between them"
      quiet
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Spotlight
        h={CHILD_CAPTION + S3 - (MENU_Y - S2)}
        w={PAGE_W + 2 * S2}
        x={column(CERTIFICATION) - S2}
        y={MENU_Y - S2}
      />

      <Label
        kind="aside"
        text="Each box is one of the 26 pages."
        x={LEFT}
        y={HOME_Y + S4 + S1}
      />
      <Label
        kind="note"
        text="Each arrow is a link, starting from the dot."
        x={LEFT}
        y={HOME_Y + S4 + S1 + SHEET_LEADING + S1}
      />

      <Screen page={HOME} x={column(CERTIFICATION)} y={HOME_Y} />

      <FanOut
        busY={BUS_Y}
        from={centre(CERTIFICATION)}
        fromY={HOME_Y + PAGE_H}
        targets={MENU.map((_, index) => centre(index))}
        topY={MENU_Y}
      />

      <Label kind="caption" text="In the menu" x={LEFT} y={MENU_Y - S3} />
      {MENU.map((page, index) => (
        <Screen key={page.name} page={page} x={column(index)} y={MENU_Y} />
      ))}

      {PEOPLE_ROWS.map((row) =>
        PEOPLE_PER_ROW.map((person) => (
          <Chip
            key={`${row}-${person}`}
            tone="ghost"
            w={TOKEN}
            x={cardX(column(ABOUT), TOKEN, person)}
            y={CHILD_Y + row * (TOKEN + S1)}
          />
        ))
      )}
      <Label
        kind="caption"
        text="10 people, shown on About, with no pages of their own"
        x={column(ABOUT)}
        y={CHILD_CAPTION}
      />

      <FanOut
        busY={CHILD_BUS}
        from={centre(CERTIFICATION)}
        fromY={MENU_Y + PAGE_H}
        targets={centres(CERTIFICATES, column(CERTIFICATION))}
        topY={CHILD_Y}
      />
      <Cards
        h={S5}
        labels={CERTIFICATES}
        left={column(CERTIFICATION)}
        span={PAGE_W}
        y={CHILD_Y}
      />
      <Label
        kind="caption"
        text="5 certificate pages"
        x={column(CERTIFICATION)}
        y={CHILD_CAPTION}
      />

      <Label
        kind="caption"
        text="Linked from the header and footer of every page"
        x={LEFT}
        y={LINKED_Y - S3}
      />
      {LINKED.map((page, index) => (
        <Screen key={page.name} page={page} x={column(index)} y={LINKED_Y} />
      ))}

      <Label
        kind="caption"
        text="6 text pages, in the footer"
        x={column(TEXT_COLUMN)}
        y={LINKED_Y - S3}
      />
      {[0, 1].map((row) => (
        <Cards
          h={TOKEN}
          key={row}
          labels={TEXT_PAGES.slice(row * 3, row * 3 + 3)}
          left={column(TEXT_COLUMN)}
          span={3 * textWidth + 2 * S1}
          y={LINKED_Y + row * (TOKEN + S1)}
        />
      ))}

      <FanOut
        busY={ARTICLE_BUS}
        from={centre(NEWS)}
        fromY={LINKED_Y + PAGE_H}
        targets={centres(ARTICLES, column(NEWS))}
        topY={ARTICLES_Y}
      />
      <Cards
        h={S5}
        labels={ARTICLES}
        left={column(NEWS)}
        span={PAGE_W}
        y={ARTICLES_Y}
      />
      <Label
        kind="caption"
        text="6 articles"
        x={column(NEWS)}
        y={ARTICLE_CAPTION}
      />

      {STICKERS.map((sticker) => (
        <Sticker
          key={sticker.lines.join(" ")}
          lines={sticker.lines}
          x={column(sticker.column) + PAGE_W - STICKER_INSET}
          y={(sticker.row === "menu" ? MENU_Y : LINKED_Y) + STICKER_INSET}
        />
      ))}
    </Canvas>
  );
}
