import { type ComponentChildren, createContext } from "preact";
import { useContext, useId } from "preact/hooks";
import styles from "./diagram.module.css";

export const S1 = 8;
export const S2 = 13;
export const S3 = 21;
export const S4 = 34;
export const S5 = 55;
export const PANEL_W = 520;

export type Tone = "focal" | "ghost";
export type Anchor = "start" | "middle" | "end";
export type LabelKind =
  | "aside"
  | "caption"
  | "data"
  | "heading"
  | "label"
  | "name"
  | "note";

interface Metrics {
  bare: number;
  boundaryGap: readonly [number, number];
  firstNote: number;
  head: number;
  leading: number;
  nameBaseline: number;
  pad: number;
  zonePad: number;
}

interface Scale extends Metrics {
  arrow: string;
  dot: string;
}

const PANEL: Metrics = {
  bare: S5,
  boundaryGap: [18, 9],
  firstNote: S5,
  head: 9,
  leading: S3,
  nameBaseline: S4,
  pad: S3,
  zonePad: S3,
};

const SHEET: Metrics = {
  bare: 78,
  boundaryGap: [22, 12],
  firstNote: 72,
  head: 12,
  leading: 24,
  nameBaseline: 46,
  pad: 22,
  zonePad: 24,
};

const ScaleContext = createContext<Scale>({ ...SHEET, arrow: "", dot: "" });

const TONES: Record<Tone, string> = {
  focal: styles.focal,
  ghost: styles.ghost,
};

const KINDS: Record<LabelKind, string> = {
  aside: styles.aside,
  caption: styles.caption,
  data: styles.data,
  heading: styles.heading,
  label: styles.label,
  name: styles.name,
  note: styles.note,
};

function frame(tone?: Tone): string {
  return tone ? `${styles.node} ${TONES[tone]}` : styles.node;
}

function numeral(step: number): string {
  return String(step).padStart(2, "0");
}

export function nodeHeight(lines: readonly string[]): number {
  return PANEL.bare + lines.length * PANEL.leading;
}

export function sheetNodeHeight(lines: readonly string[]): number {
  return SHEET.bare + lines.length * SHEET.leading;
}

