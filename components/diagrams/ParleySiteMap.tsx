import type { SketchPage } from "../../src/types.ts";
import {
  Canvas,
  Chip,
  Label,
  Line,
  Measure,
  Node,
  S1,
  S2,
  S3,
  S4,
  S5,
  sheetNodeHeight,
  Sticker,
  Wire,
  Zone,
} from "./parts.tsx";
import { ARROW_GAP, PAGE_H, PAGE_W, Screen, TOKEN } from "./SiteMapParts.tsx";

interface Region {
  lines: readonly string[];
  name: string;
}

interface MenuSticker {
  column: number;
  lines: string[];
  y: number;
}

const SHEET_W = 1600;
const SHEET_LEADING = 24;
const COLUMN_GAP = S5 + S4;
const COLUMN = PAGE_W + COLUMN_GAP;

const ABOUT = 0;
const SERVICES = 1;
const OUR_WORK = 2;
const TEAM = 0;
const DISPATCHES = 1;
const CONTACT = 2;

const HOME: SketchPage = { layout: "hero", name: "Home" };
const FIRST_ROW: readonly SketchPage[] = [
  { layout: "hero", name: "About" },
  { layout: "list", name: "Services" },
  { layout: "banner", name: "Our Work" },
];
const SECOND_ROW: readonly SketchPage[] = [
  { layout: "grid", name: "Team" },
  { layout: "list", name: "Dispatches" },
];
const CONTACT_PAGE: SketchPage = { layout: "form", name: "Contact" };

const SERVICE_NAMES = [
  "Media Relations",
  "Digital & Social",
  "Crisis & Reputation",
  "Issues Advocacy",
  "Podcasts & Audio",
  "Film & Explainers",
  "Design & Development",
];
const REGIONS: readonly Region[] = [
  {
    lines: ["4.71° N · 74.07° W", "A regional think tank, Bogotá"],
    name: "Latin America",
  },
  {
    lines: ["9.08° N · 7.40° E", "A former state governor, West Africa"],
    name: "Africa",
  },
  {
    lines: ["52.23° N · 21.01° E", "A human rights foundation, Central Europe"],
    name: "Europe",
  },
  {
    lines: [
      "33.89° N · 35.50° E",
      "A family-owned infrastructure group, the Levant",
    ],
    name: "Middle East",
  },
  {
    lines: [
      "13.76° N · 100.50° E",
      "A civil society coalition, South East Asia",
    ],
    name: "Asia",
  },
];
const PROFILE_NAMES = [
  "Eleanor Marsh",
  "Tunde Adeyemi-Clarke",
  "Priya Raman",
  "Kasia Nowak",
  "Rafael Duarte",
  "Oliver Grant",
];
const ARTICLE_COUNT = 9;
const CATEGORY_NAMES = [
  "Advocacy",
  "Crisis",
  "Digital",
  "International affairs",
  "Media",
];
const SEARCH_RESULTS = "Search results";
const OTHER_PAGES = [
  "Privacy",
  "Cookies",
  "Accessibility",
  "Image credits",
  "Page not found",
];

const PAGE_COUNT = 1 + FIRST_ROW.length + SECOND_ROW.length + 1 +
  SERVICE_NAMES.length + REGIONS.length + PROFILE_NAMES.length +
  ARTICLE_COUNT + CATEGORY_NAMES.length + 1 + OTHER_PAGES.length;

const FIRST_REGION = 0;

const STICKER_INSET = S2;
const STICKER_SHIFT = S4;

const DESCRIPTION =
  `Parley's ${PAGE_COUNT} pages drawn as small wireframes and lists, with a dot where each link starts and an arrow where it arrives. Home links to the six pages of the menu, drawn in two rows in the order of the menu: About, Services and Our Work, then Team, Dispatches and Contact. Services links to ${SERVICE_NAMES.length} service pages. Our Work, drawn largest because it is the heart of the site, links to ${REGIONS.length} case studies, one for each region, and each is headed by the region's coordinates: Latin America, Africa, Europe, the Middle East and Asia. Team links to ${PROFILE_NAMES.length} profiles. Dispatches links to ${ARTICLE_COUNT} articles, ${CATEGORY_NAMES.length} category pages and the search results page. Five more pages sit under About: Privacy, Cookies, Accessibility, Image credits and Page not found. Orange stickers name what a client came to do: check the region on Our Work, see who leads it on Team, and write in confidence on Contact. One path is marked in blue, the way a client would go: from the Our Work page to the Latin America case study, and from the foot of that case study to the Contact page.`;

