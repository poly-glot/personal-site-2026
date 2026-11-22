import type { ChangeStep } from "@/src/types.ts";
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
} from "./parts.tsx";

const SHEET_W = 1600;
const WHO_W = 300;
const STEP_W = 420;
const GAP = S5 + S4;
const LEFT = (SHEET_W - WHO_W - 2 * STEP_W - 2 * GAP) / 2;
const FIRST_ROW = S5 + S2;

const COLUMNS = [
  { caption: "Who", w: WHO_W, x: LEFT },
  { caption: "Through", w: STEP_W, x: LEFT + WHO_W + GAP },
  {
    caption: "What they can change",
    w: STEP_W,
    x: LEFT + WHO_W + STEP_W + 2 * GAP,
  },
];

function longestNote(
  routes: readonly (readonly ChangeStep[])[],
): readonly string[] {
  const notes = routes.flat().map((step) => step.lines);

  return notes.reduce((most, lines) =>
    lines.length > most.length ? lines : most
  );
}

function across(from: number, y: number): string {
  const start = COLUMNS[from].x + COLUMNS[from].w;

  return `M${start} ${y} L${COLUMNS[from + 1].x - 2} ${y}`;
}

export default function RouteSheet(
  { description, routes, title }: {
    description: string;
    routes: readonly (readonly ChangeStep[])[];
    title: string;
  },
) {
  const rowH = sheetNodeHeight(longestNote(routes));
  const rowTop = (row: number) => FIRST_ROW + row * (rowH + S3);
  const height = rowTop(routes.length);

  return (
    <Canvas
      description={description}
      title={title}
      viewBox={`0 0 ${SHEET_W} ${height}`}
    >
      {COLUMNS.map((column) => (
        <Label
          key={column.caption}
          kind="caption"
          text={column.caption}
          x={column.x}
          y={FIRST_ROW - S2}
        />
      ))}

      {routes.map((route, row) => (
        <g key={route[0].title}>
          <Wire d={across(0, rowTop(row) + rowH / 2)} />
          <Wire d={across(1, rowTop(row) + rowH / 2)} />
          {route.map((step, index) => (
            <Node
              key={step.title}
              lines={step.lines}
              title={step.title}
              tone={step.tone}
              w={COLUMNS[index].w}
              x={COLUMNS[index].x}
              y={rowTop(row)}
            />
          ))}
        </g>
      ))}
    </Canvas>
  );
}
