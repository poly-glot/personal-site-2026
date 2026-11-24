import {
  Canvas,
  Chip,
  Line,
  Node,
  S3,
  S4,
  S5,
  sheetNodeHeight,
  type Tone,
  Wire,
  Zone,
} from "./parts.tsx";

const DESCRIPTION =
  "How one search becomes a ranked list, in three branches that run side by side. The search query goes two ways. It goes straight to keyword search, and it is turned into a 384-dimension embedding in the Deno server for semantic search and category search. Keyword search, on the left, splits the search query into words, matches a link on any of them, adds up an IDF score for each word, and keeps the top 200. Semantic search, in the middle, opens the 32 of 256 clusters nearest the search query, scores each link from its compressed 384-dimension vector, 96 bytes long, keeps the best 200, reads their full 384-byte vectors from the B+Tree on disk, and scores those 200 again exactly, drawn as the subject. Category search, on the right, finds the 3 categories whose embeddings are nearest the search query, expands their subtrees to every link filed under them, scores those links from their compressed 384-dimension vectors, and keeps the top 200. The three lists of up to 200 join in reciprocal rank fusion, which gives each link 1 divided by 60 plus its place in each list and adds the scores, and that order is the final ranked results.";

const SHEET_W = 1600;
const ZONE_W = 460;
const ZONE_GAP = S5;
const ZONE_PAD = 24;
const NODE_W = ZONE_W - 2 * ZONE_PAD;
const COLUMNS_LEFT = (SHEET_W - 3 * ZONE_W - 2 * ZONE_GAP) / 2;
const ARROW_GAP = 2;
const HEADING_TO_NODE = S5;
const NODE_H = sheetNodeHeight(["x"]);
const MIDDLE = SHEET_W / 2;

interface Step {
  line: string;
  title: string;
  tone?: Tone;
}

interface Branch {
  heading: string;
  steps: readonly Step[];
}

const BRANCHES: readonly Branch[] = [
  {
    heading: "Keyword search",
    steps: [
      { line: "The words of the search query.", title: "Extract keywords" },
      { line: "A link matches on any keyword.", title: "OR query" },
      { line: "Rarer words count for more.", title: "Sum IDF scores" },
      { line: "The keyword list.", title: "Keep 200" },
    ],
  },
  {
    heading: "Semantic search",
    steps: [
      {
        line: "The 32 of 256 nearest the search query.",
        title: "Open 32 clusters",
      },
      {
        line: "ADC on each compressed vector.",
        title: "Approximate score",
      },
      { line: "The 200 best approximate scores.", title: "Keep 200" },
      {
        line: "384 bytes each, from the B+Tree on disk.",
        title: "Read full vectors",
      },
      {
        line: "Rescore the 200. The semantic list.",
        title: "Exact score",
        tone: "focal",
      },
    ],
  },
  {
    heading: "Category search",
    steps: [
      {
        line: "Nearest the search query by path embedding.",
        title: "Find 3 categories",
      },
      { line: "Every link filed under those 3.", title: "Expand subtrees" },
      {
        line: "ADC on each compressed vector.",
        title: "Approximate score",
      },
      { line: "The category list.", title: "Keep 200" },
    ],
  },
];

const QUERY_H = S5;
const QUERY_W = 330;
const QUERY_Y = S4;
const QUERY_BOTTOM = QUERY_Y + QUERY_H;
const FIRST_BUS_Y = QUERY_BOTTOM + S4;
const EMBED_Y = FIRST_BUS_Y + S4;
const EMBED_BOTTOM = EMBED_Y + NODE_H;
const SECOND_BUS_Y = EMBED_BOTTOM + S4;
const ZONE_Y = SECOND_BUS_Y + S4;
const STEP_GAP = S4;
const MAX_STEPS = Math.max(...BRANCHES.map((branch) => branch.steps.length));
const TALLEST_ZONE = HEADING_TO_NODE + MAX_STEPS * NODE_H +
  (MAX_STEPS - 1) * STEP_GAP + ZONE_PAD;
const THIRD_BUS_Y = ZONE_Y + TALLEST_ZONE + S4;
const FUSION_LINES = [
  "Each list gives a link 1 ÷ (60 + its place),",
  "and the scores are added.",
];
const FUSION_Y = THIRD_BUS_Y + S4;
const FUSION_BOTTOM = FUSION_Y + sheetNodeHeight(FUSION_LINES);
const RESULT_Y = FUSION_BOTTOM + S4;
const HEIGHT = RESULT_Y + S5 + S3;

