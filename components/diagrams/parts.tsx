import type { ComponentChildren } from "preact";
import { useId } from "preact/hooks";
import styles from "./diagram.module.css";

const ARROW_ID = "diagram-arrow";
const LINE_HEIGHT = 24;
const TITLE_BASELINE = 46;
const FIRST_LINE = 78;
const NODE_PADDING = 22;

export function nodeHeight(lines: readonly string[]): number {
  return FIRST_LINE + lines.length * LINE_HEIGHT;
}

export function Canvas(
  { children, description, narrow, title, viewBox }: {
    children: ComponentChildren;
    description: string;
    narrow?: boolean;
    title: string;
    viewBox: string;
  },
) {
  const id = useId();
  const frame = narrow ? `${styles.svg} ${styles.narrow}` : styles.svg;

  return (
    <figure class={styles.figure}>
      <svg
        aria-labelledby={`${id}-title ${id}-desc`}
        class={frame}
        role="img"
        viewBox={viewBox}
      >
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-desc`}>{description}</desc>
        <defs>
          <marker
            id={ARROW_ID}
            markerHeight="12"
            markerUnits="userSpaceOnUse"
            markerWidth="12"
            orient="auto"
            refX="10"
            refY="6"
          >
            <path class={styles.head} d="M0,0 L12,6 L0,12 z" />
          </marker>
        </defs>
        {children}
      </svg>
    </figure>
  );
}

export function Zone(
  { h, label, w, x, y }: {
    h: number;
    label: string;
    w: number;
    x: number;
    y: number;
  },
) {
  return (
    <g>
      <rect class={styles.zone} height={h} width={w} x={x} y={y} />
      <text class={styles.zoneLabel} x={x + 24} y={y + 34}>{label}</text>
    </g>
  );
}

export function Node(
  { danger, lines, title, w, x, y }: {
    danger?: boolean;
    lines: readonly string[];
    title: string;
    w: number;
    x: number;
    y: number;
  },
) {
  const frame = danger ? `${styles.node} ${styles.danger}` : styles.node;

  return (
    <g>
      <rect class={frame} height={nodeHeight(lines)} width={w} x={x} y={y} />
      <text
        class={styles.nodeTitle}
        x={x + NODE_PADDING}
        y={y + TITLE_BASELINE}
      >
        {title}
      </text>
      {lines.map((line, index) => (
        <text
          class={styles.nodeLine}
          key={line}
          x={x + NODE_PADDING}
          y={y + FIRST_LINE - 6 + index * LINE_HEIGHT}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

export function Wire({ d }: { d: string }) {
  return <path class={styles.wire} d={d} marker-end={`url(#${ARROW_ID})`} />;
}

export function Line({ d }: { d: string }) {
  return <path class={styles.wire} d={d} />;
}

export function Label(
  { anchor = "start", code, text, x, y }: {
    anchor?: "start" | "middle" | "end";
    code?: boolean;
    text: string;
    x: number;
    y: number;
  },
) {
  return (
    <text
      class={code ? styles.code : styles.label}
      text-anchor={anchor}
      x={x}
      y={y}
    >
      {text}
    </text>
  );
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
  return (
    <g>
      <line class={styles.boundary} x1={x} x2={x} y1={top} y2={bottom} />
      <rect
        class={styles.boundaryChip}
        height={28}
        width={160}
        x={x - 80}
        y={labelY - 19}
      />
      <Label anchor="middle" text={label} x={x} y={labelY} />
    </g>
  );
}
