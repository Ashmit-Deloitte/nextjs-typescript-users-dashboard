import { ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import styles from "./DetailsSection.module.css";

interface DetailItem {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

interface DetailSectionProps {
  title: string;
  items: DetailItem[];
  icon?: LucideIcon;
}

export default function DetailSection({
  title,
  items,
  icon: Icon,
}: DetailSectionProps) {
  return (
    <section className={styles.detailCard}>
      <h2 className={styles.cardTitle}>
        {Icon && (
          <span className={styles.titleIcon} aria-hidden="true">
            <Icon size={18} />
          </span>
        )}
        <span>{title}</span>
      </h2>

      {items.map((item) => (
        <div key={item.label} className={styles.detailItem}>
          <span className={styles.label}>{item.label}</span>

          {item.href ? (
            <a
              href={item.href}
              className={styles.link}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              <span>{item.value}</span>
              {item.external && (
                <ExternalLink
                  size={14}
                  className={styles.externalIcon}
                  aria-hidden="true"
                />
              )}
            </a>
          ) : (
            <p className={styles.value}>{item.value}</p>
          )}
        </div>
      ))}
    </section>
  );
}
