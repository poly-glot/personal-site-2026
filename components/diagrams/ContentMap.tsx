import { Canvas, Node, Zone } from "./parts.tsx";

const DESCRIPTION =
  "The site's pages by job. Sell: the home page, tiered packages for five services, and the quote form. Show: six portfolio galleries with logos in over 30 industries, 23 case studies and the testimonials. Explain: a page per service, the eight steps of how it works, and ten reasons to choose the studio. Be found: an HTML sitemap linking to every page, and a resources page.";

const COLUMNS = [20, 415, 810, 1205];
const ROWS = [100, 250, 400];
const ZONE_W = 375;
const NODE_W = 325;

export default function ContentMap() {
  const x = (column: number) => COLUMNS[column] + 25;

  return (
    <Canvas
      description={DESCRIPTION}
      title="Crea8ive Design's pages by job"
      viewBox="0 0 1600 580"
    >
      <Zone h={520} label="Sell" w={ZONE_W} x={COLUMNS[0]} y={30} />
      <Zone h={520} label="Show" w={ZONE_W} x={COLUMNS[1]} y={30} />
      <Zone h={520} label="Explain" w={ZONE_W} x={COLUMNS[2]} y={30} />
      <Zone h={520} label="Be found" w={ZONE_W} x={COLUMNS[3]} y={30} />

      <Node
        lines={["The best-selling packages", "up front, from $99."]}
        title="Home"
        w={NODE_W}
        x={x(0)}
        y={ROWS[0]}
      />
      <Node
        lines={["Tiered packages for five", "services, side by side."]}
        title="Packages"
        w={NODE_W}
        x={x(0)}
        y={ROWS[1]}
      />
      <Node
        lines={["A brief form for anything", "the packages don't cover."]}
        title="Request a quote"
        w={NODE_W}
        x={x(0)}
        y={ROWS[2]}
      />

      <Node
        lines={["Six galleries, with logos", "in over 30 industries."]}
        title="Portfolio"
        w={NODE_W}
        x={x(1)}
        y={ROWS[0]}
      />
      <Node
        lines={["23 pages, most about one", "style of logo."]}
        title="Case studies"
        w={NODE_W}
        x={x(1)}
        y={ROWS[1]}
      />
      <Node
        lines={["Customer quotes, in a", "carousel."]}
        title="Testimonials"
        w={NODE_W}
        x={x(1)}
        y={ROWS[2]}
      />

      <Node
        lines={["Logo, web, stationery,", "brochure and illustration."]}
        title="Services"
        w={NODE_W}
        x={x(2)}
        y={ROWS[0]}
      />
      <Node
        lines={["Eight steps from signing", "up to the final files."]}
        title="How it works"
        w={NODE_W}
        x={x(2)}
        y={ROWS[1]}
      />
      <Node
        lines={["Ten reasons to choose", "the studio."]}
        title="Top ten reasons"
        w={NODE_W}
        x={x(2)}
        y={ROWS[2]}
      />

      <Node
        lines={["One page linking to", "every page, for crawlers."]}
        title="Sitemap"
        w={NODE_W}
        x={x(3)}
        y={ROWS[0]}
      />
      <Node
        lines={["Partners and tools for", "customers."]}
        title="Resources"
        w={NODE_W}
        x={x(3)}
        y={ROWS[1]}
      />
    </Canvas>
  );
}
