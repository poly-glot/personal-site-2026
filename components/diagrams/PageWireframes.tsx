import { Canvas, Chip, Label, S1, S2, S3, S4, S5, Zone } from "./parts.tsx";

interface Block {
  cards?: true;
  h: number;
  name?: string;
}

interface Page {
  blocks: readonly Block[];
  count: string;
  name: string;
}

const DESCRIPTION =
  "Three pages drawn as wireframes, each a stack of named components from top to bottom. Home has seven: site-header, hero, feature-list, mission, join-band, a row of three news-card and site-footer. About has eight: site-header, hero, goals, mission, tabs, ten person-card, a row of three news-card and site-footer. News and media has four: site-header, page-title, two rows of three news-card and site-footer. The news-card rows are marked on all three pages, because they are one component used on each. The three frames are the same height, with site-footer at the foot of each, so a shorter page shows space above its footer.";

const SHEET_W = 1600;
const FRAME_W = 488;
const FRAME_PAD = 24;
const FRAME_TOP = S3;
const LEFT = (SHEET_W - 3 * FRAME_W - 2 * S4) / 2;
const INNER_W = FRAME_W - 2 * FRAME_PAD;
const FIRST_BLOCK = S5 + S2;
const CARD_GAP = S2;
const CARD_W = (INNER_W - 2 * CARD_GAP) / 3;
const CARD_SLOTS = [0, 1, 2];

const BAR = S4;
const BAND = S5;
const TALL = S5 + S4;

function bar(name: string): Block {
  return { h: BAR, name };
}

function band(name: string): Block {
  return { h: BAND, name };
}

function cards(name?: string): Block {
  return { cards: true, h: TALL, name };
}

const PAGES: readonly Page[] = [
  {
    blocks: [
      bar("site-header"),
      { h: TALL, name: "hero" },
      band("feature-list"),
      band("mission"),
      bar("join-band"),
      cards("news-card"),
      band("site-footer"),
    ],
    count: "7 components",
    name: "Home",
  },
  {
    blocks: [
      bar("site-header"),
      { h: TALL, name: "hero" },
      band("goals"),
      band("mission"),
      bar("tabs"),
      band("person-card × 10"),
      cards("news-card"),
      band("site-footer"),
    ],
    count: "8 components",
    name: "About",
  },
  {
    blocks: [
      bar("site-header"),
      band("page-title"),
      cards("news-card"),
      cards(),
      band("site-footer"),
    ],
    count: "4 components",
    name: "News & media",
  },
];

function stackHeight(blocks: readonly Block[]): number {
  const boxes = blocks.reduce((sum, block) => sum + block.h, 0);

  return boxes + (blocks.length - 1) * S1;
}

function frameHeight(page: Page): number {
  return FIRST_BLOCK + stackHeight(page.blocks) + FRAME_PAD;
}

function blockTop(blocks: readonly Block[], index: number): number {
  const above = blocks
    .slice(0, index)
    .reduce((sum, block) => sum + block.h + S1, 0);

  return FRAME_TOP + FIRST_BLOCK + above;
}

const FRAME_H = Math.max(...PAGES.map(frameHeight));
const HEIGHT = FRAME_TOP + FRAME_H + S3;

function isFooter(blocks: readonly Block[], index: number): boolean {
  return index === blocks.length - 1;
}

function blockY(blocks: readonly Block[], index: number): number {
  if (!isFooter(blocks, index)) return blockTop(blocks, index);

  return FRAME_TOP + FRAME_H - FRAME_PAD - blocks[index].h;
}

function CardRow(
  { name, x, y }: { name?: string; x: number; y: number },
) {
  return (
    <g>
      {CARD_SLOTS.map((slot) => (
        <Chip
          h={TALL}
          key={slot}
          text={slot === 0 ? name : undefined}
          tone="focal"
          w={CARD_W}
          x={x + slot * (CARD_W + CARD_GAP)}
          y={y}
        />
      ))}
    </g>
  );
}

function Wireframe({ page, x }: { page: Page; x: number }) {
  const inner = x + FRAME_PAD;

  return (
    <g>
      <Zone
        h={FRAME_H}
        label={page.name}
        w={FRAME_W}
        x={x}
        y={FRAME_TOP}
      />
      <Label
        anchor="end"
        kind="caption"
        text={page.count}
        x={x + FRAME_W - FRAME_PAD}
        y={FRAME_TOP + S4}
      />
      {page.blocks.map((block, index) => {
        const y = blockY(page.blocks, index);

        return block.cards
          ? <CardRow key={index} name={block.name} x={inner} y={y} />
          : (
            <Chip
              h={block.h}
              key={index}
              text={block.name}
              w={INNER_W}
              x={inner}
              y={y}
            />
          );
      })}
    </g>
  );
}

export default function PageWireframes() {
  return (
    <Canvas
      description={DESCRIPTION}
      title="Three Academy pages as stacks of components"
      viewBox={`0 0 ${SHEET_W} ${HEIGHT}`}
    >
      {PAGES.map((page, index) => (
        <Wireframe
          key={page.name}
          page={page}
          x={LEFT + index * (FRAME_W + S4)}
        />
      ))}
    </Canvas>
  );
}
