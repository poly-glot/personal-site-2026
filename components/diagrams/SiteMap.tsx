import type { SketchPage } from "../../src/types.ts";
import {
  Canvas,
  Chip,
  Label,
  S1,
  S2,
  S3,
  S4,
  S5,
  Spotlight,
  Sticker,
} from "./parts.tsx";
import {
  Cards,
  cardWidth,
  cardX,
  centres,
  FanOut,
  PAGE_H,
  PAGE_W,
  Screen,
  TOKEN,
} from "./SiteMapParts.tsx";

const DESCRIPTION =
  "Academy's 26 pages drawn as small wireframes, with a dot where each link starts and an arrow where it arrives. Orange stickers mark the pages that matter most: Certification, the core offer, shaded together with its five certificate pages; Membership, where people join; and My Academy, the members' area. Home links to the five sections in the menu: About, Membership, Certification, Courses and Community. Certification links to five certificate pages: FCCP, CCPP, CCM, CSA and CCR. Under About are ten people, drawn dashed because they have no pages of their own. Linked from the header and footer of every page are News and media, which links to six articles, Contact, My Academy, and six text pages: careers, terms, copyright, privacy, accessibility and page not found.";

const SHEET_W = 1600;
const COLUMN = PAGE_W + S4;
const LEFT = (SHEET_W - 5 * PAGE_W - 4 * S4) / 2;
const SHEET_LEADING = 24;

const HOME: SketchPage = { layout: "hero", name: "Home" };
const MENU: readonly SketchPage[] = [
  { layout: "grid", name: "About" },
  { layout: "hero", name: "Membership" },
  { layout: "banner", name: "Certification" },
  { layout: "list", name: "Courses" },
  { layout: "grid", name: "Community" },
];
const LINKED: readonly SketchPage[] = [
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
