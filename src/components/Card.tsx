import type { ProjectEntry } from '@/types';

export interface CardProps {
  entry: ProjectEntry;
  href: string;
  readMoreLabel?: string;
}

export default function Card({ entry, href, readMoreLabel = 'Read more' }: CardProps) {
  return (
    <a href={href} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card-image">
        <img src={entry.image} alt={entry.title} loading="lazy" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{entry.title}</h3>
        <p className="card-description">{entry.description}</p>
        <div className="card-tags">
          {entry.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <span className="text-accent" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginTop: 'var(--space-2)', display: 'inline-block' }}>
          {readMoreLabel} →
        </span>
      </div>
    </a>
  );
}
