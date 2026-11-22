import type { SketchPage } from "../../src/types.ts";
import {
  Canvas,
  Chip,
  Label,
  Line,
  S1,
  S2,
  S3,
  S4,
  S5,
  Sticker,
  Wire,
  Zone,
} from "./parts.tsx";
import { ARROW_GAP, PAGE_H, PAGE_W, Screen, TOKEN } from "./SiteMapParts.tsx";

interface MenuSticker {
  column: number;
  lines: string[];
  row: "first" | "second";
}

const DESCRIPTION =
  "Halveron's 57 pages drawn as small wireframes, with a dot where each link starts and an arrow where it arrives. Home links to the eight sections of the menu, drawn in two rows. The first row holds Our Capabilities, with its eight capability pages; Our Sectors, with its eight sector pages; and Our Thinking, with its 13 articles. The second row holds About Us; Training, which links to Courses and five course pages; Careers, which links to Current opportunities; Forum, which links to three forum meetings; and Conference. Orange stickers mark the four sections each kind of visitor came for: Our Sectors for a leader who wants help, Training for someone choosing a course, Forum for a member joining the forum, and Careers for a job seeker. Contact and News are linked from every page, and seven more pages sit beside them: Search, Sitemap, Cookies, Privacy, Terms of use, Accessibility and Page not found. One path is marked in blue, the way a leader would go: the Utilities sector page links to a case study about complaints at a water utility, and that case study is one of the 13 articles; every page has the Contact link in its header, so the path ends at Contact.";

const SHEET_W = 1600;
const SHEET_LEADING = 24;
const COLUMN = PAGE_W + S3;
const FORK_EXTRA = S3;
const FORK_AFTER = 1;
const LEFT = (SHEET_W - (5 * PAGE_W + 4 * S3 + FORK_EXTRA)) / 2;
const TRUNK_X = LEFT - S3;

const CAPABILITIES = 0;
const SECTORS = 1;
const THINKING = 2;
const CONTACT = 3;
const NEWS = 4;

const TRAINING = 1;
const CAREERS = 2;
const FORUM = 3;
const CONFERENCE = 4;

const HOME: SketchPage = { layout: "hero", name: "Home" };
const FIRST_ROW: readonly SketchPage[] = [
  { layout: "grid", name: "Our Capabilities" },
  { layout: "grid", name: "Our Sectors" },
  { layout: "list", name: "Our Thinking" },
];
const SECOND_ROW: readonly SketchPage[] = [
  { layout: "grid", name: "About Us" },
  { layout: "banner", name: "Training" },
  { layout: "hero", name: "Careers" },
  { layout: "list", name: "Forum" },
  { layout: "banner", name: "Conference" },
];
const CONTACT_PAGE: SketchPage = { layout: "form", name: "Contact" };
const NEWS_PAGE: SketchPage = { layout: "grid", name: "News" };

const CAPABILITY_NAMES = [
  "Business transformation",
  "Operations strategy",
  "Operating model design",
  "Organisational effectiveness",
  "Customer experience",
  "Process improvement",
  "Digital at pace",
  "Learning and development",
];
const SECTOR_NAMES = [
  "Banking",
  "Insurance",
  "Utilities",
  "Travel",
  "Education",
  "Public sector",
  "Healthcare",
  "Managed services",
];
const COURSE_NAMES = [
  "Lean Practitioner",
  "Service Excellence",
  "Operational Coaching",
  "Operations Management",
  "Stakeholder Engagement",
];
const MEETING_NAMES = ["March 2026", "June 2026", "November 2026"];
const OPPORTUNITIES = ["Current opportunities"];
const OTHER_PAGES = [
  "Search",
  "Sitemap",
  "Cookies",
  "Privacy",
  "Terms of use",
  "Accessibility",
  "Page not found",
];
const ARTICLE_COUNT = 13;
const PATH_ARTICLE = ARTICLE_COUNT - 1;
const PATH_SECTOR = SECTOR_NAMES.indexOf("Utilities");

