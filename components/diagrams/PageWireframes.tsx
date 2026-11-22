import type { WireframePage } from "@/src/types.ts";
import WireframeSheet from "./WireframeSheet.tsx";

const DESCRIPTION =
  "Three pages drawn as wireframes, each a stack of named components from top to bottom. Home has seven: site-header, hero, feature-list, mission, join-band, a row of three news-card and site-footer. About has eight: site-header, hero, goals, mission, tabs, ten person-card, a row of three news-card and site-footer. News and media has four: site-header, page-title, two rows of three news-card and site-footer. The news-card rows are marked on all three pages, because they are one component used on each. The three frames are the same height, with site-footer at the foot of each, so a shorter page shows space above its footer.";

const NEWS_CARDS = {
  focal: true,
  names: ["news-card"],
  cells: 3,
  size: "tall",
} as const;

const PAGES: readonly WireframePage[] = [
  {
    blocks: [
      { names: ["site-header"], size: "bar" },
      { names: ["hero"], size: "tall" },
      { names: ["feature-list"], size: "band" },
      { names: ["mission"], size: "band" },
      { names: ["join-band"], size: "bar" },
      NEWS_CARDS,
      { names: ["site-footer"], size: "band" },
    ],
    name: "Home",
  },
  {
    blocks: [
      { names: ["site-header"], size: "bar" },
      { names: ["hero"], size: "tall" },
      { names: ["goals"], size: "band" },
      { names: ["mission"], size: "band" },
      { names: ["tabs"], size: "bar" },
      { names: ["person-card × 10"], size: "band" },
      NEWS_CARDS,
      { names: ["site-footer"], size: "band" },
    ],
    name: "About",
  },
  {
    blocks: [
      { names: ["site-header"], size: "bar" },
      { names: ["page-title"], size: "band" },
      NEWS_CARDS,
      { cells: 3, focal: true, names: [], size: "tall" },
      { names: ["site-footer"], size: "band" },
    ],
    name: "News & media",
  },
];

export default function PageWireframes() {
  return (
    <WireframeSheet
      description={DESCRIPTION}
      pages={PAGES}
      title="Three Academy pages as stacks of components"
    />
  );
}
