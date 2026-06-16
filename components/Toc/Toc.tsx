import type { TocEntry } from "@/src/types.ts";
import styles from "./Toc.module.css";

export default function Toc({ entries }: { entries: TocEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <nav class={styles.toc} aria-label="Table of contents">
      <p class={`${styles.label} mono`}>In this essay</p>
      <ol class={styles.list}>
        {entries.map((entry, i) => (
          <li key={entry.id} class={styles.item} data-toc-id={entry.id}>
            <a href={`#${entry.id}`} class={styles.link}>
              <span class={`${styles.num} mono`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span class={styles.text}>{entry.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
