import type { WorkProject, WorkSelection } from "@/src/types.ts";
import {
  EMPTY_WORK_SELECTION,
  parseWorkSegments,
  type Term,
  WORK_DOMAINS,
  WORK_PAGE_SIZE,
} from "@/data/taxonomy.ts";
import {
  filterProjects,
  getAllProjects,
  getProject,
  getProjectNeighbors,
  paginate,
  workVocab,
} from "@/data/content.ts";

export const VOCAB = workVocab();
const ALL_PROJECTS = getAllProjects();
const ALL_PROJECTS_COUNT = ALL_PROJECTS.length;

export interface WorkListData {
  view: "list";
  selection: WorkSelection;
  projects: WorkProject[];
  shown: number;
  total: number;
  domains: Term[];
  stack: Term[];
  years: number[];
}

export interface WorkDetailData {
  view: "detail";
  project: WorkProject;
  prev: WorkProject | null;
  next: WorkProject | null;
}

export type WorkPageData = WorkListData | WorkDetailData;

export function buildWorkListData(
  selection: WorkSelection,
): WorkListData {
  const matched = filterProjects(ALL_PROJECTS, selection);
  const { items } = paginate(matched, selection.page, WORK_PAGE_SIZE);

  return {
    view: "list",
    selection,
    projects: items,
    shown: matched.length,
    total: ALL_PROJECTS_COUNT,
    domains: [...WORK_DOMAINS],
    stack: VOCAB.stack.map((slug) => ({ label: slug, slug })),
    years: VOCAB.years,
  };
}

export function resolveWork(
  segments: string[],
): WorkPageData | { redirect: string } | "notfound" {
  if (segments.length === 1) {
    const found = getProject(segments[0]);
    if (found) {
      return {
        view: "detail",
        project: found,
        ...getProjectNeighbors(found.id),
      };
    }
  }

  const parsed = parseWorkSegments(segments, VOCAB);
  if (parsed === "notfound") return "notfound";

  const requested = "/work/" +
    (segments.length ? segments.join("/") + "/" : "");
  if (requested !== parsed.canonical) return { redirect: parsed.canonical };

  const matched = filterProjects(ALL_PROJECTS, parsed.selection);
  const { page, pageCount } = paginate(
    matched,
    parsed.selection.page,
    WORK_PAGE_SIZE,
  );
  if (page < 1 || page > pageCount) return "notfound";

  return buildWorkListData(parsed.selection);
}

export { EMPTY_WORK_SELECTION };
