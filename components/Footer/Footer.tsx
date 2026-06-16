import { CONTACT_EMAIL } from "@/src/nav.ts";
import styles from "./Footer.module.css";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer class={styles.footer}>
      <div class={styles.inner}>
        <span>&copy; {YEAR} Usual copyright notice.</span>
        <nav class={styles.nav} aria-label="Secondary">
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </nav>
      </div>
    </footer>
  );
}
