import { define } from "@/utils/state.ts";
import { CONTACT_EMAIL } from "@/src/nav.ts";
import Header from "@/components/Header/Header.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import styles from "./about.module.css";

interface Fact {
  k: string;
  v: string;
}

interface ValueItem {
  word: string;
  note: string;
}

interface Trait {
  left: string;
  right: string;
  value: number;
}

interface Milestone {
  year: string;
  role: string;
  org: string;
  note: string;
}

const FACTS: Fact[] = [
  { k: "BASED", v: "London, UK" },
  { k: "TITLE", v: "Solutions Architect" },
  { k: "EXPERIENCE", v: "Since 2001" },
  { k: "CURRENTLY", v: "ITG Connect" },
  { k: "STATUS", v: "Happy at ITG" },
];

const VALUES: ValueItem[] = [
  {
    word: "Agile",
    note:
      "Ship in slices. Shipped and good enough beats perfect and pending. Strangler-fig over rip-and-replace.",
  },
  {
    word: "Analytical",
    note:
      "Quantify capacity in hours per quarter. Catch planned-versus-actual drift before it compounds.",
  },
  {
    word: "Adaptable",
    note:
      "When strategy reverses, hold the principles and iterate the execution.",
  },
  {
    word: "Polyglot",
    note:
      "TypeScript, Java, Python, Go, and three human languages. The handle's poly-glot for a reason.",
  },
  {
    word: "Force multiplier",
    note:
      "Scale the team's capability, not my own availability. The old '18/24' default had to go.",
  },
];

const PERSONALITY: Trait[] = [
  { left: "Hands-on", right: "Strategic", value: 74 },
  { left: "Direct feedback", right: "Diplomatic", value: 32 },
  { left: "Pragmatist", right: "Idealist", value: 28 },
  { left: "Incremental", right: "Foundational", value: 62 },
  { left: "Solo focus", right: "Team enabler", value: 82 },
];

const TIMELINE: Milestone[] = [
  {
    year: "2025",
    role: "Lead / Principal Engineer",
    org: "ITG Connect",
    note: "Boston principles. Luma DAM consolidation. ADR culture.",
  },
  {
    year: "2022",
    role: "Development Lead",
    org: "ITG Connect",
    note: "Smart Tagging. Morpheus task model. Multi-tenant Luma Proxy.",
  },
  {
    year: "2018",
    role: "CTO",
    org: "The LVG",
    note: "Founding tech. Hired, built, shipped.",
  },
  {
    year: "Now",
    role: "Open source",
    org: "github.com/poly-glot",
    note: "OpenGuessr · HookLab · Amazing Landing · ECH UK.",
  },
];

const GOALS: string[] = [
  "Make the right architecture the default: guardrails in the platform, not rules in a doc.",
  "Treat developer velocity as a business metric, measured built-to-released rather than spec-to-built.",
  "Distribute leadership by design. Build the pipeline instead of keeping a list of names I sponsor.",
];

const PAIN_POINTS: string[] = [
  "Containing the blast radius of a strategy pivot: keeping the core stable while the business experiments, without stalling the team's momentum.",
  "Reading a systems problem as a people problem. When output stalls, it's usually the design, not the person. The fix is intent and guardrails, not running delivery.",
];

