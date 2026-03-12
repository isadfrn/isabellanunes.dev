import type { CourseEntry } from '@/types';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export interface CourseCardProps {
  entry: CourseEntry;
  labels: { certificate: string; viewCourse: string };
  revealDelay?: number;
}

export default function CourseCard({ entry, labels, revealDelay = 0 }: CourseCardProps) {
  return (
    <div
      data-reveal
      style={{ '--reveal-delay': `${revealDelay}ms` } as React.CSSProperties}
      className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm"
    >
      {/* Platform logo */}
      <div className="h-8 mb-4 flex items-center">
        <img
          src={entry.platformLogo}
          alt={entry.platform}
          className="h-full w-auto object-contain"
        />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 leading-snug mb-3 flex-1">
        {entry.title}
      </h3>

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

      {/* Links */}
      <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-slate-100 dark:border-slate-700">
        {entry.certificateUrl && (
          <a
            href={entry.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-150"
          >
            {labels.certificate}
            <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" aria-hidden />
          </a>
        )}
        {entry.courseUrl && (
          <a
            href={entry.courseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors duration-150"
          >
            {labels.viewCourse}
            <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" aria-hidden />
          </a>
        )}
      </div>
    </div>
  );
}
