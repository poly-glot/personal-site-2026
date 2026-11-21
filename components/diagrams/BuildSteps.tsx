import {
  Boundary,
  Canvas,
  Label,
  Node,
  S2,
  S3,
  S4,
  S5,
  sheetNodeHeight,
  Wire,
} from "./parts.tsx";

interface Step {
  lines: string[];
  order: string;
  title: string;
  w: number;
  x: number;
}

const DESCRIPTION =
  "The work went in five steps, drawn left to right with an arrow from each to the next. First, content architecture: the pages, the content types and the navigation. Second, components: how each repeated piece of a page looks. Third, static pages: every page, built in plain HTML and CSS. A dashed line marked The CMS starts here separates those three steps from the last two. Fourth, the content model: a field for every word staff can change. Last, WordPress: the theme prints the fields into the same HTML.";

const SHEET_W = 1600;
const LONG_NAME_W = 329;
const STEP_W = 268;

const ARCHITECTURE_X = S3;
const COMPONENTS_X = ARCHITECTURE_X + LONG_NAME_W + S4;
const PAGES_X = COMPONENTS_X + STEP_W + S4;
const MODEL_X = PAGES_X + STEP_W + S5;
const WORDPRESS_X = MODEL_X + STEP_W + S4;
const CMS_LINE_X = MODEL_X - S5 / 2;

const STEPS: Step[] = [
  {
    lines: ["The pages, the content types", "and the navigation."],
    order: "First",
    title: "Content architecture",
    w: LONG_NAME_W,
    x: ARCHITECTURE_X,
  },
  {
    lines: ["How each repeated piece", "of a page looks."],
    order: "Second",
    title: "Components",
    w: STEP_W,
    x: COMPONENTS_X,
  },
  {
    lines: ["Every page, built in plain", "HTML and CSS."],
    order: "Third",
    title: "Static pages",
    w: STEP_W,
    x: PAGES_X,
  },
  {
    lines: ["A field for every word", "staff can change."],
    order: "Fourth",
    title: "Content model",
    w: STEP_W,
    x: MODEL_X,
  },
  {
    lines: ["The theme prints the fields", "into the same HTML."],
    order: "Last",
    title: "WordPress",
    w: STEP_W,
    x: WORDPRESS_X,
  },
];

const STEP_TOP = S5;
const STEP_H = sheetNodeHeight(STEPS[0].lines);
const STEP_MIDDLE = STEP_TOP + STEP_H / 2;
const CMS_LABEL_Y = STEP_TOP + STEP_H + S5;
const HEIGHT = CMS_LABEL_Y + S3;

function across(from: Step, to: Step): string {
  return `M${from.x + from.w} ${STEP_MIDDLE} L${to.x - 2} ${STEP_MIDDLE}`;
}

export default function BuildSteps() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="The five steps of the build, in order"
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Boundary
        bottom={CMS_LABEL_Y}
        label="The CMS starts here"
        labelY={CMS_LABEL_Y}
        top={S3}
        x={CMS_LINE_X}
      />

      {STEPS.slice(1).map((step, index) => (
        <Wire d={across(STEPS[index], step)} key={step.title} />
      ))}

      {STEPS.map((step) => (
        <Label
          key={step.order}
          kind="caption"
          text={step.order}
          x={step.x}
          y={STEP_TOP - S2}
        />
      ))}

      {STEPS.map((step) => (
        <Node
          key={step.title}
          lines={step.lines}
          title={step.title}
          w={step.w}
          x={step.x}
          y={STEP_TOP}
        />
      ))}
    </Canvas>
  );
}
