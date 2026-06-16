import { useEffect, useRef } from "preact/hooks";
import styles from "./HeroPhoto.module.css";

export default function HeroPhoto() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const parallax = parallaxRef.current;
    if (!wrap || !parallax) return;

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;

      const px = Math.max(-1, Math.min(1, dx)) * 10;
      const py = Math.max(-1, Math.min(1, dy)) * 10;

      parallax.style.setProperty("--px", `${px}px`);
      parallax.style.setProperty("--py", `${py}px`);
    };

    globalThis.addEventListener("mousemove", onMove);
    return () => globalThis.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div class={styles.photo} ref={wrapRef}>
      <div class={styles.blobWrap} aria-hidden="true">
        <div class={styles.parallax} ref={parallaxRef}>
          <svg
            class={styles.blobSvg}
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 761 824"
          >
            <path
              class={styles.blobPath}
              d="M 282.608 183.723 C 324.391 105.35 436.723 105.35 478.506 183.723 L 623.111 454.957 C 662.529 528.894 608.95 618.177 525.162 618.177 L 235.953 618.177 C 152.164 618.177 98.585 528.894 138.004 454.957 L 282.608 183.723 Z"
            />
          </svg>
        </div>
      </div>
      <picture>
        <source srcset="/img/junaid.webp" type="image/webp" />
        <img
          class={styles.img}
          src="/img/junaid.png"
          alt="Junaid Ahmed"
          width="848"
          height="1264"
          fetchpriority="high"
          decoding="async"
        />
      </picture>
    </div>
  );
}
