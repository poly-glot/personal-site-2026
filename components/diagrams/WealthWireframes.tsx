import type { WireframeBlock, WireframePage } from "@/src/types.ts";
import WireframeSheet from "./WireframeSheet.tsx";

const DESCRIPTION =
  "Three Wealth pages drawn as wireframes, each a stack of named components from top to bottom. A strategy page has nine: site-header, page-hero, feature-image, approach-list beside fact-list, faq beside doc-list, cta-band and site-footer. A person page has four: site-header, bio, cta-band and site-footer. An insight page has five: site-header, article, feature-image, a second article block for the text and author, cta-band and site-footer. The cta-band is marked on all three pages, because it is one component, the band that invites a visitor to get in touch, and it closes every page an investor reads. The three frames are the same height, with site-footer at the foot of each, so a shorter page shows space above its footer.";

const HEADER: WireframeBlock = { names: ["site-header"], size: "bar" };

const GET_IN_TOUCH: WireframeBlock = {
  focal: true,
  names: ["cta-band"],
  size: "band",
};

const FOOTER: WireframeBlock = { names: ["site-footer"], size: "band" };

const PAGES: readonly WireframePage[] = [
  {
    blocks: [
      HEADER,
      { names: ["page-hero"], size: "tall" },
      { names: ["feature-image"], size: "band" },
      { names: ["approach-list", "fact-list"], size: "tall" },
      { names: ["faq", "doc-list"], size: "band" },
      GET_IN_TOUCH,
      FOOTER,
    ],
    name: "Strategy",
  },
  {
    blocks: [
      HEADER,
      { names: ["bio"], size: "tall" },
      GET_IN_TOUCH,
      FOOTER,
    ],
    name: "Person",
  },
  {
    blocks: [
      HEADER,
      { names: ["article"], size: "band" },
      { names: ["feature-image"], size: "band" },
      { names: ["article"], size: "tall" },
      GET_IN_TOUCH,
      FOOTER,
    ],
    name: "Insight",
  },
];

export default function WealthWireframes() {
  return (
    <WireframeSheet
      description={DESCRIPTION}
      pages={PAGES}
      title="Three Wealth pages as stacks of components"
    />
  );
}
