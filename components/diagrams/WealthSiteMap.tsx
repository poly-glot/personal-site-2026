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
  Spotlight,
  Sticker,
  Wire,
} from "./parts.tsx";
import {
  ARROW_GAP,
  Cards,
  centres,
  FanOut,
  PAGE_H,
  PAGE_W,
  Screen,
  TOKEN,
} from "./SiteMapParts.tsx";

const DESCRIPTION =
  "Wealth's 26 pages drawn as small wireframes, with a dot where each link starts and an arrow where it arrives. Home links to the five pages in the menu: Strategy, People, News, Contact and Legal. The menu also lists About, but that is a section of Home, drawn dashed because it is not a page. Strategy, People and News each have a page for every item: Strategy links to four strategy pages, People to six person pages, and News to six insights, which makes 16 pages with Home and the five menu pages. Orange stickers mark the three pages that matter most to a visitor: Strategy, the core offer; People, where they meet the managers; and Contact, where they get in touch. Strategy and People are shaded together because each strategy links to the people who run it. The drawing shows one example: UK Equity Income links to Eleanor Whitcombe and Daniel Okafor, marked in blue. Last are four text pages, which make 26: privacy, cookies and accessibility in the footer, and page not found for a wrong address.";

const SHEET_W = 1600;
const COLUMN = PAGE_W + S4;
const CROSS_GAP_EXTRA = S3;
const LEFT = (SHEET_W - 5 * PAGE_W - 4 * S4 - CROSS_GAP_EXTRA) / 2;
const SHEET_LEADING = 24;

const STRATEGY = 0;
const PEOPLE = 1;
const NEWS = 2;
const CONTACT = 3;
const TEXT_COLUMN = 3;

const HOME: SketchPage = { layout: "hero", name: "Home" };
const MENU: readonly SketchPage[] = [
  { layout: "grid", name: "Strategy" },
  { layout: "grid", name: "People" },
  { layout: "grid", name: "News" },
  { layout: "form", name: "Contact" },
  { layout: "list", name: "Legal" },
];
const STRATEGIES = [
  "UK Equity Income",
  "European Quality Growth",
  "Short-Dated Sterling Credit",
  "Global Multi-Asset Income",
];
const PEOPLE_NAMES = [
  "Eleanor Whitcombe",
  "Daniel Okafor",
  "Sophie Lindqvist",
  "James Hartley",
  "Hannah Mercer",
  "Tomás Herrera",
];
const INSIGHTS = ["1", "2", "3", "4", "5", "6"];
const TEXT_PAGES = [
  ["Privacy", "Cookies"],
  ["Accessibility", "Page not found"],
];
const STICKERS: readonly { column: number; lines: string[] }[] = [
  { column: STRATEGY, lines: ["Core", "offer"] },
  { column: PEOPLE, lines: ["Meet the", "managers"] },
  { column: CONTACT, lines: ["Get in", "touch"] },
];
const STICKER_INSET = S2;

const EXAMPLE_STRATEGY = 0;
const EXAMPLE_PEOPLE = [0, 1];

const CHIP_W = PAGE_W - S4;
const BUS_INSET = S2;
const ABOUT_W = 2 * S5;

const HOME_Y = S3;
const BUS_Y = HOME_Y + PAGE_H + S3;
const MENU_Y = BUS_Y + S5;
const MENU_BOTTOM = MENU_Y + PAGE_H;
const LIST_Y = MENU_BOTTOM + S3;
const INSIGHT_BUS = MENU_BOTTOM + S3;
const INSIGHTS_Y = INSIGHT_BUS + S4;
const INSIGHTS_CAPTION = INSIGHTS_Y + S5 + S4;
const TEXT_CAPTION = MENU_BOTTOM + S4;
const TEXT_Y = TEXT_CAPTION + S2;
const STRATEGIES_CAPTION = listBottom(STRATEGIES.length) + S4;
const PEOPLE_CAPTION = listBottom(PEOPLE_NAMES.length) + S4;
const HEIGHT = PEOPLE_CAPTION + S3 + S3;

function column(index: number): number {
  return LEFT + index * COLUMN + (index > STRATEGY ? CROSS_GAP_EXTRA : 0);
}

function centre(index: number): number {
  return column(index) + PAGE_W / 2;
}

function listY(index: number): number {
  return LIST_Y + index * (TOKEN + S1);
}

function listMiddle(index: number): number {
  return listY(index) + TOKEN / 2;
}

function listBottom(count: number): number {
  return listY(count - 1) + TOKEN;
}

function strategyBusX(): number {
  return column(STRATEGY) + BUS_INSET;
}

function peopleBusX(): number {
  return column(PEOPLE) + PAGE_W - BUS_INSET;
}

function StrategyList() {
  const chipX = column(STRATEGY) + S4;
  const lastMiddle = listMiddle(STRATEGIES.length - 1);

  return (
    <g>
      <Line
        d={`M${strategyBusX()} ${MENU_BOTTOM} L${strategyBusX()} ${lastMiddle}`}
        from="dot"
      />
      {STRATEGIES.map((name, index) => (
        <g key={name}>
          <Wire
            d={`M${strategyBusX()} ${listMiddle(index)} L${chipX - ARROW_GAP} ${
              listMiddle(index)
            }`}
          />
          <Chip
            h={TOKEN}
            plain
            text={name}
            tone={index === EXAMPLE_STRATEGY ? "focal" : undefined}
            w={CHIP_W}
            x={chipX}
            y={listY(index)}
          />
        </g>
      ))}
    </g>
  );
}

