import type { ComponentChildren } from "preact";
import type { WorkProject } from "@/src/types.ts";
import BrowserThumb from "@/components/hero/BrowserThumb/BrowserThumb.tsx";
import { Arrow, Play } from "@/components/Icons/Icons.tsx";
import styles from "./CaseStudies.module.css";

interface CaseBandProps {
  children: ComponentChildren;
  columns?: 2 | 3;
  fill?: boolean;
}

interface CaseCardProps {
  index: number;
  project: WorkProject;
}

export function CaseBand(
  { children, columns = 2, fill = false }: CaseBandProps,
) {
  return (
    <div
      class={styles.inner}
      data-columns={columns}
      data-fill={fill ? "" : undefined}
    >
      <div class={styles.band}>
        <span class={`${styles.mark} ${styles.markTl}`} aria-hidden="true" />
        <span class={`${styles.mark} ${styles.markTr}`} aria-hidden="true" />
        <span class={`${styles.mark} ${styles.markBl}`} aria-hidden="true" />
        <span class={`${styles.mark} ${styles.markBr}`} aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}

export function CaseCard({ index, project }: CaseCardProps) {
  const hasLiveSite = project.href !== "#";

  return (
    <article class={styles.card} id={project.id}>
      <div class={styles.thumb} data-tone={project.id}>
        <div class={styles.frame}>
          <BrowserThumb poster project={project} />
        </div>
        {project.video && (
          <div class={styles.actions}>
            <a
              class={styles.action}
              data-captions={project.video.captions}
              data-label={`${project.name}: ${project.tagline}`}
              data-poster={project.video.poster}
              data-video
              href={project.video.src}
            >
              <Play />
              <span>
                Watch video<span class="sr-only">: {project.name}</span>
              </span>
            </a>
            <a class={styles.action} href={`/work/${project.id}/`}>
              <span>
                Read case study<span class="sr-only">: {project.name}</span>
              </span>
              <Arrow />
            </a>
          </div>
        )}
      </div>
      <div class={styles.titleRow}>
        <span class={styles.titleLeft}>
          <span class={styles.num}>{String(index + 1).padStart(2, "0")}</span>
          <a
            class={`${styles.name} ${styles.caseLink}`}
            href={`/work/${project.id}/`}
          >
            {project.name}
          </a>
        </span>
        <span class={styles.titleRight}>
          {hasLiveSite && (
            <a
              class={styles.liveLink}
              href={project.href}
              target="_blank"
              rel="noopener"
              aria-label={`Live site: ${project.url} (opens in a new tab)`}
            >
              Live site
              <svg
                viewBox="0 0 16 16"
                width="12"
                height="12"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                aria-hidden="true"
              >
                <path d="M5 11l6-6M6 5h5v5" />
              </svg>
            </a>
          )}
          <span class={styles.caseCue} aria-hidden="true">
            Case study
            <svg
              viewBox="0 0 16 16"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </span>
      </div>
    </article>
  );
}
