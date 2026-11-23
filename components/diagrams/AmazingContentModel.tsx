import {
  Canvas,
  Label,
  Node,
  S2,
  S3,
  S4,
  S5,
  sheetNodeHeight,
  type Tone,
  Wire,
  Zone,
} from "./parts.tsx";

interface Entity {
  lines: readonly string[];
  title: string;
  tone?: Tone;
}

const DESCRIPTION =
  "The admin stores six kinds of record. Promotion holds a name, a web address name and whether it is on or off. Question set, marked as the subject, is one set: the age groups, and for each its skin types, its concerns, the range each concern points to, and its order of ranges. Product holds 16 products in four ranges, each with a range, name, type, price, picture and link. Boutique holds 8 boutiques, each with a town, address, map position, display order and whether it is on or off. Question set, Product and Boutique sit inside one box labelled Shared by every promotion. Entry holds a woman's answers, name and email, her town, the product range, the boutique, the promotion and the date. Voucher email holds the email as rendered, the recipient, subject and date, saved once per entry. Arrows show how records link. An entry came through a promotion, collects at a boutique and is matched to a range of products. A voucher email is written for an entry. The question set points to the ranges of products.";

const PROMOTION: Entity = {
  lines: ["Name", "Web address name (the slug)", "On or off"],
  title: "Promotion",
};

const VOUCHER: Entity = {
  lines: [
    "Saved, one per entry",
    "The email as rendered",
    "Recipient, subject and date",
  ],
  title: "Voucher email",
};

const ENTRY: Entity = {
  lines: [
    "Her answers",
    "Name and email",
    "Her town",
    "The product range",
    "The boutique",
    "The promotion",
    "The date",
  ],
  title: "Entry",
};

const BOUTIQUE: Entity = {
  lines: [
    "8 boutiques",
    "Town, address, map position,",
    "display order, on or off",
  ],
  title: "Boutique",
};

const PRODUCT: Entity = {
  lines: [
    "16, in four ranges",
    "Range, name, type,",
    "price, picture, link",
  ],
  title: "Product",
};

const QUESTION_SET: Entity = {
  lines: [
    "One set",
    "Age groups, and for each one:",
    "its skin types and concerns,",
    "the range each concern points to,",
    "and its order of ranges.",
  ],
  title: "Question set",
  tone: "focal",
};

const SIDE_X = 40;
const SIDE_W = 320;
const ENTRY_X = 540;
const ENTRY_W = 330;
const SHARED_X = 1120;
const SHARED_W = 460;
const NODE_X = 1150;
const NODE_W = 400;

const ZONE_Y = S3;
const ROW_H = sheetNodeHeight(PRODUCT.lines);
const STEP = ROW_H + S4;
const UPPER_Y = ZONE_Y + S5 + S2;
const LOWER_Y = UPPER_Y + STEP;
const SET_Y = LOWER_Y + ROW_H + S5;
const SET_H = sheetNodeHeight(QUESTION_SET.lines);
const ZONE_H = SET_Y + SET_H + S4 - ZONE_Y;
const HEIGHT = ZONE_Y + ZONE_H + S3;

const ENTRY_H = sheetNodeHeight(ENTRY.lines);
const ENTRY_Y = UPPER_Y + ROW_H / 2 + STEP / 2 - ENTRY_H / 2;

const UPPER_MID = UPPER_Y + ROW_H / 2;
const LOWER_MID = LOWER_Y + ROW_H / 2;
const SIDE_RIGHT = SIDE_X + SIDE_W;
const ENTRY_RIGHT = ENTRY_X + ENTRY_W;
const SET_MIDLINE = NODE_X + NODE_W / 2;
const SET_TOP = LOWER_Y + ROW_H;

const LEFT_GAP_CENTRE = (SIDE_RIGHT + ENTRY_X) / 2;
const RIGHT_GAP_CENTRE = (ENTRY_RIGHT + SHARED_X) / 2;

export default function AmazingContentModel() {
  return (
    <Canvas
      description={DESCRIPTION}
      quiet
      title="What the admin stores, and how an entry links to it"
      viewBox={`0 0 1600 ${HEIGHT}`}
    >
      <Zone
        h={ZONE_H}
        label="Shared by every promotion"
        w={SHARED_W}
        x={SHARED_X}
        y={ZONE_Y}
      />

      <Wire d={`M${ENTRY_X} ${UPPER_MID} L${SIDE_RIGHT + 2} ${UPPER_MID}`} />
      <Wire d={`M${SIDE_RIGHT} ${LOWER_MID} L${ENTRY_X - 2} ${LOWER_MID}`} />
      <Wire d={`M${ENTRY_RIGHT} ${UPPER_MID} L${NODE_X - 2} ${UPPER_MID}`} />
      <Wire d={`M${ENTRY_RIGHT} ${LOWER_MID} L${NODE_X - 2} ${LOWER_MID}`} />
      <Wire d={`M${SET_MIDLINE} ${SET_Y} L${SET_MIDLINE} ${SET_TOP + 2}`} />

      <Label
        anchor="middle"
        text="came through"
        x={LEFT_GAP_CENTRE}
        y={UPPER_MID - S2}
      />
      <Label
        anchor="middle"
        text="written for"
        x={LEFT_GAP_CENTRE}
        y={LOWER_MID - S2}
      />
      <Label
        anchor="middle"
        text="collects at"
        x={RIGHT_GAP_CENTRE}
        y={UPPER_MID - S2}
      />
      <Label
        anchor="middle"
        text="matched to a range"
        x={RIGHT_GAP_CENTRE}
        y={LOWER_MID - S2}
      />
      <Label
        text="points to ranges"
        x={SET_MIDLINE + S2}
        y={SET_TOP + S5 / 2 + S2 / 2}
      />

      <Node
        lines={PROMOTION.lines}
        title={PROMOTION.title}
        w={SIDE_W}
        x={SIDE_X}
        y={UPPER_Y}
      />
      <Node
        lines={VOUCHER.lines}
        title={VOUCHER.title}
        w={SIDE_W}
        x={SIDE_X}
        y={LOWER_Y}
      />
      <Node
        lines={ENTRY.lines}
        title={ENTRY.title}
        w={ENTRY_W}
        x={ENTRY_X}
        y={ENTRY_Y}
      />
      <Node
        lines={BOUTIQUE.lines}
        title={BOUTIQUE.title}
        w={NODE_W}
        x={NODE_X}
        y={UPPER_Y}
      />
      <Node
        lines={PRODUCT.lines}
        title={PRODUCT.title}
        w={NODE_W}
        x={NODE_X}
        y={LOWER_Y}
      />
      <Node
        lines={QUESTION_SET.lines}
        title={QUESTION_SET.title}
        tone={QUESTION_SET.tone}
        w={NODE_W}
        x={NODE_X}
        y={SET_Y}
      />
    </Canvas>
  );
}
