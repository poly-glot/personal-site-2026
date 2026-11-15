import type { ComponentChildren } from "preact";
import {
  Chip,
  Label,
  Line,
  Node,
  nodeHeight,
  Pair,
  Panel,
  PANEL_W,
  S1,
  S2,
  S3,
  S4,
  S5,
  type Tone,
  Wire,
} from "./parts.tsx";

const BEFORE_TEXT =
  "When I was always on: an outage, a question and a decision all go to one person, me. Nothing is handled until I answer.";

const AFTER_TEXT =
  "When the team has guardrails: the same outage, question and decision meet a guardrail first, a check, a default, a runbook or a decision record. The familiar ones are handled there. Only the new or hard ones reach me, and I set the target the guardrails aim at.";

const PROBLEMS = ["Outage", "Question", "Decision"];
const ME_LINES = ["Everything waits", "for my answer."];
const GUARD_LINES = [
  "Checks, defaults,",
  "runbooks and",
  "decision records",
  "used without me.",
];

const CHIP_X = S3;
const CHIP_W = 112;
const CHIP_H = S5;
const BUS_X = CHIP_X + CHIP_W + S2;
const NODE_X = BUS_X + S4;
const NODE_W = 164;
const DONE_X = NODE_X + NODE_W + S4;
const DONE_W = PANEL_W - S3 - DONE_X;

const FIRST_TOP = 68;
const STEP = CHIP_H + S2;
const TOPS = PROBLEMS.map((_, index) => FIRST_TOP + index * STEP);
const MIDDLES = TOPS.map((top) => top + CHIP_H / 2);
const MIDDLE = MIDDLES[1];

const GUARD_TOP = MIDDLE - nodeHeight(GUARD_LINES) / 2;
const GUARD_BOTTOM = GUARD_TOP + nodeHeight(GUARD_LINES);
const ME_TOP = GUARD_BOTTOM + S4;
const HEIGHT = ME_TOP + S4 + S3;
const CHIP_RIGHT = CHIP_X + CHIP_W;
const NODE_CENTRE = NODE_X + NODE_W / 2;
const ESCALATE_X = NODE_CENTRE - S3;
const TARGET_X = NODE_CENTRE + S3;
const LINK_LABEL_Y = (GUARD_BOTTOM + ME_TOP) / 2 + 5;

const BUS = [
  ...MIDDLES.map((y) => `M${CHIP_RIGHT} ${y} L${BUS_X} ${y}`),
  `M${BUS_X} ${MIDDLES[0]} L${BUS_X} ${MIDDLES[2]}`,
].join(" ");

const IN = `M${BUS_X} ${MIDDLE} L${NODE_X - 2} ${MIDDLE}`;
const OUT = `M${NODE_X + NODE_W} ${MIDDLE} L${DONE_X - 2} ${MIDDLE}`;

function Flow(
  { children, description, heading, node, title }: {
    children?: ComponentChildren;
    description: string;
    heading: string;
    node: { lines: readonly string[]; title: string; tone: Tone };
    title: string;
  },
) {
  return (
    <Panel
      description={description}
      heading={heading}
      height={HEIGHT}
      title={title}
    >
      <Line d={BUS} />
      <Wire d={IN} />
      <Wire d={OUT} />

      {PROBLEMS.map((problem, index) => (
        <Chip
          h={CHIP_H}
          key={problem}
          strong
          text={problem}
          w={CHIP_W}
          x={CHIP_X}
          y={TOPS[index]}
        />
      ))}

      <Node
        lines={node.lines}
        title={node.title}
        tone={node.tone}
        w={NODE_W}
        x={NODE_X}
        y={MIDDLE - nodeHeight(node.lines) / 2}
      />
      <Chip
        h={CHIP_H}
        strong
        text="Handled"
        w={DONE_W}
        x={DONE_X}
        y={TOPS[1]}
      />

      {children}
    </Panel>
  );
}

export default function HeroThermostat() {
  return (
    <Pair>
      <Flow
        description={BEFORE_TEXT}
        heading="When I was always on"
        node={{ lines: ME_LINES, title: "Me", tone: "focal" }}
        title="Before: every problem goes through one person"
      />
      <Flow
        description={AFTER_TEXT}
        heading="When the team has guardrails"
        node={{ lines: GUARD_LINES, title: "Guardrails", tone: "focal" }}
        title="After: guardrails handle the familiar problems and the new or hard ones reach me"
      >
        <Wire
          d={`M${ESCALATE_X} ${GUARD_BOTTOM} L${ESCALATE_X} ${ME_TOP - 2}`}
        />
        <Wire
          d={`M${TARGET_X} ${ME_TOP} L${TARGET_X} ${GUARD_BOTTOM + 2}`}
        />
        <Chip h={S4} strong text="Me" w={NODE_W} x={NODE_X} y={ME_TOP} />
        <Label
          anchor="end"
          text="new or hard"
          x={ESCALATE_X - S1}
          y={LINK_LABEL_Y}
        />
        <Label text="sets the target" x={TARGET_X + S1} y={LINK_LABEL_Y} />
      </Flow>
    </Pair>
  );
}
