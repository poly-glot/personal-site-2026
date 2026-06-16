import type { BlogPost, PostWithBody, TocEntry } from "@/src/types.ts";
import { CONTACT_EMAIL } from "@/src/nav.ts";
import BlogHero from "@/components/hero/BlogHero/BlogHero.tsx";
import BlockRenderer from "@/components/BlockRenderer/BlockRenderer.tsx";
import Toc from "@/components/Toc/Toc.tsx";
import styles from "./BlogDetail.module.css";

interface BlogDetailProps {
  detail: PostWithBody;
  num: string;
  toc: TocEntry[];
  neighbors: { prev: BlogPost | null; next: BlogPost | null };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogDetail(
  { detail, num, toc, neighbors }: BlogDetailProps,
) {
  const { post, body } = detail;

  return (
    <main id="main" class={`container ${styles.main}`}>
      <header class={styles.head}>
        <div class={`section-eyebrow ${styles.eyebrow}`}>
          <span class="num accent">{num}.</span>
          <span>{post.topics[0]}</span>
          <span class={styles.spacer} />
          <span class="mono">
            {formatDate(post.date)} · {post.readMin} min read
          </span>
        </div>
        <h1 class={`${styles.title} display`}>{post.title}</h1>
        <p class={styles.deck}>{post.deck}</p>
        <ul class={styles.topics} aria-label="Topics">
          {post.topics.map((t) => (
            <li key={t} class={`${styles.topic} mono`}>{t}</li>
          ))}
        </ul>
      </header>

      <figure class={styles.hero}>
        <BlogHero abstract={post.abstract} id={post.id} variant="hero" />
      </figure>

      <div class={styles.layout}>
        <aside class={styles.side} aria-label="Article navigation">
          <div class={styles.sideInner}>
            <a class={`${styles.back} mono`} href="/blog/">
              <span aria-hidden="true">←</span> All writing
            </a>
            <dl class={styles.sideMeta}>
              <div>
                <dt class="mono">Published</dt>
                <dd>{formatDate(post.date)}</dd>
              </div>
              <div>
                <dt class="mono">Read time</dt>
                <dd>{post.readMin} min</dd>
              </div>
              <div>
                <dt class="mono">Topics</dt>
                <dd>{post.topics.join(" · ")}</dd>
              </div>
            </dl>
            <Toc entries={toc} />
            <div class={styles.share}>
              <span class={`${styles.shareLabel} mono`}>Share</span>
              <a
                class={styles.shareLink}
                href={`https://twitter.com/intent/tweet?text=${
                  encodeURIComponent(post.title)
                }`}
                target="_blank"
                rel="noopener"
              >
                Twitter
              </a>
              <a
                class={styles.shareLink}
                href={`mailto:?subject=${encodeURIComponent(post.title)}`}
              >
                Email
              </a>
            </div>
          </div>
        </aside>

        <article class={styles.body}>
          <BlockRenderer body={body} />
          <hr class={styles.endRule} />
          <p class={`${styles.endSig} mono`}>
            — Junaid · {formatDate(post.date)}
          </p>
        </article>
      </div>

      <nav class={styles.pn} aria-label="More essays">
        <div class={styles.pnSide}>
          {neighbors.prev
            ? (
              <a
                class={styles.pnLink}
                href={`/blog/${neighbors.prev.id}/`}
              >
                <span class={`${styles.pnEyebrow} mono`}>
                  <span aria-hidden="true">←</span> Previous
                </span>
                <span class={styles.pnTitle}>{neighbors.prev.title}</span>
              </a>
            )
            : <span />}
        </div>
        <div class={`${styles.pnSide} ${styles.pnEnd}`}>
          {neighbors.next
            ? (
              <a
                class={`${styles.pnLink} ${styles.pnLinkEnd}`}
                href={`/blog/${neighbors.next.id}/`}
              >
                <span class={`${styles.pnEyebrow} mono`}>
                  Next <span aria-hidden="true">→</span>
                </span>
                <span class={styles.pnTitle}>{neighbors.next.title}</span>
              </a>
            )
            : <span />}
        </div>
      </nav>

      <section class="port-foot">
        <div class="port-foot-inner">
          <div class="section-eyebrow">
            <span class="num accent">·</span>
            <span>Stay in touch</span>
            <span class={styles.spacer} />
            <span class="mono">Roughly monthly</span>
          </div>
          <p class="port-foot-copy">
            Liked this? I write when something <strong>actually changed</strong>
            {" "}
            — a new gate, a refactor that paid off, a hire who taught me
            something.
          </p>
          <a
            class="post-cta port-foot-cta"
            href={`mailto:${CONTACT_EMAIL}?subject=Subscribe`}
          >
            <span>Email me to subscribe</span>
            <span class="post-cta-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
