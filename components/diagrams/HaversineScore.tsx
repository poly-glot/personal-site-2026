import {
  Dot,
  Guide,
  Label,
  Line,
  Measure,
  Pair,
  Panel,
  S1,
  S2,
  S3,
} from "./parts.tsx";

const HEIGHT = 370;

const GLOBE_X = 260;
const GLOBE_Y = 226;
const GLOBE_R = 120;
const ANGLE_R = 26;
const PIN_DEG = -140;
const PLACE_DEG = -40;

const PLOT_LEFT = 76;
const PLOT_RIGHT = 484;
const PLOT_TOP = 89;
const PLOT_BOTTOM = 300;
const MAX_KM = 8000;
const MAX_POINTS = 5000;
const DECAY_KM = 2000;
const SAMPLE_KM = 100;
const MARKED_KM = [500, 2000, 5000];

interface Point {
  x: number;
  y: number;
}

function onCircle(radius: number, degrees: number): Point {
  const radians = degrees * Math.PI / 180;

  return {
    x: GLOBE_X + radius * Math.cos(radians),
    y: GLOBE_Y + radius * Math.sin(radians),
  };
}

function arc(radius: number): string {
  const from = onCircle(radius, PIN_DEG);
  const to = onCircle(radius, PLACE_DEG);

  return `M${from.x} ${from.y} A${radius} ${radius} 0 0 1 ${to.x} ${to.y}`;
}

function circle(radius: number): string {
  const left = GLOBE_X - radius;
  const right = GLOBE_X + radius;

  return `M${left} ${GLOBE_Y} A${radius} ${radius} 0 1 1 ${right} ${GLOBE_Y} A${radius} ${radius} 0 1 1 ${left} ${GLOBE_Y}`;
}

function score(km: number): number {
  return Math.round(MAX_POINTS * Math.exp(-km / DECAY_KM));
}

function plotted(km: number): Point {
  const x = PLOT_LEFT + (km / MAX_KM) * (PLOT_RIGHT - PLOT_LEFT);
  const y = PLOT_BOTTOM - (score(km) / MAX_POINTS) * (PLOT_BOTTOM - PLOT_TOP);

  return { x, y };
}

function curve(): string {
  const steps = MAX_KM / SAMPLE_KM;
  const points = Array.from(
    { length: steps + 1 },
    (_, step) => plotted(step * SAMPLE_KM),
  );

  return points.map(({ x, y }, i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(
    " ",
  );
}

function thousands(value: number): string {
  return value.toLocaleString("en-GB");
}

const MEASURE_TEXT =
  "A slice through the Earth. The pin and the real place sit on the surface. The haversine formula finds the angle theta between them, seen from the centre of the Earth. The distance along the curve is the Earth's radius, 6,371 km, times that angle. A straight line between them would cut through the Earth.";

const SCORE_TEXT =
  "Points against distance from the real place. A perfect pin scores 5,000. The score falls away smoothly: 3,894 points at 500 km, 1,839 at 2,000 km and 410 at 5,000 km.";

function Distance() {
  const pin = onCircle(GLOBE_R, PIN_DEG);
  const place = onCircle(GLOBE_R, PLACE_DEG);
  const radii =
    `M${pin.x} ${pin.y} L${GLOBE_X} ${GLOBE_Y} L${place.x} ${place.y}`;

  return (
    <Panel
      description={MEASURE_TEXT}
      heading="Measure the distance"
      height={HEIGHT}
      step={1}
      title="How the haversine formula measures the distance"
    >
      <Line d={circle(GLOBE_R)} />
      <Guide d={`M${pin.x} ${pin.y} L${place.x} ${place.y}`} />
      <Line d={radii} />
      <Line d={arc(ANGLE_R)} />
      <Measure d={arc(GLOBE_R)} />
      <Dot x={pin.x} y={pin.y} />
      <Dot x={place.x} y={place.y} />
      <Dot r={3} x={GLOBE_X} y={GLOBE_Y} />

      <Label
        anchor="middle"
        kind="data"
        text="distance = R × θ"
        x={GLOBE_X}
        y={GLOBE_Y - GLOBE_R - S2}
      />
      <Label
        anchor="end"
        kind="aside"
        text="Pin"
        x={pin.x - S2}
        y={pin.y - S1}
      />
      <Label kind="aside" text="Real place" x={place.x + S2} y={place.y - S1} />
      <Label
        anchor="middle"
        kind="note"
        text="straight line"
        x={GLOBE_X}
        y={pin.y + S3}
      />
      <Label
        anchor="middle"
        kind="data"
        text="θ"
        x={GLOBE_X}
        y={GLOBE_Y - ANGLE_R - S1}
      />
      <Label
        anchor="middle"
        kind="note"
        text="centre of the Earth"
        x={GLOBE_X}
        y={GLOBE_Y + S3 + 3}
      />
      <Label
        anchor="middle"
        kind="data"
        text="R = 6,371 km"
        x={GLOBE_X}
        y={GLOBE_Y + S3 + 3 + S3}
      />
    </Panel>
  );
}

function Points() {
  const axes =
    `M${PLOT_LEFT} ${PLOT_TOP} L${PLOT_LEFT} ${PLOT_BOTTOM} L${PLOT_RIGHT} ${PLOT_BOTTOM}`;

  return (
    <Panel
      description={SCORE_TEXT}
      heading="Turn it into points"
      height={HEIGHT}
      step={2}
      title="How the distance becomes points"
    >
      <Line d={axes} />
      <Measure d={curve()} />

      <Label
        anchor="end"
        kind="caption"
        text="Points"
        x={PLOT_LEFT - S2}
        y={PLOT_TOP - S2}
      />
      <Label
        anchor="end"
        kind="data"
        text={thousands(MAX_POINTS)}
        x={PLOT_LEFT - S2}
        y={PLOT_TOP + 5}
      />
      <Label
        anchor="end"
        kind="data"
        text="0"
        x={PLOT_LEFT - S2}
        y={PLOT_BOTTOM + 5}
      />
      <Label kind="data" text="0 km" x={PLOT_LEFT} y={PLOT_BOTTOM + S3} />
      <Label
        anchor="end"
        kind="data"
        text={`${thousands(MAX_KM)} km`}
        x={PLOT_RIGHT}
        y={PLOT_BOTTOM + S3}
      />
      <Label
        anchor="middle"
        kind="caption"
        text="Distance from the real place"
        x={(PLOT_LEFT + PLOT_RIGHT) / 2}
        y={PLOT_BOTTOM + S3 + S3 + 4}
      />

      {MARKED_KM.map((km) => {
        const { x, y } = plotted(km);

        return (
          <g key={km}>
            <Dot x={x} y={y} />
            <Label
              kind="data"
              text={`${thousands(score(km))} points`}
              x={x + S2}
              y={y - S3 - 3}
            />
            <Label
              kind="note"
              text={`${thousands(km)} km out`}
              x={x + S2}
              y={y - 5}
            />
          </g>
        );
      })}
    </Panel>
  );
}

export default function HaversineScore() {
  return (
    <Pair>
      <Distance />
      <Points />
    </Pair>
  );
}
