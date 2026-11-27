import { Fragment } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import type { Box, Point } from "@/src/types.ts";
import { byColumn, figurePoints, FIGURES } from "@/src/hero-figures.ts";
import { Pause, Play } from "@/components/Icons/Icons.tsx";
import styles from "./HeadlineMotion.module.css";

interface HeadlineMotionProps {
  headline: string;
  scales: string[];
}

interface Body {
  pos: Point;
  vel: Point;
}

interface Spring {
  damping: number;
  stiffness: number;
}

interface Target extends Point {
  weight: number;
}

interface Dot extends Body {
  weight: number;
  bow: number;
  jitter: number;
  rank: number;
}

interface WordSample {
  points: Target[];
  step: number;
}

interface Layout {
  pitch: number;
  frames: Box[];
  height: number;
  targets: Target[][];
  width: number;
}

interface Surfaces {
  captions: HTMLElement[];
  canvas: HTMLCanvasElement;
  headline: HTMLElement;
  field: HTMLElement;
  root: HTMLElement;
  stage: HTMLElement;
}

interface EngineEvents {
  onScene: (scene: number) => void;
}

interface Engine {
  destroy: () => void;
  jump: (scene: number) => void;
  setPaused: (paused: boolean) => void;
}

const PHI = 1.618;
const SCENE_MS = 6000;
const HEADLINE_SWEEP_MS = 300;
const FRAME_LEAD_MS = 250;
const SCENE_SWEEP_MS = 600;
const JITTER_MS = 120;
const STEP_MS = 1000 / 60;
const MAX_FRAME_MS = 50;
const MAX_DPR = 2;
const HEADLINE_SCENE = 0;
const OPENING_SCENE = 1;
const GLOBE_SCENE = FIGURES.length;
const PLUS_CSS_PX = 11;
const PLUS_BLEND_CSS_PX = 34;
const LARGEST_STEP = PHI ** 2;
const FIGURE_STEPS = [1, PHI, LARGEST_STEP, LARGEST_STEP];
const UNIT_CSS_PX = 55;
const UNIT_SHARE = 0.125;
const CAPTION_GAP_SHARE = 0.618;
const GLYPH_ROWS = 32;
const ASCENDER_SHARE = 0.15;
const MIN_COVERAGE = 0.15;
const FIGURE_WEIGHT = 1.28;
const FIGURE_CELL = 1.73;
const MAX_DOTS = 18000;
const STYLE_REFRESH_MS = 500;
const HANDLE_CSS_PX = 5;
const EASE = 0.08;
const POINTER_RADIUS_CSS_PX = 64;
const PUSH_CSS_PX = 0.45;
const BOW = 0.005;
const STREAK_MIN_SPEED = 1.5;
const STREAK_ALPHA = 0.35;
const SHUTTER = 0.5;
const REST_SPEED = 0.05;
const DOT_SPRING: Spring = { damping: 0.8, stiffness: 0.02 };
const FRAME_SPRING: Spring = { damping: 0.85, stiffness: 0.008 };
const VISIBLE_ALPHA = 0.01;

