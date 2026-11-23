import {
  Canvas,
  Label,
  Node,
  S1,
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
  "Meridian Airport's content model, drawn as six boxes with no arrows between them, because no setting in this site's content model points at another record. On the left, under the caption Records in Drupal, are two boxes. Page template, marked as the subject, holds 10 templates: the header, the menu and the footer around a page, and 16 pages share the main one. Page holds 29 pages, put together in the Canvas editor, and each one uses one of the templates. In the middle, under the caption Typed into pages and templates, are three boxes. Component holds 48 components, with 215 settings and 30 slots, written in the Next.js app. Flight row holds 36 rows on two pages, typed into the page, with no flight feed. Travel notice holds 3 notices, in the home page template and shown on the home page only. On the right, under the caption Outside Drupal, Picture holds 123 picture files kept in the Next.js app and chosen by typing a file path. Nothing here is a record of its own except pages and templates. The menu, the footer and the phone number sit in all 10 templates.";

const SHEET_W = 1600;
const SHEET_LEADING = 24;
const BOX_W = 400;
const COLUMN_GAP = 60;
const LEFT = (SHEET_W - (3 * BOX_W + 2 * COLUMN_GAP)) / 2;

const DRUPAL = 0;
const TYPED = 1;
const OUTSIDE = 2;
const FIRST_ROW = 0;
const SECOND_ROW = 1;
const THIRD_ROW = 2;

const RECORDS: readonly RecordBox[] = [
  {
    column: DRUPAL,
    lines: [
      "10 templates",
      "Header, menu and footer around a page",
      "16 pages share the main one",
    ],
    row: FIRST_ROW,
    title: "Page template",
    tone: "focal",
  },
  {
    column: DRUPAL,
    lines: [
      "29 pages",
      "Put together in the Canvas editor",
      "Each one uses one of the templates",
    ],
    row: SECOND_ROW,
    title: "Page",
  },
  {
    column: TYPED,
    lines: [
      "48 components",
      "215 settings and 30 slots",
      "Written in the Next.js app",
    ],
    row: FIRST_ROW,
    title: "Component",
  },
  {
    column: TYPED,
    lines: ["36 rows on two pages", "Typed into the page", "No flight feed"],
    row: SECOND_ROW,
    title: "Flight row",
  },
  {
    column: TYPED,
    lines: [
      "3 notices",
      "In the home page template",
      "Shown on the home page only",
    ],
    row: THIRD_ROW,
    title: "Travel notice",
  },
  {
    column: OUTSIDE,
    lines: [
      "123 picture files",
      "Kept in the Next.js app",
      "Chosen by typing a file path",
    ],
    row: FIRST_ROW,
    title: "Picture",
  },
];

const CAPTIONS = [
  "Records in Drupal",
  "Typed into pages and templates",
  "Outside Drupal",
];

const CAPTION_Y = S4;
const TOP = CAPTION_Y + S3;
const BOX_H = sheetNodeHeight(RECORDS[0].lines);
const LEGEND_Y = rowY(THIRD_ROW) + BOX_H + S4;
const HEIGHT = LEGEND_Y + SHEET_LEADING + S1 + S3;

function columnX(column: number): number {
  return LEFT + column * (BOX_W + COLUMN_GAP);
}

function rowY(row: number): number {
  return TOP + row * (BOX_H + S4);
}

export default function AirportContentModel() {
  return (
    <Canvas
      description={DESCRIPTION}
      quiet
      title={`Meridian Airport's content model: ${RECORDS.length} boxes, and only pages and templates are records of their own`}
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      {CAPTIONS.map((caption, column) => (
        <Label
          key={caption}
          kind="caption"
          text={caption}
          x={columnX(column)}
          y={CAPTION_Y}
        />
      ))}

      {RECORDS.map((record) => (
        <Node
          h={BOX_H}
          key={record.title}
          lines={record.lines}
          title={record.title}
          tone={record.tone}
          w={BOX_W}
          x={columnX(record.column)}
          y={rowY(record.row)}
        />
      ))}

      <Label
        kind="aside"
        text="Nothing here is a record of its own except pages and templates."
        x={LEFT}
        y={LEGEND_Y}
      />
      <Label
        kind="note"
        text="The menu, the footer and the phone number sit in all 10 templates."
        x={LEFT}
        y={LEGEND_Y + SHEET_LEADING + S1}
      />
    </Canvas>
  );
}
