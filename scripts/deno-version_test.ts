import { assertEquals, assertNotEquals } from "@std/assert";

const WORKFLOWS = [".github/workflows/ci.yml", ".github/workflows/cd.yml"];

async function dockerfileDenoVersion(): Promise<string> {
  const dockerfile = await Deno.readTextFile("Dockerfile");
  const pinned = dockerfile.match(/^FROM denoland\/deno:(\S+)/m);
  if (!pinned) throw new Error("Dockerfile does not build from denoland/deno");

  return pinned[1];
}

async function workflowDenoVersions(path: string): Promise<string[]> {
  const workflow = await Deno.readTextFile(path);

  return [...workflow.matchAll(/deno-version:\s*(\S+)/g)].map((pin) => pin[1]);
}

Deno.test("CI and CD install the Deno version the Dockerfile builds with", async () => {
  const expected = `v${await dockerfileDenoVersion()}`;

  for (const path of WORKFLOWS) {
    const versions = await workflowDenoVersions(path);

    assertNotEquals(versions.length, 0, `${path} never sets up Deno`);
    for (const version of versions) assertEquals(version, expected, path);
  }
});
