import {
  Node,
  nodeHeight,
  Pair,
  Panel,
  PANEL_W,
  S2,
  S3,
  type Tone,
} from "./parts.tsx";

interface Decision {
  check: string;
  decision: string;
}

const WITH_CHECK: readonly Decision[] = [
  {
    check: "HookLab: a rules test puts a guest at the limit, expects a refusal",
    decision: "Guests get 10 endpoints",
  },
  {
    check: "OpenGuessr: rules tests refuse score writes",
    decision: "Only the server writes scores",
  },
  {
    check: "This site: a hook flags the edit and says what to do",
    decision: "No inline styles",
  },
  {
    check: "firebase-cloud: Terraform fails and names the secret",
    decision: "The signing key must be a real key",
  },
];

const WITHOUT_CHECK: readonly Decision[] = [
  {
    check: "HookLab README: nothing tests it, and the rules say 10",
    decision: "Guests get 3 endpoints",
  },
  {
    check: "OpenGuessr README: its test uses a sample game",
    decision: "Upcoming answers stay hidden",
  },
  {
    check: "firebase-cloud: OpenGuessr leaves it out, nothing fails",
    decision: "Every app declares a codebase",
  },
  {
    check: "firebase-cloud README: it lists 8, and 12 exist",
    decision: "The README lists every module",
  },
];

const FIRST_TOP = 68;
const NODE_X = S3;
const NODE_W = PANEL_W - 2 * S3;
const ROW_HEIGHT = nodeHeight(["one line"]);
const STEP = ROW_HEIGHT + S2;
const HEIGHT = FIRST_TOP + WITH_CHECK.length * STEP - S2 + S3;

function describe(heading: string, decisions: readonly Decision[]): string {
  const sentences = decisions.map((item) => `${item.decision}. ${item.check}.`);

  return `${heading}. ${sentences.join(" ")}`;
}

function Ledger(
  { decisions, heading, title, tone }: {
    decisions: readonly Decision[];
    heading: string;
    title: string;
    tone?: Tone;
  },
) {
  return (
    <Panel
      description={describe(heading, decisions)}
      heading={heading}
      height={HEIGHT}
      title={title}
    >
      {decisions.map((item, index) => (
        <Node
          key={item.decision}
          lines={[item.check]}
          title={item.decision}
          tone={tone}
          w={NODE_W}
          x={NODE_X}
          y={FIRST_TOP + index * STEP}
        />
      ))}
    </Panel>
  );
}

export default function DecisionLedger() {
  return (
    <Pair>
      <Ledger
        decisions={WITH_CHECK}
        heading="Decisions something checks"
        title="Four decisions that something checks"
      />
      <Ledger
        decisions={WITHOUT_CHECK}
        heading="Decisions nothing checks"
        title="Four decisions that nothing checks"
        tone="ghost"
      />
    </Pair>
  );
}
