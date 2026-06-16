import type { BlockNode, WorkProject } from "@/src/types.ts";
import BlockRenderer from "@/components/BlockRenderer/BlockRenderer.tsx";
import BrowserThumb from "@/components/hero/BrowserThumb/BrowserThumb.tsx";
import styles from "./WorkDetail.module.css";

interface WorkDetailProps {
  project: WorkProject;
  body: BlockNode[];
  prev: WorkProject | null;
  next: WorkProject | null;
}

export default function WorkDetail(
  { project, body, prev, next }: WorkDetailProps,
) {
  const live = project.href !== "#";

  return (
    <>
      <article class={styles.study}>
        <header class={styles.head}>
          <div class={styles.eyebrow}>
            <span class={styles.year}>{project.year}</span>
            <span class={styles.dotSep}>·</span>
            <span>{project.role}</span>
          </div>
          <h1 class={styles.title}>{project.name}</h1>
          <p class={styles.tagline}>{project.tagline}</p>
          <div class={styles.facets}>
            <div class={styles.kv}>
              <span class={styles.k}>DOMAIN</span>
              <span class={styles.v}>{project.domains.join(" · ")}</span>
            </div>
            <div class={styles.kv}>
              <span class={styles.k}>STACK</span>
              <span class={styles.v}>{project.stack.join(" · ")}</span>
            </div>
            <div class={styles.kv}>
              <span class={styles.k}>URL</span>
              {live
                ? (
                  <a
                    class={`${styles.v} ${styles.link}`}
                    href={project.href}
                    target="_blank"
                    rel="noopener"
                  >
                    {project.url}
                  </a>
                )
                : <span class={styles.v}>{project.url}</span>}
            </div>
          </div>
          {live && (
            <a
              class={styles.cta}
              href={project.href}
              target="_blank"
              rel="noopener"
            >
              <span>Visit Live Site</span>
              <span class={styles.ctaArrow} aria-hidden="true">→</span>
            </a>
          )}
        </header>
        <div class={styles.thumb}>
          <BrowserThumb project={project} />
        </div>
        <div class={styles.prose}>
          <BlockRenderer body={body} />
        </div>
      </article>
      <nav class={styles.neighbors} aria-label="More projects">
        {prev
          ? (
            <a class={styles.prev} href={`/work/${prev.id}/`}>
              <span class={styles.navLabel}>← Previous</span>
              <span class={styles.navName}>{prev.name}</span>
            </a>
          )
          : <span class={styles.navSpacer} />}
        {next
          ? (
            <a class={styles.next} href={`/work/${next.id}/`}>
              <span class={styles.navLabel}>Next →</span>
              <span class={styles.navName}>{next.name}</span>
            </a>
          )
          : <span class={styles.navSpacer} />}
      </nav>
    </>
  );
}
