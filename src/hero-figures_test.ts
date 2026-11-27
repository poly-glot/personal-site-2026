import { assertEquals } from "@std/assert";
import { byColumn, figurePoints, FIGURES } from "./hero-figures.ts";

const COUNT = 900;
const SIZE = 104;
const CELL = 2.6;

Deno.test("every figure gives one point per dot, inside its square, ordered by column", () => {
  for (const shade of FIGURES) {
    const points = figurePoints(shade, COUNT, SIZE, CELL, Math.random);
    const inside = points.every((p) =>
      p.x >= 0 && p.x <= SIZE && p.y >= 0 && p.y <= SIZE
    );

    assertEquals(points.length, COUNT);
    assertEquals(inside, true);
    assertEquals(points, [...points].sort(byColumn));
  }
});

Deno.test("a shade that covers nothing gives no points", () => {
  assertEquals(figurePoints(() => 0, COUNT, SIZE, CELL, Math.random), []);
});
