import { Canvas, Node, Wire, Zone } from "./parts.tsx";

const DESCRIPTION =
  "Once a day, Gemini suggests 50 ordinary streets. Google's Street View metadata confirms each has a panorama within 1 km and moves it onto that panorama. Places within about a kilometre of one already kept are dropped, and the pool holds up to 500. Each game shuffles the pool and deals five places with the clues hidden.";

const TOP = 120;
const MIDDLE = TOP + 75;

export default function LocationPipeline() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="How OpenGuessr picks its places"
      viewBox="0 0 1600 400"
    >
      <Zone h={340} label="ONCE A DAY" w={1220} x={20} y={30} />
      <Zone h={340} label="EACH GAME" w={320} x={1260} y={30} />

      <Wire d={`M310 ${MIDDLE} L348 ${MIDDLE}`} />
      <Wire d={`M610 ${MIDDLE} L648 ${MIDDLE}`} />
      <Wire d={`M910 ${MIDDLE} L948 ${MIDDLE}`} />
      <Wire d={`M1210 ${MIDDLE} L1288 ${MIDDLE}`} />

      <Node
        lines={[
          "50 ordinary streets",
          "across at least four",
          "world regions.",
        ]}
        title="Suggest"
        w={260}
        x={50}
        y={TOP}
      />
      <Node
        lines={[
          "Street View must have",
          "a panorama within",
          "1 km. Move onto it.",
        ]}
        title="Check"
        w={260}
        x={350}
        y={TOP}
      />
      <Node
        lines={[
          "Drop anything within",
          "about 1 km of a place",
          "already kept.",
        ]}
        title="Thin out"
        w={260}
        x={650}
        y={TOP}
      />
      <Node
        lines={["Up to 500 checked", "places, topped up", "every day."]}
        title="Pool"
        w={260}
        x={950}
        y={TOP}
      />
      <Node
        danger
        lines={["Shuffle the pool and", "deal five, with the", "clues hidden."]}
        title="Deal"
        w={260}
        x={1290}
        y={TOP}
      />
    </Canvas>
  );
}
