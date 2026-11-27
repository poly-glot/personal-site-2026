import { useEffect } from "preact/hooks";

const CARD_SELECTOR = "[data-parallax]";

function allowsParallax(): boolean {
  const finePointer = globalThis.matchMedia(
    "(hover: hover) and (pointer: fine)",
  );
  const reducedMotion = globalThis.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  return finePointer.matches && !reducedMotion.matches;
}

function release(card: HTMLElement): void {
  card.style.removeProperty("--parallax-x");
  card.style.removeProperty("--parallax-y");
}

function lean(card: HTMLElement, event: PointerEvent): void {
  const box = card.getBoundingClientRect();
  const x = ((event.clientX - box.left) / box.width) * 2 - 1;
  const y = ((event.clientY - box.top) / box.height) * 2 - 1;

  card.style.setProperty("--parallax-x", x.toFixed(3));
  card.style.setProperty("--parallax-y", y.toFixed(3));
}

export default function CardParallax() {
  useEffect(() => {
    if (!allowsParallax()) return;

    let active: HTMLElement | null = null;
    let latest: PointerEvent | null = null;
    let frame = 0;

    const apply = () => {
      frame = 0;
      if (!latest) return;

      const target = latest.target instanceof Element ? latest.target : null;
      const card = target?.closest<HTMLElement>(CARD_SELECTOR) ?? null;
      if (active && active !== card) release(active);

      active = card;
      if (card) lean(card, latest);
    };

    const onPointerMove = (event: PointerEvent) => {
      latest = event;
      if (frame === 0) frame = requestAnimationFrame(apply);
    };

    const onPointerLeave = () => {
      latest = null;
      if (active) release(active);
      active = null;
    };

    const page = document.documentElement;
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    page.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onPointerMove);
      page.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return null;
}
