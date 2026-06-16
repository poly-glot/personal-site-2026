import Header from "@/components/Header/Header.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import ProjectRow from "@/components/ProjectRow/ProjectRow.tsx";
import WorkFilter from "@/islands/WorkFilter.tsx";
import WorkOutro from "@/components/WorkOutro/WorkOutro.tsx";
import type { WorkListData } from "./_resolve.ts";
import styles from "./work_index.module.css";

export * from "./_resolve.ts";

export function WorkListPage({ data }: { data: WorkListData }) {
  const { selection, projects, shown, total, domains, stack, years } = data;

  return (
    <div>
      <Header active="work" />
      <main id="main" class="container">
        <WorkFilter
          domains={domains}
          stack={stack}
          years={years}
          selection={selection}
          shown={shown}
          total={total}
        />
        <div class={styles.list}>
          {projects.length === 0
            ? (
              <div class={styles.empty}>
                <p class={styles.emptyTitle}>
                  No projects match those filters.
                </p>
                <a class={styles.reset} href="/work/">
                  <span>Reset filters</span>
                  <span class={styles.resetArrow} aria-hidden="true">→</span>
                </a>
              </div>
            )
            : projects.map((project, i) => (
              <ProjectRow
                project={project}
                displayIndex={i}
                isFirst={i === 0}
                isLast={i === projects.length - 1}
              />
            ))}
        </div>
        <WorkOutro />
      </main>
      <Footer />
    </div>
  );
}
