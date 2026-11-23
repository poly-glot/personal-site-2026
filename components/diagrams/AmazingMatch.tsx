import {
  Canvas,
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

interface Step {
  lines: readonly string[];
  title: string;
  tone?: Tone;
}

const DESCRIPTION =
  "Two chains of four steps. The product: a woman picks her age group, six choices from under 25 to 55 and over, or That's my secret. She picks two concerns from the 7 or 10 offered at that age. Each concern points to one range, Bloom, Glow, Rise or Silk, and the ranges are set for each age group. That gives one product range, marked as the subject: if the two concerns point to different ranges, the age group's order decides, and from 35 up it is Bloom, Rise, Glow, then Silk. Her skin type is asked and saved too, drawn as a dashed box with no arrow into the chain, because it does not change the product. The boutique: she types her town and Google Places finds it on the map. The site measures the distance to each of the eight open boutiques, from Bath to Dublin. It offers up to five within 20 miles first, and if there are none, any within 1,000 miles. The nearest boutique, marked as the subject, is chosen for her, she can swipe to another, and it goes on her voucher.";

const PRODUCT: readonly Step[] = [
  {
    lines: [
      "Six choices, from under 25",
      "to 55 and over, or",
      "“That’s my secret”.",
    ],
    title: "Age group",
  },
  {
    lines: ["Picked from the 7 or 10", "offered at that age."],
    title: "Two concerns",
  },
  {
    lines: ["Bloom, Glow, Rise or Silk,", "set for each age group."],
    title: "Concern to range",
  },
  {
    lines: [
      "If they point to different",
      "ranges, the age group’s",
      "order decides. From 35 up:",
      "Bloom, Rise, Glow, Silk.",
    ],
    title: "One product range",
    tone: "focal",
  },
];

const BOUTIQUE: readonly Step[] = [
  {
    lines: ["Typed in. Google Places", "finds it on the map."],
    title: "Her town",
  },
  {
    lines: [
      "Eight boutiques, from Bath",
      "to Dublin, each measured",
      "from her town.",
    ],
    title: "Boutiques by distance",
  },
  {
    lines: [
      "If none, any within 1,000",
      "miles. Up to five are",
      "offered.",
    ],
    title: "Within 20 miles first",
  },
  {
    lines: [
      "Chosen for her, and she can",
      "swipe to another. It goes",
      "on her voucher.",
    ],
    title: "The nearest boutique",
    tone: "focal",
  },
];

const SKIN_TYPE: Step = {
  lines: ["Asked and saved, but it does", "not change the product."],
  title: "Skin type",
  tone: "ghost",
};

const COLUMNS = [50, 430, 810, 1190];
const NODE_W = 340;
const ZONE_X = 20;
const ZONE_W = 1560;
const NODES_OFFSET = S5 + S2;

const NODE_H = sheetNodeHeight(PRODUCT[3].lines);
const SKIN_H = sheetNodeHeight(SKIN_TYPE.lines);

const PRODUCT_ZONE_Y = S4;
const PRODUCT_Y = PRODUCT_ZONE_Y + NODES_OFFSET;
const SKIN_Y = PRODUCT_Y + NODE_H + S4;
const PRODUCT_ZONE_H = NODES_OFFSET + NODE_H + S4 + SKIN_H + S4;

const BOUTIQUE_ZONE_Y = PRODUCT_ZONE_Y + PRODUCT_ZONE_H + S4;
const BOUTIQUE_Y = BOUTIQUE_ZONE_Y + NODES_OFFSET;
const BOUTIQUE_ZONE_H = NODES_OFFSET + NODE_H + S4;

const HEIGHT = BOUTIQUE_ZONE_Y + BOUTIQUE_ZONE_H + S3;

function across(row: number, from: number): string {
  const y = row + NODE_H / 2;

  return `M${COLUMNS[from] + NODE_W} ${y} L${COLUMNS[from + 1] - 2} ${y}`;
}

function Chain({ row, steps }: { row: number; steps: readonly Step[] }) {
  return (
    <>
      {steps.slice(1).map((step, index) => (
        <Wire d={across(row, index)} key={step.title} />
      ))}
      {steps.map((step, index) => (
        <Node
          h={NODE_H}
          key={step.title}
          lines={step.lines}
          title={step.title}
          tone={step.tone}
          w={NODE_W}
          x={COLUMNS[index]}
          y={row}
        />
      ))}
    </>
  );
}

export default function AmazingMatch() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="How three answers choose one product, and a town chooses one boutique"
      viewBox={`0 0 1600 ${HEIGHT}`}
    >
      <Zone
        h={PRODUCT_ZONE_H}
        label="The product"
        w={ZONE_W}
        x={ZONE_X}
        y={PRODUCT_ZONE_Y}
      />
      <Zone
        h={BOUTIQUE_ZONE_H}
        label="The boutique"
        w={ZONE_W}
        x={ZONE_X}
        y={BOUTIQUE_ZONE_Y}
      />

      <Chain row={PRODUCT_Y} steps={PRODUCT} />
      <Chain row={BOUTIQUE_Y} steps={BOUTIQUE} />

      <Node
        h={SKIN_H}
        lines={SKIN_TYPE.lines}
        title={SKIN_TYPE.title}
        tone={SKIN_TYPE.tone}
        w={NODE_W}
        x={COLUMNS[0]}
        y={SKIN_Y}
      />
    </Canvas>
  );
}
