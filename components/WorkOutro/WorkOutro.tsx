import { CONTACT_EMAIL } from "@/src/nav.ts";
import SectionEyebrow from "@/components/SectionEyebrow/SectionEyebrow.tsx";

export default function WorkOutro() {
  return (
    <section class="port-foot bleed-panel">
      <div class="port-foot-inner">
        <SectionEyebrow
          num="03."
          label="What's next"
          rule="bleed"
          tone="invert"
        />
        <p class="port-foot-copy">
          Happy at{" "}
          <strong>Inspired Thinking Group</strong>, where I've been for nine
          years. I'm always glad to talk about platforms, written decisions and
          the checks that keep them true.
        </p>
        <a class="port-foot-cta" href={`mailto:${CONTACT_EMAIL}`}>
          Get in touch <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
