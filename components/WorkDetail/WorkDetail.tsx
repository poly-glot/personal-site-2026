import type { WorkProject } from "@/src/types.ts";
import { workContextLabel } from "@/data/content.ts";
import { domainHref, stackHref } from "@/data/taxonomy.ts";
import { proseComponents } from "@/components/Prose/proseComponents.tsx";
import { studyComponents } from "@/components/study/kit.tsx";
import TagLinks from "@/components/TagLinks/TagLinks.tsx";
import BrowserThumb from "@/components/hero/BrowserThumb/BrowserThumb.tsx";
import Lightbox from "@/islands/Lightbox.tsx";
import { Github } from "@/components/Icons/Icons.tsx";
import type { ComponentType } from "preact";
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

interface HeroFact {
  label: string;
  values: string[];
  hrefFor?: (value: string) => string;
}

function isLive(project: WorkProject): boolean {
  return project.href !== "#";
}

function present(value: string | undefined): string[] {
  return value ? [value] : [];
}

function heroFacts(project: WorkProject): HeroFact[] {
  const facts: HeroFact[] = [
    { label: "Client", values: present(project.client) },
    { label: "Year", values: [String(project.period ?? project.year)] },
    { label: "Role", values: present(project.role) },
    { label: "Domain", values: project.domains, hrefFor: domainHref },
    { label: "Stack", values: project.stack, hrefFor: stackHref },
    { label: "Delivered", values: present(project.delivered) },
  ];

  return facts.filter((fact) => fact.values.length > 0);
}

function FactValues({ label, values, hrefFor }: HeroFact) {
  if (!hrefFor) return <>{values.join(" · ")}</>;

  return <TagLinks label={label} tags={values} hrefFor={hrefFor} />;
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
  return (
    <header class={styles.hero}>
      <div class={styles.heroIntro}>
        <h1 class={`${styles.heroTitle} display`}>{project.name}</h1>
        <p class={styles.tagline}>{project.tagline}</p>
        <p class={styles.heroLede}>{project.summary}</p>
        <div class={styles.heroActions}>
          <VisitLink project={project} />
          <SourceLink project={project} />
        </div>
      </div>
      <div class={styles.heroFilm}>
        <Film project={project} />
      </div>
      <dl class={`${styles.heroFacts} bleed-divider-top`}>
        {heroFacts(project).map((fact) => (
          <div class={`${styles.heroFact} bleed-divider`} key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>
              <FactValues {...fact} />
            </dd>
          </div>
        ))}
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
