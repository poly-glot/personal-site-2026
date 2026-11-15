import type { ComponentChildren } from "preact";
import {
  Chip,
  Label,
  Line,
  Node,
  nodeHeight,
  Pair,
  Panel,
  PANEL_W,
  S2,
  S3,
  S4,
  S5,
  Wire,
} from "./parts.tsx";

const CARD_X = S3;
const CARD_W = 120;
const CARD_H = S5;
const CARDS_RIGHT = CARD_X + CARD_W;
const BUS_X = CARDS_RIGHT + S2;
const REGISTRY_X = BUS_X + S4;
const REGISTRY_W = 138;
const SERVER_W = 130;
const SERVER_X = PANEL_W - S3 - SERVER_W;

const FIRST_CARD = S5;
const SECOND_CARD = FIRST_CARD + CARD_H + S2;
const LAST_CARD = SECOND_CARD + CARD_H + S4;
const CARDS = [
  { text: "Card 1", top: FIRST_CARD },
  { text: "Card 2", top: SECOND_CARD },
  { text: "Card 600", top: LAST_CARD },
];
const MORE_Y = SECOND_CARD + CARD_H + S3;
const HEIGHT = LAST_CARD + CARD_H + S3;

const MIDDLES = CARDS.map((card) => card.top + CARD_H / 2);
const MIDDLE = MIDDLES[1];

const SERVER_LINES = ["Gets 600", "connections."];
const REGISTRY_LINES = ["One socket.", "Sends each", "update to its", "card."];
const SERVER_AFTER_LINES = ["Gets one", "connection."];

const BUS = [
  ...MIDDLES.map((y) => `M${CARDS_RIGHT} ${y} L${BUS_X} ${y}`),
  `M${BUS_X} ${MIDDLES[0]} L${BUS_X} ${MIDDLES[2]}`,
].join(" ");

function centredOn(lines: readonly string[]): number {
  return MIDDLE - nodeHeight(lines) / 2;
}

function arrow(fromX: number, toX: number): string {
  return `M${fromX} ${MIDDLE} L${toX - 2} ${MIDDLE}`;
}

const BEFORE_TEXT =
  "Before: every card on the dashboard opened its own websocket, so 600 cards meant 600 connections to the server as the page loaded.";

const AFTER_TEXT =
  "After: the dashboard opens one websocket. A registry receives every update and passes each one to the card that shows that asset, and the server sees one connection.";

function Dashboard(
  { children, description, heading, title }: {
    children: ComponentChildren;
    description: string;
    heading: string;
    title: string;
  },
) {
  return (
    <Panel
      description={description}
      heading={heading}
      height={HEIGHT}
      title={title}
    >
      <Line d={BUS} />
      {CARDS.map((card) => (
        <Chip
          h={CARD_H}
          key={card.text}
          strong
          text={card.text}
          w={CARD_W}
          x={CARD_X}
          y={card.top}
        />
      ))}
      <Label
        anchor="middle"
        kind="data"
        text="· · ·"
        x={CARD_X + CARD_W / 2}
        y={MORE_Y}
      />
      {children}
    </Panel>
  );
}

export default function SharedSocket() {
  return (
    <Pair>
      <Dashboard
        description={BEFORE_TEXT}
        heading="Before"
        title="Before: one websocket per card"
      >
        <Wire d={arrow(BUS_X, SERVER_X)} />
        <Label
          anchor="middle"
          text="600 sockets"
          x={(BUS_X + SERVER_X) / 2}
          y={MIDDLE - S2}
        />
        <Node
          lines={SERVER_LINES}
          title="Server"
          w={SERVER_W}
          x={SERVER_X}
          y={centredOn(SERVER_LINES)}
        />
      </Dashboard>

      <Dashboard
        description={AFTER_TEXT}
        heading="After"
        title="After: one websocket for the whole dashboard"
      >
        <Wire d={arrow(BUS_X, REGISTRY_X)} />
        <Node
          lines={REGISTRY_LINES}
          title="Registry"
          tone="focal"
          w={REGISTRY_W}
          x={REGISTRY_X}
          y={centredOn(REGISTRY_LINES)}
        />
        <Wire d={arrow(REGISTRY_X + REGISTRY_W, SERVER_X)} />
        <Node
          lines={SERVER_AFTER_LINES}
          title="Server"
          w={SERVER_W}
          x={SERVER_X}
          y={centredOn(SERVER_AFTER_LINES)}
        />
      </Dashboard>
    </Pair>
  );
}
