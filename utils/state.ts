import { createDefine } from "fresh";
import type { PageMeta } from "@/src/types.ts";

export interface State {
  meta?: Partial<PageMeta>;
}

export const define = createDefine<State>();
