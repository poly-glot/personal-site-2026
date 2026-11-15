import styles from "./chart.module.css";

interface Reading {
  amount?: number;
  chosen?: boolean;
  label: string;
  value: string;
}

function Bar({ reading, scale }: { reading: Reading; scale: number }) {
  if (reading.amount === undefined) {
    return <span class={styles.pending}>{reading.value}</span>;
  }

  return (
    <>
      <svg
        aria-hidden="true"
        class={styles.track}
        preserveAspectRatio="none"
        viewBox={`0 0 ${scale} 1`}
      >
        <rect
          class={reading.chosen ? styles.chosen : styles.bar}
          height="1"
          width={reading.amount}
        />
      </svg>
      <span class={styles.value}>{reading.value}</span>
    </>
  );
}

export default function BarChart(
  { bleed, readings }: { bleed?: boolean; readings: readonly Reading[] },
) {
  const scale = Math.max(...readings.map((reading) => reading.amount ?? 0));
  const list = bleed
    ? `${styles.readings} ${styles.bleed} bleed-divider-top`
    : styles.readings;
  const row = bleed ? `${styles.reading} bleed-divider` : styles.reading;

  return (
    <figure class={styles.chart}>
      <dl class={list}>
        {readings.map((reading) => (
          <div class={row} key={reading.label}>
            <dt class={styles.label}>{reading.label}</dt>
            <dd class={styles.measure}>
              <Bar reading={reading} scale={scale} />
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
