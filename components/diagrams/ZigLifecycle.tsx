import {
  Chip,
  Label,
  Line,
  Node,
  nodeHeight,
  Pair,
  Panel,
  S2,
  S3,
  S4,
  S5,
  Wire,
  Zone,
} from "./parts.tsx";

const SUBMIT_TEXT =
  "Step one, someone submits a link. They must be signed in; reading needs no account, submitting does. A four-step form takes the address and title, the description, the category and a confirmation. A duplicate address is refused at submission, drawn as a dashed box. Otherwise the link is stored as pending, and its embedding and the places, names and religions in its text are added at once.";

const RULE_TEXT =
  "Step two, an admin rules on it, drawn as the subject. Three routes lead to the ruling: the admin screen, whose bulk bar takes up to 200 links at once; the API, with a bearer token that carries the admin role; and the MCP tool review_submission, for AI assistants. The ruling approves the link, which is then shown publicly, or rejects it, which keeps it off the public pages. Arrows both ways between the two show that a ruling can be reversed. The MCP reply adds the domain's standing: how many approved links it already holds.";

const FORM_STEPS = [
  "Address and title",
  "Description",
  "Category",
  "Confirm",
];

const ROUTES = [
  {
    first: "Bulk bar, up to 200",
    name: "Admin screen",
    second: "links at once.",
  },
  {
    first: "Bearer token with",
    name: "API",
    second: "the admin role.",
  },
  {
    first: "Through MCP, with",
    name: "AI assistant",
    second: "review_submission",
  },
];

const ARROW_GAP = 2;
const PANEL_INNER = 478;
const X = S3;
const CENTRE = X + PANEL_INNER / 2;
const CAPTION_Y = S5 + S2;
const CHIP_H = S4;
const CHIP_PITCH = CHIP_H + S2;
const CHIP_TEXT_DROP = 22;
const REVERSE_OFFSET = 6;

const SIGNED_LINES = ["Reading needs no account. Submitting does."];
const STORED_LINES = [
  "Its embedding and the places, names and",
  "religions in its text are added at once.",
];
const REFUSED_LINES = ["Already listed."];
const RULING_LINES = ["An admin approves or rejects."];
const APPROVED_LINES = ["Shown publicly."];
const REJECTED_LINES = ["Never shown publicly."];

const SIGNED_Y = S5;
const FORM_Y = SIGNED_Y + nodeHeight(SIGNED_LINES) + S4;
const FORM_W = 270;
const FORM_H = S5 + FORM_STEPS.length * CHIP_PITCH - S2 + S3;
const FORM_MIDDLE = FORM_Y + FORM_H / 2;
const FORM_CENTRE = X + FORM_W / 2;
const STORED_Y = FORM_Y + FORM_H + S4;
const REFUSED_X = X + FORM_W + S4;
const REFUSED_W = X + PANEL_INNER - REFUSED_X;
const REFUSED_Y = FORM_MIDDLE - nodeHeight(REFUSED_LINES) / 2;
const HEIGHT = STORED_Y + nodeHeight(STORED_LINES) + S3;

const ROUTE_W = 150;
const ROUTE_PITCH = ROUTE_W + S2;
const ROUTE_FIRST_Y = CAPTION_Y + S3;
const ROUTE_Y = ROUTE_FIRST_Y + S2;
const ROUTE_BOTTOM = ROUTE_Y + CHIP_H;
const ROUTES_BUS_Y = ROUTE_BOTTOM + S3;
const RULING_W = 300;
const RULING_Y = ROUTE_BOTTOM + S5 + S3;
const RULING_BOTTOM = RULING_Y + nodeHeight(RULING_LINES);
const OUTCOME_W = (PANEL_INNER - S4) / 2;
const OUTCOME_Y = RULING_BOTTOM + S5 + S3;
const OUTCOME_H = nodeHeight(APPROVED_LINES);
const OUTCOMES_BUS_Y = RULING_BOTTOM + S3;
const REJECTED_X = X + OUTCOME_W + S4;
const OUTCOME_MIDDLE = OUTCOME_Y + OUTCOME_H / 2;
const REVERSE_Y = OUTCOME_Y + OUTCOME_H + S4;
const STANDING_Y = REVERSE_Y + S4 + S2;

function drop(x: number, from: number, to: number): string {
  return `M${x} ${from} L${x} ${to - ARROW_GAP}`;
}

function routeX(index: number): number {
  return X + index * ROUTE_PITCH;
}

function routeCentre(index: number): number {
  return routeX(index) + ROUTE_W / 2;
}

