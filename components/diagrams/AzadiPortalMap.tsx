import {
  Canvas,
  Chip,
  Label,
  Node,
  S1,
  S2,
  S3,
  S4,
  S5,
  sheetNodeHeight,
  Wire,
  Zone,
} from "./parts.tsx";
import { FanOut, TOKEN } from "./SiteMapParts.tsx";

const SIGN_IN = "Log in";
const MY_ACCOUNT = "My account";
const AGREEMENT = "The agreement";
const FINANCE_TASKS = [
  "Make a payment",
  "Settlement figure",
  "Change payment date",
  "Request a statement",
  "Update bank details",
];
const YOUR_DETAILS = ["My contact details", "My documents"];
const HELP_PAGES = ["FAQs", "Ways to pay", "Contact us"];
const FOOTER_PAGES = ["Cookies", "Privacy", "Terms"];

const PAGE_COUNT = 3 + FINANCE_TASKS.length + YOUR_DETAILS.length +
  HELP_PAGES.length + FOOTER_PAGES.length;

const ACCOUNT_LINES = ["Every task starts here"];
const LEFT_OUT_LINES = [
  "New finance, quotes and",
  "applications. The portal",
  "serves existing agreements.",
];

const SHEET_W = 1600;
const ZONE_PAD = 24;
const ZONE_TOP = 60;
const LEGEND_Y = S4;

const PUBLIC_X = 20;
const PUBLIC_CHIP_W = 220;
const PUBLIC_W = PUBLIC_CHIP_W + 2 * ZONE_PAD;
const PUBLIC_CHIP_X = PUBLIC_X + ZONE_PAD;

const SIGNED_X = PUBLIC_X + PUBLIC_W + S4;
const AGREEMENT_X = SIGNED_X + ZONE_PAD;
const AGREEMENT_W = 220;
const GROUP_W = 280;
const GROUP_CHIP_W = GROUP_W - 2 * S3;
const FINANCE_X = AGREEMENT_X + AGREEMENT_W + S4;
const DETAILS_X = FINANCE_X + GROUP_W + S4;
const SIGNED_W = DETAILS_X + GROUP_W + ZONE_PAD - SIGNED_X;

const ACCOUNT_Y = ZONE_TOP + S5 + S2;
const ACCOUNT_H = sheetNodeHeight(ACCOUNT_LINES);
const ACCOUNT_BOTTOM = ACCOUNT_Y + ACCOUNT_H;
const ACCOUNT_MIDDLE = ACCOUNT_Y + ACCOUNT_H / 2;
const FINANCE_MIDDLE = FINANCE_X + GROUP_W / 2;
const BUS_Y = ACCOUNT_BOTTOM + S3;
const TARGET_TOP = ACCOUNT_BOTTOM + S5;
const TARGET_MIDDLES = [
  AGREEMENT_X + AGREEMENT_W / 2,
  FINANCE_MIDDLE,
  DETAILS_X + GROUP_W / 2,
];

const FINANCE_H = S5 + stackHeight(FINANCE_TASKS.length) + S3;
const DETAILS_H = S5 + stackHeight(YOUR_DETAILS.length) + S3;
const ZONES_H = TARGET_TOP + FINANCE_H + ZONE_PAD - ZONE_TOP;
const HEIGHT = ZONE_TOP + ZONES_H + S3;

const SIGN_IN_Y = ACCOUNT_MIDDLE - TOKEN / 2;
const HELP_CAPTION_Y = SIGN_IN_Y + TOKEN + S4;
const HELP_Y = HELP_CAPTION_Y + S2;
const FOOTER_CAPTION_Y = HELP_Y + stackHeight(HELP_PAGES.length) + S4;
const FOOTER_Y = FOOTER_CAPTION_Y + S2;

const LEFT_OUT_X = SIGNED_X + SIGNED_W + S4;
const LEFT_OUT_W = SHEET_W - PUBLIC_X - LEFT_OUT_X;

const DESCRIPTION =
  `The portal has ${PAGE_COUNT} pages, each drawn once. Log in is open to anyone, with the three help pages, ${
    HELP_PAGES.join(", ")
  }, and the three footer pages, ${
    FOOTER_PAGES.join(", ")
  }. Logging in leads once to My account, the page every logged-in task starts from, drawn as the subject. From My account there are three ways on: the agreement, ${FINANCE_TASKS.length} finance tasks, ${
    FINANCE_TASKS.join(", ")
  }, and ${YOUR_DETAILS.length} pages for your details, ${
    YOUR_DETAILS.join(" and ")
  }. A dashed box on the right shows what the portal leaves out on purpose: new finance, quotes and applications. It serves existing agreements only.`;

