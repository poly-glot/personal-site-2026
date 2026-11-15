import { createContext } from "preact";
import { useContext } from "preact/hooks";
import type { ComponentChildren } from "preact";
import SectionEyebrow from "@/components/SectionEyebrow/SectionEyebrow.tsx";
import { CONTACT_EMAIL } from "@/src/nav.ts";
import styles from "./about.module.css";

interface AboutCounter {
  n: number;
  band: number;
}

const CounterContext = createContext<AboutCounter>({ n: 0, band: 0 });
const InsideTwoColumn = createContext<boolean>(false);

function pad(n: number): string {
  return `${String(n).padStart(2, "0")}.`;
}

function Eyebrow(
  { n, label, right, invert }: {
    n: string;
    label: string;
    right?: string;
    invert?: boolean;
  },
) {
  return (
    <SectionEyebrow
      num={n}
      label={label}
      right={right}
      variant="sans"
      align="baseline"
      numTone="muted"
      rule={false}
      tone={invert ? "invert" : "default"}
      class={styles.eyebrow}
    />
  );
}

export function AboutSections({ children }: { children: ComponentChildren }) {
  const counter: AboutCounter = { n: 0, band: 0 };

  return (
    <CounterContext.Provider value={counter}>
      {children}
    </CounterContext.Provider>
  );
}

export function Section(
  { eyebrow, right, children }: {
    eyebrow: string;
    right?: string;
    children: ComponentChildren;
  },
) {
  const counter = useContext(CounterContext);
  const insideTwo = useContext(InsideTwoColumn);
  const n = pad(counter.n++);

  if (insideTwo) {
    return (
      <div>
        <Eyebrow n={n} label={eyebrow} right={right} />
        {children}
      </div>
    );
  }

  const banded = counter.band++ % 2 === 1;

  return (
    <section
      class={banded
        ? `${styles.section} ${styles.banded} bleed-panel`
        : `${styles.section} bleed-panel`}
    >
      <Eyebrow n={n} label={eyebrow} right={right} />
      {children}
    </section>
  );
}

export function TwoColumn({ children }: { children: ComponentChildren }) {
  const counter = useContext(CounterContext);
  const banded = counter.band++ % 2 === 1;
  const cls = banded
    ? `${styles.section} ${styles.two} ${styles.banded} bleed-panel`
    : `${styles.section} ${styles.two} bleed-panel`;

  return (
    <InsideTwoColumn.Provider value>
      <section class={cls}>{children}</section>
    </InsideTwoColumn.Provider>
  );
}

export function Intro({ children }: { children: ComponentChildren }) {
  const counter = useContext(CounterContext);
  counter.n++;

  return (
    <section class={styles.intro}>
      <div class={styles.introGrid}>{children}</div>
    </section>
  );
}

export function IntroText({ children }: { children: ComponentChildren }) {
  return <div class={styles.introText}>{children}</div>;
}

const PORTRAIT_CROSSES = [
  styles.crossA,
  styles.crossB,
  styles.crossC,
  styles.crossD,
];

export function Portrait() {
  return (
    <figure class={styles.portrait}>
      {PORTRAIT_CROSSES.map((cross) => (
        <span
          class={`${styles.cross} ${cross}`}
          aria-hidden="true"
          key={cross}
        />
      ))}
      <picture>
        <source srcset="/img/junaid.webp" type="image/webp" />
        <img
          class={styles.portraitImg}
          src="/img/junaid.png"
          alt="Junaid Ahmed, standing with a laptop under his arm"
          width="848"
          height="1264"
          decoding="async"
        />
      </picture>
    </figure>
  );
}

export function Title({ children }: { children: ComponentChildren }) {
  return <h1 class={styles.introTitle}>{children}</h1>;
}

export function Line({ children }: { children: ComponentChildren }) {
  return <span class={styles.line}>{children}</span>;
}

export function Lede({ children }: { children: ComponentChildren }) {
  return <p class={styles.introLede}>{children}</p>;
}

export function Facts({ children }: { children: ComponentChildren }) {
  return (
    <aside class={styles.factsCell}>
      <dl class={`${styles.facts} bleed-divider-top`}>{children}</dl>
    </aside>
  );
}

export function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div class={`${styles.fact} bleed-divider`}>
      <dt>{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}

export function Biography(
  { eyebrow, children }: { eyebrow: string; children: ComponentChildren },
) {
  return (
    <Section eyebrow={eyebrow}>
      <div class={styles.bio}>{children}</div>
    </Section>
  );
}

export function Bio({ children }: { children: ComponentChildren }) {
  return <div class={styles.bioProse}>{children}</div>;
}

export function BioMore({ children }: { children: ComponentChildren }) {
  return (
    <details class={styles.bioMore}>
      <summary class={styles.bioMoreToggle}>
        <span class={styles.bioMoreShow}>Read more</span>
        <span class={styles.bioMoreHide}>Read less</span>
      </summary>
      {children}
    </details>
  );
}

