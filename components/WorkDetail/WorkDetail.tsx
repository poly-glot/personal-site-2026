import type { WorkProject } from "@/src/types.ts";
import { workContextLabel } from "@/data/content.ts";
import { domainHref, stackHref } from "@/data/taxonomy.ts";
import { proseComponents } from "@/components/Prose/proseComponents.tsx";
import { studyComponents } from "@/components/study/kit.tsx";
import TagLinks from "@/components/TagLinks/TagLinks.tsx";
import BrowserThumb from "@/components/hero/BrowserThumb/BrowserThumb.tsx";
import Lightbox from "@/islands/Lightbox.tsx";
import { Github } from "@/components/Icons/Icons.tsx";
import type { ComponentChildren, ComponentType } from "preact";
import styles from "./WorkDetail.module.css";

const bodyModules = import.meta.glob("../../content/work/*.mdx", {
  eager: true,
}) as Record<
  string,
  { default: ComponentType<{ components?: Record<string, unknown> }> }
>;

const bodies: Record<
  string,
  ComponentType<{ components?: Record<string, unknown> }>
> = {};

for (const [path, mod] of Object.entries(bodyModules)) {
  bodies[path.split("/").pop()!.replace(/\.mdx$/, "")] = mod.default;
}

const bodyComponents = { ...proseComponents, ...studyComponents };

interface WorkDetailProps {
  project: WorkProject;
  prev: WorkProject | null;
  next: WorkProject | null;
}

interface ProjectSlot {
  project: WorkProject;
}

function isLive(project: WorkProject): boolean {
  return project.href !== "#";
}

function clientLine(project: WorkProject): string {
  return [project.client, project.period ?? project.year]
    .filter(Boolean)
    .join(" · ");
}

function HeroFact(
  { children, label }: { children: ComponentChildren; label: string },
) {
  return (
    <div class={`${styles.heroFact} bleed-divider`}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function VisitLink({ project }: ProjectSlot) {
  if (!isLive(project)) return null;

  return (
    <a class={styles.cta} href={project.href} target="_blank" rel="noopener">
      <span>Visit Live Site</span>
      <span class={styles.ctaArrow} aria-hidden="true">→</span>
    </a>
  );
}

function SourceLink({ project }: ProjectSlot) {
  if (!project.source) return null;

  return (
    <a
      aria-label="Source code on GitHub"
      class={styles.source}
      href={project.source}
      rel="noopener"
      target="_blank"
    >
      <Github />
    </a>
  );
}

function SiteLink({ project }: ProjectSlot) {
  if (!isLive(project)) return <>{project.url}</>;

  return (
    <a class={styles.link} href={project.href} target="_blank" rel="noopener">
      {project.url}
    </a>
  );
}

function Film({ project }: ProjectSlot) {
  return (
    <div class={styles.thumb} id={project.video ? "film" : undefined}>
      <BrowserThumb project={project} />
    </div>
  );
}

function StudyHero({ project }: ProjectSlot) {
  const story = Object.entries(project.story ?? {});

  return (
    <header class={styles.hero}>
      <div class={styles.heroIntro}>
        <h1 class={`${styles.heroTitle} display`}>{project.name}</h1>
        <p class={styles.tagline}>{project.tagline}</p>
        {story.length === 0 && <p class={styles.heroLede}>{project.summary}</p>}
        <div class={styles.heroActions}>
          <VisitLink project={project} />
          <SourceLink project={project} />
        </div>
      </div>
      <div class={styles.heroFilm}>
        <Film project={project} />
      </div>
      <dl class={`${styles.heroFacts} bleed-divider-top`}>
        <HeroFact label="Client">
          <div class={styles.heroClient}>
            <span>{clientLine(project)}</span>
            <TagLinks
              label="Domain"
              tags={project.domains}
              hrefFor={domainHref}
            />
          </div>
        </HeroFact>
        {story.map(([label, line]) => (
          <HeroFact label={label} key={label}>{line}</HeroFact>
        ))}
        <HeroFact label="Stack">
          <TagLinks label="Stack" tags={project.stack} hrefFor={stackHref} />
        </HeroFact>
      </dl>
    </header>
  );
}

function ProjectHeader({ project }: ProjectSlot) {
  return (
    <>
      <header class={styles.head}>
        <div class={styles.eyebrow}>
          <span class={styles.year}>{project.period ?? project.year}</span>
          <span class={styles.dotSep}>·</span>
          <span>{workContextLabel(project)}</span>
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
            <span class={styles.v}>
              <SiteLink project={project} />
            </span>
          </div>
        </div>
        <VisitLink project={project} />
      </header>
      <Film project={project} />
    </>
  );
}

export default function WorkDetail(
  { project, prev, next }: WorkDetailProps,
) {
  const chaptered = project.layout === "chapters";
  const Body = bodies[project.id];

  return (
    <>
      <article
        class={chaptered ? `${styles.study} ${styles.chaptered}` : styles.study}
      >
        {chaptered
          ? <StudyHero project={project} />
          : <ProjectHeader project={project} />}
        <div class={chaptered ? styles.chapters : styles.prose}>
          {Body && <Body components={bodyComponents} />}
        </div>
        {chaptered && <Lightbox />}
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
