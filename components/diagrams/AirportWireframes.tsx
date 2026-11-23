import type { WireframeBlock, WireframePage } from "@/src/types.ts";
import WireframeSheet from "./WireframeSheet.tsx";

const DESCRIPTION =
  "Three Meridian Airport pages drawn as wireframes, each a stack of named components from top to bottom. Each box is a component at the top level of the page, and smaller components sit inside it, such as the 12 flight rows inside the board on the home page. The home page has 10: notice-bar, site-header, hero, flight-board, photo-band, city-rail, help-list, tower-grid, getting-here and site-footer. The Live flights page has five: site-header, page-hero, flight-board, section and site-footer. The Getting here page has five: site-header, page-hero, getting-here, section and site-footer. The flight-board is marked on the home page and on Live flights. It is one component, used on both pages. The getting-here component is also one component, used on the home page and on the Getting here page. The section component appears several times on an inner page and is drawn once. The three frames are the same height, with site-footer at the foot of each, so a shorter page shows space above its footer.";

const SITE_HEADER: WireframeBlock = { names: ["site-header"], size: "bar" };

const SITE_FOOTER: WireframeBlock = { names: ["site-footer"], size: "band" };

const FLIGHT_BOARD: WireframeBlock = {
  focal: true,
  names: ["flight-board"],
  size: "tall",
};

const PAGE_HERO: WireframeBlock = { names: ["page-hero"], size: "band" };

const GETTING_HERE: WireframeBlock = { names: ["getting-here"], size: "band" };

const SECTION: WireframeBlock = { names: ["section"], size: "band" };

const PAGES: readonly WireframePage[] = [
  {
    blocks: [
      { names: ["notice-bar"], size: "bar" },
      SITE_HEADER,
      { names: ["hero"], size: "tall" },
      FLIGHT_BOARD,
      { names: ["photo-band"], size: "band" },
      { names: ["city-rail"], size: "band" },
      { names: ["help-list"], size: "band" },
      { names: ["tower-grid"], size: "band" },
      GETTING_HERE,
      SITE_FOOTER,
    ],
    name: "Home",
  },
  {
    blocks: [SITE_HEADER, PAGE_HERO, FLIGHT_BOARD, SECTION, SITE_FOOTER],
    name: "Live flights",
  },
  {
    blocks: [SITE_HEADER, PAGE_HERO, GETTING_HERE, SECTION, SITE_FOOTER],
    name: "Getting here",
  },
];

export default function AirportWireframes() {
  return (
    <WireframeSheet
      description={DESCRIPTION}
      pages={PAGES}
      title="Three Meridian Airport pages as stacks of components"
    />
  );
}