export function Link(
  { href, children }: { href: string; children: ComponentChildren },
) {
  const external = href.startsWith("http");

  return (
    <a
      class={styles.link}
      href={href}
      rel={external ? "noopener" : undefined}
      target={external ? "_blank" : undefined}
    >
      {children}
    </a>
  );
}

export function Pullquote(
  { cite, children }: { cite: string; children: ComponentChildren },
) {
  return (
    <figure class={styles.pullquote}>
      <blockquote>{children}</blockquote>
      <figcaption>
        <span class={styles.pullRule} />
        <span>{cite}</span>
      </figcaption>
    </figure>
  );
}

export function Values({ children }: { children: ComponentChildren }) {
  return <ol class={`${styles.values} bleed-divider-top`}>{children}</ol>;
}

export function Value(
  { word, axis, children }: {
    word: string;
    axis: string;
    children: ComponentChildren;
  },
) {
  return (
    <li class={`${styles.value} bleed-divider`}>
      <span class={styles.valueNum} />
      <span class={styles.valueHead}>
        <span class={styles.valueWord}>{word}</span>
        <span class={styles.valueAxis}>{axis}</span>
      </span>
      <span class={styles.valueNote}>{children}</span>
    </li>
  );
}

export function Personality({ children }: { children: ComponentChildren }) {
  return <div class={styles.sliders}>{children}</div>;
}

export function Trait(
  { left, right, value }: { left: string; right: string; value: number },
) {
  return (
    <div class={styles.slider}>
      <div class={styles.sliderLabels}>
        <span>{left}</span>
        <span class={styles.right}>{right}</span>
      </div>
      <div class={styles.sliderTrack}>
        <div class={`${styles.sliderFill} ${styles[`fill${value}`]}`} />
        <div class={`${styles.sliderKnob} ${styles[`knob${value}`]}`} />
      </div>
    </div>
  );
}

export function Goals({ children }: { children: ComponentChildren }) {
  return (
    <div class={styles.goalBlock}>
      <h3>Goals</h3>
      <ul>{children}</ul>
    </div>
  );
}

export function PainPoints({ children }: { children: ComponentChildren }) {
  return (
    <div class={styles.goalBlock}>
      <h3>Pain points</h3>
      <ul>{children}</ul>
    </div>
  );
}

export function Timeline(
  { eyebrow, right, children }: {
    eyebrow: string;
    right?: string;
    children: ComponentChildren;
  },
) {
  return (
    <Section eyebrow={eyebrow} right={right}>
      <ol class={styles.timeline}>{children}</ol>
    </Section>
  );
}

type Pillar = "Vision" | "Strategy" | "Governance" | "Enablement";

export function Role(
  { years, title, org, children }: {
    years: string;
    title: string;
    org: string;
    children: ComponentChildren;
  },
) {
  return (
    <li class={`${styles.tlItem} bleed-divider`}>
      <span class={styles.tlYear}>{years}</span>
      <div class={styles.tlBody}>
        <h3>{title}</h3>
        <p class={styles.tlOrg}>{org}</p>
        <ul class={styles.achievements}>{children}</ul>
      </div>
    </li>
  );
}

export function Achievement(
  { pillar, children }: { pillar?: Pillar; children: ComponentChildren },
) {
  if (!pillar) {
    return (
      <li class={`${styles.achievement} ${styles.achievementPlain}`}>
        <p class={styles.achievementText}>{children}</p>
      </li>
    );
  }

  return (
    <li class={styles.achievement}>
      <span class={styles.pillar}>{pillar}</span>
      <p class={styles.achievementText}>{children}</p>
    </li>
  );
}

export function Contact(
  { eyebrow, children }: { eyebrow: string; children: ComponentChildren },
) {
  const counter = useContext(CounterContext);
  const n = pad(counter.n++);

  return (
    <section class={`${styles.section} ${styles.cta} bleed-panel`}>
      <Eyebrow n={n} label={eyebrow} invert />
      <h2 class={styles.ctaTitle}>
        If any of this lands,<br />
        <strong>the inbox is open.</strong>
      </h2>
      <ul class={styles.ctaList}>
        <li>
          <a href={`mailto:${CONTACT_EMAIL}`}>
            <span>{CONTACT_EMAIL}</span>
            <span class={styles.ctaMeta}>Email</span>
          </a>
        </li>
        {children}
      </ul>
    </section>
  );
}

export function ContactLink(
  { href, meta, external, children }: {
    href: string;
    meta: string;
    external?: boolean;
    children: ComponentChildren;
  },
) {
  return (
    <li>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener" : undefined}
      >
        <span>{children}</span>
        <span class={styles.ctaMeta}>{meta}</span>
      </a>
    </li>
  );
}

export const aboutComponents = {
  a: Link,
  AboutSections,
  Intro,
  IntroText,
  Portrait,
  Title,
  Line,
  Lede,
  Facts,
  Fact,
  Section,
  Biography,
  TwoColumn,
  Bio,
  BioMore,
  Pullquote,
  Values,
  Value,
  Personality,
  Trait,
  Goals,
  PainPoints,
  Timeline,
  Role,
  Achievement,
  Contact,
  ContactLink,
};
