import type { ComponentChildren } from "preact";
import Callout from "@/components/Callout/Callout.tsx";
import styles from "./proseComponents.module.css";

export const proseComponents = {
  h2: (p: { id?: string; children?: ComponentChildren }) => (
    <h2 id={p.id} class={`${styles.h2} display`}>{p.children}</h2>
  ),
  h3: (p: { id?: string; children?: ComponentChildren }) => (
    <h3 id={p.id} class={styles.h3}>{p.children}</h3>
  ),
  p: (p: { children?: ComponentChildren }) => (
    <p class={styles.p}>{p.children}</p>
  ),
  a: (p: { href?: string; children?: ComponentChildren }) => (
    <a class={styles.a} href={p.href}>{p.children}</a>
  ),
  ul: (p: { children?: ComponentChildren }) => (
    <ul class={styles.list}>{p.children}</ul>
  ),
  ol: (p: { children?: ComponentChildren }) => (
    <ol class={styles.list}>{p.children}</ol>
  ),
  li: (p: { children?: ComponentChildren }) => <li>{p.children}</li>,
  blockquote: (p: { children?: ComponentChildren }) => (
    <blockquote class={styles.pull}>{p.children}</blockquote>
  ),
  pre: (p: { children?: ComponentChildren }) => (
    <pre class={`${styles.code} mono`}>{p.children}</pre>
  ),
  Callout,
};
