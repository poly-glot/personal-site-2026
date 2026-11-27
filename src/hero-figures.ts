import type { Box, Point, Shade } from "./types.ts";

const SOLID = 1;
const TINT = 0.45;
const STROKE = 0.04;

function inBox(u: number, v: number, box: Box): boolean {
  return u >= box.left && u < box.right && v >= box.top && v < box.bottom;
}

function onOutline(u: number, v: number, box: Box): boolean {
  const inner: Box = {
    bottom: box.bottom - STROKE,
    left: box.left + STROKE,
    right: box.right - STROKE,
    top: box.top + STROKE,
  };

  return inBox(u, v, box) && !inBox(u, v, inner);
}

const PARAGRAPH_LINE_SHARES = [1, 0.85, 1, 0.45];

function paragraph(
  left: number,
  top: number,
  width: number,
  lineHeight: number,
  linePitch: number,
): Box[] {
  return PARAGRAPH_LINE_SHARES.map((share, index) => {
    const lineTop = top + index * linePitch;
    return {
      bottom: lineTop + lineHeight,
      left,
      right: left + width * share,
      top: lineTop,
    };
  });
}

const PROMPT_ROW = 1 / 21;
const PROMPT_LINES = paragraph(
  0.16,
  4 * PROMPT_ROW,
  0.68,
  2 * PROMPT_ROW,
  4 * PROMPT_ROW,
);

const LAST_PROMPT_LINE = PROMPT_LINES[PROMPT_LINES.length - 1];
const PROMPT_CURSOR: Box = {
  bottom: LAST_PROMPT_LINE.bottom + PROMPT_ROW,
  left: LAST_PROMPT_LINE.right + PROMPT_ROW,
  right: LAST_PROMPT_LINE.right + 3 * PROMPT_ROW,
  top: LAST_PROMPT_LINE.top - PROMPT_ROW,
};

const WORKFLOW_ROW = 1 / 34;
const WORKFLOW_PROMPT_STARTS = [3, 13, 23];
const WORKFLOW_PROMPT_COLUMNS = 9;

const WORKFLOW_PROMPTS: Box[] = WORKFLOW_PROMPT_STARTS.flatMap((start) =>
  paragraph(
    start * WORKFLOW_ROW,
    start * WORKFLOW_ROW,
    WORKFLOW_PROMPT_COLUMNS * WORKFLOW_ROW,
    WORKFLOW_ROW,
    2 * WORKFLOW_ROW,
  )
);

function workflowLink(fromStart: number): Box[] {
  const row = (fromStart + 3) * WORKFLOW_ROW;
  const column = (fromStart + 14) * WORKFLOW_ROW;

  return [
    {
      bottom: row + WORKFLOW_ROW,
      left: (fromStart + 10) * WORKFLOW_ROW,
      right: column + WORKFLOW_ROW,
      top: row,
    },
    {
      bottom: (fromStart + 9) * WORKFLOW_ROW,
      left: column,
      right: column + WORKFLOW_ROW,
      top: row,
    },
  ];
}

const WORKFLOW_LINKS: Box[] = WORKFLOW_PROMPT_STARTS.slice(0, -1).flatMap(
  workflowLink,
);

const PRODUCT_WINDOW: Box = {
  bottom: 0.94,
  left: 0.06,
  right: 0.94,
  top: 0.06,
};
const PRODUCT_TITLE_RULE: Box = {
  bottom: 0.24,
  left: 0.06,
  right: 0.94,
  top: 0.2,
};
const PRODUCT_LEAD: Box = { bottom: 0.52, left: 0.4, right: 0.87, top: 0.31 };
const PRODUCT_PANELS: Box[] = [
  { bottom: 0.87, left: 0.13, right: 0.34, top: 0.31 },
  { bottom: 0.87, left: 0.4, right: 0.61, top: 0.58 },
  { bottom: 0.87, left: 0.66, right: 0.87, top: 0.58 },
];

const GLOBE_RADIUS = 0.46;
const GLOBE_RIM = 0.035;
const GLOBE_RIM_SHADE = 0.75;
const GLOBE_AMBIENT = 0.1;
const LIGHT = { x: -0.5, y: -0.6, z: 0.62 };

const prompt: Shade = (u, v) => {
  const onLine = PROMPT_LINES.some((box) => inBox(u, v, box));

  return onLine || inBox(u, v, PROMPT_CURSOR) ? SOLID : 0;
};

const workflow: Shade = (u, v) => {
  const onStep = WORKFLOW_PROMPTS.some((box) => inBox(u, v, box));
  const onLink = WORKFLOW_LINKS.some((box) => inBox(u, v, box));

  return onStep || onLink ? SOLID : 0;
};

const product: Shade = (u, v) => {
  if (onOutline(u, v, PRODUCT_WINDOW)) return SOLID;
  if (inBox(u, v, PRODUCT_TITLE_RULE)) return SOLID;
  if (inBox(u, v, PRODUCT_LEAD)) return SOLID;

  return PRODUCT_PANELS.some((box) => inBox(u, v, box)) ? TINT : 0;
};

const enterprise: Shade = (u, v) => {
  const dx = u - 0.5;
  const dy = v - 0.5;
  const distance = Math.hypot(dx, dy);
  if (distance > GLOBE_RADIUS) return 0;
  if (distance > GLOBE_RADIUS - GLOBE_RIM) return GLOBE_RIM_SHADE;

  const dz = Math.sqrt(GLOBE_RADIUS ** 2 - distance ** 2);
  const lit = (dx * LIGHT.x + dy * LIGHT.y + dz * LIGHT.z) / GLOBE_RADIUS;

  return GLOBE_AMBIENT + (1 - GLOBE_AMBIENT) * Math.max(0, lit);
};

export const FIGURES: Shade[] = [prompt, workflow, product, enterprise];

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];
const BAYER_LEVELS = 16;

function ditherThreshold(row: number, column: number): number {
  return (BAYER[row % 4][column % 4] + 0.5) / BAYER_LEVELS;
}

function ditheredCells(shade: Shade, size: number, cell: number): Point[] {
  const steps = Math.floor(size / cell);
  const cells: Point[] = [];

  for (let row = 0; row < steps; row++) {
    for (let column = 0; column < steps; column++) {
      const u = (column + 0.5) / steps;
      const v = (row + 0.5) / steps;
      if (shade(u, v) > ditherThreshold(row, column)) {
        cells.push({ x: u * size, y: v * size });
      }
    }
  }

  return cells;
}

function shuffle<T>(items: T[], random: () => number): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

export function byColumn(a: Point, b: Point): number {
  return a.x - b.x || a.y - b.y;
}

export function figurePoints(
  shade: Shade,
  count: number,
  size: number,
  cell: number,
  random: () => number,
): Point[] {
  const cells = shuffle(ditheredCells(shade, size, cell), random);
  if (cells.length === 0) return [];

  const points = Array.from(
    { length: count },
    (_, index) => cells[index % cells.length],
  );

  return points.sort(byColumn);
}
