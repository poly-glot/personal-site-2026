import { Canvas, Label, Line, Node, nodeHeight, Wire, Zone } from "./parts.tsx";
import styles from "./diagram.module.css";

const CARD_X = 24;
const REGISTRY_X = 245;
const SERVER_X = 466;
const NODE_W = 150;
const CARD_GAP = [0, 90, 202];
const CARD_MIDDLE = 39;
const STUB = 36;
const TOP = 60;
const HALF_W = 640;

function Cards({ top }: { top: number }) {
  return (
    <g>
      <Node lines={[]} title="Card 1" w={NODE_W} x={CARD_X} y={top} />
      <Node
        lines={[]}
        title="Card 2"
        w={NODE_W}
        x={CARD_X}
        y={top + CARD_GAP[1]}
      />
      <Label
        anchor="middle"
        text="· · ·"
        x={CARD_X + NODE_W / 2}
        y={top + 190}
      />
      <Node
        lines={[]}
        title="Card 600"
        w={NODE_W}
        x={CARD_X}
        y={top + CARD_GAP[2]}
      />
    </g>
  );
}

const CARDS_RIGHT = CARD_X + NODE_W;
const BUS_X = CARDS_RIGHT + STUB;
const SERVER_LINES = ["Gets 600", "connections."];
const REGISTRY_LINES = ["One socket.", "Sends each", "update to its", "card."];
const SERVER_AFTER_LINES = ["Gets one", "connection."];

function cardMiddles(top: number): number[] {
  return CARD_GAP.map((gap) => top + gap + CARD_MIDDLE);
}

function bus(top: number): string {
  const middles = cardMiddles(top);
  const stubs = middles.map((y) => `M${CARDS_RIGHT} ${y} L${BUS_X} ${y}`);
  const spine = `M${BUS_X} ${middles[0]} L${BUS_X} ${middles.at(-1)}`;

  return [...stubs, spine].join(" ");
}

function centredOn(middle: number, lines: readonly string[]): number {
  return middle - nodeHeight(lines) / 2;
}

function arrow(fromX: number, toX: number, y: number): string {
  return `M${fromX} ${y} L${toX - 2} ${y}`;
}

const VIEW_BOX = `0 0 ${HALF_W} 366`;

const BEFORE_TEXT =
  "Before: every card on the dashboard opened its own websocket, so 600 cards meant 600 connections to the server as the page loaded.";

const AFTER_TEXT =
  "After: the dashboard opens one websocket. A registry receives every update and passes each one to the card that shows that asset, and the server sees one connection.";

export default function SharedSocket() {
  const middle = cardMiddles(TOP)[1];

  return (
    <div class={styles.pairFrame}>
      <div class={styles.pair}>
        <Canvas
          description={BEFORE_TEXT}
          narrow
          title="Before: one websocket per card"
          viewBox={VIEW_BOX}
        >
          <Zone h={364} label="BEFORE" w={HALF_W - 2} x={1} y={1} />
          <Cards top={TOP} />
          <Line d={bus(TOP)} />
          <Wire d={arrow(BUS_X, SERVER_X, middle)} />
          <Label anchor="middle" text="600 SOCKETS" x={338} y={middle - 14} />
          <Node
            lines={SERVER_LINES}
            title="Server"
            w={NODE_W}
            x={SERVER_X}
            y={centredOn(middle, SERVER_LINES)}
          />
        </Canvas>

        <Canvas
          description={AFTER_TEXT}
          narrow
          title="After: one websocket for the whole dashboard"
          viewBox={VIEW_BOX}
        >
          <Zone h={364} label="AFTER" w={HALF_W - 2} x={1} y={1} />
          <Cards top={TOP} />
          <Line d={bus(TOP)} />
          <Wire d={arrow(BUS_X, REGISTRY_X, middle)} />
          <Node
            danger
            lines={REGISTRY_LINES}
            title="Registry"
            w={NODE_W}
            x={REGISTRY_X}
            y={centredOn(middle, REGISTRY_LINES)}
          />
          <Wire d={arrow(REGISTRY_X + NODE_W, SERVER_X, middle)} />
          <Node
            lines={SERVER_AFTER_LINES}
            title="Server"
            w={NODE_W}
            x={SERVER_X}
            y={centredOn(middle, SERVER_AFTER_LINES)}
          />
        </Canvas>
      </div>
    </div>
  );
}
