import type { SketchPage } from "../../src/types.ts";
import {
  Canvas,
  Chip,
  Dot,
  Label,
  Line,
  Measure,
  Node,
  S1,
  S2,
  S3,
  S4,
  S5,
  Sketch,
  Sticker,
  Wire,
  Zone,
} from "./parts.tsx";
import { ARROW_GAP, PAGE_H, PAGE_W, Screen, TOKEN } from "./SiteMapParts.tsx";

interface HomeSection {
  cards?: { columns: number; count: number };
  gap: number;
  height: number;
  name: string;
}

interface MenuItem {
  name: string;
  y: number;
}

interface PageSticker {
  lines: readonly string[];
  x: number;
  y: number;
}

interface Office {
  city: string;
  label: string;
}

const SHEET_W = 1600;
const SHEET_LEADING = 24;

const HOME: SketchPage = { layout: "hero", name: "Home" };
const LOW_PAGES: readonly SketchPage[] = [
  { layout: "list", name: "News" },
  { layout: "list", name: "White Papers" },
  { layout: "list", name: "Engagements" },
  { layout: "form", name: "Contact" },
];
const NEWS = 0;
const WHITE_PAPERS = 1;
const ENGAGEMENTS = 2;
const CONTACT = 3;

const PRACTICE_NAMES = [
  "International Arbitration",
  "Commercial Disputes",
  "Investigations & White-Collar Defence",
  "Regulatory & Government Affairs",
  "Public International Law",
  "Asset Tracing & Recovery",
];
const PEOPLE_NAMES = [
  "Eleanor Lisle",
  "Marcus Ferrow",
  "Priya Raman",
  "Jonah Whitcombe",
];
const ARTICLE_COUNT = 6;
const TAG_NAMES = ["Publications", "Litigation"];
const WHITE_PAPER_COUNT = 4;
const ENGAGEMENT_COUNT = 5;
const OTHER_PAGES = ["Page not found"];

const OFFICES: readonly Office[] = [
  { city: "London", label: "Headquarters" },
  { city: "New York", label: "US Office" },
];
const CLIENT_CITIES = ["Dubai", "Singapore", "Johannesburg", "Mexico City"];
const CLIENT_LABEL = "Client work";
const PIN_CITIES = [...OFFICES.map((office) => office.city), ...CLIENT_CITIES];

const MENU_NAMES = [
  "Home",
  "Practice Areas",
  "Our People",
  "Global Presence",
  "News",
  "Media",
  "Contact",
];

const PAGE_COUNT = 1 + PRACTICE_NAMES.length + PEOPLE_NAMES.length +
  LOW_PAGES.length + ARTICLE_COUNT + TAG_NAMES.length + WHITE_PAPER_COUNT +
  ENGAGEMENT_COUNT + OTHER_PAGES.length;

const PRACTICES = 2;
const PROFESSIONALS = 3;
const GLOBAL_PRESENCE = 4;
const FIRST_PRACTICE = 0;
const FIRST_PERSON = 0;

const DESCRIPTION =
  `Ferrow & Lisle's ${PAGE_COUNT} pages, with a dot where each link starts and an arrow where it arrives. The header menu on every page has ${MENU_NAMES.length} items: ${
    MENU_NAMES.slice(0, -1).join(", ")
  } and ${
    MENU_NAMES[MENU_NAMES.length - 1]
  }. Practice Areas, Our People and Global Presence are not pages of their own: each jumps to a section of the home page. Media opens a list of two pages, White Papers and Engagements. The home page is drawn largest because it is one long page, with seven sections in order: the hero, featured news, Our Practices, Our Professionals, Global Presence, Latest News and Contact Us. Our Practices shows ${PRACTICE_NAMES.length} practice areas, each with its own page: ${
    PRACTICE_NAMES.join(", ")
  }. Our Professionals shows ${PEOPLE_NAMES.length} people, each with a page: ${
    PEOPLE_NAMES.join(", ")
  }. Global Presence holds the map with ${PIN_CITIES.length} pins: ${
    OFFICES.map((office) => `${office.city} (${office.label})`).join(", ")
  }, and ${CLIENT_CITIES.slice(0, -1).join(", ")} and ${
    CLIENT_CITIES[CLIENT_CITIES.length - 1]
  } (${CLIENT_LABEL}). Every pin links to the Contact page. The News page links to ${ARTICLE_COUNT} articles and ${TAG_NAMES.length} tag pages, ${
    TAG_NAMES.join(" and ")
  }. White Papers links to ${WHITE_PAPER_COUNT} white papers and Engagements to ${ENGAGEMENT_COUNT} engagements. The menu also links to News, White Papers, Engagements and Contact. Page not found sits apart, as ${OTHER_PAGES.length} more page. Orange stickers name what a client came to do: find the practice on Practice Areas, meet the partner on the people, and call or write on Contact. One path is marked in blue, the way a client would go: from the home page to the International Arbitration page, and from the Our Specialists list on that page to the page of Eleanor Lisle.`;

