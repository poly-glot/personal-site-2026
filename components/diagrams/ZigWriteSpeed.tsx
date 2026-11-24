import styles from "./ZigWriteSpeed.module.css";

interface Bar {
  amount: number;
  value: string;
}

interface Comparison {
  after: Bar;
  before: Bar;
  figure: string;
  gain: string;
  label: string;
  unit: string;
}

const COMPARISONS: readonly Comparison[] = [
  {
    after: { amount: 45454, value: "45,454" },
    before: { amount: 3180, value: "3,180" },
    figure: "45,454",
    gain: "14.3 times faster",
    label: "Bulk import",
    unit: "items a second, 1,000 to a request",
  },
  {
    after: { amount: 22, value: "under 22 ms" },
    before: { amount: 306, value: "306 ms" },
    figure: "< 22",
    gain: "About 14 times quicker",
    label: "One 1,000-item request",
    unit: "ms, the median",
  },
  {
    after: { amount: 22222, value: "22,222" },
    before: { amount: 4278, value: "4,278" },
    figure: "22,222",
    gain: "5.2 times faster",
    label: "Small batches",
    unit: "links a second, 10 to a request",
  },
];

function Meter(
  { bar, label, scale, tone }: {
    bar: Bar;
    label: string;
    scale: number;
    tone: string;
  },
) {
  return (
    <li class={styles.reading}>
      <span class={styles.readingLabel}>{label}</span>
      <span class={styles.value}>{bar.value}</span>
      <svg
        aria-hidden="true"
        class={styles.track}
        preserveAspectRatio="none"
        viewBox={`0 0 ${scale} 1`}
      >
        <rect class={styles.rail} height="1" width={scale} />
        <rect class={tone} height="1" width={bar.amount} />
      </svg>
    </li>
  );
}

function Card({ comparison }: { comparison: Comparison }) {
  const scale = Math.max(comparison.before.amount, comparison.after.amount);

  return (
    <section class={styles.card}>
      <h3 class={styles.head}>{comparison.label}</h3>
      <p class={styles.figure}>
        <span class={styles.number}>{comparison.figure}</span>
        <span class={styles.unit}>{comparison.unit}</span>
      </p>
      <ul class={styles.readings}>
        <Meter
          bar={comparison.before}
          label="Before"
          scale={scale}
          tone={styles.before}
        />
        <Meter
          bar={comparison.after}
          label="After"
          scale={scale}
          tone={styles.after}
        />
      </ul>
      <p class={styles.gain}>{comparison.gain}</p>
    </section>
  );
}

export default function ZigWriteSpeed() {
  return (
    <figure class={styles.chart}>
      <div class={styles.cards}>
        {COMPARISONS.map((comparison) => (
          <Card comparison={comparison} key={comparison.label} />
        ))}
      </div>
      <figcaption class={styles.source}>
        From the benchmark in the public repository, run before and after the
        shared sync on a test store of 50,000 links. The small batches include
        the quarter of links the server turned away as duplicates.
      </figcaption>
    </figure>
  );
}
