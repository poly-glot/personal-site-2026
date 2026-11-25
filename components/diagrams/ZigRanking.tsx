import {
  Chip,
  Label,
  Line,
  Node,
  nodeHeight,
  Pair,
  Panel,
  S2,
  S3,
  S4,
  S5,
  Wire,
} from "./parts.tsx";

const MERGE_TEXT =
  "Step one, the website turns the search query into an embedding of 384 dimensions with bge-small-en-v1.5. dmozdb then builds three shortlists: keyword, the 200 links whose words match best; semantic, the 200 links nearest to the search query; and categories, the links filed under the 3 categories nearest to the search query. The three lists join into one merge by reciprocal rank fusion, drawn as the subject: each list gives a link 1 divided by 60 plus its rank, and the scores are added. The merged order is the results page.";

const SEARCH_TEXT =
  "Step two, a real search. These are the ten links the public search returned for buddhist art in japan on 24 November 2026, in order. Nine matched the keywords of the search query. Buddha Image Archive, ranked seventh, was found by semantic search alone, so it reached the results only through the semantic list, drawn as the subject.";

const ARROW_GAP = 2;
const PANEL_INNER = 478;
const X = S3;
const COLUMN_W = 150;
const COLUMNS_LEFT = X + (PANEL_INNER - (3 * COLUMN_W + 2 * S2)) / 2;
const CENTRE = COLUMNS_LEFT + COLUMN_W + S2 + COLUMN_W / 2;

const WEBSITE_LINES = [
  "Turns the search query into an embedding of 384",
  "dimensions with bge-small-en-v1.5, in about 8 ms.",
];
const COLUMNS = [
  { lines: ["200 best", "keyword matches"], title: "Keyword" },
  { lines: ["200 nearest", "links"], title: "Semantic" },
  { lines: ["Links in the 3", "nearest ones"], title: "Categories" },
];
const MERGE_LINES = [
  "Each list gives a link 1 ÷ (60 + its rank),",
  "and the scores are added.",
];
const RESULTS_LINES = ["The links in that order, read from the store."];

const WEBSITE_Y = S5;
const WEBSITE_BOTTOM = WEBSITE_Y + nodeHeight(WEBSITE_LINES);
const SPLIT_Y = WEBSITE_BOTTOM + S3;
const COLUMN_Y = SPLIT_Y + S4;
const COLUMN_BOTTOM = COLUMN_Y + nodeHeight(COLUMNS[0].lines);
const JOIN_Y = COLUMN_BOTTOM + S3;
const MERGE_Y = JOIN_Y + S4;
const MERGE_BOTTOM = MERGE_Y + nodeHeight(MERGE_LINES);
const RESULTS_Y = MERGE_BOTTOM + S4;
const HEIGHT = RESULTS_Y + nodeHeight(RESULTS_LINES) + S3;

const FOUND = [
  { title: "Asian Art Gallery" },
  { title: "Shouun Oriental Art" },
  { title: "Korean Sokkuram" },
  { title: "Urthona Magazine" },
  { title: "Nezu Institute of Fine Arts" },
  { title: "Japanese Art in the Asia Society Collection" },
  { semanticOnly: true, title: "Buddha Image Archive" },
  { title: "Shinto and Buddhist Corner" },
  { title: "Buddhist Temples" },
  { title: "Japanese Art" },
];
const CAPTION_Y = 68;
const ROWS_Y = CAPTION_Y + S2;
const ROW_PITCH = Math.floor((HEIGHT - ROWS_Y - S3) / FOUND.length);
const ROW_TEXT_DROP = 22;
const RANK_X = X + S2;
const TITLE_X = RANK_X + 26;
const TAG_X = X + PANEL_INNER - S2;

function drop(x: number, from: number, to: number): string {
  return `M${x} ${from} L${x} ${to - ARROW_GAP}`;
}

function columnX(index: number): number {
  return COLUMNS_LEFT + index * (COLUMN_W + S2);
}

function columnCentre(index: number): number {
  return columnX(index) + COLUMN_W / 2;
}

function Merging() {
  const first = columnCentre(0);
  const last = columnCentre(2);

  return (
    <Panel
      description={MERGE_TEXT}
      heading="Three shortlists, one order"
      height={HEIGHT}
      step={1}
      title="How dmozdb merges three shortlists into one order"
    >
      <Line
        d={`M${CENTRE} ${WEBSITE_BOTTOM} L${CENTRE} ${SPLIT_Y} M${first} ${SPLIT_Y} L${last} ${SPLIT_Y}`}
      />
      {COLUMNS.map((column, index) => (
        <Wire
          d={drop(columnCentre(index), SPLIT_Y, COLUMN_Y)}
          key={column.title}
        />
      ))}
      <Line
        d={`M${first} ${COLUMN_BOTTOM} L${first} ${JOIN_Y} L${last} ${JOIN_Y} L${last} ${COLUMN_BOTTOM} M${CENTRE} ${COLUMN_BOTTOM} L${CENTRE} ${JOIN_Y}`}
      />
      <Wire d={drop(CENTRE, JOIN_Y, MERGE_Y)} />
      <Wire d={drop(CENTRE, MERGE_BOTTOM, RESULTS_Y)} />

      <Node
        lines={WEBSITE_LINES}
        title="The website"
        w={PANEL_INNER}
        x={X}
        y={WEBSITE_Y}
      />
      {COLUMNS.map((column, index) => (
        <Node
          key={column.title}
          lines={column.lines}
          title={column.title}
          w={COLUMN_W}
          x={columnX(index)}
          y={COLUMN_Y}
        />
      ))}
      <Node
        lines={MERGE_LINES}
        title="Reciprocal rank fusion"
        tone="focal"
        w={PANEL_INNER}
        x={X}
        y={MERGE_Y}
      />
      <Node
        lines={RESULTS_LINES}
        title="The results"
        w={PANEL_INNER}
        x={X}
        y={RESULTS_Y}
      />
    </Panel>
  );
}

function RealSearch() {
  return (
    <Panel
      description={SEARCH_TEXT}
      heading="Top ten for “buddhist art in japan”"
      height={HEIGHT}
      step={2}
      title="The ten links returned for buddhist art in japan, and what found each"
    >
      <Label kind="caption" text="Link" x={TITLE_X} y={CAPTION_Y} />
      <Label
        anchor="end"
        kind="caption"
        text="Found by"
        x={TAG_X}
        y={CAPTION_Y}
      />
      {FOUND.map((link, index) => {
        const rowY = ROWS_Y + index * ROW_PITCH;
        const textY = rowY + ROW_TEXT_DROP;

        return (
          <g key={link.title}>
            <Chip
              h={S4}
              tone={link.semanticOnly ? "focal" : undefined}
              w={PANEL_INNER}
              x={X}
              y={rowY}
            />
            <Label kind="data" text={String(index + 1)} x={RANK_X} y={textY} />
            <Label kind="aside" text={link.title} x={TITLE_X} y={textY} />
            <Label
              anchor="end"
              kind="caption"
              text={link.semanticOnly ? "Semantic only" : "Keyword"}
              x={TAG_X}
              y={textY}
            />
          </g>
        );
      })}
    </Panel>
  );
}

export default function ZigRanking() {
  return (
    <Pair>
      <Merging />
      <RealSearch />
    </Pair>
  );
}
