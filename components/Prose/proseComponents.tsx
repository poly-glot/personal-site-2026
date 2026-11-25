import { type ComponentChildren, h } from "preact";
import Callout from "@/components/Callout/Callout.tsx";
import Checklist from "@/components/Checklist/Checklist.tsx";
import { External } from "@/components/Icons/Icons.tsx";
import Summary from "@/components/Summary/Summary.tsx";
import styles from "./proseComponents.module.css";

interface HeadingProps {
  id?: string;
  children?: ComponentChildren;
}

const H2 = (p: HeadingProps) =>
  h("h2", { id: p.id, class: `${styles.h2} display` }, p.children);

const H3 = (p: HeadingProps) =>
  h("h3", { id: p.id, class: styles.h3 }, p.children);

export function Link(
  { children, href }: { children?: ComponentChildren; href?: string },
) {
  if (!href?.startsWith("http")) {
    return <a class={styles.a} href={href}>{children}</a>;
  }

  return (
    <a class={styles.a} href={href} rel="noopener" target="_blank">
      {children}
      <span class="sr-only">&nbsp;(opens in a new tab)</span>
      <span aria-hidden="true" class={styles.out}>
        {"\u2060"}
        <External />
      </span>
    </a>
  );
}

export const proseComponents = {
  h2: H2,
  h3: H3,
  H2,
  H3,
  p: (p: { children?: ComponentChildren }) =>
    h("p", { class: styles.p }, p.children),
  a: Link,
  ul: (p: { children?: ComponentChildren }) => (
    <ul class={styles.list}>{p.children}</ul>
  ),
  ol: (p: { children?: ComponentChildren }) => (
    <ol class={styles.list}>{p.children}</ol>
  ),
  li: (p: { children?: ComponentChildren }) => h("li", null, p.children),
  blockquote: (p: { children?: ComponentChildren }) => (
    <blockquote class={styles.pull}>{p.children}</blockquote>
  ),
  pre: (p: { children?: ComponentChildren }) => (
    <pre class={`${styles.code} mono`} tabIndex={0}>{p.children}</pre>
  ),
  Callout,
  Checklist,
  Summary,
  Wide: (p: { children?: ComponentChildren }) => (
    <div class={styles.wide} data-wide>{p.children}</div>
  ),
};