const STICKERS: readonly MenuSticker[] = [
  { column: SECTORS, lines: ["Find", "help"], row: "first" },
  { column: TRAINING, lines: ["Choose", "a course"], row: "second" },
  { column: CAREERS, lines: ["Find", "a job"], row: "second" },
  { column: FORUM, lines: ["Join the", "forum"], row: "second" },
];
const STICKER_INSET = S2;
const STICKER_SHIFT = S4;

const CHIP_W = PAGE_W - S4;
const NESTED_W = CHIP_W - S4;
const BUS_INSET = S2;
const ZONE_PAD = S2;
const ARTICLES_PER_ROW = 4;
const ARTICLE_W = (PAGE_W - 2 * ZONE_PAD - (ARTICLES_PER_ROW - 1) * S1) /
  ARTICLES_PER_ROW;
const ARTICLE_ROWS = Math.ceil(ARTICLE_COUNT / ARTICLES_PER_ROW);
const ZONE_H = 2 * ZONE_PAD + ARTICLE_ROWS * TOKEN + (ARTICLE_ROWS - 1) * S1;
const OTHER_PER_ROW = 3;
const OTHER_W = (2 * PAGE_W + S3 - (OTHER_PER_ROW - 1) * S1) / OTHER_PER_ROW;

const HOME_Y = S3;
const HOME_BOTTOM = HOME_Y + PAGE_H;
const FIRST_BUS = HOME_BOTTOM + S3;
const FIRST_Y = FIRST_BUS + S5;
const FIRST_BOTTOM = FIRST_Y + PAGE_H;
const FIRST_LISTS = FIRST_BOTTOM + S3;
const FIRST_CAPTION = rowBottom(FIRST_LISTS, CAPABILITY_NAMES.length) + S4;
const SECOND_BUS = FIRST_CAPTION + S3;
const SECOND_Y = SECOND_BUS + S5;
const SECOND_BOTTOM = SECOND_Y + PAGE_H;
const SECOND_LISTS = SECOND_BOTTOM + S3;
const SECOND_CAPTION = rowBottom(SECOND_LISTS, COURSE_NAMES.length + 1) + S4;
const HEIGHT = SECOND_CAPTION + S3;

const ZONE_Y = FIRST_BOTTOM + S4;
const ZONE_BOTTOM = ZONE_Y + ZONE_H;
const PATH_Y = articleY(PATH_ARTICLE) + TOKEN / 2;
const OTHER_CAPTION = PATH_Y + S4;
const OTHER_Y = OTHER_CAPTION + S2;

function rowY(top: number, index: number): number {
  return top + index * (TOKEN + S1);
}

function rowMiddle(top: number, index: number): number {
  return rowY(top, index) + TOKEN / 2;
}

function rowBottom(top: number, count: number): number {
  return rowY(top, count - 1) + TOKEN;
}

function column(index: number): number {
  const fork = index > FORK_AFTER ? FORK_EXTRA : 0;

  return LEFT + index * COLUMN + fork;
}

function centre(index: number): number {
  return column(index) + PAGE_W / 2;
}

function articleX(index: number): number {
  const across = index % ARTICLES_PER_ROW;

  return column(THINKING) + ZONE_PAD + across * (ARTICLE_W + S1);
}

function articleY(index: number): number {
  const down = Math.floor(index / ARTICLES_PER_ROW);

  return ZONE_Y + ZONE_PAD + down * (TOKEN + S1);
}

function ChipList(
  { focus, left, names, top }: {
    focus?: number;
    left: number;
    names: readonly string[];
    top: number;
  },
) {
  const busX = left + BUS_INSET;
  const lastMiddle = rowMiddle(top, names.length - 1);

  return (
    <g>
      <Line
        d={`M${busX} ${top - S3} L${busX} ${lastMiddle}`}
        from="dot"
      />
      {names.map((name, index) => (
        <g key={name}>
          <Wire
            d={`M${busX} ${rowMiddle(top, index)} L${left + S4 - ARROW_GAP} ${
              rowMiddle(top, index)
            }`}
          />
          <Chip
            h={TOKEN}
            plain
            text={name}
            tone={index === focus ? "focal" : undefined}
            w={CHIP_W}
            x={left + S4}
            y={rowY(top, index)}
          />
        </g>
      ))}
    </g>
  );
}

