import { Boundary, Canvas, Label, Node, Wire, Zone } from "./parts.tsx";

const DESCRIPTION =
  "Stripe, GitHub and Slack send webhooks to Firebase Hosting, which passes /w/* and /api/* across the trust boundary to a Deno receiver on Cloud Run. The receiver runs each script in a sandbox Worker and writes the log back to Firestore. The developer's browser signs in with Firebase Auth and reads only its own data.";

export default function TrustBoundary() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="HookLab's trust boundary"
      viewBox="0 0 1600 900"
    >
      <Zone h={800} label="OUTSIDE" w={330} x={40} y={50} />
      <Zone h={800} label="FIREBASE · ORDINARY PARTS" w={480} x={430} y={50} />
      <Zone
        h={800}
        label="CLOUD RUN · THE DANGEROUS JOB"
        w={520}
        x={1040}
        y={50}
      />
      <Boundary
        bottom={850}
        label="TRUST BOUNDARY"
        labelY={805}
        top={50}
        x={975}
      />

      <Wire d="M330 200 L478 200" />
      <Wire d="M330 405 L440 405 L440 255 L478 255" />
      <Wire d="M330 432 L478 432" />
      <Wire d="M440 432 L440 650 L478 650" />
      <Wire d="M862 214 L1088 214" />
      <Wire d="M1300 302 L1300 518" />
      <Wire d="M1088 280 L1020 280 L1020 700 L862 700" />

      <Node
        lines={["Stripe, GitHub, Slack, or any", "service that sends one."]}
        title="Webhook senders"
        w={260}
        x={70}
        y={130}
      />
      <Node
        lines={["The React app in a browser."]}
        title="Developer"
        w={260}
        x={70}
        y={360}
      />
      <Node
        lines={["Serves the app. Passes /w/* and", "/api/* to Cloud Run."]}
        title="Hosting"
        w={380}
        x={480}
        y={150}
      />
      <Node
        lines={["Google sign-in, or a guest with", "seeded data."]}
        title="Auth"
        w={380}
        x={480}
        y={376}
      />
      <Node
        lines={[
          "Users, endpoints and logs. Rules",
          "deny by default, owner only.",
        ]}
        title="Firestore"
        w={380}
        x={480}
        y={590}
      />
      <Node
        danger
        lines={[
          "Deno and Hono. /w/{id} takes any",
          "method from anyone. /api/* needs",
          "a signed-in user.",
        ]}
        title="Receiver"
        w={420}
        x={1090}
        y={150}
      />
      <Node
        danger
        lines={[
          "One Worker per run. Network, files,",
          "environment, subprocesses and",
          "native calls denied. Five seconds,",
          "then the default reply.",
        ]}
        title="Sandbox Worker"
        w={420}
        x={1090}
        y={520}
      />

      <Label text="WEBHOOK" x={352} y={188} />
      <Label text="APP" x={452} y={306} />
      <Label text="SIGN IN" x={340} y={454} />
      <Label anchor="end" text="OWN DATA ONLY" x={430} y={548} />
      <Label code text="/w/* · /api/*" x={905} y={200} />
      <Label text="RUN THE SCRIPT" x={1314} y={416} />
      <Label text="WRITE THE LOG" x={880} y={726} />
    </Canvas>
  );
}
