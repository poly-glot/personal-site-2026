import {
  Canvas,
  Label,
  Node,
  S3,
  S4,
  S5,
  sheetNodeHeight,
  type Tone,
  Wire,
  Zone,
} from "./parts.tsx";

interface Step {
  count?: string;
  lines: readonly string[];
  title: string;
  tone?: Tone;
}

interface Neighbour {
  name: string;
  shared: string;
}

interface Column {
  heading: string;
  neighbours?: readonly Neighbour[];
  shown: readonly string[];
  steps: readonly [Step, Step, Step];
}

const DESCRIPTION =
  "Three kinds of neighbour, each found by following the links. First, sites like a site: start from imdb.com, which has 10,832 links, take the 10,656 categories its links are filed in, skipping categories with over 512 links, and read off the other sites filed in the same categories, ranked by how many categories they share: rottentomatoes.com 358, all-reviews.com 327 and tvguide.com 205. Shown in search results as Similar sites. Second, names named alongside a name: start from Benazir Bhutto, named on 13 links, take the links that name her, and count the other names on those links, most shared first. Shown in search results as Named alongside. Third, categories like a category: start from Animation, find other categories with the same name, largest first, and none for names reused over 24 times, then the semantically nearest. Shown on every category page as See also, and in search as Related categories. All three are also in the JSON API and in the find_related tool for AI assistants.";

const COLUMNS: readonly Column[] = [
  {
    heading: "Sites like this one",
    neighbours: [
      { name: "rottentomatoes.com", shared: "358" },
      { name: "all-reviews.com", shared: "327" },
      { name: "tvguide.com", shared: "205" },
    ],
    shown: ["Shown in search as Similar sites."],
    steps: [
      {
        count: "10,832 links",
        lines: ["The site you start from."],
        title: "imdb.com",
      },
      {
        count: "10,656",
        lines: [
          "Every category its links are filed in.",
          "Categories with over 512 links are",
          "skipped; small ones count for more.",
        ],
        title: "Its categories",
      },
      {
        lines: ["Ranked by shared categories:"],
        title: "Sites filed there too",
        tone: "focal",
      },
    ],
  },
  {
    heading: "Names named alongside",
    shown: ["Shown in search as Named alongside."],
    steps: [
      {
        count: "13 links",
        lines: ["A person or organisation."],
        title: "Benazir Bhutto",
      },
      {
        lines: [
          "Every link whose title or",
          "description mentions the name.",
        ],
        title: "The links naming it",
      },
      {
        lines: [
          "The other names on those links,",
          "most shared links first.",
        ],
        title: "Named alongside",
      },
    ],
  },
  {
    heading: "Categories like this one",
    shown: [
      "Shown on every category page as See also,",
      "and in search as Related categories.",
    ],
    steps: [
      {
        count: "5,976 links",
        lines: ["A category in the tree."],
        title: "Animation",
      },
      {
        lines: [
          "Other categories called Animation,",
          "largest first. None for names",
          "reused over 24 times.",
        ],
        title: "Same name elsewhere",
      },
      {
        lines: [
          "Then the categories whose path",
          "has the nearest embedding.",
        ],
        title: "Semantically near",
      },
    ],
  },
];

const FOOTER =
  "All three are also in the JSON API and in the find_related tool that AI assistants use.";

const SHEET_W = 1600;
const MARGIN = 30;
const ZONE_W = 480;
const ZONE_GAP = S5;
const ZONE_Y = 24;
const NODE_INSET = 24;
const NODE_W = ZONE_W - 2 * NODE_INSET;
const NODE_MIDDLE = NODE_W / 2;
const DATA_INSET = 22;
const NAME_BASELINE = 46;
const FIRST_ROW = 96;
const ROW_PITCH = 24;
const ARROW_GAP = 2;
const GAP = S4;

const HEIGHTS = [
  sheetNodeHeight([""]),
  sheetNodeHeight(["", "", ""]),
  sheetNodeHeight(["", "", "", ""]),
] as const;

const FIRST_Y = ZONE_Y + S5 + S3;
const TOPS = [
  FIRST_Y,
  FIRST_Y + HEIGHTS[0] + GAP,
  FIRST_Y + HEIGHTS[0] + HEIGHTS[1] + 2 * GAP,
] as const;
const NODES_BOTTOM = TOPS[2] + HEIGHTS[2];
const SHOWN_Y = NODES_BOTTOM + S4;
const ZONE_BOTTOM = SHOWN_Y + S3 + S3;
const FOOTER_Y = ZONE_BOTTOM + S4;
const HEIGHT = FOOTER_Y + S4;

function zoneX(index: number): number {
  return MARGIN + index * (ZONE_W + ZONE_GAP);
}

function nodeX(index: number): number {
  return zoneX(index) + NODE_INSET;
}

function down(x: number, from: number, to: number): string {
  return `M${x} ${from} L${x} ${to - ARROW_GAP}`;
}

function Chain({ column, index }: { column: Column; index: number }) {
  const x = nodeX(index);

  return (
    <g>
      {column.steps.map((step, row) => (
        <g key={step.title}>
          <Node
            h={HEIGHTS[row]}
            lines={step.lines}
            title={step.title}
            tone={step.tone}
            w={NODE_W}
            x={x}
            y={TOPS[row]}
          />
          {step.count && (
            <Label
              anchor="end"
              kind="data"
              text={step.count}
              x={x + NODE_W - DATA_INSET}
              y={TOPS[row] + NAME_BASELINE}
            />
          )}
        </g>
      ))}
      {[0, 1].map((row) => (
        <Wire
          d={down(x + NODE_MIDDLE, TOPS[row] + HEIGHTS[row], TOPS[row + 1])}
          key={row}
        />
      ))}
      {column.neighbours?.map((neighbour, row) => (
        <g key={neighbour.name}>
          <Label
            kind="aside"
            text={neighbour.name}
            x={x + DATA_INSET}
            y={TOPS[2] + FIRST_ROW + row * ROW_PITCH}
          />
          <Label
            anchor="end"
            kind="data"
            text={neighbour.shared}
            x={x + NODE_W - DATA_INSET}
            y={TOPS[2] + FIRST_ROW + row * ROW_PITCH}
          />
        </g>
      ))}
    </g>
  );
}

export default function ZigNeighbours() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="Three kinds of neighbour: sites, names and categories"
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      {COLUMNS.map((column, index) => (
        <g key={column.heading}>
          <Zone
            h={ZONE_BOTTOM - ZONE_Y}
            label={column.heading}
            w={ZONE_W}
            x={zoneX(index)}
            y={ZONE_Y}
          />
          <Chain column={column} index={index} />
          {column.shown.map((text, row) => (
            <Label
              kind="caption"
              key={text}
              text={text}
              x={nodeX(index)}
              y={SHOWN_Y + row * S3}
            />
          ))}
        </g>
      ))}

      <Label kind="aside" text={FOOTER} x={zoneX(0)} y={FOOTER_Y} />
    </Canvas>
  );
}