function prefersReducedMotion(): boolean {
  return globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function renderWords(
  text: HTMLElement,
  box: DOMRect,
  dpr: number,
): ImageData | null {
  const scratch = document.createElement("canvas");
  scratch.width = Math.round(box.width * dpr);
  scratch.height = Math.round(box.height * dpr);
  const ctx = scratch.getContext("2d", { willReadFrequently: true });
  if (!ctx || scratch.width === 0 || scratch.height === 0) return null;

  const style = getComputedStyle(text);
  ctx.scale(dpr, dpr);
  ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  ctx.letterSpacing = style.letterSpacing;
  ctx.textBaseline = "alphabetic";

  for (const span of text.querySelectorAll<HTMLElement>("[data-word]")) {
    const rect = span.getBoundingClientRect();
    const word = span.textContent ?? "";
    const { fontBoundingBoxAscent } = ctx.measureText(word);
    ctx.fillText(
      word,
      rect.left - box.left,
      rect.top - box.top + fontBoundingBoxAscent,
    );
  }

  return ctx.getImageData(0, 0, scratch.width, scratch.height);
}

function cellCoverage(
  image: ImageData,
  left: number,
  top: number,
  step: number,
): number {
  const { data, width, height } = image;
  const right = Math.min(left + step, width);
  const bottom = Math.min(top + step, height);
  let alpha = 0;

  for (let y = top; y < bottom; y++) {
    for (let x = left; x < right; x++) {
      alpha += data[(y * width + x) * 4 + 3];
    }
  }

  return alpha / (step * step * 255);
}

function inkedPoints(image: ImageData, step: number, dpr: number): Target[] {
  const points: Target[] = [];

  for (let y = 0; y < image.height; y += step) {
    for (let x = 0; x < image.width; x += step) {
      const weight = cellCoverage(image, x, y, step);
      if (weight >= MIN_COVERAGE) {
        points.push({ weight, x: x / dpr, y: y / dpr });
      }
    }
  }

  return points;
}

function sampleHeadline(
  headline: HTMLElement,
  box: DOMRect,
  dpr: number,
): WordSample {
  const image = renderWords(headline, box, dpr);
  const fontSize = parseFloat(getComputedStyle(headline).fontSize);
  let step = Math.max(1, Math.round((fontSize / GLYPH_ROWS) * dpr));
  if (!image) return { points: [], step };

  let points = inkedPoints(image, step, dpr);
  while (points.length > MAX_DOTS) {
    step += 1;
    points = inkedPoints(image, step, dpr);
  }

  return { points: points.sort(byColumn), step };
}

function sampleCaption(
  caption: HTMLElement,
  box: DOMRect,
  dpr: number,
  step: number,
): Target[] {
  const image = renderWords(caption, box, dpr);

  return image ? inkedPoints(image, step, dpr) : [];
}

function placeCaptions(captions: HTMLElement[], offsets: number[]): void {
  captions.forEach((caption, index) => {
    caption.style.setProperty("--offset", `${offsets[index]}px`);
  });
}

function offsetBy(points: Target[], origin: Point): Target[] {
  return points.map((point) => ({
    weight: point.weight,
    x: point.x + origin.x,
    y: point.y + origin.y,
  }));
}

function figureTargets(points: Point[]): Target[] {
  return points.map((point) => ({ ...point, weight: FIGURE_WEIGHT }));
}

function centreOf(box: Box): Box {
  const x = (box.left + box.right) / 2;
  const y = (box.top + box.bottom) / 2;

  return { bottom: y, left: x, right: x, top: y };
}

function measureLayout(surfaces: Surfaces, dpr: number): Layout {
  const fieldBox = surfaces.field.getBoundingClientRect();
  const stageBox = surfaces.stage.getBoundingClientRect();
  const origin: Point = {
    x: stageBox.left - fieldBox.left,
    y: stageBox.top - fieldBox.top,
  };
  const unit = Math.min(
    UNIT_CSS_PX,
    stageBox.width * UNIT_SHARE,
    stageBox.height / LARGEST_STEP,
  );
  const sizes = FIGURE_STEPS.map((step) => unit * step);

  const figureBoxes: Box[] = sizes.map((size) => {
    const top = origin.y + (stageBox.height - size) / 2;
    return { bottom: top + size, left: origin.x, right: origin.x + size, top };
  });

  placeCaptions(
    surfaces.captions,
    sizes.map((size) => size + unit * CAPTION_GAP_SHARE),
  );

  const overshoot = stageBox.height * ASCENDER_SHARE;
  const textBox = new DOMRect(
    stageBox.x,
    stageBox.y - overshoot,
    stageBox.width,
    stageBox.height + 2 * overshoot,
  );
  const textOrigin: Point = { x: origin.x, y: origin.y - overshoot };
  const sample = sampleHeadline(surfaces.headline, textBox, dpr);
  const pitch = sample.step / dpr;
  const cell = pitch * FIGURE_CELL;
  const words = offsetBy(sample.points, textOrigin);
  const count = words.length;

  const scenes = FIGURES.map((shade, index) => {
    const caption = offsetBy(
      sampleCaption(surfaces.captions[index], textBox, dpr, sample.step),
      textOrigin,
    ).slice(0, count);
    const figure = offsetBy(
      figureTargets(
        figurePoints(
          shade,
          count - caption.length,
          sizes[index],
          cell,
          Math.random,
        ),
      ),
      { x: figureBoxes[index].left, y: figureBoxes[index].top },
    );

    return [...figure, ...caption].sort(byColumn);
  });
  const plusBox = centreOf(figureBoxes[GLOBE_SCENE - 1]);

  return {
    frames: [plusBox, ...figureBoxes.slice(0, GLOBE_SCENE - 1), plusBox],
    height: fieldBox.height,
    pitch,
    targets: [words, ...scenes],
    width: fieldBox.width,
  };
}

function buildDots(homes: Target[]): Dot[] {
  const count = homes.length;

  return homes.map((home, index) => ({
    bow: (Math.random() * 2 - 1) * BOW,
    jitter: Math.random() * JITTER_MS,
    rank: index / count,
    pos: { x: home.x, y: home.y },
    vel: { x: 0, y: 0 },
    weight: home.weight,
  }));
}

function restingAt(point: Point): Body {
  return { pos: { ...point }, vel: { x: 0, y: 0 } };
}

function pushFromPointer(dot: Dot, pointer: Point): void {
  const dx = dot.pos.x - pointer.x;
  const dy = dot.pos.y - pointer.y;
  const distance = Math.hypot(dx, dy);
  if (distance === 0 || distance >= POINTER_RADIUS_CSS_PX) return;

  const force = (1 - distance / POINTER_RADIUS_CSS_PX) * PUSH_CSS_PX;
  dot.vel.x += (dx / distance) * force;
  dot.vel.y += (dy / distance) * force;
}

function springTo(
  body: Body,
  home: Point,
  spring: Spring,
  bow: number = 0,
): void {
  const { damping, stiffness } = spring;
  const dx = home.x - body.pos.x;
  const dy = home.y - body.pos.y;

  body.vel.x = (body.vel.x + dx * stiffness - dy * bow) * damping;
  body.vel.y = (body.vel.y + dy * stiffness + dx * bow) * damping;
  body.pos.x += body.vel.x;
  body.pos.y += body.vel.y;
}

function paintPlus(
  ctx: CanvasRenderingContext2D,
  centre: Point,
  alpha: number,
  accent: string,
): void {
  if (alpha < VISIBLE_ALPHA) return;

  const x = Math.round(centre.x) + 0.5;
  const y = Math.round(centre.y) + 0.5;
  const arm = PLUS_CSS_PX / 2;

  ctx.globalAlpha = alpha;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x - arm, y);
  ctx.lineTo(x + arm, y);
  ctx.moveTo(x, y - arm);
  ctx.lineTo(x, y + arm);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function paintBox(
  ctx: CanvasRenderingContext2D,
  near: Point,
  far: Point,
  alpha: number,
  ink: string,
  accent: string,
): void {
  if (alpha < VISIBLE_ALPHA) return;

  const left = Math.round(near.x);
  const top = Math.round(near.y);
  const right = Math.round(far.x);
  const bottom = Math.round(far.y);
  const half = HANDLE_CSS_PX / 2;

  ctx.globalAlpha = alpha;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 1;
  ctx.strokeRect(left + 0.5, top + 0.5, right - left - 1, bottom - top - 1);

  ctx.fillStyle = ink;
  for (const x of [left, right]) {
    for (const y of [top, bottom]) {
      ctx.fillRect(x - half, y - half, HANDLE_CSS_PX, HANDLE_CSS_PX);
    }
  }
  ctx.globalAlpha = 1;
}

function paintFrame(
  ctx: CanvasRenderingContext2D,
  near: Point,
  far: Point,
  alpha: number,
  ink: string,
  accent: string,
): void {
  const size = Math.max(far.x - near.x, far.y - near.y);
  const boxShare = Math.min(
    1,
    Math.max(0, (size - PLUS_CSS_PX) / PLUS_BLEND_CSS_PX),
  );
  const centre: Point = { x: (near.x + far.x) / 2, y: (near.y + far.y) / 2 };

  paintBox(ctx, near, far, alpha * boxShare, ink, accent);
  paintPlus(ctx, centre, alpha * (1 - boxShare), accent);
}

function paintDots(
  ctx: CanvasRenderingContext2D,
  dots: Dot[],
  pitch: number,
  ink: string,
  dpr: number,
): void {
  const trails: Dot[] = [];
  ctx.fillStyle = ink;

  for (const dot of dots) {
    const { pos, vel } = dot;
    const size = pitch * Math.sqrt(dot.weight);
    const inset = (pitch - size) / 2;
    const speed = Math.abs(vel.x) + Math.abs(vel.y);
    const resting = speed < REST_SPEED;
    const x = resting ? Math.round(pos.x * dpr) / dpr : pos.x;
    const y = resting ? Math.round(pos.y * dpr) / dpr : pos.y;

    ctx.fillRect(x + inset, y + inset, size, size);
    if (speed >= STREAK_MIN_SPEED) trails.push(dot);
  }

  ctx.globalAlpha = STREAK_ALPHA;
  for (const { pos, vel, weight } of trails) {
    const size = pitch * Math.sqrt(weight);
    ctx.fillRect(pos.x - vel.x * SHUTTER, pos.y - vel.y * SHUTTER, size, size);
  }
  ctx.globalAlpha = 1;
}

function startEngine(surfaces: Surfaces, events: EngineEvents): Engine | null {
  const { canvas, field, root, stage } = surfaces;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const dpr = Math.min(globalThis.devicePixelRatio || 1, MAX_DPR);
  const loopMs = (FIGURES.length + 1) * SCENE_MS;

  let layout = measureLayout(surfaces, dpr);
  let dots = buildDots(layout.targets[OPENING_SCENE]);
  let scene = HEADLINE_SCENE;
  let previous = OPENING_SCENE;
  let clock = 0;
  let sinceChange = 0;
  let stepDebt = 0;
  let paused = false;
  let stale = false;
  let pointer: Point | null = null;
  let last = performance.now();
  let frame = 0;
  let frameAlpha = 0;
  let ink = "";
  let accent = "";
  let coloursReadAt = -STYLE_REFRESH_MS;

  const frameNear = restingAt({
    x: layout.frames[scene].left,
    y: layout.frames[scene].top,
  });
  const frameFar = restingAt({
    x: layout.frames[scene].right,
    y: layout.frames[scene].bottom,
  });

  const applyLayout = () => {
    canvas.width = Math.round(layout.width * dpr);
    canvas.height = Math.round(layout.height * dpr);
  };

  const remeasure = () => {
    stale = false;
    layout = measureLayout(surfaces, dpr);
    if (dots.length !== layout.targets[scene].length) {
      dots = buildDots(layout.targets[scene]);
    }
    applyLayout();
  };

  const growFrameFromDot = (target: Box) => {
    const centre: Point = {
      x: (target.left + target.right) / 2,
      y: (target.top + target.bottom) / 2,
    };

    Object.assign(frameNear, restingAt(centre));
    Object.assign(frameFar, restingAt(centre));
    frameAlpha = 0;
  };

  const enter = (next: number) => {
    if (scene === HEADLINE_SCENE) growFrameFromDot(layout.frames[next]);
    previous = scene;
    scene = next;
    sinceChange = 0;
    events.onScene(scene);
  };

  const stepDots = () => {
    const arriving = layout.targets[scene];
    const leaving = layout.targets[previous];
    const writesHeadline = scene === HEADLINE_SCENE;

    for (let index = 0; index < dots.length; index++) {
      const dot = dots[index];
      const lag = dot.jitter +
        (writesHeadline
          ? dot.rank * HEADLINE_SWEEP_MS
          : FRAME_LEAD_MS + dot.rank * SCENE_SWEEP_MS);
      const homes = sinceChange >= lag ? arriving : leaving;
      if (pointer) pushFromPointer(dot, pointer);
      const home = homes[index];
      dot.weight += (home.weight - dot.weight) * EASE;
      springTo(dot, home, DOT_SPRING, dot.bow);
    }
  };

  const stepFrame = () => {
    const target = layout.frames[scene];

    if (scene !== HEADLINE_SCENE) {
      springTo(frameNear, { x: target.left, y: target.top }, FRAME_SPRING);
      springTo(frameFar, { x: target.right, y: target.bottom }, FRAME_SPRING);
    }
    frameAlpha += ((scene === HEADLINE_SCENE ? 0 : 1) - frameAlpha) * EASE;
  };

  const refreshColours = (now: number) => {
    if (now - coloursReadAt < STYLE_REFRESH_MS) return;

    const style = getComputedStyle(stage);
    coloursReadAt = now;
    ink = style.color;
    accent = style.getPropertyValue("--accent").trim();
  };

  const paint = (now: number) => {
    refreshColours(now);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, layout.width, layout.height);
    paintDots(ctx, dots, layout.pitch, ink, dpr);
    paintFrame(ctx, frameNear.pos, frameFar.pos, frameAlpha, ink, accent);
  };

  const tick = (now: number) => {
    const elapsed = Math.max(0, Math.min(now - last, MAX_FRAME_MS));
    last = now;
    if (stale) remeasure();

    if (!paused) {
      clock = (clock + elapsed) % loopMs;
      sinceChange += elapsed;
    }

    const due = Math.floor(clock / SCENE_MS);
    if (due !== scene) enter(due);

    stepDebt += elapsed;
    while (stepDebt >= STEP_MS) {
      stepDots();
      stepFrame();
      stepDebt -= STEP_MS;
    }

    paint(now);
    frame = requestAnimationFrame(tick);
  };

  const onPointerMove = (event: PointerEvent) => {
    const box = field.getBoundingClientRect();
    pointer = { x: event.clientX - box.left, y: event.clientY - box.top };
  };

  const onPointerLeave = () => {
    pointer = null;
  };

  const resizeObserver = new ResizeObserver(() => {
    stale = true;
  });

  applyLayout();
  root.style.setProperty("--scene-ms", `${SCENE_MS}ms`);
  field.addEventListener("pointermove", onPointerMove);
  field.addEventListener("pointerleave", onPointerLeave);
  resizeObserver.observe(field);
  resizeObserver.observe(stage);
  frame = requestAnimationFrame(tick);

  return {
    destroy: () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      field.removeEventListener("pointermove", onPointerMove);
      field.removeEventListener("pointerleave", onPointerLeave);
    },
    jump: (next) => {
      clock = next * SCENE_MS;
      enter(next);
    },
    setPaused: (next) => {
      paused = next;
    },
  };
}