function PeopleList() {
  const chipX = column(PEOPLE);
  const lastMiddle = listMiddle(PEOPLE_NAMES.length - 1);

  return (
    <g>
      <Line
        d={`M${peopleBusX()} ${MENU_BOTTOM} L${peopleBusX()} ${lastMiddle}`}
        from="dot"
      />
      {PEOPLE_NAMES.map((name, index) => (
        <g key={name}>
          <Wire
            d={`M${peopleBusX()} ${listMiddle(index)} L${
              chipX + CHIP_W + ARROW_GAP
            } ${listMiddle(index)}`}
          />
          <Chip
            h={TOKEN}
            plain
            text={name}
            tone={EXAMPLE_PEOPLE.includes(index) ? "focal" : undefined}
            w={CHIP_W}
            x={chipX}
            y={listY(index)}
          />
        </g>
      ))}
    </g>
  );
}

function ManagerLinks() {
  const start = column(STRATEGY) + PAGE_W;
  const end = column(PEOPLE) - ARROW_GAP;
  const branchX = (start + column(PEOPLE)) / 2;
  const [first, second] = EXAMPLE_PEOPLE;
  const from = listMiddle(EXAMPLE_STRATEGY);

  return (
    <g>
      <Wire d={`M${start} ${from} L${end} ${listMiddle(first)}`} from="dot" />
      <Line d={`M${branchX} ${from} L${branchX} ${listMiddle(second)}`} />
      <Wire
        d={`M${branchX} ${listMiddle(second)} L${end} ${listMiddle(second)}`}
      />
    </g>
  );
}

export default function WealthSiteMap() {
  const textWidth = (2 * PAGE_W + S4 - S1) / 2;

  return (
    <Canvas
      description={DESCRIPTION}
      title="Wealth's 26 pages and how a visitor moves between them"
      quiet
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Spotlight
        h={PEOPLE_CAPTION + S3 - (MENU_Y - S2)}
        w={column(PEOPLE) + PAGE_W + S2 - (column(STRATEGY) - S2)}
        x={column(STRATEGY) - S2}
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

      <Screen page={HOME} x={column(NEWS)} y={HOME_Y} />
      <Chip
        h={TOKEN}
        plain
        text="About"
        tone="ghost"
        w={ABOUT_W}
        x={column(NEWS) + PAGE_W + S4}
        y={HOME_Y + S4}
      />
      <Label
        kind="caption"
        text="A section of Home, not a page"
        x={column(NEWS) + PAGE_W + S4}
        y={HOME_Y + S4 + TOKEN + S3}
      />

      <FanOut
        busY={BUS_Y}
        from={centre(NEWS)}
        fromY={HOME_Y + PAGE_H}
        targets={MENU.map((_, index) => centre(index))}
        topY={MENU_Y}
      />

      <Label kind="caption" text="In the menu" x={LEFT} y={MENU_Y - S3} />
      {MENU.map((page, index) => (
        <Screen key={page.name} page={page} x={column(index)} y={MENU_Y} />
      ))}

      <StrategyList />
      <Label
        kind="caption"
        text="4 strategies"
        x={column(STRATEGY)}
        y={STRATEGIES_CAPTION}
      />
      <Label
        kind="aside"
        text="Each strategy links to"
        x={column(STRATEGY)}
        y={STRATEGIES_CAPTION + S4}
      />
      <Label
        kind="aside"
        text="the people who run it."
        x={column(STRATEGY)}
        y={STRATEGIES_CAPTION + S4 + SHEET_LEADING}
      />

      <ManagerLinks />

      <PeopleList />
      <Label
        kind="caption"
        text="6 people"
        x={column(PEOPLE)}
        y={PEOPLE_CAPTION}
      />

      <FanOut
        busY={INSIGHT_BUS}
        from={centre(NEWS)}
        fromY={MENU_BOTTOM}
        targets={centres(INSIGHTS, column(NEWS))}
        topY={INSIGHTS_Y}
      />
      <Cards
        h={S5}
        labels={INSIGHTS}
        left={column(NEWS)}
        span={PAGE_W}
        y={INSIGHTS_Y}
      />
      <Label
        kind="caption"
        text="6 insights"
        x={column(NEWS)}
        y={INSIGHTS_CAPTION}
      />

      <Label
        kind="caption"
        text="4 text pages"
        x={column(TEXT_COLUMN)}
        y={TEXT_CAPTION}
      />
      {TEXT_PAGES.map((row, rowIndex) =>
        row.map((name, index) => (
          <Chip
            h={TOKEN}
            key={name}
            plain
            text={name}
            w={textWidth}
            x={column(TEXT_COLUMN) + index * (textWidth + S1)}
            y={TEXT_Y + rowIndex * (TOKEN + S1)}
          />
        ))
      )}

      {STICKERS.map((sticker) => (
        <Sticker
          key={sticker.lines.join(" ")}
          lines={sticker.lines}
          x={column(sticker.column) + PAGE_W - STICKER_INSET}
          y={MENU_Y + STICKER_INSET}
        />
      ))}
    </Canvas>
  );
}
