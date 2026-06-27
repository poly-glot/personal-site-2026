import { define } from "@/utils/state.ts";
import Header from "@/components/Header/Header.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import SectionEyebrow from "@/components/SectionEyebrow/SectionEyebrow.tsx";
import styles from "./design-system.module.css";

function DsEyebrow(
  { num, label, right, spaced }: {
    num: string;
    label: string;
    right: string;
    spaced?: boolean;
  },
) {
  return (
    <SectionEyebrow
      num={num}
      label={label}
      right={right}
      align="baseline"
      labelStrong
      rightSmall
      numTone="accentBright"
      class={spaced
        ? `${styles.eyebrow} ${styles.eyebrowSpaced}`
        : styles.eyebrow}
    />
  );
}

interface Principle {
  n: string;
  t: string;
  d: string;
}

interface Swatch {
  token: string;
  hex: string;
  chip: string;
  bordered: boolean;
}

interface TypeSpec {
  label: string;
  font: string;
  size: string;
  weight: string;
  lh: string;
  ls: string;
  sample: string;
  sampleClass: string;
}

interface ScaleRung {
  token: string;
  px: string;
  bar: string;
}

interface Pattern {
  t: string;
  d: string;
}

const PRINCIPLES: Principle[] = [
  {
    n: "01",
    t: "Restraint over decoration",
    d: "Whitespace is the loudest element on the page. If a rule, weight, or color isn't load-bearing, remove it.",
  },
  {
    n: "02",
    t: "Editorial, not corporate",
    d: "Treat each page like a longform magazine spread. Headlines balanced, ledes pretty-wrapped, scale set by φ — not by a tailwind preset.",
  },
  {
    n: "03",
    t: "Earned accents",
    d: "Atomic Tangerine never decorates. It marks numerals, italic emphasis in display text, and active interaction state. Three jobs total.",
  },
  {
    n: "04",
    t: "Engineering DNA visible",
    d: "Mono labels, version stamps, inventory counts. The system shows its work — like a well-commented codebase.",
  },
  {
    n: "05",
    t: "Mobile shapes the system",
    d: "Designed mobile-first. Desktop is the same logic, given more room — never a separate layout that ignores small screens.",
  },
  {
    n: "06",
    t: "Motion as punctuation",
    d: "Hovers, expands, and parallax confirm intent. Nothing animates for its own sake. 220ms cubic-bezier(.2,.8,.2,1) is the house ease.",
  },
];

const ACCENT_SWATCHES: Swatch[] = [
  { token: "--accent", hex: "#FF9869", chip: "accent", bordered: false },
  { token: "--accent-fg", hex: "#FFFFFF", chip: "accentFg", bordered: true },
];

const INK_SWATCHES: Swatch[] = [
  { token: "--fg", hex: "#010101", chip: "fg", bordered: false },
  { token: "--bg", hex: "#FFFFFF", chip: "bg", bordered: true },
  { token: "--fg-2", hex: "#404040", chip: "fg2", bordered: false },
  { token: "--bg-2", hex: "#F7F7F6", chip: "bg2", bordered: true },
];

const RULE_SWATCHES: Swatch[] = [
  { token: "--rule", hex: "#E5E6E6", chip: "rule", bordered: false },
  { token: "--rule-2", hex: "#DDDEDE", chip: "rule2", bordered: false },
  { token: "--muted", hex: "#656565", chip: "muted", bordered: false },
  {
    token: "--accent-soft",
    hex: "#FFE8DB",
    chip: "accentSoft",
    bordered: true,
  },
];

const TYPE_SPECS: TypeSpec[] = [
  {
    label: "Display LG",
    font: "Rozha One",
    size: "89px",
    weight: "400",
    lh: "1.02",
    ls: "-1%",
    sample: "At the seam.",
    sampleClass: "typeDisplayLg",
  },
  {
    label: "Display",
    font: "Rozha One",
    size: "55px",
    weight: "400",
    lh: "1.05",
    ls: "",
    sample: "Building trust between engineers and design.",
    sampleClass: "typeDisplay",
  },
  {
    label: "Display SM",
    font: "Rozha One",
    size: "40px",
    weight: "400",
    lh: "1.10",
    ls: "",
    sample: "Selected work, 2000 — 2026.",
    sampleClass: "typeDisplaySm",
  },
  {
    label: "Body XL",
    font: "Roboto",
    size: "34px",
    weight: "500",
    lh: "1.20",
    ls: "",
    sample:
      "Vision, strategy, governance, mentorship — practiced as one craft.",
    sampleClass: "typeXl",
  },
  {
    label: "Body LG",
    font: "Roboto",
    size: "21px",
    weight: "400",
    lh: "1.40",
    ls: "",
    sample:
      "Every interface is a negotiation between the people who build it and the people it serves.",
    sampleClass: "typeLg",
  },
  {
    label: "Body",
    font: "Roboto",
    size: "16px",
    weight: "400",
    lh: "1.60",
    ls: "",
    sample:
      "The default reading size. Long-form paragraphs use this with text-wrap: pretty for clean rags.",
    sampleClass: "typeBody",
  },
  {
    label: "Eyebrow",
    font: "JetBrains Mono",
    size: "13px",
    weight: "500",
    lh: "1.20",
    ls: "14%",
    sample: "01 — Selected work",
    sampleClass: "typeEyebrow",
  },
  {
    label: "Mono Meta",
    font: "JetBrains Mono",
    size: "12px",
    weight: "400",
    lh: "1.40",
    ls: "",
    sample: "v1.0 · 2026 · 06 rules",
    sampleClass: "typeMono",
  },
];

