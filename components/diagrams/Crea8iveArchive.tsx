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
  Zone,
} from "./parts.tsx";

interface Stop {
  lines: readonly string[];
  title: string;
  tone?: Tone;
  year: string;
}

const STOPS: readonly Stop[] = [
  {
    lines: ["PHP, running on a", "web server."],
    title: "A web server",
    year: "2007",
  },
  {
    lines: ["The same code, unchanged,", "in a container."],
    title: "Kubernetes",
    year: "2023",
  },
  {
    lines: ["The deploy runs PHP once per", "page and saves the HTML."],
    title: "Saved pages",
    tone: "focal",
    year: "2026",
  },
  {
    lines: ["Serves the saved files.", "No PHP runs for visitors."],
    title: "Firebase Hosting",
    year: "Today",
  },
];

const FOCAL = 2;
const SHEET_W = 1600;
const NODE_W = 325;
const NODE_GAP = S5;
const ROW_W = STOPS.length * NODE_W + (STOPS.length - 1) * NODE_GAP;
const ROW_X = (SHEET_W - ROW_W) / 2;
const NODE_PAD = 22;
const ZONE_X = 20;
const ZONE_TOP = S3;
const YEAR_Y = ZONE_TOP + S5 + S2;
const NODE_Y = YEAR_Y + S2;
const NODE_H = sheetNodeHeight(STOPS[0].lines);
const NOTE_Y = NODE_Y + NODE_H + S4;
const NOTE_LEADING = 24;
const ZONE_BOTTOM = NOTE_Y + NOTE_LEADING + S3;
const HEIGHT = ZONE_BOTTOM + S3;
const ARROW_GAP = 2;

const DESCRIPTION =
  "How the site was kept online, in four steps along a timeline. In 2007, PHP running on a web server. In 2023, the same code, unchanged, in a container on Kubernetes. In 2026, the deploy runs PHP once for each page and saves the HTML, drawn as the subject. Then Firebase Hosting serves the saved files, and no PHP runs for visitors. The source is unchanged, apart from one setting that hides PHP's errors.";

function nodeX(index: number): number {
  return ROW_X + index * (NODE_W + NODE_GAP);
}

export default function Crea8iveArchive() {
  const middle = NODE_Y + NODE_H / 2;

  return (
    <Canvas
      description={DESCRIPTION}
      title="How the Crea8ive site was kept online, 2007 to today"
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Zone
        h={ZONE_BOTTOM - ZONE_TOP}
        label="Kept online, step by step"
        w={SHEET_W - 2 * ZONE_X}
        x={ZONE_X}
        y={ZONE_TOP}
      />

      {STOPS.slice(1).map((stop, index) => (
        <Wire
          d={`M${nodeX(index) + NODE_W} ${middle} L${
            nodeX(index + 1) - ARROW_GAP
          } ${middle}`}
          key={stop.title}
        />
      ))}

      {STOPS.map((stop, index) => (
        <g key={stop.title}>
          <Label
            kind="data"
            text={stop.year}
            x={nodeX(index) + NODE_PAD}
            y={YEAR_Y}
          />
          <Node
            h={NODE_H}
            lines={stop.lines}
            title={stop.title}
            tone={stop.tone}
            w={NODE_W}
            x={nodeX(index)}
            y={NODE_Y}
          />
        </g>
      ))}

      <Label
        kind="aside"
        text="The source is unchanged, apart from one setting"
        x={nodeX(FOCAL) + NODE_PAD}
        y={NOTE_Y}
      />
      <Label
        kind="aside"
        text="that hides PHP's errors."
        x={nodeX(FOCAL) + NODE_PAD}
        y={NOTE_Y + NOTE_LEADING}
      />
    </Canvas>
  );
}
