import {
  Canvas,
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

const SHEET_ZONE_PAD = 24;

const SOURCE_X = 40;
const SOURCE_W = 320;
const SOURCE_TOP = 80;
const SOURCE_RIGHT = SOURCE_X + SOURCE_W;
const BUS_X = SOURCE_RIGHT + S3;

const ZONE_X = 560;
const FILTER_X = ZONE_X + S4;
const FILTER_W = 440;
const FILTER_RIGHT = FILTER_X + FILTER_W;
const FILTER_CENTRE = FILTER_X + FILTER_W / 2;
const ZONE_W = FILTER_W + 2 * S4;

const TABLES_X = 1240;
const TABLES_W = 320;

const SOURCES = [
  {
    lines: ["The first part of the URL", "sets the workspace."],
    title: "Web request",
  },
  {
    lines: ["Each workspace has its", "own endpoint."],
    title: "GraphQL API",
  },
  {
    lines: ["Sets it for one job, then", "puts the previous value back."],
    title: "Import and export",
  },
];

const FILTER_LINES = [
  "Adds the active workspace to every",
  "find on 19 tables. A new row takes",
  "it, and saving another workspace's",
  "row stops with an error.",
];

const REFUSED_LINES = [
  "Instead of returning every",
  "shop's rows, so a mistake",
  "fails closed.",
];

const TABLES_LINES = ["Every workspace's rows sit", "in the same tables."];

const SOURCE_H = sheetNodeHeight(SOURCES[0].lines);
const SOURCE_TOPS = SOURCES.map((_, index) =>
  SOURCE_TOP + index * (SOURCE_H + S3)
);
const SOURCE_MIDDLES = SOURCE_TOPS.map((top) => top + SOURCE_H / 2);
const MIDDLE = SOURCE_MIDDLES[1];

const FILTER_TOP = MIDDLE - sheetNodeHeight(FILTER_LINES) / 2;
const FILTER_BOTTOM = FILTER_TOP + sheetNodeHeight(FILTER_LINES);
const REFUSED_TOP = FILTER_BOTTOM + S5;
const ZONE_TOP = FILTER_TOP - S5 - S3;
const ZONE_BOTTOM = REFUSED_TOP + sheetNodeHeight(REFUSED_LINES) + S4;
const HEIGHT = ZONE_BOTTOM + S5;

const BUS = [
  ...SOURCE_MIDDLES.map((y) => `M${SOURCE_RIGHT} ${y} L${BUS_X} ${y}`),
  `M${BUS_X} ${SOURCE_MIDDLES[0]} L${BUS_X} ${SOURCE_MIDDLES[2]}`,
].join(" ");

const DESCRIPTION =
  "Three things set the active workspace. A web request sets it from the first part of its URL. The GraphQL API gives each workspace its own endpoint. The import and export commands set it for one job, then put the previous value back. All three join one line into the model layer, where TenantBehavior adds the active workspace to every find on 19 tables, gives a new row the active workspace, and stops with an error when a save touches another workspace's row. Finds and saves then reach the MySQL tables, where every workspace's rows sit in the same tables. When no workspace is set, the path drops to a dashed, refused outcome: the query stops with an error instead of returning every shop's rows, so a mistake fails closed.";

export default function WorkspaceFence() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="How Cabinet keeps each workspace's content to itself"
      viewBox={`0 0 1600 ${HEIGHT}`}
    >
      <Zone
        h={ZONE_BOTTOM - ZONE_TOP}
        label="Model layer"
        w={ZONE_W}
        x={ZONE_X}
        y={ZONE_TOP}
      />
      <Label
        anchor="end"
        kind="data"
        text="TenantBehavior"
        x={ZONE_X + ZONE_W - SHEET_ZONE_PAD}
        y={ZONE_TOP + S4}
      />

      <Label
        kind="caption"
        text="Who sets it"
        x={SOURCE_X}
        y={SOURCE_TOP - S2}
      />

      <Line d={BUS} />
      <Wire d={`M${BUS_X} ${MIDDLE} L${FILTER_X - 2} ${MIDDLE}`} />
      <Wire d={`M${FILTER_RIGHT} ${MIDDLE} L${TABLES_X - 2} ${MIDDLE}`} />
      <Wire
        d={`M${FILTER_CENTRE} ${FILTER_BOTTOM} L${FILTER_CENTRE} ${
          REFUSED_TOP - 2
        }`}
      />

      {SOURCES.map((source, index) => (
        <Node
          key={source.title}
          lines={source.lines}
          title={source.title}
          w={SOURCE_W}
          x={SOURCE_X}
          y={SOURCE_TOPS[index]}
        />
      ))}

      <Node
        lines={FILTER_LINES}
        title="Workspace filter"
        tone="focal"
        w={FILTER_W}
        x={FILTER_X}
        y={FILTER_TOP}
      />
      <Node
        lines={REFUSED_LINES}
        title="Stops with an error"
        tone="ghost"
        w={FILTER_W}
        x={FILTER_X}
        y={REFUSED_TOP}
      />
      <Node
        lines={TABLES_LINES}
        title="MySQL tables"
        w={TABLES_W}
        x={TABLES_X}
        y={MIDDLE - sheetNodeHeight(TABLES_LINES) / 2}
      />

      <Label text="Active workspace" x={BUS_X + S2} y={MIDDLE - S2} />
      <Label text="Find and save" x={ZONE_X + ZONE_W + S2} y={MIDDLE - S2} />
      <Label
        text="No workspace set"
        x={FILTER_CENTRE + S2}
        y={FILTER_BOTTOM + S4}
      />
    </Canvas>
  );
}
