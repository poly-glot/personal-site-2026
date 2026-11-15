import { Tag } from "@/components/Icons/Icons.tsx";
import styles from "./TagLinks.module.css";

interface TagLinksProps {
  label: string;
  tags: string[];
  hrefFor: (tag: string) => string;
}

export default function TagLinks({ label, tags, hrefFor }: TagLinksProps) {
  return (
    <ul class={styles.topics} aria-label={label}>
      {tags.map((tag) => (
        <li key={tag}>
          <a class={styles.link} href={hrefFor(tag)}>
            <Tag />
            {tag}
          </a>
        </li>
      ))}
    </ul>
  );
}
