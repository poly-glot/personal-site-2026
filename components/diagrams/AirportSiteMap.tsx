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
  Sticker,
  Wire,
  Zone,
} from "./parts.tsx";
import { ARROW_GAP, TOKEN } from "./SiteMapParts.tsx";

interface HomeSection {
  busX: number;
  gap: number;
  links: readonly string[];
  name: string;
  owned: readonly string[];
  rows?: number;
}

interface MenuLink {
  name: string;
  page: string;
}

interface PageSticker {
  lines: readonly string[];
  page: string;
}

interface Cluster {
  caption: string;
  parent: string;
  pages: readonly string[];
}

const SHEET_W = 1600;
const SHEET_LEADING = 24;

const LIVE_FLIGHTS = "Live flights";
const PARKING = "Parking";
const SHOPPING = "Shopping";
const LOUNGES = "Lounges and rest";
const AIRLINES = "Airlines and destinations";
const DESTINATION_GUIDES = "Destination guides";
const HELP = "Help and contact";
const SPECIAL_ASSISTANCE = "Special assistance";
const CHILDREN = "Travelling with children";
const FIRST_TIME = "First time flying?";
const FLIGHT_ALERTS = "Flight alerts";
const BAGGAGE = "Baggage and lost property";
const AT_THE_AIRPORT = "At the airport";
const SECURITY = "Security and customs";
const EAT_AND_DRINK = "Eat and drink";
const GETTING_HERE = "Getting here";
const ABOUT = "About Meridian";

const DESTINATION_PAGES = [
  "Lisbon in a long weekend",
  "Marrakech for first-timers",
  "Chasing the northern lights",
];
const ABOUT_PAGES = ["Careers", "Media centre", "Sustainability"];
const LEGAL_PAGES = [
  "Accessibility",
  "Cookies",
  "Privacy",
  "Terms of use",
  "Site map",
];

const HOME_NOTE = "Flights, parking and travel information";

const HOME_X = 100;
const HOME_Y = S3;
const HOME_W = 400;
const HOME_R = HOME_X + HOME_W;
const BAND_INSET = 22;
const BAND_X = HOME_X + BAND_INSET;
const BAND_W = HOME_W - 2 * BAND_INSET;
const BAND_R = BAND_X + BAND_W;
const BANDS_TOP = 90;
const BAND_LABEL = 27;
const SECTION_H = S4 + S1;
const ROW = TOKEN + S1;

const BUS_NEAR = HOME_R + S3;
const BUS_MID = BUS_NEAR + S5;
const BUS_FAR = BUS_MID + S4;

const SECTIONS: readonly HomeSection[] = [
  {
    busX: BUS_NEAR,
    gap: S2,
    links: [LIVE_FLIGHTS],
    name: "Travel notices",
    owned: [],
  },
  {
    busX: BUS_MID,
    gap: S2,
    links: [SHOPPING, LOUNGES, LIVE_FLIGHTS, PARKING],
    name: "Welcome to Meridian Airport",
    owned: [SHOPPING, LOUNGES],
  },
  {
    busX: BUS_NEAR,
    gap: S2,
    links: [],
    name: "Security wait times",
    owned: [],
  },
  {
    busX: BUS_NEAR,
    gap: S5,
    links: [LIVE_FLIGHTS],
    name: "Live flights",
    owned: [LIVE_FLIGHTS],
  },
  {
    busX: BUS_NEAR,
    gap: S2,
    links: [PARKING],
    name: "Park at the terminal from £8.50 a day",
    owned: [PARKING],
  },
  {
    busX: BUS_MID,
    gap: S4,
    links: [AIRLINES, DESTINATION_GUIDES],
    name: "Where we fly",
    owned: [AIRLINES, DESTINATION_GUIDES],
    rows: 1 + DESTINATION_PAGES.length,
  },
  {
    busX: BUS_MID,
    gap: S2,
    links: [
      HELP,
      SPECIAL_ASSISTANCE,
      CHILDREN,
      FIRST_TIME,
      FLIGHT_ALERTS,
      BAGGAGE,
    ],
    name: "Help for the day you fly",
    owned: [
      HELP,
      SPECIAL_ASSISTANCE,
      CHILDREN,
      FIRST_TIME,
      FLIGHT_ALERTS,
      BAGGAGE,
    ],
  },
  {
    busX: BUS_FAR,
    gap: S5,
    links: [AT_THE_AIRPORT, SECURITY, EAT_AND_DRINK, BAGGAGE],
    name: "At the airport",
    owned: [AT_THE_AIRPORT, SECURITY, EAT_AND_DRINK],
  },
  {
    busX: BUS_NEAR,
    gap: 0,
    links: [GETTING_HERE, AT_THE_AIRPORT],
    name: "Getting here",
    owned: [GETTING_HERE],
  },
];

