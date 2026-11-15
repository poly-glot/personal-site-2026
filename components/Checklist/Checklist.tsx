import { type ComponentChildren, toChildArray, type VNode } from "preact";
import styles from "./Checklist.module.css";

function isElement(
  child: unknown,
): child is VNode<{ children?: ComponentChildren }> {
  return typeof child === "object" && child !== null;
}

function countItems(children: ComponentChildren): number {
  return toChildArray(children)
    .filter(isElement)
    .flatMap((list) => toChildArray(list.props.children))
    .filter(isElement).length;
}

export default function Checklist(
  { children }: { children: ComponentChildren },
) {
  const items = countItems(children);

  return (
    <section class={styles.checklist} aria-label="Checklist">
      <header class={`${styles.head} mono`}>
        <span>Checklist</span>
        <span class={styles.count}>{items} items</span>
      </header>
      {children}
    </section>
  );
}