const CHIP_W = PAGE_W - S4;
const OTHER_W = (PAGE_W - S1) / 2;
const REGION_W = 480;
const REGION_H = sheetNodeHeight(REGIONS[FIRST_REGION].lines);
const BUS_INSET = S2;
const LIST_INDENT = S4;
const ZONE_PAD = S2;
const ARTICLES_PER_ROW = 3;
const ARTICLE_ROWS = Math.ceil(ARTICLE_COUNT / ARTICLES_PER_ROW);
const ARTICLE_W = (CHIP_W - 2 * ZONE_PAD - (ARTICLES_PER_ROW - 1) * S1) /
  ARTICLES_PER_ROW;
const ZONE_H = 2 * ZONE_PAD + ARTICLE_ROWS * TOKEN + (ARTICLE_ROWS - 1) * S1;

const SPAN = 2 * COLUMN + LIST_INDENT + REGION_W + S3;
const LEFT = (SHEET_W - SPAN) / 2;
const TRUNK_X = LEFT - S3;
const PATH_X = column(OUR_WORK) + LIST_INDENT + REGION_W + S3;
const CONTACT_GAP_X = column(SERVICES) + PAGE_W + COLUMN_GAP / 2;

const HOME_Y = S3;
const HOME_BOTTOM = HOME_Y + PAGE_H;
const FIRST_BUS = HOME_BOTTOM + S3;
const FIRST_Y = FIRST_BUS + S5;
const FIRST_BOTTOM = FIRST_Y + PAGE_H;
const LISTS_Y = FIRST_BOTTOM + S3;

const REGIONS_BOTTOM = regionY(REGIONS.length - 1) + REGION_H;
const REGIONS_CAPTION = REGIONS_BOTTOM + S4;
const SERVICES_CAPTION = rowBottom(LISTS_Y, SERVICE_NAMES.length) + S4;
const OTHER_CAPTION = FIRST_BOTTOM + S4;
const OTHER_Y = OTHER_CAPTION + S2;
const OTHER_BOTTOM = rowBottom(OTHER_Y, Math.ceil(OTHER_PAGES.length / 2));

const SECOND_BUS = Math.max(SERVICES_CAPTION, OTHER_BOTTOM) + S3;
const SECOND_Y = SECOND_BUS + S5;
const SECOND_BOTTOM = SECOND_Y + PAGE_H;
const SECOND_LISTS = SECOND_BOTTOM + S3;
const PROFILES_CAPTION = rowBottom(SECOND_LISTS, PROFILE_NAMES.length) + S4;

const ARTICLES_BOTTOM = SECOND_LISTS + ZONE_H;
const ARTICLES_CAPTION = ARTICLES_BOTTOM + S4;
const CATEGORIES_Y = ARTICLES_CAPTION + S3;
const CATEGORIES_CAPTION = rowBottom(CATEGORIES_Y, CATEGORY_NAMES.length) + S4;
const SEARCH_Y = CATEGORIES_CAPTION + S3;
const SEARCH_BOTTOM = SEARCH_Y + TOKEN;

const CONTACT_Y = REGIONS_CAPTION + S5;
const CONTACT_MIDDLE = CONTACT_Y + PAGE_H / 2;
const HEIGHT = Math.max(SEARCH_BOTTOM, CONTACT_Y + PAGE_H, PROFILES_CAPTION) +
  S3 + S3;

const STICKERS: readonly MenuSticker[] = [
  { column: OUR_WORK, lines: ["Check the", "region"], y: FIRST_Y },
  { column: TEAM, lines: ["See who", "leads it"], y: SECOND_Y },
  { column: CONTACT, lines: ["Write in", "confidence"], y: CONTACT_Y },
];

const HEAD_LENGTH = 10;
const HEAD_FLANK = 7;

function column(index: number): number {
  return LEFT + index * COLUMN;
}

function centre(index: number): number {
  return column(index) + PAGE_W / 2;
}

function rowY(top: number, index: number): number {
  return top + index * (TOKEN + S1);
}

function rowMiddle(top: number, index: number): number {
  return rowY(top, index) + TOKEN / 2;
}

function rowBottom(top: number, count: number): number {
  return rowY(top, count - 1) + TOKEN;
}

function regionY(index: number): number {
  return LISTS_Y + index * (REGION_H + S2);
}

function regionMiddle(index: number): number {
  return regionY(index) + REGION_H / 2;
}

function chevron(x: number, y: number, direction: 1 | -1): string {
  const back = x - direction * HEAD_LENGTH;

  return `M${back} ${y - HEAD_FLANK} L${x} ${y} L${back} ${y + HEAD_FLANK}`;
}