const MENU_LINKS: readonly MenuLink[] = [
  { name: "Shop", page: SHOPPING },
  { name: "Lounges", page: LOUNGES },
  { name: "Flights", page: LIVE_FLIGHTS },
  { name: "Parking", page: PARKING },
  { name: "Assistance", page: HELP },
  { name: "Getting here", page: GETTING_HERE },
];
const MENU_IN_ORDER = [
  "Flights",
  "Shop",
  "Parking",
  "Lounges",
  "Getting here",
  "Assistance",
];

const STICKERS: readonly PageSticker[] = [
  { lines: ["Check my", "flight"], page: LIVE_FLIGHTS },
  { lines: ["Park the", "car"], page: PARKING },
  { lines: ["Find the", "way in"], page: GETTING_HERE },
];

const PATH_PAGES = [LIVE_FLIGHTS, PARKING];

const HOME_LINKED = SECTIONS.flatMap((section) => section.owned);
const PAGE_COUNT = 1 + HOME_LINKED.length + DESTINATION_PAGES.length +
  1 + ABOUT_PAGES.length + LEGAL_PAGES.length;

const CHIP_X = 680;
const CHIP_W = 300;
const CHIP_R = CHIP_X + CHIP_W;
const CHILD_BUS_X = CHIP_R + S3;
const CHILD_X = CHIP_R + S4 + S3;
const CHILD_W = 220;
const CAPTION_DROP = S3;

const MENU_X = 1330;
const MENU_STUB = S2;

const LEGEND_X = CHIP_X;
const LEGEND_Y = HOME_Y + S3;

const STICKER_X = CHIP_R - 46;
const STICKER_RISE = 4;

const HEAD_LENGTH = 10;
const HEAD_FLANK = 7;

const SECTION_TOPS = SECTIONS.map((_, index) =>
  SECTIONS.slice(0, index).reduce(
    (top, section) => top + bandHeight(section) + section.gap,
    HOME_Y + BANDS_TOP,
  )
);
const LAST = SECTIONS.length - 1;
const HOME_BOTTOM = SECTION_TOPS[LAST] + bandHeight(SECTIONS[LAST]) +
  BAND_INSET;
const HOME_H = HOME_BOTTOM - HOME_Y;

const PAGE_Y: Record<string, number> = Object.fromEntries(
  SECTIONS.flatMap((section, index) =>
    section.owned.map((name, row) => [name, SECTION_TOPS[index] + row * ROW])
  ),
);

const BOTTOM_TOP = HOME_BOTTOM + S4;
const LEGAL_X = HOME_X;
const BOTTOM_CAPTION = BOTTOM_TOP + listHeight(LEGAL_PAGES.length) +
  CAPTION_DROP;
const HEIGHT = BOTTOM_CAPTION + S3;

const ABOUT_CLUSTER: Cluster = {
  caption: `${ABOUT_PAGES.length} pages it links to`,
  pages: ABOUT_PAGES,
  parent: ABOUT,
};
const DESTINATION_CLUSTER: Cluster = {
  caption: `${DESTINATION_PAGES.length} destination guides`,
  pages: DESTINATION_PAGES,
  parent: DESTINATION_GUIDES,
};

