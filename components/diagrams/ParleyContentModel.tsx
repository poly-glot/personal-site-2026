import {
  Canvas,
  Label,
  Node,
  S1,
  S2,
  S3,
  S4,
  sheetNodeHeight,
  type Tone,
  Wire,
} from "./parts.tsx";

interface RecordBox {
  column: number;
  lines: readonly string[];
  row: number;
  title: string;
  tone?: Tone;
}

const DESCRIPTION =
  "Parley's content model, drawn as seven boxes in three columns. In the first column are the two kinds of record where staff choose from a list: Case study, with 5 records, marked as the subject, and Article, with 9. A case study starts with a place: staff choose its region from a list of five and type its coordinates. They also choose its services from the list of services, and enter its results as figures with labels. An arrow labelled Services runs from Case study to Service, and an arrow labelled Author profile runs from Article to Team member. The second column holds what they choose from: Service, with 7 records, and Team member, with 6. The third column holds three boxes that are not linked to anything: Site settings, the one place the phone number, email addresses and address are entered, shown in every footer and on Contact; Pages, 8 of them; and Enquiry, which the contact form writes, kept private with no page of its own. Staff choose services and authors from a list, so a renamed service shows its new name on every case study that names it.";

const SHEET_W = 1600;
const SHEET_LEADING = 24;
const RECORD_W = 400;
const LINK_GAP = 150;
const COLUMN = RECORD_W + LINK_GAP;
const LEFT = (SHEET_W - (3 * RECORD_W + 2 * LINK_GAP)) / 2;

const CASE_STUDY = 0;
const SERVICE = 1;
const STANDALONE = 2;
const TOP_ROW = 0;
const MIDDLE_ROW = 1;
const BOTTOM_ROW = 2;

const RECORDS: readonly RecordBox[] = [
  {
    column: CASE_STUDY,
    lines: [
      "5 case studies",
      "A region chosen from five",
      "Its coordinates, typed in",
      "Services chosen from the list",
      "Results as figures with labels",
    ],
    row: TOP_ROW,
    title: "Case study",
    tone: "focal",
  },
  {
    column: SERVICE,
    lines: [
      "7 services",
      "Summary, what's included and steps",
      "Questions and answers",
    ],
    row: TOP_ROW,
    title: "Service",
  },
  {
    column: STANDALONE,
    lines: [
      "Phone number, emails and address",
      "Entered here, and nowhere else",
      "Shown in every footer and on Contact",
    ],
    row: TOP_ROW,
    title: "Site settings",
  },
  {
    column: CASE_STUDY,
    lines: [
      "9 articles",
      "Written in WordPress's own editor",
      "Author chosen from the team",
    ],
    row: MIDDLE_ROW,
    title: "Article",
  },
  {
    column: SERVICE,
    lines: [
      "6 people",
      "Role, languages and portrait",
      "Lead paragraph and biography",
    ],
    row: MIDDLE_ROW,
    title: "Team member",
  },
  {
    column: STANDALONE,
    lines: [
      "8 pages",
      "Home, About, Contact and five more",
      "Extra edit boxes for Home and About",
    ],
    row: MIDDLE_ROW,
    title: "Page",
  },
  {
    column: STANDALONE,
    lines: ["Written by the contact form", "Private, with no page of its own"],
    row: BOTTOM_ROW,
    title: "Enquiry",
  },
];

const LINKS: readonly { label: string; row: number }[] = [
  { label: "Services", row: TOP_ROW },
  { label: "Author profile", row: MIDDLE_ROW },
];

const CAPTIONS: readonly { column: number; text: string }[] = [
  { column: CASE_STUDY, text: "Where staff choose from a list" },
  { column: SERVICE, text: "What they choose from" },
  { column: STANDALONE, text: "On their own" },
];

const CAPTION_Y = S4;
const TOP = CAPTION_Y + S2;
const ROW_HEIGHTS = [TOP_ROW, MIDDLE_ROW, BOTTOM_ROW].map((row) =>
  Math.max(
    ...RECORDS.filter((record) => record.row === row).map((record) =>
      sheetNodeHeight(record.lines)
    ),
  )
);
const LEGEND_Y = rowY(BOTTOM_ROW) + S3;
const HEIGHT = rowY(BOTTOM_ROW) + ROW_HEIGHTS[BOTTOM_ROW] + S3;

function columnX(column: number): number {
  return LEFT + column * COLUMN;
}

function rowY(row: number): number {
  const above = ROW_HEIGHTS.slice(0, row).reduce(
    (total, height) => total + height + S4,
    0,
  );

  return TOP + above;
}

function rowMiddle(row: number): number {
  return rowY(row) + ROW_HEIGHTS[row] / 2;
}

export default function ParleyContentModel() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="Parley's content model: a case study starts with a place, and staff choose its services from a list"
      quiet
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      {CAPTIONS.map(({ column, text }) => (
        <Label
          key={text}
          kind="caption"
          text={text}
          x={columnX(column)}
          y={CAPTION_Y}
        />
      ))}

      {LINKS.map(({ label, row }) => (
        <g key={label}>
          <Wire
            d={`M${columnX(CASE_STUDY) + RECORD_W} ${rowMiddle(row)} L${
              columnX(SERVICE) - 2
            } ${rowMiddle(row)}`}
          />
          <Label
            anchor="middle"
            text={label}
            x={columnX(CASE_STUDY) + RECORD_W + LINK_GAP / 2}
            y={rowMiddle(row) - S2}
          />
        </g>
      ))}

      {RECORDS.map((record) => (
        <Node
          h={ROW_HEIGHTS[record.row]}
          key={record.title}
          lines={record.lines}
          title={record.title}
          tone={record.tone}
          w={RECORD_W}
          x={columnX(record.column)}
          y={rowY(record.row)}
        />
      ))}

      <Label
        kind="aside"
        text="Staff choose services and authors from a list, so each is entered once."
        x={LEFT}
        y={LEGEND_Y}
      />
      <Label
        kind="note"
        text="A renamed service shows its new name on every case study that names it."
        x={LEFT}
        y={LEGEND_Y + SHEET_LEADING + S1}
      />
    </Canvas>
  );
}
