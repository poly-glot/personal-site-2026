import type { BlogAbstract } from "@/src/types.ts";
import styles from "./BlogHero.module.css";

interface BlogHeroProps {
  abstract: BlogAbstract;
  id: string;
  variant: "card" | "hero";
}

function Art({ abstract }: { abstract: BlogAbstract }) {
  switch (abstract) {
    case "GATE":
      return (
        <svg viewBox="0 0 200 120" class={styles.art} aria-hidden="true">
          <rect
            x="30"
            y="30"
            width="60"
            height="60"
            fill="none"
            stroke="var(--fg)"
            stroke-width="2"
          />
          <path
            d="M30 30 L90 30 L90 90 L30 90 Z"
            fill="none"
            stroke="var(--accent)"
            stroke-width="2"
            stroke-dasharray="4 3"
          />
          <path
            d="M110 50 L170 50 M110 70 L170 70"
            stroke="var(--fg)"
            stroke-width="2"
            opacity="0.4"
          />
          <circle cx="170" cy="60" r="6" fill="var(--accent)" />
        </svg>
      );
    case "FIG":
      return (
        <svg viewBox="0 0 200 120" class={styles.art} aria-hidden="true">
          <path
            d="M40 90 Q40 60 70 60 Q100 60 100 30"
            stroke="var(--accent)"
            stroke-width="2"
            fill="none"
          />
          <path
            d="M70 90 Q70 70 100 70 Q130 70 130 50"
            stroke="var(--fg)"
            stroke-width="2"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M100 90 Q100 75 130 75 Q160 75 160 60"
            stroke="var(--fg)"
            stroke-width="2"
            fill="none"
            opacity="0.25"
          />
          <circle cx="100" cy="30" r="5" fill="var(--accent)" />
          <circle cx="40" cy="90" r="4" fill="var(--fg)" />
        </svg>
      );
    case "GRID":
      return (
        <svg viewBox="0 0 200 120" class={styles.art} aria-hidden="true">
          {Array.from({ length: 4 }).flatMap((_, r) =>
            Array.from({ length: 6 }).map((__, c) => (
              <rect
                key={`${r}-${c}`}
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
    case "SIGN":
      return (
        <svg viewBox="0 0 200 120" class={styles.art} aria-hidden="true">
          <rect
            x="80"
            y="20"
            width="40"
            height="80"
            fill="var(--fg)"
            opacity="0.1"
          />
          <path d="M100 20 L100 100" stroke="var(--fg)" stroke-width="2" />
          <path
            d="M100 35 L160 35 L150 45 L160 55 L100 55"
            fill="none"
            stroke="var(--accent)"
            stroke-width="2"
          />
          <path
            d="M100 70 L40 70 L50 80 L40 90 L100 90"
            fill="none"
            stroke="var(--fg)"
            stroke-width="2"
            opacity="0.5"
          />
        </svg>
      );
    case "HOOK":
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
    case "DOTS":
      return (
        <svg viewBox="0 0 200 120" class={styles.art} aria-hidden="true">
          {Array.from({ length: 7 }).flatMap((_, r) =>
            Array.from({ length: 12 }).map((__, c) => (
              <circle
                key={`${r}-${c}`}
                cx={20 + c * 14}
                cy={20 + r * 12}
                r={r === 3 && c === 6 ? 5 : 2}
                fill={r === 3 && c === 6 ? "var(--accent)" : "var(--fg)"}
                opacity={r === 3 && c === 6 ? 1 : 0.3}
              />
            ))
          )}
        </svg>
      );
    case "MAP":
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
    case "BLOCKS":
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
}

export default function BlogHero({ abstract, id, variant }: BlogHeroProps) {
  const frameClass = variant === "card" ? styles.frameSm : styles.frameHero;

  return (
    <div class={`${styles.frame} ${frameClass}`} data-tone={id}>
      <div class={styles.bar}>
        <span class={styles.dots}>
          <i class={styles.dotRed} />
          <i class={styles.dotAmber} />
          <i class={styles.dotGreen} />
        </span>
        <span class={`${styles.url} mono`}>junaid.guru/writing/{id}</span>
      </div>
      <div class={styles.body}>
        <div class={styles.bg} aria-hidden="true" />
        <div class={styles.content}>
          <Art abstract={abstract} />
        </div>
      </div>
    </div>
  );
}
