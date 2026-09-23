import type { CourseEntry } from "@/types";
import Card from "./Card";
import CtaLink from "./CtaLink";
import Tag from "./Tag";

export interface CourseCardProps {
  entry: CourseEntry;
  labels: { certificate: string; viewCourse: string };
  revealDelay?: number;
}

export default function CourseCard({
  entry,
  labels,
  revealDelay = 0,
}: CourseCardProps) {
  return (
    <Card revealDelay={revealDelay}>
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
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}

      <div className="mt-auto flex gap-2 border-t border-slate-100 pt-3 dark:border-slate-700">
        {entry.certificateUrl && (
          <CtaLink href={entry.certificateUrl} className="flex-1">
            {labels.certificate}
          </CtaLink>
        )}
        {entry.courseUrl && (
          <CtaLink href={entry.courseUrl} variant="outline" className="flex-1">
            {labels.viewCourse}
          </CtaLink>
        )}
      </div>
    </Card>
  );
}
