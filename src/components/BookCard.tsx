import type { BookEntry } from "@/types";
import Card from "./Card";
import CtaLink from "./CtaLink";
import Tag from "./Tag";

export interface BookCardProps {
  entry: BookEntry;
  labels: { buyBook: string };
  revealDelay?: number;
}

export default function BookCard({
  entry,
  labels,
  revealDelay = 0,
}: BookCardProps) {
  return (
    <Card revealDelay={revealDelay}>
      {entry.cover && (
        <div className="mb-4 flex justify-center">
          <img
            src={entry.cover}
            alt={entry.title}
            className="h-40 w-auto rounded-lg object-contain"
          />
        </div>
      )}

      <h3 className="mb-1 flex-1 text-base font-semibold leading-snug text-slate-900 dark:text-slate-50">
        {entry.title}
      </h3>
      <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
        {entry.author}
      </p>

      {entry.tags && entry.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}

      <div className="mt-auto border-t border-slate-100 pt-3 dark:border-slate-700">
        <CtaLink href={entry.affiliateUrl} rel="noopener noreferrer sponsored">
          {labels.buyBook}
        </CtaLink>
      </div>
    </Card>
  );
}