const HOME_Y = S3;
const HOME_X = 335;
const HOME_W = 340;
const HOME_R = HOME_X + HOME_W;
const BAND_INSET = 22;
const BAND_X = HOME_X + BAND_INSET;
const BAND_W = HOME_W - 2 * BAND_INSET;
const BAND_R = BAND_X + BAND_W;
const BANDS_TOP = 66;
const BAND_LABEL = 27;
const SECTION_H = S4 + S1;
const CARDS_TOP = SECTION_H;

const ZONE_PAD = S2;
const PIN_ROW = 30;
const PINS_H = 2 * ZONE_PAD + PIN_CITIES.length * PIN_ROW;

const SECTIONS: readonly HomeSection[] = [
  { gap: S1, height: SECTION_H, name: "Hero" },
  { gap: S1, height: SECTION_H, name: "Featured news" },
  {
    cards: { columns: 2, count: PRACTICE_NAMES.length },
    gap: S4,
    height: listHeight(PRACTICE_NAMES.length),
    name: "Our Practices",
  },
  {
    cards: { columns: PEOPLE_NAMES.length, count: PEOPLE_NAMES.length },
    gap: S4,
    height: listHeight(PEOPLE_NAMES.length),
    name: "Our Professionals",
  },
  {
    cards: { columns: 1, count: 1 },
    gap: S4,
    height: PINS_H,
    name: "Global Presence",
  },
  { gap: S1, height: SECTION_H, name: "Latest News" },
  { gap: 0, height: SECTION_H, name: "Contact Us" },
];
const LAST_SECTION = SECTIONS.length - 1;
const HOME_BOTTOM = sectionY(LAST_SECTION) + SECTIONS[LAST_SECTION].height +
  BAND_INSET;
const HOME_H = HOME_BOTTOM - HOME_Y;

const GROUP_X = HOME_R + S3;
const BUS_X = GROUP_X + S2;
const CHIP_X = GROUP_X + S4;
const CHIP_W = 360;
const CHIP_R = CHIP_X + CHIP_W;
const PATH_X = CHIP_R + 2 * S5;
const STICKER_X = CHIP_R + S4;
const CAPTION_DROP = S3;

const PIN_DOT_X = CHIP_X + S3;
const PIN_CITY_X = CHIP_X + S3 + S3;
const PIN_BRACKET_X = CHIP_X + 170;
const PIN_LABEL_X = PIN_BRACKET_X + S3;
const BRACKET_ARM = 6;
const PINS_BUS_X = CHIP_R + S4;
const PINS_TOP = sectionY(GLOBAL_PRESENCE);
const PINS_BOTTOM = PINS_TOP + PINS_H;
const PINS_JOG_Y = PINS_BOTTOM + S3;

const MENU_X = 72;
const TRUNK_X = 28;
const JUMP_X = 226;
const MENU_STUB = S2;
const MENU_NOTE = [
  "Practice Areas, Our People",
  "and Global Presence are",
  "sections of the home page,",
  "not pages of their own.",
  "Media opens a list of two,",
  "White Papers and",
  "Engagements.",
];

