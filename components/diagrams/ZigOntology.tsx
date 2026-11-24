import {
  Canvas,
  Chip,
  Guide,
  Label,
  Line,
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

const DESCRIPTION =
  "What the directory knows and how it is connected. The link, 3,042,241 of them, is the hub, drawn as the subject. Each link is filed in one category; there are 632,471 categories, and a category sits inside another category, which makes the tree. Each link is hosted on a site, a host and a domain, all read from its web address. A country is reached by three routes: the ending of the domain, a category named for the country, and a place named in the link's text. Religion, which has 11 kinds, people and organisations are all named in the title and description. A role such as politicians is not stored: it is a lookup that turns a word into category names, 36 words in all. Links and categories are also near each other semantically, drawn as dashed lines because nearness is looked up, not stored as a connection. A dashed box lists what is not stored: DMOZ related and @ links, and links between sites.";

const SHEET_W = 1600;
const ARROW_GAP = 2;
const DATA_INSET = 22;
const NAME_BASELINE = 46;

const ROLE_X = 30;
const ROLE_W = 280;
const NODE_W = 310;
const CATEGORY_X = ROLE_X + ROLE_W + 100;
const LINK_X = CATEGORY_X + NODE_W + 110;
const SITE_X = LINK_X + NODE_W + 110;
const COUNTRY_W = 340;

const CATEGORY_MIDDLE = CATEGORY_X + NODE_W / 2;
const LINK_MIDDLE = LINK_X + NODE_W / 2;
const SITE_MIDDLE = SITE_X + NODE_W / 2;

const COUNTRY_LINES = [
  "Three routes lead here. A link",
  "can name up to eight countries.",
];
const LINK_LINES = ["A web address with its title", "and description."];
const CATEGORY_LINES = [
  "A place in the tree. Each link",
  "sits in exactly one.",
];
const SITE_LINES = ["All three come from the", "web address."];
const ROLE_LINES = ["A word like politicians", "becomes category names."];
const SEMANTIC_LINES = [
  "Every link and category has",
  "an embedding to compare.",
];
const MISSING_LINES = ["DMOZ related and @ links,", "links between sites."];

const NODE_H = sheetNodeHeight(LINK_LINES);
const COUNTRY_Y = 30;
const COUNTRY_X = LINK_MIDDLE - COUNTRY_W / 2;
const COUNTRY_BOTTOM = COUNTRY_Y + sheetNodeHeight(COUNTRY_LINES);
const BUS_Y = COUNTRY_BOTTOM + S5;
const ROW_Y = BUS_Y + 80;
const ROW_MIDDLE = ROW_Y + NODE_H / 2;
const ROW_BOTTOM = ROW_Y + NODE_H;
const ROUTE_LABEL_Y = BUS_Y + S5 - S3;
const LOOP_TOP = ROW_Y - S4;

const LOWER_Y = ROW_BOTTOM + 110;
const LOWER_MIDDLE = LOWER_Y + NODE_H / 2;
const TEXT_BUS_Y = ROW_BOTTOM + S5;
const TEXT_ARROW_X = LINK_X + NODE_W - S5;

const CHIP_H = S4;
const CHIP_PITCH = CHIP_H + S2;
const ZONE_PAD = 24;
const ZONE_H = S5 + 3 * CHIP_PITCH + S3 - S2;
const HEIGHT = LOWER_Y + ZONE_H + 40;

const CHIPS = ["Religion", "People", "Organisations"];

const ROUTES_BUS =
  `M${CATEGORY_MIDDLE} ${ROW_Y} L${CATEGORY_MIDDLE} ${BUS_Y} L${SITE_MIDDLE} ${BUS_Y} L${SITE_MIDDLE} ${ROW_Y}`;
const TEXT_ROUTE =
  `M${TEXT_ARROW_X} ${ROW_BOTTOM} L${TEXT_ARROW_X} ${TEXT_BUS_Y} L${SITE_MIDDLE} ${TEXT_BUS_Y} L${SITE_MIDDLE} ${
    LOWER_Y - ARROW_GAP
  }`;
const PARENT_LOOP = `M${CATEGORY_MIDDLE + 60} ${ROW_Y} L${
  CATEGORY_MIDDLE + 60
} ${LOOP_TOP} L${CATEGORY_X + NODE_W - S4} ${LOOP_TOP} L${
  CATEGORY_X + NODE_W - S4
} ${ROW_Y - ARROW_GAP}`;
const NEAR_LINK = `M${LINK_MIDDLE} ${LOWER_Y} L${LINK_MIDDLE} ${ROW_BOTTOM}`;
const NEAR_CATEGORY =
  `M${LINK_X} ${LOWER_MIDDLE} L${CATEGORY_MIDDLE} ${LOWER_MIDDLE} L${CATEGORY_MIDDLE} ${ROW_BOTTOM}`;

function across(fromX: number, toX: number): string {
  return `M${fromX} ${ROW_MIDDLE} L${toX - ARROW_GAP} ${ROW_MIDDLE}`;
}

function Count(
  { right, text, top }: { right: number; text: string; top: number },
) {
  return (
    <Label
      anchor="end"
      kind="data"
      text={text}
      x={right - DATA_INSET}
      y={top + NAME_BASELINE}
    />
  );
}

export default function ZigOntology() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="What the directory knows and how it is connected"
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Zone
        h={ZONE_H}
        label="Named in the text"
        w={NODE_W}
        x={SITE_X}
        y={LOWER_Y}
      />

      <Line d={ROUTES_BUS} />
      <Wire
        d={`M${LINK_MIDDLE} ${
          ROW_Y - ARROW_GAP
        } L${LINK_MIDDLE} ${COUNTRY_BOTTOM}`}
      />
      <Wire d={across(ROLE_X + ROLE_W, CATEGORY_X)} />
      <Wire d={across(LINK_X, CATEGORY_X + NODE_W)} />
      <Wire d={across(LINK_X + NODE_W, SITE_X)} />
      <Wire d={PARENT_LOOP} />
      <Wire d={TEXT_ROUTE} />
      <Guide d={NEAR_LINK} />
      <Guide d={NEAR_CATEGORY} />

      <Node
        lines={COUNTRY_LINES}
        title="Country"
        w={COUNTRY_W}
        x={COUNTRY_X}
        y={COUNTRY_Y}
      />
      <Count right={COUNTRY_X + COUNTRY_W} text="249 codes" top={COUNTRY_Y} />

      <Node
        lines={ROLE_LINES}
        title="Role"
        tone="ghost"
        w={ROLE_W}
        x={ROLE_X}
        y={ROW_Y}
      />
      <Count right={ROLE_X + ROLE_W} text="36 words" top={ROW_Y} />

      <Node
        lines={CATEGORY_LINES}
        title="Category"
        w={NODE_W}
        x={CATEGORY_X}
        y={ROW_Y}
      />
      <Count right={CATEGORY_X + NODE_W} text="632,471" top={ROW_Y} />

      <Node
        lines={LINK_LINES}
        title="Link"
        tone="focal"
        w={NODE_W}
        x={LINK_X}
        y={ROW_Y}
      />
      <Count right={LINK_X + NODE_W} text="3,042,241" top={ROW_Y} />

      <Node
        lines={SITE_LINES}
        title="Site, host, domain"
        w={NODE_W}
        x={SITE_X}
        y={ROW_Y}
      />

      <Node
        lines={MISSING_LINES}
        title="Not stored"
        tone="ghost"
        w={ROLE_W}
        x={ROLE_X}
        y={LOWER_Y}
      />
      <Node
        lines={SEMANTIC_LINES}
        title="Semantically near"
        w={NODE_W}
        x={LINK_X}
        y={LOWER_Y}
      />

      {CHIPS.map((text, index) => (
        <Chip
          h={CHIP_H}
          key={text}
          plain
          text={text}
          w={NODE_W - 2 * ZONE_PAD}
          x={SITE_X + ZONE_PAD}
          y={LOWER_Y + S5 + index * CHIP_PITCH}
        />
      ))}
      <Label
        anchor="end"
        kind="data"
        text="11"
        x={SITE_X + NODE_W - ZONE_PAD - S2}
        y={LOWER_Y + S5 + CHIP_H / 2 + S1 / 2}
      />

      <Label
        anchor="end"
        text="category named for the country"
        x={CATEGORY_MIDDLE - S2}
        y={ROUTE_LABEL_Y}
      />
      <Label
        anchor="end"
        text="a place named in the text"
        x={LINK_MIDDLE - S2}
        y={ROUTE_LABEL_Y}
      />
      <Label
        anchor="end"
        text="domain ending, like .jp"
        x={SITE_MIDDLE - S2}
        y={ROUTE_LABEL_Y}
      />
      <Label
        anchor="middle"
        text="looked up"
        x={(ROLE_X + ROLE_W + CATEGORY_X) / 2}
        y={ROW_MIDDLE - S2}
      />
      <Label
        anchor="middle"
        text="filed in"
        x={(CATEGORY_X + NODE_W + LINK_X) / 2}
        y={ROW_MIDDLE - S2}
      />
      <Label
        anchor="middle"
        text="hosted on"
        x={(LINK_X + NODE_W + SITE_X) / 2}
        y={ROW_MIDDLE - S2}
      />
      <Label
        text="sits inside"
        x={CATEGORY_X + NODE_W - S4 + S2}
        y={ROW_Y - S2}
      />
      <Label
        text="from the title and description"
        x={TEXT_ARROW_X + S2}
        y={TEXT_BUS_Y - S2}
      />
    </Canvas>
  );
}
