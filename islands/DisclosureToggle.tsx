import { useState } from "preact/hooks";
import styles from "./DisclosureToggle.module.css";

interface DisclosureToggleProps {
  controls: string;
  label: string;
}

export default function DisclosureToggle(
  { controls, label }: DisclosureToggleProps,
) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    const panel = document.getElementById(controls);
    if (!panel) return;

    const next = !open;
    panel.dataset.open = String(next);
    setOpen(next);
  };

  return (
    <button
      class={styles.toggle}
      type="button"
      aria-expanded={open}
      aria-controls={controls}
      onClick={toggle}
    >
      {label}
      <svg
        class={styles.chevron}
        viewBox="0 0 16 16"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        aria-hidden="true"
      >
        <path d="M4 6l4 4 4-4" />
      </svg>
    </button>
  );
}
