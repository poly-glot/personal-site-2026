import {
  Canvas,
  Chip,
  Label,
  Line,
  Node,
  S2,
  S3,
  S4,
  S5,
  sheetNodeHeight,
  Wire,
  Zone,
} from "./parts.tsx";

const PHRASES = [
  "Free logo design",
  "Retro logo design",
  "Corporate logo design",
  "Web 2.0 logo design",
  "Professional logo designer",
  "18 more",
];

const SITEMAP_LINES = ["Links to every page,", "all 52."];
const HOME_LINES = [
  "Every case-study page links",
  "here, using its own phrase.",
];
const TITLE_LINES = [
  "The same on all 52 pages, so",
  "no case study stands out.",
];

const SHEET_W = 1600;
const ZONE_X = 20;
const ZONE_TOP = S3;
const CHIP_H = S5;
const CHIP_PITCH = CHIP_H + S2;
const CHIPS_Y = ZONE_TOP + S5;
const MIDDLES = PHRASES.map((_, index) =>
  CHIPS_Y + index * CHIP_PITCH + CHIP_H / 2
);
const MIDDLE = (MIDDLES[0] + MIDDLES[MIDDLES.length - 1]) / 2;

const SITEMAP_X = 60;
const SITEMAP_W = 300;
const LEFT_BUS_X = SITEMAP_X + SITEMAP_W + S5;
const CHIP_X = LEFT_BUS_X + S5;
const CHIP_W = 440;
const CHIPS_RIGHT = CHIP_X + CHIP_W;
const RIGHT_BUS_X = CHIPS_RIGHT + S4;
const HOME_X = RIGHT_BUS_X + 300;
const HOME_W = 300;

const NODE_H = sheetNodeHeight(HOME_LINES);
const NODE_Y = MIDDLE - NODE_H / 2;
const TITLE_Y = NODE_Y + NODE_H + S4;
const ZONE_BOTTOM = TITLE_Y + NODE_H + S3;
const HEIGHT = ZONE_BOTTOM + S3;
const ARROW_GAP = 2;

const DESCRIPTION =
  "How the 23 case-study pages were meant to be found. The sitemap links to every one of the 52 pages. 23 of them are case-study landing pages, each named for a search phrase: free logo design, retro logo design, corporate logo design, web 2.0 logo design, professional logo designer, and 18 more. Each page links its phrase back to the home page, drawn as the subject. A dashed box marks the weak point: one title shared by all 52 pages, so no case study stands out.";

const LEFT_BUS = [
  `M${SITEMAP_X + SITEMAP_W} ${MIDDLE} L${LEFT_BUS_X} ${MIDDLE}`,
  `M${LEFT_BUS_X} ${MIDDLES[0]} L${LEFT_BUS_X} ${MIDDLES[MIDDLES.length - 1]}`,
].join(" ");

const RIGHT_BUS = [
  ...MIDDLES.map((y) => `M${CHIPS_RIGHT} ${y} L${RIGHT_BUS_X} ${y}`),
  `M${RIGHT_BUS_X} ${MIDDLES[0]} L${RIGHT_BUS_X} ${
    MIDDLES[MIDDLES.length - 1]
  }`,
].join(" ");

export default function Crea8iveSearch() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="How the case-study pages were built to be found"
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Zone
        h={ZONE_BOTTOM - ZONE_TOP}
        label="23 case-study pages, each named for a search phrase"
        w={SHEET_W - 2 * ZONE_X}
        x={ZONE_X}
        y={ZONE_TOP}
      />

      <Line d={LEFT_BUS} />
      {MIDDLES.map((y) => (
        <Wire d={`M${LEFT_BUS_X} ${y} L${CHIP_X - ARROW_GAP} ${y}`} key={y} />
      ))}

      <Line d={RIGHT_BUS} />
      <Wire d={`M${RIGHT_BUS_X} ${MIDDLE} L${HOME_X - ARROW_GAP} ${MIDDLE}`} />

      <Node
        lines={SITEMAP_LINES}
        title="Sitemap"
        w={SITEMAP_W}
        x={SITEMAP_X}
        y={NODE_Y}
      />

      {PHRASES.map((phrase, index) => (
        <Chip
          h={CHIP_H}
          key={phrase}
          strong
          text={phrase}
          w={CHIP_W}
          x={CHIP_X}
          y={CHIPS_Y + index * CHIP_PITCH}
        />
      ))}

      <Label
        anchor="middle"
        text="Each phrase links to the home page"
        x={(RIGHT_BUS_X + HOME_X) / 2}
        y={MIDDLE - S2}
      />

      <Node
        lines={HOME_LINES}
        title="Home page"
        tone="focal"
        w={HOME_W}
        x={HOME_X}
        y={NODE_Y}
      />
      <Node
        lines={TITLE_LINES}
        title="One shared title"
        tone="ghost"
        w={HOME_W}
        x={HOME_X}
        y={TITLE_Y}
      />
    </Canvas>
  );
}
