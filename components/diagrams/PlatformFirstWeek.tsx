import {
  Chip,
  Dot,
  Guide,
  Label,
  Line,
  Pair,
  Panel,
  PANEL_W,
  S1,
  S2,
  S3,
  S4,
} from "./parts.tsx";

interface App {
  firstWeek: number;
  lines: number;
  name: string;
  wordpress?: true;
}

interface Callout {
  index: number;
  text: string;
}

interface Measure {
  callouts: readonly Callout[];
  heading: string;
  max: number;
  note?: string;
  ticks: readonly number[];
  title: string;
  values: readonly number[];
}

const APPS: readonly App[] = [
  { firstWeek: 12, lines: 119, name: "hooklab" },
  { firstWeek: 4, lines: 88, name: "azadi" },
  { firstWeek: 5, lines: 146, name: "openguessr" },
  { firstWeek: 0, lines: 71, name: "azadi-go" },
  { firstWeek: 1, lines: 65, name: "amazing-landing" },
  { firstWeek: 0, lines: 45, name: "amazingcar-2003" },
  { firstWeek: 0, lines: 45, name: "pakistan-2003" },
  { firstWeek: 0, lines: 45, name: "thehighlands" },
  { firstWeek: 0, lines: 45, name: "crea8ivedesign" },
  { firstWeek: 3, lines: 215, name: "shehryar" },
  { firstWeek: 2, lines: 184, name: "mocktail" },
  { firstWeek: 1, lines: 84, name: "personal-site-2026" },
  { firstWeek: 5, lines: 197, name: "wordpress-sample" },
  { firstWeek: 0, lines: 213, name: "careerpost" },
  { firstWeek: 1, lines: 240, name: "photobank" },
  { firstWeek: 1, lines: 44, name: "parley", wordpress: true },
  { firstWeek: 0, lines: 48, name: "outrun" },
  { firstWeek: 0, lines: 43, name: "legal", wordpress: true },
  { firstWeek: 1, lines: 342, name: "cms" },
  { firstWeek: 2, lines: 153, name: "azadi-helidon" },
  { firstWeek: 0, lines: 44, name: "wealth", wordpress: true },
  { firstWeek: 0, lines: 44, name: "halveron", wordpress: true },
  { firstWeek: 0, lines: 227, name: "flyvipcms" },
  { firstWeek: 0, lines: 39, name: "boxes", wordpress: true },
  { firstWeek: 0, lines: 39, name: "academy", wordpress: true },
  { firstWeek: 2, lines: 158, name: "c2pa-demo" },
  { firstWeek: 1, lines: 245, name: "flyvipcms-net" },
  { firstWeek: 2, lines: 132, name: "airport-drupal" },
  { firstWeek: 2, lines: 305, name: "ticketlist" },
];

const FIRST_WEEK: Measure = {
  callouts: [
    { index: 0, text: "HookLab: 12" },
    { index: 12, text: "First WordPress site: 5" },
  ],
  heading: "Changes in each app's first week",
  max: 12,
  note: "A thin mark means none",
  ticks: [0, 4, 8, 12],
  title: "Changes to each app's setup file in its first week",
  values: APPS.map((app) => app.firstWeek),
};

const LINES: Measure = {
  callouts: [{ index: 18, text: "Largest: 342" }],
  heading: "Lines in each app's setup file",
  max: 350,
  ticks: [0, 100, 200, 300],
  title: "Lines in each app's setup file",
  values: APPS.map((app) => app.lines),
};

const PLOT_X = S3 + S4;
const PLOT_W = PANEL_W - S3 - PLOT_X;
const PLOT_TOP = 68;
const PLOT_H = 160;
const BASELINE = PLOT_TOP + PLOT_H;
const SLOT = PLOT_W / APPS.length;
const BAR_W = 11;
const MIN_MARK = 4;
const SWATCH = 13;
const CAPTION_Y = BASELINE + S3 + 5;
const LEGEND_Y = CAPTION_Y + S4;
const HEIGHT = LEGEND_Y + SWATCH + S3;

function barX(index: number): number {
  return PLOT_X + index * SLOT + (SLOT - BAR_W) / 2;
}

function barHeight(value: number, max: number): number {
  return Math.max((value / max) * PLOT_H, MIN_MARK);
}

function tickY(value: number, max: number): number {
  return BASELINE - (value / max) * PLOT_H;
}

function describe(measure: Measure): string {
  const listed = APPS.map((app, index) => {
    const kind = app.wordpress ? " (WordPress module)" : "";

    return `${app.name}${kind} ${measure.values[index]}`;
  }).join(", ");

  return `${measure.heading}, in the order the apps were added: ${listed}.`;
}

function Bars({ measure }: { measure: Measure }) {
  const { callouts, max, note, ticks, values } = measure;

  return (
    <Panel
      description={describe(measure)}
      heading={measure.heading}
      height={HEIGHT}
      title={measure.title}
    >
      {ticks.filter((tick) => tick > 0 && tick < max).map((tick) => (
        <Guide
          d={`M${PLOT_X} ${tickY(tick, max)} H${PLOT_X + PLOT_W}`}
          key={tick}
        />
      ))}

      {ticks.map((tick) => (
        <Label
          anchor="end"
          key={tick}
          kind="data"
          text={String(tick)}
          x={PLOT_X - S2}
          y={tickY(tick, max) + 4.5}
        />
      ))}

      {APPS.map((app, index) => {
        const height = barHeight(values[index], max);

        return (
          <g key={app.name}>
            <Chip
              h={height}
              tone={app.wordpress ? "focal" : undefined}
              w={BAR_W}
              x={barX(index)}
              y={BASELINE - height}
            />
            {app.wordpress && (
              <Dot
                r={2.5}
                x={barX(index) + BAR_W / 2}
                y={BASELINE - height - S1}
              />
            )}
          </g>
        );
      })}

      <Line d={`M${PLOT_X} ${BASELINE} H${PLOT_X + PLOT_W}`} />

      {callouts.map(({ index, text }) => (
        <Label
          key={text}
          text={text}
          x={barX(index) + BAR_W + S1}
          y={BASELINE - barHeight(values[index], max) + 5}
        />
      ))}

      <Label kind="caption" text="March 2026" x={PLOT_X} y={CAPTION_Y} />
      <Label
        anchor="middle"
        kind="caption"
        text="Apps in the order they were added"
        x={PLOT_X + PLOT_W / 2}
        y={CAPTION_Y}
      />
      <Label
        anchor="end"
        kind="caption"
        text="October 2026"
        x={PLOT_X + PLOT_W}
        y={CAPTION_Y}
      />

      <Chip h={SWATCH} tone="focal" w={SWATCH} x={PLOT_X} y={LEGEND_Y} />
      <Dot
        r={2.5}
        x={PLOT_X + SWATCH + S1 + 2.5}
        y={LEGEND_Y + SWATCH / 2}
      />
      <Label
        text="Built on the WordPress module"
        x={PLOT_X + SWATCH + S1 + 5 + S1}
        y={LEGEND_Y + 11}
      />
      {note && (
        <Label
          anchor="end"
          kind="caption"
          text={note}
          x={PLOT_X + PLOT_W}
          y={LEGEND_Y + 11}
        />
      )}
    </Panel>
  );
}

export default function PlatformFirstWeek() {
  return (
    <Pair>
      <Bars measure={FIRST_WEEK} />
      <Bars measure={LINES} />
    </Pair>
  );
}
