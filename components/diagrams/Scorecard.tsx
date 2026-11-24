import styles from "./chart.module.css";

interface Score {
  label: string;
  value: number;
}

interface Metric {
  label: string;
  value: string;
}

interface Run {
  label: string;
  metrics: readonly Metric[];
  scores: readonly Score[];
}

const RING_RADIUS = 28;

function Gauge({ score }: { score: Score }) {
  return (
    <li class={styles.gauge}>
      <span class={styles.dial}>
        <svg aria-hidden="true" class={styles.ring} viewBox="0 0 64 64">
          <circle class={styles.ringTrack} cx="32" cy="32" r={RING_RADIUS} />
          <circle
            class={styles.ringScore}
            cx="32"
            cy="32"
            pathLength="100"
            r={RING_RADIUS}
            stroke-dasharray={`${score.value} 100`}
          />
        </svg>
        <span class={styles.score}>{score.value}</span>
      </span>
      <span class={styles.gaugeLabel}>{score.label}</span>
    </li>
  );
}

function Metrics({ metrics }: { metrics: readonly Metric[] }) {
  return (
    <dl class={styles.metrics}>
      {metrics.map((metric) => (
        <div class={styles.metric} key={metric.label}>
          <dt class={styles.metricLabel}>{metric.label}</dt>
          <dd class={styles.value}>{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Scorecard(
  { runs, checks, checksLabel = "Checked by hand", source }: {
    checks: readonly Metric[];
    checksLabel?: string;
    runs: readonly Run[];
    source: string;
  },
) {
  return (
    <figure class={styles.scorecard}>
      <div class={styles.runs}>
        {runs.map((run) => (
          <section class={styles.run} key={run.label}>
            <h3 class={styles.runLabel}>{run.label}</h3>
            <ul class={styles.gauges}>
              {run.scores.map((score) => (
                <Gauge key={score.label} score={score} />
              ))}
            </ul>
            <Metrics metrics={run.metrics} />
          </section>
        ))}
        <section class={styles.run}>
          <h3 class={styles.runLabel}>{checksLabel}</h3>
          <Metrics metrics={checks} />
        </section>
      </div>
      <figcaption class={styles.source}>{source}</figcaption>
    </figure>
  );
}
