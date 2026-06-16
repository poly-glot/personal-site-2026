import { useEffect } from "preact/hooks";

export default function TocScrollSpy({ ids }: { ids: string[] }) {
  useEffect(() => {
    if (ids.length === 0) return;

    let raf = 0;

    const setActive = (activeId: string) => {
      for (const id of ids) {
        const item = document.querySelector(`[data-toc-id="${id}"]`);
        if (item) item.classList.toggle("active", id === activeId);
      }
    };

    const compute = () => {
      raf = 0;

      const line = globalThis.innerHeight * 0.3;
      let current = ids[0];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - line <= 0) current = id;
      }

      const doc = document.documentElement;
      const max = Math.max(0, doc.scrollHeight - globalThis.innerHeight);
      const top = globalThis.scrollY;
      if (max > 0 && top >= max - 4) current = ids[ids.length - 1];

      setActive(current);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    globalThis.addEventListener("scroll", schedule, { passive: true });
    globalThis.addEventListener("resize", schedule);

    return () => {
      globalThis.removeEventListener("scroll", schedule);
      globalThis.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids.join("|")]);

  return null;
}