function stub(fromX: number, y: number, toX: number): string {
  return `M${fromX} ${y} L${toX - ARROW_GAP} ${y}`;
}

function ChipList(
  { left, names, top }: {
    left: number;
    names: readonly string[];
    top: number;
  },
) {
  const busX = left + BUS_INSET;
  const chipX = left + LIST_INDENT;

  return (
    <g>
      <Line
        d={`M${busX} ${top - S3} L${busX} ${rowMiddle(top, names.length - 1)}`}
        from="dot"
      />
      {names.map((name, index) => (
        <g key={name}>
          <Wire d={stub(busX, rowMiddle(top, index), chipX)} />
          <Chip
            h={TOKEN}
            plain
            text={name}
            w={CHIP_W}
            x={chipX}
            y={rowY(top, index)}
          />
        </g>
      ))}
    </g>
  );
}

function Regions() {
  const left = column(OUR_WORK);
  const busX = left + BUS_INSET;
  const nodeX = left + LIST_INDENT;

  return (
    <g>
      <Line
        d={`M${busX} ${FIRST_BOTTOM} L${busX} ${
          regionMiddle(REGIONS.length - 1)
        }`}
        from="dot"
      />
      {REGIONS.map((region, index) => (
        <g key={region.name}>
          {index !== FIRST_REGION && (
            <Wire d={stub(busX, regionMiddle(index), nodeX)} />
          )}
          <Node
            h={REGION_H}
            lines={region.lines}
            title={region.name}
            tone={index === FIRST_REGION ? "focal" : undefined}
            w={REGION_W}
            x={nodeX}
            y={regionY(index)}
          />
        </g>
      ))}
      <Label
        kind="caption"
        text={`${REGIONS.length} case studies, one for each region`}
        x={left}
        y={REGIONS_CAPTION}
      />
    </g>
  );
}

function Dispatches() {
  const left = column(DISPATCHES);
  const busX = left + BUS_INSET;
  const chipX = left + LIST_INDENT;

  return (
    <g>
      <Line
        d={`M${busX} ${SECOND_BOTTOM} L${busX} ${SEARCH_Y + TOKEN / 2}`}
        from="dot"
      />

      <Wire d={stub(busX, SECOND_LISTS + ZONE_H / 2, chipX)} />
      <Zone h={ZONE_H} w={CHIP_W} x={chipX} y={SECOND_LISTS} />
      {Array.from({ length: ARTICLE_COUNT }, (_, index) => (
        <Chip
          h={TOKEN}
          key={index}
          text={String(index + 1)}
          w={ARTICLE_W}
          x={chipX + ZONE_PAD +
            (index % ARTICLES_PER_ROW) * (ARTICLE_W + S1)}
          y={SECOND_LISTS + ZONE_PAD +
            Math.floor(index / ARTICLES_PER_ROW) * (TOKEN + S1)}
        />
      ))}
      <Label
        kind="caption"
        text={`${ARTICLE_COUNT} articles`}
        x={chipX}
        y={ARTICLES_CAPTION}
      />

      {CATEGORY_NAMES.map((name, index) => (
        <g key={name}>
          <Wire d={stub(busX, rowMiddle(CATEGORIES_Y, index), chipX)} />
          <Chip
            h={TOKEN}
            plain
            text={name}
            w={CHIP_W}
            x={chipX}
            y={rowY(CATEGORIES_Y, index)}
          />
        </g>
      ))}
      <Label
        kind="caption"
        text={`${CATEGORY_NAMES.length} categories`}
        x={chipX}
        y={CATEGORIES_CAPTION}
      />

      <Wire d={stub(busX, SEARCH_Y + TOKEN / 2, chipX)} />
      <Chip
        h={TOKEN}
        plain
        text={SEARCH_RESULTS}
        w={CHIP_W}
        x={chipX}
        y={SEARCH_Y}
      />
    </g>
  );
}

function OtherPages() {
  return (
    <g>
      <Label
        kind="caption"
        text={`${OTHER_PAGES.length} more pages`}
        x={column(ABOUT)}
        y={OTHER_CAPTION}
      />
      {OTHER_PAGES.map((name, index) => (
        <Chip
          h={TOKEN}
          key={name}
          plain
          text={name}
          w={OTHER_W}
          x={column(ABOUT) + (index % 2) * (OTHER_W + S1)}
          y={rowY(OTHER_Y, Math.floor(index / 2))}
        />
      ))}
    </g>
  );
}

