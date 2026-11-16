import {
  Canvas,
  Label,
  Node,
  S2,
  S3,
  S4,
  S5,
  sheetNodeHeight,
  Wire,
  Zone,
} from "./parts.tsx";

const DESCRIPTION =
  "The path of one text. The send policy runs seven checks, in order: country, opt-out, trial, balance, daily cap, sender and verified. The debit is one transaction that takes the money if the balance still covers it and adds the ledger row if it is new. The send then waits on a queue, which can deliver a job twice. In the send worker, the subject of the picture, the worker first claims the row: one transaction writes the message row as queued and a marker for that send and number, if no marker exists yet. It then checks the opt-out list and the daily cap again, and claims the attempt by stamping the row as attempted if it is still queued and unattempted. Only then does it call the gateway, the only code that hands a text to AWS, and the gateway passes it to the fake carrier, which sends nothing; the live site runs this mode. When the queue delivers the same job again, the marker already exists, so the job is a repeat and stops, drawn as a dashed outline.";

const SHEET_W = 1600;
const CLAIM_W = 290;
const CHECK_W = 220;
const ATTEMPT_W = 280;
const GATEWAY_W = 240;
const CARRIER_W = 230;
const SPAN = CLAIM_W + CHECK_W + ATTEMPT_W + GATEWAY_W + CARRIER_W + 6 * S4;
const LEFT = (SHEET_W - SPAN) / 2 + S4;

const POLICY_LINES = [
  "Seven checks, in order:",
  "country, opt-out, trial,",
  "balance, daily cap,",
  "sender, verified.",
];
const DEBIT_LINES = [
  "One transaction takes the",
  "money if the balance still",
  "covers it, and adds the",
  "ledger row if it is new.",
];
const QUEUE_LINES = ["Can deliver a", "job twice."];
const CLAIM_LINES = [
  "One transaction writes",
  "the message row as queued",
  "and a marker for that",
  "send and number, if no",
  "marker exists yet.",
];
const CHECK_LINES = ["The opt-out list", "and the daily cap."];
const ATTEMPT_LINES = [
  "Stamps the row as",
  "attempted if it is still",
  "queued and unattempted.",
];
const GATEWAY_LINES = ["The only code that", "hands a text to AWS."];
const CARRIER_LINES = ["Sends nothing. The", "live site runs this", "mode."];
const REPEAT_LINES = [
  "The marker exists, so",
  "the job is a repeat",
  "and stops.",
];

const POLICY = { w: 280, x: LEFT };
const DEBIT = { w: 300, x: POLICY.x + POLICY.w + S4 };
const QUEUE = { w: 200, x: DEBIT.x + DEBIT.w + S4 };

const CLAIM = { w: CLAIM_W, x: LEFT };
const CHECK = { w: CHECK_W, x: CLAIM.x + CLAIM.w + S4 };
const ATTEMPT = { w: ATTEMPT_W, x: CHECK.x + CHECK.w + S4 };
const ZONE_LEFT = CLAIM.x - S4;
const ZONE_RIGHT = ATTEMPT.x + ATTEMPT.w + S4;
const GATEWAY = { w: GATEWAY_W, x: ZONE_RIGHT + S4 };
const CARRIER = { w: CARRIER_W, x: GATEWAY.x + GATEWAY.w + S4 };

const TOP_ROW = S5;
const TOP_BOTTOM = TOP_ROW + sheetNodeHeight(POLICY_LINES);
const TOP_MIDDLE = TOP_ROW + sheetNodeHeight(POLICY_LINES) / 2;

const ZONE_TOP = TOP_BOTTOM + S5;
const WORKER_ROW = ZONE_TOP + S5 + S4;
const CLAIM_BOTTOM = WORKER_ROW + sheetNodeHeight(CLAIM_LINES);
const WORKER_MIDDLE = WORKER_ROW + sheetNodeHeight(CLAIM_LINES) / 2;

const REPEAT_ROW = CLAIM_BOTTOM + S5;
const ZONE_BOTTOM = REPEAT_ROW + sheetNodeHeight(REPEAT_LINES) + S4;
const HEIGHT = ZONE_BOTTOM + S4;