function joinList(items: readonly string[]): string {
  if (items.length < 2) return items.join("");

  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function sectionSentence(section: HomeSection): string {
  if (section.links.length === 0) return `${section.name} holds no links.`;

  return `${section.name} links to ${joinList(section.links)}.`;
}

const DESCRIPTION =
  `Meridian Airport's ${PAGE_COUNT} pages, with a dot where each link starts and an arrow where it arrives. The header menu on every page has ${MENU_IN_ORDER.length} links: ${
    joinList(MENU_IN_ORDER)
  }, each to its page. The home page is drawn largest because it is one long page, with ${SECTIONS.length} sections in order: ${
    joinList(SECTIONS.map((section) => section.name))
  }. ${SECTIONS.map(sectionSentence).join(" ")} Destination guides links to ${
    joinList(DESTINATION_PAGES)
  }. About Meridian links to ${
    joinList(ABOUT_PAGES)
  }. No section of the home page links to About Meridian or to the ${LEGAL_PAGES.length} legal pages, ${
    joinList(LEGAL_PAGES)
  }, which sit apart. Orange stickers name what a traveller came to do: check my flight on Live flights, park the car on Parking, and find the way in on Getting here. One path is marked in blue, the way a traveller would go: from the departures board in the Live flights section of the home page to the Live flights page, and from the Parking and pick-up link on that page to the Parking page.`;

function listHeight(count: number): number {
  return count * TOKEN + (count - 1) * S1;
}

function bandHeight(section: HomeSection): number {
  const rows = section.rows ?? section.owned.length;

  return rows > 1 ? listHeight(rows) : SECTION_H;
}

function rowY(top: number, index: number): number {
  return top + index * ROW;
}

function rowMiddle(top: number, index: number): number {
  return rowY(top, index) + TOKEN / 2;
}

function pageMiddle(name: string): number {
  return PAGE_Y[name] + TOKEN / 2;
}

function textMiddle(y: number): number {
  return y + 5;
}

function stub(fromX: number, y: number, toX: number): string {
  return `M${fromX} ${y} L${toX - ARROW_GAP} ${y}`;
}

function menuStub(y: number): string {
  return `M${MENU_X - MENU_STUB} ${y} L${CHIP_R + ARROW_GAP} ${y}`;
}

function chevronRight(x: number, y: number): string {
  const back = x - HEAD_LENGTH;

  return `M${back} ${y - HEAD_FLANK} L${x} ${y} L${back} ${y + HEAD_FLANK}`;
}

function chevronDown(x: number, y: number): string {
  const back = y - HEAD_LENGTH;

  return `M${x - HEAD_FLANK} ${back} L${x} ${y} L${x + HEAD_FLANK} ${back}`;
}

function HomePage() {
  return (
    <g>
      <Node
        h={HOME_H}
        lines={[]}
        title="Home"
        tone="focal"
        w={HOME_W}
        x={HOME_X}
        y={HOME_Y}
      />
      <Label
        kind="note"
        text={HOME_NOTE}
        x={HOME_X + BAND_INSET}
        y={HOME_Y + 72}
      />
      {SECTIONS.map((section, index) => (
        <g key={section.name}>
          <Zone
            h={bandHeight(section)}
            w={BAND_W}
            x={BAND_X}
            y={SECTION_TOPS[index]}
          />
          <Label
            text={section.name}
            x={BAND_X + S2}
            y={SECTION_TOPS[index] + BAND_LABEL}
          />
        </g>
      ))}
    </g>
  );
}

function SectionWires({ index }: { index: number }) {
  const section = SECTIONS[index];
  if (section.links.length === 0) return null;

  const source = section.owned.length > 0
    ? pageMiddle(section.owned[0])
    : SECTION_TOPS[index] + TOKEN / 2;
  const ends = section.links.map(pageMiddle);
  const top = Math.min(source, ...ends);
  const bottom = Math.max(source, ...ends);

  return (
    <g>
      <Line d={`M${BAND_R} ${source} L${section.busX} ${source}`} from="dot" />
      {top < bottom && (
        <Line d={`M${section.busX} ${top} L${section.busX} ${bottom}`} />
      )}
      {section.owned.map((name) => (
        <Wire d={stub(section.busX, pageMiddle(name), CHIP_X)} key={name} />
      ))}
    </g>
  );
}

function HomeLinkedPages() {
  return (
    <g>
      {HOME_LINKED.map((name) => (
        <Chip
          h={TOKEN}
          key={name}
          plain
          text={name}
          tone={PATH_PAGES.includes(name) ? "focal" : undefined}
          w={CHIP_W}
          x={CHIP_X}
          y={PAGE_Y[name]}
        />
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
      {MENU_LINKS.map((link) => (
        <g key={link.name}>
          <Label
            kind="aside"
            text={link.name}
            x={MENU_X}
            y={textMiddle(pageMiddle(link.page))}
          />
          <Wire
            d={menuStub(pageMiddle(link.page))}
            from="dot"
          />
        </g>
      ))}
    </g>
  );
}

function ChildCluster(
  { cluster, top }: { cluster: Cluster; top: number },
) {
  const parentMiddle = rowMiddle(top, 0);
  const last = rowMiddle(top, cluster.pages.length - 1);

  return (
    <g>
      <Line
        d={`M${CHIP_R} ${parentMiddle} L${CHILD_BUS_X} ${parentMiddle}`}
        from="dot"
      />
      <Line d={`M${CHILD_BUS_X} ${parentMiddle} L${CHILD_BUS_X} ${last}`} />
      {cluster.pages.map((name, index) => (
        <g key={name}>
          <Wire d={stub(CHILD_BUS_X, rowMiddle(top, index), CHILD_X)} />
          <Chip
            h={TOKEN}
            plain
            text={name}
            w={CHILD_W}
            x={CHILD_X}
            y={rowY(top, index)}
          />
        </g>
      ))}
      <Label
        kind="caption"
        text={cluster.caption}
        x={CHILD_X}
        y={rowY(top, cluster.pages.length - 1) + TOKEN + CAPTION_DROP}
      />
    </g>
  );
}

function AboutPages() {
  return (
    <g>
      <Chip
        h={TOKEN}
        plain
        text={ABOUT}
        w={CHIP_W}
        x={CHIP_X}
        y={BOTTOM_TOP}
      />
      <ChildCluster cluster={ABOUT_CLUSTER} top={BOTTOM_TOP} />
    </g>
  );
}

function LegalPages() {
  return (
    <g>
      {LEGAL_PAGES.map((name, index) => (
        <Chip
          h={TOKEN}
          key={name}
          plain
          text={name}
          w={CHIP_W}
          x={LEGAL_X}
          y={rowY(BOTTOM_TOP, index)}
        />
      ))}
      <Label
        kind="caption"
        text={`${LEGAL_PAGES.length} legal pages`}
        x={LEGAL_X}
        y={BOTTOM_CAPTION}
      />
    </g>
  );
}

function TravellerPath() {
  const board = pageMiddle(LIVE_FLIGHTS);
  const boardTip = CHIP_X - ARROW_GAP;
  const downX = CHIP_X + CHIP_W / 2;
  const downFrom = PAGE_Y[LIVE_FLIGHTS] + TOKEN;
  const downTip = PAGE_Y[PARKING] - ARROW_GAP;

  return (
    <Measure
      d={[
        `M${BAND_R} ${board} L${boardTip} ${board}`,
        chevronRight(boardTip, board),
        `M${downX} ${downFrom} L${downX} ${downTip}`,
        chevronDown(downX, downTip),
      ].join(" ")}
    />
  );
}

export default function AirportSiteMap() {
  return (
    <Canvas
      description={DESCRIPTION}
      quiet
      title={`Meridian Airport's ${PAGE_COUNT} pages and how a traveller moves between them`}
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
        text="In blue, one path a traveller takes: the departures board, Live flights, then Parking."
        x={LEGEND_X}
        y={LEGEND_Y + SHEET_LEADING + S1}
      />

      <HomePage />
      {SECTIONS.map((section, index) => (
        <SectionWires index={index} key={section.name} />
      ))}
      <HomeLinkedPages />
      <ChildCluster
        cluster={DESTINATION_CLUSTER}
        top={PAGE_Y[DESTINATION_GUIDES]}
      />
      <Menu />

      <AboutPages />
      <LegalPages />

      <TravellerPath />

      {STICKERS.map((sticker) => (
        <Sticker
          key={sticker.page}
          lines={sticker.lines}
          x={STICKER_X}
          y={PAGE_Y[sticker.page] - STICKER_RISE}
        />
      ))}
    </Canvas>
  );
}
