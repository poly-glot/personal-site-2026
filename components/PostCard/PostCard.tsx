import type { BlogPost } from "@/src/types.ts";
import TagLinks from "@/components/TagLinks/TagLinks.tsx";
import { topicHref } from "@/data/taxonomy.ts";
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: BlogPost;
  index: number;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function PostCard({ post, index }: PostCardProps) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article class={`${styles.post} bleed-divider`} id={post.id}>
      <span class={`${styles.num} mono`}>{num}</span>

      <div class={styles.text}>
        <h2 class={styles.title}>
          <a href={`/blog/${post.id}/`}>{post.title}</a>
        </h2>
        <p class={styles.deck}>{post.deck}</p>
        <TagLinks label="Topics" tags={post.topics} hrefFor={topicHref} />
      </div>

      <p class={`${styles.meta} mono`}>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>{post.readMin} min read</span>
      </p>
    </article>
  );
}
