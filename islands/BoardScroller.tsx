import { useEffect, useRef } from "preact/hooks";
import type { ComponentChildren } from "preact";

interface BoardScrollerProps {
  children: ComponentChildren;
  class: string;
}

const DRAG_THRESHOLD_PX = 6;
const HINT_DELAY_MS = 800;
const HINT_DURATION_MS = 2400;
const HINT_VISIBLE_RATIO = 0.6;
const USER_INPUT = ["pointerdown", "wheel", "touchstart", "keydown", "focusin"];

function dragToScroll(board: HTMLElement): () => void {
  let pointer: number | null = null;
  let startX = 0;
  let startLeft = 0;
  let dragged = false;

  const press = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    pointer = event.pointerId;
    startX = event.clientX;
    startLeft = board.scrollLeft;
    dragged = false;
  };

  const drag = (event: PointerEvent) => {
    if (event.pointerId !== pointer) return;

    const distance = event.clientX - startX;
    if (!dragged && Math.abs(distance) < DRAG_THRESHOLD_PX) return;

    if (!dragged) {
      dragged = true;
      board.setPointerCapture(event.pointerId);
      board.dataset.dragging = "";
    }

    board.scrollLeft = startLeft - distance;
  };

  const release = (event: PointerEvent) => {
    if (event.pointerId !== pointer) return;

    pointer = null;
    delete board.dataset.dragging;
  };

  const swallowClickAfterDrag = (event: MouseEvent) => {
    if (!dragged) return;

    dragged = false;
    event.preventDefault();
    event.stopPropagation();
  };

  const blockNativeDrag = (event: DragEvent) => event.preventDefault();

  board.addEventListener("pointerdown", press);
  board.addEventListener("pointermove", drag);
  board.addEventListener("pointerup", release);
  board.addEventListener("pointercancel", release);
  board.addEventListener("click", swallowClickAfterDrag, true);
  board.addEventListener("dragstart", blockNativeDrag);

  return () => {
    board.removeEventListener("pointerdown", press);
    board.removeEventListener("pointermove", drag);
    board.removeEventListener("pointerup", release);
    board.removeEventListener("pointercancel", release);
    board.removeEventListener("click", swallowClickAfterDrag, true);
    board.removeEventListener("dragstart", blockNativeDrag);
  };
}

function revealKeyboardFocus(board: HTMLElement): () => void {
  const reveal = (event: FocusEvent) => {
    const target = event.target as Element;
    if (!target.matches(":focus-visible")) return;

    target.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  board.addEventListener("focusin", reveal);

  return () => board.removeEventListener("focusin", reveal);
}

function hintOnce(board: HTMLElement): () => void {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  let frame = 0;
  let timer = 0;

  const glide = () => {
    watch.disconnect();

    const from = board.scrollLeft;
    const hidden = board.scrollWidth - board.clientWidth - from;
    const reach = Math.min(hidden, board.clientWidth / 3);
    if (reach < 1) return stop();

    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / HINT_DURATION_MS, 1);
      board.scrollLeft = from + reach * Math.sin(Math.PI * progress) ** 2;

      if (progress < 1) frame = requestAnimationFrame(step);
      else stop();
    };

    frame = requestAnimationFrame(step);
  };

  const watch = new IntersectionObserver((entries) => {
    clearTimeout(timer);

    const latest = entries[entries.length - 1];
    if (latest.intersectionRatio >= HINT_VISIBLE_RATIO) {
      timer = setTimeout(glide, HINT_DELAY_MS);
    }
  }, { threshold: HINT_VISIBLE_RATIO });

  const stop = () => {
    watch.disconnect();
    clearTimeout(timer);
    cancelAnimationFrame(frame);

    for (const type of USER_INPUT) board.removeEventListener(type, stop);
  };

  watch.observe(board);
  for (const type of USER_INPUT) {
    board.addEventListener(type, stop, { passive: true });
  }

  return stop;
}

export default function BoardScroller(
  { children, class: className }: BoardScrollerProps,
) {
  const board = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!board.current) return;

    const stops = [
      dragToScroll(board.current),
      revealKeyboardFocus(board.current),
      hintOnce(board.current),
    ];

    return () => stops.forEach((stop) => stop());
  }, []);

  return <div class={className} ref={board}>{children}</div>;
}
