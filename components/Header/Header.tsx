import { VISIBLE_NAV_LINKS } from "@/src/nav.ts";
import ThemeToggle from "@/islands/ThemeToggle.tsx";
import MobileNav from "@/islands/MobileNav.tsx";
import { Github } from "@/components/Icons/Icons.tsx";
import styles from "./Header.module.css";

interface HeaderProps {
  active?: string;
}

export default function Header({ active = "" }: HeaderProps) {
  const hasNav = VISIBLE_NAV_LINKS.length > 0;

  return (
    <header class={styles.header}>
      <div class={styles.inner}>
        <a class={styles.logo} href="/" aria-label="Junaid Ahmed, home">
          JUNAID AHMED<span class={styles.dot}>.</span>
        </a>
        {hasNav && (
          <nav class={styles.navDesktop} aria-label="Primary">
            {VISIBLE_NAV_LINKS.map((l) => (
              <a
                class={active === l.id ? styles.active : undefined}
                href={l.href}
                key={l.id}
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
        <div class={styles.actions}>
          <a
            class={styles.iconLink}
            href="https://github.com/poly-glot/"
            target="_blank"
            rel="noopener"
            aria-label="GitHub — poly-glot"
          >
            <Github />
          </a>
          <ThemeToggle />
          {hasNav && <MobileNav links={VISIBLE_NAV_LINKS} />}
        </div>
      </div>
    </header>
  );
}
