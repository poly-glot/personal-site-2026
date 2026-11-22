import { createContext, Fragment, h } from "preact";
import { useContext } from "preact/hooks";
import type { ComponentChildren } from "preact";
import SectionEyebrow from "@/components/SectionEyebrow/SectionEyebrow.tsx";
import BoardScroller from "@/islands/BoardScroller.tsx";
import styles from "./study.module.css";

interface StudyCounter {
  chapter: number;
}

interface Slot {
  children: ComponentChildren;
}

interface Picture {
  alt: string;
  h: number;
  src: string;
  w: number;
}

const CounterContext = createContext<StudyCounter>({ chapter: 0 });

function classes(...names: (string | false | undefined)[]): string {
  return names.filter(Boolean).join(" ");
}

function Plate({ alt, h, src, w }: Picture) {
  return (
    <a class={styles.zoom} href={src} data-zoom>
      <img
        class={styles.plate}
        src={src}
        alt={alt}
        width={w}
        height={h}
        loading="lazy"
        decoding="async"
      />
    </a>
  );
}

export function Study({ children }: Slot) {
  const counter: StudyCounter = { chapter: 0 };

  return (
    <CounterContext.Provider value={counter}>
      {children}
    </CounterContext.Provider>
  );
}

interface ChapterOpening {
  lede?: string;
  split?: boolean;
  title: string;
}

function Opening({ lede, split, title }: ChapterOpening) {
  const heading = <h2 class={`${styles.title} display`}>{title}</h2>;
  const standfirst = lede && (
    <p class={styles.lede}>{keepLastWordsTogether(lede)}</p>
  );

  if (!split) return <>{heading}{standfirst}</>;

  return <div class={styles.opening}>{heading}{standfirst}</div>;
}

export function Chapter(
  { label, title, lede, dark, split, children }: Slot & ChapterOpening & {
    dark?: boolean;
    label: string;
  },
) {
  const counter = useContext(CounterContext);
  counter.chapter++;

  const banded = counter.chapter % 2 === 0;
  const tone = dark ? styles.dark : banded && styles.banded;

  return (
    <section
      class={classes(styles.chapter, tone, "bleed-panel")}
      data-theme={dark ? "dark" : undefined}
    >
      <SectionEyebrow
        num={`${String(counter.chapter).padStart(2, "0")}.`}
        label={label}
        variant="sans"
        align="baseline"
        numTone="muted"
        rule={false}
        class={styles.eyebrow}
      />
      <Opening lede={lede} split={split} title={title} />
      <div class={styles.body}>{children}</div>
    </section>
  );
}

export function Split({ reverse, children }: Slot & { reverse?: boolean }) {
  return (
    <div class={classes(styles.split, reverse && styles.reverse)}>
      {children}
    </div>
  );
}

export function Facts({ children }: Slot) {
  return <dl class={styles.facts}>{children}</dl>;
}

