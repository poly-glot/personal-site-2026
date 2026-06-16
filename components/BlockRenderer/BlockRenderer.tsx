import type { BlockNode } from "@/src/types.ts";
import styles from "./BlockRenderer.module.css";

function Block({ node }: { node: BlockNode }) {
  switch (node.kind) {
    case "h2":
      return <h2 id={node.id} class={`${styles.h2} display`}>{node.text}</h2>;
    case "h3":
      return <h3 class={styles.h3}>{node.text}</h3>;
    case "p":
      return <p class={styles.p}>{node.text}</p>;
    case "pull":
      return (
        <blockquote class={styles.pull}>
          <p>{node.text}</p>
        </blockquote>
      );
    case "list":
      return (
        <ul class={styles.list}>
          {node.items.map((it, i) => <li key={i}>{it}</li>)}
        </ul>
      );
    case "code":
      return (
        <pre class={`${styles.code} mono`}>
          <code>{node.text}</code>
        </pre>
      );
    case "callout":
      return (
        <aside class={styles.callout}>
          <span class={`${styles.calloutLabel} mono`}>{node.title}</span>
          <p>{node.text}</p>
        </aside>
      );
  }
}

export default function BlockRenderer({ body }: { body: BlockNode[] }) {
  return (
    <>
      {body.map((node, i) => <Block key={i} node={node} />)}
    </>
  );
}
