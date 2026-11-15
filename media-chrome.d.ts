import type { JSX } from "preact";

type MediaElement = JSX.HTMLAttributes<HTMLElement>;

declare module "preact" {
  namespace JSX {
    interface IntrinsicElements {
      "media-captions-button": MediaElement;
      "media-control-bar": MediaElement;
      "media-controller": MediaElement;
      "media-fullscreen-button": MediaElement;
      "media-mute-button": MediaElement;
      "media-play-button": MediaElement;
      "media-time-display": MediaElement & { showduration?: boolean };
      "media-time-range": MediaElement;
    }
  }
}