function Figure(
  { children, description, metrics, svgClass, title, viewBox }: {
    children: ComponentChildren;
    description: string;
    metrics: Metrics;
    svgClass: string;
    title: string;
    viewBox: string;
  },
) {
  const id = useId();
  const arrow = `${id}-arrow`;
  const dot = `${id}-dot`;
  const { head } = metrics;

  return (
    <figure class={styles.figure}>
      <svg
        aria-labelledby={`${id}-title ${id}-desc`}
        class={svgClass}
        role="img"
        viewBox={viewBox}
      >
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-desc`}>{description}</desc>
        <defs>
          <marker
            id={arrow}
            markerHeight={head}
            markerUnits="userSpaceOnUse"
            markerWidth={head}
            orient="auto"
            refX={head - 2}
            refY={head / 2}
          >
            <path
              class={styles.head}
              d={`M0,0 L${head},${head / 2} L0,${head} z`}
            />
          </marker>
          <marker
            id={dot}
            markerHeight={head}
            markerUnits="userSpaceOnUse"
            markerWidth={head}
            refX={head / 2}
            refY={head / 2}
          >
            <circle
              class={styles.head}
              cx={head / 2}
              cy={head / 2}
              r={head / 3}
            />
          </marker>
        </defs>
        <ScaleContext.Provider value={{ ...metrics, arrow, dot }}>
          {children}
        </ScaleContext.Provider>
      </svg>
    </figure>
  );
}

const QUIET_SHEET: Metrics = { ...SHEET, head: 9 };

export function Canvas(
  { children, description, quiet, title, viewBox }: {
    children: ComponentChildren;
    description: string;
    quiet?: boolean;
    title: string;
    viewBox: string;
  },
) {
  return (
    <Figure
      description={description}
      metrics={quiet ? QUIET_SHEET : SHEET}
      svgClass={quiet ? `${styles.svg} ${styles.quiet}` : styles.svg}
      title={title}
      viewBox={viewBox}
    >
      {children}
    </Figure>
  );
}

export function Panel(
  { children, description, heading, height, step, title }: {
    children: ComponentChildren;
    description: string;
    heading?: string;
    height: number;
    step?: number;
    title: string;
  },
) {
  return (
    <Figure
      description={description}
      metrics={PANEL}
      svgClass={`${styles.svg} ${styles.panel}`}
      title={title}
      viewBox={`0 0 ${PANEL_W} ${height}`}
    >
      <Zone
        h={height - 1}
        label={heading}
        step={step}
        w={PANEL_W - 1}
        x={0.5}
        y={0.5}
      />
      {children}
    </Figure>
  );
}

export function Pair({ children }: { children: ComponentChildren }) {
  return (
    <div class={styles.pairFrame}>
      <div class={styles.pair}>{children}</div>
    </div>
  );
}

export function Zone(
  { h, label, step, w, x, y }: {
    h: number;
    label?: string;
    step?: number;
    w: number;
    x: number;
    y: number;
  },
) {
  const { zonePad } = useContext(ScaleContext);

  return (
    <g>
      <rect class={styles.zone} height={h} width={w} x={x} y={y} />
      {label && (
        <text class={styles.heading} x={x + zonePad} y={y + S4}>
          {step !== undefined && (
            <tspan class={styles.numeral}>{numeral(step)}</tspan>
          )}
          <tspan dx={step === undefined ? 0 : S1}>{label}</tspan>
        </text>
      )}
    </g>
  );
}

export function Node(
  { h, lines, title, tone, w, x, y }: {
    h?: number;
    lines: readonly string[];
    title: string;
    tone?: Tone;
    w: number;
    x: number;
    y: number;
  },
) {
  const scale = useContext(ScaleContext);
  const height = h ?? scale.bare + lines.length * scale.leading;
  const left = x + scale.pad;

  return (
    <g>
      <rect class={frame(tone)} height={height} width={w} x={x} y={y} />
      <text class={styles.name} x={left} y={y + scale.nameBaseline}>
        {title}
      </text>
      {lines.map((line, index) => (
        <text
          class={styles.note}
          key={line}
          x={left}
          y={y + scale.firstNote + index * scale.leading}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export function Chip(
  { h = S4, strong, text, tone, w, x, y }: {
    h?: number;
    strong?: boolean;
    text?: string;
    tone?: Tone;
    w: number;
    x: number;
    y: number;
  },
) {
  const voice = strong ? styles.name : styles.data;

  return (
    <g>
      <rect class={frame(tone)} height={h} width={w} x={x} y={y} />
      {text && (
        <text
          class={`${voice} ${styles.centred}`}
          x={x + w / 2}
          y={y + h / 2}
        >
          {text}
        </text>
      )}
    </g>
  );
}

export function Label(
  { anchor = "start", kind = "label", text, x, y }: {
    anchor?: Anchor;
    kind?: LabelKind;
    text: string;
    x: number;
    y: number;
  },
) {
  return (
    <text class={KINDS[kind]} text-anchor={anchor} x={x} y={y}>{text}</text>
  );
}

export function Wire({ d, from }: { d: string; from?: "dot" }) {
  const { arrow, dot } = useContext(ScaleContext);

  return (
    <path
      class={styles.wire}
      d={d}
      marker-end={`url(#${arrow})`}
      marker-start={from && `url(#${dot})`}
    />
  );
}

export function Line({ d, from }: { d: string; from?: "dot" }) {
  const { dot } = useContext(ScaleContext);

  return (
    <path class={styles.wire} d={d} marker-start={from && `url(#${dot})`} />
  );
}

export function Sketch(
  { h, w, x, y }: { h: number; w: number; x: number; y: number },
) {
  return <rect class={styles.sketch} height={h} width={w} x={x} y={y} />;
}

export function Measure({ d }: { d: string }) {
  return <path class={styles.measure} d={d} />;
}

export function Guide({ d }: { d: string }) {
  return <path class={styles.guide} d={d} />;
}

export function Dot({ r = 5, x, y }: { r?: number; x: number; y: number }) {
  return <circle class={styles.head} cx={x} cy={y} r={r} />;
}

export function Boundary(
  { bottom, label, labelY, top, x }: {
    bottom: number;
    label: string;
    labelY: number;
    top: number;
    x: number;
  },
) {
  const { boundaryGap } = useContext(ScaleContext);
  const [above, below] = boundaryGap;
  const upperEnd = Math.min(bottom, labelY - above);
  const lowerStart = labelY + below;

  return (
    <g>
      <line class={styles.boundary} x1={x} x2={x} y1={top} y2={upperEnd} />
      {bottom > lowerStart && (
        <line
          class={styles.boundary}
          x1={x}
          x2={x}
          y1={lowerStart}
          y2={bottom}
        />
      )}
      <Label anchor="middle" text={label} x={x} y={labelY} />
    </g>
  );
}

export function Sticker(
  { lines, r = S4 + S2, x, y }: {
    lines: readonly string[];
    r?: number;
    x: number;
    y: number;
  },
) {
  const { leading } = useContext(ScaleContext);
  const firstLine = y - ((lines.length - 1) * leading) / 2;

  return (
    <g transform={`rotate(-12 ${x} ${y})`}>
      <circle class={styles.sticker} cx={x} cy={y} r={r} />
      {lines.map((line, index) => (
        <text
          class={`${styles.stickerText} ${styles.centred}`}
          key={line}
          x={x}
          y={firstLine + index * leading}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export function Spotlight(
  { h, w, x, y }: { h: number; w: number; x: number; y: number },
) {
  return <rect class={styles.spotlight} height={h} width={w} x={x} y={y} />;
}
