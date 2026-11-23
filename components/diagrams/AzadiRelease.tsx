import {
  Canvas,
  Label,
  Node,
  S1,
  S3,
  S4,
  S5,
  sheetNodeHeight,
  type Tone,
  Wire,
  Zone,
} from "./parts.tsx";

interface Step {
  lines: readonly string[];
  title: string;
  tone?: Tone;
}

const STEPS: readonly Step[] = [
  {
    lines: ["Automatic checks for", "mistakes in the code."],
    title: "Lint and vet",
  },
  {
    lines: [
      "231 tests, run with a",
      "check for clashes",
      "over the same data.",
    ],
    title: "Tests",
  },
  {
    lines: ["The portal packaged as", "one file a server", "downloads."],
    title: "Image",
  },
  {
    lines: ["Starts on Cloud Run", "with no customers", "sent to it."],
    title: "New revision",
    tone: "focal",
  },
  {
    lines: ["Cloud Run asks the", "new revision if it is", "ready."],
    title: "Health check",
  },
  {
    lines: ["Customers are sent", "to the new revision."],
    title: "Traffic moves",
  },
];

const FOCAL = 3;
const SHEET_W = 1600;
const NODE_W = 220;
const NODE_GAP = S4;
const ROW_W = STEPS.length * NODE_W + (STEPS.length - 1) * NODE_GAP;
const ROW_X = (SHEET_W - ROW_W) / 2;
const ZONE_X = 20;
const ZONE_TOP = S3;
const NODE_Y = ZONE_TOP + S5 + S3;
const NODE_H = sheetNodeHeight(STEPS[1].lines);
const NOTE_Y = NODE_Y + NODE_H + S4;
const NOTE_LEADING = 24;
const ZONE_H = NOTE_Y + NOTE_LEADING + S3 - ZONE_TOP;
const HEIGHT = ZONE_TOP + ZONE_H + S3;
const ARROW_GAP = 2;
const NODE_PAD = 22;

const DESCRIPTION =
  "Six steps in a straight line, every time a change goes live. Lint and vet, then tests, 231 of them, run with a check for code that clashes over the same data. Then the image, the portal packaged as one file a server downloads. Then a new revision on Cloud Run with no traffic sent to it, drawn as the subject. A failed check stops here, before any customer. Then the health check on that revision, and last, traffic moves to it.";

function nodeX(index: number): number {
  return ROW_X + index * (NODE_W + NODE_GAP);
}

export default function AzadiRelease() {
  const middle = NODE_Y + NODE_H / 2;

  return (
    <Canvas
      description={DESCRIPTION}
      title="The six steps between a change and customers seeing it"
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Zone
        h={ZONE_H}
        label="Every release, in this order"
        w={SHEET_W - 2 * ZONE_X}
        x={ZONE_X}
        y={ZONE_TOP}
      />

      {STEPS.slice(1).map((step, index) => (
        <Wire
          d={`M${nodeX(index) + NODE_W} ${middle} L${
            nodeX(index + 1) - ARROW_GAP
          } ${middle}`}
          key={step.title}
        />
      ))}

      {STEPS.map((step, index) => (
        <Node
          h={NODE_H}
          key={step.title}
          lines={step.lines}
          title={step.title}
          tone={step.tone}
          w={NODE_W}
          x={nodeX(index)}
          y={NODE_Y}
        />
      ))}

      <Label
        kind="aside"
        text="A failed check stops here, before any customer"
        x={nodeX(FOCAL) + NODE_PAD}
        y={NOTE_Y + S1}
      />
    </Canvas>
  );
}
