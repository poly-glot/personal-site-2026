import type { WireframeBlock, WireframePage } from "@/src/types.ts";
import WireframeSheet from "./WireframeSheet.tsx";

const DESCRIPTION =
  "Three Parley pages drawn as wireframes, each a stack of named components from top to bottom. The home page has nine: site-header, home-hero, intro-panel, case-carousel, service-carousel, section-intro, dispatch-list, cta-band and site-footer. The About page has seven: site-header, page-hero, about-intro, venn, values, cta-band and site-footer. A service page has nine: site-header, page-hero, intro-copy, image-panel, checklist, process-steps, faq, cta-band and site-footer. The cta-band is marked on all three pages. It is one component, the closing band that asks for a conversation, with a heading, a line of text and a button, Talk to us, that leads to the Contact page on all three. It is the same band for someone looking at the home page, someone reading about Parley and someone reading about a service. The three frames are the same height, with site-footer at the foot of each, so a shorter page shows space above its footer.";

const HEADER: WireframeBlock = { names: ["site-header"], size: "bar" };

const START_A_CONVERSATION: WireframeBlock = {
  focal: true,
  names: ["cta-band"],
  size: "band",
};

const FOOTER: WireframeBlock = { names: ["site-footer"], size: "band" };

const PAGES: readonly WireframePage[] = [
  {
    blocks: [
      HEADER,
      { names: ["home-hero"], size: "tall" },
      { names: ["intro-panel"], size: "band" },
      { names: ["case-carousel"], size: "tall" },
      { names: ["service-carousel"], size: "band" },
      { names: ["section-intro"], size: "bar" },
      { names: ["dispatch-list"], size: "tall" },
      START_A_CONVERSATION,
      FOOTER,
    ],
    name: "Home",
  },
  {
    blocks: [
      HEADER,
      { names: ["page-hero"], size: "tall" },
      { names: ["about-intro"], size: "tall" },
      { names: ["venn"], size: "tall" },
      { names: ["values"], size: "tall" },
      START_A_CONVERSATION,
      FOOTER,
    ],
    name: "About",
  },
  {
    blocks: [
      HEADER,
      { names: ["page-hero"], size: "band" },
      { names: ["intro-copy"], size: "band" },
      { names: ["image-panel"], size: "tall" },
      { names: ["checklist"], size: "band" },
      { names: ["process-steps"], size: "tall" },
      { names: ["faq"], size: "band" },
      START_A_CONVERSATION,
      FOOTER,
    ],
    name: "Service",
  },
];

export default function ParleyWireframes() {
  return (
    <WireframeSheet
      description={DESCRIPTION}
      pages={PAGES}
      title="Three Parley pages as stacks of components"
    />
  );
}