const SCALE_RUNGS: ScaleRung[] = [
  { token: "--s-1", px: "8px", bar: "bar1" },
  { token: "--s-2", px: "13px", bar: "bar2" },
  { token: "--s-3", px: "21px", bar: "bar3" },
  { token: "--s-4", px: "34px", bar: "bar4" },
  { token: "--s-5", px: "55px", bar: "bar5" },
  { token: "--s-6", px: "89px", bar: "bar6" },
  { token: "--s-7", px: "144px", bar: "bar7" },
];

const PATTERNS: Pattern[] = [
  {
    t: "Full-bleed bands",
    d: "Section dividers, banded backgrounds, and closing CTAs all break out of the container with a 100vw absolute pseudo. Content stays gridded; chrome runs edge-to-edge.",
  },
  {
    t: "Numbered sections",
    d: "Every section opens with a mono numeral in accent. Numbers are the table of contents — even when there's no nav.",
  },
  {
    t: "Italic emphasis",
    d: "Display headlines carry one italic phrase in accent. It's the line you'd underline if you were reading aloud.",
  },
  {
    t: "Hover-expand cards",
    d: "Capability and project cards expand on hover to reveal the supporting paragraph. Default state is the whole story in one glance.",
  },
  {
    t: "Sticky filter rail",
    d: "Filter chips dock under the header on scroll. The list re-flows beneath them, keeping the user's tools always within reach.",
  },
  {
    t: "Footer as a closer",
    d: "Pages end on a black band, not a sitemap. The last thing the reader sees is an invitation, not an index.",
  },
];

const DO_RULES: string[] = [
  "Open every section with a numbered eyebrow and a φ-spaced title.",
  "Reserve italic display for the phrase that carries the sentence.",
  "Use the accent on numerals, italics, and active states — nothing else.",
  "Let whitespace do the work; pull padding from the φ scale.",
  "Use mono for any value that's metadata, not prose.",
  "Run section borders full-bleed with content held to the container.",
];

const DONT_RULES: string[] = [
  "Introduce a second accent. The system already has one.",
  "Use Rozha One for body, or Roboto for display.",
  "Stack drop shadows; the system uses hairline rules instead.",
  "Use rounded corners under 14px on cards or above 999px outside pills.",
  "Animate decoratively — every motion confirms an intent.",
  "Mix the φ scale with arbitrary pixel values mid-page.",
];