function CourseList() {
  const left = column(TRAINING);
  const busX = left + BUS_INSET;
  const nestedBusX = left + S4 + BUS_INSET;
  const nestedX = left + 2 * S4;
  const nestedTop = rowY(SECOND_LISTS, 1);
  const lastMiddle = rowMiddle(SECOND_LISTS, COURSE_NAMES.length);

  return (
    <g>
      <Line
        d={`M${busX} ${SECOND_LISTS - S3} L${busX} ${
          rowMiddle(SECOND_LISTS, 0)
        }`}
        from="dot"
      />
      <Wire
        d={`M${busX} ${rowMiddle(SECOND_LISTS, 0)} L${left + S4 - ARROW_GAP} ${
          rowMiddle(SECOND_LISTS, 0)
        }`}
      />
      <Chip
        h={TOKEN}
        plain
        text="Courses"
        w={CHIP_W}
        x={left + S4}
        y={SECOND_LISTS}
      />
      <Line
        d={`M${nestedBusX} ${
          SECOND_LISTS + TOKEN
        } L${nestedBusX} ${lastMiddle}`}
        from="dot"
      />
      {COURSE_NAMES.map((name, index) => (
        <g key={name}>
          <Wire
            d={`M${nestedBusX} ${rowMiddle(nestedTop, index)} L${
              nestedX - ARROW_GAP
            } ${rowMiddle(nestedTop, index)}`}
          />
          <Chip
            h={TOKEN}
            plain
            text={name}
            w={NESTED_W}
            x={nestedX}
            y={rowY(nestedTop, index)}
          />
        </g>
      ))}
    </g>
  );
}

function Articles() {
  return (
    <g>
      <Wire
        d={`M${centre(THINKING)} ${FIRST_BOTTOM} L${centre(THINKING)} ${
          ZONE_Y - ARROW_GAP
        }`}
        from="dot"
      />
      <Zone h={ZONE_H} w={PAGE_W} x={column(THINKING)} y={ZONE_Y} />
      {Array.from({ length: ARTICLE_COUNT }, (_, index) => (
        <Chip
          h={TOKEN}
          key={index}
          text={String(index + 1)}
          tone={index === PATH_ARTICLE ? "focal" : undefined}
          w={ARTICLE_W}
          x={articleX(index)}
          y={articleY(index)}
        />
      ))}
      <Label
        kind="caption"
        text="13 articles"
        x={column(THINKING)}
        y={ZONE_BOTTOM + S4}
      />
    </g>
  );
}

function LeaderPath() {
  const sectorRight = column(SECTORS) + PAGE_W;
  const sectorMiddle = rowMiddle(FIRST_LISTS, PATH_SECTOR);
  const forkX = sectorRight + (column(THINKING) - sectorRight) / 2;
  const articleLeft = articleX(PATH_ARTICLE);
  const articleRight = articleLeft + ARTICLE_W;

  return (
    <g>
      <Wire
        d={`M${sectorRight} ${sectorMiddle} L${forkX} ${sectorMiddle} L${forkX} ${PATH_Y} L${
          articleLeft - ARROW_GAP
        } ${PATH_Y}`}
        from="dot"
      />
      <Wire
        d={`M${articleRight} ${PATH_Y} L${centre(CONTACT)} ${PATH_Y} L${
          centre(CONTACT)
        } ${FIRST_BOTTOM + ARROW_GAP}`}
        from="dot"
      />
    </g>
  );
}

function MenuBuses() {
  const trunk = `M${centre(THINKING)} ${HOME_BOTTOM} L${
    centre(THINKING)
  } ${FIRST_BUS} L${TRUNK_X} ${FIRST_BUS} L${TRUNK_X} ${SECOND_BUS} L${
    centre(CONFERENCE)
  } ${SECOND_BUS}`;

  return (
    <g>
      <Line d={trunk} from="dot" />
      {FIRST_ROW.map((page, index) => (
        <Wire
          d={`M${centre(index)} ${FIRST_BUS} L${centre(index)} ${
            FIRST_Y - ARROW_GAP
          }`}
          key={page.name}
        />
      ))}
      {SECOND_ROW.map((page, index) => (
        <Wire
          d={`M${centre(index)} ${SECOND_BUS} L${centre(index)} ${
            SECOND_Y - ARROW_GAP
          }`}
          key={page.name}
        />
      ))}
    </g>
  );
}

