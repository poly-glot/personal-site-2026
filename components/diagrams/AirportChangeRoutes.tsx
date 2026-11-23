import type { ChangeStep } from "@/src/types.ts";
import RouteSheet from "./RouteSheet.tsx";

const DESCRIPTION =
  "Three rows of three boxes each. A developer pushes a change to the main branch. The pipeline builds both images for that commit, and holds no Google Cloud key. Two services are the only way code reaches the server, and nothing is changed in place. Staff sign in to the Canvas editor on the Drupal address. The Canvas editor lets them place components on a page and fill in their settings. A save tells Next.js at once from Drupal, and Next.js draws the pages again. A traveller opens a page on airport.junaid.guru. Next.js draws each page once and keeps it in its cache. A cached page is served while Drupal sleeps, and is at most an hour old if a save is missed. It is the point of the picture.";

const ROUTES: readonly (readonly ChangeStep[])[] = [
  [
    { lines: ["Pushes a change to", "the main branch."], title: "Developer" },
    {
      lines: [
        "Builds both images for that commit.",
        "It holds no Google Cloud key.",
      ],
      title: "The pipeline",
    },
    {
      lines: [
        "The only way code reaches the server.",
        "Nothing is changed in place.",
      ],
      title: "Two services",
    },
  ],
  [
    {
      lines: ["Sign in to the Canvas editor", "on the Drupal address."],
      title: "Staff",
    },
    {
      lines: [
        "Place components on a page",
        "and fill in their settings.",
      ],
      title: "The Canvas editor",
    },
    {
      lines: [
        "Drupal tells Next.js at once.",
        "Next.js draws the pages again.",
      ],
      title: "A save",
    },
  ],
  [
    {
      lines: ["Opens a page on", "airport.junaid.guru."],
      title: "Traveller",
    },
    {
      lines: ["Draws each page once", "and keeps it in its cache."],
      title: "Next.js",
    },
    {
      lines: [
        "Served while Drupal sleeps.",
        "At most an hour old if a save is missed.",
      ],
      title: "A cached page",
      tone: "focal",
    },
  ],
];

export default function AirportChangeRoutes() {
  return (
    <RouteSheet
      description={DESCRIPTION}
      routes={ROUTES}
      title="Who can change what on the Meridian Airport site"
    />
  );
}
