import type {
  WireframeBlock,
  WireframePage,
  WireframeSize,
} from "@/src/types.ts";
import { Canvas, Chip, Label, S1, S2, S3, S4, S5, Zone } from "./parts.tsx";

const SHEET_W = 1600;
const FRAME_W = 488;
const FRAME_PAD = 24;
const FRAME_TOP = S3;
const LEFT = (SHEET_W - 3 * FRAME_W - 2 * S4) / 2;
const INNER_W = FRAME_W - 2 * FRAME_PAD;
const FIRST_BLOCK = S5 + S2;
const CELL_GAP = S2;

const HEIGHTS: Record<WireframeSize, number> = {
  band: S5,
  bar: S4,
  tall: S5 + S4,
};

function blockHeight(block: WireframeBlock): number {
  return HEIGHTS[block.size];
}

function cellCount(block: WireframeBlock): number {
  return block.cells ?? block.names.length;
}

function componentCount(page: WireframePage): number {
  const names = page.blocks.flatMap((block) => block.names);

  return new Set(names).size;
}

function stackHeight(blocks: readonly WireframeBlock[]): number {
  const boxes = blocks.reduce((sum, block) => sum + blockHeight(block), 0);

  return boxes + (blocks.length - 1) * S1;
}

function frameHeight(page: WireframePage): number {
  return FIRST_BLOCK + stackHeight(page.blocks) + FRAME_PAD;
}

function blockTop(blocks: readonly WireframeBlock[], index: number): number {
  const above = blocks
    .slice(0, index)
    .reduce((sum, block) => sum + blockHeight(block) + S1, 0);

  return FRAME_TOP + FIRST_BLOCK + above;
}

function isFooter(blocks: readonly WireframeBlock[], index: number): boolean {
  return index === blocks.length - 1;
}

function Row(
  { block, x, y }: { block: WireframeBlock; x: number; y: number },
) {
  const cells = cellCount(block);
  const width = (INNER_W - (cells - 1) * CELL_GAP) / cells;

  return (
    <>
      {Array.from({ length: cells }, (_, slot) => (
        <Chip
          h={blockHeight(block)}
          key={slot}
          text={block.names[slot]}
          tone={block.focal ? "focal" : undefined}
          w={width}
          x={x + slot * (width + CELL_GAP)}
          y={y}
        />
      ))}
    </>
  );
}

function Wireframe(
  { frameH, page, x }: { frameH: number; page: WireframePage; x: number },
) {
  const inner = x + FRAME_PAD;
  const { blocks } = page;

  function blockY(index: number): number {
    if (!isFooter(blocks, index)) return blockTop(blocks, index);

    return FRAME_TOP + frameH - FRAME_PAD - blockHeight(blocks[index]);
  }

  return (
    <g>
      <Zone h={frameH} label={page.name} w={FRAME_W} x={x} y={FRAME_TOP} />
      <Label
        anchor="end"
        kind="caption"
        text={`${componentCount(page)} components`}
        x={x + FRAME_W - FRAME_PAD}
        y={FRAME_TOP + S4}
      />
      {blocks.map((block, index) => (
        <Row block={block} key={index} x={inner} y={blockY(index)} />
      ))}
    </g>
  );
}

export default function WireframeSheet(
  { description, pages, title }: {
    description: string;
    pages: readonly WireframePage[];
    title: string;
  },
) {
  const frameH = Math.max(...pages.map(frameHeight));
  const height = FRAME_TOP + frameH + S3;

  return (
    <Canvas
      description={description}
      title={title}
      viewBox={`0 0 ${SHEET_W} ${height}`}
    >
      {pages.map((page, index) => (
        <Wireframe
          frameH={frameH}
          key={page.name}
          page={page}
          x={LEFT + index * (FRAME_W + S4)}
        />
      ))}
    </Canvas>
  );
}