export default define.page(function About() {
  return (
    <>
      <Header active="about" />
      <main id="main" class={styles.main}>
        <section class={styles.intro}>
          <div class={styles.eyebrow}>
            <span class={`${styles.num} ${styles.numAccent}`}>00.</span>
            <span class={styles.label}>About</span>
            <span class={styles.right}>JUNAID AHMED</span>
          </div>
          <div class={styles.introGrid}>
            <div class={styles.introText}>
              <h1 class={styles.introTitle}>
                <span class={styles.line}>A solutions architect,</span>
                <span class={styles.line}>working at the seam between</span>
                <span class={styles.line}>
                  domains, platforms{" "}
                  <strong class={styles.introTitleEm}>&amp; products.</strong>
                </span>
              </h1>
              <p class={styles.introLede}>
                Architectural failure doesn't happen in isolation; it happens at
                the intersection of domains. When separate teams build separate
                services, the contract between them is often left unmanaged. I
                specialize in owning those integration points, ensuring seamless
                collaboration and resilient system design.
              </p>
            </div>
            <aside class={styles.introMeta}>
              <dl class={styles.facts}>
                {FACTS.map((f) => (
                  <div key={f.k} class={styles.fact}>
                    <dt>{f.k}</dt>
                    <dd>{f.v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <section class={styles.section}>
          <div class={styles.eyebrow}>
            <span class={styles.num}>01.</span>
            <span class={styles.label}>Biography</span>
          </div>
          <div class={styles.bio}>
            <div class={styles.bioProse}>
              <p>
                Currently lead at ITG Connect; before that, CTO at The LVG. A
                decade in, one lesson holds: platform-team outcomes{" "}
                <strong>are</strong>{" "}
                consuming-team outcomes. If the teams downstream of what you
                ship don't move faster or break less often, you didn't deliver,
                no matter what got merged.
              </p>
              <p>
                The way I work has changed. Ten years ago I called myself
                "18/24": always on, always reachable. The job stopped rewarding
                that. The shift has been from{" "}
                <strong>scaling myself by being everywhere at once</strong> to
                {" "}
                <strong>
                  scaling the team so they don't need me in the room
                </strong>.
              </p>
              <p>
                Principal engineers don't need scaffolding. They need a clear
                mandate, sponsorship into rooms they can't get into alone, and
                honest feedback when the impact's below the bar.
              </p>
              <p>
                I write principles down so they can be enforced, not admired. No
                statefulness. Backward-compatible migrations. Tests aren't
                optional. The build fails without them. Gates, not guidelines.
                The principles are foundational; the execution, incremental.
              </p>
            </div>
            <figure class={styles.pullquote}>
              <blockquote>
                A standard becomes real the moment it's enforced on something
                shipping, not the moment it's written down.
              </blockquote>
              <figcaption>
                <span class={styles.pullRule} />
                <span>Lead Principal Interview, 2026</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section class={`${styles.section} ${styles.banded}`}>
          <div class={styles.eyebrow}>
            <span class={styles.num}>02.</span>
            <span class={styles.label}>Values</span>
            <span class={styles.right}>Five words</span>
          </div>
          <ol class={styles.values}>
            {VALUES.map((v, i) => (
              <li key={v.word} class={styles.value}>
                <span class={styles.valueNum}>0{i + 1}</span>
                <span class={styles.valueWord}>{v.word}</span>
                <span class={styles.valueNote}>{v.note}</span>
              </li>
            ))}
          </ol>
        </section>

        <section class={`${styles.section} ${styles.two}`}>
          <div class={styles.personality}>
            <div class={styles.eyebrow}>
              <span class={styles.num}>03.</span>
              <span class={styles.label}>Personality</span>
            </div>
            <div class={styles.sliders}>
              {PERSONALITY.map((p) => (
                <div key={p.left} class={styles.slider}>
                  <div class={styles.sliderLabels}>
                    <span>{p.left}</span>
                    <span class={styles.right}>{p.right}</span>
                  </div>
                  <div class={styles.sliderTrack}>
                    <div
                      class={`${styles.sliderFill} ${styles[`fill${p.value}`]}`}
                    />
                    <div
                      class={`${styles.sliderKnob} ${styles[`knob${p.value}`]}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div class={styles.goals}>
            <div class={styles.eyebrow}>
              <span class={styles.num}>04.</span>
              <span class={styles.label}>Goals · Pain points</span>
            </div>
            <div class={styles.goalBlock}>
              <h3>Goals</h3>
              <ul>
                {GOALS.map((g) => <li key={g}>{g}</li>)}
              </ul>
            </div>
            <div class={styles.goalBlock}>
              <h3>Pain points</h3>
              <ul>
                {PAIN_POINTS.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section class={`${styles.section} ${styles.banded}`}>
          <div class={styles.eyebrow}>
            <span class={styles.num}>05.</span>
            <span class={styles.label}>Trajectory</span>
          </div>
          <ol class={styles.timeline}>
            {TIMELINE.map((t) => (
              <li key={t.role + t.year} class={styles.tlItem}>
                <span class={styles.tlYear}>{t.year}</span>
                <div class={styles.tlBody}>
                  <h3>{t.role}</h3>
                  <p class={styles.tlOrg}>{t.org}</p>
                  <p class={styles.tlNote}>{t.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section class={`${styles.section} ${styles.cta}`}>
          <div class={styles.eyebrow}>
            <span class={styles.num}>06.</span>
            <span class={styles.label}>Get in touch</span>
          </div>
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
            <li>
              <a
                href="https://github.com/poly-glot/"
                target="_blank"
                rel="noopener"
              >
                <span>github.com/poly-glot</span>
                <span class={styles.ctaMeta}>Code &amp; experiments</span>
              </a>
            </li>
            <li>
              <a href="/work/">
                <span>Selected work</span>
                <span class={styles.ctaMeta}>Case studies</span>
              </a>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
});
