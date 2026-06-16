const DISPLAY_FONT_PATTERN = /rozha-one-latin-400-normal-[^/]*\.woff2$/;
const MANIFEST_PATH = "_fresh/client/.vite/manifest.json";

export function findFontPath(
  manifest: Record<string, unknown>,
  pattern: RegExp,
): string | null {
  for (const entry of Object.values(manifest)) {
    const file = (entry as { file?: string }).file;
    if (file && pattern.test(file)) return "/" + file;
  }
  return null;
}

function readDisplayFont(): string | null {
  try {
    const manifest = JSON.parse(Deno.readTextFileSync(MANIFEST_PATH));
    return findFontPath(manifest, DISPLAY_FONT_PATTERN);
  } catch {
    return null;
  }
}

export const DISPLAY_FONT_WOFF2 = readDisplayFont();
