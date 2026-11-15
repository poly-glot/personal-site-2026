import { CONTACT_EMAIL } from "@/src/nav.ts";
import SectionEyebrow from "@/components/SectionEyebrow/SectionEyebrow.tsx";
import styles from "./WorkOutro.module.css";

export default function WorkOutro() {
  return (
    <section class={styles.foot}>
      <div class={styles.footInner}>
        <SectionEyebrow
          num="03."
          label="What's next"
          tone="invert"
        />
        <p class={styles.footCopy}>
          Happy at{" "}
          <strong>Inspired Thinking Group</strong>, where I've been for nine
          years. I'm always glad to talk about platforms, written decisions and
          the checks that keep them true.
        </p>
        <a class={styles.footCta} href={`mailto:${CONTACT_EMAIL}`}>
          <span>Get in touch</span>
          <span class={styles.footCtaArrow} aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
