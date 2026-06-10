import type { CSSProperties } from "react";
import type { TimelineEntry } from "@/types";

export interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  return (
    <ol
      data-reveal
      style={{ transform: "none" } as CSSProperties}
      className="relative space-y-8 border-l-2 border-slate-200 pl-8 dark:border-slate-700"
    >
      {entries.map((entry, index) => (
        <li
          key={`${entry.organization}-${entry.period}`}
          className="relative"
          data-reveal
          style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
        >
          <span className="absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full bg-primary-500 ring-2 ring-white dark:bg-primary-400 dark:ring-slate-900" />
          <div className="rounded-lg border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-1 text-base font-semibold text-slate-900 dark:text-slate-50">
              {entry.title}
            </h3>
            <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
              {entry.organization} &middot; {entry.period}
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {entry.description.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
