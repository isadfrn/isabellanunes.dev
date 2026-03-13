import type { BookEntry } from '@/types';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export interface BookCardProps {
  entry: BookEntry;
  labels: { buyBook: string };
  revealDelay?: number;
}

export default function BookCard({ entry, labels, revealDelay = 0 }: BookCardProps) {
  return (
    <div
      data-reveal
      style={{ '--reveal-delay': `${revealDelay}ms` } as React.CSSProperties}
      className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm"
    >
      {/* Cover */}
      <div className="mb-4 flex justify-center">
        <img
          src={entry.cover}
          alt={entry.title}
          className="h-40 w-auto object-contain rounded-lg"
        />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 leading-snug mb-1 flex-1">
        {entry.title}
      </h3>

      {/* Author */}
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{entry.author}</p>

      {/* Tags */}
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
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

      {/* Link */}
      <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-700">
        <a
          href={entry.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-150"
        >
          {labels.buyBook}
          <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}
