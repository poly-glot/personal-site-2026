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
} from "./parts.tsx";

interface RecordBox {
  column: number;
  lines: readonly string[];
  row: number;
  title: string;
  tone?: Tone;
}

const DESCRIPTION =
  "Ferrow & Lisle's content model, drawn as eight boxes with no arrows between them, because no field in this site's content model points at another record. On the left, under the caption Records with a page of their own, are six boxes in two columns. Professional, marked as the subject, holds 4 people: job title, biography and three matters, with an email and a vCard file. Practice area holds 6 practice areas: icon, introduction and highlights. Article holds 6 articles, written in WordPress's own editor, with a news tag and share counts. White paper holds 4 white papers, each with one formatted body. Engagement holds 5 engagements, each with one formatted summary. Page holds 3 pages: Home, News and Contact. On the right, under the caption Shared by every page, Site settings holds the hotline, two offices and six map pins, entered here and nowhere else, and shown in every header and footer, on Contact and on the map. Under the caption Private, Enquiry is written by the enquiry form, and is private, with no page of its own. Nothing links one record to another, and each page lists every record of a kind. A new professional appears on the home page without anyone editing that page.";

const SHEET_W = 1600;
const SHEET_LEADING = 24;
const RECORD_W = 400;
const SETTINGS_W = 580;
const PAIR_GAP = 30;
const SIDE_GAP = 80;
const LEFT = (SHEET_W -
  (2 * RECORD_W + PAIR_GAP + SIDE_GAP + SETTINGS_W)) / 2;

const FIRST = 0;
const SECOND = 1;
const SIDE = 2;
const TOP_ROW = 0;
const MIDDLE_ROW = 1;
const BOTTOM_ROW = 2;

const RECORDS: readonly RecordBox[] = [
  {
    column: FIRST,
    lines: [
      "4 people",
      "Job title, biography and three matters",
      "Email and a vCard file",
    ],
    row: TOP_ROW,
    title: "Professional",
    tone: "focal",
  },
  {
    column: SECOND,
    lines: ["6 practice areas", "Icon, introduction and highlights"],
    row: TOP_ROW,
    title: "Practice area",
  },
  {
    column: FIRST,
    lines: [
      "6 articles",
      "Written in WordPress's own editor",
      "A news tag and share counts",
    ],
    row: MIDDLE_ROW,
    title: "Article",
  },
  {
    column: SECOND,
    lines: ["4 white papers", "One formatted body"],
    row: MIDDLE_ROW,
    title: "White paper",
  },
  {
    column: FIRST,
    lines: ["5 engagements", "One formatted summary"],
    row: BOTTOM_ROW,
    title: "Engagement",
  },
  {
    column: SECOND,
    lines: ["3 pages", "Home, News and Contact"],
    row: BOTTOM_ROW,
    title: "Page",
  },
  {
    column: SIDE,
    lines: [
      "Hotline, two offices, six map pins",
      "Entered here, and nowhere else",
      "Shown in every header and footer, on Contact and on the map",
    ],
    row: TOP_ROW,
    title: "Site settings",
  },
  {
    column: SIDE,
    lines: [
      "Written by the enquiry form",
      "Private, with no page of its own",
    ],
    row: BOTTOM_ROW,
    title: "Enquiry",
  },
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
const LEGEND_Y = rowY(BOTTOM_ROW) + ROW_HEIGHTS[BOTTOM_ROW] + S4;
const HEIGHT = LEGEND_Y + SHEET_LEADING + S1 + S3;

function columnX(column: number): number {
  const widths = [RECORD_W + PAIR_GAP, RECORD_W + SIDE_GAP, SETTINGS_W];

  return LEFT + widths.slice(0, column).reduce((sum, width) => sum + width, 0);
}

function columnWidth(column: number): number {
  return column === SIDE ? SETTINGS_W : RECORD_W;
}

function rowY(row: number): number {
  const above = ROW_HEIGHTS.slice(0, row).reduce(
    (total, height) => total + height + S4,
    0,
  );

  return TOP + above;
}

export default function LegalContentModel() {
  return (
    <Canvas
      description={DESCRIPTION}
      quiet
      title="Ferrow & Lisle's content model: eight boxes, and no record points at another"
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Label
        kind="caption"
        text="Records with a page of their own"
        x={columnX(FIRST)}
        y={CAPTION_Y}
      />
      <Label
        kind="caption"
        text="Shared by every page"
        x={columnX(SIDE)}
        y={CAPTION_Y}
      />
      <Label
        kind="caption"
        text="Private"
        x={columnX(SIDE)}
        y={rowY(BOTTOM_ROW) - S2}
      />

      {RECORDS.map((record) => (
        <Node
          h={ROW_HEIGHTS[record.row]}
          key={record.title}
          lines={record.lines}
          title={record.title}
          tone={record.tone}
          w={columnWidth(record.column)}
          x={columnX(record.column)}
          y={rowY(record.row)}
        />
      ))}

      <Label
        kind="aside"
        text="Nothing links one record to another. Each page lists every record of a kind."
        x={LEFT}
        y={LEGEND_Y}
      />
      <Label
        kind="note"
        text="A new professional appears on the home page without anyone editing that page."
        x={LEFT}
        y={LEGEND_Y + SHEET_LEADING + S1}
      />
    </Canvas>
  );
}
