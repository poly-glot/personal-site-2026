import type { WireframeBlock, WireframePage } from "@/src/types.ts";
import WireframeSheet from "./WireframeSheet.tsx";

const DESCRIPTION =
  "Three Ferrow & Lisle pages drawn as wireframes, each a stack of named components from top to bottom. The home page has 11: site-header, hero-home, featured-posts, practice-areas-grid, newsletter-form, professionals-grid, worldwide-map, news-grid, contact-mini, enquiry-form and site-footer. A practice area page has five: site-header, page-banner, practice-sidebar, professionals-sidebar and site-footer. The Contact page has five: site-header, page-banner, enquiry-form, office-widgets and site-footer. The site-header is marked on all three pages. It is one component, on every page, and it carries the 24/7 hotline. The enquiry form is also one component, used on the home page and on the Contact page. A practice page's own text is not a component: it sits in the page itself, between the banner and the two side lists. The three frames are the same height, with site-footer at the foot of each, so a shorter page shows space above its footer.";

const HEADER: WireframeBlock = {
  focal: true,
  names: ["site-header"],
  size: "bar",
};

const FOOTER: WireframeBlock = { names: ["site-footer"], size: "band" };

const PAGES: readonly WireframePage[] = [
  {
    blocks: [
      HEADER,
      { names: ["hero-home"], size: "bar" },
      { names: ["featured-posts"], size: "bar" },
      { names: ["practice-areas-grid"], size: "bar" },
      { names: ["newsletter-form"], size: "bar" },
      { names: ["professionals-grid"], size: "bar" },
      { names: ["worldwide-map"], size: "bar" },
      { names: ["news-grid"], size: "bar" },
      { names: ["contact-mini"], size: "bar" },
      { names: ["enquiry-form"], size: "bar" },
      FOOTER,
    ],
    name: "Home",
  },
  {
    blocks: [
      HEADER,
      { names: ["page-banner"], size: "tall" },
      { names: ["practice-sidebar"], size: "tall" },
      { names: ["professionals-sidebar"], size: "tall" },
      FOOTER,
    ],
    name: "Practice area",
  },
  {
    blocks: [
      HEADER,
      { names: ["page-banner"], size: "tall" },
      { names: ["enquiry-form"], size: "tall" },
      { names: ["office-widgets"], size: "tall" },
      FOOTER,
    ],
    name: "Contact",
  },
];

export default function LegalWireframes() {
  return (
    <WireframeSheet
      description={DESCRIPTION}
      pages={PAGES}
      title="Three Ferrow & Lisle pages as stacks of components"
    />
  );
}