const LOW_LEFT = 80;
const LOW_GAP = 120;
const BUS_INSET = S2;
const LIST_INDENT = S4;
const LOW_CHIP_W = PAGE_W - S4;
const OTHER_W = (PAGE_W - S1) / 2;
const NUMBERS_PER_ROW = 3;
const NUMBER_W = (LOW_CHIP_W - 2 * ZONE_PAD - (NUMBERS_PER_ROW - 1) * S1) /
  NUMBERS_PER_ROW;

const LOW_BUS = HOME_BOTTOM + S3;
const LOW_TOP = LOW_BUS + S5;
const LOW_BOTTOM = LOW_TOP + PAGE_H;
const LOW_LISTS = LOW_BOTTOM + S3;
const ARTICLES_H = numberedHeight(ARTICLE_COUNT);
const ARTICLES_CAPTION = LOW_LISTS + ARTICLES_H + S4;
const TAGS_Y = ARTICLES_CAPTION + S3;
const TAGS_CAPTION = rowBottom(TAGS_Y, TAG_NAMES.length) + S4;
const OTHER_CAPTION = LOW_BOTTOM + S4;
const OTHER_Y = OTHER_CAPTION + S2;
const HEIGHT = TAGS_CAPTION + S3;

const CONTACT_DROP_X = lowX(CONTACT) + S5 + S3 + S2;
const CONTACT_PIN_X = lowX(CONTACT) + 170;
const STICKER_INSET = S2;
const STICKER_SHIFT = S4;

const LEGEND_X = CHIP_X;
const LEGEND_Y = HOME_Y + S4 + S2;

const HEAD_LENGTH = 10;
const HEAD_FLANK = 7;

const MENU: readonly MenuItem[] = [
  { name: MENU_NAMES[0], y: HOME_Y + S4 + S2 },
  { name: MENU_NAMES[1], y: bandBaseline(PRACTICES) },
  { name: MENU_NAMES[2], y: bandBaseline(PROFESSIONALS) },
  { name: MENU_NAMES[3], y: bandBaseline(GLOBAL_PRESENCE) },
  { name: MENU_NAMES[4], y: bandBaseline(GLOBAL_PRESENCE) + S4 },
  { name: MENU_NAMES[5], y: bandBaseline(GLOBAL_PRESENCE) + 2 * S4 },
  { name: MENU_NAMES[6], y: bandBaseline(GLOBAL_PRESENCE) + 3 * S4 },
];
const JUMPS = [PRACTICES, PROFESSIONALS, GLOBAL_PRESENCE];
const TRUNK_FROM = [4, 5, 6];
const FIRST_TRUNK_Y = MENU[TRUNK_FROM[0]].y;
const NOTE_Y = MENU[MENU.length - 1].y + S4;

const STICKERS: readonly PageSticker[] = [
  { lines: ["Find the", "practice"], x: STICKER_X, y: groupMiddle(PRACTICES) },
  {
    lines: ["Meet the", "partner"],
    x: STICKER_X,
    y: groupMiddle(PROFESSIONALS),
  },
  {
    lines: ["Call or", "write"],
    x: lowX(CONTACT) + PAGE_W - STICKER_SHIFT,
    y: LOW_TOP + STICKER_INSET,
  },
];

function listHeight(count: number): number {
  return count * TOKEN + (count - 1) * S1;
}

function numberedHeight(count: number): number {
  const rows = Math.ceil(count / NUMBERS_PER_ROW);

  return 2 * ZONE_PAD + listHeight(rows);
}

function sectionY(index: number): number {
  const above = SECTIONS.slice(0, index).reduce(
    (total, section) => total + section.height + section.gap,
    0,
  );

  return HOME_Y + BANDS_TOP + above;
}

function bandBaseline(index: number): number {
  return sectionY(index) + BAND_LABEL;
}

function groupMiddle(index: number): number {
  return sectionY(index) + SECTIONS[index].height / 2;
}

function lowX(index: number): number {
  return LOW_LEFT + index * (PAGE_W + LOW_GAP);
}

