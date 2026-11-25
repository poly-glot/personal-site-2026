import { Chip, Label, Pair, Panel, S1, S2, S3, S4, S5 } from "./parts.tsx";

const CATEGORIES = [
  15,
  550,
  6655,
  32683,
  74209,
  91979,
  130151,
  128255,
  89413,
  53568,
  18910,
  5275,
  767,
  39,
];

const LINKS = [
  59,
  3666,
  74702,
  280439,
  474763,
  500691,
  483950,
  450422,
  348818,
  249610,
  121508,
  42280,
  6291,
  247,
];

const MEDIAN_DEPTH = 7;

const NUMBER_X = 42;
const BAR_X = S3 + S4 + S2;
const BAR_MAX_W = 364;
const BAR_H = S2;
const ROW_PITCH = S3;
const VALUE_GAP = S1;
const BASELINE_DROP = 11;
const CAPTION_Y = S5 + S2;
const FIRST_ROW = CAPTION_Y + S3;
const ROWS_END = FIRST_ROW + CATEGORIES.length * ROW_PITCH;
const ASIDE_Y = ROWS_END + S4;
const NOTE_Y = ASIDE_Y + S3;
const HEIGHT = NOTE_Y + S3;

const CATEGORIES_TEXT =
  "Categories at each depth of the tree, from depth 1, a topic such as Arts, down to depth 14. Depth 1 has 15, depth 2 has 550, depth 3 has 6,655, depth 4 has 32,683, depth 5 has 74,209, depth 6 has 91,979, depth 7 has 130,151, depth 8 has 128,255, depth 9 has 89,413, depth 10 has 53,568, depth 11 has 18,910, depth 12 has 5,275, depth 13 has 767 and depth 14 has 39. 75% of categories are leaves, with no subcategory, and the tree is 14 levels deep at most.";

const LINKS_TEXT =
  "Links at each depth of the tree, approximate because they are counted from the source file and come within 0.2% of the stored total. Depth 1 has 59, depth 2 has 3,666, depth 3 has 74,702, depth 4 has 280,439, depth 5 has 474,763, depth 6 has 500,691, depth 7 has 483,950, depth 8 has 450,422, depth 9 has 348,818, depth 10 has 249,610, depth 11 has 121,508, depth 12 has 42,280, depth 13 has 6,291 and depth 14 has 247. The middle link sits at depth 7, drawn as the blue bar.";

function rowY(index: number): number {
  return FIRST_ROW + index * ROW_PITCH;
}

function Series(
  { counts, focalDepth }: { counts: readonly number[]; focalDepth?: number },
) {
  const scale = Math.max(...counts);

  return (
    <g>
      {counts.map((count, index) => {
        const depth = index + 1;
        const width = Math.max(2, (count / scale) * BAR_MAX_W);

        return (
          <g key={depth}>
            <Label
              anchor="end"
              kind="data"
              text={String(depth)}
              x={NUMBER_X}
              y={rowY(index) + BASELINE_DROP}
            />
            <Chip
              h={BAR_H}
              tone={depth === focalDepth ? "focal" : undefined}
              w={width}
              x={BAR_X}
              y={rowY(index)}
            />
            <Label
              kind="data"
              text={count.toLocaleString("en-GB")}
              x={BAR_X + width + VALUE_GAP}
              y={rowY(index) + BASELINE_DROP}
            />
          </g>
        );
      })}
    </g>
  );
}

function Heads({ title }: { title: string }) {
  return (
    <g>
      <Label kind="caption" text="Depth" x={S3} y={CAPTION_Y} />
      <Label kind="caption" text={title} x={BAR_X} y={CAPTION_Y} />
    </g>
  );
}

export default function ZigDepth() {
  return (
    <Pair>
      <Panel
        description={CATEGORIES_TEXT}
        heading="Categories at each depth"
        height={HEIGHT}
        title="How many categories sit at each depth of the tree"
      >
        <Heads title="Categories" />
        <Series counts={CATEGORIES} />
        <Label
          kind="aside"
          text="75% of categories are leaves; 14 levels at most."
          x={S3}
          y={ASIDE_Y}
        />
        <Label
          kind="caption"
          text="A leaf is a category with no subcategories."
          x={S3}
          y={NOTE_Y}
        />
      </Panel>

      <Panel
        description={LINKS_TEXT}
        heading="Links at each depth, approximate"
        height={HEIGHT}
        title="Roughly how many links sit at each depth of the tree"
      >
        <Heads title="Links" />
        <Series counts={LINKS} focalDepth={MEDIAN_DEPTH} />
        <Label
          kind="aside"
          text="The middle link sits 7 levels down."
          x={S3}
          y={ASIDE_Y}
        />
        <Label
          kind="caption"
          text="Approximate: counted from the source file, within 0.2%."
          x={S3}
          y={NOTE_Y}
        />
      </Panel>
    </Pair>
  );
}
