import type { ProjectEntry } from '@/types';

export interface CardProps {
  entry: ProjectEntry;
  href: string;
  readMoreLabel?: string;
}

export default function Card({ entry, href, readMoreLabel = 'Read more' }: CardProps) {
  return (
    <a
      href={href}
      className="group block bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    >
      {/* Image */}
      <div className="aspect-video overflow-hidden bg-slate-100 dark:bg-slate-700">
        <img
          src={entry.image}
          alt={entry.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-150">
          {entry.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 leading-relaxed line-clamp-2">
          {entry.description}
        </p>

        {/* Tags */}
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

        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:gap-2 transition-all duration-150">
          {readMoreLabel} →
        </span>
      </div>
    </a>
  );
}
