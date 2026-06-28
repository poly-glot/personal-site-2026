import type { PageProps } from "fresh";
import type { State } from "@/utils/state.ts";
import {
  resolveMeta,
  SITE_LOCALE,
  SITE_NAME,
  SITE_OG_IMAGE_ALT,
  SITE_OG_IMAGE_HEIGHT,
  SITE_OG_IMAGE_WIDTH,
} from "@/src/site.ts";
import { DISPLAY_FONT_WOFF2 } from "@/src/preload.ts";

const THEME_INIT =
  "(function(){try{var t=document.cookie.match(/(?:^|; *)theme=(dark|light)/);if(t){document.documentElement.dataset.theme=t[1];}}catch(e){}})();";

export default function App(
  { Component, state, url }: PageProps<unknown, State>,
) {
  const meta = resolveMeta(url, state.meta);

  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        {DISPLAY_FONT_WOFF2
          ? (
            <link
              rel="preload"
              as="font"
              href={DISPLAY_FONT_WOFF2}
              type="font/woff2"
              crossorigin="anonymous"
            />
          )
          : null}
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        {meta.robots ? <meta name="robots" content={meta.robots} /> : null}
        <meta property="og:type" content={meta.ogType} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.canonical} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content={SITE_LOCALE} />
        {meta.ogImage
          ? (
            <>
              <meta property="og:image" content={meta.ogImage} />
              <meta property="og:image:alt" content={SITE_OG_IMAGE_ALT} />
              <meta property="og:image:width" content={SITE_OG_IMAGE_WIDTH} />
              <meta property="og:image:height" content={SITE_OG_IMAGE_HEIGHT} />
            </>
          )
          : null}
        <meta
          name="twitter:card"
          content={meta.ogImage ? "summary_large_image" : "summary"}
        />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        {meta.ogImage
          ? <meta name="twitter:image" content={meta.ogImage} />
          : null}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#ffffff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#1f1f1e"
        />
        {url.pathname === "/"
          ? (
            <link
              rel="preload"
              as="image"
              href="/img/junaid.webp"
              type="image/webp"
              fetchpriority="high"
            />
          )
          : null}
      </head>
      <body>
        <a href="#main" class="skip-link">Skip to content</a>
        <Component />
      </body>
    </html>
  );
}