function Submitting() {
  return (
    <Panel
      description={SUBMIT_TEXT}
      heading="Someone submits a link"
      height={HEIGHT}
      step={1}
      title="How a submitted link is stored as pending"
    >
      <Wire d={drop(CENTRE, SIGNED_Y + nodeHeight(SIGNED_LINES), FORM_Y)} />
      <Wire d={drop(FORM_CENTRE, FORM_Y + FORM_H, STORED_Y)} />
      <Wire
        d={`M${X + FORM_W} ${FORM_MIDDLE} L${
          REFUSED_X - ARROW_GAP
        } ${FORM_MIDDLE}`}
      />

      <Node
        lines={SIGNED_LINES}
        title="Signed in"
        w={PANEL_INNER}
        x={X}
        y={SIGNED_Y}
      />
      <Zone h={FORM_H} label="Four-step form" w={FORM_W} x={X} y={FORM_Y} />
      {FORM_STEPS.map((text, index) => (
        <g key={text}>
          <Chip
            h={CHIP_H}
            w={FORM_W - 2 * S3}
            x={X + S3}
            y={FORM_Y + S5 + index * CHIP_PITCH}
          />
          <Label
            kind="data"
            text={String(index + 1)}
            x={X + S3 + S2}
            y={FORM_Y + S5 + index * CHIP_PITCH + CHIP_TEXT_DROP}
          />
          <Label
            text={text}
            x={X + S3 + S2 + S3}
            y={FORM_Y + S5 + index * CHIP_PITCH + CHIP_TEXT_DROP}
          />
        </g>
      ))}

      <Label
        kind="caption"
        text="Duplicate address"
        x={REFUSED_X}
        y={REFUSED_Y - S2}
      />
      <Node
        lines={REFUSED_LINES}
        title="Refused"
        tone="ghost"
        w={REFUSED_W}
        x={REFUSED_X}
        y={REFUSED_Y}
      />
      <Node
        lines={STORED_LINES}
        title="Stored as pending"
        w={PANEL_INNER}
        x={X}
        y={STORED_Y}
      />
    </Panel>
  );
}

function Ruling() {
  const first = routeCentre(0);
  const last = routeCentre(2);
  const approvedMiddle = X + OUTCOME_W / 2;
  const rejectedMiddle = REJECTED_X + OUTCOME_W / 2;

  return (
    <Panel
      description={RULE_TEXT}
      heading="An admin rules on it"
      height={HEIGHT}
      step={2}
      title="How an admin approves or rejects a submission"
    >
      <Line
        d={`M${first} ${ROUTE_BOTTOM} L${first} ${ROUTES_BUS_Y} L${last} ${ROUTES_BUS_Y} L${last} ${ROUTE_BOTTOM} M${CENTRE} ${ROUTE_BOTTOM} L${CENTRE} ${ROUTES_BUS_Y}`}
      />
      <Wire d={drop(CENTRE, ROUTES_BUS_Y, RULING_Y)} />
      <Line
        d={`M${CENTRE} ${RULING_BOTTOM} L${CENTRE} ${OUTCOMES_BUS_Y} M${approvedMiddle} ${OUTCOMES_BUS_Y} L${rejectedMiddle} ${OUTCOMES_BUS_Y}`}
      />
      <Wire d={drop(approvedMiddle, OUTCOMES_BUS_Y, OUTCOME_Y)} />
      <Wire d={drop(rejectedMiddle, OUTCOMES_BUS_Y, OUTCOME_Y)} />
      <Wire
        d={`M${X + OUTCOME_W} ${OUTCOME_MIDDLE - REVERSE_OFFSET} L${
          REJECTED_X - ARROW_GAP
        } ${OUTCOME_MIDDLE - REVERSE_OFFSET}`}
      />
      <Wire
        d={`M${REJECTED_X} ${OUTCOME_MIDDLE + REVERSE_OFFSET} L${
          X + OUTCOME_W + ARROW_GAP
        } ${OUTCOME_MIDDLE + REVERSE_OFFSET}`}
      />

      {ROUTES.map((route, index) => (
        <g key={route.name}>
          <Label
            kind="caption"
            text={route.first}
            x={routeX(index)}
            y={CAPTION_Y}
          />
          <Label
            kind={index === 2 ? "data" : "caption"}
            text={route.second}
            x={routeX(index)}
            y={ROUTE_FIRST_Y}
          />
          <Chip
            h={CHIP_H}
            plain
            text={route.name}
            w={ROUTE_W}
            x={routeX(index)}
            y={ROUTE_Y}
          />
        </g>
      ))}

      <Node
        lines={RULING_LINES}
        title="Ruling"
        tone="focal"
        w={RULING_W}
        x={CENTRE - RULING_W / 2}
        y={RULING_Y}
      />
      <Node
        lines={APPROVED_LINES}
        title="Approved"
        w={OUTCOME_W}
        x={X}
        y={OUTCOME_Y}
      />
      <Node
        lines={REJECTED_LINES}
        title="Rejected"
        w={OUTCOME_W}
        x={REJECTED_X}
        y={OUTCOME_Y}
      />

      <Label
        anchor="middle"
        kind="aside"
        text="A ruling can be reversed."
        x={CENTRE}
        y={REVERSE_Y}
      />
      <Label
        kind="caption"
        text="The MCP reply adds the domain's standing:"
        x={X}
        y={STANDING_Y}
      />
      <Label
        kind="caption"
        text="how many approved links it already holds."
        x={X}
        y={STANDING_Y + S3}
      />
    </Panel>
  );
}

export default function ZigLifecycle() {
  return (
    <Pair>
      <Submitting />
      <Ruling />
    </Pair>
  );
}
