import type { ComponentChildren, JSX } from "preact";
import {
  Chip,
  Database,
  Restart,
  Server,
  Stopwatch,
} from "@/components/Icons/Icons.tsx";
import styles from "./ZigRunning.module.css";

interface Reading {
  amount: number;
  label: string;
  past?: boolean;
  value: string;
}

interface Gauge {
  detail?: ComponentChildren;
  figure: string;
  icon: () => JSX.Element;
  label: string;
  note: string;
  readings: readonly Reading[];
  scale: number;
  unit: string;
}

function Servers() {
  return (
    <div class={styles.servers}>
      <span class={styles.racks}>
        <Server />
        <Server />
      </span>
      <span class={styles.serversText}>
        A cluster of two arm64 servers on Oracle Cloud, shared with my other
        projects, each with 2 virtual processors and 10.6 GiB
      </span>
    </div>
  );
}

const GAUGES: readonly Gauge[] = [
  {
    figure: "18",
    icon: Database,
    label: "Store",
    note:
      "A cache 1.4% the size of the file answers almost every read, since the last restart.",
    readings: [
      { amount: 1.4, label: "Cache in memory, 256 MB", value: "1.4%" },
      { amount: 98.9, label: "Page reads it answers", value: "98.9%" },
    ],
    scale: 100,
    unit: "GB in one file",
  },
  {
    detail: <Servers />,
    figure: "4.6",
    icon: Chip,
    label: "Memory",
    note: "More links will need a larger limit.",
    readings: [
      { amount: 4.6, label: "Used by the database", value: "4.6 GiB" },
    ],
    scale: 5,
    unit: "of a 5 GiB limit",
  },
  {
    figure: "47",
    icon: Restart,
    label: "Restart",
    note:
      "It reads its indexes back from a snapshot file instead of 21 GB of store.",
    readings: [
      { amount: 47, label: "Database serving again", value: "47 s" },
      { amount: 80, label: "Visitors see errors", value: "80 s" },
      {
        amount: 900,
        label: "Before the snapshot file",
        past: true,
        value: "15 min",
      },
    ],
    scale: 900,
    unit: "seconds to serve again",
  },
  {
    figure: "96",
    icon: Stopwatch,
    label: "Search speed",
    note: "Median time inside dmozdb, 12 fixed queries, 23 November 2026.",
    readings: [
      { amount: 96, label: "Ranked search", value: "96 ms" },
      { amount: 27, label: "Narrowed by a country", value: "27 ms" },
      { amount: 3, label: "Category names", value: "3 ms" },
    ],
    scale: 96,
    unit: "ms for a ranked search",
  },
];

function Meter({ reading, scale }: { reading: Reading; scale: number }) {
  return (
    <li class={styles.reading}>
      <span class={styles.readingLabel}>{reading.label}</span>
      <span class={styles.value}>{reading.value}</span>
      <svg
        aria-hidden="true"
        class={styles.track}
        preserveAspectRatio="none"
        viewBox={`0 0 ${scale} 1`}
      >
        <rect class={styles.rail} height="1" width={scale} />
        <rect
          class={reading.past ? styles.past : styles.fill}
          height="1"
          width={reading.amount}
        />
      </svg>
    </li>
  );
}

function Tile({ gauge }: { gauge: Gauge }) {
  const Icon = gauge.icon;

  return (
    <section class={styles.tile}>
      <h3 class={styles.head}>
        <span class={styles.badge}>
          <Icon />
        </span>
        {gauge.label}
      </h3>
      <p class={styles.figure}>
        <span class={styles.number}>{gauge.figure}</span>
        <span class={styles.unit}>{gauge.unit}</span>
      </p>
      <div class={styles.body}>
        <ul class={styles.readings}>
          {gauge.readings.map((reading) => (
            <Meter key={reading.label} reading={reading} scale={gauge.scale} />
          ))}
        </ul>
        {gauge.detail}
      </div>
      <p class={styles.note}>{gauge.note}</p>
    </section>
  );
}

export default function ZigRunning() {
  return (
    <div class={`${styles.band} bleed-panel`} data-theme="dark">
      <div class={styles.tiles}>
        {GAUGES.map((gauge) => <Tile gauge={gauge} key={gauge.label} />)}
      </div>
    </div>
  );
}