const CLAIM_CENTRE = CLAIM.x + CLAIM.w / 2;
const QUEUE_CENTRE = QUEUE.x + QUEUE.w / 2;
const HANDOFF_Y = TOP_BOTTOM + S3;

function rightOf(column: { w: number; x: number }): number {
  return column.x + column.w;
}

function centredOn(middle: number, lines: readonly string[]): number {
  return middle - sheetNodeHeight(lines) / 2;
}

function across(from: { w: number; x: number }, to: { x: number }, y: number) {
  return `M${rightOf(from)} ${y} L${to.x - 2} ${y}`;
}

const HANDOFF = `M${QUEUE_CENTRE} ${
  centredOn(TOP_MIDDLE, QUEUE_LINES) + sheetNodeHeight(QUEUE_LINES)
} L${QUEUE_CENTRE} ${HANDOFF_Y} L${CLAIM_CENTRE} ${HANDOFF_Y} L${CLAIM_CENTRE} ${
  WORKER_ROW - 2
}`;

const REPEAT_WIRE = `M${CLAIM_CENTRE} ${CLAIM_BOTTOM} L${CLAIM_CENTRE} ${
  REPEAT_ROW - 2
}`;

export default function SendGate() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="How txtlocal sends each text once"
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Zone
        h={ZONE_BOTTOM - ZONE_TOP}
        label="Send worker"
        w={ZONE_RIGHT - ZONE_LEFT}
        x={ZONE_LEFT}
        y={ZONE_TOP}
      />

      <Wire d={across(POLICY, DEBIT, TOP_MIDDLE)} />
      <Wire d={across(DEBIT, QUEUE, TOP_MIDDLE)} />
      <Wire d={HANDOFF} />
      <Wire d={across(CLAIM, CHECK, WORKER_MIDDLE)} />
      <Wire d={across(CHECK, ATTEMPT, WORKER_MIDDLE)} />
      <Wire d={across(ATTEMPT, GATEWAY, WORKER_MIDDLE)} />
      <Wire d={across(GATEWAY, CARRIER, WORKER_MIDDLE)} />
      <Wire d={REPEAT_WIRE} />

      <Node
        lines={POLICY_LINES}
        title="Send policy"
        w={POLICY.w}
        x={POLICY.x}
        y={TOP_ROW}
      />
      <Node
        lines={DEBIT_LINES}
        title="The debit"
        w={DEBIT.w}
        x={DEBIT.x}
        y={TOP_ROW}
      />
      <Node
        lines={QUEUE_LINES}
        title="Queue"
        w={QUEUE.w}
        x={QUEUE.x}
        y={centredOn(TOP_MIDDLE, QUEUE_LINES)}
      />

      <Node
        lines={CLAIM_LINES}
        title="Claim the row"
        tone="focal"
        w={CLAIM.w}
        x={CLAIM.x}
        y={WORKER_ROW}
      />
      <Node
        lines={CHECK_LINES}
        title="Check again"
        w={CHECK.w}
        x={CHECK.x}
        y={centredOn(WORKER_MIDDLE, CHECK_LINES)}
      />
      <Node
        lines={ATTEMPT_LINES}
        title="Claim the attempt"
        w={ATTEMPT.w}
        x={ATTEMPT.x}
        y={centredOn(WORKER_MIDDLE, ATTEMPT_LINES)}
      />
      <Node
        lines={GATEWAY_LINES}
        title="Gateway"
        w={GATEWAY.w}
        x={GATEWAY.x}
        y={centredOn(WORKER_MIDDLE, GATEWAY_LINES)}
      />
      <Node
        lines={CARRIER_LINES}
        title="Fake carrier"
        w={CARRIER.w}
        x={CARRIER.x}
        y={centredOn(WORKER_MIDDLE, CARRIER_LINES)}
      />

      <Node
        lines={REPEAT_LINES}
        title="Repeat job"
        tone="ghost"
        w={CLAIM.w}
        x={CLAIM.x}
        y={REPEAT_ROW}
      />
      <Label
        text="Same job again"
        x={CLAIM_CENTRE + S2}
        y={CLAIM_BOTTOM + S4}
      />
    </Canvas>
  );
}
