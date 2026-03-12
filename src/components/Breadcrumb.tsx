export interface BreadcrumbItem {
  href: string;
  label: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <ol
      className="flex flex-wrap items-center gap-1 text-sm"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      {items.map((item, index) => (
        <li
          key={item.href}
          className="flex items-center gap-1"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          {index > 0 && (
            <span className="text-slate-300 dark:text-slate-600 select-none" aria-hidden="true">
              /
            </span>
          )}
          {index === items.length - 1 ? (
            <span
              aria-current="page"
              className="text-slate-900 dark:text-slate-100 font-medium"
              itemProp="name"
            >
              {item.label}
            </span>
          ) : (
            <a
              href={item.href}
              className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-150"
              itemProp="item"
            >
              <span itemProp="name">{item.label}</span>
            </a>
          )}
          <meta itemProp="position" content={String(index + 1)} />
        </li>
      ))}
    </ol>
  );
}
