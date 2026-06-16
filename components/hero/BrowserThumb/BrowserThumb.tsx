import type { WorkProject } from "@/src/types.ts";
import styles from "./BrowserThumb.module.css";

function Art({ abstract }: { abstract: WorkProject["abstract"] }) {
  if (abstract === "MAP") {
    return (
      <svg viewBox="0 0 200 120" class={styles.art} aria-hidden="true">
        <path
          d="M10 60 Q60 20 100 60 T 190 60"
          stroke="var(--accent)"
          stroke-width="2"
          fill="none"
        />
        <circle cx="60" cy="44" r="6" fill="var(--accent)" />
        <circle cx="140" cy="76" r="6" fill="var(--fg)" />
        <circle cx="100" cy="60" r="3" fill="var(--fg)" />
      </svg>
    );
  }

  if (abstract === "FLAG") {
    return (
      <svg viewBox="0 0 200 120" class={styles.art} aria-hidden="true">
        <rect x="20" y="30" width="160" height="20" fill="var(--fg)" />
        <rect x="20" y="50" width="160" height="20" fill="var(--accent)" />
        <rect x="20" y="70" width="160" height="20" fill="var(--fg)" />
      </svg>
    );
  }

  if (abstract === "BLOCKS") {
    return (
      <svg viewBox="0 0 200 120" class={styles.art} aria-hidden="true">
        <rect x="20" y="20" width="55" height="30" fill="var(--accent)" />
        <rect
          x="85"
          y="20"
          width="95"
          height="30"
          fill="var(--fg)"
          opacity="0.2"
        />
        <rect
          x="20"
          y="60"
          width="80"
          height="40"
          fill="var(--fg)"
          opacity="0.1"
        />
        <rect
          x="110"
          y="60"
          width="70"
          height="40"
          fill="var(--fg)"
          opacity="0.15"
        />
      </svg>
    );
  }

  if (abstract === "DOTS") {
    const rows = Array.from({ length: 7 }, (_, r) => r);
    const cols = Array.from({ length: 12 }, (_, c) => c);
    return (
      <svg viewBox="0 0 200 120" class={styles.art} aria-hidden="true">
        {rows.flatMap((r) =>
          cols.map((c) => {
            const lit = r === 3 && c === 6;
            return (
              <circle
                cx={20 + c * 14}
                cy={20 + r * 12}
                r={lit ? 5 : 2}
                fill={lit ? "var(--accent)" : "var(--fg)"}
                opacity={lit ? 1 : 0.3}
              />
            );
          })
        )}
      </svg>
    );
  }

  if (abstract === "GRID") {
    const rows = Array.from({ length: 4 }, (_, r) => r);
    const cols = Array.from({ length: 6 }, (_, c) => c);
    return (
      <svg viewBox="0 0 200 120" class={styles.art} aria-hidden="true">
        {rows.flatMap((r) =>
          cols.map((c) => (
            <rect
              x={20 + c * 28}
              y={15 + r * 24}
              width="20"
              height="16"
              fill="var(--fg)"
              opacity={(r + c) % 3 === 0 ? 0.6 : 0.1}
            />
          ))
        )}
      </svg>
    );
  }

  if (abstract === "HOOK") {
    return (
      <svg viewBox="0 0 200 120" class={styles.art} aria-hidden="true">
        <path
          d="M40 30 L40 70 Q40 90 60 90 L100 90"
          stroke="var(--accent)"
          stroke-width="3"
          fill="none"
        />
        <circle cx="40" cy="30" r="6" fill="var(--accent)" />
        <text
          x="120"
          y="70"
          font-family="JetBrains Mono"
          font-size="14"
          fill="var(--fg)"
        >
          use()
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 120" class={styles.art} aria-hidden="true">
      <path
        d="M20 90 Q100 20 180 30"
        stroke="var(--accent)"
        stroke-width="2"
        stroke-dasharray="4 4"
        fill="none"
      />
      <circle cx="20" cy="90" r="5" fill="var(--fg)" />
      <polygon points="170,20 188,28 170,40" fill="var(--accent)" />
    </svg>
  );
}

export default function BrowserThumb({ project }: { project: WorkProject }) {
  return (
    <div class={styles.bw} data-tone={project.id}>
      <div class={styles.bar}>
        <span class={styles.dots}>
          <i class={styles.red} />
          <i class={styles.amber} />
          <i class={styles.green} />
        </span>
        <span class={styles.url}>{project.url}</span>
      </div>
      <div class={styles.body}>
        <div class={styles.bg} aria-hidden="true" />
        <div class={styles.content}>
          <Art abstract={project.abstract} />
        </div>
      </div>
    </div>
  );
}
