import {
  Canvas,
  Chip,
  Label,
  Line,
  Node,
  S2,
  S4,
  S5,
  Wire,
  Zone,
} from "./parts.tsx";

interface Box {
  w: number;
  x: number;
}

const DESCRIPTION =
  "A visitor opens a short link. The edge function reads the visitor's country, region, platform and device and writes them as one string, the segment, such as IN|MH|android|mobile. CloudFront files each stored answer under the link's path plus the segment, so a hit returns the stored 302 without starting the redirect function. On a miss, the Rust redirect function reads the same segment, makes one read of the link's row in DynamoDB by its code, and the first rule that matches wins. The function keeps no click counter and never writes. Clicks are counted later: CloudFront's access log records cache hits too, and each day at 02:15 UTC one Athena query reads the previous day's logs.";

const ROW = 210;
const TALL = 126;
const SHORT = 102;
const MIDDLE = ROW + TALL / 2;
const SHORT_TOP = MIDDLE - SHORT / 2;

const VISITOR: Box = { w: 210, x: 50 };
const EDGE: Box = { w: 260, x: 300 };
const CACHE: Box = { w: 280, x: 620 };
const REDIRECT: Box = { w: 280, x: 990 };
const TABLE: Box = { w: 200, x: 1350 };
const COUNT: Box = { w: 280, x: 50 };

const SEGMENT_W = 240;
const SEGMENT_TOP = ROW - S5 - S5;
const SEGMENT_MIDDLE = SEGMENT_TOP + S5 / 2;

const ZONE_X = 20;
const ZONE_W = 1560;
const ZONE_TOP = 30;
const GHOST_TOP = ROW + TALL + S5;
const FIRST_ZONE_H = GHOST_TOP + SHORT + S4 - ZONE_TOP;
const SECOND_ZONE_TOP = ZONE_TOP + FIRST_ZONE_H + S4;
const LATER_ROW = SECOND_ZONE_TOP + S5 + S2;
const LATER_MIDDLE = LATER_ROW + TALL / 2;
const SECOND_ZONE_H = LATER_ROW + TALL + S4 - SECOND_ZONE_TOP;
const HEIGHT = SECOND_ZONE_TOP + SECOND_ZONE_H + ZONE_TOP;

function centre(box: Box): number {
  return box.x + box.w / 2;
}

function right(box: Box): number {
  return box.x + box.w;
}

const EDGE_CENTRE = centre(EDGE);
const CACHE_CENTRE = centre(CACHE);
const REDIRECT_CENTRE = centre(REDIRECT);

export default function RedirectPath() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="What happens when someone opens a short link"
      viewBox={`0 0 1600 ${HEIGHT}`}
    >
      <Zone
        h={FIRST_ZONE_H}
        label="Each click"
        w={ZONE_W}
        x={ZONE_X}
        y={ZONE_TOP}
      />
      <Zone
        h={SECOND_ZONE_H}
        label="Counted later"
        w={ZONE_W}
        x={ZONE_X}
        y={SECOND_ZONE_TOP}
      />

      <Wire d={`M${right(VISITOR)} ${MIDDLE} L${EDGE.x - 2} ${MIDDLE}`} />
      <Wire
        d={`M${EDGE_CENTRE} ${ROW} L${EDGE_CENTRE} ${SEGMENT_TOP + S5 + 2}`}
      />
      <Line
        d={`M${
          EDGE_CENTRE + SEGMENT_W / 2
        } ${SEGMENT_MIDDLE} L${REDIRECT_CENTRE} ${SEGMENT_MIDDLE}`}
      />
      <Wire
        d={`M${CACHE_CENTRE} ${SEGMENT_MIDDLE} L${CACHE_CENTRE} ${ROW - 2}`}
      />
      <Wire
        d={`M${REDIRECT_CENTRE} ${SEGMENT_MIDDLE} L${REDIRECT_CENTRE} ${
          ROW - 2
        }`}
      />
      <Wire d={`M${right(CACHE)} ${MIDDLE} L${REDIRECT.x - 2} ${MIDDLE}`} />
      <Wire d={`M${right(REDIRECT)} ${MIDDLE} L${TABLE.x - 2} ${MIDDLE}`} />
      <Wire
        d={`M${CACHE_CENTRE} ${ROW + TALL} L${CACHE_CENTRE} ${LATER_ROW - 2}`}
      />
      <Wire
        d={`M${CACHE.x} ${LATER_MIDDLE} L${right(COUNT) + 2} ${LATER_MIDDLE}`}
      />

      <Label
        kind="caption"
        text="The segment"
        x={EDGE_CENTRE - SEGMENT_W / 2}
        y={SEGMENT_TOP - S2}
      />
      <Chip
        h={S5}
        text="IN|MH|android|mobile"
        tone="focal"
        w={SEGMENT_W}
        x={EDGE_CENTRE - SEGMENT_W / 2}
        y={SEGMENT_TOP}
      />

      <Node
        lines={["Opens a short link."]}
        title="Visitor"
        w={VISITOR.w}
        x={VISITOR.x}
        y={SHORT_TOP}
      />
      <Node
        lines={["Reads country, region,", "platform and device."]}
        title="Edge function"
        w={EDGE.w}
        x={EDGE.x}
        y={ROW}
      />
      <Node
        lines={["A hit returns the stored", "302 without the function."]}
        title="CloudFront"
        w={CACHE.w}
        x={CACHE.x}
        y={ROW}
      />
      <Node
        lines={["The Rust function. The", "first rule that matches wins."]}
        title="Redirect"
        w={REDIRECT.w}
        x={REDIRECT.x}
        y={ROW}
      />
      <Node
        lines={["The link's row,", "by its code."]}
        title="DynamoDB"
        w={TABLE.w}
        x={TABLE.x}
        y={ROW}
      />
      <Node
        lines={["The function never writes."]}
        title="Click counter"
        tone="ghost"
        w={REDIRECT.w}
        x={REDIRECT.x}
        y={GHOST_TOP}
      />

      <Node
        lines={["CloudFront's own log. It", "records cache hits too."]}
        title="Access log"
        w={CACHE.w}
        x={CACHE.x}
        y={LATER_ROW}
      />
      <Node
        lines={["One Athena query reads", "the previous day's logs."]}
        title="Nightly count"
        w={COUNT.w}
        x={COUNT.x}
        y={LATER_ROW}
      />

      <Label
        text="Cache key, with the path"
        x={CACHE_CENTRE + S2}
        y={ROW - S4}
      />
      <Label text="Picks the rule" x={REDIRECT_CENTRE + S2} y={ROW - S4} />
      <Label
        anchor="middle"
        text="Miss"
        x={(right(CACHE) + REDIRECT.x) / 2}
        y={MIDDLE - S2}
      />
      <Label
        anchor="middle"
        text="One read"
        x={(right(REDIRECT) + TABLE.x) / 2}
        y={MIDDLE - S2}
      />
      <Label
        anchor="middle"
        text="Each day at 02:15 UTC"
        x={(right(COUNT) + CACHE.x) / 2}
        y={LATER_MIDDLE - S2}
      />
    </Canvas>
  );
}