function lowCentre(index: number): number {
  return lowX(index) + PAGE_W / 2;
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

function pinMiddle(index: number): number {
  return PINS_TOP + ZONE_PAD + index * PIN_ROW + PIN_ROW / 2;
}

function textMiddle(y: number): number {
  return y + 5;
}

function chevron(x: number, y: number, direction: 1 | -1): string {
  const back = x - direction * HEAD_LENGTH;

  return `M${back} ${y - HEAD_FLANK} L${x} ${y} L${back} ${y + HEAD_FLANK}`;
}

function stub(fromX: number, y: number, toX: number): string {
  return `M${fromX} ${y} L${toX - ARROW_GAP} ${y}`;
}

function SketchGrid(
  { columns, count, height, top }: {
    columns: number;
    count: number;
    height: number;
    top: number;
  },
) {
  const rows = Math.ceil(count / columns);
  const width = (BAND_W - 2 * S2 - (columns - 1) * S1) / columns;
  const cardH = (height - CARDS_TOP - S2 - (rows - 1) * S1) / rows;

  return (
    <g>
      {Array.from({ length: count }, (_, index) => (
        <Sketch
          h={cardH}
          key={index}
          w={width}
          x={BAND_X + S2 + (index % columns) * (width + S1)}
          y={top + CARDS_TOP + Math.floor(index / columns) * (cardH + S1)}
        />
      ))}
    </g>
  );
}

function HomePage() {
  return (
    <g>
      <Node
        h={HOME_H}
        lines={[]}
        title={HOME.name}
        tone="focal"
        w={HOME_W}
        x={HOME_X}
        y={HOME_Y}
      />
      {SECTIONS.map((section, index) => (
        <g key={section.name}>
          <Zone
            h={section.height}
            w={BAND_W}
            x={BAND_X}
            y={sectionY(index)}
          />
          <Label
            text={section.name}
            x={BAND_X + S2}
            y={bandBaseline(index)}
          />
          {section.cards && (
            <SketchGrid
              columns={section.cards.columns}
              count={section.cards.count}
              height={section.height}
              top={sectionY(index)}
            />
          )}
        </g>
      ))}
    </g>
  );
}

function Menu() {
  return (
    <g>
      <Label
        kind="caption"
        text="The menu on every page"
        x={MENU_X}
        y={HOME_Y + S3}
      />
      {MENU.map((item) => (
        <Label
          key={item.name}
          kind="aside"
          text={item.name}
          x={MENU_X}
          y={item.y}
        />
      ))}
      {MENU_NOTE.map((line, index) => (
        <Label
          key={line}
          kind="note"
          text={line}
          x={MENU_X}
          y={NOTE_Y + index * SHEET_LEADING}
        />
      ))}
    </g>
  );
}

function MenuWires() {
  const homeY = MENU[0].y - 5;

  return (
    <g>
      <Wire d={stub(JUMP_X, homeY, HOME_X)} from="dot" />
      {JUMPS.map((section) => (
        <Wire
          d={stub(JUMP_X, bandBaseline(section) - 5, BAND_X)}
          from="dot"
          key={section}
        />
      ))}
      {TRUNK_FROM.map((index) => (
        <Line
          d={`M${MENU_X - MENU_STUB} ${MENU[index].y - 5} L${TRUNK_X} ${
            MENU[index].y - 5
          }`}
          from="dot"
          key={index}
        />
      ))}
      <Line
        d={`M${TRUNK_X} ${
          FIRST_TRUNK_Y - 5
        } L${TRUNK_X} ${LOW_BUS} L${CONTACT_DROP_X} ${LOW_BUS}`}
      />
      {LOW_PAGES.map((page, index) => {
        const x = index === CONTACT ? CONTACT_DROP_X : lowCentre(index);

        return (
          <Wire
            d={`M${x} ${LOW_BUS} L${x} ${LOW_TOP - ARROW_GAP}`}
            key={page.name}
          />
        );
      })}
    </g>
  );
}

function ChipGroup(
  { caption, names, section, tone }: {
    caption: string;
    names: readonly string[];
    section: number;
    tone?: number;
  },
) {
  const top = sectionY(section);
  const first = rowMiddle(top, 0);
  const last = rowMiddle(top, names.length - 1);

  return (
    <g>
      <Line
        d={`M${BAND_R} ${first} L${BUS_X} ${first} L${BUS_X} ${last}`}
        from="dot"
      />
      {names.map((name, index) => (
        <g key={name}>
          <Wire d={stub(BUS_X, rowMiddle(top, index), CHIP_X)} />
          <Chip
            h={TOKEN}
            plain
            text={name}
            tone={index === tone ? "focal" : undefined}
            w={CHIP_W}
            x={CHIP_X}
            y={rowY(top, index)}
          />
        </g>
      ))}
      <Label
        kind="caption"
        text={caption}
        x={CHIP_X}
        y={rowBottom(top, names.length) + CAPTION_DROP}
      />
    </g>
  );
}

function Pins() {
  const middle = PINS_TOP + PINS_H / 2;
  const clientFrom = pinMiddle(OFFICES.length);
  const clientTo = pinMiddle(PIN_CITIES.length - 1);

  return (
    <g>
      <Wire d={stub(BAND_R, middle, CHIP_X)} from="dot" />
      <Zone h={PINS_H} w={CHIP_W} x={CHIP_X} y={PINS_TOP} />
      {PIN_CITIES.map((city, index) => (
        <g key={city}>
          <Dot r={4} x={PIN_DOT_X} y={pinMiddle(index)} />
          <Label
            text={city}
            x={PIN_CITY_X}
            y={textMiddle(pinMiddle(index))}
          />
          <Line
            d={`M${CHIP_R} ${pinMiddle(index)} L${PINS_BUS_X} ${
              pinMiddle(index)
            }`}
            from="dot"
          />
        </g>
      ))}
      {OFFICES.map((office, index) => (
        <Label
          key={office.city}
          kind="note"
          text={office.label}
          x={PIN_LABEL_X}
          y={textMiddle(pinMiddle(index))}
        />
      ))}
      <Line
        d={`M${
          PIN_BRACKET_X - BRACKET_ARM
        } ${clientFrom} L${PIN_BRACKET_X} ${clientFrom} L${PIN_BRACKET_X} ${clientTo} L${
          PIN_BRACKET_X - BRACKET_ARM
        } ${clientTo}`}
      />
      <Label
        kind="note"
        text={CLIENT_LABEL}
        x={PIN_LABEL_X}
        y={textMiddle((clientFrom + clientTo) / 2)}
      />
      <Label
        kind="caption"
        text={`${PIN_CITIES.length} pins on the map`}
        x={CHIP_X}
        y={PINS_BOTTOM + CAPTION_DROP}
      />
      <Wire
        d={`M${PINS_BUS_X} ${
          pinMiddle(0)
        } L${PINS_BUS_X} ${PINS_JOG_Y} L${CONTACT_PIN_X} ${PINS_JOG_Y} L${CONTACT_PIN_X} ${
          LOW_TOP - ARROW_GAP
        }`}
      />
    </g>
  );
}

function NumberedList(
  { count, left, noun }: { count: number; left: number; noun: string },
) {
  const chipX = left + LIST_INDENT;
  const height = numberedHeight(count);

  return (
    <g>
      <Wire d={stub(left + BUS_INSET, LOW_LISTS + height / 2, chipX)} />
      <Zone h={height} w={LOW_CHIP_W} x={chipX} y={LOW_LISTS} />
      {Array.from({ length: count }, (_, index) => (
        <Chip
          h={TOKEN}
          key={index}
          text={String(index + 1)}
          w={NUMBER_W}
          x={chipX + ZONE_PAD + (index % NUMBERS_PER_ROW) * (NUMBER_W + S1)}
          y={LOW_LISTS + ZONE_PAD +
            Math.floor(index / NUMBERS_PER_ROW) * (TOKEN + S1)}
        />
      ))}
      <Label
        kind="caption"
        text={`${count} ${noun}`}
        x={chipX}
        y={LOW_LISTS + height + S4}
      />
    </g>
  );
}

function NewsColumn() {
  const left = lowX(NEWS);
  const busX = left + BUS_INSET;
  const chipX = left + LIST_INDENT;

  return (
    <g>
      <Line
        d={`M${busX} ${LOW_BOTTOM} L${busX} ${
          rowMiddle(TAGS_Y, TAG_NAMES.length - 1)
        }`}
        from="dot"
      />
      <NumberedList count={ARTICLE_COUNT} left={left} noun="articles" />
      {TAG_NAMES.map((name, index) => (
        <g key={name}>
          <Wire d={stub(busX, rowMiddle(TAGS_Y, index), chipX)} />
          <Chip
            h={TOKEN}
            plain
            text={name}
            w={LOW_CHIP_W}
            x={chipX}
            y={rowY(TAGS_Y, index)}
          />
        </g>
      ))}
      <Label
        kind="caption"
        text={`${TAG_NAMES.length} tag pages`}
        x={chipX}
        y={TAGS_CAPTION}
      />
    </g>
  );
}

function MediaColumn(
  { count, index, noun }: { count: number; index: number; noun: string },
) {
  const left = lowX(index);
  const busX = left + BUS_INSET;

  return (
    <g>
      <Line
        d={`M${busX} ${LOW_BOTTOM} L${busX} ${
          LOW_LISTS + numberedHeight(count) / 2
        }`}
        from="dot"
      />
      <NumberedList count={count} left={left} noun={noun} />
    </g>
  );
}

function OtherPages() {
  return (
    <g>
      <Label
        kind="caption"
        text={`${OTHER_PAGES.length} more page`}
        x={lowX(CONTACT)}
        y={OTHER_CAPTION}
      />
      {OTHER_PAGES.map((name, index) => (
        <Chip
          h={TOKEN}
          key={name}
          plain
          text={name}
          w={OTHER_W}
          x={lowX(CONTACT) + (index % 2) * (OTHER_W + S1)}
          y={rowY(OTHER_Y, Math.floor(index / 2))}
        />
      ))}
    </g>
  );
}

function ClientPath() {
  const top = sectionY(PRACTICES);
  const start = rowMiddle(top, FIRST_PRACTICE);
  const end = rowMiddle(sectionY(PROFESSIONALS), FIRST_PERSON);
  const practiceTip = CHIP_X - ARROW_GAP;
  const personTip = CHIP_R + ARROW_GAP;

  return (
    <Measure
      d={[
        `M${HOME_R} ${start} L${practiceTip} ${start}`,
        chevron(practiceTip, start, 1),
        `M${CHIP_R} ${start} L${PATH_X} ${start} L${PATH_X} ${end} L${personTip} ${end}`,
        chevron(personTip, end, -1),
      ].join(" ")}
    />
  );
}

export default function LegalSiteMap() {
  return (
    <Canvas
      description={DESCRIPTION}
      quiet
      title={`Ferrow & Lisle's ${PAGE_COUNT} pages and how a visitor moves between them`}
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Label
        kind="aside"
        text={`Each box is one of the ${PAGE_COUNT} pages.`}
        x={LEGEND_X}
        y={LEGEND_Y}
      />
      <Label
        kind="aside"
        text="In blue, one path a client takes: the home page, a practice area, a partner."
        x={LEGEND_X}
        y={LEGEND_Y + SHEET_LEADING + S1}
      />

      <Menu />
      <HomePage />
      <MenuWires />

      <ChipGroup
        caption={`${PRACTICE_NAMES.length} practice areas`}
        names={PRACTICE_NAMES}
        section={PRACTICES}
        tone={FIRST_PRACTICE}
      />
      <ChipGroup
        caption={`${PEOPLE_NAMES.length} people`}
        names={PEOPLE_NAMES}
        section={PROFESSIONALS}
        tone={FIRST_PERSON}
      />
      <Pins />

      {LOW_PAGES.map((page, index) => (
        <Screen key={page.name} page={page} x={lowX(index)} y={LOW_TOP} />
      ))}
      <NewsColumn />
      <MediaColumn
        count={WHITE_PAPER_COUNT}
        index={WHITE_PAPERS}
        noun="white papers"
      />
      <MediaColumn
        count={ENGAGEMENT_COUNT}
        index={ENGAGEMENTS}
        noun="engagements"
      />
      <OtherPages />

      <ClientPath />

      {STICKERS.map((sticker) => (
        <Sticker
          key={sticker.lines.join(" ")}
          lines={sticker.lines}
          x={sticker.x}
          y={sticker.y}
        />
      ))}
    </Canvas>
  );
}
