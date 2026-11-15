import type { ComponentType } from "preact";
import { Lightbulb, Magnifier, Warning } from "@/components/Icons/Icons.tsx";
import styles from "./Summary.module.css";

interface Point {
  Icon: ComponentType;
  label: string;
  text: string;
}

export default function Summary(
  { cause, fix, problem }: { cause: string; fix: string; problem: string },
) {
  const points: Point[] = [
    { Icon: Warning, label: "Problem", text: problem },
    { Icon: Magnifier, label: "Cause", text: cause },
    { Icon: Lightbulb, label: "Fix", text: fix },
  ];

  return (
    <dl class={styles.summary}>
      {points.map(({ Icon, label, text }) => (
        <div class={styles.point} key={label}>
          <span class={styles.icon}>
            <Icon />
          </span>
          <div>
            <dt class={styles.label}>{label}:</dt>{" "}
            <dd class={styles.text}>{text}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
