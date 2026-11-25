import {
  Canvas,
  Chip,
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

const DESCRIPTION =
  "How the search turns the search query art in japan about buddhism into chips, in four steps. Step one pulls out typed operators such as site:, in:, country:, religion:, name: and role:; none were typed here. Step two, drawn as the subject, reads left to right and takes the longest run of words that matches a domain, a country, a religion word, a category name or a person or organisation: japan becomes the chip Tied to Japan and buddhism becomes About Buddhism. Step three drops cue words such as in and about, and turns what is left over into a word filter, here Mentioning art, or into a role. Step four asks the database for the links that match every chip and word, and a site, name or category chip also fetches its neighbours. The result is 8 links on 8 sites.";

const STEP_COUNT = 4;

const OPERATOR_LINES = ["Takes out anything you typed", "with an operator:"];
const MATCH_LINES = [
  "Reads left to right and takes",
  "the longest run of words that",
  "matches a domain, a country, a",
  "religion word, a category name",
  "or a person or organisation.",
];
const LEFTOVER_LINES = [
  "Words such as in and about are",
  "dropped. The rest becomes a",
  "word filter, or a role such as",
  "politicians.",
];
const SEARCH_LINES = [
  "Asks the database for the links",
  "that match every chip and word.",
  "A site, name or category chip",
  "also fetches its neighbours.",
];

const SHEET_W = 1600;
const STEP_W = 335;
const STEP_X = (SHEET_W - STEP_COUNT * STEP_W - (STEP_COUNT - 1) * S5) / 2;
const STEP_PITCH = STEP_W + S5;
const STEP_MIDDLE = STEP_W / 2;
const STEP_H = sheetNodeHeight(MATCH_LINES);
const ARROW_GAP = 2;
const DATA_INSET = 22;
const OPERATOR_ROW = 126;

const SENTENCE_Y = 56;
const SENTENCE_W = 480;
const SENTENCE_H = S5;
const STEP_Y = SENTENCE_Y + SENTENCE_H + S5;
const STEP_ROW_MIDDLE = STEP_Y + STEP_H / 2;
const STEP_BOTTOM = STEP_Y + STEP_H;
const BUS_Y = STEP_BOTTOM + S3;
const CHIP_Y = STEP_BOTTOM + S5;
const CHIP_H = S5;
const CHIP_W = 161;
const RESULT_W = 230;
const FOOTER_Y = CHIP_Y + CHIP_H + S4;
const HEIGHT = FOOTER_Y + S3;

function stepX(index: number): number {
  return STEP_X + index * STEP_PITCH;
}

function middleX(index: number): number {
  return stepX(index) + STEP_MIDDLE;
}

function drop(x: number, from: number, to: number): string {
  return `M${x} ${from} L${x} ${to - ARROW_GAP}`;
}

function Step(
  { index, lines, title, tone }: {
    index: number;
    lines: readonly string[];
    title: string;
    tone?: Tone;
  },
) {
  return (
    <g>
      <Label
        kind="caption"
        text={`Step ${index + 1}`}
        x={stepX(index)}
        y={STEP_Y - S2}
      />
      <Node
        h={STEP_H}
        lines={lines}
        title={title}
        tone={tone}
        w={STEP_W}
        x={stepX(index)}
        y={STEP_Y}
      />
    </g>
  );
}

export default function ZigSentence() {
  const matchLeft = middleX(1) - STEP_MIDDLE + CHIP_W / 2;
  const matchRight = middleX(1) + STEP_MIDDLE - CHIP_W / 2;

  return (
    <Canvas
      description={DESCRIPTION}
      title="How the search query art in japan about buddhism becomes chips"
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Label
        kind="caption"
        text="You type"
        x={stepX(0)}
        y={SENTENCE_Y - S2}
      />
      <Chip
        h={SENTENCE_H}
        strong
        text="art in japan about buddhism"
        w={SENTENCE_W}
        x={stepX(0)}
        y={SENTENCE_Y}
      />

      <Wire d={drop(middleX(0), SENTENCE_Y + SENTENCE_H, STEP_Y)} />
      {[0, 1, 2].map((index) => (
        <Wire
          d={`M${stepX(index) + STEP_W} ${STEP_ROW_MIDDLE} L${
            stepX(index + 1) - ARROW_GAP
          } ${STEP_ROW_MIDDLE}`}
          key={index}
        />
      ))}

      <Step
        index={0}
        lines={OPERATOR_LINES}
        title="Typed operators"
      />
      <Label
        kind="data"
        text="site:  in:  country:"
        x={stepX(0) + DATA_INSET}
        y={STEP_Y + OPERATOR_ROW}
      />
      <Label
        kind="data"
        text="religion:  name:  role:"
        x={stepX(0) + DATA_INSET}
        y={STEP_Y + OPERATOR_ROW + S3 + S1}
      />
      <Step
        index={1}
        lines={MATCH_LINES}
        title="Longest match"
        tone="focal"
      />
      <Step
        index={2}
        lines={LEFTOVER_LINES}
        title="What is left"
      />
      <Step
        index={3}
        lines={SEARCH_LINES}
        title="The search"
      />

      <Wire d={drop(middleX(0), STEP_BOTTOM, CHIP_Y)} />
      <Line
        d={`M${middleX(1)} ${STEP_BOTTOM} L${
          middleX(1)
        } ${BUS_Y} M${matchLeft} ${BUS_Y} L${matchRight} ${BUS_Y}`}
      />
      <Wire d={drop(matchLeft, BUS_Y, CHIP_Y)} />
      <Wire d={drop(matchRight, BUS_Y, CHIP_Y)} />
      <Wire d={drop(middleX(2), STEP_BOTTOM, CHIP_Y)} />
      <Wire d={drop(middleX(3), STEP_BOTTOM, CHIP_Y)} />

      <Chip
        h={CHIP_H}
        plain
        text="Nothing typed"
        tone="ghost"
        w={CHIP_W}
        x={middleX(0) - CHIP_W / 2}
        y={CHIP_Y}
      />
      <Chip
        h={CHIP_H}
        plain
        text="Tied to Japan"
        w={CHIP_W}
        x={matchLeft - CHIP_W / 2}
        y={CHIP_Y}
      />
      <Chip
        h={CHIP_H}
        plain
        text="About Buddhism"
        w={CHIP_W}
        x={matchRight - CHIP_W / 2}
        y={CHIP_Y}
      />
      <Chip
        h={CHIP_H}
        plain
        text="Mentioning art"
        w={CHIP_W}
        x={middleX(2) - CHIP_W / 2}
        y={CHIP_Y}
      />
      <Chip
        h={CHIP_H}
        text="8 links on 8 sites"
        w={RESULT_W}
        x={middleX(3) - RESULT_W / 2}
        y={CHIP_Y}
      />

      <Label
        kind="caption"
        text="Under each step: what it makes of this sentence."
        x={stepX(0)}
        y={FOOTER_Y}
      />
    </Canvas>
  );
}
