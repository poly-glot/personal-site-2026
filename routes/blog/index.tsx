import { define } from "@/utils/state.ts";
import { EMPTY_BLOG_FILTER } from "@/data/taxonomy.ts";
import { BlogPage } from "./_shared.tsx";
import { buildBlogListData } from "./_resolve.ts";

export const handler = define.handlers({
  GET() {
    return {
      data: buildBlogListData(EMPTY_BLOG_FILTER),
    };
  },
});

export default define.page<typeof handler>(({ data }) => (
  <BlogPage data={data} />
));
