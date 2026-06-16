import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import type { Theme } from "@/src/types.ts";
import { applyTheme, nextTheme, themeCookie } from "@/utils/theme.ts";
import { Moon, Sun } from "@/components/Icons/Icons.tsx";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const current = useSignal<Theme | null>(null);

  useEffect(() => {
    const set = document.documentElement.dataset.theme;
    if (set === "light" || set === "dark") {
      current.value = set;
      return;
    }
    current.value =
      globalThis.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  }, []);

  const toggle = () => {
    const next = nextTheme(current.value);
    current.value = next;
    applyTheme(next);
    document.cookie = themeCookie(next);
  };

  const target = nextTheme(current.value);

  return (
    <button
      aria-label={`Switch to ${target} mode`}
      class={styles.btn}
      onClick={toggle}
      type="button"
    >
      {target === "dark" ? <Moon /> : <Sun />}
    </button>
  );
}
