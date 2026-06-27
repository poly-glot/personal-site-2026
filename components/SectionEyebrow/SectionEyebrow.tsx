import styles from "./SectionEyebrow.module.css";

interface SectionEyebrowProps {
  num: string;
  label: string;
  right?: string;
  variant?: "sans" | "mono";
  align?: "center" | "baseline";
  numTone?: "accent" | "accentBright" | "muted";
  labelStrong?: boolean;
  rightSmall?: boolean;
  rule?: boolean;
  tone?: "default" | "invert";
  class?: string;
}

const NUM_TONE = {
  accent: styles.numAccent,
  accentBright: styles.numAccentBright,
  muted: styles.numMuted,
};

export default function SectionEyebrow({
  num,
  label,
  right,
  variant = "mono",
  align = "center",
  numTone = "accent",
  labelStrong = false,
  rightSmall = false,
  rule = true,
  tone = "default",
  class: className,
}: SectionEyebrowProps) {
  const classes = [
    styles.eyebrow,
    styles[variant],
    align === "baseline" && styles.baseline,
    tone === "invert" && styles.invert,
    rightSmall && styles.rightSmall,
    !rule && styles.noRule,
    className,
  ].filter(Boolean).join(" ");

  return (
    <div class={classes}>
      <span class={`${styles.num} ${NUM_TONE[numTone]}`}>{num}</span>
      <span
        class={labelStrong
          ? `${styles.label} ${styles.labelStrong}`
          : styles.label}
      >
        {label}
      </span>
      {right ? <span class={styles.right}>{right}</span> : null}
    </div>
  );
}
