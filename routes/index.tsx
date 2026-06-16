import { define } from "@/utils/state.ts";
import Shell from "@/components/Shell/Shell.tsx";
import CapabilityCard, {
  type Capability,
} from "@/components/CapabilityCard/CapabilityCard.tsx";
import HeroGridlines from "@/components/HeroGridlines/HeroGridlines.tsx";
import HeroPhoto from "@/islands/HeroPhoto.tsx";
import styles from "./index.module.css";

const CAPABILITIES: Capability[] = [
  {
    num: "01.",
    eyebrow: "VISION",
    title: "shaping the big picture",
    body:
      "anticipates how domains, platforms, and products evolve together, guiding coherent architectural decisions over time.",
  },
  {
    num: "02.",
    eyebrow: "STRATEGY",
    title: "turning strategy into delivery",
    body:
      "translates business intent and platform capabilities into clear, actionable guidance for product and engineering teams.",
  },
  {
    num: "03.",
    eyebrow: "GOVERNANCE",
    title: "reducing risk and fragmentation",
    body:
      "breaks down silos, aligns decisions early, and surfaces cross-cutting risks before they become costly.",
  },
  {
    num: "04.",
    eyebrow: "ENABLEMENT",
    title: "empowering Autonomous Teams",
    body:
      "defines lightweight guardrails and shared principles that allow teams to move fast without losing alignment.",
  },
];

export default define.page(function Home() {
  return (
    <Shell active="home">
      <main id="main" class={styles.stage}>
        <section class={styles.hero}>
          <div class={styles.grid}>
            <div class={styles.left}>
              <div class={styles.eyebrow}>
                <span class={styles.num}>00.</span>
                <span>CAPABILITIES</span>
              </div>
              <h1 class={styles.headline}>
                I am a Solutions Architect, serving as the glue between domains,
                platforms &amp; products.
              </h1>
              <div class={styles.caps}>
                {CAPABILITIES.map((cap, i) => (
                  <CapabilityCard cap={cap} index={i} key={cap.num} />
                ))}
              </div>
            </div>
            <div class={styles.right}>
              <HeroPhoto />
              <HeroGridlines />
              <span class={styles.heroCue} aria-hidden="true">+</span>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
});