function stackHeight(count: number): number {
  return count * TOKEN + (count - 1) * S1;
}

function ChipStack(
  { names, w, x, y }: {
    names: readonly string[];
    w: number;
    x: number;
    y: number;
  },
) {
  return (
    <g>
      {names.map((name, index) => (
        <Chip
          h={TOKEN}
          key={name}
          plain
          text={name}
          w={w}
          x={x}
          y={y + index * (TOKEN + S1)}
        />
      ))}
    </g>
  );
}

function OpenToAnyone() {
  const chipX = PUBLIC_CHIP_X;

  return (
    <g>
      <Zone
        h={ZONES_H}
        label="Open to anyone"
        w={PUBLIC_W}
        x={PUBLIC_X}
        y={ZONE_TOP}
      />

      <Label kind="caption" text="The way in" x={chipX} y={SIGN_IN_Y - S2} />
      <Chip
        h={TOKEN}
        plain
        text={SIGN_IN}
        w={PUBLIC_CHIP_W}
        x={chipX}
        y={SIGN_IN_Y}
      />

      <Label kind="caption" text="Help" x={chipX} y={HELP_CAPTION_Y} />
      <ChipStack names={HELP_PAGES} w={PUBLIC_CHIP_W} x={chipX} y={HELP_Y} />

      <Label
        kind="caption"
        text="Footer, on every page"
        x={chipX}
        y={FOOTER_CAPTION_Y}
      />
      <ChipStack
        names={FOOTER_PAGES}
        w={PUBLIC_CHIP_W}
        x={chipX}
        y={FOOTER_Y}
      />
    </g>
  );
}

function SignedIn() {
  return (
    <g>
      <Zone
        h={ZONES_H}
        label="Logged in"
        w={SIGNED_W}
        x={SIGNED_X}
        y={ZONE_TOP}
      />

      <FanOut
        busY={BUS_Y}
        from={FINANCE_MIDDLE}
        fromY={ACCOUNT_BOTTOM}
        targets={TARGET_MIDDLES}
        topY={TARGET_TOP}
      />
      <Node
        h={ACCOUNT_H}
        lines={ACCOUNT_LINES}
        title={MY_ACCOUNT}
        tone="focal"
        w={GROUP_W}
        x={FINANCE_X}
        y={ACCOUNT_Y}
      />

      <Chip
        h={TOKEN}
        plain
        text={AGREEMENT}
        w={AGREEMENT_W}
        x={AGREEMENT_X}
        y={TARGET_TOP}
      />

      <Zone
        h={FINANCE_H}
        label="Manage my finance"
        w={GROUP_W}
        x={FINANCE_X}
        y={TARGET_TOP}
      />
      <ChipStack
        names={FINANCE_TASKS}
        w={GROUP_CHIP_W}
        x={FINANCE_X + S3}
        y={TARGET_TOP + S5}
      />

      <Zone
        h={DETAILS_H}
        label="Your details"
        w={GROUP_W}
        x={DETAILS_X}
        y={TARGET_TOP}
      />
      <ChipStack
        names={YOUR_DETAILS}
        w={GROUP_CHIP_W}
        x={DETAILS_X + S3}
        y={TARGET_TOP + S5}
      />
    </g>
  );
}

export default function AzadiPortalMap() {
  const signInEnd = PUBLIC_CHIP_X + PUBLIC_CHIP_W;

  return (
    <Canvas
      description={DESCRIPTION}
      quiet
      title={`The Azadi portal's ${PAGE_COUNT} pages and how a customer reaches them`}
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Label
        kind="aside"
        text={`Each box is one of the ${PAGE_COUNT} pages. The dashed box is not a page.`}
        x={PUBLIC_X}
        y={LEGEND_Y}
      />

      <OpenToAnyone />
      <SignedIn />

      <Wire
        d={`M${signInEnd} ${ACCOUNT_MIDDLE} L${
          FINANCE_X - 2
        } ${ACCOUNT_MIDDLE}`}
      />
      <Label
        text="Log in once"
        x={SIGNED_X + S3}
        y={ACCOUNT_MIDDLE - S2}
      />

      <Node
        lines={LEFT_OUT_LINES}
        title="Left out on purpose"
        tone="ghost"
        w={LEFT_OUT_W}
        x={LEFT_OUT_X}
        y={ACCOUNT_Y}
      />
    </Canvas>
  );
}