export function Fact({ k, children }: Slot & { k: string }) {
  return (
    <div class={styles.fact}>
      <dt class={styles.label}>{k}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export function Rows({ children }: Slot) {
  return <ul class={styles.cards}>{children}</ul>;
}

const LAST_SPACE = / (?=\S+$)/;

function keepLastWordsTogether(children: ComponentChildren): ComponentChildren {
  return typeof children === "string"
    ? children.replace(LAST_SPACE, " ")
    : children;
}

export function Row({ title, children }: Slot & { title: string }) {
  return (
    <li class={styles.card}>
      <span class={styles.cardNumber} aria-hidden="true" />
      <h3 class={`${styles.heading} display`}>{title}</h3>
      <p class={styles.note}>{keepLastWordsTogether(children)}</p>
    </li>
  );
}

export function Figures(
  { numbered, bleed, quartered, children }: Slot & {
    bleed?: boolean;
    numbered?: boolean;
    quartered?: boolean;
  },
) {
  const grid = classes(
    styles.figures,
    numbered && styles.numbered,
    bleed && `${styles.bleed} bleed-rule`,
    quartered && styles.quartered,
  );

  return (
    <div class={grid}>
      {children}
    </div>
  );
}

const PHONE_SCREEN = { w: 780, h: 1328 };

interface PhonePair {
  phone?: string;
  phoneAlt?: string;
}

function Shot({ phone, phoneAlt = "", ...picture }: Picture & PhonePair) {
  if (!phone) return <Plate {...picture} />;

  return (
    <div class={styles.pair}>
      <Plate {...picture} />
      <Plate
        src={phone}
        alt={phoneAlt}
        w={PHONE_SCREEN.w}
        h={PHONE_SCREEN.h}
      />
    </div>
  );
}

export function Figure(
  { title, meta, wide, tile, children, ...shot }:
    & Picture
    & PhonePair
    & {
      children?: ComponentChildren;
      meta?: string;
      tile?: boolean;
      title?: string;
      wide?: boolean;
    },
) {
  const span = classes(styles.figure, wide && styles.wide, tile && styles.tile);

  return (
    <figure class={span}>
      <Shot {...shot} />
      <figcaption class={styles.caption}>
        {title && (
          <span class={styles.captionHead}>
            <span class={`${styles.heading} display`}>{title}</span>
            {meta && <span class={styles.meta}>{meta}</span>}
          </span>
        )}
        {children && <span class={styles.note}>{children}</span>}
      </figcaption>
    </figure>
  );
}

type ScreenSize = "feature" | "lead" | "phone";

const SCREEN_SIZES: Record<ScreenSize, string> = {
  feature: styles.feature,
  lead: styles.lead,
  phone: styles.phone,
};

export function Board({ children }: Slot) {
  return (
    <div class={`${styles.boardFrame} bleed-rule`}>
      <BoardScroller class={styles.board}>{children}</BoardScroller>
    </div>
  );
}

export function Screen(
  { alt, h, size, src, w }: Picture & { size?: ScreenSize },
) {
  return (
    <a
      class={classes(styles.screen, size && SCREEN_SIZES[size])}
      data-zoom
      href={src}
    >
      <img
        alt={alt}
        class={styles.screenImage}
        decoding="async"
        height={h}
        loading="lazy"
        src={src}
        width={w}
      />
    </a>
  );
}

export function Eras({ children }: Slot) {
  return <ol class={`${styles.eras} bleed-divider-top`}>{children}</ol>;
}

export function Era(
  { period, title, meta, children, ...picture }: Slot & Picture & {
    meta: string;
    period: string;
    title: string;
  },
) {
  return (
    <li class={`${styles.era} bleed-divider`}>
      <div class={styles.eraText}>
        <span class={styles.period}>{period}</span>
        <div class={styles.eraBody}>
          <h3 class={`${styles.heading} display`}>{title}</h3>
          <p class={styles.label}>{meta}</p>
          <ul class={styles.points}>{children}</ul>
        </div>
      </div>
      <Plate {...picture} />
    </li>
  );
}

export function Point({ tag, children }: Slot & { tag: string }) {
  return (
    <li class={styles.point}>
      <span class={styles.label}>{tag}</span>
      <p>{children}</p>
    </li>
  );
}

export function List({ children }: Slot) {
  return <ul class={styles.list}>{children}</ul>;
}

export function Item({ title, children }: Slot & { title: string }) {
  return (
    <li class={styles.item}>
      <strong>{title}</strong> {children}
    </li>
  );
}

export function Steps({ children }: Slot) {
  return <ol class={styles.steps}>{children}</ol>;
}

export function Step(
  { name, hint, open, children }: Slot & {
    hint: string;
    name: string;
    open?: boolean;
  },
) {
  return (
    <li class={styles.step}>
      <details class={styles.stepDetails} open={open}>
        <summary class={styles.stepHead}>
          <span class={styles.stepNumber} aria-hidden="true" />
          <span class={`${styles.heading} display`}>{name}</span>
          <span class={styles.stepHint}>{hint}</span>
          <span class={styles.stepGlyph} aria-hidden="true" />
        </summary>
        {h("p", {
          class: `${styles.note} ${styles.stepBody}`,
        }, keepLastWordsTogether(children))}
      </details>
    </li>
  );
}

interface FanPicture extends Picture {
  label: string;
}

type FanPosition = "first" | "middle" | "last";

function fanPosition(index: number, count: number): FanPosition {
  if (index === 0) return "first";
  if (index === count - 1) return "last";

  return "middle";
}

export function Fanout(
  { source, targets }: { source: FanPicture; targets: FanPicture[] },
) {
  return (
    <figure class={styles.fanout}>
      <div class={styles.fanSource}>
        <Plate {...source} />
        <span class={styles.fanLabel}>{source.label}</span>
      </div>
      {targets.map((target, index) => (
        <Fragment key={target.src}>
          <span
            aria-hidden="true"
            class={styles.fanJoint}
            data-position={fanPosition(index, targets.length)}
          />
          <div class={styles.fanTarget}>
            <Plate {...target} />
          </div>
          {index < targets.length - 1 && (
            <span aria-hidden="true" class={styles.fanBus} />
          )}
          <span class={`${styles.fanLabel} ${styles.fanTargetLabel}`}>
            {target.label}
          </span>
        </Fragment>
      ))}
    </figure>
  );
}

export function Sites({ title, children }: Slot & { title: string }) {
  return (
    <div class={styles.sites}>
      <h3 class={`${styles.heading} display`}>{title}</h3>
      <ul class={styles.siteList}>{children}</ul>
    </div>
  );
}

export function Site(
  { name, href, src, w, h }: Omit<Picture, "alt"> & {
    href: string;
    name: string;
  },
) {
  return (
    <li>
      <a class={styles.site} href={href}>
        <img
          alt={`${name} case study`}
          class={styles.plate}
          decoding="async"
          height={h}
          loading="lazy"
          src={src}
          width={w}
        />
      </a>
    </li>
  );
}

export function Closing({ label, children }: Slot & { label: string }) {
  return (
    <section class="port-foot bleed-panel">
      <div class="port-foot-inner">
        <SectionEyebrow num="·" label={label} rule="bleed" tone="invert" />
        {children}
      </div>
    </section>
  );
}

export function ClosingCopy({ children }: Slot) {
  return <p class="port-foot-copy">{children}</p>;
}

export function ClosingLinks({ children }: Slot) {
  return <div class={`${styles.closingLinks} port-foot-links`}>{children}</div>;
}

export function ClosingLink(
  { href, external, children }: Slot & { href: string; external?: boolean },
) {
  return (
    <a
      class="port-foot-link"
      href={href}
      rel={external ? "noopener" : undefined}
      target={external ? "_blank" : undefined}
    >
      {children}
    </a>
  );
}

export const studyComponents = {
  Study,
  Chapter,
  Split,
  Facts,
  Fact,
  Rows,
  Row,
  Figures,
  Figure,
  Board,
  Screen,
  Eras,
  Era,
  Point,
  List,
  Item,
  Steps,
  Step,
  Fanout,
  Sites,
  Site,
  Closing,
  ClosingCopy,
  ClosingLinks,
  ClosingLink,
};
