import type { SketchLayout, SketchPage } from "../../src/types.ts";
import { Chip, Line, Node, S1, S4, Sketch, type Tone, Wire } from "./parts.tsx";

type Box = readonly [x: number, y: number, w: number, h: number];

export const PAGE_W = 280;
export const PAGE_H = 190;
export const TOKEN = S4;
export const ARROW_GAP = 2;

const PAD = 22;
const SKETCH_TOP = 66;

const SKETCHES: Record<SketchLayout, readonly Box[]> = {
  banner: [[0, 0, 236, 8], [0, 18, 236, 40], [0, 68, 236, 8], [0, 82, 180, 8]],
  form: [
    [0, 0, 236, 8],
    [0, 22, 140, 10],
    [0, 42, 236, 14],
    [0, 62, 236, 14],
    [0, 84, 70, 18],
  ],
  grid: [
    [0, 0, 236, 8],
    [0, 20, 120, 10],
    [0, 40, 72, 62],
    [82, 40, 72, 62],
    [164, 40, 72, 62],
  ],
  hero: [
    [0, 0, 236, 8],
    [0, 22, 110, 10],
    [0, 40, 96, 8],
    [0, 54, 104, 8],
    [0, 76, 60, 16],
    [128, 20, 108, 82],
  ],
  list: [
    [0, 0, 236, 8],
    [0, 22, 236, 14],
    [0, 44, 236, 14],
    [0, 66, 236, 14],
    [0, 88, 160, 14],
  ],
};

export function cardWidth(count: number, span: number): number {
  return (span - (count - 1) * S1) / count;
}

export function cardX(left: number, width: number, index: number): number {
  return left + index * (width + S1);
}

export function centres(labels: readonly string[], left: number): number[] {
  const width = cardWidth(labels.length, PAGE_W);

  return labels.map((_, index) => cardX(left, width, index) + width / 2);
}

export function Screen(
  { page, tone, x, y }: {
    page: SketchPage;
    tone?: Tone;
    x: number;
    y: number;
  },
) {
  return (
    <g>
      <Node
        h={PAGE_H}
        lines={[]}
        title={page.name}
        tone={tone}
        w={PAGE_W}
        x={x}
        y={y}
      />
      {SKETCHES[page.layout].map(([dx, dy, w, h]) => (
        <Sketch
          h={h}
          key={`${dx}-${dy}`}
          w={w}
          x={x + PAD + dx}
          y={y + SKETCH_TOP + dy}
        />
      ))}
    </g>
  );
}

export function FanOut(
  { from, fromY, busY, targets, topY }: {
    busY: number;
    from: number;
    fromY: number;
    targets: readonly number[];
    topY: number;
  },
) {
  const first = Math.min(from, ...targets);
  const last = Math.max(from, ...targets);

  return (
    <g>
      <Line d={`M${from} ${fromY} L${from} ${busY}`} from="dot" />
      <Line d={`M${first} ${busY} L${last} ${busY}`} />
      {targets.map((x) => (
        <Wire d={`M${x} ${busY} L${x} ${topY - ARROW_GAP}`} key={x} />
      ))}
    </g>
  );
}

export function Cards(
  { h, labels, left, span, y }: {
    h: number;
    labels: readonly string[];
    left: number;
    span: number;
    y: number;
  },
) {
  const width = cardWidth(labels.length, span);

  return (
    <g>
      {labels.map((label, index) => (
        <Chip
          h={h}
          key={label}
          text={label}
          w={width}
          x={cardX(left, width, index)}
          y={y}
        />
      ))}
    </g>
  );
}
