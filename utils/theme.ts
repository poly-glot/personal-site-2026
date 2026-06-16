import type { Theme } from "@/src/types.ts";

const THEME_COOKIE = "theme";
const THEME_MAX_AGE = 31536000;

export function themeCookie(theme: Theme): string {
  return `${THEME_COOKIE}=${theme}; Path=/; Max-Age=${THEME_MAX_AGE}; SameSite=Lax`;
}

export function nextTheme(current: Theme | null): Theme {
  return current === "dark" ? "light" : "dark";
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}
