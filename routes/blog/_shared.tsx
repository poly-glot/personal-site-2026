import { canonicalBlogPath } from "@/data/taxonomy.ts";
import Header from "@/components/Header/Header.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import PostCard from "@/components/PostCard/PostCard.tsx";
import Pager from "@/components/Pager/Pager.tsx";
import BlogDetail from "@/components/BlogDetail/BlogDetail.tsx";
import BlogFilter from "@/islands/BlogFilter.tsx";
import TocScrollSpy from "@/islands/TocScrollSpy.tsx";
import type { PageData } from "./_resolve.ts";
import styles from "./blog-index.module.css";

export * from "./_resolve.ts";

export function BlogPage({ data }: { data: PageData }) {
  const { view } = data;

  if (view.kind === "detail") {
    return (
      <div class="page-enter">
        <Header active="blog" />
        <BlogDetail
          post={view.detail}
          toc={view.toc}
          neighbors={view.neighbors}
        />
        <Footer />
        <TocScrollSpy ids={view.toc.map((t) => t.id)} />
      </div>
    );
  }

  const {
    filter,
    posts,
    page,
    pageCount,
    total,
    grandTotal,
    topics,
    years,
    reads,
  } = view;

  const pageHref = (n: number): string =>
    canonicalBlogPath({ ...filter, page: n });

  return (
    <div class="page-enter">
      <Header active="blog" />
      <main id="main" class="container">
        <BlogFilter
          topics={topics}
          years={years}
          reads={reads}
          filter={filter}
          shown={total}
          total={grandTotal}
          page={page}
          pageCount={pageCount}
        />

        <div class={styles.list}>
          {posts.length === 0
            ? (
              <div class={styles.empty}>
                <p class={styles.emptyTitle}>
                  No essays match those filters.
                </p>
                <a class={styles.reset} href="/blog/">
                  Reset filters <span aria-hidden="true">→</span>
                </a>
              </div>
            )
            : posts.map((p, i) => <PostCard key={p.id} post={p} index={i} />)}
        </div>

        <Pager page={page} pageCount={pageCount} hrefFor={pageHref} />
      </main>
      <Footer />
    </div>
  );
}