function zoneX(index: number): number {
  return COLUMNS_LEFT + index * (ZONE_W + ZONE_GAP);
}

function zoneMiddle(index: number): number {
  return zoneX(index) + ZONE_W / 2;
}

function zoneHeight(branch: Branch): number {
  return HEADING_TO_NODE + branch.steps.length * NODE_H +
    (branch.steps.length - 1) * STEP_GAP + ZONE_PAD;
}

function stepY(step: number): number {
  return ZONE_Y + HEADING_TO_NODE + step * (NODE_H + STEP_GAP);
}

function drop(x: number, from: number, to: number): string {
  return `M${x} ${from} L${x} ${to - ARROW_GAP}`;
}

function Branches() {
  return (
    <g>
      {BRANCHES.map((branch, index) => (
        <g key={branch.heading}>
          <Zone
            h={zoneHeight(branch)}
            label={branch.heading}
            w={ZONE_W}
            x={zoneX(index)}
            y={ZONE_Y}
          />
          {branch.steps.map((step, position) => (
            <g key={step.title + position}>
              <Node
                lines={[step.line]}
                title={step.title}
                tone={step.tone}
                w={NODE_W}
                x={zoneX(index) + ZONE_PAD}
                y={stepY(position)}
              />
              {position > 0 && (
                <Wire
                  d={drop(
                    zoneMiddle(index),
                    stepY(position - 1) + NODE_H,
                    stepY(position),
                  )}
                />
              )}
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}

function Wiring() {
  const keyword = zoneMiddle(0);
  const category = zoneMiddle(2);

  return (
    <g>
      <Line d={`M${MIDDLE} ${QUERY_BOTTOM} L${MIDDLE} ${FIRST_BUS_Y}`} />
      <Line d={`M${keyword} ${FIRST_BUS_Y} L${MIDDLE} ${FIRST_BUS_Y}`} />
      <Wire d={drop(keyword, FIRST_BUS_Y, ZONE_Y)} />
      <Wire d={drop(MIDDLE, FIRST_BUS_Y, EMBED_Y)} />

      <Line d={`M${MIDDLE} ${EMBED_BOTTOM} L${MIDDLE} ${SECOND_BUS_Y}`} />
      <Line d={`M${MIDDLE} ${SECOND_BUS_Y} L${category} ${SECOND_BUS_Y}`} />
      <Wire d={drop(MIDDLE, SECOND_BUS_Y, ZONE_Y)} />
      <Wire d={drop(category, SECOND_BUS_Y, ZONE_Y)} />

      {BRANCHES.map((branch, index) => (
        <Line
          d={`M${zoneMiddle(index)} ${ZONE_Y + zoneHeight(branch)} L${
            zoneMiddle(index)
          } ${THIRD_BUS_Y}`}
          key={branch.heading}
        />
      ))}
      <Line d={`M${keyword} ${THIRD_BUS_Y} L${category} ${THIRD_BUS_Y}`} />
      <Wire d={drop(MIDDLE, THIRD_BUS_Y, FUSION_Y)} />
      <Wire d={drop(MIDDLE, FUSION_BOTTOM, RESULT_Y)} />
    </g>
  );
}

export default function ZigRerank() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="How one search runs keyword, semantic and category search side by side and merges them"
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Wiring />
      <Chip
        h={QUERY_H}
        strong
        text="Search query"
        w={QUERY_W}
        x={MIDDLE - QUERY_W / 2}
        y={QUERY_Y}
      />
      <Node
        lines={["In the Deno server: 384 dimensions, in about 8 ms."]}
        title="Embed the search query"
        w={ZONE_W}
        x={MIDDLE - ZONE_W / 2}
        y={EMBED_Y}
      />
      <Branches />
      <Node
        lines={FUSION_LINES}
        title="Reciprocal rank fusion"
        w={NODE_W}
        x={MIDDLE - NODE_W / 2}
        y={FUSION_Y}
      />
      <Chip
        h={S5}
        strong
        text="Final ranked results"
        w={QUERY_W}
        x={MIDDLE - QUERY_W / 2}
        y={RESULT_Y}
      />
    </Canvas>
  );
}
