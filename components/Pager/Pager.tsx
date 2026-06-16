import styles from "./Pager.module.css";

interface PagerProps {
  page: number;
  pageCount: number;
  hrefFor: (page: number) => string;
}

export default function Pager({ page, pageCount, hrefFor }: PagerProps) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const prevDisabled = page === 1;
  const nextDisabled = page === pageCount;

  return (
    <nav class={styles.pager} aria-label="Pagination">
      {prevDisabled
        ? (
          <span class={`${styles.btn} ${styles.disabled}`} aria-hidden="true">
            <span aria-hidden="true">←</span>
            <span>Prev</span>
          </span>
        )
        : (
          <a
            class={styles.btn}
            href={hrefFor(page - 1)}
            aria-label="Previous page"
          >
            <span aria-hidden="true">←</span>
            <span>Prev</span>
          </a>
        )}
      <ol class={styles.pages}>
        {pages.map((n) => (
          <li key={n}>
            <a
              class={`${styles.num} mono ${n === page ? styles.current : ""}`}
              href={hrefFor(n)}
              aria-current={n === page ? "page" : undefined}
              aria-label={`Page ${n}`}
            >
              {String(n).padStart(2, "0")}
            </a>
          </li>
        ))}
      </ol>
      {nextDisabled
        ? (
          <span class={`${styles.btn} ${styles.disabled}`} aria-hidden="true">
            <span>Next</span>
            <span aria-hidden="true">→</span>
          </span>
        )
        : (
          <a
            class={styles.btn}
            href={hrefFor(page + 1)}
            aria-label="Next page"
          >
            <span>Next</span>
            <span aria-hidden="true">→</span>
          </a>
        )}
    </nav>
  );
}