function ColorGroup(
  { title, swatches }: { title: string; swatches: Swatch[] },
) {
  return (
    <div class={styles.colorGroup}>
      <h4>{title}</h4>
      <div class={styles.swatchGrid}>
        {swatches.map((s) => (
          <div key={s.token} class={styles.swatch}>
            <div
              class={`${styles.swatchChip} ${styles[s.chip]} ${
                s.bordered ? styles.chipBordered : ""
              }`}
            />
            <div class={styles.swatchMeta}>
              <div class={styles.swatchToken}>{s.token}</div>
              <div class={styles.swatchHex}>{s.hex}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default define.page(function DesignSystem() {
  return (
    <>
      <Header active="design-system" />
      <main id="main" class={styles.main}>
        <section class={styles.intro}>
          <div class={styles.introGrid}>
            <div>
              <DsEyebrow
                num="00."
                label="Design System"
                right="v1.0 — 2026"
                spaced
              />
              <h1 class={styles.introTitle}>
                A quiet system, <strong>built on the seam</strong>.
              </h1>
              <p class={styles.introLede}>
                Editorial typography, golden-ratio rhythm, and one accent —
                Atomic Tangerine — earning every appearance. Engineered for the
                seam between disciplines: serious enough for the boardroom, warm
                enough for the studio.
              </p>
            </div>
            <dl class={styles.metaCard}>
              <div class={styles.metaRow}>
                <dt>Foundation</dt>
                <dd>Rozha One · Roboto · JetBrains Mono</dd>
              </div>
              <div class={styles.metaRow}>
                <dt>Rhythm</dt>
                <dd>φ (1.618) modular scale</dd>
              </div>
              <div class={styles.metaRow}>
                <dt>Accent</dt>
                <dd>#FF9869 — used sparingly</dd>
              </div>
              <div class={styles.metaRow}>
                <dt>Modes</dt>
                <dd>Light · Dark</dd>
              </div>
              <div class={styles.metaRow}>
                <dt>Breakpoints</dt>
                <dd>375 / 768 / 1080 / 1280</dd>
              </div>
            </dl>
          </div>
        </section>

        <section class={styles.section}>
          <DsEyebrow num="01." label="Principles" right="06 rules" />
          <h2 class={styles.sectionTitle}>Six rules the system obeys.</h2>
          <p class={styles.sectionLede}>
            Every component on this page exists because of one of these. When a
            new pattern is proposed, it has to point back to a principle — or it
            doesn't ship.
          </p>
          <div class={styles.principles}>
            {PRINCIPLES.map((it) => (
              <div key={it.n} class={styles.principle}>
                <span class={styles.pn}>{it.n}</span>
                <div>
                  <h3>{it.t}</h3>
                  <p>{it.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section class={`${styles.section} ${styles.banded}`}>
          <DsEyebrow num="02." label="Color" right="12 tokens" />
          <h2 class={styles.sectionTitle}>One accent, doing real work.</h2>
          <p class={styles.sectionLede}>
            The palette is intentionally narrow: two neutrals, two surfaces, two
            rules, one ink, one accent. Atomic Tangerine carries every
            interactive cue and italic emphasis — that's why it never has to
            compete with a second hue.
          </p>
          <div class={styles.colorRow}>
            <ColorGroup title="Accent" swatches={ACCENT_SWATCHES} />
            <ColorGroup title="Ink & Surface" swatches={INK_SWATCHES} />
            <ColorGroup title="Rules & Muted" swatches={RULE_SWATCHES} />
          </div>
        </section>

        <section class={styles.section}>
          <DsEyebrow
            num="03."
            label="Typography"
            right="3 families · φ scale"
          />
          <h2 class={styles.sectionTitle}>
            A serif headline, a clean body, a working mono.
          </h2>
          <p class={styles.sectionLede}>
            Rozha One handles every display. Roboto handles every paragraph.
            JetBrains Mono handles labels, eyebrows, version stamps, and
            inventory counts — the system's audit trail. Italic display text is
            reserved for the phrase that carries the weight of the sentence.
          </p>
          <div class={styles.typeList}>
            {TYPE_SPECS.map((r) => (
              <div key={r.label} class={styles.typeRow}>
                <div class={styles.typeMeta}>
                  <strong>{r.label}</strong>
                  <span>{r.font}</span>
                  <span>
                    {r.size} · {r.weight} · lh {r.lh}
                    {r.ls ? ` · ls ${r.ls}` : ""}
                  </span>
                </div>
                <div class={`${styles.typeSample} ${styles[r.sampleClass]}`}>
                  {r.sample}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section class={`${styles.section} ${styles.banded}`}>
          <DsEyebrow num="04." label="Spacing & Rhythm" right="φ = 1.618" />
          <h2 class={styles.sectionTitle}>A Fibonacci scale, end to end.</h2>
          <p class={styles.sectionLede}>
            Every gap, padding, and section break draws from one ladder: 8 · 13
            · 21 · 34 · 55 · 89 · 144. Each rung is roughly φ times the last,
            which is why the page reads as composed rather than stacked. Type
            sizes follow the same series.
          </p>
          <div class={styles.scaleList}>
            {SCALE_RUNGS.map((r) => (
              <div key={r.token} class={styles.scaleRow}>
                <strong>{r.token}</strong>
                <span>{r.px}</span>
                <div class={`${styles.scaleBar} ${styles[r.bar]}`} />
              </div>
            ))}
          </div>
        </section>

        <section class={styles.section}>
          <DsEyebrow num="05." label="Components" right="06 patterns" />
          <h2 class={styles.sectionTitle}>
            The handful of parts that make the whole.
          </h2>
          <p class={styles.sectionLede}>
            Six recurring components carry the entire portfolio. Each shows the
            on-stage state (top) and its purpose (bottom). When a new piece of
            UI is needed, the first question is which of these can stretch.
          </p>
          <div class={styles.compGrid}>
            <div class={styles.comp}>
              <div class={styles.compStage}>
                <div class={styles.demoEyebrow}>
                  <span class={styles.num}>01.</span>
                  <span class={styles.label}>Selected Work</span>
                  <span class={styles.right}>10 / 10</span>
                </div>
              </div>
              <div class={styles.compMeta}>
                <div class={styles.compName}>Section eyebrow</div>
                <div class={styles.compNote}>
                  Numbered label · title · right-aligned meta. Opens every
                  section.
                </div>
              </div>
            </div>

            <div class={styles.comp}>
              <div class={styles.compStage}>
                <span class={styles.demoPill}>
                  <span class={styles.lab}>All</span>
                </span>
                <span class={`${styles.demoPill} ${styles.demoPillActive}`}>
                  <span class={styles.lab}>Strategy</span>
                </span>
              </div>
              <div class={styles.compMeta}>
                <div class={styles.compName}>Filter pill</div>
                <div class={styles.compNote}>
                  Default + active state. Used in portfolio filter bar and tag
                  chips.
                </div>
              </div>
            </div>

            <div class={styles.comp}>
              <div class={styles.compStage}>
                <button type="button" class={styles.demoCta}>
                  Get in touch{" "}
                  <span class={styles.arr} aria-hidden="true">↗</span>
                </button>
              </div>
              <div class={styles.compMeta}>
                <div class={styles.compName}>CTA button</div>
                <div class={styles.compNote}>
                  Reserved for primary action — contact, view case, next
                  project.
                </div>
              </div>
            </div>

            <div class={styles.comp}>
              <div class={styles.compStage}>
                <div class={styles.demoCard}>
                  <div class={styles.demoRow}>
                    <span>Based</span>
                    <span class={styles.demoV}>Toronto, CA</span>
                  </div>
                  <div class={styles.demoRow}>
                    <span>Title</span>
                    <span class={styles.demoV}>Lead Principal Engineer</span>
                  </div>
                  <div class={styles.demoRow}>
                    <span>Open to</span>
                    <span class={styles.demoV}>Senior leadership roles</span>
                  </div>
                </div>
              </div>
              <div class={styles.compMeta}>
                <div class={styles.compName}>Meta card</div>
                <div class={styles.compNote}>
                  22px radius, bg-2 fill, hairline rows. Holds facts: about,
                  project meta, design tokens.
                </div>
              </div>
            </div>

            <div class={styles.comp}>
              <div class={styles.compStage}>
                <div class={styles.demoBand}>
                  <div class={styles.demoBandEyebrow}>
                    <span class={styles.num}>06.</span> Get in touch
                  </div>
                  <div class={styles.demoBandTtl}>
                    Let's <strong>build</strong> something.
                  </div>
                </div>
              </div>
              <div class={styles.compMeta}>
                <div class={styles.compName}>Inverted band</div>
                <div class={styles.compNote}>
                  Black band with accent numerals. Used for section closers and
                  the closing CTA.
                </div>
              </div>
            </div>

            <div class={styles.comp}>
              <div class={styles.compStage}>
                <div class={styles.demoBlob} />
              </div>
              <div class={styles.compMeta}>
                <div class={styles.compName}>Cursor blob</div>
                <div class={styles.compNote}>
                  Soft accent radial that tracks the pointer on hero sections.
                  Always behind type.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class={`${styles.section} ${styles.banded}`}>
          <DsEyebrow num="06." label="Patterns" right="06 conventions" />
          <h2 class={styles.sectionTitle}>
            Recurring moves across the portfolio.
          </h2>
          <p class={styles.sectionLede}>
            Patterns are bigger than components — they describe how parts
            compose into a page. If the home, portfolio, and about pages feel
            like one body of work, it's because they share these.
          </p>
          <div class={styles.patterns}>
            {PATTERNS.map((it) => (
              <div key={it.t} class={styles.pattern}>
                <h4>{it.t}</h4>
                <p>{it.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section class={styles.section}>
          <DsEyebrow num="07." label="Do & Don't" right="guard rails" />
          <h2 class={styles.sectionTitle}>How to keep the system honest.</h2>
          <p class={styles.sectionLede}>
            These are the calls a maintainer should be able to make in five
            seconds. When in doubt, the answer is almost always less.
          </p>
          <div class={styles.rules}>
            <div class={`${styles.rulesCol} ${styles.rulesDo}`}>
              <h4>Do</h4>
              <ul>
                {DO_RULES.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </div>
            <div class={`${styles.rulesCol} ${styles.rulesDont}`}>
              <h4>Don't</h4>
              <ul>
                {DONT_RULES.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section class={styles.cta}>
          <SectionEyebrow
            num="08."
            label="In practice"
            right="see it live"
            align="baseline"
            labelStrong
            rightSmall
            tone="invert"
            class={styles.eyebrow}
          />
          <h1 class={styles.ctaTitle}>
            See the system <strong>doing the work</strong>.
          </h1>
          <p class={styles.ctaCopy}>
            Every rule on this page is load-bearing on the home, portfolio, and
            about pages. Open any of them and the same eyebrows, the same φ
            rhythm, the same single accent are at work — quietly.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
});
