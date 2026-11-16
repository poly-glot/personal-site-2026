import { Canvas, Label, Node, S1, S2, S4, S5, Wire, Zone } from "./parts.tsx";

const DESCRIPTION =
  "Two services, Drupal for editors and Next.js for travellers. In Drupal, editors place components on a page in Canvas, fill in their words and save, and Drupal stores the page. Next.js asks Drupal's content API for each page, draws it from the 48 React components and keeps a copy in its cache, and travellers outside get the page from that cache. Once a saved page is in the database, a small Drupal module sends Next.js one request with a secret token. A good token expires the cached copy at once, so the next visitor gets the new page.";

const SHEET_W = 1600;
const ZONE_Y = 30;
const ZONE_W = 400;
const ZONE_GAP = 3 * S5;
const ZONE_PAD = S4;
const MARGIN = (SHEET_W - 3 * ZONE_W - 2 * ZONE_GAP) / 2;
const ZONES = [0, 1, 2].map((index) => MARGIN + index * (ZONE_W + ZONE_GAP));

const NODE_W = ZONE_W - 2 * ZONE_PAD;
const COLUMNS = ZONES.map((zone) => zone + ZONE_PAD);
const COLUMN_MIDDLES = COLUMNS.map((column) => column + NODE_W / 2);
const GAP_MIDDLES = [0, 1].map((index) => ZONES[index] + ZONE_W + ZONE_GAP / 2);

const TWO_LINES = 126;
const THREE_LINES = 150;
const TOP = 120;
const BOTTOM = TOP + THREE_LINES + S5 + S4;
const ROW_MIDDLE = THREE_LINES / 2;
const DOWN_LABEL_Y = TOP + THREE_LINES + (S5 + S4) / 2 + S1 / 2;
const ZONE_H = BOTTOM + THREE_LINES + ZONE_PAD - ZONE_Y;

function across(row: number, from: number): string {
  const y = row + ROW_MIDDLE;

  return `M${COLUMNS[from] + NODE_W} ${y} L${COLUMNS[from + 1] - 2} ${y}`;
}

function down(column: number): string {
  const x = COLUMN_MIDDLES[column];

  return `M${x} ${TOP + THREE_LINES} L${x} ${BOTTOM - 2}`;
}

export default function PublishPath() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="What an editor's save does to the cache"
      viewBox={`0 0 ${SHEET_W} ${ZONE_Y + ZONE_H + ZONE_Y}`}
    >
      <Zone
        h={ZONE_H}
        label="Drupal · for editors"
        w={ZONE_W}
        x={ZONES[0]}
        y={ZONE_Y}
      />
      <Zone
        h={ZONE_H}
        label="Next.js · for travellers"
        w={ZONE_W}
        x={ZONES[1]}
        y={ZONE_Y}
      />
      <Zone h={ZONE_H} label="Outside" w={ZONE_W} x={ZONES[2]} y={ZONE_Y} />

      <Wire d={across(TOP, 0)} />
      <Wire d={across(BOTTOM, 1)} />
      <Wire d={across(BOTTOM, 0)} />
      <Wire d={down(0)} />
      <Wire d={down(1)} />

      <Node
        lines={[
          "Editors place components on",
          "a page and fill in their",
          "words. Drupal stores it.",
        ]}
        title="Canvas"
        w={NODE_W}
        x={COLUMNS[0]}
        y={TOP}
      />
      <Node
        tone="focal"
        lines={[
          "A small module waits until",
          "the page is in the database,",
          "then sends one request.",
        ]}
        title="On save"
        w={NODE_W}
        x={COLUMNS[0]}
        y={BOTTOM}
      />
      <Node
        lines={[
          "Asks Drupal for each page",
          "and draws it from the 48",
          "React components.",
        ]}
        title="Next.js"
        w={NODE_W}
        x={COLUMNS[1]}
        y={TOP}
      />
      <Node
        lines={[
          "Every published page under",
          "one tag. A good token",
          "expires it at once.",
        ]}
        title="Cache"
        w={NODE_W}
        x={COLUMNS[1]}
        y={BOTTOM}
      />
      <Node
        lines={["After a save, the next", "visitor gets the new page."]}
        title="Traveller"
        w={NODE_W}
        x={COLUMNS[2]}
        y={BOTTOM + (THREE_LINES - TWO_LINES) / 2}
      />

      <Label
        anchor="middle"
        text="Content API"
        x={GAP_MIDDLES[0]}
        y={TOP + ROW_MIDDLE - S2}
      />
      <Label
        anchor="middle"
        text="From the cache"
        x={GAP_MIDDLES[1]}
        y={BOTTOM + ROW_MIDDLE - S2}
      />
      <Label
        anchor="middle"
        text="Secret token"
        x={GAP_MIDDLES[0]}
        y={BOTTOM + ROW_MIDDLE - S2}
      />
      <Label text="Save" x={COLUMN_MIDDLES[0] + S2} y={DOWN_LABEL_Y} />
      <Label text="Keep a copy" x={COLUMN_MIDDLES[1] + S2} y={DOWN_LABEL_Y} />
    </Canvas>
  );
}
