import {
  Canvas,
  Label,
  Node,
  S2,
  S3,
  S4,
  S5,
  sheetNodeHeight,
  type Tone,
  Wire,
} from "./parts.tsx";

interface Step {
  lines: readonly string[];
  title: string;
  tone?: Tone;
}

const DESCRIPTION =
  "Three people and what each can change, drawn as three rows. A developer pushes a change to the repository. The pipeline builds an image, and holds no password or key for Google Cloud. A new image, the subject of the picture, is the only way code reaches the server, and nothing is changed in place. An editor signs in at a separate address. The edit screens have 125 fields, and none accepts free formatting. The editor changes content: words, images and lists, but not plugins, theme files or WordPress itself. A visitor opens the public address. The pages print every field escaped. The visitor changes nothing, because the theme reads nothing a visitor sends.";

const SHEET_W = 1600;
const WHO_W = 300;
const STEP_W = 420;
const GAP = S5 + S4;
const LEFT = (SHEET_W - WHO_W - 2 * STEP_W - 2 * GAP) / 2;

const COLUMNS = [
  { caption: "Who", w: WHO_W, x: LEFT },
  { caption: "Through", w: STEP_W, x: LEFT + WHO_W + GAP },
  {
    caption: "What they can change",
    w: STEP_W,
    x: LEFT + WHO_W + STEP_W + 2 * GAP,
  },
];

const ROUTES: readonly (readonly Step[])[] = [
  [
    { lines: ["Pushes a change to", "the repository."], title: "Developer" },
    {
      lines: [
        "Builds an image. It holds no password",
        "or key for Google Cloud.",
      ],
      title: "The pipeline",
    },
    {
      lines: [
        "The only way code reaches the server.",
        "Nothing is changed in place.",
      ],
      title: "A new image",
      tone: "focal",
    },
  ],
  [
    { lines: ["Signs in at a separate", "address."], title: "Editor" },
    {
      lines: ["125 fields. None accepts free", "formatting."],
      title: "Edit screens",
    },
    {
      lines: [
        "Words, images and lists. Not plugins,",
        "theme files or WordPress itself.",
      ],
      title: "Content",
    },
  ],
  [
    { lines: ["Opens the public", "address."], title: "Visitor" },
    {
      lines: ["Every field is escaped as it", "is printed."],
      title: "The pages",
    },
    {
      lines: ["The theme reads nothing", "a visitor sends."],
      title: "Nothing",
      tone: "ghost",
    },
  ],
];

const ROW_H = sheetNodeHeight(ROUTES[0][0].lines);
const FIRST_ROW = S5 + S2;
const HEIGHT = FIRST_ROW + ROUTES.length * ROW_H + (ROUTES.length - 1) * S3 +
  S3;

function rowTop(row: number): number {
  return FIRST_ROW + row * (ROW_H + S3);
}

function across(from: number, row: number): string {
  const y = rowTop(row) + ROW_H / 2;
  const start = COLUMNS[from].x + COLUMNS[from].w;

  return `M${start} ${y} L${COLUMNS[from + 1].x - 2} ${y}`;
}

export default function ChangeRoutes() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="Who can change what on the Academy site"
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
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

      {ROUTES.map((route, row) => (
        <g key={route[0].title}>
          <Wire d={across(0, row)} />
          <Wire d={across(1, row)} />
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
