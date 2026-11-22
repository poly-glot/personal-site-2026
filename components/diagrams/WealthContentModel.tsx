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
  type Tone,
  Wire,
} from "./parts.tsx";

interface RecordBox {
  caption: string;
  lines: readonly string[];
  title: string;
  tone?: Tone;
  x: number;
}

const DESCRIPTION =
  "Wealth's content model as three kinds of record and two links between them, each entered once by staff. Strategy: 4 records, with a summary, an approach, risks, documents and questions investors ask. Person: 6 records, with a role, a group and a lead paragraph, marked as the subject because a person's own record holds no link to a strategy or an insight. Insight: 6 records, with a title, text, a category and an image. A solid arrow labelled Managed by runs from Strategy to Person: staff enter who runs a strategy on the strategy's own form. A solid arrow labelled Author profile runs from Insight to Person: staff pick the author on the insight's own form. Below Person, two dashed boxes show the two lists a person's page works out for itself, which staff never enter: Manages, the strategies that name this person, and Latest insight, the newest insight that names them as author.";

const SHEET_W = 1600;
const RECORD_W = 380;
const LINK_GAP = 190;
const ROW_W = 3 * RECORD_W + 2 * LINK_GAP;
const LEFT = (SHEET_W - ROW_W) / 2;
const CENTRE = SHEET_W / 2;

const STRATEGY_X = LEFT;
const PERSON_X = STRATEGY_X + RECORD_W + LINK_GAP;
const INSIGHT_X = PERSON_X + RECORD_W + LINK_GAP;

const RECORDS: readonly RecordBox[] = [
  {
    caption: "4 strategies",
    lines: ["Summary, approach and risks", "Documents and investor questions"],
    title: "Strategy",
    x: STRATEGY_X,
  },
  {
    caption: "6 people",
    lines: [
      "Role, group and lead paragraph",
      "Nothing about what they run or write",
    ],
    title: "Person",
    tone: "focal",
    x: PERSON_X,
  },
  {
    caption: "6 insights",
    lines: ["Title and text", "Category and image"],
    title: "Insight",
    x: INSIGHT_X,
  },
];

const WORKED_OUT: readonly { lines: readonly string[]; title: string }[] = [
  { lines: ["The strategies that", "name this person"], title: "Manages" },
  {
    lines: ["The newest insight that", "names them as author"],
    title: "Latest insight",
  },
];
const WORKED_OUT_W = 340;
const WORKED_OUT_ROW_W = 2 * WORKED_OUT_W + S4;
const WORKED_OUT_LEFT = CENTRE - WORKED_OUT_ROW_W / 2;

const CAPTION_Y = S4;
const RECORD_Y = CAPTION_Y + S2;
const RECORD_H = sheetNodeHeight(RECORDS[0].lines);
const RECORD_BOTTOM = RECORD_Y + RECORD_H;
const RECORD_MIDDLE = RECORD_Y + RECORD_H / 2;
const BUS_Y = RECORD_BOTTOM + S5;
const WORKED_OUT_Y = BUS_Y + S4;
const HEIGHT = WORKED_OUT_Y + sheetNodeHeight(WORKED_OUT[0].lines) + S3;

const LEGEND_X = LEFT;
const LEGEND_Y = WORKED_OUT_Y + S4;
const SHEET_LEADING = 24;

function workedOutX(index: number): number {
  return WORKED_OUT_LEFT + index * (WORKED_OUT_W + S4);
}

function workedOutCentre(index: number): number {
  return workedOutX(index) + WORKED_OUT_W / 2;
}

const STEM = [
  `M${CENTRE} ${RECORD_BOTTOM} L${CENTRE} ${BUS_Y}`,
  `M${workedOutCentre(0)} ${BUS_Y} L${workedOutCentre(1)} ${BUS_Y}`,
].join(" ");

export default function WealthContentModel() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="Wealth's content model: three kinds of record, two links entered once and two lists worked out"
      quiet
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Wire
        d={`M${STRATEGY_X + RECORD_W} ${RECORD_MIDDLE} L${
          PERSON_X - 2
        } ${RECORD_MIDDLE}`}
      />
      <Label
        anchor="middle"
        text="Managed by"
        x={(STRATEGY_X + RECORD_W + PERSON_X) / 2}
        y={RECORD_MIDDLE - S2}
      />
      <Wire
        d={`M${INSIGHT_X} ${RECORD_MIDDLE} L${
          PERSON_X + RECORD_W + 2
        } ${RECORD_MIDDLE}`}
      />
      <Label
        anchor="middle"
        text="Author profile"
        x={(PERSON_X + RECORD_W + INSIGHT_X) / 2}
        y={RECORD_MIDDLE - S2}
      />

      {RECORDS.map((record) => (
        <g key={record.title}>
          <Label
            kind="caption"
            text={record.caption}
            x={record.x}
            y={CAPTION_Y}
          />
          <Node
            lines={record.lines}
            title={record.title}
            tone={record.tone}
            w={RECORD_W}
            x={record.x}
            y={RECORD_Y}
          />
        </g>
      ))}

      <Line d={STEM} />
      {WORKED_OUT.map((box, index) => (
        <g key={box.title}>
          <Wire
            d={`M${workedOutCentre(index)} ${BUS_Y} L${
              workedOutCentre(index)
            } ${WORKED_OUT_Y - 2}`}
          />
          <Node
            lines={box.lines}
            title={box.title}
            tone="ghost"
            w={WORKED_OUT_W}
            x={workedOutX(index)}
            y={WORKED_OUT_Y}
          />
        </g>
      ))}
      <Label
        text="On the person's page"
        x={CENTRE + S2}
        y={RECORD_BOTTOM + S4}
      />

      <Label
        kind="aside"
        text="Each arrow is a link staff enter once."
        x={LEGEND_X}
        y={LEGEND_Y}
      />
      <Label
        kind="note"
        text="Each dashed box is a list the page works out."
        x={LEGEND_X}
        y={LEGEND_Y + SHEET_LEADING + S1}
      />
    </Canvas>
  );
}
