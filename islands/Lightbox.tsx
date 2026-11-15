import { useEffect, useRef, useState } from "preact/hooks";
import { Close } from "@/components/Icons/Icons.tsx";
import styles from "./Lightbox.module.css";

interface Enlarged {
  alt: string;
  src: string;
}

const ZOOM_LINK = "a[data-zoom]";

function isPlainClick(event: MouseEvent): boolean {
  return event.button === 0 && !event.metaKey && !event.ctrlKey &&
    !event.shiftKey && !event.altKey;
}

export default function Lightbox() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [enlarged, setEnlarged] = useState<Enlarged | null>(null);

  const close = () => dialog.current?.close();

  useEffect(() => {
    const open = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>(
        ZOOM_LINK,
      );
      if (!link || !isPlainClick(event)) return;

      event.preventDefault();

      setEnlarged({
        alt: link.querySelector("img")?.alt ?? "",
        src: link.href,
      });
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
      aria-label={enlarged?.alt}
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
      {enlarged && (
        <img class={styles.image} src={enlarged.src} alt={enlarged.alt} />
      )}
    </dialog>
  );
}
