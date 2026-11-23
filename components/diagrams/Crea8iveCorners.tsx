import {
  Canvas,
  Guide,
  Label,
  Node,
  S2,
  S3,
  S4,
  S5,
  sheetNodeHeight,
  Slab,
  Wire,
  Zone,
} from "./parts.tsx";

const IE_LINES = [
  "Got its own stylesheet and a",
  "patch for transparent images.",
];

const SHEET_W = 1600;
const ZONE_TOP = S3;
const PARTS_X = 80;
const PARTS_ZONE_W = 720;
const RESULT_ZONE_X = 900;
const RESULT_ZONE_W = 580;

const CAP_H = S5;
const TILE_H = S5;
const STRIP_H = 3 * TILE_H;
const BOX_H = 2 * CAP_H + STRIP_H;

const SLAB_X = PARTS_X + S4;
const SLAB_W = 300;
const LABEL_X = SLAB_X + SLAB_W + S4;

const TOP_Y = ZONE_TOP + S5;
const STRIP_Y = TOP_Y + CAP_H + S2;
const BOTTOM_Y = STRIP_Y + STRIP_H + S2;
const STACK_BOTTOM = BOTTOM_Y + CAP_H;
const CAPTION_Y = STACK_BOTTOM + S4;

const RESULT_X = RESULT_ZONE_X + S4;
const RESULT_W = 500;
const RESULT_Y = TOP_Y;
const RESULT_MIDDLE = RESULT_Y + BOX_H / 2;
const IE_Y = RESULT_Y + BOX_H + S4;
const IE_H = sheetNodeHeight(IE_LINES);

const ZONE_BOTTOM = IE_Y + IE_H + S3;
const HEIGHT = ZONE_BOTTOM + S3;
const ARROW_GAP = 2;
const NAME_DROP = 26;
const NOTE_DROP = 50;

const DESCRIPTION =
  "How a rounded box was built in 2007, before browsers could round corners with a line of style. A box was three images stacked: a top cap with rounded top corners, a thin strip that repeats down the box to fit the text, drawn as the subject, and a bottom cap with rounded bottom corners. Put together they make one rounded box that fits any amount of text. Internet Explorer 6 got its own stylesheet and a patch for transparent images.";

function Part(
  { height, name, note, round, y }: {
    height: number;
    name: string;
    note: string;
    round: "bottom" | "top";
    y: number;
  },
) {
  return (
    <g>
      <Slab h={height} round={round} w={SLAB_W} x={SLAB_X} y={y} />
      <Label kind="name" text={name} x={LABEL_X} y={y + NAME_DROP} />
      <Label kind="note" text={note} x={LABEL_X} y={y + NOTE_DROP} />
    </g>
  );
}

export default function Crea8iveCorners() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="How a rounded box was built in 2007"
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      <Zone
        h={ZONE_BOTTOM - ZONE_TOP}
        label="Three images, stacked"
        w={PARTS_ZONE_W}
        x={PARTS_X}
        y={ZONE_TOP}
      />
      <Zone
        h={ZONE_BOTTOM - ZONE_TOP}
        label="What the visitor sees"
        w={RESULT_ZONE_W}
        x={RESULT_ZONE_X}
        y={ZONE_TOP}
      />

      <Wire
        d={`M${PARTS_X + PARTS_ZONE_W} ${RESULT_MIDDLE} L${
          RESULT_ZONE_X - ARROW_GAP
        } ${RESULT_MIDDLE}`}
      />

      <Part
        height={CAP_H}
        name="Top cap"
        note="Rounded top corners, one image."
        round="top"
        y={TOP_Y}
      />

      <Slab
        h={STRIP_H}
        radius={0}
        round="top"
        tone="focal"
        w={SLAB_W}
        x={SLAB_X}
        y={STRIP_Y}
      />
      <Guide
        d={`M${SLAB_X} ${STRIP_Y + TILE_H} L${SLAB_X + SLAB_W} ${
          STRIP_Y + TILE_H
        }`}
      />
      <Guide
        d={`M${SLAB_X} ${STRIP_Y + 2 * TILE_H} L${SLAB_X + SLAB_W} ${
          STRIP_Y + 2 * TILE_H
        }`}
      />
      <Label
        kind="name"
        text="Repeating strip"
        x={LABEL_X}
        y={STRIP_Y + STRIP_H / 2 - S2 / 2}
      />
      <Label
        kind="note"
        text="A thin slice, repeated to fit."
        x={LABEL_X}
        y={STRIP_Y + STRIP_H / 2 + S3}
      />

      <Part
        height={CAP_H}
        name="Bottom cap"
        note="Rounded bottom corners, one image."
        round="bottom"
        y={BOTTOM_Y}
      />

      <Label
        kind="aside"
        text="The strip repeats until the box is tall enough."
        x={SLAB_X}
        y={CAPTION_Y}
      />

      <Slab
        h={BOX_H}
        round="all"
        w={RESULT_W}
        x={RESULT_X}
        y={RESULT_Y}
      />
      <Label
        kind="aside"
        text="A box that fits any amount of text"
        x={RESULT_X + S3}
        y={RESULT_MIDDLE - S2 / 2}
      />
      <Label
        kind="note"
        text="Built from the same three images."
        x={RESULT_X + S3}
        y={RESULT_MIDDLE + S3}
      />

      <Node
        lines={IE_LINES}
        title="Internet Explorer 6"
        w={RESULT_W}
        x={RESULT_X}
        y={IE_Y}
      />
    </Canvas>
  );
}
