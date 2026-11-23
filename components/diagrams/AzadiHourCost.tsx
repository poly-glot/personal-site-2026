import { Chip, Label, Pair, Panel, S2, S3, S4, S5, Sketch } from "./parts.tsx";

interface Memory {
  name: string;
  paid: number;
  used: number;
}

interface Hour {
  cpu: string;
  memory: string;
  memoryCost: number;
  name: string;
  total: string;
}

const MEMORY: readonly Memory[] = [
  { name: "Spring Boot", paid: 1024, used: 75 },
  { name: "Helidon", paid: 512, used: 104 },
  { name: "Go", paid: 512, used: 8 },
];

const CPU_COST = 0.091;
const HOURS: readonly Hour[] = [
  {
    cpu: "CPU £0.091",
    memory: "Memory £0.0095",
    memoryCost: 0.0095,
    name: "Spring Boot",
    total: "£0.100",
  },
  {
    cpu: "CPU £0.091",
    memory: "Memory £0.0047",
    memoryCost: 0.0047,
    name: "Helidon",
    total: "£0.096",
  },
  {
    cpu: "CPU £0.091",
    memory: "Memory £0.0047",
    memoryCost: 0.0047,
    name: "Go",
    total: "£0.096",
  },
];

const HEIGHT = 429;
const NAME_X = S3;
const BAR_X = 130;
const BAR_H = S4;
const FIRST_BAR = S5 + S4;
const ROW_PITCH = S5 + S4;
const CAPTION_Y = S5 + S2;
const BAR_NAME_DROP = 22;
const VALUE_DROP = BAR_H + S3;
const ASIDE_Y = FIRST_BAR + 2 * ROW_PITCH + VALUE_DROP + S4;

const MIB_PER_GIB = 1024;
const MEMORY_SPAN = 369;
const MIB_WIDTH = MEMORY_SPAN / MIB_PER_GIB;
const POUND_WIDTH = 3000;
const TOTAL_GAP = S2;

const MEMORY_TEXT =
  "Memory paid for against memory in use, per runtime. Spring Boot is set to 1,024 MiB and uses 75. Helidon is set to 512 MiB and uses 104. Go is set to 512 MiB and uses 8, drawn as a thin blue sliver inside its bar. Cloud Run bills the memory set, not the memory used.";

const HOUR_TEXT =
  "What one busy hour costs on Cloud Run, per runtime, as the CPU cost plus the memory cost. Spring Boot is £0.091 of CPU and £0.0095 of memory, £0.100 in total. Helidon is £0.091 and £0.0047, £0.096 in total. Go is £0.091 and £0.0047, £0.096 in total. CPU is over 90% of every bar, so memory moves the bill very little. Cloud Run list price in London: £0.000025 a CPU-second, £0.0000026 a gigabyte-second.";

function barY(row: number): number {
  return FIRST_BAR + row * ROW_PITCH;
}

function RowName({ name, row }: { name: string; row: number }) {
  return (
    <Label
      kind="aside"
      text={name}
      x={NAME_X}
      y={barY(row) + BAR_NAME_DROP}
    />
  );
}

function thousands(value: number): string {
  return value.toLocaleString("en-GB");
}

function MemoryRows() {
  return (
    <g>
      {MEMORY.map((runtime, row) => {
        const used = runtime.used * MIB_WIDTH;
        const isSliver = runtime.name === "Go";

        return (
          <g key={runtime.name}>
            <RowName name={runtime.name} row={row} />
            <Chip
              h={BAR_H}
              w={runtime.paid * MIB_WIDTH}
              x={BAR_X}
              y={barY(row)}
            />
            {isSliver
              ? (
                <Chip
                  h={BAR_H}
                  tone="focal"
                  w={used}
                  x={BAR_X}
                  y={barY(row)}
                />
              )
              : <Sketch h={BAR_H} w={used} x={BAR_X} y={barY(row)} />}
            <Label
              kind="data"
              text={`${runtime.used} of ${thousands(runtime.paid)} MiB`}
              x={BAR_X}
              y={barY(row) + VALUE_DROP}
            />
          </g>
        );
      })}
    </g>
  );
}

function HourRows() {
  return (
    <g>
      {HOURS.map((hour, row) => {
        const cpuW = CPU_COST * POUND_WIDTH;
        const memoryW = hour.memoryCost * POUND_WIDTH;
        const end = BAR_X + cpuW + memoryW;

        return (
          <g key={hour.name}>
            <RowName name={hour.name} row={row} />
            <Chip
              h={BAR_H}
              text={hour.cpu}
              tone="focal"
              w={cpuW}
              x={BAR_X}
              y={barY(row)}
            />
            <Chip
              h={BAR_H}
              w={memoryW}
              x={BAR_X + cpuW}
              y={barY(row)}
            />
            <Label
              kind="data"
              text={hour.total}
              x={end + TOTAL_GAP}
              y={barY(row) + BAR_NAME_DROP}
            />
            <Label
              anchor="end"
              kind="data"
              text={hour.memory}
              x={end}
              y={barY(row) + VALUE_DROP}
            />
          </g>
        );
      })}
    </g>
  );
}

export default function AzadiHourCost() {
  return (
    <Pair>
      <Panel
        description={MEMORY_TEXT}
        heading="Memory in use against memory paid for"
        height={HEIGHT}
        title="Memory in use against memory paid for, per runtime"
      >
        <Label
          kind="caption"
          text="Outline: memory paid for. Fill: memory in use."
          x={NAME_X}
          y={CAPTION_Y}
        />
        <MemoryRows />
        <Label
          kind="aside"
          text="Cloud Run bills the memory set, not the memory used."
          x={NAME_X}
          y={ASIDE_Y}
        />
      </Panel>

      <Panel
        description={HOUR_TEXT}
        heading="What one busy hour costs"
        height={HEIGHT}
        title="What one busy hour costs on each runtime"
      >
        <Label
          kind="caption"
          text="Each bar is CPU plus memory. The total is at the end."
          x={NAME_X}
          y={CAPTION_Y}
        />
        <HourRows />
        <Label
          kind="aside"
          text="CPU is over 90% of every bar."
          x={NAME_X}
          y={ASIDE_Y}
        />
        <Label
          kind="caption"
          text="Cloud Run list price in London: £0.000025 a CPU-second,"
          x={NAME_X}
          y={ASIDE_Y + S4}
        />
        <Label
          kind="caption"
          text="£0.0000026 a gigabyte-second."
          x={NAME_X}
          y={ASIDE_Y + S4 + S3}
        />
      </Panel>
    </Pair>
  );
}