function OtherPages() {
  return (
    <g>
      <Label
        kind="caption"
        text="7 more pages"
        x={column(CONTACT)}
        y={OTHER_CAPTION}
      />
      {OTHER_PAGES.map((name, index) => (
        <Chip
          h={TOKEN}
          key={name}
          plain
          text={name}
          w={OTHER_W}
          x={column(CONTACT) + (index % OTHER_PER_ROW) * (OTHER_W + S1)}
          y={rowY(OTHER_Y, Math.floor(index / OTHER_PER_ROW))}
        />
      ))}
    </g>
  );
}

export default function HalveronSiteMap() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="Halveron's 57 pages and how a visitor moves between them"
      quiet
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Label
        kind="aside"
        text="Each box is one of the 57 pages."
        x={LEFT}
        y={HOME_Y + S4 + S1}
      />
      <Label
        kind="note"
        text="Each arrow is a link, starting from the dot."
        x={LEFT}
        y={HOME_Y + S4 + S1 + SHEET_LEADING + S1}
      />
      <Label
        kind="aside"
        text="In blue, one path a leader takes:"
        x={column(CONTACT)}
        y={HOME_Y + S4 + S1}
      />
      <Label
        kind="note"
        text="a sector, a case study it links to, and Contact."
        x={column(CONTACT)}
        y={HOME_Y + S4 + S1 + SHEET_LEADING + S1}
      />

      <Screen page={HOME} x={column(THINKING)} y={HOME_Y} />
      <MenuBuses />

      <Label kind="caption" text="In the menu" x={LEFT} y={FIRST_Y - S3} />
      {FIRST_ROW.map((page, index) => (
        <Screen key={page.name} page={page} x={column(index)} y={FIRST_Y} />
      ))}
      <Label
        kind="caption"
        text="Linked from every page"
        x={column(CONTACT)}
        y={FIRST_Y - S3}
      />
      <Screen
        page={CONTACT_PAGE}
        tone="focal"
        x={column(CONTACT)}
        y={FIRST_Y}
      />
      <Screen page={NEWS_PAGE} x={column(NEWS)} y={FIRST_Y} />

      <ChipList
        left={column(CAPABILITIES)}
        names={CAPABILITY_NAMES}
        top={FIRST_LISTS}
      />
      <Label
        kind="caption"
        text="8 capabilities"
        x={column(CAPABILITIES)}
        y={FIRST_CAPTION}
      />
      <ChipList
        focus={PATH_SECTOR}
        left={column(SECTORS)}
        names={SECTOR_NAMES}
        top={FIRST_LISTS}
      />
      <Label
        kind="caption"
        text="8 sectors"
        x={column(SECTORS)}
        y={FIRST_CAPTION}
      />
      <Articles />
      <LeaderPath />
      <OtherPages />

      <Label
        kind="caption"
        text="Also in the menu"
        x={LEFT}
        y={SECOND_Y - S3}
      />
      {SECOND_ROW.map((page, index) => (
        <Screen key={page.name} page={page} x={column(index)} y={SECOND_Y} />
      ))}

      <CourseList />
      <Label
        kind="caption"
        text="5 courses"
        x={column(TRAINING)}
        y={SECOND_CAPTION}
      />
      <ChipList
        left={column(CAREERS)}
        names={OPPORTUNITIES}
        top={SECOND_LISTS}
      />
      <ChipList
        left={column(FORUM)}
        names={MEETING_NAMES}
        top={SECOND_LISTS}
      />
      <Label
        kind="caption"
        text="3 meetings"
        x={column(FORUM)}
        y={rowBottom(SECOND_LISTS, MEETING_NAMES.length) + S4}
      />

      {STICKERS.map((sticker) => (
        <Sticker
          key={sticker.lines.join(" ")}
          lines={sticker.lines}
          x={column(sticker.column) + PAGE_W - STICKER_SHIFT}
          y={(sticker.row === "first" ? FIRST_Y : SECOND_Y) + STICKER_INSET}
        />
      ))}
    </Canvas>
  );
}
