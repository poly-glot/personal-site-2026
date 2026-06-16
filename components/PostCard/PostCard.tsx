import type { BlogPost } from "@/src/types.ts";
import BlogHero from "@/components/hero/BlogHero/BlogHero.tsx";
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: BlogPost;
  index: number;
  banded: boolean;
  first: boolean;
  last: boolean;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function PostCard(
  { post, index, banded, first, last }: PostCardProps,
) {
  const href = `/blog/${post.id}/`;
  const num = String(index + 1).padStart(2, "0");

  const articleClass = [
    styles.post,
    banded ? styles.even : "",
    first ? styles.first : "",
    last ? styles.last : "",
  ].filter(Boolean).join(" ");

  return (
    <article class={articleClass} id={post.id}>
      <a class={styles.thumb} href={href} aria-label={`Read ${post.title}`}>
        <BlogHero abstract={post.abstract} id={post.id} variant="card" />
      </a>
      <div class={styles.meta}>
        <div class={`${styles.num} mono`}>
          {num}
          <span class={styles.numSep}>/</span>
          <span class={styles.numDate}>{formatDate(post.date)}</span>
          <span class={styles.numSep}>·</span>
          <span class={styles.numRead}>{post.readMin} min read</span>
        </div>
        <h2 class={`${styles.title} display`}>
          <a href={href}>{post.title}</a>
        </h2>
        <p class={styles.deck}>{post.deck}</p>
        <p class={styles.body}>{post.teaser}</p>
        <div class={styles.foot}>
          <ul class={styles.topics} aria-label="Topics">
            {post.topics.map((t) => (
              <li key={t} class={`${styles.topic} mono`}>{t}</li>
            ))}
          </ul>
          <a class={`${styles.cta} post-cta`} href={href}>
            <span>Read essay</span>
            <span class="post-cta-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}
