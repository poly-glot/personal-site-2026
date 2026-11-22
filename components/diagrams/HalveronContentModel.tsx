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
} from "./parts.tsx";

interface RecordBox {
  lines: readonly string[];
  title: string;
}

const DESCRIPTION =
  "Halveron's content model: a person is one record, and several kinds of page point at it. On the left are five places where staff choose a person: a capability (8 of them), a course (5), a sector (8), an article (13, where they choose the author) and three pages, Careers, Conference and Forum. Each has a short line into one vertical line, and a single arrow runs from that line into Person, marked as the subject. Person has 9 records, with a role, portrait, phone number and email, and no page of its own. On the right are two other kinds of record that staff also choose from a list: Organisation (22), chosen for client logos, partners and event hosts, and Event (3), chosen on the Forum page. Eight links point at a person and 19 more links between records work the same way.";

const SHEET_W = 1600;
const RECORD_W = 380;
const STUB = S4;
const ARROW = S5;
const COLUMN_GAP = S5;
const ROW_W = 3 * RECORD_W + STUB + ARROW + COLUMN_GAP;
const LEFT = (SHEET_W - ROW_W) / 2;
const SHEET_LEADING = 24;

const HOLDERS: readonly RecordBox[] = [
  { lines: ["8 capabilities", "Choose a contact"], title: "Capability" },
  { lines: ["5 courses", "Choose a contact"], title: "Course" },
  { lines: ["8 sectors", "Choose a contact"], title: "Sector" },
  { lines: ["13 articles", "Choose the author"], title: "Article" },
  {
    lines: ["Careers, Conference and Forum", "Choose the people to show"],
    title: "Three pages",
  },
];
const PERSON: RecordBox = {
  lines: [
    "9 people",
    "Role, portrait, phone and email",
    "No page of their own",
  ],
  title: "Person",
};
const OTHERS: readonly { row: number; box: RecordBox }[] = [
  {
    box: {
      lines: ["22 organisations", "Client logos, partners and hosts"],
      title: "Organisation",
    },
    row: 1,
  },
  {
    box: {
      lines: ["3 forum meetings", "Chosen on the Forum page"],
      title: "Event",
    },
    row: 3,
  },
];

const HOLDER_X = LEFT;
const BUS_X = HOLDER_X + RECORD_W + STUB;
const PERSON_X = BUS_X + ARROW;
const OTHER_X = PERSON_X + RECORD_W + COLUMN_GAP;

const CAPTION_Y = S4;
const TOP = CAPTION_Y + S2;
const HOLDER_H = sheetNodeHeight(HOLDERS[0].lines);
const PERSON_H = sheetNodeHeight(PERSON.lines);
const MIDDLE_HOLDER = Math.floor(HOLDERS.length / 2);
const LAST_HOLDER = HOLDERS.length - 1;
const ARROW_Y = holderMiddle(MIDDLE_HOLDER);
const PERSON_Y = ARROW_Y - PERSON_H / 2;
const BOTTOM = holderY(LAST_HOLDER) + HOLDER_H;
const LEGEND_Y = BOTTOM + S4;
const HEIGHT = LEGEND_Y + (SHEET_LEADING + S1) + S3;

function holderY(index: number): number {
  return TOP + index * (HOLDER_H + S3);
}

function holderMiddle(index: number): number {
  return holderY(index) + HOLDER_H / 2;
}

export default function HalveronContentModel() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="Halveron's content model: a person is one record, and five kinds of page point at it"
      quiet
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Label
        kind="caption"
        text="Where staff choose a person"
        x={HOLDER_X}
        y={CAPTION_Y}
      />
      <Label
        kind="caption"
        text="Chosen from a list in the same way"
        x={OTHER_X}
        y={CAPTION_Y}
      />

      {HOLDERS.map((holder, index) => (
        <g key={holder.title}>
          <Node
            lines={holder.lines}
            title={holder.title}
            w={RECORD_W}
            x={HOLDER_X}
            y={holderY(index)}
          />
          <Line
            d={`M${HOLDER_X + RECORD_W} ${holderMiddle(index)} L${BUS_X} ${
              holderMiddle(index)
            }`}
            from="dot"
          />
        </g>
      ))}
      <Line
        d={`M${BUS_X} ${holderMiddle(0)} L${BUS_X} ${
          holderMiddle(LAST_HOLDER)
        }`}
      />
      <Wire d={`M${BUS_X} ${ARROW_Y} L${PERSON_X - 2} ${ARROW_Y}`} />

      <Node
        lines={PERSON.lines}
        title={PERSON.title}
        tone="focal"
        w={RECORD_W}
        x={PERSON_X}
        y={PERSON_Y}
      />

      {OTHERS.map(({ box, row }) => (
        <Node
          key={box.title}
          lines={box.lines}
          title={box.title}
          w={RECORD_W}
          x={OTHER_X}
          y={holderY(row)}
        />
      ))}

      <Label
        kind="aside"
        text="Staff choose a person from a list, so each person is entered once."
        x={HOLDER_X}
        y={LEGEND_Y}
      />
      <Label
        kind="note"
        text="Eight links point at a person. 19 more links between records work the same way."
        x={HOLDER_X}
        y={LEGEND_Y + SHEET_LEADING + S1}
      />
    </Canvas>
  );
}
