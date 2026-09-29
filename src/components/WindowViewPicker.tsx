import { useEffect, useState } from "react";
import {
  DEFAULT_WINDOW_VIEW,
  WINDOW_VIEW_STORAGE_KEY,
  WINDOW_VIEWS,
  type WindowView,
} from "@/config/scene.types";

export interface WindowViewPickerProps {
  labels: { title: string } & Record<WindowView, string>;
}

export default function WindowViewPicker({ labels }: WindowViewPickerProps) {
  const [view, setView] = useState<WindowView>(DEFAULT_WINDOW_VIEW);

  useEffect(() => {
    // ThemeProvider's inline script applies the saved choice before hydration.
    const current = document.documentElement.dataset.windowView;
    setView(
      WINDOW_VIEWS.find((option) => option === current) ?? DEFAULT_WINDOW_VIEW,
    );
  }, []);

  function choose(next: WindowView) {
    document.documentElement.dataset.windowView = next;
    localStorage.setItem(WINDOW_VIEW_STORAGE_KEY, next);
    setView(next);
  }

  return (
    <div className="px-4 py-4">
      <p
        id="window-view-label"
        className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400"
      >
        {labels.title}
      </p>
      <div
        role="radiogroup"
        aria-labelledby="window-view-label"
        className="grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-700"
      >
        {WINDOW_VIEWS.map((option, index) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={view === option}
            onClick={() => choose(option)}
            className={`${
              index === WINDOW_VIEWS.length - 1 && index % 2 === 0
                ? "col-span-2 "
                : ""
            }rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
              view === option
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-50"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-50"
            }`}
          >
            {labels[option]}
          </button>
        ))}
      </div>
    </div>
  );
}
