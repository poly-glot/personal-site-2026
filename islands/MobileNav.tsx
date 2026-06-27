import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import type { NavLink } from "@/src/nav.ts";
import { Close, Github, Menu } from "@/components/Icons/Icons.tsx";
import styles from "./MobileNav.module.css";

interface MobileNavProps {
  links: readonly NavLink[];
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function MobileNav({ links }: MobileNavProps) {
  const open = useSignal(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const wasOpenRef = useRef(false);

  const close = () => {
    open.value = false;
  };

  useEffect(() => {
    document.body.style.overflow = open.value ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open.value]);

  useEffect(() => {
    if (!open.value) {
      if (wasOpenRef.current) triggerRef.current?.focus();
      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open.value]);

  return (
    <>
      <button
        aria-controls="mobile-menu"
        aria-expanded={open.value}
        aria-label="Open menu"
        class={`${styles.iconBtn} ${styles.trigger}`}
        onClick={() => {
          open.value = true;
        }}
        ref={triggerRef}
        type="button"
      >
        <Menu />
      </button>

      <div
        aria-hidden={!open.value}
        class={open.value ? `${styles.drawer} ${styles.open}` : styles.drawer}
        id="mobile-menu"
      >
        <div class={styles.scrim} onClick={close} />
        <aside
          aria-label="Menu"
          aria-modal="true"
          class={styles.panel}
          ref={panelRef}
          role="dialog"
        >
          <div class={styles.closeRow}>
            <button
              aria-label="Close menu"
              class={styles.iconBtn}
              onClick={close}
              ref={closeRef}
              type="button"
            >
              <Close />
            </button>
          </div>
          <nav class={styles.nav}>
            {links.map((l) => (
              <a href={l.href} key={l.id} onClick={close}>
                <span>{l.label}{l.stub ? "*" : ""}</span>
                <span class={styles.idx}>{l.num}</span>
              </a>
            ))}
          </nav>
          <a
            class={styles.social}
            href="https://github.com/poly-glot/"
            target="_blank"
            rel="noopener"
            onClick={close}
          >
            <Github />
            <span>github.com/poly-glot</span>
          </a>
          <div class={styles.footer}>
            <div>* coming soon</div>
            <div class={styles.footerLine}>JUNAID · Solutions Architect</div>
            <div>poly-glot · 2026</div>
          </div>
        </aside>
      </div>
    </>
  );
}
