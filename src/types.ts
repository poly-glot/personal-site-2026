export type Theme = "light" | "dark";

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogType: string;
  ogImage?: string;
  robots?: string;
}

export type BlogAbstract =
  | "GATE"
  | "FIG"
  | "GRID"
  | "SIGN"
  | "HOOK"
  | "DOTS"
  | "MAP"
  | "BLOCKS";

export type WorkAbstract =
  | "MAP"
  | "FLAG"
  | "BLOCKS"
  | "DOTS"
  | "GRID"
  | "HOOK"
  | "PLANE";

export interface BlogPost {
  id: string;
  title: string;
  deck: string;
  date: string;
  year: number;
  topics: string[];
  readMin: number;
  abstract: BlogAbstract;
  tone: string;
  teaser: string;
  toc: TocEntry[];
}

export interface WorkProject {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  role: string;
  stack: string[];
  domains: string[];
  year: number;
  url: string;
  href: string;
  abstract: WorkAbstract;
  tone: string;
}

export interface BlogFilter {
  topics: string[];
  years: number[];
  reads: string[];
  page: number;
}

export interface BlogVocab {
  years: number[];
}

export interface WorkSelection {
  domains: string[];
  stack: string[];
  years: number[];
  page: number;
}

export interface TocEntry {
  id: string;
  text: string;
}

export interface Term {
  label: string;
  slug: string;
}

export interface WorkVocab {
  domains: string[];
  stack: string[];
  years: number[];
}
