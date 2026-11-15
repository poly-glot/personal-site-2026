import { Canvas, Node, Wire, Zone } from "./parts.tsx";

const DESCRIPTION =
  "Publishing: the owners edit pages in Builder.io, Next.js on Vercel rebuilds the page within 15 seconds, and visitors get a fast static page. Every Friday a GitHub Action exports all the content as a backup. Quotes: a visitor fills in the quote form, the server checks every field with Zod, and Resend emails the enquiry to the owners' inbox.";

const COLUMNS = [50, 430, 810, 1190];
const NODE_W = 340;
const PUBLISH = 90;
const QUOTE = 350;
const MIDDLE = 75;

function across(row: number, from: number, to: number): string {
  const y = row + MIDDLE;
  const start = from < to ? COLUMNS[from] + NODE_W : COLUMNS[from];
  const end = from < to ? COLUMNS[to] - 2 : COLUMNS[to] + NODE_W + 2;

  return `M${start} ${y} L${end} ${y}`;
}

export default function QuoteFlow() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="How BHX Travel publishes pages and receives quotes"
      viewBox="0 0 1600 550"
    >
      <Zone h={230} label="PUBLISHING" w={1560} x={20} y={30} />
      <Zone h={230} label="QUOTES" w={1560} x={20} y={290} />

      <Wire d={across(PUBLISH, 1, 0)} />
      <Wire d={across(PUBLISH, 1, 2)} />
      <Wire d={across(PUBLISH, 2, 3)} />
      <Wire d={across(QUOTE, 0, 1)} />
      <Wire d={across(QUOTE, 1, 2)} />
      <Wire d={across(QUOTE, 2, 3)} />

      <Node
        lines={[
          "Every Friday, export",
          "all the content. Kept",
          "for 90 days.",
        ]}
        title="Backup"
        w={NODE_W}
        x={COLUMNS[0]}
        y={PUBLISH}
      />
      <Node
        lines={[
          "The owners edit pages",
          "with the site's own",
          "blocks, then publish.",
        ]}
        title="Builder.io"
        w={NODE_W}
        x={COLUMNS[1]}
        y={PUBLISH}
      />
      <Node
        lines={[
          "Next.js rebuilds the",
          "page within 15 seconds.",
          "No deploy needed.",
        ]}
        title="Vercel"
        w={NODE_W}
        x={COLUMNS[2]}
        y={PUBLISH}
      />
      <Node
        lines={["A static page, quick", "to load on a phone."]}
        title="Visitor"
        w={NODE_W}
        x={COLUMNS[3]}
        y={PUBLISH}
      />

      <Node
        lines={["Journey, dates, group", "size and luggage."]}
        title="Quote form"
        w={NODE_W}
        x={COLUMNS[0]}
        y={QUOTE}
      />
      <Node
        lines={[
          "The server checks every",
          "field with Zod before",
          "anything is sent.",
        ]}
        title="Check"
        w={NODE_W}
        x={COLUMNS[1]}
        y={QUOTE}
      />
      <Node
        lines={[
          "Resend emails the",
          "enquiry, with the route",
          "in the subject line.",
        ]}
        title="Send"
        w={NODE_W}
        x={COLUMNS[2]}
        y={QUOTE}
      />
      <Node
        danger
        lines={["The owners price the", "job and reply."]}
        title="Inbox"
        w={NODE_W}
        x={COLUMNS[3]}
        y={QUOTE}
      />
    </Canvas>
  );
}
