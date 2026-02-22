import type { TimelineEntry } from '@/types';

export interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  return (
    <ol className="timeline">
      {entries.map((entry, index) => (
        <li key={index} className="timeline-item">
          <span className="timeline-dot" />
          <div className="timeline-content">
            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-1)' }}>
              {entry.title}
            </h3>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>
              {entry.organization} &middot; {entry.period}
            </p>
            <p style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--space-3)' }}>
              {entry.description}
            </p>
            {entry.tags && entry.tags.length > 0 && (
              <div className="card-tags">
                {entry.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
