import { HttpError, type PageProps } from "fresh";
import type { State } from "@/utils/state.ts";
import Header from "@/components/Header/Header.tsx";
import Footer from "@/components/Footer/Footer.tsx";
import styles from "./_error.module.css";

export default function ErrorPage({ error }: PageProps<unknown, State>) {
  const status = error instanceof HttpError ? error.status : 500;
  const message = status === 404 ? "Page not found." : "Something went wrong.";

  return (
    <>
      <Header active="" />
      <main id="main" class={styles.main} data-error-page>
        <p class={styles.eyebrow}>
          <span class={styles.num}>{status}</span>
          <span class={styles.label}>Error</span>
        </p>
        <h1 class={styles.title}>
          {message}
        </h1>
        <p class={styles.lede}>
          The page you were after isn't here. The rest of the site is one link
          away.
        </p>
        <a class={styles.home} href="/">
          Back to home
        </a>
      </main>
      <Footer />
    </>
  );
}
