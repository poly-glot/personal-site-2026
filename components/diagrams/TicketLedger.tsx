import { Canvas, Node, S4, S5, sheetNodeHeight, Wire, Zone } from "./parts.tsx";

const DESCRIPTION =
  "Each paid order: a card payment succeeds and Stripe sends a webhook. A function on AWS Lambda checks the signature and that the card is a debit card. It reads the ticket counter, the tickets sold so far, say 70, so an order for 5 takes 71 to 75. One transaction, the subject of the picture, raises the count if it still reads 70, adds the ledger row if it is new and marks the order paid if it is still pending, and all three writes succeed or fail together. The order then holds tickets 71 to 75. A repeat message: Stripe can send the same message twice, and if the order is already paid the function stops and spends no numbers. Losing a race: if another order moved the count first, the function waits a random time of up to 25 ms times the attempt number, reads the count again and retries. After 10 attempts it answers with an error, and Stripe sends the message again later.";

const STRIPE = { w: 244, x: 76 };
const WEBHOOK = { w: 264, x: STRIPE.x + STRIPE.w + S4 };
const COUNTER = { w: 264, x: WEBHOOK.x + WEBHOOK.w + S4 };
const COMMIT = { w: 320, x: COUNTER.x + COUNTER.w + S4 };
const LEDGER = { w: 220, x: COMMIT.x + COMMIT.w + S4 };

const ZONE_LEFT = STRIPE.x - S4;
const ZONE_RIGHT = LEDGER.x + LEDGER.w + S4;
const ZONE_TOP = S4;
const ZONE_GAP = 21;

const STRIPE_LINES = [
  "A card payment",
  "succeeds, and Stripe",
  "sends a webhook.",
];
const WEBHOOK_LINES = [
  "On AWS Lambda, it",
  "checks the signature",
  "and that the card is",
  "a debit card.",
];
const COUNTER_LINES = [
  "Tickets sold so far,",
  "say 70, so an order",
  "for 5 takes 71 to 75.",
];
const COMMIT_LINES = [
  "Raise the count if it",
  "still reads 70, add the",
  "ledger row if it is new,",
  "mark the order paid if",
  "still pending. All succeed",
  "or fail together.",
];
const LEDGER_LINES = ["This order holds", "tickets 71 to 75."];
const REPEAT_LINES = [
  "Stripe can send the",
  "same message twice.",
  "The function stops",
  "and spends no numbers.",
];
const RETRY_LINES = [
  "Another order moved the",
  "count first. Wait a random",
  "time of up to 25 ms times",
  "the attempt number, then",
  "read the count again.",
];
const ERROR_LINES = [
  "After 10 attempts.",
  "Stripe sends the",
  "message again",
  "later.",
];

const ROW_OFFSET = S5 + S4;
const MIDDLE_OFFSET = sheetNodeHeight(STRIPE_LINES) / 2;

const TOP_ROW = ZONE_TOP + ROW_OFFSET;
const TOP_MIDDLE = TOP_ROW + MIDDLE_OFFSET;
const TOP_ZONE_H = sheetNodeHeight(COMMIT_LINES) + ROW_OFFSET + S4;

const LOWER_ZONE_TOP = ZONE_TOP + TOP_ZONE_H + ZONE_GAP;
const LOWER_ROW = LOWER_ZONE_TOP + ROW_OFFSET;
const LOWER_MIDDLE = LOWER_ROW + MIDDLE_OFFSET;
const LOWER_ZONE_H = sheetNodeHeight(RETRY_LINES) + ROW_OFFSET + S4;

const HEIGHT = LOWER_ZONE_TOP + LOWER_ZONE_H + S4;

function rightOf(column: { w: number; x: number }): number {
  return column.x + column.w;
}

function across(from: { w: number; x: number }, to: { x: number }, y: number) {
  return `M${rightOf(from)} ${y} L${to.x - 2} ${y}`;
}

function down(column: { w: number; x: number }, lines: readonly string[]) {
  const x = rightOf(column) - S5;
  const start = TOP_ROW + sheetNodeHeight(lines);

  return `M${x} ${start} L${x} ${LOWER_ROW - 2}`;
}

const COUNTER_CENTRE = COUNTER.x + COUNTER.w / 2;
const LOOP_BACK =
  `M${COMMIT.x} ${LOWER_MIDDLE} L${COUNTER_CENTRE} ${LOWER_MIDDLE} L${COUNTER_CENTRE} ${
    TOP_ROW + sheetNodeHeight(COUNTER_LINES) + 2
  }`;

export default function TicketLedger() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="How Charity Raffle hands out each ticket number once"
      viewBox={`0 0 1600 ${HEIGHT}`}
    >
      <Zone
        h={TOP_ZONE_H}
        label="Each paid order"
        w={ZONE_RIGHT - ZONE_LEFT}
        x={ZONE_LEFT}
        y={ZONE_TOP}
      />
      <Zone
        h={LOWER_ZONE_H}
        label="A repeat message"
        w={WEBHOOK.w + 2 * S4}
        x={WEBHOOK.x - S4}
        y={LOWER_ZONE_TOP}
      />
      <Zone
        h={LOWER_ZONE_H}
        label="Losing a race"
        w={ZONE_RIGHT - COMMIT.x + S4}
        x={COMMIT.x - S4}
        y={LOWER_ZONE_TOP}
      />

      <Wire d={across(STRIPE, WEBHOOK, TOP_MIDDLE)} />
      <Wire d={across(WEBHOOK, COUNTER, TOP_MIDDLE)} />
      <Wire d={across(COUNTER, COMMIT, TOP_MIDDLE)} />
      <Wire d={across(COMMIT, LEDGER, TOP_MIDDLE)} />
      <Wire d={down(WEBHOOK, WEBHOOK_LINES)} />
      <Wire d={down(COMMIT, COMMIT_LINES)} />
      <Wire d={across(COMMIT, LEDGER, LOWER_MIDDLE)} />
      <Wire d={LOOP_BACK} />

      <Node
        lines={STRIPE_LINES}
        title="Stripe"
        w={STRIPE.w}
        x={STRIPE.x}
        y={TOP_ROW}
      />
      <Node
        lines={WEBHOOK_LINES}
        title="Webhook"
        w={WEBHOOK.w}
        x={WEBHOOK.x}
        y={TOP_ROW}
      />
      <Node
        lines={COUNTER_LINES}
        title="Ticket counter"
        w={COUNTER.w}
        x={COUNTER.x}
        y={TOP_ROW}
      />
      <Node
        lines={COMMIT_LINES}
        title="One transaction"
        tone="focal"
        w={COMMIT.w}
        x={COMMIT.x}
        y={TOP_ROW}
      />
      <Node
        lines={LEDGER_LINES}
        title="Ledger"
        w={LEDGER.w}
        x={LEDGER.x}
        y={TOP_ROW}
      />

      <Node
        lines={REPEAT_LINES}
        title="Already paid"
        tone="ghost"
        w={WEBHOOK.w}
        x={WEBHOOK.x}
        y={LOWER_ROW}
      />
      <Node
        lines={RETRY_LINES}
        title="Retry"
        w={COMMIT.w}
        x={COMMIT.x}
        y={LOWER_ROW}
      />
      <Node
        lines={ERROR_LINES}
        title="Error"
        tone="ghost"
        w={LEDGER.w}
        x={LEDGER.x}
        y={LOWER_ROW}
      />
    </Canvas>
  );
}
