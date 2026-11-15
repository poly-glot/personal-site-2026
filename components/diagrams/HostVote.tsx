import {
  Chip,
  Label,
  Pair,
  Panel,
  S2,
  S3,
  S4,
  S5,
  type Tone,
} from "./parts.tsx";

const BEFORE_TEXT =
  "Before 7 April: a request to become host in a game of five players. The request itself counts as a yes. Two players vote no and two stay silent. The two silent players were counted as yes, so the request passed three to two.";

const AFTER_TEXT =
  "After the fix: the same request. Only the votes people cast are counted, so the two silent players are left out and the request is refused one to two.";

interface Ballot {
  counted?: string;
  silent?: boolean;
  tone?: Tone;
}

const PLAYERS = ["Asking", "Player 2", "Player 3", "Player 4", "Player 5"];

const BEFORE: Ballot[] = [
  { counted: "Yes" },
  { counted: "No" },
  { counted: "No" },
  { counted: "Yes", silent: true, tone: "focal" },
  { counted: "Yes", silent: true, tone: "focal" },
];

const AFTER: Ballot[] = [
  { counted: "Yes" },
  { counted: "No" },
  { counted: "No" },
  { silent: true, tone: "ghost" },
  { silent: true, tone: "ghost" },
];

const TOKEN_W = 86;
const STEP = 98;
const NAMES_Y = 68;
const TOKEN_TOP = NAMES_Y + S2;
const SILENT_Y = TOKEN_TOP + S5 + S3;
const RESULT_Y = SILENT_Y + S4;
const HEIGHT = RESULT_Y + S3;

function Count(
  { ballots, description, heading, result, title }: {
    ballots: Ballot[];
    description: string;
    heading: string;
    result: string;
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
      {ballots.map((ballot, index) => {
        const x = S3 + index * STEP;
        const centre = x + TOKEN_W / 2;

        return (
          <g key={PLAYERS[index]}>
            <Label
              anchor="middle"
              kind="caption"
              text={PLAYERS[index]}
              x={centre}
              y={NAMES_Y}
            />
            <Chip
              h={S5}
              strong
              text={ballot.counted}
              tone={ballot.tone}
              w={TOKEN_W}
              x={x}
              y={TOKEN_TOP}
            />
            {ballot.silent && (
              <Label
                anchor="middle"
                kind="caption"
                text="Silent"
                x={centre}
                y={SILENT_Y}
              />
            )}
          </g>
        );
      })}

      <Label kind="aside" text={result} x={S3} y={RESULT_Y} />
    </Panel>
  );
}

export default function HostVote() {
  return (
    <Pair>
      <Count
        ballots={BEFORE}
        description={BEFORE_TEXT}
        heading="Before 7 April"
        result="Counted as 3 yes to 2 no. The request passed."
        title="Before the fix: silent players counted as yes"
      />
      <Count
        ballots={AFTER}
        description={AFTER_TEXT}
        heading="After"
        result="Counted as 1 yes to 2 no. The request was refused."
        title="After the fix: only cast votes count"
      />
    </Pair>
  );
}
