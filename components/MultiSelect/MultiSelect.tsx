import type { Term } from "@/data/taxonomy.ts";

export interface MultiSelectProps {
  label: string;
  options: Term[];
  selected: string[];
  open: boolean;
  onTrigger: () => void;
  onPick: (slug: string) => void;
  onClear: () => void;
}

export default function MultiSelect(
  { label, options, selected, open, onTrigger, onPick, onClear }:
    MultiSelectProps,
) {
  const count = selected.length;
  const summary = count === 0
    ? "All"
    : count === 1
    ? (options.find((o) => o.slug === selected[0])?.label ?? selected[0])
    : `${count} selected`;

  const wrapClass = [
    "flt-ms",
    open ? "flt-ms-open" : "",
    count > 0 ? "flt-ms-active" : "",
  ]
    .filter(Boolean).join(" ");

  return (
    <div class={wrapClass}>
      <button
        type="button"
        class="flt-trigger"
        onClick={onTrigger}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span class="flt-label">{label}</span>
        <span class="flt-summary">{summary}</span>
        <span class="flt-caret" aria-hidden="true">▾</span>
      </button>
      {open && (
        <div class="flt-panel" role="listbox" aria-multiselectable="true">
          <div class="flt-panel-head">
            <span class="flt-panel-count">
              {count === 0
                ? `${options.length} options`
                : `${count} of ${options.length}`}
            </span>
            {count > 0 && (
              <button type="button" class="flt-panel-clear" onClick={onClear}>
                Clear
              </button>
            )}
          </div>
          <div class="flt-options">
            {options.map((opt) => {
              const on = selected.includes(opt.slug);
              const optClass = ["flt-option", on ? "flt-option-on" : ""]
                .filter(Boolean).join(" ");
              return (
                <button
                  type="button"
                  class={optClass}
                  onClick={() => onPick(opt.slug)}
                >
                  <span class="flt-check" aria-hidden="true">
                    <svg viewBox="0 0 12 12" width="10" height="10">
                      <path
                        d="M2 6 L5 9 L10 3"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span class="flt-option-label">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
