export interface BreadcrumbItem {
  href: string;
  label: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <ol className="breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
      {items.map((item, index) => (
        <li
          key={item.href}
          className="breadcrumb-item"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          {index > 0 && <span className="breadcrumb-separator" aria-hidden="true">/</span>}
          {index === items.length - 1 ? (
            <span aria-current="page" className="breadcrumb-link" itemProp="name">
              {item.label}
            </span>
          ) : (
            <a href={item.href} className="breadcrumb-link" itemProp="item">
              <span itemProp="name">{item.label}</span>
            </a>
          )}
          <meta itemProp="position" content={String(index + 1)} />
        </li>
      ))}
    </ol>
  );
}
