import { define } from "@/utils/state.ts";
import { EMPTY_WORK_SELECTION } from "@/data/taxonomy.ts";
import { buildWorkListData, WorkListPage } from "./_shared.tsx";

export const handler = define.handlers({
  GET() {
    return { data: buildWorkListData(EMPTY_WORK_SELECTION) };
  },
});

export default define.page<typeof handler>(({ data }) => (
  <WorkListPage data={data} />
));
