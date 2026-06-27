import type { ComponentChildren } from "preact";
import styles from "./Callout.module.css";

export default function Callout(
  { title, children }: { title: string; children: ComponentChildren },
) {
  return (
    <aside class={styles.callout}>
      <span class={`${styles.calloutLabel} mono`}>{title}</span>
      {children}
    </aside>
  );
}
