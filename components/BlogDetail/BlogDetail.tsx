import type { BlogPost, TocEntry } from "@/src/types.ts";
import type { ComponentType } from "preact";
import { CONTACT_EMAIL } from "@/src/nav.ts";
import TagLinks from "@/components/TagLinks/TagLinks.tsx";
import { topicHref } from "@/data/taxonomy.ts";
import { Share } from "@/components/Icons/Icons.tsx";
import SectionEyebrow from "@/components/SectionEyebrow/SectionEyebrow.tsx";
import Toc from "@/components/Toc/Toc.tsx";
import { proseComponents } from "@/components/Prose/proseComponents.tsx";
import styles from "./BlogDetail.module.css";

const bodyModules = import.meta.glob("../../content/blog/*.mdx", {
  eager: true,
}) as Record<
  string,
  { default: ComponentType<{ components?: Record<string, unknown> }> }
>;

const bodies: Record<
  string,
  ComponentType<{ components?: Record<string, unknown> }>
> = {};
for (const [path, mod] of Object.entries(bodyModules)) {
  const id = path.split("/").pop()!.replace(/\.mdx$/, "");
  bodies[id] = mod.default;
}

interface BlogDetailProps {
  post: BlogPost;
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
  { post, toc, neighbors }: BlogDetailProps,
) {
  const Body = bodies[post.id];

  return (
    <main id="main" class={`container ${styles.main}`}>
      <div class={`${styles.bar} bleed-panel`}>
        <a class={styles.back} href="/blog/">
          <span aria-hidden="true">←</span> All writing
        </a>
        <span class={styles.barMeta}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {` · ${post.readMin} min read`}
        </span>
      </div>

      <header class={`${styles.head} bleed-divider`}>
        <h1 class={styles.title}>{post.title}</h1>
        <p class={styles.deck}>{post.deck}</p>
        <TagLinks label="Topics" tags={post.topics} hrefFor={topicHref} />
      </header>

      <div class={styles.layout}>
        <article class={styles.body}>
          {Body ? <Body components={proseComponents} /> : null}
          <p class={`${styles.endSig} mono bleed-divider-top`}>
            — Junaid · {formatDate(post.date)}
          </p>
        </article>

        <aside class={styles.side} aria-label="Article navigation">
          <div class={`${styles.toc} bleed-divider`}>
            <Toc entries={toc} />
          </div>
          <div class={`${styles.share} bleed-divider-top`}>
            <span class={`${styles.shareLabel} mono`}>
              <Share />
              Share
            </span>
            <a
              class={styles.shareLink}
              href={`https://twitter.com/intent/tweet?text=${
                encodeURIComponent(post.title)
              }`}
              target="_blank"
              rel="noopener"
            >
              Twitter
              <span class="sr-only">&nbsp;(opens in a new tab)</span>
            </a>
            <a
              class={styles.shareLink}
              href={`mailto:?subject=${encodeURIComponent(post.title)}`}
            >
              Email
            </a>
          </div>
        </aside>
      </div>

      <nav class={`${styles.pn} bleed-panel`} aria-label="More essays">
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

      <section class="port-foot bleed-panel">
        <div class="port-foot-inner">
          <SectionEyebrow
            num="·"
            label="Stay in touch"
            right="Roughly monthly"
            tone="invert"
          />
          <p class="port-foot-copy">
            Liked this? I write when something <strong>actually changed</strong>
            {" "}
            — a new gate, a refactor that paid off, a hire who taught me
            something.
          </p>
          <a
            class="port-foot-link"
            href={`mailto:${CONTACT_EMAIL}?subject=Subscribe`}
          >
            Email me to subscribe <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
