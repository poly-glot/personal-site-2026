import { CONTACT_EMAIL } from "@/src/nav.ts";
import styles from "./WorkOutro.module.css";

export default function WorkOutro() {
  return (
    <section class={styles.foot}>
      <div class={styles.footInner}>
        <div class="section-eyebrow">
          <span class="num accent">03.</span>
          <span>What's next</span>
          <span class={styles.footSpacer} />
          <span class="mono">Open to roles</span>
        </div>
        <p class={styles.footCopy}>
          Currently scoping a <strong>Lead Principal</strong>{" "}
          role focused on platform durability, ADR culture, and turning
          principles into enforceable build-time gates.
        </p>
        <a class={styles.footCta} href={`mailto:${CONTACT_EMAIL}`}>
          <span>Get in touch</span>
          <span class={styles.footCtaArrow} aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
