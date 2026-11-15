import {
  Boundary,
  Label,
  Node,
  nodeHeight,
  Panel,
  S2,
  S3,
  S4,
  Wire,
} from "./parts.tsx";

const DESCRIPTION =
  "One guess, step by step. The player's browser tells the server where the pin is. It sends no score and no distance. The server refuses a guess for the wrong round, a second guess or a number out of range. It measures how far the pin is from the real place and turns that into points. It stores the guess in the game record in the database and adds the points to the player's total. Every player's browser reads the game record through the database rules, drawn as a dashed line, and shows the new totals. Anything in the browser can be read and changed by the player. The server's code is out of the player's reach.";

const BROWSER_X = S3;
const SERVER_X = 277;
const NODE_W = 222;
const RULES_X = (BROWSER_X + NODE_W + SERVER_X) / 2;
const SERVER_CENTRE = SERVER_X + NODE_W / 2;

const PIN = [
  "The browser sends where",
  "the pin is. It sends no",
  "score and no distance.",
];
const CHECKS = [
  "Refuses a guess for the",
  "wrong round, a second",
  "guess or a bad number.",
];
const SCORE = [
  "Measures how far the",
  "pin is from the place.",
  "Turns that into points.",
];
const RECORD = ["Stores the guess and", "adds the points to", "your total."];
const BOARD = [
  "Every player's browser",
  "shows the new totals",
  "at the same moment.",
];
const REACH = ["Anything on this side,", "the player can read", "and change."];

const NODE_H = nodeHeight(PIN);
const COLUMNS_Y = 68;
const CHECKS_TOP = COLUMNS_Y + S2;
const SCORE_TOP = CHECKS_TOP + NODE_H + S4;
const DATABASE_Y = SCORE_TOP + NODE_H + S4;
const RECORD_TOP = DATABASE_Y + S2;
const RULES_LABEL = RECORD_TOP + NODE_H + S4;
const HEIGHT = RULES_LABEL + S3;

const CHECKS_MIDDLE = CHECKS_TOP + NODE_H / 2;
const RECORD_MIDDLE = RECORD_TOP + NODE_H / 2;
const BROWSER_RIGHT = BROWSER_X + NODE_W;
const REACH_TOP = SCORE_TOP + S4;

const TO_SERVER = `M${BROWSER_RIGHT} ${CHECKS_MIDDLE} L${
  SERVER_X - 2
} ${CHECKS_MIDDLE}`;
const TO_SCORE = `M${SERVER_CENTRE} ${CHECKS_TOP + NODE_H} L${SERVER_CENTRE} ${
  SCORE_TOP - 2
}`;
const TO_RECORD = `M${SERVER_CENTRE} ${SCORE_TOP + NODE_H} L${SERVER_CENTRE} ${
  RECORD_TOP - 2
}`;
const TO_BROWSERS = `M${SERVER_X} ${RECORD_MIDDLE} L${
  BROWSER_RIGHT + 2
} ${RECORD_MIDDLE}`;

export default function GuessJourney() {
  return (
    <Panel
      description={DESCRIPTION}
      heading="One guess, from pin to leaderboard"
      height={HEIGHT}
      title="How OpenGuessr scores one guess"
    >
      <Label
        kind="caption"
        text="Each player's browser"
        x={BROWSER_X}
        y={COLUMNS_Y}
      />
      <Label kind="caption" text="Server" x={SERVER_X} y={COLUMNS_Y} />
      <Label kind="caption" text="Database" x={SERVER_X} y={DATABASE_Y} />

      <Boundary
        bottom={RULES_LABEL}
        label="Database rules"
        labelY={RULES_LABEL}
        top={DATABASE_Y - S2}
        x={RULES_X}
      />

      <Wire d={TO_SERVER} />
      <Wire d={TO_SCORE} />
      <Wire d={TO_RECORD} />
      <Wire d={TO_BROWSERS} />

      <Node
        lines={PIN}
        title="Your pin"
        w={NODE_W}
        x={BROWSER_X}
        y={CHECKS_TOP}
      />
      <Node
        lines={CHECKS}
        title="The checks"
        w={NODE_W}
        x={SERVER_X}
        y={CHECKS_TOP}
      />
      <Node
        lines={SCORE}
        title="The score"
        tone="focal"
        w={NODE_W}
        x={SERVER_X}
        y={SCORE_TOP}
      />
      <Node
        lines={RECORD}
        title="Game record"
        w={NODE_W}
        x={SERVER_X}
        y={RECORD_TOP}
      />
      <Node
        lines={BOARD}
        title="Leaderboard"
        w={NODE_W}
        x={BROWSER_X}
        y={RECORD_TOP}
      />

      {REACH.map((line, index) => (
        <Label
          key={line}
          kind="aside"
          text={line}
          x={BROWSER_X}
          y={REACH_TOP + index * S3}
        />
      ))}
    </Panel>
  );
}
