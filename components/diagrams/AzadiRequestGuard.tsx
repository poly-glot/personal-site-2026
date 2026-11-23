import {
  Boundary,
  Label,
  Node,
  nodeHeight,
  Pair,
  Panel,
  S2,
  S3,
  S4,
  S5,
  Wire,
} from "./parts.tsx";

const HEIGHT = 587;
const NODE_X = S3;
const NODE_W = 478;
const HALF_W = (NODE_W - S4) / 2;
const GAP = S4;
const ARROW_GAP = 2;

const LIMITS_LINES = [
  "5 logins every 15 minutes",
  "3 payments an hour",
  "60 requests a minute",
];
const SESSION_LINES = [
  "The cookie holds only an encrypted session ID.",
  "The session ends after 15 minutes idle.",
];
const TOKEN_LINES = [
  "Proves each form came from",
  "the portal's own page.",
];
const PAGE_LINES = ["Reached only when all", "three checks pass."];
const AUDIT_LINES = ["Payments, contact and", "bank changes are logged."];

const LIMITS_Y = S5;
const SESSION_Y = LIMITS_Y + nodeHeight(LIMITS_LINES) + GAP;
const TOKEN_Y = SESSION_Y + nodeHeight(SESSION_LINES) + GAP;
const ENDS_Y = TOKEN_Y + nodeHeight(TOKEN_LINES) + GAP;

const CHAIN_X = NODE_X + NODE_W / 2;
const PAGE_X = NODE_X;
const AUDIT_X = NODE_X + HALF_W + GAP;
const PAGE_MIDDLE = PAGE_X + HALF_W / 2;
const ENDS_MIDDLE = ENDS_Y + nodeHeight(PAGE_LINES) / 2;

const CAPTION_Y = S5 + S2;
const COLUMN_Y = CAPTION_Y + S3;
const COLUMN_W = 214;
const BANK_X = NODE_X;
const CARD_X = NODE_X + NODE_W - COLUMN_W;
const BOUNDARY_X = (BANK_X + COLUMN_W + CARD_X) / 2;
const BOUNDARY_LABEL_Y = HEIGHT - S4;

const CONFIRM_LINES = ["Three boxes ticked", "before anything saves."];
const ENCRYPT_LINES = ["AES-256-GCM, before", "it is saved."];
const STORED_LINES = ["Last four digits stay", "readable."];
const CARD_LINES = ["Typed into Stripe's own", "field, not the portal's."];
const STRIPE_LINES = [
  "Takes the payment and",
  "confirms it to the",
  "portal, signed.",
];

const CONFIRM_Y = COLUMN_Y;
const ENCRYPT_Y = CONFIRM_Y + nodeHeight(CONFIRM_LINES) + GAP;
const STORED_Y = ENCRYPT_Y + nodeHeight(ENCRYPT_LINES) + GAP;
const STRIPE_Y = COLUMN_Y + nodeHeight(CARD_LINES) + GAP;

const CHECKS_TEXT =
  "Every request passes three checks in order before it reaches a page. First, limits per caller: 5 logins every 15 minutes, 3 payments an hour and 60 requests a minute. Second, the session check: the cookie holds only an encrypted session ID, and the session ends after 15 minutes idle. Third, the form token, which proves each form came from the portal's own page. Then the page. Payments, contact changes and bank detail changes are written to an audit trail.";

const MONEY_TEXT =
  "Two kinds of detail are kept apart. Bank details are held by the portal: three confirmation boxes are ticked first, the details are encrypted with AES-256-GCM before they are saved, and only the last four digits stay readable. The card number is held by Stripe: it is typed into Stripe's own field, Stripe takes the payment and confirms it to the portal with a signed message. A dashed blue line between the two says the portal never sees a card number.";

function down(x: number, from: number, to: number): string {
  return `M${x} ${from} L${x} ${to - ARROW_GAP}`;
}