function findSurfaces(
  root: HTMLElement | null,
  stage: HTMLElement | null,
  headline: HTMLElement | null,
  canvas: HTMLCanvasElement | null,
): Surfaces | null {
  const field = root?.closest<HTMLElement>("[data-motion-field]");
  if (!root || !stage || !headline || !canvas || !field) {
    return null;
  }

  const captions = [
    ...root.querySelectorAll<HTMLElement>("[data-scale-line]"),
  ];

  return { canvas, captions, field, headline, root, stage };
}

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <Fragment key={index}>
          <span class={styles.word} data-word>{word}</span>
          {" "}
        </Fragment>
      ))}
    </>
  );
}

export default function HeadlineMotion(
  { headline, scales }: HeadlineMotionProps,
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const [live, setLive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [scene, setScene] = useState(HEADLINE_SCENE);
  const sceneLabels = [headline, ...scales];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cancelled = false;

    document.fonts.ready.then(() => {
      const surfaces = findSurfaces(
        rootRef.current,
        stageRef.current,
        headlineRef.current,
        canvasRef.current,
      );
      if (cancelled || !surfaces) return;

      engineRef.current = startEngine(surfaces, {
        onScene: setScene,
      });
      if (!engineRef.current) return;

      setLive(true);
    });

    return () => {
      cancelled = true;
      engineRef.current?.destroy();
    };
  }, []);

  const togglePaused = () => {
    engineRef.current?.setPaused(!paused);
    setPaused(!paused);
  };

  return (
    <div
      ref={rootRef}
      class={styles.root}
      data-live={live ? "" : undefined}
      data-paused={paused ? "" : undefined}
    >
      <div ref={stageRef} class={styles.stage}>
        <h1 ref={headlineRef} class={styles.headline}>
          <Words text={headline} />
        </h1>
        <ol class={styles.scales}>
          {scales.map((line) => (
            <li class={styles.scale} data-scale-line key={line}>
              <span class={styles.scaleText}>
                <Words text={line} />
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div class={styles.controls}>
        {sceneLabels.map((label, index) => (
          <button
            aria-current={scene === index ? "step" : undefined}
            aria-label={`Show: ${label}`}
            class={styles.marker}
            key={label}
            onClick={() => engineRef.current?.jump(index)}
            type="button"
          >
            <span class={styles.markerBox}>
              <span class={styles.markerFill} />
            </span>
          </button>
        ))}
        <button
          aria-label={paused ? "Play the animation" : "Pause the animation"}
          class={styles.pause}
          onClick={togglePaused}
          type="button"
        >
          {paused ? <Play /> : <Pause />}
        </button>
      </div>
      <canvas ref={canvasRef} class={styles.canvas} aria-hidden="true" />
    </div>
  );
}
