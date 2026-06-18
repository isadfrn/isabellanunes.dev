import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";
import type { CourseEntry } from "@/types";

export interface CourseCardProps {
  entry: CourseEntry;
  labels: { certificate: string; viewCourse: string };
  revealDelay?: number;
}

export default function CourseCard({ entry, labels, revealDelay = 0 }: CourseCardProps) {
  return (
    <div
      data-reveal
      style={{ "--reveal-delay": `${revealDelay}ms` } as CSSProperties}
      className="flex flex-col rounded-lg border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="mb-3">
        <span className="inline-flex w-fit items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
          {entry.platform}
        </span>
      </div>

      <h3 className="mb-3 flex-1 text-base font-semibold leading-snug text-slate-900 dark:text-slate-50">
        {entry.title}
      </h3>

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

      <div className="mt-auto flex gap-2 border-t border-slate-100 pt-3 dark:border-slate-700">
        {entry.certificateUrl && (
          <a
            href={entry.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary-500 px-3 py-1.5 text-xs font-medium text-white transition-colors duration-150 hover:bg-primary-600"
          >
            {labels.certificate}
            <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
          </a>
        )}
        {entry.courseUrl && (
          <a
            href={entry.courseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors duration-150 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {labels.viewCourse}
            <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
          </a>
        )}
      </div>
    </div>
  );
}
