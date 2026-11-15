import { useEffect, useRef, useState } from "preact/hooks";
import { Close } from "@/components/Icons/Icons.tsx";
import type { WorkVideo } from "@/src/types.ts";
import CaseVideo from "@/islands/CaseVideo.tsx";
import styles from "./Lightbox.module.css";

type Enlarged =
  | { kind: "image"; label: string; src: string }
  | { kind: "video"; label: string; video: WorkVideo };

const OPENER = "a[data-zoom], a[data-video]";

function isPlainClick(event: MouseEvent): boolean {
  return event.button === 0 && !event.metaKey && !event.ctrlKey &&
    !event.shiftKey && !event.altKey;
}

function readOpener(link: HTMLAnchorElement): Enlarged {
  if (link.dataset.video === undefined) {
    return {
      kind: "image",
      label: link.querySelector("img")?.alt ?? "",
      src: link.href,
    };
  }

  return {
    kind: "video",
    label: link.dataset.label ?? "",
    video: {
      captions: link.dataset.captions ?? "",
      poster: link.dataset.poster ?? "",
      src: link.getAttribute("href") ?? "",
    },
  };
}

export default function Lightbox() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [enlarged, setEnlarged] = useState<Enlarged | null>(null);

  const close = () => dialog.current?.close();

  useEffect(() => {
    const open = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>(
        OPENER,
      );
      if (!link || !isPlainClick(event)) return;

      event.preventDefault();

      setEnlarged(readOpener(link));
      dialog.current?.showModal();
    };

    document.addEventListener("click", open);
    return () => document.removeEventListener("click", open);
  }, []);

  const closeOnBackdrop = (event: MouseEvent) => {
    if (event.target === dialog.current) close();
  };

  return (
    <dialog
      aria-label={enlarged?.label}
      class={styles.lightbox}
      onClick={closeOnBackdrop}
      onClose={() => setEnlarged(null)}
      ref={dialog}
    >
      <button
        aria-label="Close"
        class={styles.close}
        onClick={close}
        type="button"
      >
        <Close />
      </button>
      {enlarged?.kind === "image" && (
        <img class={styles.image} src={enlarged.src} alt={enlarged.label} />
      )}
      {enlarged?.kind === "video" && (
        <div class={styles.player}>
          <CaseVideo autoPlay label={enlarged.label} video={enlarged.video} />
        </div>
      )}
    </dialog>
  );
}
