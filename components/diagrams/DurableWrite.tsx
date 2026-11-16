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
  Wire,
  Zone,
} from "./parts.tsx";

const DESCRIPTION =
  "A request arrives with ten links or a 1,000-item import. Under the write lock, each change goes first to the write-ahead log, which adds it to the end with a checksum and a sequence number, and dmozdb then applies it to the B+Trees. The request lets go of the lock and waits once. That request and others waiting with it feed one shared sync: a background thread syncs every 2 ms, or sooner at 256 waiting entries. The reply leaves only once the request's last entry reaches the disk, and the server answers ok.";

const ZONE_PAD = 24;
const NODE_W = 320;
const SYNC_W = 340;
const CHIP_W = 300;

const REQUEST_X = 40;
const ZONE_X = REQUEST_X + NODE_W + S5;
const LOG_X = ZONE_X + ZONE_PAD;
const TREES_X = LOG_X + NODE_W + S5;
const ZONE_RIGHT = TREES_X + NODE_W + ZONE_PAD;
const CHIP_X = ZONE_RIGHT + S5 + S3;
const CHIP_MIDDLE_X = CHIP_X + CHIP_W / 2;
const BUS_X = CHIP_X - S2;
const SYNC_X = BUS_X - S5 - SYNC_W;
const REPLY_X = SYNC_X - S5 - NODE_W;
const REQUEST_MIDDLE_X = REQUEST_X + NODE_W / 2;

const ZONE_Y = 40;
const ROW_ONE = 205;
const FIRST_CHIP = 380;
const CHIPS = [
  { text: "This request", top: FIRST_CHIP },
  { text: "Another request", top: FIRST_CHIP + S5 + S2 },
  { text: "Another request", top: FIRST_CHIP + 2 * (S5 + S2) },
];
const CHIP_MIDDLES = CHIPS.map((chip) => chip.top + S5 / 2);
const ROW_TWO = CHIP_MIDDLES[1];

const REQUEST_LINES = ["Ten links, or a", "1,000-item import."];
const LOG_LINES = [
  "Adds each change to the",
  "end, with a checksum and",
  "a sequence number.",
];
const TREES_LINES = ["dmozdb then applies the", "change to the trees."];
const SYNC_LINES = [
  "A background thread syncs",
  "every 2 ms, or sooner at",
  "256 waiting entries.",
];
const REPLY_LINES = ["Leaves once its last", "entry reaches the disk."];

const LOG_HEIGHT = sheetNodeHeight(LOG_LINES);
const ZONE_H = ROW_ONE + LOG_HEIGHT / 2 + S4 - ZONE_Y;

const BUS = [
  ...CHIP_MIDDLES.map((y) => `M${CHIP_X} ${y} L${BUS_X} ${y}`),
  `M${BUS_X} ${CHIP_MIDDLES[0]} L${BUS_X} ${CHIP_MIDDLES[2]}`,
].join(" ");

function centredOn(middle: number, lines: readonly string[]): number {
  return middle - sheetNodeHeight(lines) / 2;
}

function across(y: number, fromX: number, toX: number): string {
  const end = fromX < toX ? toX - 2 : toX + 2;

  return `M${fromX} ${y} L${end} ${y}`;
}

export default function DurableWrite() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="How dmozdb confirms a write once it is on disk"
      viewBox="0 0 1600 610"
    >
      <Zone
        h={ZONE_H}
        label="Under the write lock"
        w={ZONE_RIGHT - ZONE_X}
        x={ZONE_X}
        y={ZONE_Y}
      />

      <Wire d={across(ROW_ONE, REQUEST_X + NODE_W, LOG_X)} />
      <Wire d={across(ROW_ONE, LOG_X + NODE_W, TREES_X)} />
      <Wire
        d={`M${
          TREES_X + NODE_W
        } ${ROW_ONE} L${CHIP_MIDDLE_X} ${ROW_ONE} L${CHIP_MIDDLE_X} ${
          FIRST_CHIP - 2
        }`}
      />
      <Line d={BUS} />
      <Wire d={across(ROW_TWO, BUS_X, SYNC_X + SYNC_W)} />
      <Wire d={across(ROW_TWO, SYNC_X, REPLY_X + NODE_W)} />
      <Wire
        d={`M${REPLY_X} ${ROW_TWO} L${REQUEST_MIDDLE_X} ${ROW_TWO} L${REQUEST_MIDDLE_X} ${
          centredOn(ROW_ONE, REQUEST_LINES) + sheetNodeHeight(REQUEST_LINES) + 2
        }`}
      />

      <Node
        lines={REQUEST_LINES}
        title="Request"
        w={NODE_W}
        x={REQUEST_X}
        y={centredOn(ROW_ONE, REQUEST_LINES)}
      />
      <Node
        lines={LOG_LINES}
        title="Write-ahead log"
        w={NODE_W}
        x={LOG_X}
        y={centredOn(ROW_ONE, LOG_LINES)}
      />
      <Node
        lines={TREES_LINES}
        title="B+Trees"
        w={NODE_W}
        x={TREES_X}
        y={centredOn(ROW_ONE, TREES_LINES)}
      />
      {CHIPS.map((chip, index) => (
        <Chip
          h={S5}
          key={index}
          strong
          text={chip.text}
          w={CHIP_W}
          x={CHIP_X}
          y={chip.top}
        />
      ))}
      <Node
        lines={SYNC_LINES}
        title="Shared sync"
        tone="focal"
        w={SYNC_W}
        x={SYNC_X}
        y={centredOn(ROW_TWO, SYNC_LINES)}
      />
      <Node
        lines={REPLY_LINES}
        title="Reply"
        w={NODE_W}
        x={REPLY_X}
        y={centredOn(ROW_TWO, REPLY_LINES)}
      />

      <Label
        text="Lets go of the lock"
        x={ZONE_RIGHT + S2}
        y={ROW_ONE - S2}
      />
      <Label
        text="Waits once"
        x={CHIP_MIDDLE_X + S2}
        y={(ROW_ONE + FIRST_CHIP) / 2 + S1}
      />
      <Label
        kind="data"
        text="ok"
        x={REQUEST_MIDDLE_X + S2}
        y={(ROW_ONE + ROW_TWO) / 2 + S4}
      />
    </Canvas>
  );
}
