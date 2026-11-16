import {
  Canvas,
  Label,
  Line,
  Node,
  S1,
  S2,
  S3,
  S4,
  S5,
  sheetNodeHeight,
  Wire,
  Zone,
} from "./parts.tsx";

const DESCRIPTION =
  "Everything happens in the browser. A visitor answers five questions, and each one opens once they answer the one before. The rule turns the answers into a way in: Guardian if any answer points to giving, then Coalition if the visitor brings others or wants a team total, then Solo. The result is one value, kept in the page's memory and worked out again on each click. Three parts of the page read that value: the photograph in the We recommend panel, the at-a-glance rows for distance, time, entry, target and where the money goes, and both card grids, where Coalition sees 5 of the 6 cards in On the day. Nothing is kept: there is no cookie, no analytics and no server, so a reload starts the quiz again.";

const QUIZ_LINES = ["Each opens once you", "answer the one before."];
const RULE_LINES = [
  "Guardian if any answer points",
  "to giving, then Coalition if the",
  "visitor brings others or wants",
  "a team total, then Solo.",
];
const VALUE_LINES = [
  "Kept in the page's memory.",
  "Each click works it out",
  "again and selects it.",
];
const READERS = [
  {
    lines: ["The photograph in the", "We recommend panel."],
    title: "Photos",
  },
  {
    lines: ["Distance, time, entry, target", "and where the money goes."],
    title: "At a glance",
  },
  {
    lines: ["Both grids. Coalition sees 5", "of the 6 cards in On the day."],
    title: "Card grids",
  },
];
const ABSENT = ["Cookie", "Analytics", "Server"];

const SHEET_W = 1600;
const GHOST_H = sheetNodeHeight([]);

const EDGE = S3;
const PAD = S4;
const HEAD_ROOM = S5 + S1;
const ZONE_W = SHEET_W - 2 * EDGE;
const ZONE_RIGHT = EDGE + ZONE_W;

const QUIZ_X = EDGE + PAD;
const QUIZ_W = 280;
const RULE_X = QUIZ_X + QUIZ_W + S5;
const RULE_W = 340;
const VALUE_X = RULE_X + RULE_W + S5;
const VALUE_W = 320;
const VALUE_RIGHT = VALUE_X + VALUE_W;
const BUS_X = VALUE_RIGHT + S2;
const READER_X = BUS_X + S4;
const READER_W = ZONE_RIGHT - PAD - READER_X;

const BROWSER_Y = S4;
const READER_H = sheetNodeHeight(READERS[0].lines);
const READER_TOPS = [0, 1, 2].map((index) =>
  BROWSER_Y + HEAD_ROOM + index * (READER_H + S3)
);
const READER_MIDDLES = READER_TOPS.map((top) => top + READER_H / 2);
const MIDDLE = READER_MIDDLES[1];
const BROWSER_H = READER_TOPS[2] + READER_H + PAD - BROWSER_Y;

const KEPT_Y = BROWSER_Y + BROWSER_H + S3;
const GHOST_TOP = KEPT_Y + HEAD_ROOM;
const GHOST_W = 200;
const GHOST_XS = [0, 1, 2].map((index) => QUIZ_X + index * (GHOST_W + S3));
const KEPT_H = HEAD_ROOM + GHOST_H + PAD;
const SHEET_H = KEPT_Y + KEPT_H + S4;

const BUS = `M${BUS_X} ${READER_MIDDLES[0]} L${BUS_X} ${READER_MIDDLES[2]}`;

function centredOn(lines: readonly string[]): number {
  return MIDDLE - sheetNodeHeight(lines) / 2;
}

function across(fromX: number, toX: number, y = MIDDLE): string {
  return `M${fromX} ${y} L${toX - 2} ${y}`;
}

export default function VisitorPath() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="How five answers rearrange the Outrun page"
      viewBox={`0 0 ${SHEET_W} ${SHEET_H}`}
    >
      <Zone
        h={BROWSER_H}
        label="In the browser"
        w={ZONE_W}
        x={EDGE}
        y={BROWSER_Y}
      />
      <Zone h={KEPT_H} label="Nothing kept" w={ZONE_W} x={EDGE} y={KEPT_Y} />

      <Wire d={across(QUIZ_X + QUIZ_W, RULE_X)} />
      <Wire d={across(RULE_X + RULE_W, VALUE_X)} />
      <Line d={BUS} />
      {READER_MIDDLES.map((y) => (
        <Wire
          d={across(y === MIDDLE ? VALUE_RIGHT : BUS_X, READER_X, y)}
          key={y}
        />
      ))}

      <Node
        lines={QUIZ_LINES}
        title="Five questions"
        w={QUIZ_W}
        x={QUIZ_X}
        y={centredOn(QUIZ_LINES)}
      />
      <Node
        lines={RULE_LINES}
        title="The rule"
        w={RULE_W}
        x={RULE_X}
        y={centredOn(RULE_LINES)}
      />
      <Node
        lines={VALUE_LINES}
        title="One value"
        tone="focal"
        w={VALUE_W}
        x={VALUE_X}
        y={centredOn(VALUE_LINES)}
      />
      {READERS.map((reader, index) => (
        <Node
          key={reader.title}
          lines={reader.lines}
          title={reader.title}
          w={READER_W}
          x={READER_X}
          y={READER_TOPS[index]}
        />
      ))}

      {ABSENT.map((title, index) => (
        <Node
          key={title}
          lines={[]}
          title={title}
          tone="ghost"
          w={GHOST_W}
          x={GHOST_XS[index]}
          y={GHOST_TOP}
        />
      ))}
      <Label
        kind="aside"
        text="A reload starts the quiz again."
        x={GHOST_XS[2] + GHOST_W + S4}
        y={GHOST_TOP + GHOST_H / 2 + S1}
      />
    </Canvas>
  );
}