function Checks() {
  const limitsEnd = SESSION_Y - GAP;
  const sessionEnd = TOKEN_Y - GAP;
  const tokenEnd = ENDS_Y - GAP;

  return (
    <Panel
      description={CHECKS_TEXT}
      heading="Every request passes three checks"
      height={HEIGHT}
      title="The three checks every request passes before it reaches a page"
    >
      <Wire d={down(CHAIN_X, limitsEnd, SESSION_Y)} />
      <Wire d={down(CHAIN_X, sessionEnd, TOKEN_Y)} />
      <Wire d={down(PAGE_MIDDLE, tokenEnd, ENDS_Y)} />
      <Wire
        d={`M${PAGE_X + HALF_W} ${ENDS_MIDDLE} L${
          AUDIT_X - ARROW_GAP
        } ${ENDS_MIDDLE}`}
      />

      <Node
        lines={LIMITS_LINES}
        title="Limits per caller"
        w={NODE_W}
        x={NODE_X}
        y={LIMITS_Y}
      />
      <Node
        lines={SESSION_LINES}
        title="Session check"
        w={NODE_W}
        x={NODE_X}
        y={SESSION_Y}
      />
      <Node
        lines={TOKEN_LINES}
        title="Form token"
        w={NODE_W}
        x={NODE_X}
        y={TOKEN_Y}
      />
      <Node
        lines={PAGE_LINES}
        title="The page"
        w={HALF_W}
        x={PAGE_X}
        y={ENDS_Y}
      />
      <Node
        lines={AUDIT_LINES}
        title="Audit trail"
        w={HALF_W}
        x={AUDIT_X}
        y={ENDS_Y}
      />
    </Panel>
  );
}

function Money() {
  return (
    <Panel
      description={MONEY_TEXT}
      heading="Money and bank details"
      height={HEIGHT}
      title="Bank details stay with the portal and the card number goes straight to Stripe"
    >
      <Wire
        d={down(
          BANK_X + COLUMN_W / 2,
          CONFIRM_Y + nodeHeight(CONFIRM_LINES),
          ENCRYPT_Y,
        )}
      />
      <Wire
        d={down(
          BANK_X + COLUMN_W / 2,
          ENCRYPT_Y + nodeHeight(ENCRYPT_LINES),
          STORED_Y,
        )}
      />
      <Wire
        d={down(
          CARD_X + COLUMN_W / 2,
          COLUMN_Y + nodeHeight(CARD_LINES),
          STRIPE_Y,
        )}
      />

      <Label
        kind="caption"
        text="Bank details, held by the portal"
        x={BANK_X}
        y={CAPTION_Y}
      />
      <Label
        kind="caption"
        text="Card number, held by Stripe"
        x={CARD_X}
        y={CAPTION_Y}
      />

      <Node
        lines={CONFIRM_LINES}
        title="Confirmations"
        w={COLUMN_W}
        x={BANK_X}
        y={CONFIRM_Y}
      />
      <Node
        lines={ENCRYPT_LINES}
        title="Encrypted"
        w={COLUMN_W}
        x={BANK_X}
        y={ENCRYPT_Y}
      />
      <Node
        lines={STORED_LINES}
        title="Stored"
        w={COLUMN_W}
        x={BANK_X}
        y={STORED_Y}
      />

      <Node
        lines={CARD_LINES}
        title="Card number"
        tone="focal"
        w={COLUMN_W}
        x={CARD_X}
        y={COLUMN_Y}
      />
      <Node
        lines={STRIPE_LINES}
        title="Stripe"
        w={COLUMN_W}
        x={CARD_X}
        y={STRIPE_Y}
      />

      <Boundary
        bottom={BOUNDARY_LABEL_Y}
        label="The portal never sees a card number"
        labelY={BOUNDARY_LABEL_Y}
        top={S5}
        x={BOUNDARY_X}
      />
    </Panel>
  );
}

export default function AzadiRequestGuard() {
  return (
    <Pair>
      <Checks />
      <Money />
    </Pair>
  );
}