function MenuBuses() {
  const trunk = `M${centre(SERVICES)} ${HOME_BOTTOM} L${
    centre(SERVICES)
  } ${FIRST_BUS} L${TRUNK_X} ${FIRST_BUS} L${TRUNK_X} ${SECOND_BUS} L${CONTACT_GAP_X} ${SECOND_BUS} L${CONTACT_GAP_X} ${CONTACT_MIDDLE} L${
    column(CONTACT) - ARROW_GAP
  } ${CONTACT_MIDDLE}`;

  return (
    <g>
      <Wire d={trunk} from="dot" />
      <Line
        d={`M${centre(SERVICES)} ${FIRST_BUS} L${
          centre(OUR_WORK)
        } ${FIRST_BUS}`}
      />
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

function ClientPath() {
  const busX = column(OUR_WORK) + BUS_INSET;
  const nodeX = column(OUR_WORK) + LIST_INDENT;
  const nodeRight = nodeX + REGION_W;
  const regionTip = nodeX - ARROW_GAP;
  const contactTip = column(CONTACT) + PAGE_W + ARROW_GAP;
  const middle = regionMiddle(FIRST_REGION);

  const toCaseStudy =
    `M${busX} ${FIRST_BOTTOM} L${busX} ${middle} L${regionTip} ${middle}`;
  const toContact =
    `M${nodeRight} ${middle} L${PATH_X} ${middle} L${PATH_X} ${CONTACT_MIDDLE} L${contactTip} ${CONTACT_MIDDLE}`;

  return (
    <Measure
      d={[
        toCaseStudy,
        chevron(regionTip, middle, 1),
        toContact,
        chevron(contactTip, CONTACT_MIDDLE, -1),
      ].join(" ")}
    />
  );
}

export default function ParleySiteMap() {
  return (
    <Canvas
      description={DESCRIPTION}
      title={`Parley's ${PAGE_COUNT} pages and how a visitor moves between them`}
      quiet
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Label
        kind="aside"
        text={`Each box is one of the ${PAGE_COUNT} pages.`}
        x={LEFT}
        y={HOME_Y + S4 + S1}
      />
      <Label
        kind="note"
        text="Each arrow is a link,"
        x={LEFT}
        y={HOME_Y + S4 + S1 + SHEET_LEADING + S1}
      />
      <Label
        kind="note"
        text="starting from the dot."
        x={LEFT}
        y={HOME_Y + S4 + S1 + 2 * (SHEET_LEADING + S1)}
      />
      <Label
        kind="aside"
        text="In blue, one path a client takes:"
        x={column(OUR_WORK)}
        y={HOME_Y + S4 + S1}
      />
      <Label
        kind="note"
        text="Our Work, a case study, and Contact."
        x={column(OUR_WORK)}
        y={HOME_Y + S4 + S1 + SHEET_LEADING + S1}
      />

      <Screen page={HOME} x={column(SERVICES)} y={HOME_Y} />
      <MenuBuses />

      <Label kind="caption" text="In the menu" x={LEFT} y={FIRST_Y - S3} />
      {FIRST_ROW.map((page, index) => (
        <Screen
          key={page.name}
          page={page}
          tone={index === OUR_WORK ? "focal" : undefined}
          x={column(index)}
          y={FIRST_Y}
        />
      ))}

      <OtherPages />
      <ChipList
        left={column(SERVICES)}
        names={SERVICE_NAMES}
        top={LISTS_Y}
      />
      <Label
        kind="caption"
        text={`${SERVICE_NAMES.length} services`}
        x={column(SERVICES)}
        y={SERVICES_CAPTION}
      />
      <Regions />

      <Label
        kind="caption"
        text="Also in the menu"
        x={LEFT}
        y={SECOND_Y - S3}
      />
      {SECOND_ROW.map((page, index) => (
        <Screen key={page.name} page={page} x={column(index)} y={SECOND_Y} />
      ))}
      <Screen
        page={CONTACT_PAGE}
        tone="focal"
        x={column(CONTACT)}
        y={CONTACT_Y}
      />

      <ChipList
        left={column(TEAM)}
        names={PROFILE_NAMES}
        top={SECOND_LISTS}
      />
      <Label
        kind="caption"
        text={`${PROFILE_NAMES.length} profiles`}
        x={column(TEAM)}
        y={PROFILES_CAPTION}
      />
      <Dispatches />

      <ClientPath />

      {STICKERS.map((sticker) => (
        <Sticker
          key={sticker.lines.join(" ")}
          lines={sticker.lines}
          x={column(sticker.column) + PAGE_W - STICKER_SHIFT}
          y={sticker.y + STICKER_INSET}
        />
      ))}
    </Canvas>
  );
}
