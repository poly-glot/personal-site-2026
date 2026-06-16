import styles from "./HeroGridlines.module.css";

const PLUSES = [
  { v: styles.v33, row: styles.rowA, t: styles.t0 },
  { v: styles.v100, row: styles.rowA, t: styles.t1 },
  { v: styles.v33, row: styles.rowB, t: styles.t2 },
  { v: styles.v100, row: styles.rowB, t: styles.t3 },
  { v: styles.v33, row: styles.rowC, t: styles.t4 },
  { v: styles.v100, row: styles.rowC, t: styles.t5 },
];

const BLEED_ROWS = [
  styles.bleedB0,
  styles.bleedB1,
  styles.bleedB2,
  styles.bleedB3,
];

const VEXT_LINES = [styles.v33, styles.v66, styles.v100];

export default function HeroGridlines() {
  return (
    <>
      <div class={styles.gridlines} aria-hidden="true">
        <div class={`${styles.hline} ${styles.rowTop}`} />
        <div class={`${styles.hline} ${styles.tickLeft} ${styles.rowA}`} />
        <div class={`${styles.hline} ${styles.tickLeft} ${styles.rowB}`} />
        <div class={`${styles.hline} ${styles.tickLeft} ${styles.rowC}`} />
        <div class={`${styles.hline} ${styles.rowBottom}`} />
        <div class={`${styles.vline} ${styles.v0}`} />
        <div class={`${styles.vline} ${styles.v33}`} />
        <div class={`${styles.vline} ${styles.v66}`} />
        <div class={`${styles.vline} ${styles.v100}`} />
        {PLUSES.map((p, i) => (
          <span class={`${styles.plus} ${p.v} ${p.row} ${p.t}`} key={i}>
            +
          </span>
        ))}
      </div>

      <div class={styles.vext} aria-hidden="true">
        {VEXT_LINES.map((v, i) => (
          <div
            class={`${styles.vline} ${v}`}
            key={i}
          />
        ))}
      </div>

      <div class={styles.bleed} aria-hidden="true">
        {BLEED_ROWS.map((b, i) => (
          <div
            class={`${styles.hline} ${b}`}
            key={i}
          />
        ))}
        <div class={styles.vlineEdge} />
      </div>
    </>
  );
}
