import {
  Canvas,
  Label,
  Node,
  S1,
  S2,
  S3,
  S4,
  S5,
  Wire,
  Zone,
} from "./parts.tsx";

const DESCRIPTION =
  "A member picks seats on the cabin map, or the whole aircraft. The service locks the member's account row, so a second booking for the same member waits its turn. It reads the balance, which is the latest row's total. If the booking would take the balance below zero, the service refuses with Not enough points for this operation and writes nothing. Otherwise it adds a negative row to the ledger, and the row stores the balance it leaves.";

const SHEET_W = 1600;
const ZONE_X = S3;
const ZONE_Y = S4;
const ZONE_W = SHEET_W - 2 * ZONE_X;

const NODE_W = 316;
const NODE_H = 150;
const GAP = S5 + S3;
const COLUMNS = [0, 1, 2, 3].map((index) => S5 + index * (NODE_W + GAP));

const TOP = ZONE_Y + S5 + S4;
const MIDDLE = TOP + NODE_H / 2;
const TOP_BOTTOM = TOP + NODE_H;
const BELOW = TOP_BOTTOM + GAP;
const DROP_X = COLUMNS[2] + NODE_W / 2;

const ZONE_H = BELOW + NODE_H + S4 - ZONE_Y;
const SHEET_H = ZONE_Y + ZONE_H + S4;

function across(from: number): string {
  const start = COLUMNS[from] + NODE_W;
  const end = COLUMNS[from + 1] - 2;

  return `M${start} ${MIDDLE} L${end} ${MIDDLE}`;
}

export default function SeatBooking() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="How a booking spends points"
      viewBox={`0 0 ${SHEET_W} ${SHEET_H}`}
    >
      <Zone
        h={ZONE_H}
        label="Spend points on seats"
        w={ZONE_W}
        x={ZONE_X}
        y={ZONE_Y}
      />

      <Wire d={across(0)} />
      <Wire d={across(1)} />
      <Wire d={across(2)} />
      <Wire d={`M${DROP_X} ${TOP_BOTTOM} L${DROP_X} ${BELOW - 2}`} />

      <Node
        lines={[
          "A member picks seats",
          "on the cabin map, or",
          "the whole aircraft.",
        ]}
        title="Book"
        w={NODE_W}
        x={COLUMNS[0]}
        y={TOP}
      />
      <Node
        lines={[
          "Lock the member's",
          "account row. A second",
          "booking waits its turn.",
        ]}
        title="Lock"
        w={NODE_W}
        x={COLUMNS[1]}
        y={TOP}
      />
      <Node
        lines={[
          "Read the balance.",
          "The balance is the",
          "latest row's total.",
        ]}
        title="Check"
        w={NODE_W}
        x={COLUMNS[2]}
        y={TOP}
      />
      <Node
        tone="focal"
        lines={["Add a negative row.", "It stores the balance", "it leaves."]}
        title="Write"
        w={NODE_W}
        x={COLUMNS[3]}
        y={TOP}
      />
      <Node
        tone="ghost"
        lines={[
          "Not enough points for",
          "this operation.",
          "Nothing is written.",
        ]}
        title="Refuse"
        w={NODE_W}
        x={COLUMNS[2]}
        y={BELOW}
      />

      <Label
        text="Below zero"
        x={DROP_X + S2}
        y={TOP_BOTTOM + GAP / 2 + S1}
      />
    </Canvas>
  );
}
