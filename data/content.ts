import type {
  BlockNode,
  BlogFilter,
  BlogPost,
  BlogVocab,
  PostWithBody,
  ProjectWithBody,
  TocEntry,
  WorkProject,
  WorkSelection,
} from "@/src/types.ts";
import { POSTS, PROJECTS } from "@/data/content.gen.ts";
import {
  readBucketSlug,
  slugify,
  WORK_DOMAINS,
  type WorkVocab,
} from "@/data/taxonomy.ts";

function byDateDesc(a: PostWithBody, b: PostWithBody): number {
  return b.post.date.localeCompare(a.post.date);
}

const postsByDate = [...POSTS].sort(byDateDesc);

export function getAllPosts(): BlogPost[] {
  return postsByDate.map((p) => p.post);
}

export function getPost(id: string): PostWithBody | null {
  return POSTS.find((p) => p.post.id === id) ?? null;
}

export function getPostNeighbors(
  id: string,
): { prev: BlogPost | null; next: BlogPost | null } {
  const index = postsByDate.findIndex((p) => p.post.id === id);
  if (index < 0) return { prev: null, next: null };

  return {
    prev: index > 0 ? postsByDate[index - 1].post : null,
    next: index < postsByDate.length - 1 ? postsByDate[index + 1].post : null,
  };
}

export function tocFor(body: BlockNode[]): TocEntry[] {
  return body
    .filter((b): b is Extract<BlockNode, { kind: "h2" }> => b.kind === "h2")
    .map((b) => ({ id: b.id, text: b.text }));
}

export function filterPosts(
  posts: BlogPost[],
  filter: BlogFilter,
): BlogPost[] {
  const topicSet = new Set(filter.topics);
  const yearSet = new Set(filter.years);
  const readSet = new Set(filter.reads);

  const hasTopic = topicSet.size > 0;
  const hasYear = yearSet.size > 0;
  const hasRead = readSet.size > 0;

  if (!hasTopic && !hasYear && !hasRead) return posts;

  return posts.filter((post) => {
    const topicOk = !hasTopic ||
      post.topics.some((t) => topicSet.has(slugify(t)));
    const yearOk = !hasYear || yearSet.has(post.year);
    const readOk = !hasRead || readSet.has(readBucketSlug(post.readMin));

    return topicOk && yearOk && readOk;
  });
}

export function blogVocab(): BlogVocab {
  const years = [...new Set(getAllPosts().map((p) => p.year))].sort(
    (a, b) => a - b,
  );

  return { years };
}

export function getAllProjects(): WorkProject[] {
  return PROJECTS.map((p) => p.project);
}

export function getProject(id: string): ProjectWithBody | null {
  return PROJECTS.find((p) => p.project.id === id) ?? null;
}

export function filterProjects(
  projects: WorkProject[],
  sel: WorkSelection,
): WorkProject[] {
  const domainFilter = new Set(sel.domains);
  const stackFilter = new Set(sel.stack);
  const yearFilter = new Set(sel.years);

  const hasDomain = domainFilter.size > 0;
  const hasStack = stackFilter.size > 0;
  const hasYear = yearFilter.size > 0;

  if (!hasDomain && !hasStack && !hasYear) return projects;

  return projects.filter((project) => {
    const domainOk = !hasDomain ||
      project.domains.some((d) => domainFilter.has(slugify(d)));
    const stackOk = !hasStack ||
      project.stack.some((s) => stackFilter.has(slugify(s)));
    const yearOk = !hasYear || yearFilter.has(project.year);

    return domainOk && stackOk && yearOk;
  });
}

export function getProjectNeighbors(
  id: string,
): { prev: WorkProject | null; next: WorkProject | null } {
  const all = getAllProjects();
  const index = all.findIndex((p) => p.id === id);
  if (index < 0) return { prev: null, next: null };

  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index < all.length - 1 ? all[index + 1] : null,
  };
}

export function workVocab(): WorkVocab {
  const stack = [
    ...new Set(getAllProjects().flatMap((p) => p.stack.map(slugify))),
  ].sort();

  const years = [...new Set(getAllProjects().map((p) => p.year))].sort(
    (a, b) => a - b,
  );

  return { domains: WORK_DOMAINS.map((t) => t.slug), stack, years };
}

export function paginate<T>(
  items: T[],
  page: number,
  size: number,
): { items: T[]; page: number; pageCount: number } {
  const pageCount = Math.max(1, Math.ceil(items.length / size));
  const start = (page - 1) * size;

  return {
    items: page < 1 ? [] : items.slice(start, start + size),
    page,
    pageCount,
  };
}
