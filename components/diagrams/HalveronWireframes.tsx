import type { WireframeBlock, WireframePage } from "@/src/types.ts";
import WireframeSheet from "./WireframeSheet.tsx";

const DESCRIPTION =
  "Three Halveron pages drawn as wireframes, each a stack of named components from top to bottom. A sector page has nine: site-header, page-header, pull-quote, contact-aside, contact-form, carousel, insight-card, newsletter and site-footer. A course page has nine: site-header, page-header, article-lead, facts, accordion, contact-aside, insight-card, newsletter and site-footer. The forum page has eight: site-header, sub-header, event-card, contact-aside, carousel, insight-card, newsletter and site-footer. The contact-aside is marked on all three pages, because it is one component, the box that names a person to talk to, with a portrait, a role, a phone number, an email address and a button, and it is the same box for a leader reading a sector, someone choosing a course and a member of the forum. The three frames are the same height, with site-footer at the foot of each, so a shorter page shows space above its footer.";

const HEADER: WireframeBlock = { names: ["site-header"], size: "bar" };

const TALK_TO: WireframeBlock = {
  focal: true,
  names: ["contact-aside"],
  size: "tall",
};

const INSIGHTS: WireframeBlock = { names: ["insight-card"], size: "band" };

const NEWSLETTER: WireframeBlock = { names: ["newsletter"], size: "band" };

const FOOTER: WireframeBlock = { names: ["site-footer"], size: "band" };

const PAGES: readonly WireframePage[] = [
  {
    blocks: [
      HEADER,
      { names: ["page-header"], size: "tall" },
      { names: ["pull-quote"], size: "band" },
      TALK_TO,
      { names: ["contact-form"], size: "tall" },
      { names: ["carousel"], size: "band" },
      INSIGHTS,
      NEWSLETTER,
      FOOTER,
    ],
    name: "Sector",
  },
  {
    blocks: [
      HEADER,
      { names: ["page-header"], size: "band" },
      { names: ["article-lead"], size: "tall" },
      { names: ["facts"], size: "band" },
      { names: ["accordion"], size: "band" },
      TALK_TO,
      INSIGHTS,
      NEWSLETTER,
      FOOTER,
    ],
    name: "Course",
  },
  {
    blocks: [
      HEADER,
      { names: ["sub-header"], size: "tall" },
      { names: ["event-card"], size: "tall" },
      TALK_TO,
      { names: ["carousel"], size: "band" },
      INSIGHTS,
      NEWSLETTER,
      FOOTER,
    ],
    name: "Forum",
  },
];

export default function HalveronWireframes() {
  return (
    <WireframeSheet
      description={DESCRIPTION}
      pages={PAGES}
      title="Three Halveron pages as stacks of components"
    />
  );
}
