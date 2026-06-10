import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";
import type { BookEntry } from "@/types";

export interface BookCardProps {
  entry: BookEntry;
  labels: { buyBook: string };
  revealDelay?: number;
}

export default function BookCard({ entry, labels, revealDelay = 0 }: BookCardProps) {
  return (
    <div
      data-reveal
      style={{ "--reveal-delay": `${revealDelay}ms` } as CSSProperties}
      className="flex flex-col rounded-lg border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
    >
      {entry.cover && (
        <div className="mb-4 flex justify-center">
          <img src={entry.cover} alt={entry.title} className="h-40 w-auto rounded-lg object-contain" />
        </div>
      )}

      <h3 className="mb-1 flex-1 text-base font-semibold leading-snug text-slate-900 dark:text-slate-50">
        {entry.title}
      </h3>
      <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">{entry.author}</p>

      {entry.tags && entry.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto border-t border-slate-100 pt-3 dark:border-slate-700">
        <a
          href={entry.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary-500 px-3 py-1.5 text-xs font-medium text-white transition-colors duration-150 hover:bg-primary-600"
        >
          {labels.buyBook}
          <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}
