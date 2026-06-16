import type { WorkProject } from "@/src/types.ts";
import BrowserThumb from "@/components/hero/BrowserThumb/BrowserThumb.tsx";
import styles from "./ProjectRow.module.css";

interface ProjectRowProps {
  project: WorkProject;
  displayIndex: number;
  isFirst: boolean;
  isLast: boolean;
}

export default function ProjectRow(
  { project, displayIndex, isFirst, isLast }: ProjectRowProps,
) {
  const reverse = displayIndex % 2 === 1;
  const num = String(displayIndex + 1).padStart(2, "0");
  const projClass = [
    styles.proj,
    reverse ? styles.rev : "",
    reverse ? styles.even : "",
    isFirst ? styles.first : "",
    isLast ? styles.last : "",
  ].filter(Boolean).join(" ");

  return (
    <article class={projClass} id={project.id}>
      <div class={styles.meta}>
        <div class={styles.num}>
          {num}
          <span class={styles.numSep}>/</span>
          <span class={styles.numYear}>{project.year}</span>
        </div>
        <h2 class={styles.name}>{project.name}</h2>
        <p class={styles.tag}>{project.tagline}</p>
        <div class={styles.detail}>
          <div class={styles.kv}>
            <span class={styles.k}>ROLE</span>
            <span class={styles.v}>{project.role}</span>
          </div>
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
            <a
              class={`${styles.v} ${styles.vLink}`}
              href={project.href}
              target="_blank"
              rel="noopener"
            >
              {project.url}
            </a>
          </div>
        </div>
        <p class={styles.body}>{project.summary}</p>
        <a class={styles.cta} href={`/work/${project.id}/`}>
          <span>Read Case Study</span>
          <span class={styles.ctaArrow} aria-hidden="true">→</span>
        </a>
      </div>
      <a
        class={styles.thumb}
        href={`/work/${project.id}/`}
        aria-label={`Open ${project.name}`}
      >
        <BrowserThumb project={project} />
      </a>
    </article>
  );
}
