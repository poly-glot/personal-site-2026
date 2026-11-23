import {
  Boundary,
  Canvas,
  Chip,
  Label,
  Line,
  S2,
  S3,
  S4,
  S5,
} from "./parts.tsx";

interface Lane {
  name: string;
  readyAt: number;
  readyText: string;
  waitText?: string;
}

const LANES: readonly Lane[] = [
  { name: "Go", readyAt: 0.65, readyText: "0.65 s", waitText: "waits 4.3 s" },
  { name: "Spring Boot", readyAt: 2.9, readyText: "2.9 s" },
  { name: "Helidon", readyAt: 3.2, readyText: "3.2 s" },
];

const FIRST_CHECK = 5;
const LAST_SECOND = 5.5;
const TICKS = [0, 1, 2, 3, 4, 5, LAST_SECOND];

const SHEET_W = 1600;
const LABEL_X = 40;
const ORIGIN_X = 300;
const SECOND_W = 220;
const CAPTION_Y = S4 + S2;
const TICK_LABEL_Y = 92;
const AXIS_Y = 104;
const TICK_LENGTH = 8;
const LANE_H = S5;
const LANE_PITCH = LANE_H + S4;
const FIRST_LANE = 140;
const LANES_BOTTOM = FIRST_LANE + 2 * LANE_PITCH + LANE_H;
const BOUNDARY_LABEL_Y = LANES_BOTTOM + S5 - S2;
const LINE_Y = BOUNDARY_LABEL_Y + S4;
const HEIGHT = LINE_Y + S3 + S2;
const BASELINE_DROP = 6;

const DESCRIPTION =
  "A timeline from 0 to 5.5 seconds after Cloud Run starts an instance, with one lane for each runtime. Go is ready at 0.65 seconds, Spring Boot at 2.9 seconds and Helidon at 3.2 seconds. Each lane then shows a dashed wait up to 5.0 seconds, where a dashed blue line marks the first health check. Cloud Run sends no traffic before it passes, so the first page is served at 5.0 seconds on all three. Go waits 4.3 seconds after it is ready. One cold start each, 23 November 2026, from the service logs.";

function at(seconds: number): number {
  return ORIGIN_X + seconds * SECOND_W;
}

function tickLabel(seconds: number): string {
  return `${seconds} s`;
}

function laneY(index: number): number {
  return FIRST_LANE + index * LANE_PITCH;
}

function Axis() {
  return (
    <g>
      <Label
        kind="caption"
        text="Seconds after Cloud Run starts an instance"
        x={LABEL_X}
        y={CAPTION_Y}
      />
      <Line d={`M${at(0)} ${AXIS_Y} L${at(LAST_SECOND)} ${AXIS_Y}`} />
      {TICKS.map((seconds) => (
        <g key={seconds}>
          <Label
            anchor="middle"
            kind="data"
            text={tickLabel(seconds)}
            x={at(seconds)}
            y={TICK_LABEL_Y}
          />
          <Line
            d={`M${at(seconds)} ${AXIS_Y} L${at(seconds)} ${
              AXIS_Y + TICK_LENGTH
            }`}
          />
        </g>
      ))}
    </g>
  );
}

function LaneRow({ index, lane }: { index: number; lane: Lane }) {
  const y = laneY(index);
  const startW = lane.readyAt * SECOND_W;
  const waitW = (FIRST_CHECK - lane.readyAt) * SECOND_W;

  return (
    <g>
      <Label
        kind="aside"
        text={lane.name}
        x={LABEL_X}
        y={y + LANE_H / 2 + BASELINE_DROP}
      />
      <Chip h={LANE_H} text={lane.readyText} w={startW} x={at(0)} y={y} />
      <Chip
        h={LANE_H}
        plain
        text={lane.waitText}
        tone="ghost"
        w={waitW}
        x={at(lane.readyAt)}
        y={y}
      />
    </g>
  );
}

export default function AzadiColdStart() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="What a customer waits for after a quiet spell, on each runtime"
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Axis />

      {LANES.map((lane, index) => (
        <LaneRow index={index} key={lane.name} lane={lane} />
      ))}

      <Boundary
        bottom={BOUNDARY_LABEL_Y}
        label="First health check"
        labelY={BOUNDARY_LABEL_Y}
        top={AXIS_Y}
        x={at(FIRST_CHECK)}
      />

      <Label
        kind="note"
        text="Solid: the server starting. Dashed: waiting for the first health check."
        x={LABEL_X}
        y={BOUNDARY_LABEL_Y}
      />
      <Label
        kind="note"
        text="One cold start each, 23 November 2026, from the service logs."
        x={LABEL_X}
        y={LINE_Y}
      />
      <Label
        anchor="end"
        kind="aside"
        text="First page served at 5.0 s on all three"
        x={at(LAST_SECOND)}
        y={LINE_Y}
      />
    </Canvas>
  );
}
