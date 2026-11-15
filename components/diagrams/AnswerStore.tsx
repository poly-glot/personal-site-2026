import type { ComponentChildren } from "preact";
import {
  Boundary,
  Chip,
  Label,
  Pair,
  Panel,
  S2,
  S3,
  S4,
  type Tone,
} from "./parts.tsx";

const TODAY_TEXT =
  "Today: every player can read the coordinates of all five rounds, because they sit in the game record on the readable side of the database rules. Only the five countries are kept where the server alone can read them.";

const PLAN_TEXT =
  "The plan, which is not built yet: the coordinates of all five rounds are kept where only the server can read them, next to the countries. Every player can still read the coordinates of one round, the round on screen.";

const READABLE_X = S3;
const SERVER_X = 277;
const RULES_X = 260;
const ROUNDS = [1, 2, 3, 4, 5];
const STEP = S4 + S2;

const COLUMNS_Y = 68;
const FIRST_GROUP = COLUMNS_Y + S4;
const NOTE_OFFSET = S3;
const TOKENS_OFFSET = S4;
const GROUP_STEP = TOKENS_OFFSET + S4 + S4 + 15;
const SECOND_GROUP = FIRST_GROUP + GROUP_STEP;
const RULES_LABEL = SECOND_GROUP + TOKENS_OFFSET + S4 + S4;
const HEIGHT = RULES_LABEL + S3;

function Group(
  { name, note, tones, x, y }: {
    name: string;
    note: string;
    tones?: readonly (Tone | undefined)[];
    x: number;
    y: number;
  },
) {
  return (
    <g>
      <Label kind="name" text={name} x={x} y={y} />
      <Label kind="note" text={note} x={x} y={y + NOTE_OFFSET} />
      {ROUNDS.map((round, index) => (
        <Chip
          key={round}
          text={tones?.[index] === "ghost" ? undefined : String(round)}
          tone={tones?.[index]}
          w={S4}
          x={x + index * STEP}
          y={y + TOKENS_OFFSET}
        />
      ))}
    </g>
  );
}

function Store(
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
      <Label
        kind="caption"
        text="Every player can read"
        x={READABLE_X}
        y={COLUMNS_Y}
      />
      <Label
        kind="caption"
        text="Only the server can read"
        x={SERVER_X}
        y={COLUMNS_Y}
      />
      <Boundary
        bottom={RULES_LABEL}
        label="Database rules"
        labelY={RULES_LABEL}
        top={COLUMNS_Y - S2}
        x={RULES_X}
      />
      <Group
        name="Countries"
        note="One for each round."
        x={SERVER_X}
        y={SECOND_GROUP}
      />
      {children}
    </Panel>
  );
}

const ALL_EXPOSED: Tone[] = ["focal", "focal", "focal", "focal", "focal"];
const ONE_EXPOSED: Tone[] = ["focal", "ghost", "ghost", "ghost", "ghost"];

export default function AnswerStore() {
  return (
    <Pair>
      <Store
        description={TODAY_TEXT}
        heading="Today"
        title="Today: every player can read the coordinates of all five rounds"
      >
        <Group
          name="Coordinates"
          note="One pair for each round."
          tones={ALL_EXPOSED}
          x={READABLE_X}
          y={FIRST_GROUP}
        />
      </Store>

      <Store
        description={PLAN_TEXT}
        heading="The plan, not built yet"
        title="The plan: players can read one round's coordinates at a time"
      >
        <Group
          name="Coordinates"
          note="Only the round on screen."
          tones={ONE_EXPOSED}
          x={READABLE_X}
          y={FIRST_GROUP}
        />
        <Group
          name="Coordinates"
          note="One pair for each round."
          x={SERVER_X}
          y={FIRST_GROUP}
        />
      </Store>
    </Pair>
  );
}
