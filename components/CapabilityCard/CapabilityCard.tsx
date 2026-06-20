import SectionEyebrow from "@/components/SectionEyebrow/SectionEyebrow.tsx";
import styles from "./CapabilityCard.module.css";

export interface Capability {
  num: string;
  eyebrow: string;
  title: string;
  body: string;
}

interface CapabilityCardProps {
  cap: Capability;
  index: number;
}

const DELAYS = [styles.delay0, styles.delay1, styles.delay2, styles.delay3];

export default function CapabilityCard({ cap, index }: CapabilityCardProps) {
  return (
    <article class={`${styles.cap} ${DELAYS[index] ?? styles.delay0}`}>
      <SectionEyebrow
        num={cap.num}
        label={cap.eyebrow}
        variant="sans"
        numTone="muted"
        class={styles.eyebrow}
      />
      <h2 class={styles.title}>{cap.title}</h2>
      <p class={styles.body}>{cap.body}</p>
    </article>
  );
}
