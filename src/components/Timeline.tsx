import type { TimelineEntry } from '@/types';

export interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  return (
    <ol
      data-reveal
      style={{ transform: 'none' } as React.CSSProperties}
      className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-700 space-y-8"
    >
      {entries.map((entry, index) => (
        <li
          key={index}
          className="relative"
          data-reveal
          style={{ '--reveal-delay': `${index * 80}ms` } as React.CSSProperties}
        >
          {/* Dot */}
          <span className="absolute -left-[2.35rem] top-1.5 w-3 h-3 rounded-full bg-primary-500 dark:bg-primary-400 ring-2 ring-white dark:ring-slate-900" />

          {/* Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-1">
              {entry.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              {entry.organization} &middot; {entry.period}
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              {entry.description}
            </p>
            {entry.tags && entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-0.5 text-xs font-medium bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
