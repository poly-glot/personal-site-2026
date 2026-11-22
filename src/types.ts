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

export type WorkKind = "study" | "client";

export type WorkLayout = "prose" | "chapters";

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
  story?: Record<string, string>;
  client?: string;
  delivered?: string;
  role?: string;
  kind?: WorkKind;
  layout?: WorkLayout;
  stack: string[];
  domains: string[];
  year: number;
  period?: string;
  url: string;
  href: string;
  abstract: WorkAbstract;
  tone: string;
  cover?: string;
  source?: string;
  video?: WorkVideo;
}

export interface WorkVideo {
  captions: string;
  poster: string;
  src: string;
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

export type Tone = "focal" | "ghost";

export type WireframeSize = "band" | "bar" | "tall";

export interface WireframeBlock {
  cells?: number;
  focal?: true;
  names: readonly string[];
  size: WireframeSize;
}

export interface WireframePage {
  blocks: readonly WireframeBlock[];
  name: string;
}

export interface ChangeStep {
  lines: readonly string[];
  title: string;
  tone?: Tone;
}

export type SketchLayout = "banner" | "form" | "grid" | "hero" | "list";

export interface SketchPage {
  layout: SketchLayout;
  name: string;
}
