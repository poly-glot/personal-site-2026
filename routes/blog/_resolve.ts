import {
  BLOG_PAGE_SIZE,
  BLOG_READS,
  BLOG_TOPICS,
  parseBlogSegments,
  type Term,
} from "@/data/taxonomy.ts";
import {
  blogVocab,
  filterPosts,
  getAllPosts,
  getPost,
  getPostNeighbors,
  paginate,
  tocFor,
} from "@/data/content.ts";
import type {
  BlogFilter,
  BlogPost,
  PostWithBody,
  TocEntry,
} from "@/src/types.ts";

export type View =
  | {
    kind: "detail";
    detail: PostWithBody;
    num: string;
    toc: TocEntry[];
    neighbors: { prev: BlogPost | null; next: BlogPost | null };
  }
  | {
    kind: "list";
    filter: BlogFilter;
    posts: BlogPost[];
    page: number;
    pageCount: number;
    total: number;
    grandTotal: number;
    topics: Term[];
    years: number[];
    reads: Term[];
  };

export type PageData = { view: View };

const VOCAB = blogVocab();

export function buildBlogListData(
  filter: BlogFilter,
): PageData {
  const all = getAllPosts();
  const posts = filterPosts(all, filter);
  const paged = paginate(posts, filter.page, BLOG_PAGE_SIZE);

  return {
    view: {
      kind: "list",
      filter,
      posts: paged.items,
      page: paged.page,
      pageCount: paged.pageCount,
      total: posts.length,
      grandTotal: all.length,
      topics: [...BLOG_TOPICS],
      years: VOCAB.years,
      reads: [...BLOG_READS],
    },
  };
}

export function resolveBlog(
  segments: string[],
): PageData | { redirect: string } | "notfound" {
  if (segments.length === 1) {
    const detail = getPost(segments[0]);
    if (detail) {
      const num = String(
        getAllPosts().findIndex((p) => p.id === detail.post.id) + 1,
      ).padStart(2, "0");

      return {
        view: {
          kind: "detail",
          detail,
          num,
          toc: tocFor(detail.body),
          neighbors: getPostNeighbors(detail.post.id),
        },
      };
    }
  }

  const parsed = parseBlogSegments(segments, VOCAB);
  if (parsed === "notfound") return "notfound";

  const requested = "/blog/" +
    (segments.length ? segments.join("/") + "/" : "");
  if (requested !== parsed.canonical) return { redirect: parsed.canonical };

  const paged = paginate(
    filterPosts(getAllPosts(), parsed.filter),
    parsed.filter.page,
    BLOG_PAGE_SIZE,
  );
  if (parsed.filter.page < 1 || parsed.filter.page > paged.pageCount) {
    return "notfound";
  }

  return buildBlogListData(parsed.filter);
}
