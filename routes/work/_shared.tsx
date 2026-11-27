import Header from "@/components/Header/Header.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import { CaseBand, CaseCard } from "@/components/CaseStudies/CaseStudies.tsx";
import Pager from "@/components/Pager/Pager.tsx";
import Lightbox from "@/islands/Lightbox.tsx";
import CardParallax from "@/islands/CardParallax.tsx";
import { canonicalWorkPath, WORK_PAGE_SIZE } from "@/data/taxonomy.ts";
import WorkFilter from "@/islands/WorkFilter.tsx";
import WorkOutro from "@/components/WorkOutro/WorkOutro.tsx";
import type { WorkListData } from "./_resolve.ts";
import styles from "./work_index.module.css";

export * from "./_resolve.ts";

export function WorkListPage({ data }: { data: WorkListData }) {
  const {
    selection,
    page,
    pageCount,
    projects,
    shown,
    total,
    domains,
    stack,
    years,
  } = data;
  const pageHref = (n: number) => canonicalWorkPath({ ...selection, page: n });
  const firstIndex = (page - 1) * WORK_PAGE_SIZE;

  return (
    <div>
      <Header active="work" />
      <main id="main">
        <div class="container">
          <WorkFilter
            domains={domains}
            stack={stack}
            years={years}
            selection={selection}
            shown={shown}
            total={total}
          />
        </div>
        {projects.length === 0
          ? (
            <div class={`container ${styles.empty}`}>
              <p class={styles.emptyTitle}>
                No projects match those filters.
              </p>
              <a class={styles.reset} href="/work/">
                <span>Reset filters</span>
                <span class={styles.resetArrow} aria-hidden="true">→</span>
              </a>
            </div>
          )
          : (
            <section aria-label="Projects">
              <CaseBand columns={3}>
                {projects.map((project, i) => (
                  <CaseCard
                    index={firstIndex + i}
                    project={project}
                    key={project.id}
                  />
                ))}
              </CaseBand>
              <div class="container">
                <Pager page={page} pageCount={pageCount} hrefFor={pageHref} />
              </div>
            </section>
          )}
        <Lightbox />
        <CardParallax />
        <div class="container">
          <WorkOutro />
        </div>
      </main>
      <Footer />
    </div>
  );
}
