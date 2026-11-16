import { define } from "@/utils/state.ts";
import Shell from "@/components/Shell/Shell.tsx";
import { CaseBand, CaseCard } from "@/components/CaseStudies/CaseStudies.tsx";
import Lightbox from "@/islands/Lightbox.tsx";
import DisclosureToggle from "@/islands/DisclosureToggle.tsx";
import { getProject } from "@/data/content.ts";
import { CONTACT_EMAIL } from "@/src/nav.ts";
import styles from "./index.module.css";

interface Capability {
  num: string;
  label: string;
  hint: string;
  body: string;
}

const CAPABILITIES: Capability[] = [
  {
    num: "01",
    label: "Vision",
    hint: "shaping the big picture",
    body:
      "Anticipates how domains, platforms, and products evolve together, guiding coherent architectural decisions over time.",
  },
  {
    num: "02",
    label: "Strategy",
    hint: "turning strategy into delivery",
    body:
      "Translates business intent and platform capabilities into clear, actionable guidance for product and engineering teams.",
  },
  {
    num: "03",
    label: "Governance",
    hint: "reducing risk and fragmentation",
    body:
      "Breaks down silos, aligns decisions early, and surfaces cross-cutting risks before they become costly.",
  },
  {
    num: "04",
    label: "Enablement",
    hint: "empowering autonomous teams",
    body:
      "Defines lightweight guardrails and shared principles that allow teams to move fast without losing alignment.",
  },
];

const HOW_I_WORK_ID = "how-i-work";

const FEATURED_IDS = ["azadi-go", "hooklab"];

const FEATURED = FEATURED_IDS
  .map(getProject)
  .filter((project) => project !== null);

export default define.page(function Home() {
  return (
    <Shell active="home">
      <main id="main" class={styles.stage}>
        <section class={styles.hero}>
          <div class={`container ${styles.heroGrid}`}>
            <h1 class={styles.headline}>
              I am a Solutions Architect, serving as the <em>glue</em>{" "}
              between domains, platforms &amp; products.
            </h1>
            <div class={styles.aside}>
              <p class={styles.lede}>
                I bring <strong>vision</strong> to how they grow together,{" "}
                <strong>strategy</strong>{" "}
                that product and engineering teams can actually deliver,{" "}
                <strong>governance</strong>{" "}
                that catches risk while it's still cheap, and{" "}
                <strong>enablement</strong>{" "}
                that lets autonomous teams move quickly without drifting apart.
              </p>
              <div class={styles.actions}>
                <a class={styles.cta} href={`mailto:${CONTACT_EMAIL}`}>
                  <span class={styles.dot} aria-hidden="true" />
                  <span class={styles.ctaLabel}>
                    Start a conversation
                    <svg
                      class={styles.arrow}
                      viewBox="0 0 16 16"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      aria-hidden="true"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </a>
                <DisclosureToggle controls={HOW_I_WORK_ID} label="How I work" />
              </div>
            </div>
          </div>
        </section>

        <section
          id={HOW_I_WORK_ID}
          class={styles.howIWork}
          data-open="false"
          aria-label="How I work"
        >
          <div class={styles.howIWorkInner}>
            <div class={styles.howIWorkSpacer}>
              <div class={styles.howIWorkRows}>
                {CAPABILITIES.map((cap) => (
                  <details
                    class={styles.capability}
                    name="capability"
                    open={cap.num === "01"}
                    key={cap.num}
                  >
                    <summary class={`container ${styles.row}`}>
                      <span class={styles.num}>{cap.num}</span>
                      <span class={styles.label}>{cap.label}</span>
                      <span class={styles.hint}>{cap.hint}</span>
                      <span class={styles.glyph} aria-hidden="true" />
                    </summary>
                    <div class="container">
                      <p class={styles.body}>{cap.body}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section class={styles.work} aria-label="Selected work">
          <CaseBand fill>
            {FEATURED.map((project, i) => (
              <CaseCard index={i} project={project} key={project.id} />
            ))}
          </CaseBand>
        </section>
        <Lightbox />
      </main>
    </Shell>
  );
});
