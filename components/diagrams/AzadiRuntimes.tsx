import {
  Canvas,
  Guide,
  Label,
  Node,
  S2,
  S3,
  S4,
  S5,
  type Tone,
} from "./parts.tsx";

interface Runtime {
  name: string;
  note: string;
  tone?: Tone;
  values: readonly string[];
}

const ROWS = [
  "Image a server downloads",
  "Ready after an instance starts",
  "Memory in use",
  "Memory paid for",
  "Push to live",
  "Instances allowed",
];

const RUNTIMES: readonly Runtime[] = [
  {
    name: "Spring Boot",
    note: "GraalVM native image",
    values: [
      "118 MiB",
      "2.9 s",
      "75 MiB",
      "1 GiB",
      "15–17 min",
      "up to 10",
    ],
  },
  {
    name: "Helidon",
    note: "Trimmed Java runtime",
    values: [
      "93 MiB",
      "3.2 s",
      "104 MiB",
      "512 MiB",
      "5.5–7 min",
      "1",
    ],
  },
  {
    name: "Go",
    note: "Standard library",
    tone: "focal",
    values: [
      "16 MiB",
      "0.65 s",
      "8 MiB",
      "512 MiB",
      "about 8 min",
      "up to 10",
    ],
  },
];

const SHEET_W = 1600;
const LABEL_X = 40;
const COLUMN_X = 480;
const COLUMN_W = 340;
const COLUMN_GAP = S3 - 1;
const COLUMN_TOP = S4;
const HEADER_H = 100;
const ROW_H = S5 + S2;
const COLUMN_H = HEADER_H + ROWS.length * ROW_H + S3;
const VALUE_PAD = 22;
const NOTE_BASELINE = 72;
const BASELINE_DROP = 6;
const SOURCE_Y = COLUMN_TOP + COLUMN_H + S4;
const HEIGHT = SOURCE_Y + S4;

const DESCRIPTION =
  "The same portal on three runtimes, compared in six rows. Spring Boot, as a GraalVM native image: an image a server downloads of 118 MiB, ready 2.9 seconds after an instance starts, 75 MiB of memory in use against 1 GiB paid for, 15 to 17 minutes to push to live, up to 10 instances. Helidon, on a trimmed Java runtime: 93 MiB, 3.2 seconds, 104 MiB in use against 512 MiB paid for, 5.5 to 7 minutes, 1 instance. Go, on its standard library, drawn as the subject: 16 MiB, 0.65 seconds, 8 MiB in use against 512 MiB paid for, about 8 minutes, up to 10 instances. Measured live on Cloud Run in London on 23 November 2026; memory is the median of 30 days.";

function columnX(index: number): number {
  return COLUMN_X + index * (COLUMN_W + COLUMN_GAP);
}

function rowMiddle(row: number): number {
  return COLUMN_TOP + HEADER_H + row * ROW_H + ROW_H / 2;
}

const GUIDE_SPANS = [
  [LABEL_X, COLUMN_X - COLUMN_GAP],
  ...RUNTIMES.map((_, index) => [columnX(index), columnX(index) + COLUMN_W]),
];

function RowGuides() {
  return (
    <g>
      {ROWS.slice(1).flatMap((name, index) => {
        const y = COLUMN_TOP + HEADER_H + (index + 1) * ROW_H;

        return GUIDE_SPANS.map(([from, to]) => (
          <Guide d={`M${from} ${y} L${to} ${y}`} key={`${name}-${from}`} />
        ));
      })}
    </g>
  );
}

function Column({ index, runtime }: { index: number; runtime: Runtime }) {
  const x = columnX(index);

  return (
    <g>
      <Node
        h={COLUMN_H}
        lines={[]}
        title={runtime.name}
        tone={runtime.tone}
        w={COLUMN_W}
        x={x}
        y={COLUMN_TOP}
      />
      <Label
        kind="note"
        text={runtime.note}
        x={x + VALUE_PAD}
        y={COLUMN_TOP + NOTE_BASELINE}
      />
      {runtime.values.map((value, row) => (
        <Label
          kind="data"
          key={ROWS[row]}
          text={value}
          x={x + VALUE_PAD}
          y={rowMiddle(row) + BASELINE_DROP}
        />
      ))}
    </g>
  );
}

export default function AzadiRuntimes() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="The same portal on Spring Boot, Helidon and Go, measured on Cloud Run"
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      {ROWS.map((name, row) => (
        <Label
          kind="aside"
          key={name}
          text={name}
          x={LABEL_X}
          y={rowMiddle(row) + BASELINE_DROP}
        />
      ))}

      {RUNTIMES.map((runtime, index) => (
        <Column index={index} key={runtime.name} runtime={runtime} />
      ))}

      <RowGuides />

      <Label
        kind="note"
        text="Live on Cloud Run in London, 23 November 2026; memory is the median of 30 days."
        x={LABEL_X}
        y={SOURCE_Y}
      />
    </Canvas>
  );
}
